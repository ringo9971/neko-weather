import React from 'react';
import { memo } from 'react';
import ThreeDayWeahterForecast from '../components/ThreeDayWeahterForecast';
import { Condition } from '../enums';
import { getWeather } from '../mock/api/getWeather';

export const WeatherPage = (): JSX.Element => {
  return (
    <>
      <ThreeDayWeahterForecast {...getWeather('東京')} />
      <ThreeDayWeahterForecast {...getWeather('神奈川')} />
    </>
  );
};

export default memo(WeatherPage);
