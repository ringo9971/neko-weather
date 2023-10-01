import { Button } from '@mui/material';
import React from 'react';
import { memo, useEffect, useState } from 'react';

interface Mayo {
  src: string;
  left: number;
  top: number;
  vy: number;
  vx: number;
  direction: boolean;
  key: number;
}

const defaultMayos: Mayo[] = [
  { src: '', left: 0, top: 0, vx: 1, vy: 4, direction: false, key: 0 },
  { src: '', left: 0, top: 50, vx: 3, vy: 2, direction: false, key: 1 },
  { src: '', left: 0, top: 100, vx: 4, vy: -1, direction: false, key: 2 },
  { src: '', left: 50, top: 100, vx: 2, vy: -3, direction: false, key: 3 },
  { src: '', left: 100, top: 100, vx: -1, vy: -4, direction: true, key: 4 },
  { src: '', left: 100, top: 50, vx: -3, vy: -2, direction: true, key: 5 },
  { src: '', left: 100, top: 0, vx: -4, vy: 1, direction: true, key: 6 },
  { src: '', left: 50, top: 0, vx: -2, vy: 3, direction: true, key: 7 },
];

const shuffleArray = (array: number[]) => {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
};

const shuffleAndMapMayos = (mayos: Mayo[]) => {
  const shuffledIndeices = shuffleArray([3, 4, 5, 6, 7, 8, 9, 10]);

  return mayos.map((mayos, index) => ({
    ...mayos,
    src: `/cat_mayo/${shuffledIndeices[index]}.png`,
  }));
};

export const WeatherPage = (): JSX.Element => {
  const [catMayoIsVisible, setCatMayoIsVisible] = useState(false);
  const [catMayoPos, setCatMayoPos] = useState(0);
  const [catMayo, setCatMayo] = useState('/cat_mayo1.png');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const [catIsVisible, setCatIsVisible] = useState(false);
  const [mayos, setMayos] = useState<Mayo[]>(defaultMayos);

  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };

  const scrollToTop = () => {
    setCatMayo('/cat_mayo/2.png');
    setCatIsVisible(true);
    setMayos(shuffleAndMapMayos(defaultMayos));
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 200) {
      setCatMayoIsVisible(true);
    } else {
      setCatMayo('/cat_mayo/1.png');
      setCatMayoIsVisible(false);
    }
  };

  const update = () => {
    setCatMayoPos((prePos) => (prePos + 1) % 180);

    if (!catIsVisible) {
      return;
    }

    setMayos((mayos) => {
      return mayos.map((cat) => {
        const speed = Math.hypot(cat.vx, cat.vy);
        return {
          ...cat,
          top: cat.top + (cat.vy / speed) * 3,
          left: cat.left + (cat.vx / speed) * 3,
        };
      });
    });

    if (mayos[0].top >= 110) {
      setCatIsVisible(false);
    }
  };

  useEffect(() => {
    const timer = setInterval(update, 100);
    return () => {
      clearInterval(timer);
    };
  }, [catIsVisible]);

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
      {catIsVisible &&
        mayos.map(({ src, left, top, direction, key }) => (
          <img
            src={src}
            key={key}
            style={{
              position: 'fixed',
              width: `${windowWidth / 10}px`,
              height: `${windowWidth / 10}px`,
              left: `${left - 5}%`,
              top: `${top - 5}%`,
              transform: direction ? 'scaleX(1)' : 'scaleX(-1)',
            }}
          />
        ))}
    </>
  );
};

export default memo(WeatherPage);
