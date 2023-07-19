import React from 'react';
import { memo, useEffect, useState } from 'react';

import { InvaderGameProps } from './InvaderGame';

const Player = ({ modalDimensions }: InvaderGameProps): JSX.Element => {
  const [position, setPosition] = useState({
    x: modalDimensions.width / 2,
    y: modalDimensions.height / 2,
  });

  const size = {
    x: modalDimensions.width / 15,
    y: modalDimensions.height / 15,
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      const moveAmount = modalDimensions.width / 20;

      event.preventDefault();

      if (event.keyCode === 37 && position.x - moveAmount >= 0) {
        setPosition((prevPos) => ({
          ...prevPos,
          x: prevPos.x - moveAmount,
        }));
      } else if (
        event.keyCode === 39 &&
        position.x + moveAmount <= modalDimensions.width - size.x
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
        position.y + moveAmount <= modalDimensions.height - size.y
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
        left: position.x,
        top: position.y,
        width: size.x,
        height: size.y,
      }}
    />
  );
};

export default memo(Player);
