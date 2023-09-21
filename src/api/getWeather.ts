import { Condition } from '../enums';
import { WeatherResponse } from './types';

class RequestQueue<T> {
  private concurrency: number;
  private queue: Array<{
    requestFn: () => void;
    resolve: (value: T) => void;
    reject: (reason?: Error) => void;
  }>;
  private running: number;

  constructor(concurrency: number) {
    this.concurrency = concurrency;
    this.queue = [];
    this.running = 0;
  }

  async add(requestFn: () => Promise<T>) {
    return new Promise<T>((resolve, reject) => {
      const wrappedFn = async () => {
        try {
          const result = await requestFn();
          resolve(result);
        } catch (error) {
          reject(error);
        } finally {
          this.running--;
        }
      };

      this.queue.push({ requestFn: wrappedFn, resolve, reject });
      this.run();
    });
  }

  async run() {
    while (this.running < this.concurrency && this.queue.length > 0) {
      const nextRequest = this.queue.shift();
      if (!nextRequest) {
        return;
      }
      const { requestFn, reject } = nextRequest;

      this.running++;
      try {
        await requestFn();
      } catch (error) {
        const errorObject =
          error instanceof Error ? error : new Error(String(error));
        reject(errorObject);
      } finally {
        this.running--;
      }
    }
  }
}

const telopToCondition = (telop: string, regex: RegExp) => {
  const match = regex.exec(telop);
  if (match) {
    const a = match[0];
    if (a.endsWith('晴')) {
      return Condition.Sunny;
    } else if (a.endsWith('曇')) {
      return Condition.Cloudy;
    } else if (a.endsWith('雨')) {
      return Condition.Rainy;
    }
  }
};

const telopToForecastCondition = (telop: string) => {
  const main = telopToCondition(telop, /./);
  const later = telopToCondition(telop, /のち./);
  const sometimes = telopToCondition(telop, /時々./);
  return { main, later, sometimes };
};

const calculateChanceOfRain = (chanceOfRain: {
  T00_06: string;
  T06_12: string;
  T12_18: string;
  T18_24: string;
}) => {
  const regex = /\d+/;
  const chances: number[] = [];

  for (const key in chanceOfRain) {
    if (Object.prototype.hasOwnProperty.call(chanceOfRain, key)) {
      const chanceString = chanceOfRain[key as keyof typeof chanceOfRain];
      const match = regex.exec(chanceString);
      if (match) {
        chances.push(Number(match[0]));
      }
    }
  }

  if (chances.length === 0) {
    return '-';
  }
  const average =
    chances.reduce((sum, chance) => sum + chance, 0) / chances.length;
  return average.toFixed(0);
};

const weatherQueue = new RequestQueue<WeatherResponse>(1);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getWeather = async (id: string): Promise<WeatherResponse> => {
  const storedWeatherData = localStorage.getItem(`weather_${id}`);

  if (storedWeatherData) {
    const { date, weather } = JSON.parse(storedWeatherData);

    const currentDate = new Date().toDateString();
    if (date === currentDate) {
      return weather;
    }
  }

  const weatherData = await weatherQueue.add(
    async (): Promise<WeatherResponse> => {
      const response = await fetch(
        `https://weather.tsukumijima.net/api/forecast/city/${id}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const jsonData = await response.json();

      let today, tomorrow, dayAfterTomorrow;
      for (const forecast of jsonData.forecasts) {
        const average = calculateChanceOfRain(forecast.chanceOfRain);
        const newForecast = {
          ...forecast,
          condition: telopToForecastCondition(forecast.telop),
          chanceOfRain: {
            ...forecast.chanceOfRain,
            average,
          },
        };
        switch (forecast.dateLabel) {
          case '今日':
            today = newForecast;
            break;
          case '明日':
            tomorrow = newForecast;
            break;
          case '明後日':
            dayAfterTomorrow = newForecast;
            break;
          default:
            break;
        }
      }

      const weatherData: WeatherResponse = {
        publicTime: jsonData.publicTime,
        publicTimeFormatted: jsonData.publicTimeFormatted,
        publishingOffice: jsonData.publishingOffice,
        title: jsonData.title,
        description: jsonData.description,
        forecasts: {
          today,
          tomorrow,
          dayAfterTomorrow,
        },
        location: jsonData.location,
      };

      await sleep(1000);
      return weatherData;
    }
  );

  const currentDate = new Date().toDateString();
  const storedData = {
    date: currentDate,
    weather: weatherData,
  };
  localStorage.setItem(`weather_${id}`, JSON.stringify(storedData));

  return weatherData;
};
