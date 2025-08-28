// src/pages/About.jsx
import React from "react";
import { motion } from "framer-motion";
import {
  FaUserMd,
  FaCalendarCheck,
  FaCapsules,
  FaRobot,
  FaHeartbeat,
  FaUsers,
} from "react-icons/fa";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
    },
  }),
};

const About = () => {
  const features = [
    {
      icon: <FaUserMd className="text-3xl text-green-600" />,
      title: "Doctor Consultation",
      description:
        "Get access to licensed doctors online. Discuss health concerns anytime, anywhere.",
    },
    {
      icon: <FaCalendarCheck className="text-3xl text-blue-600" />,
      title: "Easy Appointments",
      description:
        "Book consultations and follow-ups in just a few clicks with flexible scheduling.",
    },
    {
      icon: <FaCapsules className="text-3xl text-purple-600" />,
      title: "Pharma Store",
      description:
        "Order genuine medicines and wellness products from trusted pharmacies near you.",
    },
    {
      icon: <FaRobot className="text-3xl text-pink-600" />,
      title: "Smart Health Chatbot",
      description:
        "24/7 AI-powered assistant to answer queries, provide tips, and guide symptom checks.",
    },
    {
      icon: <FaHeartbeat className="text-3xl text-red-500" />,
      title: "Wellness & Lifestyle",
      description:
        "Personalized tips on fitness, nutrition, and preventive care for a healthier life.",
    },
    {
      icon: <FaUsers className="text-3xl text-yellow-500" />,
      title: "Community Support",
      description:
        "A platform where patients, doctors, and caregivers connect for better health.",
    },
  ];

  const team = [
    {
      name: "Dr. Anjali Sharma",
      role: "General Physician",
      img: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Dr. Rajesh Khadka",
      role: "Cardiologist",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "Dr. Priya Koirala",
      role: "Nutritionist",
      img: "https://randomuser.me/api/portraits/women/47.jpg",
    },
    {
      name: "Dr. Suman Thapa",
      role: "Mental Health Specialist",
      img: "https://randomuser.me/api/portraits/men/41.jpg",
    },
  ];

  return (
    <div className="px-6 md:px-20 py-10 bg-gradient-to-b from-white to-green-50 text-gray-800">
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={0}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-green-700 drop-shadow">
          About Nirog Plus
        </h1>
        <p className="text-lg max-w-3xl mx-auto text-gray-600">
          Nirog Plus is a futuristic health & well-being platform designed to
          make quality healthcare accessible for everyone. From online
          consultations to pharmacy integration and AI-driven health support —
          we bring doctors, medicines, and wellness guidance to your fingertips.
        </p>
      </motion.section>

      {/* Mission & Vision */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={1}
        className="bg-gradient-to-r from-green-100 to-green-200 rounded-2xl p-8 md:p-12 mb-16 shadow-lg border border-green-300"
      >
        <h2 className="text-3xl font-semibold mb-6 text-green-800">
          Our Mission & Vision
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Mission
            </h3>
            <p className="text-gray-700">
              To simplify healthcare access in Nepal by connecting patients with
              doctors, pharmacies, and wellness resources through digital
              solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold text-green-700 mb-2">
              Vision
            </h3>
            <p className="text-gray-700">
              A healthier society where technology bridges the gap between
              people and quality healthcare — ensuring no one is left behind.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold mb-8 text-center text-green-700">
          Why Choose Nirog Plus?
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i + 2}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="flex flex-col items-center bg-white border border-green-200 p-6 rounded-xl w-full sm:w-[300px] shadow-md hover:shadow-xl hover:scale-105 transition"
            >
              {feature.icon}
              <h3 className="mt-4 text-xl font-semibold text-gray-800">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 text-center mt-2">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={features.length + 2}
        className="mb-16"
      >
        <h2 className="text-3xl font-semibold text-center mb-10 text-green-700">
          Meet Our Experts
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {team.map((member, i) => (
            <motion.div
              key={i}
              custom={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl hover:scale-105 transition text-center relative overflow-hidden border border-green-200"
            >
              <img
                src={member.img}
                alt={member.name}
                className="w-28 h-28 object-cover rounded-full mx-auto mb-4 border-4 border-green-400"
              />
              <h3 className="text-lg font-semibold text-gray-800">
                {member.name}
              </h3>
              <p className="text-sm text-green-600">{member.role}</p>
              <div className="absolute inset-0 bg-gradient-to-t from-green-100/20 to-transparent opacity-0 hover:opacity-100 transition"></div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call to Action */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeInUp}
        custom={features.length + team.length + 2}
        className="text-center mt-10"
      >
        <p className="text-lg font-medium text-gray-700">
          Ready to take charge of your health and well-being?
        </p>
        <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-300 shadow-lg">
          Get Started with Nirog Plus
        </button>
      </motion.section>
    </div>
  );
};

export default About;
