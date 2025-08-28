import React from "react";
import { Button } from "../Components/ui/Button";
import { FaRocket, FaTools, FaBookOpen, FaUserMd, FaCalendarCheck, FaCapsules, FaRobot } from "react-icons/fa";
import doctor from "../assets/doctor.jpg";
import pharmacy from "../assets/onlinepharmacy.png";
import lifestyle from "../assets/healthy.jpg";

const Homepage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white text-gray-800">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <h1 className="text-4xl md:text-6xl font-bold text-green-700 mb-6">
          Welcome to Nirog Plus
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-gray-600 mb-8">
          Your trusted digital health companion. Consult doctors online, book appointments with ease, 
          access medicines from nearby pharmacies, and get instant health advice through our AI-powered chatbot. 
          A step towards better health & well-being for everyone.
        </p>
        <div className="space-x-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white text-lg px-6 py-3 rounded-xl shadow">
            Get Started
          </Button>
          <Button variant="outline" className="text-green-700 border-green-600 text-lg px-6 py-3 rounded-xl">
            Learn More
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">What We Offer</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-green-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaUserMd className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Online Doctor Consultation</h3>
            <p>
              Connect with certified doctors from anywhere. Discuss your health issues, 
              get prescriptions, and receive professional guidance online.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaCalendarCheck className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Easy Appointment Booking</h3>
            <p>
              Schedule appointments with doctors and specialists at your convenience. 
              Manage your health checkups without waiting in long queues.
            </p>
          </div>

          <div className="bg-green-50 p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaCapsules className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Pharma & Medical Store</h3>
            <p>
              Order medicines and healthcare products directly from verified pharmacies. 
              A multi-vendor platform ensuring availability and fast delivery.
            </p>
          </div>
        </div>
      </section>

      {/* Extra Features */}
      <section className="py-16 px-6 bg-gradient-to-r from-green-100 to-green-50">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">Smart Health Assistance</h2>
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaRobot className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">AI Health Chatbot</h3>
            <p>
              Get instant answers to health queries, symptom checks, and wellness tips 
              from our smart AI-powered chatbot available 24/7.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaBookOpen className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Health Knowledge Hub</h3>
            <p>
              Access articles, guides, and wellness resources to improve your lifestyle, 
              prevent diseases, and stay informed about health trends.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow hover:shadow-lg transition">
            <FaRocket className="text-green-600 w-12 h-12 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Wellness Goals</h3>
            <p>
              Track your progress, set health goals, and move towards a balanced lifestyle 
              with our personalized health and well-being features.
            </p>
          </div>
        </div>
      </section>
            {/* Medical Gallery Section */}
      <section className="py-16 px-6 bg-white">
        <h2 className="text-3xl font-bold text-center text-green-700 mb-10">
          A Glimpse of Better Health
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow hover:shadow-xl transition">
            <img
              src={doctor}
              alt="Doctor Consultation"
              className="w-full h-64 object-cover transform hover:scale-105 transition"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow hover:shadow-xl transition">
            <img
              src={pharmacy}
              alt="Pharmacy Store"
              className="w-full h-64 object-cover transform hover:scale-105 transition"
            />
          </div>
          <div className="overflow-hidden rounded-2xl shadow hover:shadow-xl transition">
            <img
              src={lifestyle}
              alt="Healthy Lifestyle"
              className="w-full h-64 object-cover transform hover:scale-105 transition"
            />
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500">
        © {new Date().getFullYear()} Nirog Plus. All rights reserved.
      </footer>
    </div>
  );
};

export default Homepage;
