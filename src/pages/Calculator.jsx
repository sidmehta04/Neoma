import React, { useState } from 'react';
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

  return (
    <div className={`min-h-screen ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'} 
      transition-colors duration-200`}>
      {/* Navigation Bar */}
      <nav className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} 
        shadow-md transition-colors duration-200`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex justify-between h-14 sm:h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <span className={`text-lg sm:text-xl font-bold ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}>
                  Financial Calculators
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Calculator Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-md mb-4 sm:mb-6 transition-colors duration-200`}>
          <div className="p-2 sm:p-4 flex space-x-2 sm:space-x-4 overflow-x-auto scrollbar-thin 
            scrollbar-thumb-gray-400 scrollbar-track-gray-100">
            {Object.entries(calculatorTitles).map(([key, title]) => (
              <button
                key={key}
                onClick={() => setActiveCalculator(key)}
                className={`px-3 sm:px-4 py-2 rounded-md whitespace-nowrap transition-colors 
                  text-sm sm:text-base ${
                  activeCalculator === key
                    ? 'bg-blue-600 text-white'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:bg-gray-700'
                      : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {title}
              </button>
            ))}
          </div>
        </div>

        {/* Active Calculator */}
        <div className="mb-6 sm:mb-8">
          {calculators[activeCalculator]}
        </div>

        {/* Contact and Investment Section */}
        <div className={`${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-md p-4 sm:p-6 mt-6 sm:mt-8 transition-colors duration-200`}>
          <div className="max-w-4xl mx-auto text-center">
            <h2 className={`text-xl sm:text-2xl font-bold mb-3 sm:mb-4 ${
              theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
            }`}>
              Want to Get Started with Your Investments?
            </h2>
            <p className={`text-sm sm:text-base mb-4 sm:mb-6 ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
            }`}>
              Take the next step in your financial journey. Our experts are ready to help you turn 
              these calculations into real-world investment strategies.
            </p>
            <button 
              onClick={handleWhatsAppChat}
              className={`inline-flex items-center px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg 
                text-white font-semibold text-sm sm:text-base transition-all duration-300 
                transform hover:scale-105 ${
                theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700' 
                  : 'bg-blue-500 hover:bg-blue-600'
              }`}
            >
              <svg 
                className="w-4 h-4 sm:w-5 sm:h-5 mr-2" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              CHAT WITH US
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorLayout;