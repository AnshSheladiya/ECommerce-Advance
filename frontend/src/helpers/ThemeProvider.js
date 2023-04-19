// ThemeProvider.js

import React, { useState, useContext, createContext } from 'react';

const ThemeContext = createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const theme = {
    primaryColor: darkMode ? '#FFFFFF' : '#274060',
    secondaryColor: darkMode ? '#FFFFFF' : '#335c81',
    backgroundColor: darkMode ? '#1B2845' : '#65AFFF',
    bodyBackgroundColor: darkMode ? '#FFFFFF' : '#1B2845',
    accentColor: darkMode ? '#000000' : '#5899E2',
    isDarkMode: darkMode,
    toggleDarkMode,
  };

  return (
    <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
  );
}
