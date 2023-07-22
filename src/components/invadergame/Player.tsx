import React from 'react';
import { memo, useEffect, useState } from 'react';

import { CellGrid } from './InvaderGame';

interface PlayerProps {
  size: {
    x: number;
    y: number;
  };
  speed: number;
  cellGrid: CellGrid;
}

const Player = (props: PlayerProps): JSX.Element => {
  const [position, setPosition] = useState({ x: 50, y: 90 });

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
        position.x + props.speed < props.cellGrid.grid.x - props.size.x
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
        left: position.x * props.cellGrid.cellSize.x,
        top: position.y * props.cellGrid.cellSize.y,
        width: props.size.x * props.cellGrid.cellSize.x,
        height: props.size.y * props.cellGrid.cellSize.y,
      }}
    />
  );
};

export default memo(Player);
