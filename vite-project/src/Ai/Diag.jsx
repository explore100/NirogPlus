import React from 'react';

const getLikelihoodColor = (likelihood) => {
  const lowerLikelihood = likelihood.toLowerCase();
  if (lowerLikelihood.includes('high')) return 'bg-red-100 text-red-800 border-red-300';
  if (lowerLikelihood.includes('medium')) return 'bg-yellow-100 text-yellow-800 border-yellow-300';
  if (lowerLikelihood.includes('low')) return 'bg-blue-100 text-blue-800 border-blue-300';
  return 'bg-slate-100 text-slate-800 border-slate-300';
};

export const DiagnosisResult = ({ diagnoses }) => {
  if (!diagnoses || diagnoses.length === 0) {
    return (
      <div className="text-center p-6 bg-slate-100 rounded-lg">
        <h3 className="text-xl font-semibold text-slate-700">No Potential Conditions Found</h3>
        <p className="text-slate-500 mt-2">
          The AI could not determine potential conditions based on the symptoms provided. Please try describing them differently.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 border-b pb-3 mb-6">Potential Conditions</h2>
      {diagnoses.map((diag, index) => (
        <div
          key={index}
          className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden transition-all hover:shadow-md"
        >
          <div className="p-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-4">
              <h3 className="text-xl font-bold text-slate-800">{diag.condition}</h3>
              <span
                className={`px-3 py-1 text-sm font-medium rounded-full border ${getLikelihoodColor(
                  diag.likelihood
                )}`}
              >
                {diag.likelihood} Likelihood
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Explanation</h4>
                <p className="text-slate-600 leading-relaxed">{diag.explanation}</p>
              </div>
              <div>
                <h4 className="font-semibold text-slate-700 mb-1">Suggested Next Steps</h4>
                <p className="text-slate-600 leading-relaxed">{diag.nextSteps}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};