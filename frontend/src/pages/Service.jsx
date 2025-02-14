import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function ServiceSection() {
  const [userType, setUserType] = useState('patient');

  return (
    <div className="bg-white text-green-600 p-6 md:p-10 min-h-screen mt-10">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Our Services</h2>

      {/* User Type Toggle Buttons */}
      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setUserType('patient')}
          className={`px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
            userType === 'patient'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-green-600 hover:bg-green-50'
          }`}
        >
          Patient
        </button>
        <button
          onClick={() => setUserType('doctor')}
          className={`px-6 py-3 rounded-full text-sm md:text-base font-semibold transition-all duration-300 ${
            userType === 'doctor'
              ? 'bg-green-600 text-white shadow-lg'
              : 'bg-gray-100 text-green-600 hover:bg-green-50'
          }`}
        >
          Doctor
        </button>
      </div>

      {/* Patient Services */}
      {userType === 'patient' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Doctors List</h3>
            <p className="text-gray-600 mb-4">Contact with doctor you select.</p>
            <Link to={'/doctors-list'}><button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Get Doctors Details
            </button></Link>
          </div>
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Symptom Tracking</h3>
            <p className="text-gray-600 mb-4">Track and monitor your symptoms daily.</p>
            <Link to={'/symptom'}><button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Go To It!
            </button></Link>
          </div>
        </div>
      )}

      {/* Doctor Services */}
      {userType === 'doctor' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">View Appointments</h3>
            <p className="text-gray-600 mb-4">Check your upcoming appointments.</p>
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              View Now
            </button>
          </div>
        </div>
      )}

      {/* Additional Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Chatbot</h3>
          <p className="text-gray-600 mb-4">Get instant help from our AI-powered chatbot.</p>
          <Link to="/chatbot">
            <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Chat Now
            </button>
          </Link>
        </div>
        <Link to="/activities">
          <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <h3 className="text-xl font-semibold mb-4">Activity</h3>
            <p className="text-gray-600 mb-4">Watch health-related videos and read articles.</p>
            <Link to={'/activities'}><button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
              Go To It!
            </button></Link>
          </div>
          
        </Link>
        <div className="p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <h3 className="text-xl font-semibold mb-4">Document Storage</h3>
          <p className="text-gray-600 mb-4">Securely store and access your medical documents.</p>
         <Link to={'/docUpload'}> <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors">
            Upload
          </button></Link>
        </div>
      </div>
    </div>
  );
}
