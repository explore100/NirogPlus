import { FaHeartbeat } from "react-icons/fa";

export default function ProblemDiagnoser() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-green-400 mb-4">🧠 Symptom Checker</h2>
      <div className="bg-[#1E93AB] backdrop-blur-md shadow-xl p-6 rounded-2xl text-center">
        <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-3" />
        <p className="text-gray-200">Enter your symptoms to get an initial health analysis and recommendations.</p>
        <button className="mt-5 px-5 py-2 bg-red-400 text-white rounded-xl hover:bg-red-600 shadow-lg">
          Start Diagnosis
        </button>
      </div>
    </section>
  );
}
