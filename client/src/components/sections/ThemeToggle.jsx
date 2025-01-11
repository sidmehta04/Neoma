import React, { useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ isMobileMenu }) => {
  const { theme, setTheme } = useTheme();

  // Effect to load saved theme preference on component mount
  useEffect(() => {
    // Get saved theme from localStorage
    const savedTheme = localStorage.getItem('theme');
    
    // If there's a saved theme, use it
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If no saved theme, check user's system preference
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, [setTheme]);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    // Save theme preference to localStorage
    localStorage.setItem('theme', newTheme);
  };

  if (isMobileMenu) {
    return (
      <button
        onClick={toggleTheme}
        className={`flex items-start space-x-3 w-full text-left
          ${theme === "dark" ? "text-gray-200" : "text-gray-900"}`}
      >
        <div className={`p-1.5 rounded-lg
          ${theme === "dark" ? "bg-gray-700 text-blue-400" : "bg-blue-100 text-blue-600"}`}
        >
          {theme === 'light' ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </div>
        <div>
          <div className="font-medium">Theme</div>
          <div className={`text-sm mt-0.5 ${theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
            Switch to {theme === 'light' ? 'dark' : 'light'} mode
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className={`text-xl font-medium py-2 px-4 rounded-lg 
        transition-all duration-200 flex items-center space-x-2
        ${theme === "dark"
          ? "text-gray-300 hover:text-white hover:bg-gray-800"
          : "text-gray-700 hover:text-blue-600 hover:bg-blue-50"
        }`}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <span>Theme</span>
      {theme === 'light' ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
    </button>
  );
};

export default ThemeToggle;