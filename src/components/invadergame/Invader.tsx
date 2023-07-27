import React from 'react';
import { memo, useContext } from 'react';

import { InvaderGameContext } from '../../lib/contexts';

interface InvaderProps {
  pos: {
    x: number;
    y: number;
  };
  size: {
    x: number;
    y: number;
  };
}

const Invader = (props: InvaderProps): JSX.Element => {
  const { cellSize } = useContext(InvaderGameContext);

  return (
    <img
      src="/kaminari.png"
      alt="kaminari"
      style={{
        position: 'absolute',
        left: props.pos.x * cellSize.x,
        top: props.pos.y * cellSize.y,
        width: props.size.x * cellSize.x,
        height: props.size.y * cellSize.y,
      }}
    />
  );
};

export default memo(Invader);
