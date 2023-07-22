import React from 'react';
import { memo, useEffect, useState } from 'react';

import Invaders from './Invaders';
import Player from './Player';

export interface InvaderGameProps {
  modalDimensions: {
    width: number;
    height: number;
  };
}

const InvaderGame = ({ modalDimensions }: InvaderGameProps): JSX.Element => {
  const [cellSize, setCellSize] = useState({ cx: 1, cy: 1 });

  const grid = { x: 100, y: 100 };

  const invaders = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 11; j++) {
      const id = i * 11 + j;
      const x = 25 + j * 5;
      const y = 10 + i * 10;
      invaders.push({ id, x, y });
    }
  }

  useEffect(() => {
    setCellSize({
      cx: modalDimensions.width / grid.x,
      cy: modalDimensions.height / grid.y,
    });
  }, [modalDimensions]);

  return (
    <>
      <Player {...cellSize} />
      <Invaders {...cellSize} invaders={invaders} />
    </>
  );
};

export default memo(InvaderGame);
