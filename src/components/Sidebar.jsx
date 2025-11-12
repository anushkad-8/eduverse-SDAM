// src/components/Sidebar.js
import React, { useState } from "react";
import {
  Home,
  BookOpen,
  Target,
  Medal,
  MessageSquare,
  BarChart3,
  LogOut,
  HelpCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";
import ChatSupport from "./ChatSupport"; // ✅ Import ChatSupport component

/**
 * Sidebar - styled like original App.js
 */
const navTemplate = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "courses", label: "Courses", icon: BookOpen },
  { id: "quiz", label: "Quiz", icon: Target },
  { id: "leaderboard", label: "Leaderboard", icon: Medal },
  { id: "forum", label: "Forum", icon: MessageSquare },
];

const Sidebar = ({ currentPage, setCurrentPage, extraTeacher }) => {
  const { currentUser } = useAuth();
  const [showChat, setShowChat] = useState(false); // ✅ Added for toggling chat support

  const navItems =
    currentUser?.role === "teacher"
      ? [...navTemplate, { id: "analytics", label: "Analytics", icon: BarChart3 }]
      : navTemplate;

  return (
    <div className="w-64 bg-gradient-to-b from-purple-700 to-blue-700 text-white p-6 flex flex-col min-h-screen relative">
      {/* Top Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-white p-2 rounded-xl shadow-sm">
          <BookOpen className="w-7 h-7 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold">EduVerse</h1>
          <p className="text-xs opacity-75">
            {currentUser?.role === "teacher" ? "Teacher Portal" : "Student Portal"}
          </p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setCurrentPage(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                active
                  ? "bg-white text-purple-700"
                  : "text-white hover:bg-white hover:bg-opacity-10"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom Controls */}
      <div className="mt-4 space-y-2">
        <div className="flex items-center gap-2">
          {/* Reload Button */}
          <button
            onClick={() => window.location.reload()}
            className="flex-1 bg-white text-purple-700 py-2 rounded-xl font-semibold hover:shadow transition"
          >
            Reload
          </button>

          {/* Help Button */}
          <button
            onClick={() => setShowChat(!showChat)} // ✅ Toggle chatbox
            className="p-2 bg-white bg-opacity-10 rounded-xl hover:bg-white/20 transition"
          >
            <HelpCircle className="w-5 h-5" />
          </button>
        </div>

        {/* Logout Button */}
        <button
          onClick={() => window.location.reload()}
          className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>

      {/* ✅ Chat Support Component */}
      <ChatSupport isOpen={showChat} onClose={() => setShowChat(false)} />
    </div>
  );
};

export default Sidebar;
