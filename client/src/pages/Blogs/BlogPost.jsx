import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { ArrowLeft, Clock, Calendar } from 'lucide-react';
import { create, all } from 'mathjs';
import axios from 'axios';
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

const math = create(all);

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    fetchBlogPost();
  }, [slug]);

  const fetchBlogPost = async () => {
    try {
      const response = await axios.get(`${API_URL}/blog-posts/${slug}`);
      setPost(response.data);
    } catch (error) {
      console.error('Error fetching blog post:', error);
      setError(error.response?.data?.error || 'Failed to load blog post');
    } finally {
      setLoading(false);
    }
  };

  const renderFormula = (formula) => {
    try {
      const result = math.evaluate(formula);
      return (
        <div className="flex flex-col items-center my-3 sm:my-4">
          <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm sm:text-base md:text-lg">
            <span className="formula">{formula}</span>
          </div>
          {typeof result !== 'undefined' && (
            <div className="mt-1 sm:mt-2 text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              = {result.toString()}
            </div>
          )}
        </div>
      );
    } catch (e) {
      return (
        <div className="flex justify-center my-3 sm:my-4">
          <div className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-100 dark:bg-gray-800 rounded-lg font-mono text-sm sm:text-base md:text-lg">
            <span className="formula">{formula}</span>
          </div>
        </div>
      );
    }
  };

  const formatContent = (content) => {
    const sections = content.split('\n\n');
    return sections.map((section, index) => {
      const trimmedSection = section.trim();
      
      if (trimmedSection.startsWith('#')) {
        const level = trimmedSection.match(/^#+/)[0].length;
        const text = trimmedSection.replace(/^#+\s/, '');
        const headerClasses = {
          1: 'text-2xl sm:text-3xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4',
          2: 'text-xl sm:text-2xl font-bold mt-5 sm:mt-6 mb-2 sm:mb-3',
          3: 'text-lg sm:text-xl font-semibold mt-4 sm:mt-5 mb-2'
        };
        return (
          <h2 
            key={index} 
            className={`${headerClasses[level] || headerClasses[1]} ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {text}
          </h2>
        );
      }

      if (trimmedSection.includes('$$')) {
        const parts = trimmedSection.split('$$');
        return (
          <div key={index} className="my-3 sm:my-4">
            {parts.map((part, i) => {
              if (i % 2 === 1) {
                return renderFormula(part.trim());
              }
              return part && processTextContent(part, i);
            })}
          </div>
        );
      }

      return processTextContent(trimmedSection, index);
    });
  };

  const processTextContent = (text, key) => {
    if (!text.trim()) return null;
    
    if (text.includes('$')) {
      const parts = text.split('$');
      return (
        <p 
          key={key} 
          className={`mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
          }`}
        >
          {parts.map((part, i) => {
            if (i % 2 === 1) {
              return (
                <span key={i} className="inline-block px-2 py-1 mx-1 bg-gray-100 dark:bg-gray-800 rounded font-mono text-sm sm:text-base">
                  {part}
                </span>
              );
            }
            return <span key={i}>{part}</span>;
          })}
        </p>
      );
    }

    const cleanText = text.replace(/\*\*(.*?)\*\*/g, '$1').replace(/\*(.*?)\*/g, '$1');
    
    return (
      <p 
        key={key} 
        className={`mb-3 sm:mb-4 text-sm sm:text-base leading-relaxed ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}
      >
        {cleanText}
      </p>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 sm:h-12 sm:w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 text-center">
        <div className="text-red-500 text-sm sm:text-base">{error || 'Blog post not found'}</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container mx-auto px-4 py-3 sm:py-4">
        <button
          onClick={() => navigate('/blog')}
          className={`flex items-center space-x-2 text-sm sm:text-base ${
            theme === 'dark' 
              ? 'text-gray-300 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Blog</span>
        </button>
      </div>

      <article className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl">
        {post.featured_image && (
          <div className="mb-6 sm:mb-8 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-48 sm:h-64 md:h-96 object-cover"
            />
          </div>
        )}

        <header className="mb-8 sm:mb-12">
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {post.title}
          </h1>
          <div className={`flex flex-wrap gap-3 sm:gap-4 items-center text-sm sm:text-base ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Calendar className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <time>{new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</time>
            </div>
            <div className="flex items-center space-x-1.5 sm:space-x-2">
              <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              <span>{post.read_time}</span>
            </div>
          </div>
        </header>

        <div className={`text-base sm:text-lg mb-6 sm:mb-8 ${
          theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
        }`}>
          {post.description}
        </div>

        <div className={`prose max-w-none ${theme === 'dark' ? 'prose-invert' : ''}`}>
          {formatContent(post.content)}
        </div>
      </article>

      <footer className="container mx-auto px-4 py-6 sm:py-8 max-w-4xl border-t border-gray-200 dark:border-gray-700 mt-8 sm:mt-12">
        <button
          onClick={() => navigate('/blog')}
          className={`flex items-center space-x-2 text-sm sm:text-base ${
            theme === 'dark' 
              ? 'text-gray-300 hover:text-white' 
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          <span>Back to Blog</span>
        </button>
      </footer>
    </div>
  );
};

export default BlogPost;