import { createContext } from 'react';

export const InvaderGameContext = createContext<{
  cellSize: {
    x: number;
    y: number;
  };
  grid: {
    x: number;
    y: number;
  };
}>({
  cellSize: { x: 1, y: 1 },
  grid: { x: 100, y: 100 },
});
