// App.jsx
import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import useDevToolsPrevention from './hook/useDevToolsPrevention';
import { SpeedInsights } from "@vercel/speed-insights/react"
import { Analytics } from "@vercel/analytics/react"
import { Helmet } from 'react-helmet';
// Core components
import Navbar from './components/layout/Navbar';
import Footer from './components/sections/Footer';
import WhatsAppContact from './components/ui/Whatsapp';


// Error tracking function for production
const trackError = (error, errorInfo) => {
  if (process.env.NODE_ENV === 'production') {
    console.error('Production Error:', error, errorInfo);
  }
};

// Lazy load all routes with enhanced error handling
const lazyLoad = (importPath, componentName) => React.lazy(() => 
  importPath.catch(error => {
    trackError(error, { componentName });
    return { default: ErrorFallback };
  })
);

// Route components
const HeroSection = lazyLoad(import('./components/sections/Herosection'), 'HeroSection');
const AboutSection = lazyLoad(import('./components/sections/AboutUs'), 'AboutSection');
const SharesSection = lazyLoad(import('./components/sections/SharesSection'), 'SharesSection');

// Pages
const FAQ = lazyLoad(import('./pages/FAQ'), 'FAQ');
const ShareDetail = lazyLoad(import('./pages/ShareDetail'), 'ShareDetail');
const ContactPage = lazyLoad(import('./pages/ContactUs'), 'ContactPage');
const CalculatorLayout = lazyLoad(import('./pages/Calculator'), 'CalculatorLayout');
const BlogPage = lazyLoad(import('./pages/Blogs/Blogs'), 'BlogPage');
const BlogPost = lazyLoad(import('./pages/Blogs/BlogPost'), 'BlogPost');

// Offering pages
const GetStarted = lazyLoad(import('./pages/Offerings/GetStarted'), 'GetStarted');
const MutualFunds = lazyLoad(import('./pages/Offerings/MutualFunds'), 'MutualFunds');
const Equity = lazyLoad(import('./pages/Offerings/Equity'), 'Equity');
const PreIPO = lazyLoad(import('./pages/Offerings/Pre-ipo'), 'PreIPO');
const Portfolio_suggestions = lazyLoad(import('./pages/Offerings/Portfolio-Suggestions'), 'Portfolio_suggestions');
const AlternativeInvestmentFunds = lazyLoad(import('./pages/Offerings/AlternativeInv'), 'AlternativeInvestmentFunds');
const Debt = lazyLoad(import('./pages/Offerings/Debt'), 'Debt');

// Enhanced ScrollToTop with smooth scrolling and scroll position restoration
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    // Save scroll position for current location
    const saveScrollPosition = () => {
      sessionStorage.setItem(
        `scrollPosition-${window.location.pathname}`,
        window.scrollY.toString()
      );
    };

    // Restore scroll position or scroll to top
    const restoreScrollPosition = () => {
      const savedPosition = sessionStorage.getItem(`scrollPosition-${location.pathname}`);
      if (savedPosition) {
        window.scrollTo({
          top: parseInt(savedPosition),
          behavior: 'instant'
        });
        sessionStorage.removeItem(`scrollPosition-${location.pathname}`);
      } else {
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
      }
    };

    window.addEventListener('beforeunload', saveScrollPosition);
    restoreScrollPosition();

    return () => {
      window.removeEventListener('beforeunload', saveScrollPosition);
    };
  }, [location.pathname]);

  return null;
};

// Enhanced loading fallback with fade-in animation
const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh] animate-fadeIn">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500">
      <span className="sr-only">Loading...</span>
    </div>
  </div>
);

// Enhanced error fallback with retry functionality
const ErrorFallback = ({ error, resetErrorBoundary }) => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 animate-fadeIn">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <p className="text-gray-600 mb-4">We're sorry for the inconvenience</p>
    <div className="flex gap-4">
      <button
        onClick={() => window.location.href = '/'}
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

// Enhanced error boundary with retry functionality and error tracking
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

// Enhanced Layout with error boundary per section
const Layout = ({ children }) => (
  <>
    <ScrollToTop />
    <ErrorBoundary>
      <Navbar />
    </ErrorBoundary>
    <main className="flex-grow">
      <ErrorBoundary>
        {children}
      </ErrorBoundary>
    </main>
    <WhatsAppContact />
    <ErrorBoundary>
      <Footer />
    </ErrorBoundary>
  </>
);

