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
          ? "bg-[rgb(11,15,23)] text-gray-300"
          : "bg-gradient-to-b from-white to-blue-50 text-gray-600"
      } py-12 sm:py-16 transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Company Info */}
          <div className="col-span-1 space-y-6">
            <div className="flex items-center">
              <span
                className={`text-2xl font-bold ${
                  theme === "dark" ? "text-white" : "text-blue-900"
                }`}
              >
                NeomaCapital
              </span>
            </div>
            <div className="space-y-2">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                CIN (Corporate Identity Number) -U64990DL2025PTC440724
              </p>
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                ARN (Application Reference Number) -304426
              </p>
            </div>
            <div className="flex space-x-4 pt-2">
              <a
                href="https://www.linkedin.com/company/neoma-capital"
                className={`transform transition-all duration-300 hover:scale-110 p-2 rounded-lg
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-800 text-gray-400 hover:text-blue-400"
                      : "hover:bg-blue-100 text-gray-600 hover:text-blue-600"
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
                className={`transform transition-all duration-300 hover:scale-110 p-2 rounded-lg
                  ${
                    theme === "dark"
                      ? "hover:bg-gray-800 text-gray-400 hover:text-pink-400"
                      : "hover:bg-blue-100 text-gray-600 hover:text-pink-600"
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
          <div className="space-y-4">
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-blue-900"
              }`}
            >
              Offerings
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/mutual-funds", name: "MutualFunds" },
                { path: "/get-started", name: "Unlisted Shares" },
                { path: "/alternative", name: "Alternative Investments" },
                { path: "/debt", name: "Bonds" },
                { path: "/pre-ipo", name: "Angel Investments" },
                { path: "/equity", name: "Private Boutique" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-sm transition-all duration-300 hover:translate-x-1 inline-block
                      ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-blue-900"
              }`}
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {[
                { path: "/blog", name: "Blogs" },
                { path: "/FAQ", name: "FAQs" },
                { path: "/calculators", name: "Calculators" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`text-sm transition-all duration-300 hover:translate-x-1 inline-block
                      ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3
              className={`text-lg font-bold ${
                theme === "dark" ? "text-white" : "text-blue-900"
              }`}
            >
              Our Office
            </h3>
            <address className="not-italic space-y-3">
              <p
                className={`text-sm ${
                  theme === "dark" ? "text-gray-400" : "text-gray-600"
                }`}
              >
                2/16 FF RS Nehru Enclave New Delhi -110019
              </p>
              <div className="space-y-2">
                <a
                  href="mailto:info@neomacapital.com"
                  className={`text-sm block transition-all duration-300 hover:translate-x-1
                    ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  info@neomacapital.com
                </a>
                <a
                  href="tel:+91 9220445243"
                  className={`text-sm block transition-all duration-300 hover:translate-x-1
                    ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-600 hover:text-blue-600"
                    }`}
                >
                  +91 9220445243
                </a>
              </div>
            </address>
          </div>
        </div>

        {/* Legal Links */}
        <div
          className={`mt-12 pt-8 border-t ${
            theme === "dark" ? "border-gray-800" : "border-gray-200"
          }`}
        >
          <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap justify-center gap-4 sm:gap-8 text-sm">
              {[
                { path: "/privacy", name: "Privacy Policy" },
                { path: "/terms", name: "Terms of Use" },
                { path: "/risks", name: "Declaration of Risks" },
              ].map((item, index) => (
                <React.Fragment key={item.path}>
                  <Link
                    to={item.path}
                    className={`transition-all duration-300 hover:translate-y-[-2px]
                      ${
                        theme === "dark"
                          ? "text-gray-400 hover:text-white"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                  >
                    {item.name}
                  </Link>
                  {index < 2 && (
                    <span
                      className={
                        theme === "dark" ? "text-gray-700" : "text-gray-300"
                      }
                    >
                      |
                    </span>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Declaration */}
        <div
          className={`mt-8 pt-8 border-t ${
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
