import React from 'react';
import { memo, useEffect, useState } from 'react';

import { InvaderGameContext } from '../../lib/contexts';
import Invaders from './Invaders';
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

  const grid = { x: 100, y: 100 };
  const playerSize = {
    x: 5,
    y: 5,
  };

  const invaders = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 11; j++) {
      const id = i * 11 + j;
      const x = 25 + j * 5;
      const y = 10 + i * 10;
      invaders.push({ id, pos: { x, y }, size: { x: 5, y: 5 } });
    }
  }

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
        size={{ x: 0.3, y: 3 }}
        isFiring={playerBulletIsFiring}
        setIsFiring={setPlayerBulletIsFiring}
      />
      <Invaders invaders={invaders} />
    </InvaderGameContext.Provider>
  );
};

export default memo(InvaderGame);
