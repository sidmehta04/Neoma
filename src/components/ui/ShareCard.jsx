import React, { useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTheme } from '../../context/ThemeContext';

const ShareCard = ({ 
  id,
  name, 
  logo, 
  price, 
  change, 
  marketCap
}) => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const isPositive = parseFloat(change) >= 0;
  const [imageError, setImageError] = useState(false);

  const handleClick = () => {
    navigate(`/shares/${encodeURIComponent(name)}`);
  };

  const getInitials = (name) => {
    if (!name) return "N/A";
    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div
      className={`p-4 sm:p-5 md:p-6 rounded-xl backdrop-blur-sm transition-all duration-300 cursor-pointer feature-card hover:scale-[1.02]`}
      onClick={handleClick}
      style={{
        backgroundColor: theme === 'light' 
          ? 'rgba(243, 244, 246, 0.8)' 
          : 'rgba(31, 41, 55, 0.5)',
        borderColor: theme === 'light'
          ? 'rgba(59, 130, 246, 0.1)'
          : 'rgba(75, 85, 99, 0.7)'
      }}
    >
      <div className="flex items-start justify-between mb-3 sm:mb-4">
        <div className="flex items-center space-x-2 sm:space-x-3">
          {logo && !imageError ? (
            <div className="w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg overflow-hidden flex items-center justify-center">
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-full h-full object-contain"
                onError={handleImageError}
              />
            </div>
          ) : (
            <div className={`w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-lg flex items-center justify-center font-semibold text-sm sm:text-base
              ${theme === 'light' ? 'bg-blue-100 text-blue-600' : 'bg-gray-700 text-white'}`}
            >
              {getInitials(name)}
            </div>
          )}
          <div>
            <h3 className={`text-base sm:text-lg font-semibold transition-colors duration-300 line-clamp-1
              ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
            >
              {name || 'N/A'}
            </h3>
            <p className={`text-xs sm:text-sm transition-colors duration-300
              ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
            >
              Market Cap: {marketCap ? ` ${marketCap}cr` : 'N/A'}
            </p>
          </div>
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className={`text-xs sm:text-sm transition-colors duration-300
            ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}
          >
            Current Price
          </p>
          <p className={`text-lg sm:text-xl md:text-2xl font-bold transition-colors duration-300
            ${theme === 'light' ? 'text-gray-900' : 'text-white'}`}
          >
            {price ? `₹${Number(price).toFixed(2)}` : 'N/A'}
          </p>
        </div>
        <div
          className={`flex items-center space-x-1 ${
            isPositive 
              ? "text-green-500 dark:text-green-400" 
              : "text-red-500 dark:text-red-400"
          }`}
        >
          {isPositive ? 
            <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5" /> : 
            <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5" />
          }
          <span className="text-base sm:text-lg font-semibold">
            {isPositive ? "+" : ""}
            {!isNaN(parseFloat(change)) 
              ? parseFloat(change).toFixed(2) 
              : 'N/A'}%
          </span>
        </div>
      </div>
    </div>
  );
};

export default ShareCard;