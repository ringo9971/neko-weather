import React from 'react';
import NotFoundPage from './pages/NotFoundPage';
import WeatherPage from './pages/WeatherPage';
import { RouteObject } from 'react-router-dom';

const routes: RouteObject[] = [
  {
    children: [
      { path: '/', element: <WeatherPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];

export default routes;
