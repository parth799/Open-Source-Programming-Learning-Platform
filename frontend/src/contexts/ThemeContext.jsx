import React, { createContext, useState, useContext, useEffect } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { createAppTheme } from '../theme';

// Create a context for theme state
const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Theme provider component
export const ThemeProvider = ({ children }) => {
  // Check localStorage for saved preference, default to 'light'
  const [mode, setMode] = useState(() => {
    const savedMode = localStorage.getItem('themeMode');
    return savedMode || 'light';
  });

  // Create theme based on current mode
  const theme = createAppTheme(mode);
  
  // Toggle between light and dark mode
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      localStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Update theme mode when it changes
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);

  // Theme context value
  const value = {
    mode,
    toggleTheme,
    isDarkMode: mode === 'dark',
  };

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider; 