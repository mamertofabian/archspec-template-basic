import { Outlet, useLocation } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import './index.css';

function App() {
  const location = useLocation();
  const isAuthPage = ['/login', '/register', '/forgot-password'].includes(location.pathname);

  // Use a simpler layout for authentication pages
  if (isAuthPage) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
            ArchSpec Basic Template
          </h2>
        </div>
        <Outlet />
      </div>
    );
  }

  // Use the main layout with navigation for authenticated pages
  return (
    <>
      <Layout>
        <Outlet />
      </Layout>
    </>
  );
}

export default App;
