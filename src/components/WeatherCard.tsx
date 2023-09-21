import ReplyIcon from '@mui/icons-material/Reply';
import { Typography } from '@mui/material';
import React from 'react';
import { memo } from 'react';
import {
  WeatherForecastChanceOfRain,
  WeatherForecastCondition,
  WeatherForecastDetail,
  WeatherForecastTemperature,
} from 'src/api/types';

import { Condition } from '../enums';

export type WeatherCardProps = {
  date?: string;
  dateLabel?: string;
  telop?: string;
  condition?: WeatherForecastCondition;
  detail?: WeatherForecastDetail;
  temperature?: WeatherForecastTemperature;
  chanceOfRain?: WeatherForecastChanceOfRain;
};

const imagePaths: Record<Condition, string> = {
  sunny: '/sunny.png',
  cloudy: '/cloudy.png',
  rainy: '/rainy.png',
};

const WeatherCard = (props: WeatherCardProps): JSX.Element => {
  const getWeatherImage = (weather: WeatherForecastCondition | undefined) => {
    const style: React.CSSProperties = {
      maxWidth: '60%',
      height: 'auto',
      position: 'absolute',
      bottom: 0,
      right: 0,
    };

    return (
      <div style={{ position: 'relative' }}>
        <img
          src={
            weather?.main ? imagePaths[weather.main as Condition] : '/cat.png'
          }
          style={{ maxWidth: '100%', height: 'auto' }}
        />
        {weather?.sometimes && (
          <img src={imagePaths[weather.sometimes as Condition]} style={style} />
        )}
        {weather?.later && (
          <>
            <img src={imagePaths[weather.later as Condition]} style={style} />
            <ReplyIcon
              sx={{
                width: '30%',
                height: 'auto',
                position: 'absolute',
                bottom: '10%',
                right: '45%',
                transform: 'scaleX(-1) scaleY(-1)',
              }}
            />
          </>
        )}
      </div>
    );
  };

  return (
    <>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        {props.dateLabel}
      </Typography>
      {getWeatherImage(props.condition)}
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 'smaller' }}>気温: </span>
        <span style={{ color: 'red' }}>
          {props.temperature?.max.celsius ?? '?'}
        </span>
        <span style={{ fontSize: 'smaller' }}> ℃</span>/
        <span style={{ color: 'blue' }}>
          {props.temperature?.min.celsius ?? '?'}
        </span>
        <span style={{ fontSize: 'smaller' }}> ℃</span>
      </Typography>
      <Typography variant="h4" style={{ textAlign: 'center' }}>
        <span style={{ fontSize: 'smaller' }}>降水確率: </span>
        {props.chanceOfRain?.average ?? '?'}
        <span style={{ fontSize: 'smaller' }}> %</span>
      </Typography>
    </>
  );
};

export default memo(WeatherCard);
