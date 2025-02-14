import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check authentication status on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // Convert token existence to boolean
  }, []);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token
    localStorage.removeItem("user"); // Remove user data
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="bg-white shadow-md w-full fixed top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to={'/'}>
            <motion.h1 
              className="text-2xl font-bold text-green-600"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              Click2Care
            </motion.h1>
          </Link>
          <div className="hidden md:flex space-x-6 items-center">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition duration-300">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-green-600 transition duration-300">Services</Link>
            <Link to="/activities" className="text-gray-700 hover:text-green-600 transition duration-300">Activities</Link>
            <Link to="/symptom" className="text-gray-700 hover:text-green-600 transition duration-300">Symptoms Tracker</Link>
            <Link to="/docUpload" className="text-gray-700 hover:text-green-600 transition duration-300">Medical Documents</Link>
            {isAuthenticated ? (
              <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-red-700">
                Logout
              </button>
            ) : (
              <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700">
                Login
              </Link>
            )}
          </div>
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-700">
              {isOpen ? <span>&#x2715;</span> : <span>&#9776;</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white shadow-md absolute w-full left-0 top-16 p-4 flex flex-col space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/" className="text-gray-700 hover:text-green-600 transition duration-300">Home</Link>
          <Link to="/services" className="text-gray-700 hover:text-green-600 transition duration-300">Services</Link>
          <Link to="/activities" className="text-gray-700 hover:text-green-600 transition duration-300">Activities</Link>
          <Link to="/symptom" className="text-gray-700 hover:text-green-600 transition duration-300">Symptoms Tracker</Link>
          <Link to="/docUpload" className="text-gray-700 hover:text-green-600 transition duration-300">Medical Documents</Link>
          {isAuthenticated ? (
            <button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-red-700">
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-blue-500 text-white px-4 py-2 rounded-full transition duration-300 hover:bg-blue-700">
              Login
            </Link>
          )}
        </motion.div>
      )}
    </nav>
  );
}