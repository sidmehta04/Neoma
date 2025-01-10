import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../../lib/superbase';
import { useTheme } from '../../context/ThemeContext';

const SearchBar = ({ 
  className = '', 
  onSearch, 
  showResults = true,
  placeholder = "Search companies...",
  onClose,
  onResultSelect 
}) => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const searchRef = useRef(null);

  useEffect(() => {
    const handleSearch = async () => {
      if (!searchQuery.trim()) {
        setSearchResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const { data, error: searchError } = await supabase
          .from('companies')
          .select(`
            id,
            name,
            symbol,
            sector,
            stock_prices (
              price,
              change_percentage,
              trade_date
            )
          `)
          .or(`name.ilike.%${searchQuery}%,symbol.ilike.%${searchQuery}%`)
          .order('name', { ascending: true })
          .limit(5);

        if (searchError) throw searchError;

        if (data) {
          const processedResults = data.map(company => ({
            id: company.id,
            name: company.name,
            symbol: company.symbol,
            sector: company.sector,
            price: company.stock_prices?.[0]?.price ?? 'N/A',
            change: company.stock_prices?.[0]?.change_percentage ?? 0,
          }));
          setSearchResults(processedResults);
        }
      } catch (err) {
        console.error('Search error:', err);
        setError('Failed to fetch search results');
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(handleSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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
      // If onResultSelect prop is provided, use it
      onResultSelect(result);
    } else {
      // Default behavior - navigate to share details
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
    input: {
      light: "bg-white/80 border-gray-200 text-gray-900 focus:bg-white",
      dark: "bg-gray-800/50 border-gray-700 text-white focus:bg-gray-800"
    },
    dropdown: {
      light: "bg-white border-gray-200 shadow-lg",
      dark: "bg-gray-800 border-gray-700 shadow-lg"
    },
    resultItem: {
      light: "hover:bg-gray-50 border-gray-200",
      dark: "hover:bg-gray-700 border-gray-700"
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
    <div className={`relative z-[40] ${className}`} ref={searchRef}>
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

      {/* Search Results Dropdown */}
      {showResults && isSearchOpen && (searchResults.length > 0 || isLoading || error) && (
        <div className={`absolute z-[50] w-full mt-2 rounded-lg border transition-all duration-300
  ${themeStyles.dropdown[theme]} shadow-2xl`}>
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
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`font-medium ${themeStyles.text.primary[theme]}`}>
                    {result.name}
                  </h3>
                  <div className="flex items-center gap-2">
                    <span className={themeStyles.text.secondary[theme]}>
                      {result.symbol}
                    </span>
                    <span className={themeStyles.text.tertiary[theme]}>
                      {result.sector}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className={themeStyles.text.primary[theme]}>
                    ₹{formatNumber(result.price)}
                  </p>
                  <span className={`text-sm ${
                    parseFloat(result.change) >= 0 ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {formatPercentage(result.change)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;