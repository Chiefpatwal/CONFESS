import { useState, useEffect } from 'react';

const useTheme = () => {
  // DaisyUI theme names - make sure these match your tailwind.config.js
  const themes = {
    LIGHT: 'light',
    DARK: 'dark',
    BLACK: 'black',
    LUXURY: 'luxury'
  };

  // Initialize with a safe default
  const [theme, setTheme] = useState(themes.DARK);

  // Initialize theme on mount
  useEffect(() => {
    // Try to get saved theme, fallback to 'dark'
    let savedTheme = themes.DARK;
    
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const stored = localStorage.getItem('theme');
        if (stored && Object.values(themes).includes(stored)) {
          savedTheme = stored;
        }
      }
    } catch (error) {
      console.warn('localStorage not available, using default theme');
    }
    
    setTheme(savedTheme);
    applyTheme(savedTheme);
  }, []);

  // Apply theme to document
  const applyTheme = (themeName) => {
    if (typeof document !== 'undefined') {
      // Set data-theme attribute for DaisyUI
      document.documentElement.setAttribute('data-theme', themeName);
      
      // Optional: Set class for additional custom styling
      document.documentElement.className = themeName;
      
      // Try to save to localStorage
      try {
        if (typeof window !== 'undefined' && window.localStorage) {
          localStorage.setItem('theme', themeName);
        }
      } catch (error) {
        console.warn('Could not save theme to localStorage');
      }
    }
  };

  // Toggle between light and dark (you can expand this)
  const toggleTheme = () => {
    const newTheme = theme === themes.DARK ? themes.LIGHT : themes.DARK;
    setTheme(newTheme);
    applyTheme(newTheme);
  };

  // Set specific theme
  const setSpecificTheme = (themeName) => {
    if (Object.values(themes).includes(themeName)) {
      setTheme(themeName);
      applyTheme(themeName);
    } else {
      console.warn(`Theme "${themeName}" is not available`);
    }
  };

  return {
    theme,
    themes,
    toggleTheme,
    setTheme: setSpecificTheme
  };
};

export default useTheme;