import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await axios.post(
        `${baseURL}/api/user/login`,
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
      localStorage.setItem("token", res.data.token);
      if (onLogin) onLogin(res.data.token);
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#c3a2c5] to-purple-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#754579] mb-2">Welcome Back</h2>
          <p className="text-[#9f5fa5]">Please sign in to your account</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
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
              placeholder="Enter your password"
              className="w-full px-4 py-3 border-2 border-[#b57aba] rounded-lg focus:border-[#9e60a4] focus:outline-none transition-colors duration-200"
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
          
          <button
            type="submit"
            className="w-full bg-[#754579] hover:bg-[#452947] text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200 transform hover:scale-105 cursor-pointer"
          >
            Sign In
          </button>
        </form>
        
        <div className="mt-6 text-center">
          <p className="text-[#b063b7]">
            Don't have an account?{" "}
            <button
              onClick={handleRegisterClick}
              className="text-[#754579] font-semibold hover:text-[#3a1c3d] underline transition-colors duration-200 cursor-pointer"
            >
              Sign up here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;