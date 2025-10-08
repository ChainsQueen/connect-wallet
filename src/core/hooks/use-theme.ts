import { useState, useEffect } from 'react';

type Theme = 'light' | 'dark';

/**
 * Get initial theme based on localStorage or system preference
 */
function getInitialTheme(): Theme {
  // Check localStorage for saved theme preference
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  if (savedTheme) {
    return savedTheme;
  }
  
  // Check system preference
  if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  
  return 'light';
}

/**
 * Custom hook for managing theme state
 * Persists theme preference in localStorage
 * Automatically detects system color scheme preference
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    const initialTheme = getInitialTheme();
    
    // Apply theme class immediately on initialization
    const root = document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(initialTheme);
    
    return initialTheme;
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Remove both classes first
    root.classList.remove('light', 'dark');
    
    // Add the current theme class
    root.classList.add(theme);
    
    // Save theme preference to localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  return {
    theme,
    toggleTheme,
    isDark: theme === 'dark',
  };
}
