import { Button } from '@mui/material';
import React from 'react';
import { memo, useEffect, useState } from 'react';

export const WeatherPage = (): JSX.Element => {
  const [catMayoIsVisible, setCatMayoIsVisible] = useState(false);
  const [catMayoPos, setCatMayoPos] = useState(0);
  const [catMayo, setCatMayo] = useState('/cat_mayo1.png');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
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

  const update = () => {
    setCatMayoPos((prePos) => (prePos + 1) % 180);
  };

  useEffect(() => {
    const timer = setInterval(update, 100);
    return () => {
      clearInterval(timer);
    };
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

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

  return (
    <>
      {catMayoIsVisible ? (
        <Button
          onClick={scrollToTop}
          startIcon={
            <img
              src={catMayo}
              style={{
                maxWidth: '100%',
                height: '100%',
                transform: catMayoPos < 90 ? 'scaleX(1)' : 'scaleX(-1)',
              }}
            />
          }
          style={{
            position: 'fixed',
            width: `${windowWidth / 10}px`,
            height: `${windowWidth / 10}px`,
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
