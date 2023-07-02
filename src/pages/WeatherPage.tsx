import React from 'react';
import { memo } from 'react';
import WeatherCard from '../components/WeatherCard';

export const WeatherPage = (): JSX.Element => {
  return <WeatherCard />;
};

export default memo(WeatherPage);
