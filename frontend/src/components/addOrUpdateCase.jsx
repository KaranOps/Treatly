import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL; 

const AddOrUpdateCase = () => {
  const [patientId, setPatientId] = useState("");
  const [summary, setSummary] = useState("");
  const [files, setFiles] = useState([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("patientId", patientId);
    formData.append("summary", summary);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.post(
        `${baseURL}/api/case`, 
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/");
    } catch (err) {
      setError("Failed to create/update case.");
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c3a2c5] to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Back Button */}
        <div className="mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-[#b46aba] hover:text-[#754579] font-medium transition-colors duration-200 cursor-pointer"
          >
            <span className="mr-2">←</span>
            Back to Dashboard
          </button>
        </div>

        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#754579] mb-2">Patient Case</h2>
          <p className="text-[#af6cb5]">Add or update patient information</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#754579] mb-2">
              Patient ID
            </label>
            <input
              type="text"
              placeholder="Enter patient ID"
              value={patientId}
              onChange={e => setPatientId(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#856288] rounded-lg focus:border-[#856288] focus:outline-none transition-colors duration-200"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#754579] mb-2">
              Case Summary
            </label>
            <textarea
              placeholder="Enter case summary"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full px-4 py-3 border-2 border-[#856288]  rounded-lg focus:border-[#856288] focus:outline-none transition-colors duration-200 h-32 resize-none"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#754579] mb-2">
              Upload Files
            </label>
            <input
              type="file"
              multiple
              onChange={handleFileChange}
              className="w-full px-4 py-3 border-2 border-[#856288]  rounded-lg focus:border-[#856288] focus:outline-none transition-colors duration-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-purple-100 file:text-purple-700 hover:file:bg-[#856288]  "
              accept=".csv,.pdf,.jpg,.jpeg,.png,.dcm"
            />
            <p className="text-xs text-purple-600 mt-1">
              Accepted formats: CSV, PDF, JPG, PNG, DCM
            </p>
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-[#754579] hover:bg-[#4b2b4e] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 cursor-pointer transform hover:scale-105"
          >
            Submit Case
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddOrUpdateCase;