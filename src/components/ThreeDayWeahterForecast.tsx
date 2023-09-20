import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
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
import {
  WeatherDescription,
  WeatherForecast,
  WeatherLocation,
} from 'src/api/types';

import WeatherCard from './WeatherCard';

export type ThreeDayWeatherCardProps = {
  cityName: string;
  publicTime?: string;
  publicTimeFormatted?: string;
  publishingOffice?: string;
  title?: string;
  description?: WeatherDescription;
  forecasts?: {
    today: WeatherForecast;
    tomorrow: WeatherForecast;
    dayAfterTomorrow: WeatherForecast;
  };
  location?: WeatherLocation;
  onDelete?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
};

const ThreeDayWeahterForecast = (
  props: ThreeDayWeatherCardProps
): JSX.Element => {
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

  const handleMoveUp = () => {
    if (props.onMoveUp) {
      props.onMoveUp();
    }
  };
  const handleMoveDown = () => {
    if (props.onMoveDown) {
      props.onMoveDown();
    }
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
              <>
                <Button
                  variant="contained"
                  onClick={handleClickOpen}
                  sx={{ marginRight: 1 }}
                  startIcon={<DeleteIcon />}
                >
                  削除
                </Button>
                <Button
                  variant="contained"
                  color={props.onMoveUp ? 'primary' : 'inherit'}
                  onClick={handleMoveUp}
                  startIcon={<KeyboardArrowUpIcon />}
                />
                <Button
                  variant="contained"
                  color={props.onMoveDown ? 'primary' : 'inherit'}
                  onClick={handleMoveDown}
                  startIcon={<KeyboardArrowDownIcon />}
                />
              </>
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
            <WeatherCard {...props.forecasts?.today} />
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <WeatherCard {...props.forecasts?.tomorrow} />
          </Grid>

          <Grid
            item
            xs={4}
            style={{ display: 'flex', flexDirection: 'column' }}
          >
            <WeatherCard {...props.forecasts?.dayAfterTomorrow} />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default memo(ThreeDayWeahterForecast);
