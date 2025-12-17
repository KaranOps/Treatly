import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from './pages/LandingPage';
import Login from './pages/login'
import Signup from './pages/register'
import Dashboard from './pages/dashboard';
import CaseDetails from "./pages/caseDetails";
import AddOrUpdateCase from "./components/addOrUpdateCase";
import PrivateRoute from "./components/PrivateRoute";

import { Github } from 'lucide-react';

const App = () => {
  return (
    <BrowserRouter>
      {/* Global GitHub Floating Button */}
      <a
        href="https://github.com/KaranOps/Treatly"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-white p-3 rounded-full shadow-lg border border-purple-100 text-[#754579] hover:scale-110 hover:shadow-purple-200 transition-all duration-300 flex items-center justify-center"
        aria-label="View on GitHub"
      >
        <Github className="w-6 h-6" />
      </a>

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* Protected routes */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/cases/new"
          element={
            <PrivateRoute>
              <AddOrUpdateCase />
            </PrivateRoute>
          }
        />
        <Route
          path="/cases/:caseId"
          element={
            <PrivateRoute>
              <CaseDetails />
            </PrivateRoute>
          }
        />
        {/* Add more protected routes as needed */}
      </Routes>
    </BrowserRouter>
  )
}

export default App
