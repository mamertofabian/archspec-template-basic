import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { router } from './config/routes';
import { queryClient } from './config/reactQuery';
import { ThemeProvider } from './context/ThemeContext';
// Import i18n configuration - this needs to be imported before app components
import './i18n';
import './index.css';

// Create the app root element
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
