import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface ScreenContextProps {
  screenSize: number;
  setScreenSize: React.Dispatch<React.SetStateAction<number>>;
  width: number;
  height: number;
}

const ScreenContext = createContext<ScreenContextProps | undefined>(undefined);

export const ScreenProvider = ({ children }: { children: ReactNode }) => {
  const [screenSize, setScreenSize] = useState<number>(0);
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);

  useEffect(() => {
    if(window){
      const resize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
      };
      window.addEventListener('resize', resize);
      resize();
      return () => window.removeEventListener('resize', resize);
    }
  }, []);

  useEffect(() => {
    setScreenSize(Math.min(width/16*9, height));
  }, [width, height]);

  return (
    <ScreenContext.Provider value={{ screenSize, setScreenSize, width, height }}>
      {children}
    </ScreenContext.Provider>
  );
};

export const useScreen = () => {
  const context = useContext(ScreenContext);
  if (!context) {
    throw new Error('useScreen must be used within a ScreenProvider');
  }
  return context;
};
