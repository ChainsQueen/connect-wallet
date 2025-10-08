import { motion } from 'framer-motion';
import { useTheme } from '../core/hooks/use-theme';

/**
 * ThemeToggle Component
 * Button to switch between light and dark modes
 */
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  console.log('Current theme:', theme);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      whileHover={{ scale: 1.1, rotate: 15 }}
      whileTap={{ scale: 0.95, rotate: -15 }}
      onClick={() => {
        console.log('Theme toggle clicked, current:', theme);
        toggleTheme();
      }}
      className="fixed top-6 right-6 p-3 rounded-full bg-white/10 dark:bg-purple-800/40 backdrop-blur-md border border-purple-200/50 dark:border-purple-400/30 hover:bg-white/20 dark:hover:bg-purple-700/50 transition-colors duration-300 shadow-lg z-50"
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        // Moon icon for dark mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-800"
        >
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        </svg>
      ) : (
        // Sun icon for light mode
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-yellow-300"
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2" />
          <path d="M12 20v2" />
          <path d="m4.93 4.93 1.41 1.41" />
          <path d="m17.66 17.66 1.41 1.41" />
          <path d="M2 12h2" />
          <path d="M20 12h2" />
          <path d="m6.34 17.66-1.41 1.41" />
          <path d="m19.07 4.93-1.41 1.41" />
        </svg>
      )}
    </motion.button>
  );
}
