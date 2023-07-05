import { Condition } from '../../enums';

export const getWeather = (cityName: string) => {
  return {
    cityName: cityName,
    todayWeather: {
      temperature: 0,
      humidity: 0,
      conditions: Condition.Sunny,
    },
    tomorrowWeather: {
      temperature: 0,
      humidity: 0,
      conditions: Condition.Cloudy,
    },
    dayAfterTomorrowWeather: {
      temperature: 0,
      humidity: 0,
      conditions: Condition.Rainy,
    },
  };
};
