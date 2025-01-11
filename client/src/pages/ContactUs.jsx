import React, { useState } from "react";
import { MapPin, Phone, Mail } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001';

const Alert = ({ children, className }) => (
  <div className={`p-4 rounded-lg border transition-all duration-200 ${className}`}>
    {children}
  </div>
);

const AlertDescription = ({ children }) => (
  <div className="text-sm font-medium">{children}</div>
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
      await axios.post(
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
    mt-1 block w-full rounded-lg
    transition-all duration-200
    border focus:ring-2 focus:ring-offset-0 focus:outline-none
    py-2.5 sm:py-3 px-4
    text-sm sm:text-base
    ${isDark 
      ? "bg-gray-800 border-gray-700 text-gray-100 placeholder:text-gray-500 focus:ring-blue-500/50" 
      : "bg-white border-blue-100 text-gray-900 placeholder:text-gray-400 focus:ring-blue-100 focus:border-blue-200"}
  `;

  const labelClasses = `block text-sm font-medium mb-1.5 ${
    isDark ? "text-gray-300" : "text-blue-900"
  }`;

  return (
    <div className={`w-full mx-auto px-4 py-8 sm:py-12 lg:py-16 transition-colors duration-200
      ${isDark ? "bg-gray-900" : "bg-white"}`}>
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 sm:mb-12">
          <h1 className={`text-3xl sm:text-4xl font-bold mb-4 
            ${isDark ? "text-white" : "text-blue-900"}`}>
            Contact Us
          </h1>
          <p className={`text-base sm:text-lg mb-2 
            ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            We'd be delighted to hear from you! At Neoma Capital, we're here to assist with any queries about financial services.
          </p>
          <p className={`text-base sm:text-lg 
            ${isDark ? "text-gray-300" : "text-gray-600"}`}>
            Reach out via phone, email, or the contact form displayed. Our dedicated team is ready to assist you in achieving your financial goals.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Information */}
          <div className="order-2 lg:order-1">
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className={`text-sm font-medium mb-1
                    ${isDark ? "text-gray-200" : "text-blue-900"}`}>
                    Our Address
                  </h3>
                  <p className={`text-base leading-relaxed
                    ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    2/16 FF RS Nehru Enclave KalKaji D Block, New Delhi -110019
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                  <Phone className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className={`text-sm font-medium mb-1
                    ${isDark ? "text-gray-200" : "text-blue-900"}`}>
                    Phone
                  </h3>
                  <p className={`text-base
                    ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                    +919220445243
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className={`p-2 rounded-lg ${isDark ? "bg-blue-500/10" : "bg-blue-50"}`}>
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className={`text-sm font-medium mb-1
                    ${isDark ? "text-gray-200" : "text-blue-900"}`}>
                    Email
                  </h3>
                  <a 
                    href="mailto:info@neomacapital.com" 
                    className={`text-base hover:underline
                      ${isDark ? "text-gray-400 hover:text-blue-400" : "text-gray-600 hover:text-blue-600"}`}
                  >
                    info@neomacapital.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3505.095656387876!2d77.25732719999999!3d28.545557499999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s!2s!5e0!3m2!1sen!2sin!4v1673000000000!5m2!1sen!2sin"
                className={`w-full h-64 sm:h-72 rounded-lg border transition-colors duration-200
                  ${isDark ? "border-gray-700" : "border-blue-100"}`}
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Contact Form */}
          <div className={`order-1 lg:order-2 rounded-xl shadow-lg p-6 sm:p-8
            ${isDark ? "bg-gray-800/50" : "bg-white border border-blue-100"}`}>
            {alert.show && (
              <Alert
                className={`mb-6 ${
                  alert.type === "error"
                    ? isDark 
                      ? "bg-red-900/30 border-red-700/50 text-red-200" 
                      : "bg-red-50 border-red-200 text-red-800"
                    : isDark
                      ? "bg-green-900/30 border-green-700/50 text-green-200" 
                      : "bg-green-50 border-green-200 text-green-800"
                }`}
              >
                <AlertDescription>{alert.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
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
                    placeholder="Your name"
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
                    placeholder="Your phone number"
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
                  placeholder="Your email address"
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
                  placeholder="Message subject"
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
                  placeholder="Your message"
                />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full sm:w-auto px-8 py-3 rounded-lg text-base font-medium text-white
                    transition-all duration-200 
                    ${loading ? "opacity-50 cursor-not-allowed" : ""}
                    ${isDark 
                      ? "bg-blue-600 hover:bg-blue-500" 
                      : "bg-blue-600 hover:bg-blue-700 shadow-sm hover:shadow"}`}
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