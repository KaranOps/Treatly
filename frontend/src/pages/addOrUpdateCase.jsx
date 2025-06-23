import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL; 

const addOrUpdateCase = () => {
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

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-xl font-bold mb-4">Add / Update Patient Case</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Patient ID"
          value={patientId}
          onChange={e => setPatientId(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
        <textarea
          placeholder="Case summary"
          value={summary}
          onChange={e => setSummary(e.target.value)}
          className="w-full border px-3 py-2"
          required
        />
        <input
          type="file"
          multiple
          onChange={handleFileChange}
          className="w-full"
          accept=".csv,.pdf,.jpg,.jpeg,.png,.dcm"
        />
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default addOrUpdateCase;
