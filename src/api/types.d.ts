export interface WeatherDescription {
  publicTime: string;
  text: string;
}

interface WeatherForecastCondition {
  main: Condition;
  later: Condition;
  sometimes: Condition;
}

interface WeatherForecastDetail {
  weather: string;
  wind: string;
  wave: string;
}
interface WeatherForecastTemperature {
  min: {
    celsius: string;
    fahrenheit: string;
  };
  max: {
    celsius: string;
    fahrenheit: string;
  };
}
interface WeatherForecastChanceOfRain {
  average: string;
  T00_06: string;
  T06_12: string;
  T12_18: string;
  T18_24: string;
}

export interface WeatherForecast {
  date: string;
  dateLabel: string;
  telop: string;
  condition: WeatherForecastCondition;
  detail: WeatherForecastDetail;
  temperature: WeatherForecastTemperature;
  chanceOfRain: WeatherForecastChanceOfRain;
}

export interface WeatherLocation {
  area: string;
  prefecture: string;
  district: string;
  city: string;
}

export interface WeatherResponse {
  publicTime: string;
  publicTimeFormatted: string;
  publishingOffice: string;
  title: string;
  description: WeatherDescription;
  forecasts: {
    today: WeatherForecast;
    tomorrow: WeatherForecast;
    dayAfterTomorrow: WeatherForecast;
  };
  location: WeatherLocation;
}
