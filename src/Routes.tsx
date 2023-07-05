import React from 'react';
import { RouteObject } from 'react-router-dom';

import NotFoundPage from './pages/NotFoundPage';
import WeatherPage from './pages/WeatherPage';

const routes: RouteObject[] = [
  {
    children: [
      { path: '/', element: <WeatherPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export default routes;
