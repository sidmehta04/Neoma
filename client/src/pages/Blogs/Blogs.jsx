import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Clock, Calendar } from 'lucide-react';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL||import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

const BlogPage = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [blogPosts, setBlogPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchBlogPosts();
  }, []);

  const fetchBlogPosts = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/blog-posts`);
      setBlogPosts(response.data);
    } catch (error) {
      console.error('Error fetching blog posts:', error);
      setError('Failed to load blog posts');
    } finally {
      setLoading(false);
    }
  };

  const handleBlogClick = (slug) => {
    navigate(`/blog/${slug}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-red-500 text-sm sm:text-base text-center">{error}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-rgb(11, 15, 23)' : 'bg-white'}`}>
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-8 md:mb-12 ${
          theme === 'dark' ? 'text-white' : 'text-blue-900'
        }`}>
          Latest Blog Posts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className={`group rounded-xl overflow-hidden transition-all duration-300 
                transform hover:-translate-y-1 cursor-pointer
                ${theme === 'dark' 
                  ? 'bg-gray-800 hover:bg-gray-750 border border-gray-700' 
                  : 'bg-white hover:bg-blue-50 border border-blue-100 shadow-md hover:shadow-xl'}`}
              onClick={() => handleBlogClick(post.slug)}
            >
              {post.featured_image && (
                <div className="relative h-48 w-full overflow-hidden">
                  <img 
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 
                      group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-4 sm:p-5">
                <div className={`flex items-center justify-between text-xs sm:text-sm mb-3
                  ${theme === 'dark' ? 'text-gray-400' : 'text-blue-600'}`}>
                  <div className="flex items-center space-x-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{new Date(post.published_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}</span>
                  </div>
                  <div className="flex items-center space-x-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{post.read_time}</span>
                  </div>
                </div>
                <h2 className={`text-lg sm:text-xl font-semibold mb-2 line-clamp-2
                  group-hover:text-blue-600 transition-colors duration-300
                  ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
                  {post.title}
                </h2>
                <p className={`text-sm sm:text-base mb-4 line-clamp-3
                  ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                  {post.description}
                </p>
                <div className="flex justify-end">
                  <span className={`inline-flex items-center text-sm font-medium
                    transition-colors duration-300
                    ${theme === 'dark' 
                      ? 'text-blue-400 group-hover:text-blue-300' 
                      : 'text-blue-600 group-hover:text-blue-700'}`}>
                    Read more
                    <svg className="w-4 h-4 ml-1.5 transition-transform duration-300 
                      group-hover:translate-x-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor">
                      <path strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M13 7l5 5m0 0l-5 5m5-5H6" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;