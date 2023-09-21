import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { memo } from 'react';
import {
  WeatherForecastChanceOfRain,
  WeatherForecastCondition,
  WeatherForecastDetail,
  WeatherForecastTemperature,
} from 'src/api/types';

import { Condition } from '../enums';

export type WeatherDetailCardProps = {
  date?: string;
  dateLabel?: string;
  telop?: string;
  condition?: WeatherForecastCondition;
  detail?: WeatherForecastDetail;
  temperature?: WeatherForecastTemperature;
  chanceOfRain?: WeatherForecastChanceOfRain;
};

const calculateWidth = () => {
  const maxX = 2000;
  const minX = 500;
  const maxWidth = 100;
  const minWidth = 50;
  const x = window.innerWidth;

  return (
    (Math.max(x - minX, 0) * (minWidth - maxWidth)) / (maxX - minX) + maxWidth
  );
};

const WeatherDetailCard = (props: WeatherDetailCardProps): JSX.Element => {
  const [width, setWidth] = useState(80);

  const tableCellStyle = { fontSize: 'x-large' };

  const hadleResize = () => {
    setWidth(calculateWidth());
  };

  useEffect(() => {
    window.addEventListener('resize', hadleResize);
    return () => {
      window.removeEventListener('resize', hadleResize);
    };
  }, []);

  return (
    <Grid container border="1px solid grey" width={`${width}%`} margin="auto">
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '20%', ...tableCellStyle }}>
              時間
            </TableCell>
            <TableCell style={{ width: '20%', ...tableCellStyle }}>
              00-06
            </TableCell>
            <TableCell style={{ width: '20%', ...tableCellStyle }}>
              06-12
            </TableCell>
            <TableCell style={{ width: '20%', ...tableCellStyle }}>
              12-18
            </TableCell>
            <TableCell style={{ width: '20%', ...tableCellStyle }}>
              18-24
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell style={{ ...tableCellStyle }}>降水確率</TableCell>
            <TableCell style={{ ...tableCellStyle }}>
              {props.chanceOfRain?.T00_06 ?? '?'}
            </TableCell>
            <TableCell style={{ ...tableCellStyle }}>
              {props.chanceOfRain?.T06_12 ?? '?'}
            </TableCell>
            <TableCell style={{ ...tableCellStyle }}>
              {props.chanceOfRain?.T12_18 ?? '?'}
            </TableCell>
            <TableCell style={{ ...tableCellStyle }}>
              {props.chanceOfRain?.T18_24 ?? '?'}
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell style={{ ...tableCellStyle }}>風</TableCell>
            <TableCell style={{ ...tableCellStyle }} colSpan={4}>
              {props.detail?.wind ?? '?'}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Grid>
  );
};

export default memo(WeatherDetailCard);
