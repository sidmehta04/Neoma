import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/superbase";
import { X, Check, AlertCircle, ChevronDown } from "lucide-react";

// Country codes data with flags and validation rules
const countryCodes = [
  { 
    code: "91", 
    country: "India", 
    flag: "🇮🇳",
    minLength: 10,
    maxLength: 10,
    pattern: "^[6-9]\\d{9}$",
    example: "9876543210"
  },
  { 
    code: "1", 
    country: "United States", 
    flag: "🇺🇸",
    minLength: 10,
    maxLength: 10,
    pattern: "^[2-9]\\d{9}$",
    example: "2345678901"
  },
  { 
    code: "44", 
    country: "United Kingdom", 
    flag: "🇬🇧",
    minLength: 10,
    maxLength: 10,
    pattern: "^[27]\\d{9}$",
    example: "7123456789"
  },
  { 
    code: "61", 
    country: "Australia", 
    flag: "🇦🇺",
    minLength: 9,
    maxLength: 9,
    pattern: "^[4]\\d{8}$",
    example: "412345678"
  },
  { 
    code: "86", 
    country: "China", 
    flag: "🇨🇳",
    minLength: 11,
    maxLength: 11,
    pattern: "^[1]\\d{10}$",
    example: "13812345678"
  },
  { 
    code: "81", 
    country: "Japan", 
    flag: "🇯🇵",
    minLength: 10,
    maxLength: 10,
    pattern: "^[789]\\d{9}$",
    example: "7012345678"
  },
  { 
    code: "65", 
    country: "Singapore", 
    flag: "🇸🇬",
    minLength: 8,
    maxLength: 8,
    pattern: "^[689]\\d{7}$",
    example: "81234567"
  },
  { 
    code: "971", 
    country: "UAE", 
    flag: "🇦🇪",
    minLength: 9,
    maxLength: 9,
    pattern: "^[5]\\d{8}$",
    example: "501234567"
  }
];

const Alert = ({ children, variant = "error" }) => {
  const styles = {
    success: "bg-green-50 border-green-200 text-green-700",
    error: "bg-red-50 border-red-200 text-red-700",
  };

  return (
    <div className={`p-3 rounded-md border ${styles[variant]} flex items-center gap-2`}>
      {children}
    </div>
  );
};

