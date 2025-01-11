import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-md transition-colors duration-200 ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm">{children}</div>
);

const ContactForm = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/api/contact-form/submit`,
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
        message: "Thank you for your message. We will get back to you soon!",
        type: "success",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error('Form submission error:', error);
      setAlert({
        show: true,
        message: error.response?.data?.error || "Something went wrong. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
      setTimeout(
        () => setAlert({ show: false, message: "", type: "success" }),
        5000
      );
    }
  };

  const inputClasses = `
    mt-1 block w-full rounded-md
    transition-colors duration-200
    bg-white border border-gray-200
    text-gray-900
    focus:ring-1 focus:ring-blue-500 focus:outline-none
    py-2 sm:py-3 px-3 sm:px-4
    text-sm sm:text-base
    placeholder:text-gray-400
    ${isDark ? "dark:bg-gray-800 dark:border-gray-600 dark:text-gray-100 dark:placeholder:text-gray-500" : ""}
  `;

  const labelClasses = `block text-sm font-medium text-gray-700 mb-1 ${isDark ? "dark:text-gray-300" : ""}`;

  return (
    <div className={`w-full mx-auto px-4 py-8 sm:py-12 lg:py-16 transition-colors duration-200 bg-white ${isDark ? "dark:bg-transparent" : ""}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-3 sm:mb-4 text-gray-900 ${isDark ? "dark:text-white" : ""}`}>
            Contact Us
          </h1>
          <p className={`text-sm sm:text-base text-gray-600 mb-2 ${isDark ? "dark:text-gray-400" : ""}`}>
            We'd be delighted to hear from you! At Neoma Capital, we're here to assist with any queries about financial services.
          </p>
          <p className={`text-sm sm:text-base text-gray-600 ${isDark ? "dark:text-gray-400" : ""}`}>
            Reach out via phone, email, or the contact form displayed. Our dedicated team is ready to assist you in achieving your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <div className="space-y-6 sm:space-y-8">
              <div className="flex items-start space-x-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1 flex-shrink-0" />
                <div>
                  <p className={`text-sm sm:text-base text-gray-600 ${isDark ? "dark:text-gray-400" : ""}`}>
                    2/16 FF RS Nehru Enclave KalKaji D Block, New Delhi -110019
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <p className={`text-sm sm:text-base text-gray-600 ${isDark ? "dark:text-gray-400" : ""}`}>
                    +919220445243
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
                <div>
                  <a href="mailto:info@neomacapital.com" className={`text-sm sm:text-base text-gray-600 ${isDark ? "dark:text-gray-400" : ""}`}>
                    info@neomacapital.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 sm:mt-12">
              <iframe
src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.095656387876!2d77.25732719999999!3d28.545557499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2s!5e0!3m2!1sen!2sin!4v1673000000000!5m2!1sen!2sin"
className={`w-full h-48 sm:h-64 rounded-lg border border-gray-200 ${isDark ? "dark:border-gray-700" : ""}`}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className={`order-1 lg:order-2 bg-white rounded-lg shadow-sm p-4 sm:p-6 ${isDark ? "dark:bg-gray-800" : ""}`}>
            {alert.show && (
              <Alert
                className={`mb-4 sm:mb-6 ${
                  alert.type === "error"
                    ? `bg-red-50 text-red-800 ${isDark ? "dark:bg-red-900/50 dark:text-red-200" : ""}`
                    : `bg-green-50 text-green-800 ${isDark ? "dark:bg-green-900/50 dark:text-green-200" : ""}`
                }`}
              >
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClasses}>Name</label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>

                <div>
                  <label htmlFor="phone" className={labelClasses}>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className={inputClasses}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className={labelClasses}>Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="subject" className={labelClasses}>Subject</label>
                <input
                  type="text"
                  name="subject"
                  id="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClasses}>Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleInputChange}
                  className={inputClasses}
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto inline-flex justify-center rounded-md px-6 sm:px-8 py-2.5 sm:py-3
                    bg-blue-600 text-sm font-medium text-white 
                    transition-colors duration-200
                    hover:bg-blue-700 focus:outline-none
                    disabled:opacity-50 ${isDark ? "dark:hover:bg-blue-500" : ""}`}
                >
                  {loading ? "Sending..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;