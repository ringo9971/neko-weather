import { Input } from '@mui/base';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { memo, useEffect, useState } from 'react';

import ThreeDayWeatherForecast from '../components/ThreeDayWeahterForecast';
import { Condition } from '../enums';
import { getWeather } from '../mock/api/getWeather';

export const WeatherPage = (): JSX.Element => {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [text, setText] = useState<string>('');

  const handleAddCity = () => {
    if (text.trim() != '') {
      setCityNames([...cityNames, text]);
      setText('');
    }
  };

  useEffect(() => {
    const storedCityNames = localStorage.getItem('cityNames');
    if (storedCityNames !== null) {
      setCityNames(JSON.parse(storedCityNames));
    }
  }, []);

  useEffect(() => {
    if (cityNames !== undefined && cityNames.length >= 1) {
      localStorage.setItem('cityNames', JSON.stringify(cityNames));
    }
  }, [cityNames]);

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" pt={1}>
        <TextField
          placeholder="都市名"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddCity}
          sx={{ marginLeft: '8px' }}
        >
          追加
        </Button>
      </Box>

      {cityNames.map((cityName) => (
        <ThreeDayWeatherForecast {...getWeather(cityName)} key={cityName} />
      ))}
    </>
  );
};

export default memo(WeatherPage);
