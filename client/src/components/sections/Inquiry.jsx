import React, { useState, useEffect } from "react";
import { X, Check, AlertCircle, ChevronDown } from "lucide-react";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || import.meta.env.VITE_API_URL2 || 'http://localhost:5001';

// Country codes data
const countryCodes = [
  { code: "91", country: "India", flag: "🇮🇳", example: "9876543210" },
  { code: "1", country: "United States", flag: "🇺🇸", example: "2345678901" },
  { code: "44", country: "United Kingdom", flag: "🇬🇧", example: "7123456789" },
  { code: "61", country: "Australia", flag: "🇦🇺", example: "412345678" },
  { code: "86", country: "China", flag: "🇨🇳", example: "13812345678" },
  { code: "81", country: "Japan", flag: "🇯🇵", example: "7012345678" },
  { code: "65", country: "Singapore", flag: "🇸🇬", example: "81234567" },
  { code: "971", country: "UAE", flag: "🇦🇪", example: "501234567" }
];

const Alert = ({ children, variant = "error" }) => (
  <div className={`p-3 rounded-md border ${
    variant === 'success' ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-700"
  } flex items-center gap-2`}>
    {children}
  </div>
);

const ContactDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", phone: "" });
      setError("");
      setSuccess(false);
      setSelectedCountry(countryCodes[0]);
    }

    const handleClickOutside = (event) => {
      if (!event.target.closest(".country-selector")) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'phone' ? value.replace(/\D/g, "") : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await axios.post(
        `${API_URL}/api/contact/submit`,
        {
          name: formData.name.trim(),
          phone: formData.phone,
          countryCode: selectedCountry.code
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" }
        }
      );

      setSuccess(true);
      setTimeout(() => {
        window.location.href = response.data.whatsappUrl;
        onClose();
      }, 1000);
      
    } catch (error) {
      console.error("Error:", error);
      setError(error.response?.data?.error || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md mx-auto bg-white rounded-lg shadow-xl">
        <div className="p-4 sm:p-6">
          {/* Header */}
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
              Get Started with NEOMA
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Enter your details below and we'll connect you with us on WhatsApp.
            </p>
          </div>

          {/* Messages */}
          {success && (
            <Alert variant="success" className="mb-4">
              <Check className="h-4 w-4 text-green-500" />
              <span>Successfully submitted! Redirecting to WhatsApp...</span>
            </Alert>
          )}

          {error && (
            <Alert variant="error" className="mb-4">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>{error}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name *
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                minLength={2}
                maxLength={50}
                className="w-full px-3 sm:px-4 py-2 border border-gray-300 rounded-md 
                         text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-900 bg-white transition-all duration-200
                         placeholder:text-gray-400
                         disabled:opacity-50 disabled:cursor-not-allowed"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                disabled={isLoading}
              />
            </div>

            {/* Phone Input with Country Selector */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                Phone Number *
              </label>
              <div className="flex gap-2">
                <div className="relative country-selector">
                  <button
                    type="button"
                    onClick={() => setIsCountryDropdownOpen(!isCountryDropdownOpen)}
                    className="h-full flex items-center justify-between gap-2 px-3 py-2 border border-gray-300 rounded-md
                             text-sm sm:text-base bg-white min-w-[100px]
                             hover:bg-gray-50 transition-colors duration-200
                             focus:outline-none focus:ring-2 focus:ring-blue-500
                             disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={isLoading}
                  >
                    <span className="text-lg">{selectedCountry.flag}</span>
                    <span className="font-medium">+{selectedCountry.code}</span>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {isCountryDropdownOpen && (
                    <div className="absolute z-10 left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => {
                            setSelectedCountry(country);
                            setIsCountryDropdownOpen(false);
                          }}
                          className="w-full px-4 py-2.5 text-left flex items-center gap-3
                                   hover:bg-gray-50 transition-colors duration-200
                                   focus:outline-none focus:bg-gray-50"
                        >
                          <span className="text-lg">{country.flag}</span>
                          <span className="flex-1 font-medium">{country.country}</span>
                          <span className="text-gray-500 tabular-nums">+{country.code}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className="flex-1 px-3 sm:px-4 py-2 border border-gray-300 rounded-md 
                           text-sm sm:text-base
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-900 bg-white transition-all duration-200
                           placeholder:text-gray-400
                           disabled:opacity-50 disabled:cursor-not-allowed"
                  placeholder={`Example: ${selectedCountry.example}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800
                         text-sm sm:text-base font-medium border border-gray-300 rounded-md
                         hover:bg-gray-50 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full sm:w-auto px-6 py-2 
                         bg-blue-500 text-white rounded-md 
                         text-sm sm:text-base font-medium
                         hover:bg-blue-600 
                         disabled:opacity-50 disabled:cursor-not-allowed
                         transition-colors duration-200
                         flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  "Submit"
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 
                   p-1 rounded-full text-gray-400 hover:text-gray-600 
                   hover:bg-gray-100 transition-colors duration-200
                   disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
};

export default ContactDialog;