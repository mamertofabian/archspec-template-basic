import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen?: (isOpen: boolean) => void;
  isCollapsed: boolean;
  toggleSidebar: () => void;
  isTransitioning?: boolean;
}

const Sidebar = ({
  isMobileMenuOpen,
  setIsMobileMenuOpen,
  isCollapsed,
  toggleSidebar,
  isTransitioning = false,
}: SidebarProps) => {
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    {
      name: t('navigation.dashboard'),
      href: '/dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      name: t('navigation.projects'),
      href: '/projects',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      name: t('navigation.team'),
      href: '/team',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z',
    },
    {
      name: t('navigation.tasks'),
      href: '/tasks',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      name: t('navigation.resources', 'Resources'),
      href: '/resources',
      icon: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4',
    },
    {
      name: t('navigation.analytics', 'Analytics'),
      href: '/analytics',
      icon: 'M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z',
    },
    {
      name: t('navigation.settings'),
      href: '/settings',
      icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z',
    },
  ];

  const handleMobileNavClick = () => {
    if (setIsMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  };

  const isMobile = window.innerWidth < 768;

  // Improve text transition with opacity and transform animations
  const textClasses = `whitespace-nowrap transition-all duration-300 ease-in-out ${
    isCollapsed
      ? 'opacity-0 transform translate-x-2 absolute pointer-events-none'
      : 'opacity-100 ml-3'
  }`;

  // Improve icon transition
  const iconContainerClasses = `transition-all duration-300 ease-in-out flex-shrink-0 h-6 w-6 ${
    isCollapsed ? 'mx-auto' : ''
  }`;

  return (
    <>
      {/* Desktop sidebar */}
      {!isMobile && (
        <div
          className={`h-full hidden md:flex md:flex-col transition-all duration-300 ease-in-out overflow-visible ${
            isCollapsed ? 'md:w-16' : 'md:w-64'
          }`}
          style={{
            willChange: 'width',
            clipPath: isTransitioning ? 'inset(0)' : 'none', // Clip content during transition
          }}
        >
          <div className="flex flex-col h-full bg-primary-700 dark:bg-primary-800 overflow-y-auto overflow-x-hidden">
            <div className="py-4 flex-grow">
              <div className="mt-5">
                <nav className="px-2 space-y-1">
                  {navigation.map(item => {
                    const isActive = location.pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={`${
                          isActive
                            ? 'bg-primary-800 dark:bg-primary-900 text-white'
                            : 'text-primary-100 hover:bg-primary-600 dark:hover:bg-primary-700 hover:text-white'
                        } group flex items-center relative px-2 py-2 text-sm font-medium rounded-md overflow-hidden`}
                        title={isCollapsed ? item.name : ''}
                      >
                        <svg
                          className={`${
                            isActive
                              ? 'text-white'
                              : 'text-primary-300 group-hover:text-primary-100'
                          } ${iconContainerClasses}`}
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d={item.icon}
                          />
                        </svg>
                        <span className={textClasses}>{item.name}</span>
                      </Link>
                    );
                  })}
                </nav>
              </div>
            </div>

            {/* Toggle button moved to bottom - fixed position */}
            <div className="sticky bottom-0 py-2 border-t border-primary-600 bg-primary-700 dark:bg-primary-800">
              <Button
                type="button"
                variant="ghost"
                className="w-full flex items-center justify-center p-2 text-primary-200 hover:text-white hover:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={toggleSidebar}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                disabled={isTransitioning} // Disable during transition to prevent double-clicks
              >
                <svg
                  className="h-5 w-5 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d={
                      isCollapsed
                        ? 'M9 5l7 7-7 7' // Arrow right when collapsed
                        : 'M15 19l-7-7 7-7' // Arrow left when expanded
                    }
                  />
                </svg>
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile sidebar */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 flex">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-gray-600 bg-opacity-75 mobile-nav-overlay"
            aria-hidden="true"
            onClick={handleMobileNavClick}
          ></div>

          {/* Sidebar */}
          <div className="relative flex-1 flex flex-col max-w-xs w-full pt-5 pb-4 bg-primary-700 dark:bg-primary-800 mobile-nav-panel mobile-nav-enter">
            {/* Close button */}
            <div className="absolute top-0 right-0 -mr-12 pt-2">
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                onClick={handleMobileNavClick}
              >
                <span className="sr-only">Close sidebar</span>
                <svg
                  className="h-6 w-6 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </Button>
            </div>

            <div className="flex-shrink-0 flex items-center px-4">
              <span className="text-primary-100 font-bold text-xl">ArchSpec Basic Template</span>
            </div>
            <div className="mt-5 flex-1 h-0 overflow-y-auto overflow-x-hidden">
              <nav className="px-2 space-y-1">
                {navigation.map(item => {
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={handleMobileNavClick}
                      className={`${
                        isActive
                          ? 'bg-primary-800 dark:bg-primary-900 text-white'
                          : 'text-primary-100 hover:bg-primary-600 dark:hover:bg-primary-700 hover:text-white'
                      } group flex items-center px-2 py-2 text-base font-medium rounded-md`}
                    >
                      <svg
                        className={`${
                          isActive ? 'text-white' : 'text-primary-300 group-hover:text-primary-100'
                        } mr-4 flex-shrink-0 h-6 w-6`}
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={item.icon}
                        />
                      </svg>
                      {item.name}
                    </Link>
                  );
                })}
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;
