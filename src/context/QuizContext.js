// src/context/QuizContext.js
import React, { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useAuth } from "./AuthContext";
import { useCourses } from "./CourseContext";

const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const { currentUser } = useAuth();
  const { courses } = useCourses();

  // Load from localStorage at startup
  const [quizzes, setQuizzes] = useState(() => {
    const saved = localStorage.getItem("eduverse_quizzes");
    return saved ? JSON.parse(saved) : [];
  });

  // Save to localStorage on change
  useEffect(() => {
    localStorage.setItem("eduverse_quizzes", JSON.stringify(quizzes));
  }, [quizzes]);

  const createQuiz = (quizData) => {
    if (!currentUser || currentUser.role !== "teacher") {
      return { ok: false, message: "Only teachers can create quizzes" };
    }

    const newQuiz = {
      id: "QZ" + Math.floor(Math.random() * 10000),
      title: quizData.title,
      courseId: quizData.courseId,
      questions: quizData.questions || [],
      createdAt: Date.now(),
      teacherId: currentUser.id,
    };

    setQuizzes((prev) => [newQuiz, ...prev]);
    return { ok: true, quiz: newQuiz };
  };

  const addQuestion = (quizId, question) => {
    setQuizzes((prev) =>
      prev.map((quiz) =>
        quiz.id === quizId
          ? { ...quiz, questions: [...quiz.questions, { id: Date.now(), ...question }] }
          : quiz
      )
    );
  };

  const courseQuizzes = useMemo(
    () => (courseId) => quizzes.filter((q) => q.courseId === courseId),
    [quizzes]
  );

  return (
    <QuizContext.Provider
      value={{
        quizzes,
        createQuiz,
        addQuestion,
        courseQuizzes,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuizzes = () => useContext(QuizContext);
