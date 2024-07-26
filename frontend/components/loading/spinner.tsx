const LoadingSpinner = () => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-20 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-black mx-auto"></div>
        <h2 className="text-zinc-900 dark:text-white mt-4 uppercase font-light">Loading...</h2>
        <p className="text-zinc-600 uppercase font-light dark:text-zinc-400">
            Please wait a moment
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
