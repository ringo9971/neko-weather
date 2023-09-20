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

const telopToCondition = (telop: string) => {
  if (telop.startsWith('晴')) {
    return Condition.Sunny;
  } else if (telop.startsWith('曇')) {
    return Condition.Cloudy;
  } else if (telop.startsWith('雨')) {
    return Condition.Rainy;
  }
};

const weatherQueue = new RequestQueue<WeatherResponse>(1);

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const getWeather = async (id: string): Promise<WeatherResponse> => {
  const storedWeatherData = localStorage.getItem(`weather_${id}`);

  if (storedWeatherData) {
    const { timestamp, data } = JSON.parse(storedWeatherData);

    const currentTime = new Date().getTime();
    if (currentTime - timestamp < 24 * 60 * 60 * 1000) {
      return data;
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
        const newForecast = {
          ...forecast,
          condition: telopToCondition(forecast.telop),
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

  const currentTime = new Date().getTime();
  const storedData = {
    timestamp: currentTime,
    data: weatherData,
  };
  localStorage.setItem(`weather_${id}`, JSON.stringify(storedData));

  return weatherData;
};
