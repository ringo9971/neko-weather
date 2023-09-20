import {
  Button,
  Card,
  CardContent,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import React, { useState } from 'react';
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
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    if (props.onDelete) {
      props.onDelete();
    }
    setOpen(false);
  };

  return (
    <Card>
      <CardContent>
        <Grid container alignItems="center">
          <Grid item>
            <Typography variant="h2">{props.cityName}</Typography>
          </Grid>
          <Grid item style={{ marginLeft: 'auto' }}>
            {props.onDelete && (
              <Button variant="contained" onClick={handleClickOpen}>
                削除
              </Button>
            )}
          </Grid>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>確認</DialogTitle>
            <DialogContent>
              <DialogContentText>
                「{props.cityName}」を削除しますか？
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>キャンセル</Button>
              <Button onClick={handleDelete}>削除</Button>
            </DialogActions>
          </Dialog>
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
