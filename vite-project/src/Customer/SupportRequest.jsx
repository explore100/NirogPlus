import axios from "axios";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerDashboard from "../Admin/CustomerDashboard";

export function AppointmentBooking() {
  const [doctor, setDoctor] = useState("");
  const [reason, setReason] = useState("");
  const [scheduled, setScheduled] = useState("");
  const [userId, setUserId] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user") || "{}");
    if (user && user.id) setUserId(user.id);
    else toast.error("User not logged in.");
  }, []);

  const handleSubmit = async () => {
    if (!doctor || !reason || !scheduled) {
      toast.error("Please fill in all fields.");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Authentication token not found.");
      return;
    }

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:3000/api/appoinments", // match backend spelling
        { userId, doctor, reason, scheduled },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success("Appointment booked successfully!");
      setDoctor("");
      setReason("");
      setScheduled("");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to book appointment");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6 px-6 py-8">
      <ToastContainer />

      {/* Appointment Form */}
      <div className="flex-1 bg-white shadow-xl rounded-2xl p-8 border border-green-200">
        <h2 className="text-3xl font-bold mb-2 text-green-700">
          Book an Appointment
        </h2>
        <p className="text-gray-600 mb-6">
          Schedule a consultation with one of our trusted doctors. Fill in the
          details below to confirm your booking.
        </p>

        <div className="space-y-5">
          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Choose Doctor
            </label>
            <select
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              value={doctor}
              onChange={(e) => setDoctor(e.target.value)}
            >
              <option value="">-- Select a Doctor --</option>
              <option value="General Physician">General Physician</option>
              <option value="Cardiologist">Cardiologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Nutritionist">Nutritionist</option>
              <option value="Pediatrician">Pediatrician</option>
            </select>
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Reason for Appointment
            </label>
            <textarea
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 min-h-[100px]"
              placeholder="Briefly describe your symptoms or reason for visit..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div>
            <label className="block font-medium text-sm text-gray-700 mb-1">
              Preferred Date
            </label>
            <input
              type="date"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
              value={scheduled}
              onChange={(e) => setScheduled(e.target.value)}
            />
          </div>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition shadow-md disabled:opacity-50"
          >
            {loading ? "Booking..." : "Book Appointment"}
          </button>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>
            <strong>Note:</strong> Appointments are subject to doctor
            availability. You’ll receive confirmation shortly after submission.
          </p>
          <p className="mt-2">
            Need urgent care?{" "}
            <a href="/support/chat" className="text-green-600 hover:underline">
              Start a live chat
            </a>
            .
          </p>
        </div>
      </div>

      {/* Sidebar Dashboard */}
      <div className="w-full md:w-1/3 bg-gray-50 shadow-md rounded-2xl p-6 border border-green-100">
        <CustomerDashboard />
      </div>
    </div>
  );
}
