import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import { ArrowRight } from "lucide-react";

const BasePageLayout = ({
  title,
  subtitle,
  heroAnimation,
  sections,
  ctaTitle,
  ctaDescription,
  summaryContent
}) => {
  const { theme } = useTheme();

  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const customStyles = `
    @keyframes dash {
      0% { stroke-dashoffset: 300; }
      50% { stroke-dashoffset: 0; }
      100% { stroke-dashoffset: -300; }
    }
    .animate-dash { animation: dash 3s ease-in-out infinite; }
    .animate-in { opacity: 1 !important; transform: translateY(0) !important; }
    .slide-transition { transition: all 500ms ease-in-out; }

    @media (max-width: 640px) {
      .animate-dash { animation-duration: 2s; }
    }
  `;

  return (
    <div className={`min-h-screen w-full ${theme === 'dark' ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <style>{customStyles}</style>
      
      {/* Hero Section */}
      <section className="relative py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="text-center md:text-left space-y-4 md:space-y-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                {title}
              </h1>
              <p className="text-lg sm:text-xl md:text-2xl opacity-90 max-w-2xl mx-auto md:mx-0">
                {subtitle}
              </p>
              <div className="mt-6 md:mt-8">
                <Link 
                  to="/contact"
                  className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg
                    transform transition-all hover:scale-105 hover:shadow-lg
                    ${theme === 'dark' 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
                >
                  Start Investing
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </Link>
              </div>
            </div>
            <div className="order-first md:order-last">
              {heroAnimation}
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Sections */}
      {sections.map((Section, index) => (
        <section 
          key={index} 
          className={`py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8 ${
            index % 2 === 1 
              ? (theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30') 
              : ''
          }`}
        >
          {Section}
        </section>
      ))}

      {/* CTA Section */}
      <section className={`py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 ${theme === 'dark' ? 'bg-gray-800/30' : 'bg-white/30'}`}>
        <div className="max-w-4xl mx-auto text-center space-y-4 md:space-y-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            {ctaTitle}
          </h2>
          <p className={`text-base sm:text-lg md:text-xl max-w-2xl mx-auto ${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
            {ctaDescription}
          </p>
          <div className="mt-6 md:mt-8">
            <Link 
              to="/contact"
              className={`inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg rounded-lg
                transform transition-all hover:scale-105 hover:shadow-lg
                ${theme === 'dark' 
                  ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                  : 'bg-blue-500 hover:bg-blue-600 text-white'}`}
            >
              Contact Us
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Summary Section */}
      {summaryContent && (
        <section className="py-12 sm:py-14 md:py-16 px-4 sm:px-6 md:px-8">
          <div className="max-w-6xl mx-auto">
            <div className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl border
              ${theme === 'dark' 
                ? 'bg-gray-800/60 border-gray-700' 
                : 'bg-white/60 border-gray-200'}`}
            >
              {summaryContent}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default BasePageLayout;