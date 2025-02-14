import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const createToken = (id)=>{
    return jwt.sign({id} , process.env.JWT_SECRET)
}
// Register a new patient
export const registerPatient = async (req, res) => {
  try {
    const { name, email, password, age, gender } = req.body;

    // Check if the email is already in use
    const existingPatient = await Patient.findOne({ email });
    if (existingPatient) {
      return res.status(400).json({ message: "Email already in use." });
    }

    // Hash password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new patient
    const newPatient = new Patient({ 
      name, 
      email, 
      password: hashedPassword, 
      age, 
      gender,
      role: "patient" // Default role
    });

    await newPatient.save();

    res.status(201).json({ message: "Patient registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};



export const loginPatient = async (req, res) => {
    try {
        const { email, password } = req.body;
  
        console.log("Login Attempt:", email);

        // Find patient by email
        const patient = await Patient.findOne({ email });

        if (!patient) {
            console.log("User not found with email:", email);
            return res.status(400).json({ message: "Invalid email or password." });
        }

        console.log("Found Patient:", patient); // Log to debug

        if (!patient.password) {
            console.error("Error: Patient record has no password!");
            return res.status(500).json({ message: "Account error. Please contact support." });
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, patient.password);
        console.log("Password Match:", isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password." });
        }

        // Generate JWT token
        const token = createToken(patient._id);

        console.log("Login Successful for:", email);

        res.status(200).json({
            token,
            user: { id: patient._id, name: patient.name, email: patient.email, role: patient.role },
        });
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error.", error: error.message });
    }
};


// Get patient profile (Protected Route)
export const getPatientProfile = async (req, res) => {
  try {
    const patient = await Patient.findById(req.user.id).select("-password"); // Exclude password
    if (!patient) {
      return res.status(404).json({ message: "Patient not found." });
    }
    res.status(200).json(patient);
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};
