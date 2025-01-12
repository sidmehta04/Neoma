import React, { useEffect } from 'react';
import { Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

const ThemeToggle = ({ isMobileMenu }) => {
  const { setTheme } = useTheme();

  // Effect to set dark theme on component mount
  useEffect(() => {
    setTheme('dark');
    localStorage.setItem('theme', 'dark');
  }, [setTheme]);

  if (isMobileMenu) {
    return (
      <button
        className="flex items-start space-x-3 w-full text-left text-gray-200"
      >
        <div className="p-1.5 rounded-lg bg-gray-700 text-blue-400">
          <Sun className="w-4 h-4" />
        </div>
        <div>
          <div className="font-medium">Theme</div>
          <div className="text-sm mt-0.5 text-gray-400">
            Dark mode enabled
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      className="text-xl font-medium py-2 px-4 rounded-lg 
        transition-all duration-200 flex items-center space-x-2
        text-gray-300 hover:text-white hover:bg-gray-800"
      aria-label="Dark mode enabled"
    >
      <span>Theme</span>
      <Sun className="w-5 h-5" />
    </button>
  );
};

export default ThemeToggle;