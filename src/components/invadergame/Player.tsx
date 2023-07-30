import React from 'react';
import { Dispatch, SetStateAction, memo, useContext, useEffect } from 'react';

import { InvaderGameContext } from '../../lib/contexts';

interface PlayerProps {
  pos: {
    x: number;
    y: number;
  };
  setPos: Dispatch<SetStateAction<{ x: number; y: number }>>;
  size: {
    x: number;
    y: number;
  };
  speed: number;
}

const Player = (props: PlayerProps): JSX.Element => {
  const { cellSize, grid } = useContext(InvaderGameContext);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.keyCode === 37 && props.pos.x - props.speed > 0) {
        props.setPos((prevPos) => ({
          ...prevPos,
          x: prevPos.x - props.speed,
        }));
      } else if (
        event.keyCode === 39 &&
        props.pos.x + props.speed < grid.x - props.size.x
      ) {
        props.setPos((prevPos) => ({
          ...prevPos,
          x: prevPos.x + props.speed,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [props.pos]);

  return (
    <img
      src="/cat.png"
      alt="Cat"
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

export default memo(Player);
