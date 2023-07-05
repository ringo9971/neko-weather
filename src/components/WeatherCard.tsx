import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { memo } from 'react';

import { Condition } from '../enums';

export type Weather = {
  temperature: number;
  humidity: number;
  conditions: Condition;
};

const WeatherCard = (props: Weather): JSX.Element => {
  const getWeatherImage = (weather: string) => {
    if (weather === 'sunny') {
      return (
        <img
          src="/sunny.png"
          alt="Sunny"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    } else if (weather === 'cloudy') {
      return (
        <img
          src="/cloudy.png"
          alt="Cloudy"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    } else if (weather === 'rainy') {
      return (
        <img
          src="/rainy.png"
          alt="Rainy"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      );
    }
  };

  return (
    <>
      {getWeatherImage(props.conditions)}
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        気温: {props.temperature}℃
      </Typography>

      <Typography variant="h4" style={{ textAlign: 'center' }}>
        温度: {props.humidity} %
      </Typography>
    </>
  );
};

export default memo(WeatherCard);
