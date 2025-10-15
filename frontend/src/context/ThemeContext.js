// src/context/ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    colors: isDarkMode
      ? {
          // Dark theme colors
          primary: '#FF4500',
          secondary: '#E8E9EB',
          background: '#1A1A1B',
          lightGray: '#272729',
          border: '#343536',
          error: '#FF6B6B',
          cardBackground: '#272729',
          text: '#E8E9EB',
          textSecondary: '#B8B9BB',
        }
      : {
          // Light theme colors
          primary: '#FF4500',
          secondary: '#1A1A1B',
          background: '#FFFFFF',
          lightGray: '#F6F7F8',
          border: '#DAE0E6',
          error: '#FF0000',
          cardBackground: '#FFFFFF',
          text: '#1A1A1B',
          textSecondary: '#666666',
        },
  };

  return (
    <ThemeContext.Provider value={{ ...theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeContext;
