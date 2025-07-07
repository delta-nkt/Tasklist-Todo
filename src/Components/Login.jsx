import React, { useState } from "react";
import { useAuth } from "../Contexts/AuthContext";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const { signin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signin(email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-400 to-blue-400">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl">
        {/* Card on the left */}
        <div className="w-full max-w-md bg-white/90 p-10 rounded-3xl shadow-2xl flex flex-col items-center">
          <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700 drop-shadow">Sign In</h2>
          {error && <div className="mb-4 text-red-500 text-center font-medium">{error}</div>}
          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-900 shadow-sm transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="w-full px-5 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white text-gray-900 shadow-sm transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-xl font-bold text-lg shadow hover:from-indigo-700 hover:to-purple-700 transition"
            >
              Sign In
            </button>
          </form>
          <p className="mt-8 text-center text-gray-600 text-base">
            Don't have an account?{' '}
            <Link to="/signup" className="text-indigo-600 hover:underline font-semibold">Sign Up</Link>
          </p>
        </div>
        {/* Image on the right (hidden on mobile) */}
        <div className="hidden md:flex flex-col items-center justify-center ml-8">
          <img
            src="/794181_Preview.jpg"
            alt="Login Illustration"
            className="w-80 h-80 object-cover rounded-2xl shadow-xl select-none border border-white/60"
            draggable="false"
          />
        </div>
      </div>
    </div>
  );
};

export default Login; 