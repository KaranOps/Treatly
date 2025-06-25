import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL; 

const Dashboard = () => {
  const [cases, setCases] = useState([]);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCases = async () => {
      try {
        const res = await axios.get(`${baseURL}/api/cases`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCases(res.data.cases || res.data); 
      } catch (err) {
        setError("Failed to load cases.");
      }
    };
    fetchCases();
  }, [token]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-[#754579] rounded-lg shadow-lg p-4 md:p-6 mb-6 text-white">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">
            <div className="mb-4 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-bold">Dr. John Smith</h1>
              <p className="text-purple-100">City General Hospital</p>
            </div>
            <div className="text-right">
              <div className="text-2xl md:text-3xl font-bold">{cases.length}</div>
              <p className="text-purple-100">Total Patients</p>
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Cases Table */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-[#754579]">
              <tr>
                <th className="px-3 md:px-6 py-4 text-left text-sm font-semibold text-white border-b">
                  Patient ID
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-sm font-semibold text-white border-b">
                  Case Summary
                </th>
                <th className="px-3 md:px-6 py-4 text-left text-sm font-semibold text-white border-b">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {cases.map((c, index) => (
                <tr key={c._id} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="px-3 md:px-6 py-4 text-sm text-gray-900 border-b">
                    {c.patientId}
                  </td>
                  <td className="px-3 md:px-6 py-4 text-sm text-gray-700 border-b">
                    {c.summary}
                  </td>
                  <td className="px-3 md:px-6 py-4 text-sm border-b">
                    <Link 
                      to={`/cases/${c._id}`} 
                      className="text-white px-3 md:px-4 py-2 rounded-md text-sm font-medium transition-colors bg-[#5e2d62]"
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add New Case Button */}
        <div className="mt-6">
          <Link 
            to="/cases/new" 
            className="text-white px-4 md:px-6 py-3 rounded-md font-medium transition-colors inline-flex items-center bg-[#532f57] hover:bg-[#2f1b31]"
          >
            + Add New Case
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;