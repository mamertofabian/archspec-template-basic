import { Navigate } from 'react-router-dom';

/**
 * Root redirect component that handles conditional navigation
 * based on authentication status
 */
const RootRedirect = () => {
  return (
    <Navigate to="/dashboard" replace />
  );
};

export default RootRedirect;
