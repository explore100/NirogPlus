import React, { useState, useCallback } from "react";
import { SymptomInput } from "./Symptom";
import { DiagnosisResult } from "./Diag";
import { LoadingSpinner } from "./Loading";
import { Disclaimer } from "./Disclamer";
import { Welcome } from "./Welcome";
import { MedicalIcon } from "./Medical";

const Nirog = () => {
  const [symptoms, setSymptoms] = useState("");
  const [diagnoses, setDiagnoses] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = useCallback(async () => {
    if (!symptoms.trim()) {
      setError("Please enter your symptoms before analyzing.");
      return;
    }

    setIsLoading(true);
    setError(null);
    setDiagnoses(null);

    try {
      const response = await fetch("http://localhost:3000/api/diagnose", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ symptoms }),
      });

      if (!response.ok) {
        throw new Error("API request failed");
      }

      const data = await response.json();
      setDiagnoses(data.diagnoses);
    } catch (err) {
      console.error(err);
      setError(
        "Sorry, an error occurred while analyzing your symptoms. Please check your connection and try again."
      );
    } finally {
      setIsLoading(false);
    }
  }, [symptoms]);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-4xl mx-auto">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4 mb-2">
            <MedicalIcon />
            <h1 className="text-4xl sm:text-5xl font-bold text-slate-900">Nirog AI</h1>
          </div>
          <p className="text-slate-600 text-lg">Your AI-powered health information assistant</p>
        </header>

        <main className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 border border-slate-200">
          <Disclaimer />
          <SymptomInput
            symptoms={symptoms}
            setSymptoms={setSymptoms}
            onAnalyze={handleAnalyze}
            isLoading={isLoading}
          />

          {error && (
            <div
              className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg"
              role="alert"
            >
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <div className="mt-8">
            {isLoading && <LoadingSpinner />}
            {!isLoading && diagnoses && <DiagnosisResult diagnoses={diagnoses} />}
            {!isLoading && !diagnoses && !error && <Welcome />}
          </div>
        </main>

        <footer className="text-center mt-8 text-sm text-slate-500">
          <p>
            &copy; 2025 Nirog AI. For informational purposes only. Always consult a
            medical professional.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Nirog;
