import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-white shadow-md w-full mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-6 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link to={'/'}>
              <h2 className="text-2xl font-bold text-green-600">Click2Care</h2>
            </Link>
          </div>
          <div className="flex space-x-6">
            <Link to="/" className="text-gray-700 hover:text-green-600 transition duration-300">Home</Link>
            <Link to="/services" className="text-gray-700 hover:text-green-600 transition duration-300">Services</Link>
            <Link to="/activities" className="text-gray-700 hover:text-green-600 transition duration-300">Activities</Link>
            <Link to="/symptom" className="text-gray-700 hover:text-green-600 transition duration-300">Symptoms Tracker</Link>
            <Link to="/docUpload" className="text-gray-700 hover:text-green-600 transition duration-300">Medical Documents</Link>
            <Link to="/contact" className="text-gray-700 hover:text-green-600 transition duration-300">Contact</Link>
          </div>
        </div>
        <div className="py-4 border-t border-gray-300 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 text-center md:text-left">© 2025 Click2Care. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition duration-300">
              <i className="fab fa-facebook fa-lg"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition duration-300">
              <i className="fab fa-twitter fa-lg"></i>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition duration-300">
              <i className="fab fa-instagram fa-lg"></i>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-green-600 transition duration-300">
              <i className="fab fa-linkedin fa-lg"></i>
            </a>
          </div>
        </div>
        <div className="py-2 flex justify-center">
          <p className="text-gray-600">Made by : <b className='text-green-600'>TDM Hunters</b> </p>
        </div>
      </div>
    </footer>
  );
}
