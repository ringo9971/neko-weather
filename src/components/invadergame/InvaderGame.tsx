import React from 'react';
import { memo, useEffect, useState } from 'react';

import { InvaderGameContext } from '../../lib/contexts';
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

const InvaderGame = ({ modalDimensions }: InvaderGameProps): JSX.Element => {
  const [cellSize, setCellSize] = useState({ x: 1, y: 1 });
  const [playerPos, setPlayerPos] = useState({ x: 50, y: 90 });
  const [playerBulletPos, setPlayerBulletPos] = useState({ x: -100, y: -100 });
  const [playerBulletIsFiring, setPlayerBulletIsFiring] = useState(false);
  const [invaders, setInvaders] = useState<InvaderModel[][]>([]);

  const grid = { x: 100, y: 100 };
  const playerSize = {
    x: 5,
    y: 5,
  };
  const playerBulletSize = {
    x: 0.3,
    y: 3,
  };

  useEffect(() => {
    const initialInvaders = [];
    for (let i = 0; i < 11; i++) {
      initialInvaders.push([] as InvaderModel[]);
      for (let j = 0; j < 4; j++) {
        const id = j * 11 + i;
        const x = 25 + i * 5;
        const y = 10 + j * 10;
        initialInvaders[i].push({ id, pos: { x, y }, size: { x: 5, y: 5 } });
      }
    }
    setInvaders(initialInvaders);
  }, []);

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
    </InvaderGameContext.Provider>
  );
};

export default memo(InvaderGame);
