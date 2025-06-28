import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const baseURL = import.meta.env.VITE_API_URL;

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);
    try {
      const res = await axios.post(
        `${baseURL}/api/user/register`,
        { name, email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      setSuccess(true);
      localStorage.setItem("token", res.data.token);
      // Optionally redirect to login
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    }
  };

  const handleLoginClick = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c3a2c5] to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#754579] mb-2">Create Account</h2>
          <p className="text-[#9f5fa5]">Join us today and get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-[#754579] mb-2">
              Full Name
            </label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full px-4 py-3 border-2 border-[#b57aba] rounded-lg focus:border-[#b877be] focus:outline-none transition-colors duration-200"
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#754579] mb-2">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-3 border-2 border-[#b57aba] rounded-lg focus:border-[#b877be] focus:outline-none transition-colors duration-200"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-[#754579] mb-2">
              Password
            </label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full px-4 py-3 border-2 border-[#b57aba] rounded-lg focus:border-[#b877be] focus:outline-none transition-colors duration-200"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>
          
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {error}
            </div>
          )}
          
          {success && (
            <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg text-sm">
              Signup successful! You can now login.
            </div>
          )}
          
          <button
            type="submit"
            className="w-full bg-[#754579] hover:bg-[#48294b] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 cursor-pointer"
          >
            Create Account
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-purple-600">
            Already have an account?{" "}
            <button
              onClick={handleLoginClick}
              className="text-[#754579] font-semibold hover:text-purple-700 underline transition-colors duration-200 cursor-pointer"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;