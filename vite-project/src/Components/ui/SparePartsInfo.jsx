import { FaBoxOpen } from "react-icons/fa";

export default function SparePartsInfo() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-green-400 mb-4">📦 Pharmacy & Medical Inventory</h2>
      <div className="bg-[#1E93AB] backdrop-blur-md p-6 rounded-2xl shadow-xl flex flex-col items-center">
        <FaBoxOpen className="text-3xl text-red-500 mb-3" />
        <p className="text-gray-200 text-center">
          Browse available medicines, check stock, and order securely from verified medical stores.
        </p>
        <button className="mt-4 px-5 py-2 bg-red-400 text-white rounded-xl hover:bg-red-600 shadow-lg">
          View Inventory
        </button>
      </div>
    </section>
  );
}
