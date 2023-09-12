import React from 'react';
import { memo } from 'react';

import Invader from './Invader';

export interface InvaderModel {
  id: number;
  color: string;
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
  invaders: InvaderModel[][];
}

const Invaders = (props: InvadersProps): JSX.Element => {
  return (
    <>
      {props.invaders.map((rows: InvaderModel[]) =>
        rows.map((invader: InvaderModel) => (
          <Invader
            key={invader.id}
            color={invader.color}
            pos={invader.pos}
            size={invader.size}
          />
        ))
      )}
    </>
  );
};

export default memo(Invaders);
