import React, { useState, useEffect, Suspense, lazy, memo } from "react";
import { useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { supabase } from "../lib/superbase";
import {
  TrendingUp,
  TrendingDown,
  PieChart,
  Info,
  Share2,
  Building,
  Users,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
} from "lucide-react";
import SearchBar from "../components/ui/Searchbar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { styles } from "../Styles/shareDetailStyles";
import { formatters } from "../Styles/shareDetailUtils";

// Lazy load the financials tab
const FinancialsTab = lazy(() => import("../components/ui/Financials"));

// Constants
const TABS = [
  { id: "overview", label: "Overview", icon: Info },
  { id: "management", label: "Management", icon: Users },
  { id: "financials", label: "Financials", icon: PieChart },
];

const SHARE_OPTIONS = [
  {
    id: "whatsapp",
    label: "Share to WhatsApp",
    href: (url, text) =>
      `https://wa.me/?text=${encodeURIComponent(`${text}\n${url}`)}`,
    icon: () => "https://wa.me/favicon.ico",
  },
  {
    id: "telegram",
    label: "Share to Telegram",
    href: (url, text) =>
      `https://t.me/share/url?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`,
    icon: () => "https://telegram.org/favicon.ico",
  },
];

const COMPANY_INFO_FIELDS = [
  { id: "cin", label: "CIN", className: "break-all" },
  { id: "registered_office", label: "Registered Office" },
  { id: "incorporation_date", label: "Incorporation Date" },
];

// Loading Skeleton Components
const LoadingSkeletonCard = memo(({ theme }) => (
  <div className="animate-pulse space-y-4">
    <div
      className={`h-10 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      } rounded w-3/4`}
    ></div>
    <div
      className={`h-8 ${
        theme === "light" ? "bg-gray-200" : "bg-gray-700"
      } rounded w-1/2`}
    ></div>
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className={`h-20 ${
            theme === "light" ? "bg-gray-200" : "bg-gray-700"
          } rounded`}
        ></div>
      ))}
    </div>
  </div>
));

// MetricCard Component
const MetricCard = memo(({ title, value, prefix = "₹", change, theme }) => (
  <div
    className={`${styles.metricCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg transition-all duration-300`}
  >
    <p
      className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
    >
      {title}
    </p>
    <div className="flex items-end justify-between">
      <p
        className={`text-base sm:text-lg lg:text-xl font-bold ${styles.text.primary[theme]}`}
      >
        {title === "Market Cap" ? value : `${prefix}${value}`}
      </p>
      {change !== undefined && (
        <div
          className={`flex items-center ${
            parseFloat(change) >= 0 ? "text-green-500" : "text-red-500"
          }`}
        >
          {parseFloat(change) >= 0 ? (
            <ArrowUpRight size={12} />
          ) : (
            <ArrowDownRight size={12} />
          )}
          <span className="text-xs sm:text-sm font-semibold">
            {formatters.formatPercentage(change)}
          </span>
        </div>
      )}
    </div>
  </div>
));

