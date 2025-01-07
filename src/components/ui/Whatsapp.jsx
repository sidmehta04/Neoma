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
    { name: "Harsh Agarwal(CEO)", number: "+91 98102 55243" },
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
      {isOpen && (
        <div className={`
          mb-4 rounded-2xl overflow-hidden w-[280px] sm:w-[320px]
          transform transition-transform duration-200 ease-in-out
          ${isDark ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}
          border shadow-2xl
        `}>
          <div className={`
            p-4 border-b
            ${isDark ? 'border-gray-700' : 'border-gray-200'}
          `}>
            <div className="flex items-center justify-between">
              <h3 className={`
                text-lg font-bold
                ${isDark ? 'text-white' : 'text-gray-900'}
              `}>
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
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className={`
              text-sm mt-2
              ${isDark ? 'text-gray-300' : 'text-gray-600'}
            `}>
              Chat with our team on WhatsApp
            </p>
          </div>
          
          <div className="p-4">
            <div className="space-y-3">
              {contacts.map((contact) => (
                <button
                  key={contact.number}
                  onClick={() => handleWhatsAppClick(contact.number, contact.name)}
                  className="
                    flex items-center justify-center space-x-3 
                    rounded-xl bg-blue-600 hover:bg-blue-700 
                    px-4 py-3 w-full
                    text-white text-base font-medium 
                    transition-colors duration-200
                    transform hover:scale-[1.02]
                  "
                >
                  <MessageCircle className="h-5 w-5 flex-shrink-0" />
                  <span className="truncate">{contact.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="
          rounded-full bg-blue-600 hover:bg-blue-700 
          p-3 sm:p-4 text-white 
          shadow-lg hover:shadow-xl
          transition-all duration-200 
          transform hover:scale-105
          flex items-center justify-center
        "
        aria-label="Open WhatsApp chat"
      >
        <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
      </button>
    </div>
  );
};

export default WhatsAppContact;