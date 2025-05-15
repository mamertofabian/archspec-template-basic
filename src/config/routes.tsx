import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import RootRedirect from '../components/navigation/RootRedirect';
import Dashboard from '@/pages/Dashboard';

// Define routes
export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <RootRedirect />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '*',
        // Lazy load 404 page
        lazy: async () => {
          const { NotFound } = await import('../pages/NotFound');
          return { Component: NotFound };
        },
      },
    ],
  },
]);
