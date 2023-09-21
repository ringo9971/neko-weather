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
import WeatherDetailCard from './WeatherDetailCard';

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
  const [isDetilVisible, setIsDetailVisible] = useState(false);
  const [detailForecast, setDetailForecast] = useState(props.forecasts?.today);

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

  const handleDetailClick = (forecast: WeatherForecast | undefined) => {
    setDetailForecast(forecast);
    if (
      detailForecast &&
      forecast &&
      detailForecast.dateLabel === forecast.dateLabel
    ) {
      setIsDetailVisible((prevIsDetailVisible) => !prevIsDetailVisible);
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
          {[
            { label: '今日', forecast: props.forecasts?.today },
            { label: '明日', forecast: props.forecasts?.tomorrow },
            { label: '明後日', forecast: props.forecasts?.dayAfterTomorrow },
          ].map(({ label, forecast }) => {
            return (
              <Grid
                item
                key={label}
                xs={4}
                style={{ display: 'flex', flexDirection: 'column' }}
                onClick={() => handleDetailClick(forecast)}
                sx={
                  isDetilVisible &&
                  detailForecast &&
                  detailForecast.dateLabel === label
                    ? { backgroundColor: 'lightcyan' }
                    : {}
                }
              >
                <WeatherCard {...forecast} />
              </Grid>
            );
          })}
        </Grid>
      </CardContent>
      {isDetilVisible && <WeatherDetailCard {...detailForecast} />}
    </Card>
  );
};

export default memo(ThreeDayWeahterForecast);
