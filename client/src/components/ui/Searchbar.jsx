import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTheme } from '../../context/ThemeContext';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

const SearchBar = ({ 
  className = '', 
  onSearch, 
  showResults = true,
  placeholder = "Search companies...",
  onClose,
  onResultSelect,
  maxHeight = "400px"
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const containerRef = useRef(null);
  const resultsRef = useRef(null);

  // Handle search
  useEffect(() => {
    const controller = new AbortController();
    
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }
    
      setIsLoading(true);
      setError(null);
    
      try {
        const { data } = await axios.get(`${API_URL}/api/companies/search`, {
          params: {
            q: searchQuery,
            limit: 10
          },
          headers: {
            'Content-Type': 'application/json'
          },
          signal: controller.signal
        });
    
        setSearchResults(data.results || []);
      } catch (err) {
        if (!axios.isCancel(err)) {
          console.error('Search error:', err);
          setError(err.response?.data?.error || 'Failed to fetch search results');
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    const timeoutId = setTimeout(handleSearch, 300);
    
    return () => {
      controller.abort();
      clearTimeout(timeoutId);
    };
  }, [searchQuery]);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleClear = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearchOpen(false);
    setError(null);
    if (onSearch) onSearch('');
    if (onClose) onClose();
  };

  const handleResultClick = (result) => {
    if (onResultSelect) {
      onResultSelect(result);
    } else {
      navigate(`/shares/${encodeURIComponent(result.name)}`);
    }
    handleClear();
  };

  const formatNumber = (num) => {
    if (!num || isNaN(num)) return 'N/A';
    return new Intl.NumberFormat('en-IN').format(num);
  };

  const formatPercentage = (value) => {
    if (!value && value !== 0) return 'N/A';
    return `${parseFloat(value).toFixed(2)}%`;
  };

  const themeStyles = {
    container: {
      light: "bg-white/80 backdrop-blur-lg shadow-lg",
      dark: "bg-gray-800 shadow-lg"
    },
    input: {
      light: "bg-white/80 backdrop-blur-lg text-gray-900 focus:bg-white",
      dark: "bg-gray-800/50 text-white focus:bg-gray-800"
    },
    results: {
      light: "bg-white/80 backdrop-blur-lg border-t border-gray-200",
      dark: "bg-gray-800 border-t border-gray-700"
    },
    resultItem: {
      light: "hover:bg-gray-50 border-gray-200",
      dark: "hover:bg-gray-700/50 border-gray-700"
    },
    text: {
      primary: {
        light: "text-gray-900",
        dark: "text-white"
      },
      secondary: {
        light: "text-gray-600",
        dark: "text-gray-400"
      },
      tertiary: {
        light: "text-gray-500",
        dark: "text-gray-500"
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative z-999 ${className}`}
    >
      <div className={`rounded-t-lg transition-all duration-300 ${themeStyles.container[theme]} 
        ${isSearchOpen && searchResults.length ? 'rounded-b-none' : 'rounded-lg'}`}
      >
        <div className="relative">
          <input
            type="text"
            placeholder={placeholder}
            className={`w-full px-12 py-3 rounded-lg transition-all duration-300
              focus:outline-none focus:ring-2 focus:ring-blue-500
              ${themeStyles.input[theme]}`}
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setIsSearchOpen(true);
              if (onSearch) onSearch(e.target.value);
            }}
            onFocus={() => setIsSearchOpen(true)}
          />
          <Search 
            className={`absolute left-4 top-1/2 -translate-y-1/2 ${themeStyles.text.secondary[theme]}`} 
            size={20} 
          />
          {searchQuery && (
            <button
              onClick={handleClear}
              className={`absolute right-4 top-1/2 -translate-y-1/2 
                ${themeStyles.text.secondary[theme]} 
                hover:text-gray-900 dark:hover:text-gray-300 
                transition-colors duration-200`}
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Results dropdown */}
      {showResults && isSearchOpen && (searchResults.length > 0 || isLoading || error) && (
        <div 
          ref={resultsRef}
          className={`absolute left-0 right-0 overflow-hidden rounded-b-lg shadow-xl
            ${themeStyles.container[theme]} ${themeStyles.results[theme]}`}
          style={{ maxHeight }}
        >
          <div className="overflow-y-auto" style={{ maxHeight }}>
            {isLoading && (
              <div className={`p-4 ${themeStyles.text.secondary[theme]}`}>
                Searching...
              </div>
            )}

            {error && (
              <div className="p-4 text-red-500">
                {error}
              </div>
            )}

            {searchResults.map((result) => (
              <div
                key={result.id}
                className={`p-4 cursor-pointer border-b transition-all duration-200
                  ${themeStyles.resultItem[theme]} last:border-0`}
                onClick={() => handleResultClick(result)}
              >
                <div className="flex justify-between items-start gap-4">
                  <div className="min-w-0 flex-1">
                    <h3 className={`font-medium truncate ${themeStyles.text.primary[theme]}`}>
                      {result.name}
                    </h3>
                    <div className="flex items-center gap-2 text-sm">
                      <span className={`${themeStyles.text.secondary[theme]} font-medium`}>
                        {result.symbol}
                      </span>
                      <span className={`${themeStyles.text.tertiary[theme]} truncate`}>
                        {result.sector}
                      </span>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`${themeStyles.text.primary[theme]} font-medium`}>
                      ₹{formatNumber(result.price)}
                    </p>
                    <span className={`text-sm font-medium ${
                      parseFloat(result.change) >= 0 ? 'text-green-500' : 'text-red-500'
                    }`}>
                      {formatPercentage(result.change)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;