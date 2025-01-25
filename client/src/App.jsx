import React, { Suspense, useEffect } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { ThemeProvider } from "./context/ThemeContext";
import useDevToolsPrevention from "./hook/useDevToolsPrevention";
import { Analytics } from "@vercel/analytics/react";
import { Helmet } from "react-helmet";
import { SpeedInsights } from "@vercel/speed-insights/react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/sections/Footer";
import WhatsAppContact from "./components/ui/Whatsapp";

// Import visitor tracking hook
import useVisitorTracking from "./hook/tracking";

// Error tracking function for production with enhanced logging
const trackError = (error, errorInfo) => {
  if (import.meta.env.MODE === "production") {
    console.error("Production Error:", error, errorInfo);
    // You could add additional error tracking services here
    try {
      const apiUrl = import.meta.env.VITE_API_URL || "/api";
      fetch(`${apiUrl}/track-error`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          error: error.message,
          errorInfo,
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (e) {
      console.error("Error tracking failed:", e);
    }
  }
};

// Lazy load all routes with enhanced error handling
const lazyLoad = (importPath, componentName) =>
  React.lazy(() =>
    importPath.catch((error) => {
      trackError(error, { componentName });
      return { default: ErrorFallback };
    })
  );

// Route components (same as before)
const HeroSection = lazyLoad(
  import("./components/sections/Herosection"),
  "HeroSection"
);
const AboutSection = lazyLoad(
  import("./components/sections/AboutUs"),
  "AboutSection"
);
const SharesSection = lazyLoad(
  import("./components/sections/SharesSection"),
  "SharesSection"
);
const StepCard = lazyLoad(import("./components/sections/Steps"), "StepCard");

// Pages (same as before)
const FAQ = lazyLoad(import("./pages/FAQ"), "FAQ");
const ShareDetail = lazyLoad(import("./pages/ShareDetail"), "ShareDetail");
const ContactPage = lazyLoad(import("./pages/ContactUs"), "ContactPage");
const PartnerWithUs = lazyLoad(import("./pages/Partner"), "PartnerWithUs");

const CalculatorLayout = lazyLoad(
  import("./pages/Calculator"),
  "CalculatorLayout"
);
const BlogPage = lazyLoad(import("./pages/Blogs/Blogs"), "BlogPage");
const BlogPost = lazyLoad(import("./pages/Blogs/BlogPost"), "BlogPost");
// Offering pages (same as before)
const GetStarted = lazyLoad(
  import("./pages/Offerings/GetStarted"),
  "GetStarted"
);
const MutualFunds = lazyLoad(
  import("./pages/Offerings/MutualFunds"),
  "MutualFunds"
);
const Equity = lazyLoad(import("./pages/Offerings/Equity"), "Equity");
const PreIPO = lazyLoad(import("./pages/Offerings/Pre-ipo"), "PreIPO");
const Portfolio_suggestions = lazyLoad(
  import("./pages/Offerings/Portfolio-Suggestions"),
  "Portfolio_suggestions"
);
const AlternativeInvestmentFunds = lazyLoad(
  import("./pages/Offerings/AlternativeInv"),
  "AlternativeInvestmentFunds"
);
const Debt = lazyLoad(import("./pages/Offerings/Debt"), "Debt");

// Enhanced ScrollToTop with analytics integration
const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `scrollPosition-${window.location.pathname}`,
        window.scrollY.toString()
      );
    };

    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(
        `scrollPosition-${location.pathname}`
      );
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition),
          behavior: "instant",
        });
        sessionStorage.removeItem(`scrollPosition-${location.pathname}`);
      } else {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    restoreScrollPosition();

    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, [location.pathname]);

  // Integrate visitor tracking
  useVisitorTracking();

  return null;
};

// Enhanced LoadingFallback with theme support
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] animate-fadeIn">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// Enhanced ErrorFallback with analytics tracking
const ErrorFallback = ({ error, resetErrorBoundary }) => {
  useEffect(() => {
    trackError(error, { component: "ErrorFallback" });
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
      <p className="text-gray-600 mb-4">We're sorry for the inconvenience</p>
      <div className="flex gap-4">
        <button
          onClick={() => (window.location.href = "/")}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Return Home
        </button>
        {resetErrorBoundary && (
          <button
            onClick={resetErrorBoundary}
            className="px-4 py-2 border border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
          >
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

// Enhanced ErrorBoundary with analytics
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    trackError(error, errorInfo);
  }

  resetErrorBoundary = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback
          error={this.state.error}
          resetErrorBoundary={this.resetErrorBoundary}
        />
      );
    }
    return this.props.children;
  }
}

