import React, { createContext, useState, useContext } from 'react';

// Contexto para o tema
const ThemeContext = createContext();

// Provedor do contexto
export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Hook personalizado para usar o contexto
export const useTheme = () => useContext(ThemeContext);
