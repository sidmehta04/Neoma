import React, { useState } from 'react';
import { ClipboardCheck, FileCheck, UserPlus } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL||import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

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
      title: "Get in Touch with Us",
      description: "Fill out our contact form to express your interest in partnership"
    },
    {
      icon: FileCheck,
      title: "Document Verification",
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
      await axios.post(
        `${API_URL}/api/partner`,
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );

      setAlert({
        show: true,
        message: "Thank you for your interest! We'll contact you soon.",
        type: "success"
      });

      setFormData({
        name: '',
        phone_number: '',
        email: '',
        message: ''
      });

    } catch (error) {
      console.error('Partner form submission error:', error);
      setAlert({
        show: true,
        message: error.response?.data?.error || "Something went wrong. Please try again.",
        type: "error"
      });
    } finally {
      setLoading(false);
      setTimeout(() => setAlert({ show: false, message: '', type: 'success' }), 5000);
    }
  };

  const inputClasses = `mt-1 block w-full rounded-lg transition-all duration-200
    border focus:ring-2 focus:ring-offset-0 focus:outline-none py-2.5 px-4
    ${isDark 
      ? "bg-gray-700 border-gray-600 text-white" 
      : "bg-white border-gray-300 text-gray-900"}`;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0B0F17]' : 'bg-white'}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden py-20 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center">
            <h1 className={`text-4xl font-bold tracking-tight sm:text-6xl mb-6 
              ${isDark ? 'text-white' : 'text-gray-900'}`}>
              Partner With Us for Growth
            </h1>
            <p className={`text-lg leading-8 mx-auto max-w-2xl mb-10 
              ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
              Earn lucrative commission without an initial investment.
            </p>
            <button
              onClick={() => {
                document.getElementById('contact-form').scrollIntoView({ 
                  behavior: 'smooth',
                  block: 'start'
                });
              }}
              className={`rounded-lg px-6 py-3 text-lg font-semibold shadow-sm 
                transition-all duration-200 
                ${isDark 
                  ? 'bg-blue-600 text-white hover:bg-blue-500' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              Become a Partner
            </button>
          </div>
        </div>
      </div>

      {/* Steps Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <h2 className={`text-3xl font-bold mb-12 text-center
          ${isDark ? 'text-white' : 'text-gray-900'}`}>
          Steps for becoming our partner
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {steps.map((step, index) => (
            <div key={index} 
              className={`p-6 rounded-2xl transition-all duration-200 
                ${isDark 
                  ? 'bg-gray-800/50 hover:bg-gray-800' 
                  : 'bg-gray-50 hover:bg-gray-100'}`}>
              <div className={`p-3 rounded-lg w-fit mb-4
                ${isDark ? 'bg-gray-700' : 'bg-white'}`}>
                <step.icon className={`w-6 h-6 
                  ${isDark ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
              <h3 className={`text-xl font-semibold mb-2 
                ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Step {index + 1} - {step.title}
              </h3>
              <p className={`text-base leading-relaxed 
                ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Form Section */}
      <div id="contact-form" className="mx-auto max-w-3xl px-6 lg:px-8 py-20">
        <div className={`p-8 rounded-2xl 
          ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <h2 className={`text-3xl font-bold mb-6 text-center
            ${isDark ? 'text-white' : 'text-gray-900'}`}>
            Get in Touch
          </h2>

          {alert.show && (
            <Alert className={`mb-6 ${
              alert.type === "error"
                ? isDark 
                  ? "bg-red-900/30 border-red-700/50 text-red-200" 
                  : "bg-red-50 border-red-200 text-red-800"
                : isDark
                  ? "bg-green-900/30 border-green-700/50 text-green-200" 
                  : "bg-green-50 border-green-200 text-green-800"
            }`}>
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <div>
                <label className={`block text-sm font-medium mb-2
                  ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
                <label className={`block text-sm font-medium mb-2
                  ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
              <label className={`block text-sm font-medium mb-2
                ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
              <label className={`block text-sm font-medium mb-2
                ${isDark ? 'text-gray-300' : 'text-gray-700'}`}>
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
              className={`w-full px-6 py-3 text-lg font-semibold rounded-lg
                transition-all duration-200
                ${loading ? 'opacity-50 cursor-not-allowed' : ''}
                ${isDark
                  ? 'bg-blue-600 text-white hover:bg-blue-500'
                  : 'bg-blue-600 text-white hover:bg-blue-700'}`}>
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PartnerWithUs;