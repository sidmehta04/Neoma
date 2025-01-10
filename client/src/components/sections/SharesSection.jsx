import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';
import ShareCard from '../ui/ShareCard';
import SearchBar from '../ui/Searchbar';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

const SharesSection = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [shares, setShares] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visibleShares, setVisibleShares] = useState(6);
  const [filteredShares, setFilteredShares] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchShares = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/shares`, {
          withCredentials: true
        });

        const processedShares = response.data.map(share => ({
          id: share.id,
          name: share.name,
          logo: share.logo || '',
          price: share.latestPrice.price.toFixed(2),
          change: share.latestPrice.change_percentage?.toFixed(2) || '0.00',
          marketCap: share.latestPrice.marketcap || 'N/A',
        }));

        setShares(processedShares);
        handleSearch(searchQuery, processedShares);
        setError(null);
      } catch (err) {
        console.error('Error fetching shares:', err);
        setError('Failed to load shares. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchShares();
  }, []);

  const handleSearch = (query, sharesList = shares) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredShares(sharesList);
      setVisibleShares(6);
    } else {
      const filtered = sharesList.filter(share =>
        share.name.toLowerCase().includes(query.toLowerCase()) ||
        share.logo.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredShares(filtered);
      setVisibleShares(filtered.length);
    }
  };

  const handleShareClick = (shareName) => {
    navigate(`/shares/${encodeURIComponent(shareName)}`);
  };

  const toggleShares = () => {
    if (visibleShares === filteredShares.length) {
      setVisibleShares(6);
    } else {
      setVisibleShares(prevVisible => Math.min(prevVisible + 3, filteredShares.length));
    }
  };

  if (loading) {
    return (
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 flex justify-center items-center transition-colors duration-300"
           style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-base sm:text-lg" style={{ color: 'var(--text-primary)' }}>
          Loading shares...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 flex justify-center items-center transition-colors duration-300"
           style={{ backgroundColor: 'var(--bg-primary)' }}>
        <div className="text-base sm:text-lg text-red-500">
          {error}
        </div>
      </div>
    );
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 transition-colors duration-300"
             style={{ backgroundColor: 'var(--bg-primary)' }}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-4 transition-colors duration-300"
              style={{ color: 'var(--text-primary)' }}>
            Featured Unlisted Shares
          </h2>
          <p className="text-base sm:text-lg md:text-xl transition-colors duration-300"
             style={{ color: 'var(--text-secondary)' }}>
            Discover high-potential unlisted companies
          </p>
        </div>

        <SearchBar 
          className="mb-4 sm:mb-6"
          onSearch={handleSearch}
          showResults={false}
          routePrefix="/shares/"
          query={searchQuery}
          theme={theme}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredShares.slice(0, visibleShares).map((share) => (
            <div 
              key={share.id} 
              onClick={() => handleShareClick(share.name)}
              className="cursor-pointer transform transition-transform duration-300 hover:scale-102"
            >
              <ShareCard
                name={share.name}
                logo={share.logo}
                price={share.price}
                change={share.change}
                marketCap={share.marketCap}
                theme={theme}
              />
            </div>
          ))}
        </div>

        {filteredShares.length > 6 && !searchQuery && (
          <div className="mt-8 sm:mt-10 text-center">
            <button
              className="btn-primary px-6 py-2 sm:px-8 sm:py-3 text-sm sm:text-base rounded-lg
                        transition-all duration-300 hover:scale-105"
              onClick={toggleShares}
            >
              {visibleShares === filteredShares.length ? "View Less" : "View More"}
            </button>
          </div>
        )}

        {filteredShares.length === 0 && (
          <div className="text-center mt-8 sm:mt-10 text-base sm:text-lg transition-colors duration-300"
               style={{ color: 'var(--text-secondary)' }}>
            No shares found matching your search.
          </div>
        )}
      </div>
    </section>
  );
};

export default SharesSection;