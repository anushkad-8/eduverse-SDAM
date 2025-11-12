// src/context/AuthContext.js
import React, { createContext, useContext, useState } from "react";

/**
 * AuthContext
 * - Mock frontend-only auth for design/demo
 * - Exposes: currentUser, loginByEmail, loginAs, logout
 *
 * NOTE: Keep mockUsers in sync with CourseContext (teacher ids).
 */

const AuthContext = createContext();

const mockUsers = [
  { id: "teacher1", name: "Dr. Sarah Johnson", email: "sarah@eduverse.com", role: "teacher" },
  { id: "teacher2", name: "Prof. Amit Desai", email: "amit@eduverse.com", role: "teacher" },
  { id: "student1", name: "Anushka Dabhade", email: "anushka@eduverse.com", role: "student" },
  { id: "student2", name: "Niharika Deshmukh", email: "niharika@eduverse.com", role: "student" },
  { id: "admin1", name: "Admin", email: "admin@eduverse.com", role: "admin" }
];

export const AuthProvider = ({ children }) => {
  // currentUser: { id, name, email, role } or null
  const [currentUser, setCurrentUser] = useState(null);

  // Login by email (mock). If not found, create a guest student.
  const loginByEmail = (email) => {
    const user = mockUsers.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (user) {
      setCurrentUser(user);
      return { ok: true, user };
    }
    // create a simple guest student (for demo)
    const guest = {
      id: "student_guest_" + Date.now(),
      name: "Guest Student",
      email,
      role: "student"
    };
    setCurrentUser(guest);
    return { ok: true, user: guest };
  };

  // Direct login helper (e.g. pick role from a dropdown in UI)
  const loginAs = (roleOrId) => {
    // If roleOrId matches id, return that user
    const byId = mockUsers.find((u) => u.id === roleOrId);
    if (byId) {
      setCurrentUser(byId);
      return { ok: true, user: byId };
    }
    // If passed 'teacher' or 'student' or 'admin', pick first user of that role
    const byRole = mockUsers.find((u) => u.role === roleOrId);
    if (byRole) {
      setCurrentUser(byRole);
      return { ok: true, user: byRole };
    }
    return { ok: false, message: "No user found" };
  };

  const logout = () => setCurrentUser(null);

  return (
    <AuthContext.Provider value={{ currentUser, loginByEmail, loginAs, logout, mockUsers }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
