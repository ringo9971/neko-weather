import {
  Box,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
} from '@mui/material';
import React from 'react';
import { memo, useContext, useEffect, useState } from 'react';
import Konami from 'react-konami-code';
import Modal from 'react-modal';

import { getWeather } from '../api/mock/getWeather';
import CatMayo from '../components/CatMayo';
import ThreeDayWeatherForecast from '../components/ThreeDayWeahterForecast';
import InvaderGame from '../components/invadergame/InvaderGame';
import { CityListContext, cityConfig } from '../lib/contexts';

const customStyles = {
  content: {
    top: '10%',
    left: '10%',
    right: '10%',
    bottom: '10%',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
};

export const WeatherPage = (): JSX.Element => {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<cityConfig[]>([]);
  const [text, setText] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const { cities } = useContext(CityListContext);

  const easterEgg = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddCity = (cityName: string) => {
    if (cityName.trim() === '') {
      return;
    }
    if (!cities.some((c) => c.name === cityName)) {
      setErrorMessage(`「${cityName}」は登録できません。`);
    } else if (cityNames.some((name) => name === cityName)) {
      setErrorMessage(`「${cityName}」は登録されています。`);
    } else {
      setCityNames([...cityNames, cityName]);
      setText('');
      setErrorMessage('');
    }
  };

  const updateModalDimensions = () => {
    const modalElement = document.querySelector('.ReactModal__Content');
    if (modalElement) {
      setModalDimensions({
        width: modalElement.clientWidth,
        height: modalElement.clientHeight,
      });
    }
  };

  const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  useEffect(() => {
    const storedCityNames = getFromLocalStorage('cityNames');
    if (storedCityNames !== null) {
      setCityNames(storedCityNames);
    }
  }, []);

  useEffect(() => {
    if (cityNames !== undefined && cityNames.length >= 1) {
      localStorage.setItem('cityNames', JSON.stringify(cityNames));
    }
  }, [cityNames]);

  useEffect(() => {
    window.addEventListener('resize', updateModalDimensions);
    return () => {
      window.removeEventListener('resize', updateModalDimensions);
    };
  }, []);

  useEffect(() => {
    if (text === '') {
      setFilteredCities([]);
      return;
    }
    const filtered = cities
      .filter(
        (city) => city.name.includes(text) || city.hurigana.includes(text)
      )
      .slice(0, 5);
    setFilteredCities(filtered);
  }, [text]);

  const renderFilteredCities = () => {
    if (filteredCities.length === 0) {
      return null;
    }
    return (
      <List>
        {filteredCities
          .filter(
            (city) => !cityNames.some((cityName) => cityName === city.name)
          )
          .map((city) => (
            <ListItem
              button
              key={city.name}
              onClick={() => handleAddCity(city.name)}
            >
              <ListItemText primary={`${city.name}（${city.prefecture}）`} />
            </ListItem>
          ))}
      </List>
    );
  };

  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        flexDirection="column"
        justifyContent="center"
        pt={1}
      >
        <Box>
          <TextField
            placeholder="都市名"
            size="small"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={(e) => {
              if (e.keyCode === 13) {
                handleAddCity(text);
              }
            }}
            error={!!errorMessage}
            helperText={errorMessage !== '' ? errorMessage : ' '}
          />
          <Button
            variant="contained"
            onClick={() => handleAddCity(text)}
            sx={{ marginLeft: '8px' }}
          >
            追加
          </Button>
        </Box>
        <Box>{renderFilteredCities()}</Box>
      </Box>

      <Konami action={easterEgg} timeout={50}></Konami>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        onRequestClose={closeModal}
        onAfterOpen={updateModalDimensions}
      >
        <InvaderGame modalDimensions={modalDimensions} />
      </Modal>

      {cityNames.map((cityName) => (
        <ThreeDayWeatherForecast {...getWeather(cityName)} key={cityName} />
      ))}

      <CatMayo />
    </>
  );
};

export default memo(WeatherPage);