// Enhanced HomePage with individual error boundaries
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
        <AboutSection />
      </ErrorBoundary>
    </Suspense>
  </Layout>
);
const MetaManager = () => {
  const location = useLocation();
  
  useEffect(() => {
    const currentRoute = routes.find(route => 
      route.path === location.pathname || 
      (route.path.includes(':') && location.pathname.startsWith(route.path.split(':')[0]))
    );
    
    if (currentRoute) {
      document.title = `${currentRoute.title} | Neoma Capital`;
    }
  }, [location]);

  const currentRoute = routes.find(route => 
    route.path === location.pathname || 
    (route.path.includes(':') && location.pathname.startsWith(route.path.split(':')[0]))
  ) || routes[0]; // Fallback to home route if not found

  return (
    <Helmet>
      <title>{`${currentRoute.title} | Neoma Capital`}</title>
      <meta name="description" content={currentRoute.description} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={`${currentRoute.title} | Neoma Capital`} />
      <meta property="og:description" content={currentRoute.description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`https://neomacapital.com${location.pathname}`} />
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={`${currentRoute.title} | Neoma Capital`} />
      <meta name="twitter:description" content={currentRoute.description} />
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="keywords" content="Neoma Capital, investments, mutual funds, equity, pre-IPO, portfolio management, financial services" />
      <link rel="canonical" href={`https://neomacapital.com${location.pathname}`} />
      
      {/* Schema.org JSON-LD */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Neoma Capital",
          "url": "https://neomacapital.com",
          "description": "Your trusted partner for comprehensive investment solutions",
          "address": {
            "@type": "PostalAddress",
            "addressCountry": "IN"
          }
        })}
      </script>
    </Helmet>
  );
};
// Enhanced route configurations with metadata
const routes = [
  { 
    path: '/', 
    element: <HomePage />, 
    title: 'Neoma Capital',
    description: 'Your trusted partner for comprehensive investment solutions. Explore our range of financial services including mutual funds, equity, and more.'
  },
  { 
    path: '/contact', 
    element: <ContactPage />, 
    title: 'Contact Us',
    description: 'Get in touch with our investment experts. We are here to answer your questions and help you achieve your financial goals.'
  },
  { 
    path: '/FAQ', 
    element: <FAQ />, 
    title: 'FAQ',
    description: 'Find answers to commonly asked questions about our investment services, processes, and financial solutions.'
  },
  { 
    path: '/shares/:shareName', 
    element: <ShareDetail />, 
    title: 'Share Details',
    description: 'Detailed analysis and information about investment opportunities in our carefully selected shares.'
  },
  { 
    path: '/get-started', 
    element: <GetStarted />, 
    title: 'Get Started',
    description: 'Begin your investment journey with us. Learn about our onboarding process and investment options.'
  },
  { 
    path: '/mutual-funds', 
    element: <MutualFunds />, 
    title: 'Mutual Funds',
    description: 'Explore our selection of mutual funds. Discover professionally managed investment options for diverse portfolio needs.'
  },
  { 
    path: '/alternative', 
    element: <AlternativeInvestmentFunds />, 
    title: 'Alternative Investments',
    description: 'Discover alternative investment opportunities beyond traditional assets. Explore innovative ways to diversify your portfolio.'
  },
  { 
    path: '/equity', 
    element: <Equity />, 
    title: 'Equity',
    description: 'Invest in equity markets with our expert guidance. Explore stock market opportunities and equity investment strategies.'
  },
  { 
    path: '/pre-ipo', 
    element: <PreIPO />, 
    title: 'Pre-IPO',
    description: 'Access exclusive pre-IPO investment opportunities. Invest in promising companies before they go public.'
  },
  { 
    path: '/portfolio', 
    element: <Portfolio_suggestions />, 
    title: 'Portfolio Suggestions',
    description: 'Get personalized portfolio recommendations based on your investment goals and risk tolerance.'
  },
  { 
    path: '/debt', 
    element: <Debt />, 
    title: 'Debt',
    description: 'Explore debt investment options for stable returns. Discover fixed-income securities and debt market opportunities.'
  },
  { 
    path: '/blog', 
    element: <BlogPage />, 
    title: 'Blog',
    description: 'Stay informed with our latest insights on investment strategies, market analysis, and financial planning tips.'
  },
  { 
    path: '/blog/:slug', 
    element: <BlogPost />, 
    title: 'Blog Post',
    description: 'Read detailed articles about investment strategies, market insights, and financial planning advice.'
  },
  { 
    path: '/calculators', 
    element: <CalculatorLayout />, 
    title: 'Calculators',
    description: 'Use our financial calculators to plan your investments, estimate returns, and make informed financial decisions.'
  },
  { 
    path: '*', 
    element: <Navigate to="/" replace />, 
    title: '404',
    description: 'Page not found. Return to our homepage to explore our investment services.'
  }
];


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
                    path === '/' ? element : (
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


// Main App component now just provides Router context
const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;