import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';

const baseURL = import.meta.env.VITE_API_URL;

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [files, setFiles] = useState([]);
  const [aiOutput, setAiOutput] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  // Add missing state variables
  const [summary, setSummary] = useState("");
  const [command, setCommand] = useState("");
  const [newFiles, setNewFiles] = useState([]); // For AI form files

  useEffect(() => {
    const fetchCase = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/case/${caseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCaseData(res.data.patient || res.data.case);
        setFiles(res.data.patient?.files || []);
        setAiOutput(res.data.patient?.aiOutput || null);

        // Pre-fill summary with existing case data
        if (res.data.patient?.summary) {
          setSummary(res.data.patient.summary);
        }
      } catch (err) {
        setError("Failed to load case details.");
      }
    };
    fetchCase();
  }, [caseId, token]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  // For AI form file selection
  const handleNewFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
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
      window.location.reload();
    } catch (err) {
      setError("File upload failed.");
    }
  };
  //Delete the files
  const handleDeleteFile = async (fileId) => {
    try {
      await axios.delete(
        `${baseURL}/case/${caseId}/files/${fileId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Remove the file from UI
      setFiles(files.filter(f => f._id !== fileId));
    } catch (err) {
      setError("Failed to delete file.");
    }
  };

  // --- AI Agent Integration ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const formData = new FormData();

    if (summary) formData.append("summary", summary);
    if (command) formData.append("command", command);

    // Add new files from AI form
    newFiles.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const res = await axios.post(
        `${baseURL}/api/ai/process-case`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setAiOutput(res.data);
    } catch (err) {
      setError("AI processing failed: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Patient Case Details</h2>
      {error && <div className="text-red-500">{error}</div>}

      {caseData && (
        <div className="mb-6">
          <div><strong>Patient ID:</strong> {caseData.patientId}</div>
          <div><strong>Summary:</strong> {caseData.summary}</div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="font-semibold mb-2">Uploaded Files</h3>
        <ul className="list-disc pl-5">
          {files.map((file) => (
            <li key={file._id} className="mb-1">
              <a
                href={`${baseURL}/${file.path}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                {file.originalName}
              </a>
              <button
                onClick={() => handleDeleteFile(file._id)}
                className="text-red-600 hover:underline"
                title="Delete file"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        <form onSubmit={handleFileUpload} className="mt-4 flex items-center">
          <input
            type="file"
            onChange={handleFileChange}
            className="flex-grow"
          />
          <button
            type="submit"
            className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add to Case
          </button>
        </form>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-bold mb-4">AI Analysis Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Case Summary:</label>
            <textarea
              placeholder="Update or add to the case summary"
              value={summary}
              onChange={e => setSummary(e.target.value)}
              className="w-full border rounded px-3 py-2 min-h-[100px]"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Upload Additional Files:</label>
            <input
              type="file"
              multiple
              onChange={handleNewFileChange}
              className="w-full"
              accept=".csv,.pdf,.jpg,.jpeg,.png,.dcm"
            />
            <p className="text-sm text-gray-500 mt-1">
              Lab reports or images for AI analysis
            </p>
          </div>

          <div>
            <label className="block mb-1 font-medium">AI Command:</label>
            <input
              type="text"
              placeholder="e.g., 'Show yesterday's CBC for patient 12345'"
              value={command}
              onChange={e => setCommand(e.target.value)}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
          >
            Process with AI
          </button>
        </form>
      </div>

      {aiOutput && (
        <div className="mt-8">
          <h3 className="text-xl font-bold mb-3">AI Results</h3>
          <div className="bg-white border rounded-lg p-4">
            <JsonView
              data={aiOutput}
              style={defaultStyles}
              shouldinitiallyexpand={(level) => level < 1}
            />
          </div>

          <div className="mt-4 flex space-x-3">
            <button className="bg-green-500 text-white px-4 py-2 rounded flex items-center">
              <span className="mr-1">👍</span> Helpful
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded flex items-center">
              <span className="mr-1">👎</span> Not Helpful
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CaseDetails;
