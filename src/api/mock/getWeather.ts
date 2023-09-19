import { WeatherCardProps } from 'src/components/ThreeDayWeahterForecast';

import { Condition } from '../../enums';

const telopToCondition = (telop: string) => {
  if (telop.startsWith('晴')) {
    return Condition.Sunny;
  } else if (telop.startsWith('曇')) {
    return Condition.Cloudy;
  } else if (telop.startsWith('雨')) {
    return Condition.Rainy;
  }
};

export const getWeather = async (id: string): Promise<WeatherCardProps> => {
  const storedWeatherData = localStorage.getItem(`weather_${id}`);

  if (storedWeatherData) {
    const { timestamp, data } = JSON.parse(storedWeatherData);

    const currentTime = new Date().getTime();
    if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
      return data;
    }
  }
  const response = await fetch('/data.json');
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }

  const jsonData = await response.json();

  const weatherData: WeatherCardProps = {
    cityName: jsonData.location.city,
    todayWeather: undefined,
    tomorrowWeather: undefined,
    dayAfterTomorrowWeather: undefined,
  };

  for (const forecast of jsonData.forecasts) {
    const conditions = telopToCondition(forecast.telop);
    const weather = {
      temperature: forecast.temperature.max.celsius,
      conditions,
    };
    switch (forecast.dateLabel) {
      case '今日':
        weatherData.todayWeather = weather;
        break;
      case '明日':
        weatherData.tomorrowWeather = weather;
        break;
      case '明後日':
        weatherData.dayAfterTomorrowWeather = weather;
        break;
      default:
        break;
    }
  }

  const currentTime = new Date().getTime();
  const storedData = {
    timestamp: currentTime,
    data: weatherData,
  };
  localStorage.setItem(`weather_${id}`, JSON.stringify(storedData));

  return weatherData;
};
