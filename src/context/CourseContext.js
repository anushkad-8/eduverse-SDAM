// src/context/CourseContext.js
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

const initialCourses = [
  {
    id: "C101",
    title: "Introduction to AI",
    description: "Foundations of AI, basic algorithms, and applications.",
    teacherId: "teacher1",
    instructor: "Dr. Sarah Johnson",
    students: ["student2"],
    published: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 7,
  },
  {
    id: "C102",
    title: "Web Development Basics",
    description: "HTML, CSS, JS and basic project structure.",
    teacherId: "teacher2",
    instructor: "Prof. Amit Desai",
    students: [],
    published: true,
    createdAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
  },
];

export const CourseProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // ✅ Load from localStorage if available
  const [courses, setCourses] = useState(() => {
    const saved = localStorage.getItem("eduverse_courses");
    return saved ? JSON.parse(saved) : initialCourses;
  });

  // ✅ Persist in localStorage whenever courses change
  useEffect(() => {
    localStorage.setItem("eduverse_courses", JSON.stringify(courses));
  }, [courses]);

  // 🔹 Helper to generate unique IDs
  const generateCourseId = (title = "") => {
    const t = title.replace(/\s+/g, "").toUpperCase().slice(0, 6);
    return `${t || "C"}${Math.floor(Math.random() * 9000) + 1000}`;
  };

  // 🔹 Create new course
  const createCourse = ({ title, description, published = true }) => {
    if (!currentUser || currentUser.role !== "teacher") {
      return { ok: false, message: "Only teachers can create courses" };
    }

    const newCourse = {
      id: generateCourseId(title),
      title,
      description: description || "",
      teacherId: currentUser.id,
      instructor: currentUser.name,
      students: [],
      published,
      createdAt: Date.now(),
    };

    setCourses((prev) => [newCourse, ...prev]);
    return { ok: true, course: newCourse };
  };

  // 🔹 Edit / Publish / Unpublish
  const editCourse = (id, updates = {}) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...updates } : c)));
    return { ok: true };
  };
  const publishCourse = (id) => editCourse(id, { published: true });
  const unpublishCourse = (id) => editCourse(id, { published: false });

  // 🔹 Student actions
  const joinCourse = (id) => {
    if (!currentUser || currentUser.role !== "student") {
      return { ok: false, message: "Only students can join courses" };
    }
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, students: c.students.includes(currentUser.id) ? c.students : [...c.students, currentUser.id] }
          : c
      )
    );
    return { ok: true };
  };

  const leaveCourse = (id) => {
    if (!currentUser) return { ok: false };
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, students: c.students.filter((s) => s !== currentUser.id) } : c
      )
    );
    return { ok: true };
  };

  const getCourseById = (id) => courses.find((c) => c.id === id) || null;

  // 🔹 Derived lists
  const publishedCourses = useMemo(() => courses.filter((c) => c.published), [courses]);
  const myTeachingCourses = useMemo(
    () => (currentUser ? courses.filter((c) => c.teacherId === currentUser.id) : []),
    [courses, currentUser]
  );
  const myEnrolledCourses = useMemo(
    () => (currentUser ? courses.filter((c) => c.students.includes(currentUser.id)) : []),
    [courses, currentUser]
  );

  return (
    <CourseContext.Provider
      value={{
        courses,
        publishedCourses,
        myTeachingCourses,
        myEnrolledCourses,
        createCourse,
        editCourse,
        publishCourse,
        unpublishCourse,
        joinCourse,
        leaveCourse,
        getCourseById,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
