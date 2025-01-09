import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

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
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
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
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <main className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
        <h1 className={`text-2xl sm:text-3xl md:text-4xl font-bold ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        } mb-6 sm:mb-8 md:mb-12`}>
          Latest Blog Posts
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {blogPosts.map((post) => (
            <div 
              key={post.id}
              className={`rounded-lg overflow-hidden shadow-lg cursor-pointer 
                transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl
                ${theme === 'dark' 
                  ? 'bg-gray-800 text-white hover:bg-gray-700' 
                  : 'bg-white text-gray-900 hover:bg-gray-50'}`}
              onClick={() => handleBlogClick(post.slug)}
            >
              {post.featured_image && (
                <div className="relative h-40 sm:h-44 md:h-48 w-full overflow-hidden">
                  <img 
                    src={post.featured_image}
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-300 
                      group-hover:scale-105"
                  />
                </div>
              )}
              <div className="p-3 sm:p-4">
                <div className="flex justify-between text-xs sm:text-sm text-gray-400 mb-2">
                  <span>{new Date(post.published_at).toLocaleDateString()}</span>
                  <span>{post.read_time}</span>
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-2 
                  line-clamp-2 hover:line-clamp-none">
                  {post.title}
                </h2>
                <p className={`text-sm sm:text-base ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                } line-clamp-3 hover:line-clamp-none`}>
                  {post.description}
                </p>
              </div>
              <div className={`px-3 sm:px-4 pb-3 sm:pb-4 mt-1 sm:mt-2 flex justify-end`}>
                <span className={`text-xs sm:text-sm ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                } hover:underline`}>
                  Read more →
                </span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default BlogPage;