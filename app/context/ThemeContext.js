import React, { createContext, useState, useEffect, useContext } from 'react';

// Create the context
const ThemeContext = createContext();

// Create a custom hook to use the context
export const useTheme = () => {
  return useContext(ThemeContext);
};

// Create the provider component
export const ThemeProvider = ({ children }) => {
  // Use state to track the theme
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check local storage or system preference on initial load
    const savedMode = localStorage.getItem('isDarkMode');
    if (savedMode !== null) {
      return JSON.parse(savedMode);
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Use useEffect to apply the class and save the preference
  useEffect(() => {
    const root = window.document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    // We save the preference to localStorage only when it's explicitly set.
    // However, if we want to revert to system default, we need to remove this key.
    localStorage.setItem('isDarkMode', isDarkMode);
  }, [isDarkMode]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setIsDarkMode(prevMode => {
      // Manually toggling the theme removes the saved preference from localStorage
      // so the app reverts to system default on the next page load.
      localStorage.removeItem('isDarkMode');
      return !prevMode;
    });
  };

  const value = {
    isDarkMode,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};