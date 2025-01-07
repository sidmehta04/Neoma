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
    <div className="relative h-64 md:h-48 overflow-hidden rounded-xl">
      {items.map((item, index) => (
        <div
          key={index}
          className={`absolute inset-0 slide-transition
            ${index === currentIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}`}
        >
          <div className={`h-full p-4 md:p-6 flex flex-col justify-center items-center text-center
            ${theme === 'dark' 
              ? 'bg-gray-800/60 backdrop-blur-sm' 
              : 'bg-white/60 backdrop-blur-sm'}`}>
            <h3 className="text-2xl md:text-3xl font-bold mb-2">{item.title}</h3>
            <div className={`text-base md:text-lg mb-3 md:mb-4 ${theme === 'dark' ? 'text-blue-400' : 'text-blue-600'}`}>
              {item.highlight}
            </div>
            <p className={`text-sm md:text-lg ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {item.description}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

// Feature Card Component
export const FeatureCard = ({ icon: Icon, title, description, className = "" }) => {
  const { theme } = useTheme();

  return (
    <div className={`group w-full ${className}`}>
      <div className={`p-4 md:p-6 rounded-xl transition-all duration-300 transform hover:scale-105
        ${theme === 'dark' 
          ? 'bg-gray-800/60 hover:bg-gray-800' 
          : 'bg-white/60 hover:bg-white'} 
        border border-transparent hover:border-blue-500/20`}
      >
        <div className="flex items-center mb-3 md:mb-4">
          <div className={`p-2 rounded-lg 
            ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Icon className="w-5 h-5 md:w-6 md:h-6 text-blue-500" />
          </div>
          <h3 className="text-lg md:text-xl font-semibold ml-3 md:ml-4">{title}</h3>
        </div>
        <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
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
      className={`animate-on-scroll opacity-0 translate-y-4 transition-all duration-500 w-full
        ${theme === 'dark' ? 'bg-gray-800/60 border-gray-700' : 'bg-white/60 border-gray-200'}`}
      style={{ animationDelay: `${index * 200}ms` }}
    >
      <CardContent className="p-4 md:p-6">
        <div className="flex items-start space-x-3 md:space-x-4">
          <div className={`p-2 rounded-lg mt-1 flex-shrink-0
            ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-100'}`}>
            <Info className="w-4 h-4 md:w-5 md:h-5 text-blue-500" />
          </div>
          <div>
            <h4 className="text-base md:text-lg font-semibold mb-2">{title}</h4>
            <p className={`text-sm md:text-base ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
              {description}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Investment Animation Component
export const InvestmentAnimation = () => (
  <div className="w-full h-48 sm:h-64 md:h-96 relative">
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 300" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
        <circle cx="200" cy="150" r="80" className="fill-blue-500/20 animate-pulse" />
        <circle cx="200" cy="150" r="60" className="fill-blue-500/30 animate-pulse delay-75" />
        <circle cx="200" cy="150" r="40" className="fill-blue-500/40 animate-pulse delay-150" />
        <path
          d="M 100,200 Q 150,100 200,150 T 300,100"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          className="text-blue-500 animate-dash"
          strokeDasharray="300"
          strokeDashoffset="300"
        />
        <circle cx="200" cy="150" r="6" className="fill-blue-600 animate-bounce" />
        <circle cx="150" cy="180" r="4" className="fill-blue-400 animate-bounce delay-100" />
        <circle cx="250" cy="120" r="4" className="fill-blue-400 animate-bounce delay-200" />
      </svg>
    </div>
  </div>
);