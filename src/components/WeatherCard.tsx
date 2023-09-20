import { Typography } from '@mui/material';
import React from 'react';
import { memo } from 'react';
import {
  WeatherForecastChanceOfRain,
  WeatherForecastDetail,
  WeatherForecastTemperature,
} from 'src/api/types';

import { Condition } from '../enums';

export type WeatherCardProps = {
  date?: string;
  dateLabel?: string;
  telop?: string;
  condition?: Condition;
  detail?: WeatherForecastDetail;
  temperature?: WeatherForecastTemperature;
  chanceOfRain?: WeatherForecastChanceOfRain;
};

const WeatherCard = (props: WeatherCardProps): JSX.Element => {
  const getWeatherImage = (weather: Condition | undefined) => {
    const imagePaths = {
      sunny: '/sunny.png',
      cloudy: '/cloudy.png',
      rainy: '/rainy.png',
    };
    return (
      <img
        src={weather ? imagePaths[weather] : '/cat.png'}
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    );
  };

  return (
    <>
      {getWeatherImage(props.condition)}
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        気温: {props.temperature?.min.celsius ?? '?'}/
        {props.temperature?.max.celsius ?? '?'}℃
      </Typography>
    </>
  );
};

export default memo(WeatherCard);
