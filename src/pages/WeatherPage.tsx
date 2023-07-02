import React from 'react';
import { memo } from 'react';
import ThreeDayWeahterForecast from '../components/ThreeDayWeahterForecast';
import { Condition } from '../enums';

export const WeatherPage = (): JSX.Element => {
  return (
    <>
      <ThreeDayWeahterForecast
        cityName="東京"
        todayWeather={{
          temperature: 0,
          humidity: 0,
          conditions: Condition.Sunny,
        }}
        tomorrowWeather={{
          temperature: 0,
          humidity: 0,
          conditions: Condition.Cloudy,
        }}
        dayAfterTomorrowWeather={{
          temperature: 0,
          humidity: 0,
          conditions: Condition.Rainy,
        }}
      />
      <ThreeDayWeahterForecast
        cityName="神奈川"
        todayWeather={{
          temperature: 0,
          humidity: 0,
          conditions: Condition.Sunny,
        }}
        tomorrowWeather={{
          temperature: 0,
          humidity: 0,
          conditions: Condition.Cloudy,
        }}
        dayAfterTomorrowWeather={{
          temperature: 0,
          humidity: 0,
          conditions: Condition.Rainy,
        }}
      />
    </>
  );
};

export default memo(WeatherPage);
