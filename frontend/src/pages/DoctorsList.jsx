import React from "react";
import { motion } from "framer-motion";

const DoctorsList = () => {
  // Sample data for doctors with Indian names
  const doctors = [
    {
      id: 1,
      name: "Dr. Rajesh Sharma",
      specialization: "Cardiologist",
      experience: "12 years",
      location: "Delhi, India",
      image: "https://www.shutterstock.com/image-vector/male-doctors-white-medical-coats-600nw-2380152965.jpg",
      bio: "Dr. Rajesh Sharma is a renowned cardiologist with expertise in heart surgeries and preventive cardiology.",
      email: "rajesh.sharma@example.com",
      contact: "+91 9876543210",
    },
    {
      id: 2,
      name: "Dr. Priya Singh",
      specialization: "Dermatologist",
      experience: "9 years",
      location: "Mumbai, India",
      image: "https://img.freepik.com/premium-vector/simple-female-doctor-cartoon-vector-art-illustration_1048368-431.jpg",
      bio: "Dr. Priya Singh specializes in skin treatments, acne solutions, and cosmetic dermatology. You can contact me for skin related problems  ",
      email: "priya.singh@example.com",
      contact: "+91 9876543211",
    },
    {
      id: 3,
      name: "Dr. Anil Kumar",
      specialization: "Orthopedic Surgeon",
      experience: "15 years",
      location: "Bangalore, India",
      image: "https://www.shutterstock.com/image-vector/male-doctors-white-medical-coats-600nw-2380152965.jpg",
      bio: "Dr. Anil Kumar is an expert in joint replacement, sports injuries, and spinal surgeries.",
      email: "anil.kumar@example.com",
      contact: "+91 9876543212",
    },
    {
      id: 4,
      name: "Dr. Sunita Reddy",
      specialization: "Pediatrician",
      experience: "10 years",
      location: "Hyderabad, India",
      image: "https://img.freepik.com/premium-vector/simple-female-doctor-cartoon-vector-art-illustration_1048368-431.jpg",
      bio: "Dr. Sunita Reddy provides compassionate care for children, specializing in neonatal and adolescent health.",
      email: "sunita.reddy@example.com",
      contact: "+91 9876543213",
    },
    {
      id: 5,
      name: "Dr. Vikram Patel",
      specialization: "Neurologist",
      experience: "14 years",
      location: "Ahmedabad, India",
      image: "https://www.shutterstock.com/image-vector/male-doctors-white-medical-coats-600nw-2380152965.jpg",
      bio: "Dr. Vikram Patel is a leading neurologist with expertise in treating migraines, epilepsy, and stroke.",
      email: "vikram.petal@example.com",
      contact: "+91 9876543214",
    },
    {
      id: 6,
      name: "Dr. Meera Desai",
      specialization: "Gynecologist",
      experience: "11 years",
      location: "Pune, India",
      image: "https://img.freepik.com/premium-vector/simple-female-doctor-cartoon-vector-art-illustration_1048368-431.jpg",
      bio: "Dr. Meera Desai specializes in women's health, pregnancy care, and laparoscopic surgeries. Contact me for more...",
      email: "meera.desai@example.com",
      contact: "+91 9876543215",
    },
    {
      id: 7,
      name: "Dr. Arjun Mehta",
      specialization: "Oncologist",
      experience: "13 years",
      location: "Chennai, India",
      image: "https://www.shutterstock.com/image-vector/male-doctors-white-medical-coats-600nw-2380152965.jpg",
      bio: "Dr. Arjun Mehta is an oncologist with expertise in chemotherapy, radiation therapy, and cancer research.",
      email: "arjun.mehta@example.com",
      contact: "+91 9876543216",
    },
    {
      id: 8,
      name: "Dr. Kavita Joshi",
      specialization: "Psychiatrist",
      experience: "8 years",
      location: "Kolkata, India",
      image: "https://img.freepik.com/premium-vector/simple-female-doctor-cartoon-vector-art-illustration_1048368-431.jpg",
      bio: "Dr. Kavita Joshi provides mental health care, specializing in anxiety, depression, and stress management.",
      email: "kavita.joshi@example.com",
      contact: "+91 9876543217",
    },
  ];

  // Animation variants for cards
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="bg-gray-100 p-6 md:p-10 mt-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 text-green-600">
        Meet Our Doctors
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
          >
            <img
              src={doctor.image}
              alt={doctor.name}
              className="w-full h-fit object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {doctor.name}
              </h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Specialization:</span>{" "}
                {doctor.specialization}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Experience:</span>{" "}
                {doctor.experience}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Location:</span> {doctor.location}
              </p>
              <p className="text-gray-600 text-sm mb-1">{doctor.bio}</p>
              <p className="text-gray-600 text-sm mb-1">
                <span className="font-medium">Email:</span> {doctor.email}
              </p>
              <p className="text-gray-600 text-sm mb-4">
                <span className="font-medium">Contact:</span> {doctor.contact}
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                Contact Me!
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;