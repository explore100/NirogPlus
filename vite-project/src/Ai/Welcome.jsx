import React from 'react';

export const Welcome = () => {
  return (
    <div className="text-center p-6 bg-slate-100 rounded-lg border border-slate-200">
      <h3 className="text-xl font-semibold text-slate-700">Ready to start?</h3>
      <p className="text-slate-600 mt-2 max-w-2xl mx-auto">
        Enter your symptoms in the text box above and click "Analyze Symptoms". Our AI will provide a list of potential conditions based on the information you provide.
      </p>
      <div className="mt-4 text-sm text-slate-500">
        Example: "High fever, headache, and muscle aches for 3 days."
      </div>
    </div>
  );
};