import React, { useEffect, useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';
import AboutImage1 from '../../assets/WEBSITE.png';

const AboutImage = () => {
  const { theme } = useTheme();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Enhanced image container with better shadows and effects */}
      <div className="relative z-10 w-full max-w-lg mx-auto p-6 transform transition-all duration-500 hover:scale-[1.02]">
        <div className={`absolute inset-0 blur-xl opacity-20 ${
          theme === 'dark' ? 'bg-blue-900' : 'bg-blue-200'
        }`} />
        <img 
          src={AboutImage1}
          alt="Neoma Capital" 
          className="relative z-20 w-full h-auto rounded-xl shadow-2xl object-cover
                   transition-transform duration-500"
        />
        {/* Decorative elements */}
        <div className={`absolute -bottom-4 -right-4 w-24 h-24 rounded-full 
                      transition-opacity duration-300 opacity-20 blur-xl
                      ${theme === 'dark' ? 'bg-blue-600' : 'bg-blue-300'}`} />
        <div className={`absolute -top-4 -left-4 w-32 h-32 rounded-full
                      transition-opacity duration-300 opacity-10 blur-xl
                      ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-200'}`} />
      </div>
    </div>
  );
};

const AboutSection = () => {
  const { theme } = useTheme();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('.fade-in-section').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative min-h-screen py-4 sm:py-8 md:py-12 overflow-hidden ${
      theme === 'dark'
        ? 'bg-[rgb(11,15,23)]'
        : 'bg-gradient-to-b from-white via-white to-white'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8 max-w-7xl">
        <div className="text-center mb-16 fade-in-section opacity-0">
          <h2 className={`text-3xl sm:text-4xl font-bold 
                       tracking-tight transition-colors duration-300 mb-4
                       ${theme === 'dark'
                         ? 'text-white'
                         : 'text-blue-900'}`}>
            About Us
          </h2>
          <div className={`mt-4 h-1 w-24 mx-auto rounded-full transition-all duration-300
                        ${theme === 'dark' ? 'bg-blue-500' : 'bg-blue-600'}`} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="h-[300px] sm:h-[400px] lg:h-[600px] fade-in-section opacity-0">
            <AboutImage />
          </div>

          <div className="space-y-8 fade-in-section opacity-0">
            <div className="prose prose-lg max-w-none">
              <div className={`space-y-6 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <p className="text-base sm:text-lg leading-relaxed md:leading-loose lg:leading-loose mb-6">
                  Welcome to Neoma Capital, where we embody the spirit of the "new moon"—a symbol of new beginnings and fresh opportunities. At Neoma Capital, we are dedicated to guiding our clients through the ever-evolving landscape of financial investments, providing innovative solutions tailored to meet diverse financial goals.
                </p>
                
                <p className="text-base sm:text-lg  leading-relaxed md:leading-loose lg:leading-loose mb-6">
                  Our team comprises seasoned professionals with extensive industry knowledge and a passion for helping clients achieve their financial aspirations. We prioritize transparency, integrity, and personalized service in every interaction, ensuring that our clients feel confident in their investment decisions.
                </p>
                
                <p className="text-base sm:text-lg  leading-relaxed md:leading-loose lg:leading-loose">
                  As we navigate the complexities of the financial world together, we remain committed to fostering long-term relationships built on trust and mutual success. Join us at Neoma Capital as we embark on this journey towards growth and prosperity.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-3xl mx-auto mt-20 fade-in-section opacity-0">
          <div className={`p-8 sm:p-10 rounded-2xl text-center transition-all duration-300
                        ${theme === 'dark' 
                          ? 'bg-gray-800/30 backdrop-blur-sm' 
                          : 'bg-gradient-to-br from-blue-50 to-white shadow-xl'}`}>
            <h3 className={`text-xl sm:text-3xl  font-bold mb-8 
                         ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              Join Our Journey
            </h3>
            <p className={`mb-8 text-base sm:text-xl leading-relaxed md:leading-loose lg:leading-loose max-w-3xl mx-auto
                        ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
              Join us at Neoma Capital as we embark on this journey towards growth and prosperity—together, we can illuminate your path to financial success.
            </p>
            <Link 
              to="/contact"
              className={`inline-flex items-center px-8 py-4 text-lg font-medium text-white 
                       rounded-xl transition-all duration-300 transform hover:scale-105
                       hover:shadow-lg ${
                         theme === 'dark'
                           ? 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20'
                           : 'bg-blue-600 hover:bg-blue-500 shadow-blue-600/20'
                       }`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 1s ease-out forwards;
        }

        .fade-in-section {
          transition: opacity 1s ease-out, transform 1s ease-out;
        }
      `}</style>
    </section>
  );
};

export default AboutSection;