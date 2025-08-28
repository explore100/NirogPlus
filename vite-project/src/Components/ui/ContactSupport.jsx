import { FaHeadset } from "react-icons/fa";

export default function ContactSupport() {
  return (
    <section className="mt-8">
      <h2 className="text-xl font-semibold text-green-400 mb-4">📞 Contact Support</h2>
      <div className="bg-[#1E93AB] backdrop-blur-md shadow-xl p-6 rounded-2xl text-center">
        <FaHeadset className="text-4xl text-red-400 mx-auto mb-3" />
        <p className="text-[#fff]">Need help from our support team? Submit a request or check your ticket status.</p>
        <button className="mt-4 px-5 py-2 bg-red-400 text-white rounded-xl hover:bg-red-600 shadow-lg">
          Submit a Ticket
        </button>
      </div>
    </section>
  );
}
