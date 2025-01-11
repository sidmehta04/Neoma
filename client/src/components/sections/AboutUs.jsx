import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import AboutImage1 from '../../assets/Image.webp';

const AboutImage = () => {
  const { theme } = useTheme();
  
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Refined grid background */}
      <div className="absolute inset-0 z-0 transition-transform duration-300">
        <svg
          className="w-full h-full"
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
        >
<defs>
            <pattern
              id="smallGrid"
              width="10"
              height="10"
              patternUnits="userSpaceOnUse"
              className="sm:w-20 sm:h-20"
            >
              <path
                d="M 10 0 L 0 0 0 10"
                fill="none"
                stroke={theme === 'dark' ? '#2C3340' : '#F0F1F3'}
                strokeWidth="0.25"
                className="sm:stroke-[0.5]"
              />
            </pattern>
            <pattern
              id="grid"
              width="50"
              height="50"
              patternUnits="userSpaceOnUse"
              className="sm:w-100 sm:h-100"
            >
              <rect width="50" height="50" fill="url(#smallGrid)" className="sm:w-100 sm:h-100" />
              <path
                d="M 50 0 L 0 0 0 50"
                fill="none"
                stroke={theme === 'dark' ? '#374151' : '#E5E7EB'}
                strokeWidth="0.5"
                className="sm:stroke-1"
              />
            </pattern>
          </defs>
          <g transform="scale(0.75) translate(-200, -200) sm:scale(1) sm:translate(-400, -400)">
            <rect width="200%" height="200%" fill={theme === 'dark' ? 'rgb(11,15,23)' : '#FFFFFF'} />
            <rect width="200%" height="200%" fill="url(#grid)" />
                  </g>
        </svg>
      </div>
      
      {/* Image container with backdrop blur */}
      <div className="relative z-10 w-full max-w-lg mx-auto p-6">
        <div className={`absolute inset-0 ${
          theme === 'dark' ? 'bg-gray-900/10' : 'bg-white/10'
        }`} />
        <img 
          src={AboutImage1}
          alt="Neoma Capital" 
          className="relative z-20 w-full h-auto rounded-xl shadow-lg object-cover"
        />
      </div>
    </div>
  );
};

// Rest of the component remains the same...
const AboutSection = () => {
  const { theme } = useTheme();

  return (
    <section className={`relative min-h-screen py-8 sm:py-12 md:py-16 overflow-hidden ${
      theme === 'dark'
        ? 'bg-[rgb(11,15,23)]'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Image - Shown on top for mobile, left side for desktop */}
          <div className="order-1 lg:order-none h-[300px] sm:h-[400px] lg:h-[600px]">
            <AboutImage />
          </div>

          {/* Content section remains unchanged */}
          <div className="order-2 lg:order-none space-y-6 sm:space-y-8">
            <div className="prose prose-sm sm:prose lg:prose-lg max-w-none">
              <h2 className={`text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
                theme === 'dark'
                  ? 'from-blue-400 to-purple-400'
                  : 'from-blue-600 to-purple-600'
              }`}>
                About Us
              </h2>
              
              <div className={`space-y-4 sm:space-y-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                <p className="text-base sm:text-lg leading-relaxed">
                  Welcome to Neoma Capital, where we embody the spirit of the "new moon"—a symbol of new beginnings and fresh opportunities. At Neoma Capital, we are dedicated to guiding our clients through the ever-evolving landscape of financial investments, providing innovative solutions tailored to meet diverse financial goals.
                </p>
                
                <p className="text-base sm:text-lg leading-relaxed">
                  Our team comprises seasoned professionals with extensive industry knowledge and a passion for helping clients achieve their financial aspirations. We prioritize transparency, integrity, and personalized service in every interaction, ensuring that our clients feel confident in their investment decisions.
                </p>
                
                <p className="text-base sm:text-lg leading-relaxed">
                  As we navigate the complexities of the financial world together, we remain committed to fostering long-term relationships built on trust and mutual success. Join us at Neoma Capital as we embark on this journey towards growth and prosperity—together, we can illuminate your path to financial success.
                </p>
              </div>

              <div className={`mt-6 sm:mt-8 p-4 sm:p-6 rounded-xl ${
                theme === 'dark' ? 'bg-gray-800/50' : 'bg-blue-50'
              }`}>
                <h3 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Join Our Journey
                </h3>
                <p className={`mb-4 sm:mb-6 text-base sm:text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                }`}>
                  Join us at Neoma Capital as we embark on this journey towards growth and prosperity—together, we can illuminate your path to financial success.
                </p>
                <Link 
                  to="/contact"
                  className={`inline-block px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white rounded-lg transition-all duration-300 hover:scale-105 ${
                    theme === 'dark'
                      ? 'bg-blue-500 hover:bg-blue-600'
                      : 'bg-blue-600 hover:bg-blue-700'
                  }`}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;