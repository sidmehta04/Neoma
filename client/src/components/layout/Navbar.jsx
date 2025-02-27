import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Menu,
  X,
  Settings,
  BookOpen,
  BarChart3,
  CircleDollarSign,
  Calculator,
  HelpCircle,
  FileText,
  Building2,
  LineChart,
  Rocket,
  Boxes,
  Feather,
  DollarSignIcon,
  SearchCheck,
  Newspaper,
  HandshakeIcon
} from "lucide-react";
import { useTheme } from "../../context/ThemeContext";
import neomalogo from "../../assets/neomalogo2.svg";

const Navbar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRefs = useRef({});
  const navigate = useNavigate();
  const { theme } = useTheme();

  const offerings = [
    {
      name: "Unlisted Shares",
      path: "/get-started",
      desc: "Invest in high-potential private company shares",
      icon: BarChart3,
    },
    {
      name: "Mutual Funds",
      path: "/mutual-funds",
      desc: "Expertly managed diversified investment portfolios",
      icon: DollarSignIcon,
    },
    {
      name: "Bonds",
      path: "/debt",
      desc: "Stable fixed-income investment opportunities",
      icon: SearchCheck,
    },
    {
      name: "Private Boutique",
      path: "/equity",
      desc: "Exclusive high-value investment options",
      icon: BookOpen,
    },
    {
      name: "Angel Investment",
      path: "/pre-ipo",
      desc: "Early-stage investment in promising startups",
      icon: Feather,
    },
    {
      name: "Alternative Investment",
      path: "/alternative",
      desc: "Non-traditional investment opportunities",
      icon: Settings,
    },
  ];

  const resources = [
    {
      name: "Calculators",
      path: "/calculators",
      desc: "Tools to plan your financial future",
      icon: Calculator,
    },
    {
      name: "Blog",
      path: "/blog",
      desc: "Latest insights and market analysis",
      icon: FileText,
    },
    {
      name: "FAQs",
      path: "/FAQ",
      desc: "Common questions answered",
      icon: HelpCircle,
    },
  ];

  const partnerSection = {
    name: "Partner With Us",
    path: "/partner",
    desc: "Explore collaboration opportunities",
    icon: HandshakeIcon,
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (activeDropdown) {
        const dropdownElement = dropdownRefs.current[activeDropdown];
        if (dropdownElement && !dropdownElement.contains(event.target)) {
          setActiveDropdown(null);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [activeDropdown]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDropdownClick = (dropdownName) => {
    setActiveDropdown(activeDropdown === dropdownName ? null : dropdownName);
  };

  const handleItemClick = (path) => {
    setActiveDropdown(null);
    setIsMobileMenuOpen(false);
    if (path.startsWith("/")) {
      navigate(path);
    }
  };

  const renderDropdownButton = (dropdownName) => {
    const isActive = activeDropdown === dropdownName;
    return (
      <button
        onClick={() => handleDropdownClick(dropdownName)}
        className={`flex items-center space-x-4.5 text-xl font-medium py-2 px-4 
          rounded-lg transition-all duration-200 select-none group
          ${theme === "dark"
            ? "text-gray-300 hover:text-white hover:bg-gray-800"
            : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"}`}
      >
        <span className="transform transition-all duration-200 group-hover:translate-x-0.5">
          {dropdownName}
        </span>
        <ChevronDown
          className={`w-4 h-4 transition-transform duration-200 
            ${isActive ? "rotate-180" : ""}`}
        />
      </button>
    );
  };

  const renderDropdownContent = (items, dropdownName) => {
    if (activeDropdown !== dropdownName) return null;
    const midPoint = Math.ceil(items.length / 2);
    const firstColumn = items.slice(0, midPoint);
    const secondColumn = items.slice(midPoint);

    return (
      <div className={`absolute top-full left-1/2 -translate-x-1/2 w-[600px] pt-4 z-50`}>
        <div className={`rounded-xl shadow-lg overflow-hidden
          ${theme === "dark"
            ? "bg-gray-800/95 backdrop-blur-sm border border-gray-700"
            : "bg-white/95 backdrop-blur-sm border border-gray-200"}`}>
          <div className="p-4">
            <h3 className={`text-sm font-semibold mb-4 px-2
              ${theme === "dark" ? "text-gray-300" : "text-blue-600"}`}>
              {dropdownName === "Offerings" ? "Investment Options" : "Helpful Resources"}
            </h3>
            <div className="flex gap-6">
              {[firstColumn, secondColumn].map((column, columnIndex) => (
                <div key={columnIndex} className="flex-1 space-y-2">
                  {column.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleItemClick(item.path)}
                      className={`block w-full text-left px-3 py-3 rounded-lg
                        transition-all duration-200 group
                        ${theme === "dark"
                          ? "hover:bg-gray-700/70"
                          : "hover:bg-blue-50/70"}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`mt-1 p-1.5 rounded-lg
                          ${theme === "dark"
                            ? "bg-gray-700 text-blue-400 group-hover:bg-gray-600"
                            : "bg-blue-100 text-blue-600 group-hover:bg-blue-200"}`}>
                          <item.icon className="w-4 h-4" />
                        </div>
                        <div>
                          <div className={`font-medium text-base
                            ${theme === "dark"
                              ? "text-gray-200 group-hover:text-white"
                              : "text-blue-600 group-hover:text-blue-700"}`}>
                            {item.name}
                          </div>
                          <div className={`text-sm mt-0.5 leading-relaxed
                            ${theme === "dark"
                              ? "text-gray-400 group-hover:text-gray-300"
                              : "text-gray-500 group-hover:text-blue-600"}`}>
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const renderDropdown = (name, items) => (
    <div className="relative" ref={(el) => (dropdownRefs.current[name] = el)}>
      {renderDropdownButton(name)}
      {renderDropdownContent(items, name)}
    </div>
  );

  const MobileMenu = () => (
    <div
      className={`md:hidden fixed inset-0 bg-black bg-opacity-50 z-50 
        transition-opacity duration-300
        ${isMobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      onClick={() => setIsMobileMenuOpen(false)}
    >
      <div
        className={`fixed inset-y-0 right-0 max-w-s w-full shadow-xl 
          overflow-y-auto transform transition-transform duration-300 
          ease-in-out ${theme === "dark" ? "bg-gray-900" : "bg-white"}
          ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <span className={`text-lg font-semibold ${
            theme === "dark" ? "text-gray-100" : "text-blue-600"}`}>
            Menu
          </span>
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
        <div className="px-4 py-6 space-y-6">
          {[
            { title: "Offerings", items: offerings },
            { title: "Resources", items: resources },
          ].map(({ title, items }) => (
            <div key={title} className="space-y-1">
              <div className={`px-2 text-sm font-medium uppercase tracking-wider
                ${theme === "dark" ? "text-gray-400" : "text-blue-600"}`}>
                {title}
              </div>
              <div className="space-y-1">
                {items.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => handleItemClick(item.path)}
                    className={`block w-full text-left px-3 py-3 rounded-lg
                      transition-colors duration-150 group
                      ${theme === "dark"
                        ? "hover:bg-gray-800"
                        : "hover:bg-blue-50"}`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`mt-1 p-1.5 rounded-lg
                        ${theme === "dark"
                          ? "bg-gray-700 text-blue-400"
                          : "bg-blue-100 text-blue-600"}`}>
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <div className={`font-medium ${
                          theme === "dark"
                            ? "text-gray-200"
                            : "text-blue-600"}`}>
                          {item.name}
                        </div>
                        <div className={`text-sm mt-0.5 ${
                          theme === "dark"
                            ? "text-gray-400"
                            : "text-gray-500"}`}>
                          {item.desc}
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="space-y-1">
            <div className={`px-2 text-sm font-medium uppercase tracking-wider
              ${theme === "dark" ? "text-gray-400" : "text-blue-600"}`}>
              Actions
            </div>
            <div className="space-y-1">
              <Link
                to={partnerSection.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg
                  transition-colors duration-150
                  ${theme === "dark"
                    ? "text-gray-200 hover:bg-gray-800"
                    : "text-blue-600 hover:bg-blue-50"}`}
              >
                <div className={`p-1.5 rounded-lg
                  ${theme === "dark"
                    ? "bg-gray-700 text-blue-400"
                    : "bg-blue-100 text-blue-600"}`}>
                  <partnerSection.icon className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">{partnerSection.name}</div>
                  <div className={`text-sm mt-0.5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    {partnerSection.desc}
                  </div>
                </div>
              </Link>

              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center space-x-3 px-3 py-3 rounded-lg
                  transition-colors duration-150
                  ${theme === "dark"
                    ? "text-gray-200 hover:bg-gray-800"
                    : "text-blue-600 hover:bg-blue-50"}`}
              >
                <div className={`p-1.5 rounded-lg
                  ${theme === "dark"
                    ? "bg-gray-700 text-blue-400"
                    : "bg-blue-100 text-blue-600"}`}>
                  <Settings className="w-4 h-4" />
                </div>
                <div>
                  <div className="font-medium">Contact Us</div>
                  <div className={`text-sm mt-0.5 ${
                    theme === "dark" ? "text-gray-400" : "text-gray-500"}`}>
                    Get in touch with our team
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`sticky top-0 w-full px-8 py-3 flex justify-between 
      items-center z-40 transition-colors duration-300 border-b
      ${theme === "dark"
        ? "bg-[#0B0F17] border-gray-800"
        : "bg-white border-gray-100"}`}>
      <Link
        to="/"
        className="flex items-center hover:opacity-80 transition-opacity h-12 overflow-hidden md:ml-0 -ml-24"
        onClick={() => setActiveDropdown(null)}
      >
        <img
          src={neomalogo}
          alt="Neoma Capital"
          className="block h-36 w-64 object-contain md:scale-95 scale-75"
          style={{
            filter: theme === 'dark' ? 'invert(1)' : 'brightness(2.2) contrast(1.2)'
          }}
        />
      </Link>
      <div className="hidden md:flex flex-1 justify-center items-center mr-20">
        <div className="flex items-center space-x-24">
          {renderDropdown("Offerings", offerings)}
          {renderDropdown("Resources", resources)}
          <Link
            to={partnerSection.path}
            className={`text-xl font-medium py-2 px-4 rounded-lg 
              transition-all duration-200
              ${theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"}`}
          >
            {partnerSection.name}
          </Link>
          <Link
            to="/contact"
            className={`text-xl font-medium py-2 px-4 rounded-lg 
              transition-all duration-200
              ${theme === "dark"
                ? "text-gray-300 hover:text-white hover:bg-gray-800"
                : "text-blue-600 hover:text-blue-700 hover:bg-blue-50"}`}
          >
            Contact Us
          </Link>
        </div>
      </div>
      <button
        className="md:hidden p-2 rounded-lg text-gray-500 hover:text-gray-700 
          dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 
          dark:hover:bg-gray-800 transition-colors"
        onClick={() => setIsMobileMenuOpen(true)}
      >
        <Menu className="w-6 h-6" />
      </button>
      <MobileMenu />
    </nav>
  );
};

export default Navbar;