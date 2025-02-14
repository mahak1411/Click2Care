import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DocumentUpload() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [prescriptions, setPrescriptions] = useState([]);
  const [documentName, setDocumentName] = useState("");
  const [loading, setLoading] = useState(false);

  const API_URL = "https://click2care.onrender.com/api/storage"; // Backend API URL

  // Fetch prescriptions on component mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login"); // Redirect if not authenticated
    } else {
      fetchPrescriptions();
    }
    // Added empty dependencies array to avoid repeated calls
  }, [navigate]);

  // Fetch prescriptions from backend
  const fetchPrescriptions = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPrescriptions(response.data);
    } catch (error) {
      console.error("Error fetching prescriptions:", error.response?.data);
    }
  };

  // Handle file upload
  const handleUpload = async () => {
    if (!file || !documentName) {
      alert("Please select a file and enter document name");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("documentName", documentName);

    try {
      const token = localStorage.getItem("token");
      await axios.post(`${API_URL}/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Prescription uploaded successfully!");
      fetchPrescriptions(); // Refresh list
    } catch (error) {
      console.error("Upload Error:", error.response?.data);
      alert("Upload failed!");
    } finally {
      setLoading(false);
      setFile(null);
      setDocumentName("");
    }
  };

  return (
    <div className="bg-green-50 min-h-screen p-6 md:p-10 mt-5">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-green-600">Upload Prescription</h2>

        {/* Upload Section */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold mb-2">Document Name</label>
          <input
            type="text"
            placeholder="Enter document name"
            value={documentName}
            onChange={(e) => setDocumentName(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-semibold mb-2">Upload File</label>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <button
          onClick={handleUpload}
          disabled={loading}
          className={`w-full bg-green-600 text-white py-3 rounded-lg shadow-lg transition-all duration-300 ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {/* Display Uploaded Prescriptions */}
        <h3 className="text-xl font-bold text-center mt-10 mb-4 text-green-600">Uploaded Prescriptions</h3>
        <div className="bg-gray-100 p-4 rounded-lg shadow-inner">
          {prescriptions.length === 0 ? (
            <p className="text-gray-500 text-center">No prescriptions uploaded yet.</p>
          ) : (
            prescriptions.map((prescription) => (
              <div key={prescription._id} className="mb-4 p-4 bg-white border border-gray-200 rounded-lg shadow-sm">
                <p className="font-semibold text-green-600">{prescription.documentName}</p>
                {prescription.prescriptionUrl.endsWith(".pdf") ? (
                  <a
                    href={prescription.prescriptionUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View PDF
                  </a>
                ) : (
                  <a href={prescription.prescriptionUrl} target="_blank" rel="noopener noreferrer">
                    <img
                      src={prescription.prescriptionUrl}
                      alt={prescription.documentName}
                      className="w-24 h-24 object-cover mt-2 rounded-lg hover:shadow-lg transition-shadow"
                    />
                  </a>
                )}
                <p>{new Date(prescription.uploadedAt).toLocaleDateString()}</p> {/* Format date */}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
