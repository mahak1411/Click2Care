import Symptom from "../models/Symptom.js";
import Patient from "../models/Patient.js"; // Assuming you have a Patient model

// ✅ Create a new symptom entry for a patient
import mongoose from "mongoose";

export const createSymptom = async (req, res) => {
  try {
    const { patient, date, mood, symptoms, notes } = req.body;

    // Validate if patient is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(patient)) {
      return res.status(400).json({ error: "Invalid patient ID format" });
    }

    // Ensure the patient exists
    const existingPatient = await Patient.findById(patient);
    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const newSymptom = new Symptom({
      patient,
      date,
      mood,
      symptoms,
      notes,
    });

    await newSymptom.save();
    res.status(201).json(newSymptom);
  } catch (error) {
    console.error("❌ Error in createSymptom:", error);
    res.status(500).json({ error: error.message });
  }
};


// ✅ Get all symptoms for a specific patient
export const getSymptomsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    // Check if patient exists
    const existingPatient = await Patient.findById(patientId);
    if (!existingPatient) {
      return res.status(404).json({ error: "Patient not found" });
    }

    const symptoms = await Symptom.find({ patient: patientId });
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Get all symptoms (for Admins/Doctors)
export const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find().populate("patient", "name age"); // Optional: Populate patient details
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Update a symptom entry
export const updateSymptom = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedSymptom = await Symptom.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedSymptom) {
      return res.status(404).json({ error: "Symptom not found" });
    }

    res.status(200).json(updatedSymptom);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ✅ Delete a symptom entry
export const deleteSymptom = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSymptom = await Symptom.findByIdAndDelete(id);

    if (!deletedSymptom) {
      return res.status(404).json({ error: "Symptom not found" });
    }

    res.status(200).json({ message: "Symptom entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
