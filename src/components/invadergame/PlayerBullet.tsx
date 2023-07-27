import { Box } from '@mui/material';
import React from 'react';
import {
  Dispatch,
  SetStateAction,
  memo,
  useContext,
  useEffect,
  useState,
} from 'react';

import { InvaderGameContext } from '../../lib/contexts';
import InvaderGame from './InvaderGame';

interface PlayerBulletProps {
  pos: {
    x: number;
    y: number;
  };
  setPos: Dispatch<SetStateAction<{ x: number; y: number }>>;
  size: {
    x: number;
    y: number;
  };
  isFiring: boolean;
  setIsFiring: Dispatch<SetStateAction<boolean>>;
}

const PlayerBullet = (props: PlayerBulletProps): JSX.Element => {
  const { cellSize } = useContext(InvaderGameContext);

  const update = () => {
    if (props.isFiring) {
      props.setPos((prevPos) => ({
        ...prevPos,
        y: prevPos.y - 2,
      }));
      if (props.pos.y < -props.size.y) {
        props.setIsFiring(false);
      }
    }
  };

  useEffect(() => {
    const timer = setInterval(update, 10);
    return () => {
      clearInterval(timer);
    };
  }, [props.isFiring, props.pos]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (!props.isFiring && event.keyCode === 32) {
        props.setIsFiring(true);
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });

  return props.isFiring ? (
    <Box
      sx={{
        position: 'absolute',
        left: props.pos.x * cellSize.x + 'px',
        top: props.pos.y * cellSize.y,
        width: props.size.x * cellSize.x,
        height: props.size.y * cellSize.y,
        backgroundColor: 'white',
      }}
    />
  ) : (
    <></>
  );
};

export default memo(PlayerBullet);
