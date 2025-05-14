import React from 'react';
import LoadingScreen from './LoadingScreen';

// Type for the LazyComponent props
type LazyComponentProps = {
  component: React.ComponentType;
};

/**
 * A component wrapper for lazy-loaded components that provides
 * consistent suspense handling with a loading screen
 */
export const LazyComponent = ({ component: Component }: LazyComponentProps) => {
  return (
    <React.Suspense fallback={<LoadingScreen />}>
      <Component />
    </React.Suspense>
  );
};

export default LazyComponent;
