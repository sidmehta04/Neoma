import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Info, ChevronLeft, ChevronRight } from "lucide-react";

// Enhanced Rotating Highlights Component
export const RotatingHighlights = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { theme } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [items.length]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? items.length - 1 : prevIndex - 1
    );
  };

  const isDark = theme === 'dark';

  return (
    <Card className="relative h-72 md:h-56 overflow-hidden">
      <CardContent className="p-0 h-full">
        {items.map((item, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-500 ease-out transform
              ${index === currentIndex ? 'translate-x-0 opacity-100' : 
                index < currentIndex ? '-translate-x-full opacity-0' : 'translate-x-full opacity-0'}`}
          >
            <div className={`h-full px-8 py-6 flex flex-col justify-center
              ${isDark ? 'bg-gray-900/95' : 'bg-white/95'} backdrop-blur-lg`}>
              <span className="text-blue-500 text-sm font-semibold tracking-wider uppercase mb-2">
                {item.category}
              </span>
              <h3 className={`text-2xl md:text-3xl font-bold mb-3
                ${isDark ? 'text-white' : 'text-gray-900'}`}>
                {item.title}
              </h3>
              <p className={`text-base leading-relaxed max-w-3xl
                ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {item.description}
              </p>
            </div>
          </div>
        ))}

        {/* Navigation Controls */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-between items-center px-4">
          <div className="flex space-x-2">
            {items.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300
                  ${index === currentIndex 
                    ? `w-8 ${isDark ? 'bg-blue-400' : 'bg-blue-500'}`
                    : `${isDark ? 'bg-gray-700' : 'bg-gray-300'}`}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className={`p-2 rounded-full transition-colors
                ${isDark 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className={`p-2 rounded-full transition-colors
                ${isDark 
                  ? 'hover:bg-gray-800 text-gray-400 hover:text-white' 
                  : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'}`}
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Feature Card Component
export const FeatureCard = ({ icon: Icon, title, description, className = "" }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className={`group transition-all duration-300 ${className}
      ${isDark ? 'bg-gray-900/90 hover:bg-gray-900' : 'bg-white/90 hover:bg-white'}
      hover:shadow-lg hover:scale-[1.02]`}>
      <CardContent className="p-6">
        <div className={`p-3 rounded-lg w-fit mb-4 transition-colors
          ${isDark ? 'bg-blue-500/10 group-hover:bg-blue-500/20' : 'bg-blue-50 group-hover:bg-blue-100'}`}>
          <Icon className="w-6 h-6 text-blue-500" />
        </div>
        
        <h3 className={`text-xl font-semibold mb-3 transition-colors
          ${isDark ? 'text-white' : 'text-gray-900'}`}>
          {title}
        </h3>
        
        <p className={`text-base leading-relaxed transition-colors
          ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
          {description}
        </p>
      </CardContent>
    </Card>
  );
};

// Enhanced Info Card Component
export const InfoCard = ({ title, description, index = 0 }) => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card 
      className={`opacity-0 translate-y-4 transition-all duration-500
        ${isDark 
          ? 'bg-gray-900/90 hover:bg-gray-900 border-gray-800' 
          : 'bg-white/90 hover:bg-white border-gray-200'}
        hover:shadow-lg animate-on-scroll`}
      style={{ animationDelay: `${index * 150}ms` }}
    >
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className={`p-3 rounded-lg flex-shrink-0 transition-colors
            ${isDark ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
            <Info className="w-5 h-5 text-blue-500" />
          </div>
          
          <div>
            <h4 className={`text-lg font-semibold mb-2 transition-colors
              ${isDark ? 'text-white' : 'text-gray-900'}`}>
              {title}
            </h4>
            <p className={`text-base leading-relaxed transition-colors
              ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Investment Animation Component
export const InvestmentAnimation = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <Card className="w-full h-64 md:h-96 overflow-hidden">
      <CardContent className="p-0 h-full">
        <div className={`h-full relative transition-colors
          ${isDark ? 'bg-gray-900/50' : 'bg-blue-50/30'}`}>
          <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
            {/* Enhanced background circles */}
            <circle cx="200" cy="150" r="100" 
              className={`${isDark ? 'fill-blue-500/10' : 'fill-blue-200/40'}
                animate-pulse duration-3000`} />
            <circle cx="200" cy="150" r="75" 
              className={`${isDark ? 'fill-blue-500/15' : 'fill-blue-300/40'}
                animate-pulse duration-2500 delay-75`} />
            <circle cx="200" cy="150" r="50" 
              className={`${isDark ? 'fill-blue-500/20' : 'fill-blue-400/40'}
                animate-pulse duration-2000 delay-150`} />
            
            {/* Enhanced animated path */}
            <path
              d="M 80,200 Q 140,100 200,150 T 320,100"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              className={`${isDark ? 'text-blue-400' : 'text-blue-500'} 
                animate-dash`}
              strokeDasharray="400"
              strokeDashoffset="400"
            />
            
            {/* Enhanced animated dots */}
            <circle cx="200" cy="150" r="5" 
              className={`${isDark ? 'fill-blue-400' : 'fill-blue-500'} 
                animate-bounce duration-2000`} />
            <circle cx="140" cy="170" r="3.5" 
              className={`${isDark ? 'fill-blue-300' : 'fill-blue-400'} 
                animate-bounce duration-2000 delay-200`} />
            <circle cx="260" cy="130" r="3.5" 
              className={`${isDark ? 'fill-blue-300' : 'fill-blue-400'} 
                animate-bounce duration-2000 delay-400`} />
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

// Enhanced Global Styles
export const GlobalStyles = () => (
  <style>{`
    @keyframes dash {
      to {
        stroke-dashoffset: 0;
      }
    }

    .animate-dash {
      animation: dash 2.5s ease-in-out infinite;
    }

    .animate-on-scroll {
      animation: fadeInUp 0.8s ease-out forwards;
    }

    @keyframes fadeInUp {
      from {
        opacity: 0;
        transform: translateY(16px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  `}</style>
);