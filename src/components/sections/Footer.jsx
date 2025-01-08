// Footer.js
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import RiskDeclaration from "./RiskDeclaration";

const Footer = () => {
  const { theme } = useTheme();

  return (
    <footer
      className={`${
        theme === "dark"
          ? "bg-gray-900 text-gray-300"
          : "bg-gray-100 text-gray-600"
      } py-8 sm:py-12 transition-colors duration-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <span
                className={`text-lg sm:text-xl ml-0 ${
                  theme === "dark" ? "text-white" : "text-gray-900"
                }`}
              >
                NeomaCapital
              </span>
            </div>
            <p className="text-xs sm:text-sm mb-6">
              CIN (Corporate Identity Number) -U64990DL2025PTC440724
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/neoma-capital"
                className={`transform transition-transform duration-200 hover:scale-110 ${
                  theme === "dark" ? "hover:text-white" : "hover:text-gray-900"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>

              <a
                href="https://www.instagram.com/neomacapital"
                className={`transform transition-transform duration-200 hover:scale-110 ${
                  theme === "dark" ? "hover:text-white" : "hover:text-gray-900"
                }`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  className="h-5 w-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Offerings Links */}
          <div>
            <h3
              className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Offerings
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  to="/mutual-funds"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  MutualFunds
                </Link>
              </li>
              <li>
                <Link
                  to="/get-started"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  Unlisted Shares
                </Link>
              </li>
              <li>
                <Link
                  to="/alternative"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  Alternative Investments
                </Link>
              </li>
              <li>
                <Link
                  to="/debt"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  Bonds
                </Link>
              </li>
              <li>
                <Link
                  to="/pre-ipo"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  Angle Investments
                </Link>
              </li>
              <li>
                <Link
                  to="/equity"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  PrivateBoutique{" "}
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3
              className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Resources
            </h3>
            <ul className="space-y-2 text-sm sm:text-base">
              <li>
                <Link
                  to="/blog"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  Blogs
                </Link>
              </li>
              <li>
                <Link
                  to="/FAQ"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  FAQs
                </Link>
              </li>
              <li>
                <Link
                  to="/calculators"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  Calculators
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3
              className={`text-base sm:text-lg font-semibold mb-3 sm:mb-4 ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Our Office
            </h3>
            <address className="not-italic text-sm sm:text-base">
              <p className="mb-4">2/16 FF RS Nehru Enclave New Delhi -110019</p>
              <p className="mb-2">
                <a
                  href="mailto:info@neomacapital.com"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  info@neomacapital.com
                </a>
              </p>
              <p>
                <a
                  href="tel:+91 98102 55243"
                  className={`transition-colors duration-200 ${
                    theme === "dark"
                      ? "hover:text-white"
                      : "hover:text-gray-900"
                  }`}
                >
                  +91 9220445243
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Legal Links */}
        <div
          className={`mt-8 sm:mt-12 pt-6 sm:pt-8 border-t ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex justify-center items-center">
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-8 text-sm sm:text-base">
              <Link
                to="/privacy-policy"
                className={`transition-colors duration-200 text-center ${
                  theme === "dark" ? "hover:text-white" : "hover:text-gray-900"
                }`}
              >
                Privacy Policy
              </Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <Link
                to="/terms-of-use"
                className={`transition-colors duration-200 text-center ${
                  theme === "dark" ? "hover:text-white" : "hover:text-gray-900"
                }`}
              >
                Terms of Use
              </Link>
              <span className="hidden sm:inline text-gray-400">|</span>
              <Link
                to="/declaration-of-risk"
                className={`transition-colors duration-200 text-center ${
                  theme === "dark" ? "hover:text-white" : "hover:text-gray-900"
                }`}
              >
                Declaration of Risks
              </Link>
            </div>
          </div>
        </div>
        {/* Risk Declaration */}
        <div
          className={`mt-8 pt-6 border-t ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <RiskDeclaration theme={theme} />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
