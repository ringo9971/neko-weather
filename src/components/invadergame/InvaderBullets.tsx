import { Box } from '@mui/material';
import React from 'react';
import { memo, useContext } from 'react';

import { InvaderGameContext } from '../../lib/contexts';

export interface InvaderBulletModel {
  id: string;
  pos: {
    x: number;
    y: number;
  };
  size: {
    x: number;
    y: number;
  };
}

interface InvaderBulletsProps {
  bullets: InvaderBulletModel[];
}

const InvaderBullet = (props: InvaderBulletModel) => {
  const { cellSize } = useContext(InvaderGameContext);

  return (
    <Box
      sx={{
        position: 'absolute',
        left: props.pos.x * cellSize.x + 'px',
        top: props.pos.y * cellSize.y,
        width: props.size.x * cellSize.x,
        height: props.size.y * cellSize.y,
        backgroundColor: 'yellow',
      }}
    />
  );
};

const InvaderBullets = (props: InvaderBulletsProps): JSX.Element => {
  return (
    <>
      {props.bullets.map((bullet) => (
        <InvaderBullet
          key={bullet.id}
          id={bullet.id}
          pos={bullet.pos}
          size={bullet.size}
        />
      ))}
    </>
  );
};

export default memo(InvaderBullets);
