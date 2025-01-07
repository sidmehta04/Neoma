import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle, Search, ArrowRight, ChevronRight, BookOpen, Shield, Target } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

// FAQ data with categories
const faqData = [
  {
    category: "Investment Basics",
    icon: BookOpen,
    questions: [
      {
        question: "What are unlisted shares?",
        answer: "Unlisted shares are equity shares of companies that are not traded on public stock exchanges. Investing in these shares allows you to participate in the growth of promising businesses before they go public."
      },
      {
        question: "What is the minimum investment required for mutual funds?",
        answer: "The minimum investment for mutual funds can vary depending on the fund house and the type of mutual fund. Some funds allow investments starting as low as ₹500 through Systematic Investment Plans (SIPs)."
      },
      {
        question: "What types of bonds are available for investment?",
        answer: "There are various types of bonds available, including government bonds, corporate bonds, municipal bonds, and tax-free bonds. Each type has its own risk-return profile."
      },
      {
        question: "What is angel investing?",
        answer: "Angel investing involves providing funding to startups or early-stage companies in exchange for equity. This type of investment supports innovation while offering the potential for high returns."
      },
      {
        question: "What are Alternative Investment Funds (AIFs)?",
        answer: "AIFs are privately pooled investment vehicles that invest in non-traditional asset classes such as private equity, hedge funds, and real estate, targeting sophisticated investors seeking higher returns."
      },
      {
        question: "How do I start investing in private boutiques?",
        answer: "To invest in private boutiques, you typically need to meet certain eligibility criteria and work with a financial advisor or platform that specializes in pre-IPO investments."
      }
    ]
  },
  {
    category: "Risk Management",
    icon: Shield,
    questions: [
      {
        question: "What is the risk associated with investing in unlisted shares?",
        answer: "Investing in unlisted shares carries higher risks due to factors like lack of liquidity, limited information about the company, and potential volatility after listing."
      },
      {
        question: "Are bonds a safe investment option?",
        answer: "Bonds are generally considered safer than stocks; however, their safety depends on factors such as the issuer's creditworthiness and market conditions."
      },
      {
        question: "How do AIFs differ from traditional mutual funds?",
        answer: "AIFs typically invest in alternative asset classes and may have higher risk-return profiles compared to traditional mutual funds, which generally focus on stocks and bonds."
      },
      {
        question: "Can I invest in multiple asset classes at once?",
        answer: "Yes, diversifying across multiple asset classes (such as stocks, bonds, AIFs) can help mitigate risk and enhance overall returns."
      }
    ]
  },
  {
    category: "Investment Strategy",
    icon: Target,
    questions: [
      {
        question: "How can I choose the right mutual fund for my goals?",
        answer: "To choose the right mutual fund, consider your financial goals, risk tolerance, investment horizon, and review the fund's past performance and expense ratio."
      },
      {
        question: "What should I look for when considering angel investments?",
        answer: "When considering angel investments, evaluate the startup's business model, market potential, management team, and your own risk appetite."
      },
      {
        question: "How often should I review my investment portfolio?",
        answer: "It is advisable to review your investment portfolio at least annually or whenever there are significant changes in your financial situation or market conditions."
      },
      {
        question: "What is portfolio management?",
        answer: "Portfolio management involves evaluating your current investments and providing expert recommendations to optimize your portfolio based on your financial goals and market trends."
      },
      {
        question: "What fees are associated with portfolio management services?",
        answer: "Fees for portfolio management services can vary widely based on the provider but typically include management fees based on assets under management (AUM) and performance-based fees."
      }
    ]
  }
]
// Background Pattern Component
const BackgroundPattern = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
    <div className="absolute inset-0 opacity-5">
      <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
        <defs>
          <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.5"/>
          </pattern>
          <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="currentColor" stopOpacity="0.1"/>
            <stop offset="100%" stopColor="currentColor" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <rect width="100" height="100" fill="url(#grid)"/>
        <rect width="100" height="100" fill="url(#fade)"/>
      </svg>
    </div>
  </div>
);

