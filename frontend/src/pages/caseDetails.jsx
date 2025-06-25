import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import 'react-json-view-lite/dist/index.css';

const baseURL = import.meta.env.VITE_API_URL;

// Import components
import PatientHeader from '../components/caseDetailComponents/patientHeader'
import ErrorAlert from '../components/caseDetailComponents/errorAlert'
import PatientInfoCard from '../components/caseDetailComponents/patientInfoCard'
import FileManagement from '../components/caseDetailComponents/fileManagement'
import AIAnalysisForm from '../components/caseDetailComponents/aIAnalysisForm'
import AIResults from '../components/caseDetailComponents/aIResults'

const CaseDetails = () => {
  const { caseId } = useParams();
  const [caseData, setCaseData] = useState(null);
  const [files, setFiles] = useState([]);
  const [aiOutput, setAiOutput] = useState(null);
  const [fileToUpload, setFileToUpload] = useState(null);
  const [error, setError] = useState("");
  const [summary, setSummary] = useState("");
  const [command, setCommand] = useState("");
  const [newFiles, setNewFiles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;
    
    const fetchCase = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${baseURL}/api/case/${caseId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        setCaseData(res.data.patient || res.data.case);
        setFiles(res.data.patient?.files || []);
        setAiOutput(res.data.patient?.aiOutput || null);

        if (res.data.patient?.summary) {
          setSummary(res.data.patient.summary);
        }
      } catch (err) {
        if (err.response?.status === 401 || err.response?.status === 403) {
        localStorage.removeItem("token");
        navigate('/login');
        return;
        }
        setError("Failed to load case details.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchCase();
  }, [caseId, token]);

  const handleFileChange = (e) => {
    setFileToUpload(e.target.files[0]);
  };

  const handleNewFileChange = (e) => {
    setNewFiles(Array.from(e.target.files));
  };

  const handleSaveSummary = async (newSummary) => {
  // API call to save summary to backend
  try {
    await axios.put(`${baseURL}/api/case/${caseId}/summary`, 
      { summary: newSummary },
      { headers: { Authorization: `Bearer ${token}` }}
    );
  } catch (err) {
    setError("Failed to save summary");
  }
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

  const handleDeleteFile = async (fileId, event) => {
    event.stopPropagation();
    if (window.confirm("Are you sure you want to delete this file?")) {
      try {
        await axios.delete(
          `${baseURL}/api/case/${caseId}/files/${fileId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setFiles(files.filter(f => f._id !== fileId));
      } catch (err) {
        console.error(err.message);
        setError("Failed to delete file.");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    
    const formData = new FormData();
    if (summary) formData.append("summary", summary);
    if (command) formData.append("command", command);

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
  const handleGoBack = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading patient case...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="mb-6">
          <button
            onClick={handleGoBack}
            className="flex items-center text-[#b46aba] hover:text-[#754579] font-medium transition-colors duration-200 cursor-pointer"
          >
            <span className="mr-2">←</span>
            Back to Dashboard
          </button>
        </div>
        <PatientHeader 
          caseData={caseData}
           />
        
        <ErrorAlert error={error} />
        
        {caseData && <PatientInfoCard 
          caseData={caseData}
          summary={summary}
          setSummary={setSummary}
          onSaveSummary={handleSaveSummary} />}
        
        <FileManagement 
          files={files}
          handleFileUpload={handleFileUpload}
          handleFileChange={handleFileChange}
          handleDeleteFile={handleDeleteFile}
          baseURL={baseURL}
        />
        
        <AIAnalysisForm 
          command={command}
          setCommand={setCommand}
          handleSubmit={handleSubmit}
        />
        
        {aiOutput && <AIResults aiOutput={aiOutput} />}
      </div>
    </div>
  );
};

export default CaseDetails;