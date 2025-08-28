import React, { useState, useEffect, useRef } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaInfoCircle,
  FaLifeRing,
  FaQuestionCircle,
  FaSignOutAlt,
  FaCartArrowDown
  
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';



const DashBoard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const profileRef = useRef(null);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    const handelCLickOutside = (e) =>{
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handelCLickOutside);
    return () => 
      document.removeEventListener("mousedown", handelCLickOutside);
  }, []);

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static`}
      >
        <div className="flex justify-between items-center px-4 py-5 border-b">
          <h2 className="text-xl font-semibold text-gray-800">Nirog-plus</h2>
           {user && (
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="ml-2 focus:outline-none"
              >
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white text-xl">
                  {user.name.charAt(0).toUpperCase()}
                </div>
              </button>

              {/* Dropdown Panel */}
              {showProfile && (
                <div className="absolute right-0 mt-2 w-64 bg-white shadow-lg rounded-lg p-4 border z-50">
                  <h3 className="text-lg font-semibold mb-2 text-gray-800">
                    {user.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Contact:</strong> {user.contact}
                  </p>
                  <p className="text-sm text-gray-600">
                    <strong>Address:</strong> {user.address}
                  </p>
                </div>
              )}
            </div>
          )}
          <button
            onClick={toggleNavbar}
            className="text-gray-600 hover:text-red-500 text-xl lg:hidden"
          >
            <FaTimes />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4 text-gray-700 text-lg">
          <Link
            to="/DashBoard/home"
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <FaHome /> Home
          </Link>
          <Link
            to="/DashBoard/about"
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <FaInfoCircle /> About
          </Link>
          <Link
            to="/DashBoard/Support"
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <FaLifeRing /> Appoinment
          </Link>
          <Link to="/DashBoard/spare-parts" className="flex items-center gap-3 hover:text-blue-600 transition" >
            <FaInfoCircle /> Medical Store
          </Link>
          <Link
            to="/DashBoard/help"
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <FaQuestionCircle /> Help
          </Link>
          <Link
            to="/DashBoard/cart"
            className="flex items-center gap-3 hover:text-blue-600 transition"
          >
            <FaCartArrowDown /> Cart
          </Link>
             <Link
            to="/DashBoard/billing"
            className="hidden"
          >
            <FaCartArrowDown /> Checkout
          </Link>
           <Link
            to="/DashBoard/orderplacement"
            className="hidden"
          >
            <FaCartArrowDown /> Orderplacement
          </Link>

          {user?.role === "admin" && (<Link
            to="/DashBoard/admin"
            className="flex items-center gap-3 hover:text-blue-600 transition">
              <FaUser />  User</Link>)}
         
      <button
  onClick={() => {
    localStorage.removeItem("user");
    toast.success("Logged out successfully!", { position: "top-right" });
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }}
  className="flex items-center gap-3 text-left hover:text-red-600 transition text-lg text-gray-700"
>
  <FaSignOutAlt /> Logout
</button>
<ToastContainer />
        </nav>
      </div>

      {/* Toggle Button */}
      <button
        onClick={toggleNavbar}
        className="fixed top-4 left-4 z-50 text-white bg-blue-600 p-3 rounded-full shadow-md hover:bg-blue-700 transition lg:hidden"
      >
        <FaBars />
      </button>

      {/* Dark overlay on mobile */}
      {isOpen && (
        <div
          onClick={toggleNavbar}
          className="fixed inset-0 bg-black bg-opacity-40 z-40 lg:hidden"
        />
      )}

      {/* Main content */}
      <div className="flex-1 flex items-center justify-center p-6 bg-gray-100">
        <Outlet />
      </div>
    </div>
  );
};

export default DashBoard;
