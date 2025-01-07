import React, { useState, useEffect } from "react";
import { supabase } from "../../lib/superbase";
import { X, Check, AlertCircle } from "lucide-react";

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
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [phoneError, setPhoneError] = useState("");

  // Reset form state when dialog opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: "", phone: "" });
      setError("");
      setSuccess(false);
      setPhoneError("");
    }
  }, [isOpen]);

  // Phone number validation
  const validatePhoneNumber = (phone) => {
    // Remove all non-digits
    const cleanPhone = phone.replace(/\D/g, "");
    
    // Basic validation for international phone numbers
    // Should be between 10 and 15 digits
    if (cleanPhone.length < 10 || cleanPhone.length > 15) {
      setPhoneError("Please enter a valid phone number with country code");
      return false;
    }
    
    setPhoneError("");
    return true;
  };

  // Format phone number as user types
  const formatPhoneNumber = (phone) => {
    // Keep the + sign if it exists at the start
    const hasPlus = phone.startsWith("+");
    // Remove all non-digits
    const cleaned = phone.replace(/\D/g, "");
    // Add back the + if it existed
    return hasPlus ? `+${cleaned}` : cleaned;
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
      // Save to Supabase
      const { error: supabaseError } = await supabase
        .from("early_subscribers")
        .insert([
          {
            name: formData.name,
            phone: formData.phone,
          },
        ]);

      if (supabaseError) throw supabaseError;

      // Prepare WhatsApp redirect
      const businessPhone = "919220445243"; // Add country code (91) for India
      const message = encodeURIComponent(
        `Hi, I'm ${formData.name}. I'm interested in learning more about NEOMA.`
      );
      
      // Create WhatsApp URL - to send message to business
      const whatsappUrl = `https://wa.me/${businessPhone}?text=${message}`;

      setSuccess(true);
      
      // Redirect to WhatsApp after short delay
      setTimeout(() => {
        window.location.href = whatsappUrl; // Use direct redirect instead of window.open
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

            {/* Phone Input */}
            <div>
              <label 
                htmlFor="phone" 
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Phone Number * <span className="text-gray-500">(with country code)</span>
              </label>
              <input
                id="phone"
                name="phone"
                type="tel"
                required
                className={`w-full px-3 sm:px-4 py-2 border rounded-md 
                         text-sm sm:text-base
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         text-gray-900 bg-white transition-all duration-200
                         placeholder:text-gray-400
                         disabled:opacity-50 disabled:cursor-not-allowed
                         ${phoneError ? 'border-red-300' : 'border-gray-300'}`}
                placeholder="e.g. +1234567890"
                value={formData.phone}
                onChange={handleInputChange}
                disabled={isLoading}
              />
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