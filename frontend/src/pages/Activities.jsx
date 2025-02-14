import React from "react";
import { motion } from "framer-motion";

export default function Activities() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <section className="bg-gradient-to-b from-green-50 to-white min-h-screen p-6 pt-20">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            className="text-6xl font-extrabold text-green-700 mb-6"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Activities
          </motion.h1>
          <motion.p
            className="text-gray-700 text-xl mb-12 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            Explore health-related articles, YouTube videos, and yoga sessions to improve your well-being.
          </motion.p>

          <motion.div className="grid md:grid-cols-1 lg:grid-cols-3 gap-8 px-4">
            {/* Articles Section */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 border border-green-100"
              whileHover={{ translateY: -10 }}
            >
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                Health Articles
              </h2>
              <ul className="text-gray-800 space-y-4 text-left">
                <li>
                  <a
                    href="https://www.nih.gov/health-information/emotional-wellness-toolkit"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                  >
                    Emotional Wellness Toolkit
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nimh.nih.gov/health/statistics/mental-illness"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                  >
                    Mental Illness Statistics
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.nature.com/articles/d41586-021-02690-5"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                  >
                    Nature Article on Mental Health
                  </a>
                </li>
                <li>
                  <a
                    href="https://artofhealthyliving.com/"
                    className="text-blue-600 hover:text-blue-800 hover:underline transition duration-300"
                  >
                    Art of Healthy Living
                  </a>
                </li>
              </ul>
            </motion.div>

            {/* YouTube Videos Section */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 border border-green-100"
              whileHover={{ translateY: -10 }}
            >
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                Yoga & Exercise Videos
              </h2>
              <div className="mt-4 space-y-6">
                <iframe
                  className="w-full h-48 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/hJbRpHZr_d0"
                  title="Yoga Routine"
                  allowFullScreen
                ></iframe>
                <iframe
                  className="w-full h-48 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/uNmKzlh55Fo"
                  title="Morning Yoga"
                  allowFullScreen
                ></iframe>
                <iframe
                  className="w-full h-48 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/IPvJzeskL10"
                  title="Stretching Exercises"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>

            {/* Additional Videos Section */}
            <motion.div
              className="bg-white p-8 rounded-xl shadow-2xl transform transition duration-500 hover:scale-105 border border-green-100"
              whileHover={{ translateY: -10 }}
            >
              <h2 className="text-3xl font-bold text-green-700 mb-6">
                Health & Wellness
              </h2>
              <div className="mt-4 space-y-6">
                <iframe
                  className="w-full h-48 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/MaFv-SMgHb0"
                  title="Healthy Habits"
                  allowFullScreen
                ></iframe>
                <iframe
                  className="w-full h-48 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/MzVl6Lu10kw"
                  title="Self-Care Routine"
                  allowFullScreen
                ></iframe>
                <iframe
                  className="w-full h-48 rounded-lg shadow-md"
                  src="https://www.youtube.com/embed/p3uYG17WUig"
                  title="Wellness Tips"
                  allowFullScreen
                ></iframe>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
}