const ContactDialog = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });
  const [selectedCountry, setSelectedCountry] = useState(countryCodes[0]); // India as default
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  // Reset form state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", phone: "" });
      setError("");
      setSuccess(false);
      setPhoneError("");
      setSelectedCountry(countryCodes[0]);
    }
  }, [isOpen]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.country-selector')) {
        setIsCountryDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Additional validation patterns for unrealistic numbers
  const invalidPatterns = {
    repeatedDigits: /^(\d)\1+$/,  // Same digit repeated (e.g., 999999999)
    sequential: /^(?:0123456789|1234567890|9876543210)+$/,  // Sequential numbers
    sameDigitGroups: /^(\d)\1{3,}/, // Four or more same digits in a row
    commonFake: /^(0{5,}|1{5,}|2{5,}|3{5,}|4{5,}|5{5,}|6{5,}|7{5,}|8{5,}|9{5,})/, // Five or more repeated digits
    tooSimple: /^(0000|1111|2222|3333|4444|5555|6666|7777|8888|9999)/, // Simple repeated patterns
  };

  // Phone number validation
  const validatePhoneNumber = (phone) => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, "");
    
    // Get validation rules for selected country
    const { minLength, maxLength, pattern, example } = selectedCountry;
    
    // Check length
    if (cleanPhone.length < minLength || cleanPhone.length > maxLength) {
      setPhoneError(`Phone number must be ${minLength} digits for ${selectedCountry.country}. Example: ${example}`);
      return false;
    }
    
    // Check country-specific pattern
    const regex = new RegExp(pattern);
    if (!regex.test(cleanPhone)) {
      setPhoneError(`Invalid phone number format for ${selectedCountry.country}. Example: ${example}`);
      return false;
    }

    // Check for unrealistic number patterns
    if (invalidPatterns.repeatedDigits.test(cleanPhone)) {
      setPhoneError("Invalid phone number: Cannot use same digit repeatedly");
      return false;
    }

    if (invalidPatterns.sequential.test(cleanPhone)) {
      setPhoneError("Invalid phone number: Cannot use sequential numbers");
      return false;
    }

    if (invalidPatterns.sameDigitGroups.test(cleanPhone)) {
      setPhoneError("Invalid phone number: Too many repeated digits");
      return false;
    }

    if (invalidPatterns.commonFake.test(cleanPhone)) {
      setPhoneError("Invalid phone number: Pattern appears to be fake");
      return false;
    }

    if (invalidPatterns.tooSimple.test(cleanPhone)) {
      setPhoneError("Invalid phone number: Pattern too simple");
      return false;
    }

    // Additional India-specific validation
    if (selectedCountry.code === "91") {
      // Check for invalid Indian prefixes
      const invalidIndianPrefixes = /^(0|1|2|3|4|5)/;
      if (invalidIndianPrefixes.test(cleanPhone)) {
        setPhoneError("Invalid Indian mobile number: Must start with 6, 7, 8, or 9");
        return false;
      }

      // Check for known invalid Indian patterns
      const invalidIndianPatterns = [
        '9999999999', '8888888888', '7777777777', '6666666666',
        '1234567890', '0123456789', '0987654321',
      ];
      if (invalidIndianPatterns.includes(cleanPhone)) {
        setPhoneError("Invalid phone number: Commonly used fake number");
        return false;
      }
    }

    // Add similar specific validations for other countries
    if (selectedCountry.code === "1") {  // US
      const invalidUSPrefixes = /^(0|1)/;
      if (invalidUSPrefixes.test(cleanPhone)) {
        setPhoneError("Invalid US number: Cannot start with 0 or 1");
        return false;
      }

      // Check for valid area codes (simplified example)
      const validAreaCode = /^([2-9][0-9][0-9])/;
      if (!validAreaCode.test(cleanPhone)) {
        setPhoneError("Invalid US area code");
        return false;
      }
    }
    
    setPhoneError("");
    return true;
  };

  // Format phone number as user types
  const formatPhoneNumber = (phone) => {
    // Remove all non-digits
    return phone.replace(/\D/g, "");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "phone") {
      const formattedPhone = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: formattedPhone,
      }));
      validatePhoneNumber(formattedPhone);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
    setIsCountryDropdownOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // Validate phone number before submission
    if (!validatePhoneNumber(formData.phone)) {
      setIsLoading(false);
      return;
    }

    try {
      const fullPhoneNumber = `+${selectedCountry.code}${formData.phone}`;

      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("early_subscribers")
        .insert([
          {
            name: formData.name,
            phone: fullPhoneNumber,
          },
        ]);

      if (supabaseError) throw supabaseError;

      // Prepare WhatsApp redirect
      const businessPhone = "919220445243";
      const message = encodeURIComponent(
        `Hi, I'm ${formData.name}. I'm interested in learning more about NEOMA.`
      );
      
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${message}`;

      setSuccess(true);
      
      setTimeout(() => {
        window.location.href = whatsappUrl;
        onClose();
        setFormData({ name: "", phone: "" });
      }, 1500);

    } catch (err) {
      console.error("Error:", err);
      setError(
        err.message || "Something went wrong. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      />
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

          {/* Success Message */}
          {success && (
            <Alert variant="success" className="mb-4">
              <Check className="h-4 w-4 text-green-500" />
              <span>Successfully submitted! Redirecting to WhatsApp...</span>
            </Alert>
          )}

          {/* Error Message */}
          {error && (
            <Alert variant="error" className="mb-4">
              <AlertCircle className="h-4 w-4 text-red-500" />
              <span>{error}</span>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Input */}
            <div>
              <label 
                htmlFor="name" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
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
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number *
              </label>
              <div className="flex gap-2">
                {/* Country Code Selector */}
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
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{selectedCountry.flag}</span>
                      <span className="font-medium">+{selectedCountry.code}</span>
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-500" />
                  </button>

                  {/* Country Dropdown */}
                  {isCountryDropdownOpen && (
                    <div className="absolute z-10 left-0 mt-1 w-64 bg-white border border-gray-200 rounded-md shadow-lg max-h-60 overflow-y-auto">
                      {countryCodes.map((country) => (
                        <button
                          key={country.code}
                          type="button"
                          onClick={() => handleCountrySelect(country)}
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

                {/* Phone Number Input */}
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  className={`flex-1 px-3 sm:px-4 py-2 border rounded-md 
                           text-sm sm:text-base
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           text-gray-900 bg-white transition-all duration-200
                           placeholder:text-gray-400
                           disabled:opacity-50 disabled:cursor-not-allowed
                           ${phoneError ? 'border-red-300' : 'border-gray-300'}`}
                  placeholder={`Example: ${selectedCountry.example}`}
                  value={formData.phone}
                  onChange={handleInputChange}
                  disabled={isLoading}
                />
              </div>
              {phoneError && (
                <p className="mt-1 text-sm text-red-500">
                  {phoneError}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-2 sm:gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                disabled={isLoading}
                className="w-full sm:w-auto px-4 py-2 text-gray-600 hover:text-gray-800
                         text-sm sm:text-base font-medium
                         border border-gray-300 rounded-md
                         hover:bg-gray-50 transition-colors duration-200
                         disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !!phoneError}
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
                   p-1 rounded-full
                   text-gray-400 hover:text-gray-600 
                   hover:bg-gray-100
                   transition-colors duration-200
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