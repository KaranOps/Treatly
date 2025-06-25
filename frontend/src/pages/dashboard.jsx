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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">All Patient Cases</h2>
      {error && <div className="text-red-500">{error}</div>}
      <table className="min-w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Patient ID</th>
            <th className="border px-2 py-1">Summary</th>
            <th className="border px-2 py-1">Actions</th>
          </tr>
        </thead>
        <tbody>
          {cases.map((c) => (
            <tr key={c._id}>
              <td className="border px-2 py-1">{c.patientId}</td>
              <td className="border px-2 py-1">{c.summary}</td>
              <td className="border px-2 py-1">
                <Link to={`/cases/${c._id}`} className="text-blue-600 underline">
                  View / Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* Add a button to add a new case */}
      <Link to="/cases/new" className="mt-4 inline-block bg-green-600 text-white px-4 py-2 rounded">
        Add New Case
      </Link>
    </div>
  );
};

export default Dashboard;
