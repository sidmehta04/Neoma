// App.jsx
import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import useDevToolsPrevention from './hook/useDevToolsPrevention';

// Core components that are always needed
import Navbar from './components/layout/Navbar';
import Footer from './components/sections/Footer';
import WhatsAppContact from './components/ui/Whatsapp';


// Error tracking function for production
const trackError = (error, errorInfo) => {
  if (process.env.NODE_ENV === 'production') {
    // Implement your error tracking service here
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

// Route configurations with metadata
const routes = [
  { path: '/', element: <HomePage />, title: 'Home' },
  { path: '/contact', element: <ContactPage />, title: 'Contact Us' },
  { path: '/FAQ', element: <FAQ />, title: 'FAQ' },
  { path: '/shares/:shareName', element: <ShareDetail />, title: 'Share Details' },
  { path: '/get-started', element: <GetStarted />, title: 'Get Started' },
  { path: '/mutual-funds', element: <MutualFunds />, title: 'Mutual Funds' },
  { path: '/alternative', element: <AlternativeInvestmentFunds />, title: 'Alternative Investments' },
  { path: '/equity', element: <Equity />, title: 'Equity' },
  { path: '/pre-ipo', element: <PreIPO />, title: 'Pre-IPO' },
  { path: '/portfolio', element: <Portfolio_suggestions />, title: 'Portfolio Suggestions' },
  { path: '/debt', element: <Debt />, title: 'Debt' },
  { path: '/blog', element: <BlogPage />, title: 'Blog' },
  { path: '/blog/:slug', element: <BlogPost />, title: 'Blog Post' },
  { path: '/calculators', element: <CalculatorLayout />, title: 'Calculators' },
  { path: '*', element: <Navigate to="/" replace />, title: '404' }
];

const AppContent = () => {
  useDevToolsPrevention();
  const location = useLocation();

  useEffect(() => {
    const currentRoute = routes.find(route => 
      route.path === location.pathname || 
      (route.path.includes(':') && location.pathname.startsWith(route.path.split(':')[0]))
    );
    if (currentRoute) {
      document.title = `${currentRoute.title} | Your Site Name`;
    }
  }, [location]);

  return (
    <ThemeProvider>
      <div className="flex flex-col min-h-screen">
        <ErrorBoundary>
          <Suspense fallback={<LoadingFallback />}>
            <Routes>
              {routes.map(({ path, element, title }) => (
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