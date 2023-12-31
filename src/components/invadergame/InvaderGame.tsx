import React from 'react';
import { memo, useCallback, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import { Direction } from '../../enums';
import { InvaderGameContext } from '../../lib/contexts';
import InvaderBullets, { InvaderBulletModel } from './InvaderBullets';
import Invaders from './Invaders';
import { InvaderModel } from './Invaders';
import Player from './Player';
import PlayerBullet from './PlayerBullet';

interface InvaderGameProps {
  modalDimensions: {
    width: number;
    height: number;
  };
}

export interface CellGrid {
  grid: {
    x: number;
    y: number;
  };
  cellSize: {
    x: number;
    y: number;
  };
}

interface MoveCondition {
  id: number;
  dir: Direction;
  change: boolean;
}

const InvaderGame = ({ modalDimensions }: InvaderGameProps): JSX.Element => {
  const [cellSize, setCellSize] = useState({ x: 1, y: 1 });
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 90 });
  const [playerBulletPos, setPlayerBulletPos] = useState({ x: -100, y: -100 });
  const [playerBulletIsFiring, setPlayerBulletIsFiring] = useState(false);
  const [invaders, setInvaders] = useState<InvaderModel[][]>([]);
  const [invaderBullets, setInvaderBullets] = useState<InvaderBulletModel[]>(
    []
  );
  const [moveCondition, setMoveCondition] = useState<MoveCondition>({
    id: 0,
    dir: Direction.RIGHT,
    change: false,
  });

  const grid = { x: 100, y: 100 };
  const playerSize = {
    x: 5,
    y: 5,
  };
  const playerBulletSize = {
    x: 0.3,
    y: 3,
  };
  const invaderBulletSize = {
    x: 0.3,
    y: 3,
  };
  const colors = ['aka', 'midori', 'ao', 'murasaki'];
  useEffect(() => {
    const initialInvaders = [];
    for (let i = 0; i < 11; i++) {
      initialInvaders.push([] as InvaderModel[]);
      for (let j = 0; j < 4; j++) {
        const id = (3 - j) * 11 + i;
        const x = 25 + i * 5;
        const y = 10 + j * 10;
        initialInvaders[i].push({
          id,
          color: colors[j],
          pos: { x, y },
          size: { x: 5, y: 5 },
        });
      }
    }
    setInvaders(initialInvaders);
  }, []);

  const moveInvaders = useCallback(() => {
    let nextId = Infinity;
    let nextDir = moveCondition.dir;
    let change = moveCondition.change;
    setInvaders((prevInvaders) => {
      const minIds = prevInvaders.map((rows) => {
        const ids = rows
          .filter((invader) => moveCondition.id <= invader.id)
          .map((invader) => invader.id);
        return Math.min(...ids);
      });
      nextId = Math.min(...minIds);

      if (nextId === Infinity) {
        const allIds = prevInvaders.flatMap((rows) =>
          rows.map((invader) => invader.id)
        );
        nextId = Math.min(...allIds);

        if (moveCondition.dir === 'right_down') {
          nextDir = Direction.LEFT;
        } else if (moveCondition.dir === 'left_down') {
          nextDir = Direction.RIGHT;
        }
        if (moveCondition.change) {
          if (moveCondition.dir === 'right') {
            nextDir = Direction.RIGHT_DOWN;
          } else if (moveCondition.dir === 'left') {
            nextDir = Direction.LEFT_DOWN;
          }
        }
        change = false;
      }

      const updatedInvaders = prevInvaders.map((rows) =>
        rows.map((invader) => {
          if (invader.id === nextId) {
            let dx = 0;
            let dy = 0;
            if (nextDir === 'right') {
              dx = 2;
            } else if (nextDir === 'left') {
              dx -= 2;
            } else {
              dy = invader.size.y * 2;
            }
            if (
              grid.x - invader.size.x <= invader.pos.x + invader.size.x + dx ||
              invader.pos.x + dx <= invader.size.x
            ) {
              change = true;
            }

            return {
              ...invader,
              pos: {
                x: invader.pos.x + dx,
                y: invader.pos.y + dy,
              },
            };
          } else {
            return invader;
          }
        })
      );

      setMoveCondition((prevMoveCondition) => {
        return {
          ...prevMoveCondition,
          id: nextId + 1,
          dir: nextDir,
          change,
        };
      });
      return updatedInvaders;
    });
  }, [moveCondition]);

  useEffect(() => {
    const timer = setInterval(moveInvaders, 50);
    return () => {
      clearInterval(timer);
    };
  }, [moveInvaders]);

  const updateInvaderBullet = useCallback(() => {
    setInvaderBullets((prevInvaderBullets) => {
      const updatedBullets = prevInvaderBullets
        .filter((bullet) => bullet.pos.y + bullet.size.y + 2 < grid.y)
        .map((bullet) => {
          return {
            ...bullet,
            pos: {
              ...bullet.pos,
              y: bullet.pos.y + 2,
            },
          };
        });

      if (Math.random() >= 0.95) {
        const validInvaders = invaders
          .map((rows) => rows[rows.length - 1])
          .filter((invader) => invader !== undefined);

        if (validInvaders.length > 0) {
          const randomIndex = Math.floor(Math.random() * validInvaders.length);
          const { pos, size } = validInvaders[randomIndex];
          const x = pos.x + size.x / 2 - invaderBulletSize.x / 2;
          const y = pos.y + size.y;

          updatedBullets.push({
            id: uuidv4(),
            pos: { x, y },
            size: invaderBulletSize,
          });
        }
      }
      return updatedBullets;
    });
  }, [invaders]);

  useEffect(() => {
    const timer = setInterval(updateInvaderBullet, 50);

    return () => {
      clearInterval(timer);
    };
  }, [updateInvaderBullet]);

  const isCollision = ({
    rectPos,
    rectSize,
    rect2Pos,
    rect2Size,
  }: {
    rectPos: { x: number; y: number };
    rectSize: { x: number; y: number };
    rect2Pos: { x: number; y: number };
    rect2Size: { x: number; y: number };
  }) => {
    return (
      rect2Pos.x <= rectPos.x + rectSize.x &&
      rectPos.x <= rect2Pos.x + rect2Size.x &&
      rect2Pos.y <= rectPos.y + rectSize.y &&
      rectPos.y <= rect2Pos.y + rect2Size.y
    );
  };

  useEffect(() => {
    if (playerBulletPos.x < 0) {
      return;
    }
    const updatedInvaders = invaders.map((rows) => {
      const updatedRows = rows.map((invader) => {
        if (
          isCollision({
            rectPos: playerBulletPos,
            rectSize: playerBulletSize,
            rect2Pos: invader.pos,
            rect2Size: invader.size,
          })
        ) {
          return null;
        }
        return invader;
      });
      return updatedRows.filter(
        (invader) => invader !== null
      ) as InvaderModel[];
    });

    if (JSON.stringify(updatedInvaders) !== JSON.stringify(invaders)) {
      setPlayerBulletIsFiring(false);
      setPlayerBulletPos({ x: -100, y: -100 });
      setInvaders(updatedInvaders);
    }
  }, [playerBulletPos]);

  useEffect(() => {
    if (playerBulletIsFiring) {
      setPlayerBulletPos({
        x: playerPos.x + playerSize.x / 2,
        y: playerPos.y - playerSize.y / 2,
      });
    }
  }, [playerBulletIsFiring]);

  useEffect(() => {
    setCellSize({
      x: modalDimensions.width / grid.x,
      y: modalDimensions.height / grid.y,
    });
  }, [modalDimensions]);

  return (
    <InvaderGameContext.Provider value={{ cellSize, grid }}>
      <Player
        pos={playerPos}
        setPos={setPlayerPos}
        size={playerSize}
        speed={1}
      />
      <PlayerBullet
        pos={playerBulletPos}
        setPos={setPlayerBulletPos}
        size={playerBulletSize}
        isFiring={playerBulletIsFiring}
        setIsFiring={setPlayerBulletIsFiring}
      />
      <Invaders invaders={invaders} />
      <InvaderBullets bullets={invaderBullets} />
    </InvaderGameContext.Provider>
  );
};

export default memo(InvaderGame);
