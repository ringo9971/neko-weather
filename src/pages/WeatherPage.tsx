import EditIcon from '@mui/icons-material/Edit';
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
import { WeatherResponse } from 'src/api/types';

import { getWeather } from '../api/getWeather';
import CatMayo from '../components/CatMayo';
import ThreeDayWeatherForecast from '../components/ThreeDayWeahterForecast';
import InvaderGame from '../components/invadergame/InvaderGame';
import { CityListContext, cityConfig } from '../lib/contexts';

export const WeatherPage = (): JSX.Element => {
  const [cityNames, setCityNames] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<cityConfig[]>([]);
  const [text, setText] = useState<string>('');
  const [weatherMap, setWeatherMap] = useState<Map<string, WeatherResponse>>(
    new Map<string, WeatherResponse>()
  );
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [activeEditButton, setActiveEditButton] = useState(false);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [customStyles, setCustomStyle] = useState({});

  const { cities } = useContext(CityListContext);

  const easterEgg = () => {
    setModalIsOpen(true);
    updateModalDimensions();
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
      fetchWeatherData(cityName);
      setText('');
      setErrorMessage('');
    }
  };

  const handleDeleteCity = (cityName: string) => {
    setCityNames((prevCityNames) => {
      const newCityNames = prevCityNames.filter((name) => name !== cityName);
      if (newCityNames.length === 0) {
        setActiveEditButton(false);
      }
      return newCityNames;
    });
  };

  const moveCityUp = (cityName: string) => {
    setCityNames((prevCityNames) => {
      const index = prevCityNames.indexOf(cityName);
      if (index <= 0) {
        return prevCityNames;
      }
      const newCityNames = [...prevCityNames];
      newCityNames[index] = prevCityNames[index - 1];
      newCityNames[index - 1] = cityName;
      return newCityNames;
    });
  };

  const moveCityDown = (cityName: string) => {
    setCityNames((prevCityNames) => {
      const index = prevCityNames.indexOf(cityName);
      if (index < 0 || prevCityNames.length - 1 <= index) {
        return prevCityNames;
      }
      const newCityNames = [...prevCityNames];
      newCityNames[index] = prevCityNames[index + 1];
      newCityNames[index + 1] = cityName;
      return newCityNames;
    });
  };

  const updateModalDimensions = () => {
    const x = window.innerWidth;
    const y = window.innerHeight;
    const newX = Math.max(0, ((1 - (y * 0.9) / x) / 2) * 100);
    const newY = Math.max(0, ((1 - x / (y * 0.9)) / 2) * 100);

    setCustomStyle({
      content: {
        top: `${5 + newY}%`,
        left: `${5 + newX}%`,
        right: `${5 + newX}%`,
        bottom: `${5 + newY}%`,
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        overflow: 'hidden',
      },
    });

    const width = (x * (90 - newX * 2)) / 100;
    const height = (y * (90 - newY * 2)) / 100;
    setModalDimensions({
      width,
      height,
    });
  };

  const getFromLocalStorage = (key: string) => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  };

  const addWeatherMap = (cityName: string, weatherData: WeatherResponse) => {
    setWeatherMap((prevWeatherMap) => {
      const newWeatherMap = new Map(prevWeatherMap);
      newWeatherMap.set(cityName, weatherData);
      return newWeatherMap;
    });
  };

  const fetchWeatherData = async (cityName: string) => {
    const id = cities.find((city) => city.name === cityName)?.id;
    if (id !== undefined) {
      const data = await getWeather(id);
      addWeatherMap(cityName, data);
    }
  };

  useEffect(() => {
    const storedCityNames = getFromLocalStorage('cityNames');
    if (storedCityNames !== null) {
      setCityNames(storedCityNames);

      for (const cityName of storedCityNames) {
        fetchWeatherData(cityName);
      }
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
        (city) =>
          city.name.includes(text) ||
          city.hurigana.includes(text) ||
          city.prefecture.includes(text)
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
          {cityNames.length > 0 && (
            <Button
              variant="contained"
              color={activeEditButton ? 'inherit' : 'primary'}
              onClick={() =>
                setActiveEditButton(
                  (prevActiveEditButton) => !prevActiveEditButton
                )
              }
              sx={{ position: 'absolute', right: 0, marginRight: 2 }}
              startIcon={<EditIcon />}
            >
              編集
            </Button>
          )}
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

      {cityNames.map((cityName, index) => {
        const weatherData = weatherMap.get(cityName);
        return (
          <ThreeDayWeatherForecast
            {...(weatherData ?? {})}
            cityName={cityName}
            onDelete={
              activeEditButton ? () => handleDeleteCity(cityName) : undefined
            }
            onMoveUp={
              activeEditButton && index !== 0
                ? () => moveCityUp(cityName)
                : undefined
            }
            onMoveDown={
              activeEditButton && index !== cityNames.length - 1
                ? () => moveCityDown(cityName)
                : undefined
            }
            key={cityName}
          />
        );
      })}

      <CatMayo />
    </>
  );
};

export default memo(WeatherPage);
