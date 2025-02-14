import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SymptomTracker() {
  const [formData, setFormData] = useState({
    mood: "",
    symptoms: "",
    notes: "",
    date: new Date().toISOString().split("T")[0],
  });

  const [entries, setEntries] = useState([]);
  const [patientId, setPatientId] = useState(null);
  const [moodSuggestions, setMoodSuggestions] = useState({}); // Store mood suggestions
  const [moodVideos, setMoodVideos] = useState({}); // Store mood videos
  const navigate = useNavigate();

  useEffect(() => {
    let storedPatientId = localStorage.getItem("patientId");

    if (!storedPatientId) {
      alert("Session expired! Please log in again.");
      navigate("/login");
      return;
    }

    storedPatientId = storedPatientId.replace(/^"|"$/g, "");
    setPatientId(storedPatientId);
    fetchSymptoms(storedPatientId);
  }, [navigate]);

  const fetchSymptoms = async (patientId) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.get(
        `https://click2care.onrender.com/api/symptoms/patient/${patientId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEntries(response.data);
    } catch (error) {
      console.error("Error fetching symptoms:", error.response?.data || error.message);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.mood || !formData.symptoms) {
      alert("Please fill in mood and symptoms fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      const response = await axios.post(
        `https://click2care.onrender.com/api/symptoms/add`,
        { ...formData, patient: patientId },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Add mood suggestions and videos to the new entry
      const newEntry = {
        ...response.data,
        moodSuggestion: moodSuggestions[formData.mood],
        moodVideo: moodVideos[formData.mood],
      };

      setEntries([newEntry, ...entries]);

      // Reset form data
      setFormData({
        mood: "",
        symptoms: "",
        notes: "",
        date: new Date().toISOString().split("T")[0],
      });

      alert("Symptom entry added successfully!");
    } catch (error) {
      console.error("Error adding symptom entry:", error.response?.data || error.message);
    }
  };

  const moods = ["Happy", "Sad", "Anxious", "Angry", "Neutral"];

  // Mood suggestions and videos
  const moodData = {
    Happy: {
      suggestion: "Great to hear! Keep up the positive energy. 😊",
      video: "https://www.youtube.com/watch?v=l9v9z8p2k-s",
    },
    Sad: {
      suggestion: "It's okay to feel sad. Consider talking to someone you trust. 💬",
      video: "https://youtu.be/BloutcYWbJg?si=xEcLBzEYiFmfahhB",
    },
    Anxious: {
      suggestion: "Take deep breaths and try to relax. Maybe some yoga might help. �",
      video: "https://youtu.be/WWloIAQpMcQ?si=6zHFzjoSPRMpPZGP",
    },
    Angry: {
      suggestion: "It's important to manage anger. Consider some physical activity to cool off. 🏃",
      video: "https://youtu.be/tV2Ecd7m6Tc?si=5EaNjM1d1Iu9zjD2",
    },
    Neutral: {
      suggestion: "It's a balanced mood. Keep going and maintain your routine. 👍",
      video: "https://www.youtube.com/watch?v=VSHXYKhnA8E",
    },
  };

  useEffect(() => {
    // Set mood suggestions and videos
    const suggestions = {};
    const videos = {};
    moods.forEach((mood) => {
      suggestions[mood] = moodData[mood].suggestion;
      videos[mood] = moodData[mood].video;
    });
    setMoodSuggestions(suggestions);
    setMoodVideos(videos);
  }, []);

  return patientId ? (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Symptom Tracker</h2>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg mb-6">
        <h2 className="text-xl font-bold mb-4">Add New Symptom Entry</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block font-semibold">Mood:</label>
            <select
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Select Mood</option>
              {moods.map((mood) => (
                <option key={mood} value={mood}>
                  {mood}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block font-semibold">Symptoms:</label>
            <input
              type="text"
              name="symptoms"
              value={formData.symptoms}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold">Notes (optional):</label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block font-semibold">Date:</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
          >
            Add Entry
          </button>
        </form>
      </div>

      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4">Previous Entries</h2>
        {entries.length > 0 ? (
          <ul>
            {entries.map((entry) => (
              <li key={entry._id} className="border-b p-3">
                <p><strong>Date:</strong> {entry.date}</p>
                <p><strong>Mood:</strong> {entry.mood}</p>
                <p><strong>Symptoms:</strong> {entry.symptoms}</p>
                <p><strong>Notes:</strong> {entry.notes}</p>
                {entry.moodSuggestion && (
                  <div className="bg-green-100 p-3 rounded-lg text-green-800 mt-2">
                    <p><strong>Suggestion:</strong> {entry.moodSuggestion}</p>
                    <a
                      href={entry.moodVideo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      Watch a helpful video 🎥
                    </a>
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <p>No entries yet.</p>
        )}
      </div>
    </div>
  ) : null;
}