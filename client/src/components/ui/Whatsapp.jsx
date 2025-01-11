import React, { useState, useEffect } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext.jsx';

const WhatsAppContact = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme } = useTheme();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const contacts = [
    { 
      name: "Harsh Agarwal", 
      title: "FOUNDER",
      number: "+91 922044 5243" 
    },
  ];

  const handleWhatsAppClick = (number, name) => {
    const message = `Hi ${name}!`;
    const encodedMessage = encodeURIComponent(message);
    const url = `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${encodedMessage}`;
    
    if (isMobile) {
      window.location.href = url;
    } else {
      window.open(url, '_blank');
    }
  };

  const isDark = theme === 'dark';

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end">
      {/* Contact Panel */}
      {isOpen && (
        <div 
          className={`
            mb-4 rounded-2xl w-72 sm:w-80 
            ${isDark ? 'bg-gray-800' : 'bg-white'}
            border ${isDark ? 'border-gray-700' : 'border-gray-200'}
            shadow-lg transition-all duration-300 ease-in-out
          `}
        >
          {/* Header */}
          <div className={`p-4 border-b ${isDark ? 'border-gray-700' : 'border-gray-200'}`}>
            <div className="flex items-center justify-between">
              <h3 className={`text-lg font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Contact Us
              </h3>
              <button
                onClick={() => setIsOpen(false)}
                className={`
                  rounded-full p-2 transition-colors duration-200
                  ${isDark 
                    ? 'hover:bg-gray-700 text-gray-400 hover:text-gray-200' 
                    : 'hover:bg-gray-100 text-gray-500 hover:text-gray-700'}
                `}
                aria-label="Close contact panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className={`text-sm mt-2 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Chat with our team on WhatsApp
            </p>
          </div>
          
          {/* Contact Buttons */}
          <div className="p-4">
            <div className="space-y-3">
              {contacts.map((contact) => (
                <button
                  key={contact.number}
                  onClick={() => handleWhatsAppClick(contact.number, contact.name)}
                  className={`
                    group flex items-center justify-center gap-3 
                    w-full px-4 py-3 rounded-xl
                    bg-blue-600 hover:bg-blue-700 
                    text-white font-medium
                    transition-all duration-200 
                    transform hover:scale-[1.02]
                    focus:outline-none focus:ring-2 focus:ring-blue-500 
                    focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-800' : 'focus:ring-offset-white'}
                  `}
                >
                  <MessageCircle className="h-5 w-5 flex-shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <div className="flex flex-col items-start">
                    <span className="text-base font-semibold">{contact.name}</span>
                    <span className="text-xs font-medium opacity-90">{contact.title}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          rounded-full bg-blue-600 hover:bg-blue-700 
          p-3 sm:p-4 text-white 
          shadow-lg hover:shadow-xl
          transition-all duration-200 
          transform hover:scale-105
          focus:outline-none focus:ring-2 focus:ring-blue-500 
          focus:ring-offset-2 ${isDark ? 'focus:ring-offset-gray-900' : 'focus:ring-offset-white'}
        `}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>
    </div>
  );
};

export default WhatsAppContact;