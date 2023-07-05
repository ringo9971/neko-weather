import { Input } from '@mui/base';
import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { memo, useState } from 'react';

import ThreeDayWeahterForecast from '../components/ThreeDayWeahterForecast';
import { Condition } from '../enums';
import { getWeather } from '../mock/api/getWeather';

export const WeatherPage = (): JSX.Element => {
  const [cityNames, setCityNames] = useState<Array<string>>([]);
  const [text, setText] = useState<string>('');

  const handleAddcity = () => {
    if (text.trim() != '') {
      setCityNames([...cityNames, text]);
      setText('');
    }
  };

  return (
    <>
      <Box display="flex" alignItems="center" justifyContent="center" pt={1}>
        <TextField
          placeholder="都市名"
          size="small"
          onChange={(e) => setText(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleAddcity}
          sx={{ marginLeft: '8px' }}
        >
          追加
        </Button>
      </Box>

      {cityNames.map((cityName) => (
        <ThreeDayWeahterForecast {...getWeather(cityName)} key={cityName} />
      ))}
    </>
  );
};

export default memo(WeatherPage);
