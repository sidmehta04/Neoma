import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import SIPCalculator from './Calculators/Sip_calc';
import FDCalculator from './Calculators/FD_calc';
import RDCalculator from './Calculators/RD_calc';
import LumpSumCalculator from './Calculators/Lump_sum';
import CAGRCalculator from './Calculators/CAGR_calc';
import { useTheme } from '../context/ThemeContext';

const CalculatorLayout = () => {
  const { theme } = useTheme();
  const [activeCalculator, setActiveCalculator] = useState('sip');

  const whatsappNumber = "+91 98102 55243";
  const whatsappMessage = "Hi! I'm interested in discussing investment opportunities.";
  
  const handleWhatsAppChat = () => {
    const encodedMessage = encodeURIComponent(whatsappMessage);
    const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const calculators = {
    sip: <SIPCalculator />,
    fd: <FDCalculator />,
    rd: <RDCalculator />,
    lumpsum: <LumpSumCalculator />,
    cagr: <CAGRCalculator />
  };

  const calculatorTitles = {
    sip: 'SIP Calculator',
    fd: 'Fixed Deposit',
    rd: 'RD Calculator',
    lumpsum: 'Lump Sum',
    cagr: 'CAGR Calculator'
  };

  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen ${isDark ? 'bg-rgb(11, 15, 23) from-gray-900 to-gray-800' : 'bg-gradient-to-br from-blue-50 to-gray-100'} transition-colors duration-300`}>
      {/* Navigation Bar */}
      <nav className={`${isDark ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'} 
         top-0 z-20 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-colors duration-300`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-16 sm:h-20">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-2">
                <div className={`w-10 h-10 rounded-lg ${isDark ? 'bg-blue-500' : 'bg-blue-600'} flex items-center justify-center`}>
                  <span className="text-white text-xl font-bold">FC</span>
                </div>
                <span className={`text-xl sm:text-2xl font-bold ${
                  isDark ? 'text-white' : 'text-gray-900'
                } tracking-tight`}>
                  Financial Calculators
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {/* Calculator Navigation */}
        <div className={`${
          isDark ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
        } rounded-xl shadow-lg mb-6 sm:mb-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}>
          <div className="p-2 sm:p-4 flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-thin 
            scrollbar-thumb-gray-400 scrollbar-track-transparent">
            {Object.entries(calculatorTitles).map(([key, title]) => (
              <button
                key={key}
                onClick={() => setActiveCalculator(key)}
                className={`px-4 sm:px-6 py-2.5 rounded-lg font-medium transition-all duration-300 
                  text-sm sm:text-base ${
                  activeCalculator === key
                    ? isDark 
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/20 scale-105' 
                      : 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 scale-105'
                    : isDark
                      ? 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Calculator */}
        <div className={`${
          isDark ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
        } rounded-xl shadow-lg p-6 sm:p-8 mb-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}>
          {calculators[activeCalculator]}
        </div>

        {/* Contact and Investment Section */}
        <div className={`${
          isDark ? 'bg-gray-800/50 backdrop-blur-lg' : 'bg-white/80 backdrop-blur-lg'
        } rounded-xl shadow-lg p-6 sm:p-8 border ${isDark ? 'border-gray-700' : 'border-gray-200'} transition-all duration-300`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 ${
              isDark ? 'text-white' : 'text-gray-900'
            } tracking-tight`}>
              Ready to Start Your Investment Journey?
            </h2>
            <p className={`text-base sm:text-lg mb-6 sm:mb-8 ${
              isDark ? 'text-gray-300' : 'text-gray-600'
            } leading-relaxed`}>
              Transform these calculations into real-world success. Our expert advisors are here to guide you through your personalized investment strategy.
            </p>
            <button 
              onClick={handleWhatsAppChat}
              className={`inline-flex items-center px-8 sm:px-10 py-3 sm:py-4 rounded-lg 
                text-white font-semibold text-base sm:text-lg transition-all duration-300 
                transform hover:scale-105 ${
                isDark 
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 shadow-lg shadow-blue-500/30' 
                  : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-lg shadow-blue-600/30'
              }`}
            >
              <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
              Start Discussion
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;