// Overview Tab Component
const OverviewTab = memo(({ companyData, theme }) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
    {/* Company Information Card */}
    <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
      <h2
        className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center ${styles.text.primary[theme]}`}
      >
        <Building
          className={`mr-2 w-4 sm:w-5 lg:w-6 ${
            theme === "light" ? "text-blue-600" : "text-white"
          }`}
        />
        Company Information
      </h2>
      <div className="space-y-3 sm:space-y-4">
        {COMPANY_INFO_FIELDS.map(({ id, label, className = "" }) => (
          <div key={id}>
            <p
              className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
            >
              {label}
            </p>
            <p
              className={`${styles.text.primary[theme]} text-xs sm:text-sm lg:text-base ${className}`}
            >
              {id === "incorporation_date"
                ? formatters.formatDate(companyData[id])
                : companyData[id]}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Shareholding Pattern Card */}
    <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
      <h2
        className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 flex items-center ${styles.text.primary[theme]}`}
      >
        <Users
          className={`mr-2 w-4 sm:w-5 lg:w-6 ${
            theme === "light" ? "text-blue-600" : "text-white"
          }`}
        />
        Shareholding Pattern
      </h2>
      <div className="space-y-2 sm:space-y-3 lg:space-y-4">
        {companyData.shareholding_pattern.map((item) => (
          <div key={item.id} className="flex justify-between items-center">
            <span
              className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
            >
              {item.category}
            </span>
            <span
              className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base font-medium`}
            >
              {formatters.formatPercentage(item.percentage)}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
));

// Management Tab Component
const ManagementTab = memo(({ companyData, theme }) => (
  <div className="space-y-4 sm:space-y-6 lg:space-y-8">
    {/* Board of Directors */}
    <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
      <h2
        className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 ${styles.text.primary[theme]}`}
      >
        Board of Directors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
        {companyData.board_members.map((member) => (
          <div
            key={member.id}
            className={`${styles.memberCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg`}
          >
            <p
              className={`${styles.text.primary[theme]} text-sm sm:text-base lg:text-lg font-medium`}
            >
              {member.name}
            </p>
            <p
              className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base mt-1`}
            >
              {member.position}
            </p>
            <p
              className={`${styles.text.tertiary[theme]} text-xs sm:text-sm mt-1`}
            >
              {member.category}
            </p>
          </div>
        ))}
      </div>
    </div>

    {/* Subsidiaries Section */}
    {companyData.company_subsidiaries.length > 0 && (
      <div className={`${styles.infoCard[theme]} rounded-xl p-3 sm:p-4 lg:p-6`}>
        <h2
          className={`text-base sm:text-lg lg:text-xl font-bold mb-3 sm:mb-4 lg:mb-6 ${styles.text.primary[theme]}`}
        >
          Subsidiaries & Associates
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
          {companyData.company_subsidiaries.map((subsidiary) => (
            <div
              key={subsidiary.id}
              className={`${styles.memberCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg`}
            >
              <p
                className={`${styles.text.primary[theme]} text-sm sm:text-base lg:text-lg font-medium`}
              >
                {subsidiary.name}
              </p>
              <p
                className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base mt-1`}
              >
                {subsidiary.relationship_type}
              </p>
              <p
                className={`${styles.text.tertiary[theme]} text-xs sm:text-sm mt-1`}
              >
                {formatters.formatPercentage(subsidiary.ownership_percentage)}{" "}
                Ownership
              </p>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
));

// Main ShareDetail Component
const ShareDetail = () => {
  const { theme } = useTheme();
  const { shareName } = useParams();
  const [activeTab, setActiveTab] = useState("overview");
  const [companyData, setCompanyData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const fetchCompanyData = async () => {
      if (!shareName) return;

      try {
        // Modified query to handle optional relationships
        const { data: companies, error: companyError } = await supabase
          .from("companies")
          .select(
            `
            id, name, symbol, sector, face_value,
            cin, registered_office, incorporation_date,
            board_members:board_members (id, name, position, category),
            company_subsidiaries:company_subsidiaries (id, name, relationship_type, ownership_percentage),
            shareholding_pattern:shareholding_pattern (id, category, shares, percentage, as_of_date),
            stock_prices:stock_prices (id, price, change_percentage, trade_date, volume, marketcap, pe_ratio, book_valur)
          `
          )
          .eq("name", decodeURIComponent(shareName))
          .order("id", { ascending: true });

        if (companyError) throw companyError;

        if (!companies || companies.length === 0) {
          throw new Error("Company not found");
        }

        const company = companies[0];

        // Sort related data
        company.stock_prices = (company.stock_prices || []).sort(
          (a, b) => new Date(b.trade_date) - new Date(a.trade_date)
        );

        company.shareholding_pattern = (
          company.shareholding_pattern || []
        ).sort((a, b) => new Date(b.as_of_date) - new Date(a.as_of_date));

        if (companyError) throw companyError;

        if (isMounted) {
          setCompanyData({
            ...company,
            latestPrice: company.stock_prices[0],
            latestShareholding: company.shareholding_pattern[0],
            market_cap: company.stock_prices[0]?.marketcap || "N/A",
          });
        }
      } catch (error) {
        console.error("Error fetching company data:", error);
        if (isMounted) setError(error.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    setLoading(true);
    fetchCompanyData();
    return () => {
      isMounted = false;
    };
  }, [shareName]);

  // Memoized values
  const metricCards = React.useMemo(
    () => [
      {
        id: "market_cap",
        title: "Market Cap",
        value: formatters.displayMarketCap(companyData?.market_cap),
      },
      {
        id: "face_value",
        title: "Face Value",
        value: formatters.formatNumber(companyData?.face_value),
      },
      {
        id: "book_value",
        title: "Book Value",
        value: formatters.formatNumber(companyData?.latestPrice?.book_valur),
      },
      {
        id: "pe_ratio",
        title: "P/E Ratio",
        value: formatters.formatNumber(companyData?.latestPrice?.pe_ratio),
        prefix: "",
      },
    ],
    [companyData]
  );

  if (loading) {
    return (
      <div className={`min-h-screen ${styles.container[theme]} p-4`}>
        <LoadingSkeletonCard />
      </div>
    );
  }

  if (error || !companyData) {
    return (
      <div
        className={`min-h-screen ${styles.container[theme]} flex items-center justify-center`}
      >
        <div className={`${styles.text.primary[theme]} text-center p-4`}>
          <h2 className="text-xl font-bold mb-2">Error Loading Data</h2>
          <p>{error || "Share not found"}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${styles.container[theme]} transition-colors duration-300`}
    >
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 sm:py-6 lg:py-8">
        {/* Company Header */}
        <div
          className={`${styles.card[theme]} rounded-xl p-3 sm:p-4 lg:p-6 mb-4 sm:mb-6 lg:mb-8`}
        >
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 sm:gap-4 lg:gap-6">
            {/* Company Logo and Info */}
            <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
              <div
                className={`w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 rounded-xl flex items-center justify-center 
                text-lg sm:text-xl lg:text-2xl font-bold ${styles.logo[theme]}`}
              >
                {companyData.symbol?.slice(0, 2)}
              </div>
              <div>
                <h1
                  className={`text-lg sm:text-xl lg:text-3xl font-bold ${styles.text.primary[theme]}`}
                >
                  {companyData.name}
                </h1>
                <p
                  className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
                >
                  {companyData.sector}
                </p>
              </div>
            </div>

            {/* Stock Price */}

            {/* Stock Price */}
            <div className="flex flex-col items-start sm:items-end">
              <p
                className={`text-xl sm:text-2xl lg:text-4xl font-bold ${styles.text.primary[theme]} blur-lg select-none`}
              >
                ₹{formatters.formatNumber(companyData.latestPrice?.price)}
              </p>
              <div
                className={`flex items-center space-x-1 sm:space-x-2 blur-sm select-none ${
                  companyData.latestPrice?.change_percentage >= 0
                    ? "text-green-500"
                    : "text-red-500"
                }`}
              >
                {companyData.latestPrice?.change_percentage >= 0 ? (
                  <TrendingUp size={16} className="sm:w-5 lg:w-6" />
                ) : (
                  <TrendingDown size={16} className="sm:w-5 lg:w-6" />
                )}
                <span className="text-sm sm:text-base lg:text-xl font-semibold">
                  {formatters.formatPercentage(
                    companyData.latestPrice?.change_percentage
                  )}
                </span>
              </div>
              <p className={`text-xs mt-1 ${styles.text.secondary[theme]}`}>
                *Price hidden for regulatory purpose please contact us directly for best price
              </p>
            </div>
          </div>

          {/* Metric Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 lg:mt-6">
            {metricCards.map((card) => (
              <MetricCard key={card.id} {...card} theme={theme} />
            ))}
          </div>

          {/* Trade Date Display */}
          <div
            className={`${styles.metricCard[theme]} p-2 sm:p-3 lg:p-4 rounded-lg mt-3 sm:mt-4 lg:mt-6`}
          >
            <div className="flex items-center space-x-2">
              <Calendar
                size={16}
                className={`sm:w-5 lg:w-6 ${
                  theme === "light" ? "text-blue-600" : "text-blue-400"
                }`}
              />
              <div className="flex flex-col">
                <span
                  className={`${styles.text.secondary[theme]} text-xs sm:text-sm lg:text-base`}
                >
                  Last Updated The Finances on 
                </span>
                <span
                  className={`${styles.text.primary[theme]} text-xs sm:text-sm lg:text-base font-medium`}
                >
                  {companyData.latestPrice?.trade_date
                    ? new Date(
                        companyData.latestPrice.trade_date
                      ).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })
                    : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {/* Search and Share Section */}
          <div
            className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between 
            gap-2 sm:gap-3 lg:gap-4 mt-3 sm:mt-4 lg:mt-6"
          >
            <div className="flex-1">
              <SearchBar
                className="w-full"
                placeholder="Search other companies..."
                theme={theme}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={`w-full sm:w-auto ${styles.shareButton[theme]} 
                px-3 sm:px-4 py-2 rounded-lg flex items-center justify-center sm:justify-start space-x-2`}
              >
                <Share2 size={16} className="sm:w-5 lg:w-6" />
                <span className="text-sm sm:text-base">Share</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {SHARE_OPTIONS.map((option) => {
                  const shareUrl = window.location.href;
                  const shareText = `Check out ${companyData.name}'s stock details`;
                  const href = option.href(shareUrl, shareText);

                  return (
                    <DropdownMenuItem key={option.id} asChild>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-2 text-sm sm:text-base"
                        onClick={(e) => {
                          e.preventDefault();
                          window.open(href, "_blank", "width=550,height=450");
                        }}
                      >
                        {option.label}
                      </a>
                    </DropdownMenuItem>
                  );
                })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex space-x-2 sm:space-x-3 lg:space-x-4 mb-4 sm:mb-6 lg:mb-8 overflow-x-auto scrollbar-hide pb-2">
          {TABS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center space-x-2 px-2 sm:px-3 lg:px-4 py-2 rounded-lg transition-colors 
                duration-300 whitespace-nowrap ${
                  activeTab === id
                    ? styles.tab.active[theme]
                    : styles.tab.inactive[theme]
                }`}
            >
              <Icon size={14} className="sm:w-4 lg:w-5" />
              <span className="text-xs sm:text-sm lg:text-base">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content with Error Boundary and Suspense */}
        <ErrorBoundary fallback={<ErrorFallback theme={theme} />}>
          <Suspense fallback={<LoadingSkeletonCard />}>
            <div className="space-y-3 sm:space-y-4 lg:space-y-6">
              {activeTab === "overview" && (
                <OverviewTab companyData={companyData} theme={theme} />
              )}
              {activeTab === "management" && (
                <ManagementTab companyData={companyData} theme={theme} />
              )}
              {activeTab === "financials" && (
                <div className={`${styles.infoCard[theme]} rounded-xl`}>
                  <FinancialsTab
                    companyId={companyData.id}
                    theme={theme}
                    styles={styles}
                  />
                </div>
              )}
            </div>
          </Suspense>
        </ErrorBoundary>
      </div>

      {/* Decorative Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div
          className={`absolute top-0 left-0 w-full h-full bg-gradient-to-b 
          ${
            theme === "light"
              ? "from-blue-50 to-white/0"
              : "from-[#0B0F17] to-black/0"
          } 
          opacity-60`}
        />
        <div
          className={`absolute top-20 sm:top-40 left-[5%] sm:left-[10%] w-32 sm:w-64 lg:w-96 h-32 sm:h-64 lg:h-96 
          rounded-full blur-3xl ${
            theme === "light" ? "bg-blue-200/20" : "bg-blue-900/10"
          } animate-pulse-slow`}
        />
        <div
          className={`absolute top-40 sm:top-60 right-[5%] sm:right-[10%] w-32 sm:w-64 lg:w-96 h-32 sm:h-64 lg:h-96 
          rounded-full blur-3xl ${
            theme === "light" ? "bg-blue-100/30" : "bg-blue-800/10"
          } animate-pulse-slow delay-1000`}
        />
      </div>
    </div>
  );
};

// Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }
    return this.props.children;
  }
}

// Error Fallback Component
const ErrorFallback = memo(({ theme }) => (
  <div className={`${styles.infoCard[theme]} rounded-xl p-4 text-center`}>
    <h2 className={`${styles.text.primary[theme]} text-lg font-bold mb-2`}>
      Something went wrong
    </h2>
    <p className={`${styles.text.secondary[theme]} text-sm`}>
      Please try refreshing the page
    </p>
  </div>
));

export default ShareDetail;
