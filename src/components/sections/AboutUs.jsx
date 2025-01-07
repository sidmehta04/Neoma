import React from 'react';
import { motion } from 'framer-motion';
import { Moon, TrendingUp, Shield, Target } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { Link } from 'react-router-dom';

const AnimatedPointer = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-8 h-8 sm:w-12 sm:h-12 absolute -top-4 sm:-top-6 left-1/2 transform -translate-x-1/2">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
        <path d="M20 80 L50 20 L80 80 L50 60 Z" 
              fill="none" 
              stroke={theme === 'dark' ? '#60A5FA' : '#3B82F6'}
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round">
          <animate attributeName="stroke-dasharray" 
                   from="0,1000" 
                   to="300,1000" 
                   dur="2s" 
                   repeatCount="indefinite" />
          <animate attributeName="stroke-dashoffset" 
                   from="1000" 
                   to="0" 
                   dur="2s" 
                   repeatCount="indefinite" />
        </path>
        <circle cx="50" cy="20" r="4" fill={theme === 'dark' ? '#60A5FA' : '#3B82F6'}>
          <animate attributeName="r" 
                   values="4;6;4" 
                   dur="1s" 
                   repeatCount="indefinite" />
        </circle>
      </svg>
    </div>
  );
};

const FeatureCard = ({ icon: Icon, title, description }) => {
  const { theme } = useTheme();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 ${
        theme === 'dark' ? 'bg-gray-800' : 'bg-white'
      }`}
    >
      <div className={`absolute -top-4 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-lg flex items-center justify-center transform -rotate-6 ${
        theme === 'dark' ? 'bg-blue-600' : 'bg-blue-500'
      }`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <h4 className={`text-lg sm:text-xl font-semibold mt-4 mb-2 ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {title}
      </h4>
      <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
        {description}
      </p>
    </motion.div>
  );
};

const AboutSection = () => {
  const { theme } = useTheme();

  const features = [
    {
      icon: Moon,
      title: "New Beginnings",
      description: "Embodying the spirit of the new moon, we represent fresh opportunities and innovative approaches to wealth creation."
    },
    {
      icon: TrendingUp,
      title: "Strategic Growth",
      description: "Our seasoned professionals craft tailored investment solutions to meet your unique financial objectives."
    },
    {
      icon: Shield,
      title: "Trust & Integrity",
      description: "We prioritize transparency and ethical practices in every client interaction and investment decision."
    },
    {
      icon: Target,
      title: "Focused Approach",
      description: "Navigate the complexities of financial markets with our targeted and results-driven strategies."
    }
  ];

  return (
    <section className={`relative py-12 sm:py-16 md:py-20 overflow-hidden ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 to-gray-950'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <div className={`absolute inset-0 bg-[url('')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] ${
        theme === 'dark' ? 'opacity-20' : 'opacity-30'
      }`}></div>
      
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className={`text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            theme === 'dark'
              ? 'from-blue-400 to-purple-400'
              : 'from-blue-600 to-purple-600'
          }`}>
            About Us
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-3xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Welcome to Neoma Capital, where we guide you through the ever-evolving landscape of financial investments.
          </p>
          <AnimatedPointer />
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 sm:p-8 rounded-xl sm:rounded-2xl backdrop-blur-sm ${
            theme === 'dark' ? 'bg-gray-800/50' : 'bg-blue-50'
          }`}
        >
          <div className="space-y-4 sm:space-y-6 flex flex-col items-center text-center">
            <h3 className={`text-2xl sm:text-3xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Join Our Journey
            </h3>
            <p className={`text-sm sm:text-base leading-relaxed max-w-2xl ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}>
              As we navigate the complexities of the financial world together, we remain committed to fostering long-term relationships built on trust and mutual success. Together, we can illuminate your path to financial success.
            </p>
            <Link 
              to="/contact"
              className={`inline-block px-6 py-3 text-white text-sm sm:text-base rounded-lg transition-all duration-300 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              Get Started
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;