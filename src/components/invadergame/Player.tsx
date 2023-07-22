import React from 'react';
import { memo, useEffect, useState } from 'react';

import { InvaderGameProps } from './InvaderGame';

const Player = ({ modalDimensions }: InvaderGameProps): JSX.Element => {
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [cellSize, setCellSize] = useState({ x: 1, y: 1 });

  const grid = { x: 100, y: 100 };
  const size = { x: 5, y: 5 };

  useEffect(() => {
    setCellSize({
      x: modalDimensions.width / grid.x,
      y: modalDimensions.height / grid.y,
    });
  }, [modalDimensions]);

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const moveAmount = 1;

      event.preventDefault();

      if (event.keyCode === 37 && position.x - moveAmount >= 0) {
        setPosition((prevPos) => ({
          ...prevPos,
          x: prevPos.x - moveAmount,
        }));
      } else if (
        event.keyCode === 39 &&
        position.x + moveAmount <= grid.x - size.x
      ) {
        setPosition((prevPos) => ({
          ...prevPos,
          x: prevPos.x + moveAmount,
        }));
      } else if (event.keyCode === 38 && position.y - moveAmount >= 0) {
        setPosition((prevPos) => ({
          ...prevPos,
          y: prevPos.y - moveAmount,
        }));
      } else if (
        event.keyCode === 40 &&
        position.y + moveAmount <= grid.y - size.y
      ) {
        setPosition((prevPos) => ({
          ...prevPos,
          y: prevPos.y + moveAmount,
        }));
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [position, modalDimensions]);

  return (
    <img
      src="/cat.png"
      alt="Cat"
      style={{
        position: 'absolute',
        left: position.x * cellSize.x,
        top: position.y * cellSize.y,
        width: size.x * cellSize.x,
        height: size.y * cellSize.y,
      }}
    />
  );
};

export default memo(Player);
