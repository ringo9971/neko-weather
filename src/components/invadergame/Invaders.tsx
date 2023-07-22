import React from 'react';
import { memo } from 'react';

import Invader from './Invader';

export interface InvaderModel {
  id: number;
  x: number;
  y: number;
}

interface InvadersProps {
  invaders: InvaderModel[];
  cx: number;
  cy: number;
}

const Invaders = (props: InvadersProps): JSX.Element => {
  return (
    <>
      {props.invaders.map((invader: InvaderModel) => (
        <Invader
          key={invader.id}
          x={invader.x}
          y={invader.y}
          cx={props.cx}
          cy={props.cy}
        />
      ))}
    </>
  );
};

export default memo(Invaders);
