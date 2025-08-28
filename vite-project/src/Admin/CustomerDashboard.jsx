import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CustomerDashboard = () => {
  const [requests, setRequests] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:3000/api/my-requests", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data); // backend already filters by userId
      } catch (err) {
        console.error("Error fetching customer requests", err);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">
        My Appointments
      </h2>
      {requests.length === 0 ? (
        <p className="text-gray-600">No appointments found.</p>
      ) : (
        <ul className="space-y-4">
          {requests.map((req) => (
            <li
              key={req.id}
              className="p-4 border border-green-200 rounded-xl shadow-sm bg-white"
            >
              <p>
                <strong>Doctor:</strong> {req.doctor}
              </p>
              <p>
                <strong>Reason:</strong> {req.reason}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`${
                    req.status === "Approved"
                      ? "text-green-600 font-semibold"
                      : "text-yellow-600 font-medium"
                  }`}
                >
                  {req.status}
                </span>
              </p>
              <p>
                <strong>Scheduled:</strong>{" "}
                {new Date(req.scheduled).toLocaleString()}
              </p>
              {req.adminMessage && (
                <p className="mt-2 text-blue-700">
                  <strong>Admin Reply:</strong> {req.adminMessage}
                </p>
              )}

              {/* Video Call Button */}
             {/* Video Call Link (if admin sent one) */}
{req.linkMessage && (
  <a
    href={req.linkMessage}
    target="_blank"
    rel="noreferrer"
    className="mt-2 inline-block bg-green-600 text-white py-1 px-3 rounded hover:bg-green-700"
  >
    Join Video Call
  </a>
)}

            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomerDashboard;
