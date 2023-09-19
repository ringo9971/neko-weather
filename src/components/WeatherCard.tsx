import { Typography } from '@mui/material';
import React from 'react';
import { memo } from 'react';

import { Condition } from '../enums';

export type Weather = {
  temperature?: number;
  humidity?: number;
  conditions?: Condition;
};

const WeatherCard = (props: Weather): JSX.Element => {
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
      {getWeatherImage(props.conditions)}
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        気温: {props.temperature ?? '?'}℃
      </Typography>

      <Typography variant="h4" style={{ textAlign: 'center' }}>
        温度: {props.humidity ?? '?'} %
      </Typography>
    </>
  );
};

export default memo(WeatherCard);
