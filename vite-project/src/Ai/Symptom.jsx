import React from 'react';

export const SymptomInput = ({ symptoms, setSymptoms, onAnalyze, isLoading }) => {
  return (
    <div className="flex flex-col gap-4">
      <label htmlFor="symptoms" className="text-lg font-semibold text-slate-800">
        Describe your symptoms
      </label>
      <textarea
        id="symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
        placeholder="e.g., 'I have a sore throat, a runny nose, and I've been coughing for two days. I don't have a fever.'"
        className="w-full h-40 p-4 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-shadow duration-200 resize-none text-base"
        disabled={isLoading}
      />
      <button
        onClick={onAnalyze}
        disabled={isLoading || !symptoms.trim()}
        className="w-full sm:w-auto self-end px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all duration-200"
      >
        {isLoading ? 'Analyzing...' : 'Analyze Symptoms'}
      </button>
    </div>
  );
};