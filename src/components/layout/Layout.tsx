import { ReactNode, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';
import { ErrorBoundary } from '../common';
import { errorLoggingService } from '../../lib/errorLogging';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    // Initialize from localStorage with default of false (expanded)
    const saved = localStorage.getItem('sidebar-collapsed');
    return saved ? JSON.parse(saved) : false;
  });
  // Add a transitioning state to control body during transition
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null);

  const location = useLocation();
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize to detect mobile/desktop
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Persist sidebar state to localStorage
  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', JSON.stringify(isSidebarCollapsed));
  }, [isSidebarCollapsed]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Handle body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen || isTransitioning) {
      document.body.style.overflowX = 'hidden';
    } else {
      document.body.style.overflowX = '';
    }

    return () => {
      document.body.style.overflowX = '';
    };
  }, [isMobileMenuOpen, isTransitioning]);

  const toggleSidebar = () => {
    // Set transitioning state before changing sidebar state
    setIsTransitioning(true);

    // Clear any existing transition timer
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current);
    }

    // Toggle the sidebar state
    setIsSidebarCollapsed(!isSidebarCollapsed);

    // Reset transitioning state after transition completes (300ms + buffer)
    transitionTimerRef.current = setTimeout(() => {
      setIsTransitioning(false);
    }, 350);
  };

  // Cleanup transition timer on unmount
  useEffect(() => {
    return () => {
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current);
      }
    };
  }, []);

  // Set class to handle overflow during transition
  const containerClass = isTransitioning ? 'overflow-hidden' : '';

  // Handle errors caught by the ErrorBoundary
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    errorLoggingService.logReactError(error, errorInfo, {
      location: location.pathname,
      isMobile,
    });
  };

  return (
    <div
      className={`min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col overflow-x-hidden ${containerClass}`}
    >
      {/* Fixed header at the top */}
      <div className="fixed top-0 left-0 right-0 z-30">
        <Header isMobileMenuOpen={isMobileMenuOpen} setIsMobileMenuOpen={setIsMobileMenuOpen} />
      </div>

      {/* Main content with sidebar and page content */}
      <div className={`flex flex-1 relative overflow-x-hidden ${containerClass} pt-16`}>
        {/* Desktop Sidebar - only show on desktop and when authenticated */}
        {!isMobile && (
          <div className="fixed left-0 top-16 bottom-0 z-20">
            <Sidebar
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isCollapsed={isSidebarCollapsed}
              toggleSidebar={toggleSidebar}
              isTransitioning={isTransitioning}
            />
          </div>
        )}

        {/* Mobile Sidebar - controlled by isMobileMenuOpen state */}
        {isMobile && isMobileMenuOpen && (
          <div className="fixed inset-0 z-40 pt-16">
            <Sidebar
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
              isCollapsed={false}
              toggleSidebar={toggleSidebar}
              isTransitioning={isTransitioning}
            />
          </div>
        )}

        <main
          className={`flex-1 p-6 overflow-y-auto overflow-x-hidden transition-all duration-300 ${
            !isMobile
              ? isSidebarCollapsed
                ? 'md:ml-16'
                : 'md:ml-64'
              : 'w-full' // Full width on mobile
          } ${containerClass}`}
          style={{ maxWidth: '100vw' }}
        >
          <div className="w-full overflow-x-hidden">
            <ErrorBoundary onError={handleError}>{children}</ErrorBoundary>
          </div>
        </main>
      </div>

      {/* Footer stays at the bottom and is not covered by sidebar */}
      <div
        className={`mt-auto ${!isMobile ? (isSidebarCollapsed ? 'md:ml-16' : 'md:ml-64') : ''}`}
      >
        <Footer />
      </div>
    </div>
  );
};

export default Layout;
