// src/components/LoginForm.js
import React, { useState } from "react";
import { BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import FloatingParticles from "./FloatingParticles";

/**
 * Styled LoginForm that matches your original App.js look.
 * Uses useAuth().loginAs or loginByEmail from AuthContext.
 */
const LoginForm = () => {
  const { loginByEmail, loginAs, mockUsers } = useAuth();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("student");
  const [msg, setMsg] = useState(null);

  const handleQuick = (idOrRole) => {
    const res = loginAs(idOrRole);
    if (res.ok) setMsg(`Logged in as ${res.user.name} (${res.user.role})`);
    else setMsg("Login failed");
    setTimeout(() => setMsg(null), 1200);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) {
      setMsg("Enter email or use quick login");
      setTimeout(() => setMsg(null), 1200);
      return;
    }
    const res = loginByEmail(email.trim());
    if (res.ok) setMsg(`Logged in as ${res.user.name}`);
    setEmail("");
    setTimeout(() => setMsg(null), 1200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4 relative overflow-hidden">
      <FloatingParticles />

      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10 transform hover:scale-105 transition-transform">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl mb-4 animate-bounceIn">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">EduVerse</h1>
          <p className="text-gray-600">Learn. Play. Achieve.</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setRole("student")} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${role === "student" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
            Student
          </button>
          <button onClick={() => setRole("teacher")} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${role === "teacher" ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white" : "bg-gray-100 text-gray-600"}`}>
            Teacher
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="your.email@example.com" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors" />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors" />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all">
            Login to {role === "student" ? "Learn" : "Teach"}
          </button>
        </form>

        <div className="mt-5 text-sm text-gray-500">Or quick login:</div>
        <div className="mt-3 grid grid-cols-1 gap-2">
          {mockUsers.map((u) => (
            <button key={u.id} onClick={() => handleQuick(u.id)} className="w-full text-left px-4 py-2 bg-white border rounded hover:shadow-sm flex items-center justify-between">
              <div>
                <div className="font-medium">{u.name}</div>
                <div className="text-xs text-gray-500">{u.email} • {u.role}</div>
              </div>
              <div className="text-sm text-indigo-600">Use</div>
            </button>
          ))}
        </div>

        {msg && <div className="mt-4 p-2 rounded bg-green-50 text-green-700">{msg}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
