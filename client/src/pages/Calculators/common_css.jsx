export const getCalculatorStyles = (theme) => ({
  container: "max-w-6xl mx-auto p-4 sm:p-6",
  wrapper: `${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg overflow-hidden`,
  gridContainer: "grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 lg:gap-8",
  
  // Left Column Styles
  leftColumn: `p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-800' : 'bg-white'}`,
  headerContainer: "flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6",
  currencyIcon: "w-8 h-8 sm:w-10 sm:h-10 bg-blue-600 rounded flex items-center justify-center",
  currencyText: "text-white text-base sm:text-lg",
  title: `text-lg sm:text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`,
  inputContainer: "space-y-4 sm:space-y-6",
  
  // Input Field Styles
  inputGroup: "flex flex-col sm:flex-row sm:justify-between sm:items-center mb-2",
  label: `${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base mb-1 sm:mb-0`,
  numberInput: `w-full sm:w-24 md:w-32 p-1 sm:p-2 rounded text-right text-sm sm:text-base ${
    theme === 'dark' 
      ? 'bg-gray-700 text-white border-gray-600' 
      : 'bg-gray-50 text-gray-900 border-gray-200'
  }`,
  rangeInput: "w-full h-1.5 sm:h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600 dark:bg-gray-700",
  
  // Select Styles
  select: `w-full p-2 border rounded-md text-sm sm:text-base ${
    theme === 'dark'
      ? 'bg-gray-700 text-white border-gray-600'
      : 'bg-white text-gray-900 border-gray-200'
  }`,
  
  // Button Styles
  calculateButton: "w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-md hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium",
  resetButton: `text-blue-600 mt-4 sm:mt-6 hover:underline block mx-auto text-sm sm:text-base ${
    theme === 'dark' ? 'text-blue-400 hover:text-blue-300' : ''
  }`,
  
  // Right Column Styles
  rightColumn: `p-4 sm:p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-gray-50'}`,
  resultContainer: "text-center mb-4 sm:mb-6",
  resultText: `${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-1 sm:mb-2 text-sm sm:text-base`,
  resultAmount: `text-2xl sm:text-3xl md:text-4xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`,
  
  // Chart and Legend Styles
  chartContainer: "flex flex-col items-center py-2 sm:py-4",
  legendContainer: "mt-3 sm:mt-4 text-left w-full sm:w-auto",
  legendList: "space-y-1.5 sm:space-y-2",
  legendItem: "flex items-center gap-2 text-sm sm:text-base",
  legendDot: (isFirst) => `w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${
    isFirst 
      ? (theme === 'dark' ? 'bg-blue-400' : 'bg-white')
      : (theme === 'dark' ? 'bg-white' : 'bg-white')
  }`,
  legendText: `${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} text-sm sm:text-base`,
  
  // Chart Colors
  chartColors: {
    primary: theme === 'dark' ? '#60A5FA' : '#1e40af',
    secondary: theme === 'dark' ? 'white' : 'white'
  }
});