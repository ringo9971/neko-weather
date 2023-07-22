import React from 'react';
import { memo, useState } from 'react';

interface InvaderProps {
  x: number;
  y: number;
  cx: number;
  cy: number;
}

const Invader = (props: InvaderProps): JSX.Element => {
  const [position, setPosition] = useState({ x: props.x, y: props.y });

  const grid = { x: 100, y: 100 };
  const size = { x: 5, y: 5 };

  return (
    <img
      src="/kaminari.png"
      alt="kaminari"
      style={{
        position: 'absolute',
        left: position.x * props.cx,
        top: position.y * props.cy,
        width: size.x * props.cx,
        height: size.y * props.cy,
      }}
    />
  );
};

export default memo(Invader);
