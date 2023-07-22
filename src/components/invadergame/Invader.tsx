import React from 'react';
import { memo, useState } from 'react';

import { CellGrid } from './InvaderGame';

interface InvaderProps {
  pos: {
    x: number;
    y: number;
  };
  size: {
    x: number;
    y: number;
  };
  cellGrid: CellGrid;
}

const Invader = (props: InvaderProps): JSX.Element => {
  const [position, setPosition] = useState({ x: props.pos.x, y: props.pos.y });

  return (
    <img
      src="/kaminari.png"
      alt="kaminari"
      style={{
        position: 'absolute',
        left: position.x * props.cellGrid.cellSize.x,
        top: position.y * props.cellGrid.cellSize.y,
        width: props.size.x * props.cellGrid.cellSize.x,
        height: props.size.y * props.cellGrid.cellSize.y,
      }}
    />
  );
};

export default memo(Invader);
