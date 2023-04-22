//useTheme.js
import { useState, useEffect } from 'react';

const useTheme = () => {
  const [mode, setMode] = useState(
    localStorage.getItem('mode') || 'theme1'
  );

  useEffect(() => {
    const root = window.document.documentElement;
    const color =
      mode === 'theme1' ? '#1B2845' :
      mode === 'theme2' ? '#5e5192' :
      mode === 'theme3' ? '#FF6969' :
      mode === 'light' ? '#815B5B' : null;
      if (color) {
      root.style.setProperty('--body-background-color', color);
      localStorage.setItem('mode', mode);
    }
  }, [mode]);

  const handleModeChange = (event) => {
    const newMode = event.target.value;
    setMode(newMode);
    localStorage.setItem('mode', newMode);
  };

  const themes = [
    { mode: 'theme1', color: '#1B2845' },
    { mode: 'theme2', color: '#5e5192' },
    { mode: 'theme3', color: '#FF6969' },
    { mode: 'light', color: '#815B5B' },
  ];

  return { mode, handleModeChange, themes };
};

export default useTheme;
