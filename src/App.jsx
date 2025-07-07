import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "./Contexts";
import { TodoProvider, useTodo } from "./Contexts";
import { TodoItem, TodoForm, Login, SignUp, Navbar } from "./Components";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return <div className="flex items-center justify-center min-h-screen text-xl">Loading...</div>;
  return user ? children : <Navigate to="/login" />;
};

const TodoApp = () => {
  const { todos } = useTodo();
  return (
    <div className="bg-gradient-to-br from-blue-100 via-indigo-200 to-purple-200 min-h-screen py-8 flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-5xl">
        {/* Local image on the left (hidden on small screens) */}
        <div className="hidden md:flex flex-col items-center justify-center mr-8">
          <img
            src="/flat-lay-notebook-with-list-desk.jpg"
            alt="Notebook with List Desk"
            className="w-80 h-80 object-cover rounded-2xl shadow-xl select-none border border-white/60"
            draggable="false"
          />
        </div>
        {/* Main card on the right */}
        <div className="w-full max-w-2xl shadow-2xl rounded-3xl px-8 py-8 text-gray-900 bg-white/70 backdrop-blur-md border border-white/40 flex flex-col items-center">
          <h1 className="text-4xl font-extrabold text-center mb-10 mt-2 text-indigo-700 tracking-tight drop-shadow">Manage Your Todos</h1>
          <div className="mb-8 w-full">
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-4 w-full">
            {todos.length === 0 ? (
              <div className="w-full text-center text-gray-400 text-lg py-8">
                No tasks yet. Add your first task!
              </div>
            ) : (
              todos.map((todo) => (
                <div key={todo.id} className="w-full">
                  <TodoItem todo={todo} />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <TodoProvider>
                  <TodoApp />
                </TodoProvider>
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
