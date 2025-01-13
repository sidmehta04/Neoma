import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Globe, Building2, TrendingUp, Camera, Activity, 
  HeartPulse, AlertCircle, TrendingDown, AlertOctagon
} from 'lucide-react';

const CACHE_DURATION = 12 * 60 * 60 * 1000;
const API_LIMIT = 100;

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL2 || "http://localhost:5001",
  withCredentials: true,
  timeout: 10000,
});

const NewsPage = () => {
  const [news, setNews] = useState({});
  const [stockNews, setStockNews] = useState({});
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('national');
  const [apiCalls, setApiCalls] = useState(0);
  const [lastResetTime, setLastResetTime] = useState(null);

  const categories = {
    national: "India national news",
    business: "India business news",
    technology: "India technology news",
    entertainment: "Bollywood news",
    sports: "India cricket news",
    health: "India healthcare news"
  };

  // Enhanced API call tracking
  useEffect(() => {
    const initializeApiCounter = () => {
      const storedData = localStorage.getItem('apiCallsData');
      if (storedData) {
        const { count, resetTime } = JSON.parse(storedData);
        const lastReset = new Date(resetTime);
        const now = new Date();
        
        if (now - lastReset >= 24 * 60 * 60 * 1000) {
          localStorage.setItem('apiCallsData', JSON.stringify({
            count: 0,
            resetTime: now.toISOString()
          }));
          setApiCalls(0);
          setLastResetTime(now);
        } else {
          setApiCalls(count);
          setLastResetTime(new Date(resetTime));
        }
      } else {
        const now = new Date();
        localStorage.setItem('apiCallsData', JSON.stringify({
          count: 0,
          resetTime: now.toISOString()
        }));
        setLastResetTime(now);
      }
    };

    initializeApiCounter();
  }, []);

  // Enhanced caching mechanism
  const getCachedData = (key) => {
    try {
      const cached = localStorage.getItem(key);
      if (!cached) return null;

      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp > CACHE_DURATION) {
        localStorage.removeItem(key);
        return null;
      }
      return data;
    } catch (error) {
      console.error('Cache retrieval error:', error);
      localStorage.removeItem(key);
      return null;
    }
  };

  const setCachedData = (key, data) => {
    try {
      const cacheObj = { data, timestamp: Date.now() };
      localStorage.setItem(key, JSON.stringify(cacheObj));
    } catch (error) {
      console.error('Cache setting error:', error);
    }
  };

  // Enhanced stock news fetching
  const fetchStockNews = async (company) => {
    try {
      // Set fixed start date (August 2024) and get current date
      const fromDate = '2024-08-01';
      const today = new Date();
      const toDate = today.toISOString().split('T')[0];  // Format: YYYY-MM-DD

      // Create a more focused query for the company
      // Create a focused query for stock-related news
      const query = encodeURIComponent(`("${company.name}" OR "${company.symbol}") AND (stock OR shares OR NSE OR BSE OR trading OR "stock market")`);
      
      incrementApiCall();
      const response = await fetch(
        `https://newsapi.org/v2/everything?` +
        `q=${query}&` +
        `from=${fromDate}&` +
        `to=${toDate}&` +
        `language=en&` +
        `sortBy=publishedAt&` +
        `pageSize=15&` +
        `apiKey=776d43fd7afc47c9843cb855711f30cb`
      );
      
      if (!response.ok) {
        throw new Error(`News API error: ${response.statusText}`);
      }
      
      const result = await response.json();

      // Filter and process the articles
      const articles = (result.articles || []);

      // Sort by date and take the most recent ones
      const sortedArticles = uniqueArticles
        .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
        .slice(0, 3)
        .map((article, index) => ({
          id: index,
          title: article.title,
          description: article.description,
          source: article.source.name,
          date: article.publishedAt,
          imageUrl: article.urlToImage || '/api/placeholder/400/200',
          url: article.url
        }));

      return sortedArticles;
    } catch (error) {
      console.error(`Error fetching news for ${company.name}:`, error);
      return [];
    }
  };

  const fetchCompanies = async () => {
    try {
      const cachedCompanies = getCachedData('companies');
      const cachedStockNews = getCachedData('stockNews');
      
      if (cachedCompanies && cachedStockNews) {
        setCompanies(cachedCompanies);
        setStockNews(cachedStockNews);
        return;
      }

      if (apiCalls >= API_LIMIT) {
        setError('API call limit reached for today. Please try again tomorrow.');
        return;
      }

      const { data } = await axiosInstance.get('/api/shares');
      setCompanies(data);

      const stockNewsMap = {};
      for (const company of data) {
        const articles = await fetchStockNews(company);
        stockNewsMap[company.name] = articles;
      }

      setCachedData('companies', data);
      setCachedData('stockNews', stockNewsMap);
      setStockNews(stockNewsMap);
    } catch (error) {
      console.error('Error fetching companies:', error);
      setError('Failed to fetch company data. Please try again later.');
    }
  };

  const fetchAllNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Check if we have all categories cached
      const cachedAllNews = getCachedData('all_news');
      if (cachedAllNews) {
        setNews(cachedAllNews);
        setLoading(false);
        return;
      }

      const newsData = {};
      for (const category of Object.keys(categories)) {
        const articles = await fetchNewsByCategory(category);
        newsData[category] = articles;
      }
      
      // Cache all news
      setCachedData('all_news', newsData);
      
      setNews(newsData);
    } catch (err) {
      setError('Failed to fetch news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllNews();
    fetchCompanies();
  }, []);

  const NewsCard = ({ article }) => (
    <div className="bg-[rgb(16,20,30)] rounded-lg mb-4 overflow-hidden hover:bg-[rgb(20,25,35)] transition-colors">
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="w-full">
            <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2">
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="hover:text-blue-400">
                {article.title}
              </a>
            </h3>
            <p className="text-xs sm:text-sm text-gray-400">
              {article.source} • {new Date(article.date).toLocaleDateString('en-IN')}
            </p>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          {article.imageUrl && (
            <img 
              src={article.imageUrl} 
              alt={article.title}
              className="w-full sm:w-32 h-48 sm:h-24 object-cover rounded"
            />
          )}
          <p className="text-sm sm:text-base text-gray-300 flex-1 line-clamp-3 sm:line-clamp-none">
            {article.description}
          </p>
        </div>
      </div>
    </div>
  );

  const StockNewsSection = () => (
    <div className="mt-8 pt-8 border-t border-gray-800">
      <h2 className="text-xl sm:text-2xl font-bold mb-6">Stock Market News</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {companies.map((company) => (
          <div key={company.id} className="bg-[rgb(16,20,30)] rounded-lg p-4">
            <div className="flex items-center gap-3 mb-4">
              {company.logo && (
                <img 
                  src={company.logo} 
                  alt={company.name} 
                  className="w-8 h-8 rounded-full"
                />
              )}
              <div>
                <h3 className="font-semibold text-white">{company.name}</h3>
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-400">{company.symbol}</span>

                </div>
              </div>
            </div>
            <div className="space-y-3">
              {stockNews[company.name]?.map((article, index) => (
                <div key={index} className="border-t border-gray-800 pt-3">
                  <h4 className="text-sm text-white font-medium line-clamp-2 hover:text-blue-400">
                    <a href={article.url} target="_blank" rel="noopener noreferrer">
                      {article.title}
                    </a>
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    {article.source} • {new Date(article.date).toLocaleDateString('en-IN')}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const ApiCounter = () => {
    const timeUntilReset = lastResetTime ? new Date(lastResetTime.getTime() + 24 * 60 * 60 * 1000) : null;
    const remainingCalls = API_LIMIT - apiCalls;
    
    return (
      <div className="fixed bottom-4 right-4 bg-gray-800 p-4 rounded-lg shadow-lg z-50">
        <div className="flex items-center gap-2 text-sm">
          <AlertOctagon className="w-4 h-4 text-yellow-400" />
          <span className="font-medium">API Calls Today: {apiCalls}/{API_LIMIT}</span>
        </div>
        <div className="text-xs text-gray-400 mt-1">
          Remaining: {remainingCalls} calls
        </div>
        {timeUntilReset && (
          <div className="text-xs text-gray-400 mt-1">
            Resets at: {timeUntilReset.toLocaleTimeString()}
          </div>
        )}
      </div>
    );
  };

  if (error) {
    return (
      <div className="bg-red-900/20 border border-red-500 rounded-lg p-4">
        <div className="flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <h3 className="text-lg font-semibold text-red-500">Error</h3>
        </div>
        <p className="text-red-400 mt-2">{error}</p>
      </div>
    );
  }

  const tabIcons = {
    national: Globe,
    business: Building2,
    technology: TrendingUp,
    entertainment: Camera,
    sports: Activity,
    health: HeartPulse
  };

  return (
    <div className="min-h-screen bg-[rgb(11,15,23)] text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <header className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">Indian News Dashboard</h1>
          <p className="text-sm sm:text-base text-gray-400">Curated news from India's leading sources</p>
        </header>

        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-1 bg-[rgb(16,20,30)] p-1 rounded-lg">
            {Object.entries(categories).map(([key]) => {
              const Icon = tabIcons[key];
              return (
                <button
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`
                    flex items-center justify-center gap-1 sm:gap-2 py-2 px-2 sm:px-3 rounded text-xs sm:text-sm
                    ${activeTab === key 
                      ? 'bg-[rgb(25,30,40)] text-white' 
                      : 'text-gray-400 hover:text-white hover:bg-[rgb(20,25,35)]'
                    }
                    transition-colors
                  `}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                  <span className="sm:hidden">{key.slice(0, 3)}</span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative overflow-hidden h-[calc(100vh-200px)] sm:h-[600px]">
          {Object.entries(news).map(([category, articles]) => (
            <div
              key={category}
              className={`
                absolute top-0 left-0 w-full transition-all duration-300 overflow-y-auto pr-2 sm:pr-4
                ${activeTab === category ? 'opacity-100 z-10' : 'opacity-0 z-0'}
              `}
              style={{ height: '100%' }}
            >
              {loading ? (
                <div className="flex items-center justify-center h-full">
                  <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
                </div>
              ) : articles?.length > 0 ? (
                <div className="space-y-4">
                  {articles.map(article => (
                    <NewsCard key={article.id} article={article} />
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center h-full">
                  <p className="text-center text-gray-400">No news available for this category</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <StockNewsSection />
        
        {/* API Counter */}
        <ApiCounter />
      </div>
    </div>
  );
};

export default NewsPage;