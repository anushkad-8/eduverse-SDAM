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
  },
  {
    id: "C102",
    title: "Web Development Basics",
    description: "HTML, CSS, JS and basic project structure.",
    teacherId: "teacher2",
    instructor: "Prof. Amit Desai",
    students: [],
    published: true,
  },
];

// ✅ Sample quiz
const initialQuizzes = [
  {
    id: "QZ1001",
    title: "Intro Quiz (sample)",
    courseId: "C101",
    questions: [
      {
        question: "What is AI?",
        options: [
          "Artificial Intelligence",
          "Automated Input",
          "Applied Informatics",
          "None of these",
        ],
        answer: "Artificial Intelligence",
        explanation:
          "AI means Artificial Intelligence — machines performing tasks requiring human-like intelligence.",
      },
    ],
  },
];

export const CourseProvider = ({ children }) => {
  const { currentUser } = useAuth();

  // ✅ Persistent Course Data
  const [courses, setCourses] = useState(() => {
    const stored = localStorage.getItem("eduverse_courses");
    return stored ? JSON.parse(stored) : initialCourses;
  });

  useEffect(() => {
    localStorage.setItem("eduverse_courses", JSON.stringify(courses));
  }, [courses]);

  // ✅ Persistent Quiz Data
  const [quizzes, setQuizzes] = useState(() => {
    const stored = localStorage.getItem("eduverse_quizzes");
    return stored ? JSON.parse(stored) : initialQuizzes;
  });

  useEffect(() => {
    localStorage.setItem("eduverse_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  // ===============================
  // COURSE LOGIC
  // ===============================

  const generateCourseId = (title = "") =>
    `${title.replace(/\s+/g, "").toUpperCase().slice(0, 4)}${Math.floor(
      Math.random() * 9000
    ) + 1000}`;

  const createCourse = ({ title, description, published = true }) => {
    if (!currentUser || currentUser.role !== "teacher")
      return { ok: false, message: "Only teachers can create courses" };

    const newCourse = {
      id: generateCourseId(title),
      title,
      description,
      teacherId: currentUser.id,
      instructor: currentUser.name,
      students: [],
      published,
    };

    setCourses((prev) => [newCourse, ...prev]);
    return { ok: true, course: newCourse };
  };

  const joinCourse = (courseId) => {
    if (!currentUser || currentUser.role !== "student")
      return { ok: false, message: "Only students can join courses" };

    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId && !c.students.includes(currentUser.id)
          ? { ...c, students: [...c.students, currentUser.id] }
          : c
      )
    );
    return { ok: true };
  };

  const leaveCourse = (courseId) => {
    if (!currentUser) return { ok: false };
    setCourses((prev) =>
      prev.map((c) =>
        c.id === courseId
          ? { ...c, students: c.students.filter((s) => s !== currentUser.id) }
          : c
      )
    );
    return { ok: true };
  };

  // Derived lists
  const publishedCourses = useMemo(
    () => courses.filter((c) => c.published),
    [courses]
  );
  const myTeachingCourses = useMemo(
    () =>
      currentUser?.role === "teacher"
        ? courses.filter((c) => c.teacherId === currentUser.id)
        : [],
    [courses, currentUser]
  );
  const myEnrolledCourses = useMemo(
    () =>
      currentUser?.role === "student"
        ? courses.filter((c) => c.students.includes(currentUser.id))
        : [],
    [courses, currentUser]
  );

  // ===============================
  // QUIZ LOGIC (Shared)
  // ===============================

  const addQuiz = (quiz) => {
    const newQuiz = {
      ...quiz,
      id: `QZ${Math.floor(Math.random() * 90000)}`,
      teacherId: currentUser?.id || "unknown",
    };
    setQuizzes((prev) => [newQuiz, ...prev]);
    return { ok: true, quiz: newQuiz };
  };

  const getQuizzes = () => quizzes;

  const getQuizzesByCourse = (courseId) =>
    quizzes.filter((q) => q.courseId === courseId);

  // ===============================
  // PROVIDER VALUE
  // ===============================

  return (
    <CourseContext.Provider
      value={{
        // Course Data
        courses,
        publishedCourses,
        myTeachingCourses,
        myEnrolledCourses,
        createCourse,
        joinCourse,
        leaveCourse,
        // Quiz Data
        quizzes,
        addQuiz,
        getQuizzes,
        getQuizzesByCourse,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
};

export const useCourses = () => useContext(CourseContext);
