import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/AuthContext";

const Navbar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-2xl font-bold text-indigo-700 tracking-tight">TaskList</Link>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <span className="text-gray-700 font-medium">{user.email}</span>
            <button
              onClick={handleLogout}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-indigo-600 font-semibold hover:underline">Login</Link>
            <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-indigo-700 transition">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 