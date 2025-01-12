import React, { useState, useEffect } from "react";
import { useTheme } from "../../context/ThemeContext";
import { Card, CardContent } from "../../components/ui/Card";
import { Info } from "lucide-react";



// Investment Animation Component
export const InvestmentAnimation = () => {
  const { theme } = useTheme();
  
  return (
    <div className="w-full h-48 sm:h-64 md:h-96 relative overflow-hidden rounded-xl">
      <div className={`absolute inset-0 transition-colors duration-300
        ${theme === 'dark' ? 'bg-rgb(11, 15, 23)' : 'bg-blue-50/50'}`}>
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