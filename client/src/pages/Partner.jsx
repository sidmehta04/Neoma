import React, { useState, useEffect } from 'react';
import { ClipboardCheck, FileCheck, UserPlus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

import PartnerImage from '../assets/Partner.svg';
const TypeWriter = ({ text, delay = 100 }) => {
  const [currentText, setCurrentText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setCurrentText(prev => prev + text[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      }, delay);
      return () => clearTimeout(timeout);
    }
  }, [currentIndex, delay, text]);

  return <span>{currentText}</span>;
};

const GlitterText = ({ children }) => (
  <span className="inline-block animate-shimmer bg-gradient-to-r from-blue-600 via-blue-400 to-blue-600 bg-clip-text text-transparent bg-300">
    {children}
  </span>
);

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg border transition-all duration-200 ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm font-medium">{children}</div>
);

const PartnerWithUs = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [formData, setFormData] = useState({
    name: '',
    phone_number: '',
    email: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    type: 'success'
  });

  const steps = [
    {
      icon: UserPlus,
      title: "Get in Touch",
      description: "Fill out our contact form to express your interest in partnership"
    },
    {
      icon: FileCheck,
      title: "Verification",
      description: "Submit required documents for verification process"
    },
    {
      icon: ClipboardCheck,
      title: "Onboarding",
      description: "Complete our partner onboarding process and start earning"
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/partner`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (!response.ok) throw new Error('Network response was not ok');
      
      setAlert({
        show: true,
        message: "Thank you for your interest! We'll contact you soon.",
        type: "success"
      });
      setFormData({ name: '', phone_number: '', email: '', message: '' });
    } catch (error) {
      console.error('Partner form submission error:', error);
      setAlert({
        show: true,
        message: "Something went wrong. Please try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 5000);
    }
  };

  const inputClasses = `mt-1 block w-full rounded-lg transition-all duration-200
    border focus:ring-2 focus:ring-offset-0 focus:outline-none py-2.5 px-4
    ${isDark ? "bg-gray-700 border-gray-600 text-white" : "bg-white border-gray-300 text-gray-900"}`;

  return (
    <div className="min-h-screen bg-[rgb(11,15,23)]">
      {/* Hero Section */}
      <div className="relative overflow-hidden py-12 sm:py-16 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            {/* Left Content */}
            <div className="text-left">
              <h1 className="text-3xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4 sm:mb-6 text-white">
                <TypeWriter text="Partner With Us for Growth" />
              </h1>
              <p className="text-base sm:text-lg leading-8 max-w-2xl mb-6 sm:mb-10 text-gray-300">
                <GlitterText>
                  Earn lucrative commission without an initial investment.
                </GlitterText>
              </p>
              <button
                onClick={() => {
                  document.getElementById('contact-form').scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                  });
                }}
                className="rounded-lg px-6 py-3 text-lg font-semibold shadow-sm
                  transition-all duration-200 hover:scale-105 bg-blue-600 text-white hover:bg-blue-500">
                Become a Partner
              </button>
            </div>
            
            {/* Right SVG */}
            <div className="relative w-full h-96">
              <img 
                src={PartnerImage}
                alt="Partnership Illustration"
                className="w-full h-full object-contain scale-90 sm:scale-100"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 sm:mb-12 text-center text-white">
          <TypeWriter text="Steps for becoming our partner" delay={50} />
        </h2>
        <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} 
              className="p-6 rounded-xl transition-all duration-200 hover:scale-105
                bg-gray-800/50 hover:bg-gray-800">
              <div className="p-3 rounded-lg w-fit mb-4 bg-gray-700">
                <step.icon className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-white">
                <TypeWriter text={`Step ${index + 1} - ${step.title}`} delay={30} />
              </h3>
              <p className="text-base leading-relaxed text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form */}
      <div id="contact-form" className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="p-8 rounded-xl shadow-lg transition-all duration-300 hover:shadow-xl bg-gray-800">
          <h2 className="text-3xl font-bold mb-6 text-center text-white">
            <TypeWriter text="Get in Touch" delay={50} />
          </h2>
          
          {alert.show && (
            <Alert className={`mb-6 ${
              alert.type === "error"
                ? "bg-red-900/30 border-red-700/50 text-red-200"
                : "bg-green-900/30 border-green-700/50 text-green-200"
            }`}>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Full Name
                </label>
                <input 
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="John Doe"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Phone Number
                </label>
                <input 
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className={inputClasses}
                  placeholder="Your phone number"
                  required
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Email
              </label>
              <input 
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={inputClasses}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                Message
              </label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                rows="4"
                className={inputClasses}
                placeholder="Tell us about your partnership interests..."
                required
              />
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 text-lg font-semibold rounded-lg
                transition-all duration-200 hover:scale-105 bg-blue-600 text-white 
                hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// Animation styles
const styles = `
  @keyframes shimmer {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }
  
  .animate-shimmer {
    animation: shimmer 2s infinite;
  }
  
  .bg-300 {
    background-size: 300% 100%;
  }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

export default PartnerWithUs;