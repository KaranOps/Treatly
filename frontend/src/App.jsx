import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/login'
import Signup from './pages/register'
import Dashboard from './pages/dashboard';
import CaseDetails from "./pages/caseDetails";
import AddOrUpdateCase from "./components/addOrUpdateCase";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        {/* Protected routes */}
        <Route
          path="/"
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