// Enhanced Layout with analytics integration
const Layout = ({ children }) => (
  <>
    <ScrollToTop />
    <ErrorBoundary>
      <Navbar />
    </ErrorBoundary>
    <main className="flex-grow">
      <ErrorBoundary>{children}</ErrorBoundary>
    </main>
    <WhatsAppContact />
    <ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  </>
);

// Enhanced HomePage with analytics
const HomePage = () => (
  <Layout>
    <Suspense fallback={<LoadingFallback />}>
    <ErrorBoundary>
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <SharesSection />
      </ErrorBoundary>
      <ErrorBoundary>
        <StepCard />
      </ErrorBoundary>

  

      <ErrorBoundary>
        <AboutSection />
      </ErrorBoundary>
    </Suspense>
  </Layout>
);

// Enhanced MetaManager with analytics data
// Enhanced MetaManager with Vite environment variables
const MetaManager = () => {
  const location = useLocation();
  const currentRoute =
    routes.find(
      (route) =>
        route.path === location.pathname ||
        (route.path.includes(":") &&
          location.pathname.startsWith(route.path.split(":")[0]))
    ) || routes[0];

  // Use Vite's import.meta.env instead of process.env
  const baseUrl =
    import.meta.env.VITE_BASE_URL || "https://www.neomacapital.com";
  const currentUrl = `${baseUrl}${location.pathname}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{currentRoute.title}</title>
      <meta name="description" content={currentRoute.description} />
      <meta name="keywords" content={currentRoute.keywords} />
      <link rel="canonical" href={currentUrl} />

      {/* OpenGraph Meta Tags */}
      <meta property="og:site_name" content="Neoma Capital" />
      <meta property="og:title" content={currentRoute.title} />
      <meta property="og:description" content={currentRoute.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={currentUrl} />

      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={currentRoute.title} />
      <meta name="twitter:description" content={currentRoute.description} />

      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="author" content="Neoma Capital" />

      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          ...(currentRoute.schema || {
            "@type": "WebPage",
            name: currentRoute.title,
            description: currentRoute.description,
            url: currentUrl,
            publisher: {
              "@type": "Organization",
              name: "Neoma Capital",
              url: baseUrl,
            },
          }),
        })}
      </script>
    </Helmet>
  );
};
const routes = [
  {
    path: "/",
    element: <HomePage />,
    title: "Neoma Capital ",
    description:
      "Discover expert investment solutions with Neoma Capital. We offer comprehensive financial services including mutual funds, equity, pre-IPO investments, and personalized portfolio management.",
    keywords:
      "investment management, mutual funds, equity investment, portfolio management, Neoma Capital, financial services India",
    schema: {
      "@type": "Organization",
      name: "Neoma Capital",
      description:
        "Leading investment management firm offering comprehensive financial solutions",
      url: "https://www.neomacapital.com/",
      sameAs: ["https://www.linkedin.com/company/neomacapital"],
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://www.neomacapital.com/",
      },
    },
  },
  {
    path: "/contact",
    element: <ContactPage />,
    title: "Contact Neoma Capital - Investment Consultation",
    description:
      "Connect with Neoma Capital's investment experts for personalized financial guidance. Schedule a consultation to discuss your investment goals and portfolio strategy.",
    keywords:
      "contact Neoma Capital, investment consultation, financial advice, portfolio review, investment expert consultation",
  },
  {
    path: "/FAQ",
    element: <FAQ />,
    title: "Investment FAQ - Neoma Capital",
    description:
      "Find answers to frequently asked questions about investing with Neoma Capital. Learn about our investment processes, services, and how we can help you achieve your financial goals.",
    keywords:
      "investment FAQ, financial services FAQ, Neoma Capital FAQ, investment questions, financial planning help",
  },
  {
    path: "/shares/:shareName",
    element: <ShareDetail />,
    title: "Investment Opportunities | Neoma Capital",
    description:
      "Explore detailed analysis of investment opportunities at Neoma Capital. Get comprehensive insights into share performance, market trends, and investment potential.",
    keywords:
      "share investment, stock analysis, market opportunities, investment analysis, share market insights",
  },
  {
    path: "/get-started",
    element: <GetStarted />,
    title: "Start Investing with Neoma Capital",
    description:
      "Begin your investment journey with Neoma Capital. Learn about our onboarding process, investment options, and how we can help you build a strong financial future.",
    keywords:
      "start investing, investment onboarding, new investor, investment basics, financial planning start",
  },
  {
    path: "/mutual-funds",
    element: <MutualFunds />,
    title: "Mutual Fund Investments | Neoma Capital",
    description:
      "Explore our curated selection of mutual funds. Get expert guidance on fund selection, portfolio diversification, and systematic investment plans (SIP) for long-term wealth creation.",
    keywords:
      "mutual funds, SIP investment, fund management, portfolio diversification, mutual fund schemes",
  },
  {
    path: "/partner",
    element: <PartnerWithUs />,
    title: "Partner With Us | Neoma Capital",
    description: "Join forces with Neoma Capital to create mutual value and drive innovation in investment services. Explore partnership opportunities and collaboration models.",
    keywords: "business partnership, investment partnership, channel partner, corporate alliance, strategic partnership, Neoma Capital partner",
    schema: {
      "@type": "Service",
      name: "Partnership Program",
      provider: {
        "@type": "Organization",
        name: "Neoma Capital"
      },
      description: "Partnership and collaboration opportunities with Neoma Capital",
      serviceType: "Business Partnership",
      url: "https://www.neomacapital.com/partner"
    }
  },
  {
    path: "/alternative",
    element: <AlternativeInvestmentFunds />,
    title: "Alternative Investments | Neoma Capital",
    description:
      "Discover alternative investment opportunities with Neoma Capital. Explore innovative investment options beyond traditional assets for portfolio diversification.",
    keywords:
      "alternative investments, portfolio diversification, non-traditional investments, alternative assets, investment options",
  },
  {
    path: "/equity",
    element: <Equity />,
    title: "Equity Investment Solutions | Neoma Capital",
    description:
      "Maximize your equity investments with expert guidance from Neoma Capital. Get comprehensive stock market insights and personalized equity investment strategies.",
    keywords:
      "equity investment, stock market, share market, equity trading, stock investment",
  },
  {
    path: "/pre-ipo",
    element: <PreIPO />,
    title: "Pre-IPO Investment Opportunities | Neoma Capital",
    description:
      "Access exclusive pre-IPO investment opportunities with Neoma Capital. Invest in promising companies before they go public and maximize your potential returns.",
    keywords:
      "pre-IPO investment, IPO opportunities, unlisted shares, pre-public offering, early investment",
  },
  {
    path: "/portfolio",
    element: <Portfolio_suggestions />,
    title: "Portfolio Management & Suggestions | Neoma Capital",
    description:
      "Get expert portfolio management suggestions from Neoma Capital. Receive personalized investment recommendations based on your goals and risk profile.",
    keywords:
      "portfolio management, investment suggestions, portfolio optimization, investment recommendations, wealth management",
  },
  {
    path: "/debt",
    element: <Debt />,
    title: "Debt Investment Solutions | Neoma Capital",
    description:
      "Explore secure debt investment options with Neoma Capital. Discover fixed-income securities and debt market opportunities for stable returns.",
    keywords:
      "debt investment, fixed income, bonds, debt securities, debt market",
  },
  {
    path: "/blog",
    element: <BlogPage />,
    title: "Investment Insights & Market Analysis | Neoma Capital Blog",
    description:
      "Stay informed with Neoma Capital's latest insights on investment strategies, market analysis, and financial planning. Read expert views on market trends.",
    keywords:
      "investment blog, market analysis, financial insights, investment strategy, market trends",
  },
  {
    path: "/blog/:slug",
    element: <BlogPost />,
    title: "Investment Insights | Neoma Capital Blog",
    description:
      "Deep dive into investment strategies, market analysis, and financial planning advice from Neoma Capital's expert team.",
    keywords:
      "investment analysis, market insights, financial planning, investment strategy, expert advice",
  },
  {
    path: "/calculators",
    element: <CalculatorLayout />,
    title: "Financial Calculators | Neoma Capital",
    description:
      "Use Neoma Capital's financial calculators to plan your investments, estimate returns, and make informed financial decisions for your future.",
    keywords:
      "financial calculator, investment calculator, returns calculator, SIP calculator, wealth planning tools",
  },

  {
    path: "*",
    element: <Navigate to="/" replace />,
    title: "Page Not Found | Neoma Capital",
    description:
      "The page you are looking for cannot be found. Return to Neoma Capital's homepage to explore our investment services and financial solutions.",
    keywords: "404, page not found, Neoma Capital, investment services",
  },
];

// Enhanced AppContent with analytics integration
const AppContent = () => {
  useDevToolsPrevention();

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <MetaManager />
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {routes.map(({ path, element }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    path === "/" ? (
                      element
                    ) : (
                      <Layout>
                        <Suspense fallback={<LoadingFallback />}>
                          {element}
                        </Suspense>
                      </Layout>
                    )
                  }
                />
              ))}
            </Routes>
          </Suspense>
        </ErrorBoundary>
        <SpeedInsights />
        <Analytics />
      </div>
    </ThemeProvider>
  );
};

// Main App component
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
