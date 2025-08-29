import React from 'react';

export const Disclaimer = () => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-8 rounded-r-lg">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg
            className="h-6 w-6 text-yellow-500"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.21 3.03-1.742 3.03H4.42c-1.532 0-2.492-1.696-1.742-3.03l5.58-9.92zM10 13a1 1 0 110-2 1 1 0 010 2zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-yellow-800">
            <strong className="font-bold">Important Disclaimer:</strong> This tool does not provide medical advice. It is intended for informational purposes only. Consult with a healthcare professional for any health concerns or before making any decisions related to your health.
          </p>
        </div>
      </div>
    </div>
  );
};