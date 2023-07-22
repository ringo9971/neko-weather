import React from 'react';
import { memo } from 'react';

import Invader from './Invader';
import { CellGrid } from './InvaderGame';

export interface InvaderModel {
  id: number;
  pos: {
    x: number;
    y: number;
  };
  size: {
    x: number;
    y: number;
  };
}

interface InvadersProps {
  invaders: InvaderModel[];
  cellGrid: CellGrid;
}

const Invaders = (props: InvadersProps): JSX.Element => {
  return (
    <>
      {props.invaders.map((invader: InvaderModel) => (
        <Invader
          key={invader.id}
          pos={invader.pos}
          size={invader.size}
          cellGrid={props.cellGrid}
        />
      ))}
    </>
  );
};

export default memo(Invaders);
