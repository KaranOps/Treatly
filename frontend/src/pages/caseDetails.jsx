import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [files, setFiles] = useState([]);
  const [aiOutput, setAiOutput] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/case/${caseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCaseData(res.data.patient || res.data.case);
        setFiles(res.data.patient?.files || []);
        setAiOutput(res.data.patient?.aiOutput || null);
      } catch (err) {
        setError("Failed to load case details.");
      }
    };
    fetchCase();
  }, [caseId, token]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!fileToUpload) return;
    const formData = new FormData();
    formData.append("file", fileToUpload);
    try {
      await axios.post(
        `${baseURL}/api/case/${caseId}/files`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      window.location.reload(); // Or re-fetch files only
    } catch (err) {
      setError("File upload failed.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Patient Case Details</h2>
      {error && <div className="text-red-500">{error}</div>}
      {caseData && (
        <div>
          <div><strong>Patient ID:</strong> {caseData.patientId}</div>
          <div><strong>Summary:</strong> {caseData.summary}</div>
          {/* Add more metadata as needed */}
        </div>
      )}

      <h3 className="mt-6 font-semibold">Uploaded Files</h3>
      <ul>
        {files.map((file) => (
          <li key={file._id}>
            <a href={`${baseURL}/${file.path}`} target="_blank" rel="noopener noreferrer">
              {file.originalName}
            </a>
          </li>
        ))}
      </ul>

      <form onSubmit={handleFileUpload} className="mt-4">
        <input type="file" onChange={handleFileChange} />
        <button type="submit" className="ml-2 bg-blue-600 text-white px-4 py-1 rounded">Upload</button>
      </form>

      {aiOutput && (
        <div className="mt-6">
          <h3 className="font-semibold">AI Output</h3>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(aiOutput, null, 2)}</pre>
          {/* Show concise reply, confidence score, etc. */}
        </div>
      )}

      {/* Feedback buttons */}
      <div className="mt-4">
        <button className="mr-2 bg-green-500 text-white px-3 py-1 rounded">👍</button>
        <button className="bg-red-500 text-white px-3 py-1 rounded">👎</button>
      </div>
    </div>
  );
};

export default CaseDetails;
