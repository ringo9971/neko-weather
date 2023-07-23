import { Box, Button, TextField } from '@mui/material';
import React from 'react';
import { memo, useEffect, useLayoutEffect, useState } from 'react';
import Konami from 'react-konami-code';
import Modal from 'react-modal';

import ThreeDayWeatherForecast from '../components/ThreeDayWeahterForecast';
import InvaderGame from '../components/invadergame/InvaderGame';
import { getWeather } from '../mock/api/getWeather';

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
  const [text, setText] = useState<string>('');
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [modalDimensions, setModalDimensions] = useState({
    width: 0,
    height: 0,
  });
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [catMayoIsVisible, setCatMayoIsVisible] = useState(false);
  const [catMayoPos, setCatMayoPos] = useState(0);
  const [catMayo, setCatMayo] = useState('/cat_mayo1.png');

  const easterEgg = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleAddCity = () => {
    if (text.trim() === '') {
      return;
    }
    if (cityNames.every((cityName) => cityName !== text)) {
      setCityNames([...cityNames, text]);
      setText('');
      setErrorMessage('');
    } else {
      setErrorMessage(`「${text}」は登録されています。`);
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

  const scrollToTop = () => {
    setCatMayo('/cat_mayo2.png');
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setCatMayoIsVisible(true);
    } else {
      setCatMayo('/cat_mayo1.png');
      setCatMayoIsVisible(false);
    }
  };

  useEffect(() => {
    setCatMayoPos((prePos) => (prePos + 1) % 180);
  });

  useEffect(() => {
    if (catMayoIsVisible) {
      setCatMayoPos(0);
    }
  }, [catMayoIsVisible]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.scrollY]);

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

  useEffect(() => {
    window.addEventListener('resize', updateModalDimensions);
    return () => {
      window.removeEventListener('resize', updateModalDimensions);
    };
  });

  return (
    <>
      <Box
        display="flex"
        alignItems="flex-start"
        justifyContent="center"
        pt={1}
      >
        <TextField
          placeholder="都市名"
          size="small"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              handleAddCity();
            }
          }}
          error={!!errorMessage}
          helperText={errorMessage !== '' ? errorMessage : ' '}
        />
        <Button
          variant="contained"
          onClick={handleAddCity}
          sx={{ marginLeft: '8px' }}
        >
          追加
        </Button>
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

      {catMayoIsVisible ? (
        <Button
          onClick={scrollToTop}
          startIcon={
            <img src={catMayo} style={{ maxWidth: '100%', height: 'auto' }} />
          }
          style={{
            position: 'fixed',
            width: '10%',
            height: '10%',
            bottom: '0%',
            right: `${catMayoPos < 90 ? catMayoPos : 180 - catMayoPos}%`,
          }}
        />
      ) : (
        <></>
      )}
    </>
  );
};

export default memo(WeatherPage);
