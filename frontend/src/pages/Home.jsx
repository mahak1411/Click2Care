import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <section className="min-h-screen flex flex-col items-center justify-center text-center p-6">
        {/* Animated Heading */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-green-700 mb-6"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Welcome to <span className="text-green-600">Click2Care</span>
        </motion.h1>

        {/* Animated Subheading */}
        <motion.p
          className="text-gray-700 text-lg md:text-xl max-w-2xl mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          Providing online medical consultations with expert doctors from the comfort of your home.
        </motion.p>

        {/* Animated Buttons */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-6"
        >
          <Link to="/symptom">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get Started
            </button>
          </Link>
          <Link to="/chatbot">
            <button className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl">
              Get ChatBot Support
            </button>
          </Link>
        </motion.div>

        {/* Optional: Decorative Icons or Images */}
        <motion.div
          className="mt-12 flex space-x-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          <img
            src="https://img.icons8.com/color/96/000000/doctor-male.png"
            alt="Doctor"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <img
            src="https://img.icons8.com/color/96/000000/health-checkup.png"
            alt="Health Checkup"
            className="w-16 h-16 md:w-20 md:h-20"
          />
          <img
            src="https://img.icons8.com/color/96/000000/online-support.png"
            alt="Online Support"
            className="w-16 h-16 md:w-20 md:h-20"
          />
        </motion.div>
      </section>
    </div>
  );
}
