import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
      <p className="text-lg font-semibold text-slate-700">Analyzing your symptoms...</p>
      <p className="text-slate-500">Please wait a moment.</p>
    </div>
  );
};