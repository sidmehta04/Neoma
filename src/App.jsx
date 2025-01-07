// App.jsx
import React, { Suspense, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import useDevToolsPrevention from './hook/useDevToolsPrevention';

// Core components that are always needed
import Navbar from './components/layout/Navbar';
import Footer from './components/sections/Footer';
import WhatsAppContact from './components/ui/Whatsapp';
import ThemeToggle from './components/sections/ThemeToggle';

// Lazy load all routes
const lazyLoad = (importPath) => React.lazy(() => 
  importPath.catch(error => {
    console.error('Error loading module:', error);
    return { default: ErrorFallback };
  })
);

// Route components
const HeroSection = lazyLoad(import('./components/sections/Herosection'));
const AboutSection = lazyLoad(import('./components/sections/AboutUs'));
const SharesSection = lazyLoad(import('./components/sections/SharesSection'));

// Pages
const FAQ = lazyLoad(import('./pages/FAQ'));
const ShareDetail = lazyLoad(import('./pages/ShareDetail'));
const ContactPage = lazyLoad(import('./pages/ContactUs'));
const CalculatorLayout = lazyLoad(import('./pages/Calculator'));
const BlogPage = lazyLoad(import('./pages/Blogs/Blogs'));
const BlogPost = lazyLoad(import('./pages/Blogs/BlogPost'));

// Offering pages
const GetStarted = lazyLoad(import('./pages/Offerings/GetStarted'));
const MutualFunds = lazyLoad(import('./pages/Offerings/MutualFunds'));
const Equity = lazyLoad(import('./pages/Offerings/Equity'));
const PreIPO = lazyLoad(import('./pages/Offerings/Pre-ipo'));
const Portfolio_suggestions = lazyLoad(import('./pages/Offerings/Portfolio-Suggestions'));
const AlternativeInvestmentFunds = lazyLoad(import('./pages/Offerings/AlternativeInv'));
const Debt = lazyLoad(import('./pages/Offerings/Debt'));

// Components
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [location.pathname]);

  return null;
};

const LoadingFallback = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

const ErrorFallback = () => (
  <div className="flex flex-col items-center justify-center min-h-[60vh] p-4">
    <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
    <button
      onClick={() => window.location.href = '/'}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
    >
      Return to Home
    </button>
  </div>
);

class ErrorBoundary extends React.Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <ErrorFallback />;
    }
    return this.props.children;
  }
}

const Layout = ({ children }) => (
  <>
    <ScrollToTop />
    <Navbar />
    <main className="flex-grow">{children}</main>
    <WhatsAppContact />
    <Footer />
  </>
);

const HomePage = () => (
  <Layout>
    <Suspense fallback={<LoadingFallback />}>
      <HeroSection />
      <SharesSection />
      <AboutSection />
    </Suspense>
  </Layout>
);

// Route configurations
const routes = [
  { path: '/', element: <HomePage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/FAQ', element: <FAQ /> },
  { path: '/shares/:shareName', element: <ShareDetail /> },
  { path: '/get-started', element: <GetStarted /> },
  { path: '/mutual-funds', element: <MutualFunds /> },
  { path: '/alternative', element: <AlternativeInvestmentFunds /> },
  { path: '/equity', element: <Equity /> },
  { path: '/pre-ipo', element: <PreIPO /> },
  { path: '/portfolio', element: <Portfolio_suggestions /> },
  { path: '/debt', element: <Debt /> },
  { path: '/blog', element: <BlogPage /> },
  { path: '/blog/:slug', element: <BlogPost /> },
  { path: '/calculators', element: <CalculatorLayout /> },
  { path: '*', element: <Navigate to="/" replace /> }
];

const App = () => {
  useDevToolsPrevention();

  return (
    <ThemeProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
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
        </div>
      </Router>
    </ThemeProvider>
  );
};

export default App;