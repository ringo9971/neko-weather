import React from 'react';
import { memo, useEffect, useState } from 'react';

import Player from './Player';

export interface InvaderGameProps {
  modalDimensions: {
    width: number;
    height: number;
  };
}

const InvaderGame = ({ modalDimensions }: InvaderGameProps): JSX.Element => {
  return <Player modalDimensions={modalDimensions} />;
};

export default memo(InvaderGame);