// Search Bar Component
const SearchBar = ({ searchQuery, setSearchQuery, theme }) => (
  <div className="relative mb-6 sm:mb-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl shadow-lg ${
        theme === 'dark'
          ? 'bg-gray-800/50'
          : 'bg-white'
      }`}
    >
      <Search className={theme === 'dark' ? 'text-gray-400' : 'text-gray-500'} size={18} />
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search your question..."
        className={`w-full text-sm sm:text-base bg-transparent border-none outline-none ${
          theme === 'dark' 
            ? 'text-white placeholder:text-gray-500' 
            : 'text-gray-800 placeholder:text-gray-400'
        }`}
      />
    </motion.div>
  </div>
);

// Category Tab Component
const CategoryTab = ({ category, icon: Icon, isActive, onClick, theme }) => (
  <motion.button
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={`flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl w-full transition-all duration-200 ${
      isActive
        ? theme === 'dark'
          ? 'bg-blue-500/20 text-blue-400'
          : 'bg-blue-50 text-blue-600'
        : theme === 'dark'
          ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-800'
          : 'bg-white text-gray-600 hover:bg-gray-50'
    }`}
  >
    <Icon size={18} className="flex-shrink-0" />
    <span className="font-medium text-sm sm:text-base whitespace-nowrap">{category}</span>
    <ChevronRight size={14} className="ml-auto flex-shrink-0" />
  </motion.button>
);

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, toggleOpen, theme }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className={`overflow-hidden rounded-lg sm:rounded-xl ${
      theme === 'dark'
        ? 'bg-gray-800/50 hover:bg-gray-800'
        : 'bg-white hover:bg-gray-50'
    } transition-all duration-200 shadow-md hover:shadow-lg`}
  >
    <button
      onClick={toggleOpen}
      className="w-full p-3 sm:p-4 flex items-center justify-between gap-3 sm:gap-4"
    >
      <span className={`flex-1 text-left font-medium text-sm sm:text-base ${
        theme === 'dark' ? 'text-gray-200' : 'text-gray-800'
      }`}>
        {question}
      </span>
      <motion.span
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {isOpen ? (
          <Minus className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={18} />
        ) : (
          <Plus className={theme === 'dark' ? 'text-blue-400' : 'text-blue-600'} size={18} />
        )}
      </motion.span>
    </button>
    
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`px-3 sm:px-4 pb-3 sm:pb-4 text-sm sm:text-base ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          <div className="border-t border-gray-200 dark:border-gray-700 pt-3 sm:pt-4">
            {answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.div>
);

// Main FAQ Section Component
const FAQSection = () => {
  const { theme } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(faqData[0].category);
  const [openQuestionId, setOpenQuestionId] = useState(null);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobileView(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter questions based on search query and selected category
  const filteredQuestions = React.useMemo(() => {
    const categoryQuestions = faqData.find(cat => cat.category === selectedCategory)?.questions || [];
    if (!searchQuery) return categoryQuestions;
    return categoryQuestions.filter(
      item => item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
              item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, selectedCategory]);

  return (
    <section className={`relative min-h-screen py-8 sm:py-12 md:py-20 ${
      theme === 'dark'
        ? 'bg-gradient-to-b from-gray-900 to-gray-800'
        : 'bg-gradient-to-b from-gray-50 to-white'
    }`}>
      <BackgroundPattern />
      
      <div className="container mx-auto px-4 relative">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8 sm:mb-12"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-block mb-4 sm:mb-6"
          >
            <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center transform rotate-12 ${
              theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/10'
            }`}>
              <HelpCircle 
                className={`w-8 h-8 sm:w-10 sm:h-10 -rotate-12 ${
                  theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
                }`}
              />
            </div>
          </motion.div>
          
          <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r bg-clip-text text-transparent ${
            theme === 'dark'
              ? 'from-blue-400 to-purple-400'
              : 'from-blue-600 to-purple-600'
          }`}>
            Frequently Asked Questions
          </h1>
          
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Find answers to common questions about our investment services and solutions
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto">
          <SearchBar 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            theme={theme}
          />

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {/* Category Sidebar */}
            <div className="flex md:block overflow-x-auto md:overflow-visible gap-2 sm:gap-3 md:space-y-4 pb-4 md:pb-0">
              {faqData.map((category) => (
                <CategoryTab
                  key={category.category}
                  category={category.category}
                  icon={category.icon}
                  isActive={category.category === selectedCategory}
                  onClick={() => setSelectedCategory(category.category)}
                  theme={theme}
                />
              ))}
            </div>

            {/* Questions List */}
            <div className="md:col-span-3 space-y-3 sm:space-y-4">
              {filteredQuestions.length > 0 ? (
                filteredQuestions.map((item, index) => (
                  <FAQItem
                    key={index}
                    question={item.question}
                    answer={item.answer}
                    isOpen={openQuestionId === index}
                    toggleOpen={() => setOpenQuestionId(openQuestionId === index ? null : index)}
                    theme={theme}
                  />
                ))
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`text-center p-6 sm:p-8 rounded-lg sm:rounded-xl ${
                    theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
                  }`}
                >
                  <p className={`text-sm sm:text-base ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}>
                    No questions found matching your search criteria.
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;