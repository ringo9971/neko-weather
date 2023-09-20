import { Button, Card, CardContent, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import React from 'react';
import { memo } from 'react';

import WeatherCard from './WeatherCard';
import { Weather } from './WeatherCard';

export type WeatherCardProps = {
  cityName: string;
  todayWeather?: Weather;
  tomorrowWeather?: Weather;
  dayAfterTomorrowWeather?: Weather;
  onDelete?: () => void;
};

const ThreeDayWeahterForecast = (props: WeatherCardProps): JSX.Element => {
  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h2">{props.cityName}</Typography>
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            {props.onDelete && (
              <Button variant="contained" onClick={props.onDelete}>
                削除
              </Button>
            )}
          </Grid>
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
