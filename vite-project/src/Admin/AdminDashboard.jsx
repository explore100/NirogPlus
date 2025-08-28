import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);
  const [replies, setReplies] = useState({});

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:3000/api/repair', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setRequests(res.data);
      } catch (err) {
        console.error('Error fetching admin data', err);
      }
    };
    fetchRequests();
  }, []);

  const handleReplyChange = (id, message) => {
    setReplies((prev) => ({ ...prev, [id]: message }));
  };

  const sendReply = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `http://localhost:3000/api/repair/${id}/reply`,
        { adminMessage: replies[id] },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Reply sent and request approved!');
      setRequests((prev) =>
        prev.map((r) =>
          r.id === id ? { ...r, adminMessage: replies[id], status: 'Approved' } : r
        )
      );
      setReplies((prev) => ({ ...prev, [id]: '' }));
    } catch (err) {
      toast.error('Failed to send reply');
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-8 text-gray-800 text-center">
        Admin Dashboard
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {requests.map((req) => (
          <div
            key={req.id}
            className="bg-white shadow-lg rounded-xl p-5 border-t-4 border-blue-600 hover:shadow-2xl transition duration-300"
          >
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-lg font-semibold text-gray-800">
                {req.user?.name || 'Unknown User'}
              </h3>
              <span
                className={`text-sm font-semibold px-3 py-1 rounded-full ${
                  req.status === 'Pending'
                    ? 'bg-yellow-100 text-yellow-800'
                    : req.status === 'In Progress'
                    ? 'bg-blue-100 text-blue-800'
                    : req.status === 'Completed'
                    ? 'bg-green-100 text-green-800'
                    : 'bg-gray-100 text-gray-600'
                }`}
              >
                {req.status}
              </span>
            </div>

            <p className="text-gray-600 mb-2">
              <span className="font-medium">Doctor:</span> {req.doctor}
            </p>
            <p className="text-gray-600 mb-2">
              <span className="font-medium">Reason:</span> {req.reason}
            </p>
            <p className="text-gray-600 mb-4">
              <span className="font-medium">Scheduled:</span>{' '}
              {new Date(req.scheduled).toLocaleString()}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-2">
              <input
                type="text"
                placeholder="Reply to user"
                className="flex-1 border rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={replies[req.id] || ''}
                onChange={(e) => handleReplyChange(req.id, e.target.value)}
              />
              <button
                onClick={() => sendReply(req.id)}
                className="bg-blue-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Send
              </button>
            </div>

            {req.adminMessage && (
              <p className="mt-3 text-gray-700 text-sm">
                <span className="font-medium">Admin Reply:</span> {req.adminMessage}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
