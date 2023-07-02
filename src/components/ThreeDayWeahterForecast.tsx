import React from 'react';
import Grid from '@mui/material/Grid';
import { Card, CardContent, Typography } from '@mui/material';
import { memo } from 'react';
import WeatherCard from './WeatherCard';
import { Weather } from './WeatherCard';

type WeatherCardProps = {
  cityName: string;
  todayWeather: Weather;
  tomorrowWeather: Weather;
  dayAfterTomorrowWeather: Weather;
};

const ThreeDayWeahterForecast = (props: WeatherCardProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Grid>
          <Typography variant="h2">{props.cityName}</Typography>
        </Grid>

        <Grid container style={{ display: 'flex' }}>
          <Grid
            item
            xs={4}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <WeatherCard {...props.todayWeather} />
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <WeatherCard {...props.tomorrowWeather} />
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <WeatherCard {...props.dayAfterTomorrowWeather} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(ThreeDayWeahterForecast);
