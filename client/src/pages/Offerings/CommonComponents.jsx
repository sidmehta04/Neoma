import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Info } from "lucide-react";

// Rotating Highlights Component
export const RotatingHighlights = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="relative h-64 md:h-48 overflow-hidden rounded-xl shadow-lg">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-all duration-700 ease-in-out transform
            ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <div className={`h-full p-6 md:p-8 flex flex-col justify-center items-center text-center
            ${theme === 'dark' 
              ? 'bg-gray-800/80 backdrop-blur-md' 
              : 'bg-white/90 backdrop-blur-md shadow-xl'}`}>
            <h3 className={`text-2xl md:text-3xl font-bold mb-3 transition-colors
              ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              {item.title}
            </h3>
            <div className="text-base md:text-lg mb-4 font-medium text-blue-500">
              {item.highlight}
            </div>
            <p className={`text-sm md:text-base leading-relaxed max-w-2xl
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
      
      {/* Progress indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300
              ${index === currentIndex 
                ? theme === 'dark' 
                  ? 'bg-blue-400 w-4' 
                  : 'bg-blue-500 w-4'
                : theme === 'dark'
                  ? 'bg-gray-600'
                  : 'bg-gray-300'
              }`}
          />
        ))}
      </div>
    </div>
  );
};

// Feature Card Component
export const FeatureCard = ({ icon: Icon, title, description, className = "" }) => {
  const { theme } = useTheme();

  return (
    <div className={`group w-full ${className}`}>
      <div className={`p-6 md:p-8 rounded-xl transition-all duration-300 transform hover:scale-102
        ${theme === 'dark' 
          ? 'bg-gray-800/80 hover:bg-gray-800 backdrop-blur-md' 
          : 'bg-white/90 hover:bg-white backdrop-blur-md shadow-lg hover:shadow-xl'} 
        border border-transparent hover:border-blue-500/20`}
      >
        <div className="flex items-center mb-4 md:mb-5">
          <div className={`p-3 rounded-xl transition-all duration-300 group-hover:scale-110
            ${theme === 'dark' 
              ? 'bg-blue-500/20 group-hover:bg-blue-500/30' 
              : 'bg-blue-100 group-hover:bg-blue-200'}`}>
            <Icon className="w-6 h-6 md:w-7 md:h-7 text-blue-500" />
          </div>
          <h3 className={`text-lg md:text-xl font-bold ml-4 md:ml-5 transition-colors
            ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
            {title}
          </h3>
        </div>
        <p className={`text-base md:text-lg leading-relaxed transition-colors
          ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </div>
    </div>
  );
};

// Info Card Component
export const InfoCard = ({ title, description, index = 0 }) => {
  const { theme } = useTheme();

  return (
    <Card 
      className={`animate-on-scroll opacity-0 translate-y-4 transition-all duration-500
        hover:translate-y-[-2px] hover:shadow-lg
        ${theme === 'dark' 
          ? 'bg-gray-800/80 border-gray-700 hover:bg-gray-800' 
          : 'bg-white/90 border-gray-200 hover:border-blue-200'}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <CardContent className="p-6 md:p-8">
        <div className="flex items-start space-x-4 md:space-x-5">
          <div className={`p-3 rounded-xl flex-shrink-0 transition-all duration-300
            ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Info className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
          </div>
          <div>
            <h4 className={`text-lg md:text-xl font-bold mb-3 transition-colors
              ${theme === 'dark' ? 'text-white' : 'text-blue-900'}`}>
              {title}
            </h4>
            <p className={`text-base md:text-lg leading-relaxed transition-colors
              ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Investment Animation Component
export const InvestmentAnimation = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-48 sm:h-64 md:h-96 relative overflow-hidden rounded-xl">
      <div className={`absolute inset-0 transition-colors duration-300
        ${theme === 'dark' ? 'bg-gray-800/50' : 'bg-blue-50/50'}`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Background circles */}
            <circle cx="200" cy="150" r="80" className={`
              ${theme === 'dark' ? 'fill-blue-500/20' : 'fill-blue-200/60'}
              animate-pulse`} />
            <circle cx="200" cy="150" r="60" className={`
              ${theme === 'dark' ? 'fill-blue-500/30' : 'fill-blue-300/60'}
              animate-pulse delay-75`} />
            <circle cx="200" cy="150" r="40" className={`
              ${theme === 'dark' ? 'fill-blue-500/40' : 'fill-blue-400/60'}
              animate-pulse delay-150`} />
            
            {/* Animated path */}
            <path
              d="M 100,200 Q 150,100 200,150 T 300,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              className={`${theme === 'dark' ? 'text-blue-400' : 'text-blue-500'} 
                animate-dash`}
              strokeDasharray="300"
              strokeDashoffset="300"
            />
            
            {/* Animated dots */}
            <circle cx="200" cy="150" r="6" 
              className={`${theme === 'dark' ? 'fill-blue-400' : 'fill-blue-500'} 
                animate-bounce`} />
            <circle cx="150" cy="180" r="4" 
              className={`${theme === 'dark' ? 'fill-blue-300' : 'fill-blue-400'} 
                animate-bounce delay-100`} />
            <circle cx="250" cy="120" r="4" 
              className={`${theme === 'dark' ? 'fill-blue-300' : 'fill-blue-400'} 
                animate-bounce delay-200`} />
          </svg>
        </div>
      </div>
    </div>
  );
};

// Add the required animations to your global CSS
const styles = `
  @keyframes dash {
    to {
      stroke-dashoffset: 0;
    }
  }

  .animate-dash {
    animation: dash 2s ease-in-out infinite;
  }

  .animate-on-scroll {
    animation: fadeInUp 1s ease-out forwards;
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const GlobalStyles = () => (
  <style>{styles}</style>
);