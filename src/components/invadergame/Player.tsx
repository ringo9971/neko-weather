import React from 'react';
import { memo, useContext, useEffect, useState } from 'react';

import { InvaderGameContext } from '../../lib/contexts';

interface PlayerProps {
  size: {
    x: number;
    y: number;
  };
  speed: number;
}

const Player = (props: PlayerProps): JSX.Element => {
  const [position, setPosition] = useState({ x: 50, y: 90 });
  const { cellSize, grid } = useContext(InvaderGameContext);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      event.preventDefault();

      if (event.keyCode === 37 && position.x - props.speed > 0) {
        setPosition((prevPos) => ({
          ...prevPos,
          x: prevPos.x - props.speed,
        }));
      } else if (
        event.keyCode === 39 &&
        position.x + props.speed < grid.x - props.size.x
      ) {
        setPosition((prevPos) => ({
          ...prevPos,
          x: prevPos.x + props.speed,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [position]);

  return (
    <img
      src="/cat.png"
      alt="Cat"
      style={{
        position: 'absolute',
        left: position.x * cellSize.x,
        top: position.y * cellSize.y,
        width: props.size.x * cellSize.x,
        height: props.size.y * cellSize.y,
      }}
    />
  );
};

export default memo(Player);
