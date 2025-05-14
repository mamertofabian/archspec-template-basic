/**
 * LoadingScreen Component
 *
 * A loading indicator component displayed during page transitions or data loading
 */

const LoadingScreen = () => {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-600 dark:border-indigo-500 animate-spin"></div>
        <div
          className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-8 border-b-8 border-indigo-200 dark:border-indigo-300 animate-spin"
          style={{ animationDirection: 'reverse', animationDuration: '1s' }}
        ></div>
      </div>
      <p className="ml-4 text-xl font-medium text-indigo-700 dark:text-indigo-400">Loading...</p>
    </div>
  );
};

export default LoadingScreen;
