import React, { useState } from "react";
import { X, Plus } from "lucide-react";
import { useCourses } from "../context/CourseContext";
import { useQuizzes } from "../context/QuizContext";

const CreateQuizModal = ({ isOpen, onClose }) => {
  const { myTeachingCourses } = useCourses();
  const { createQuiz } = useQuizzes();

  const [quizData, setQuizData] = useState({
    title: "",
    courseId: "",
    questions: [],
  });
  const [currentQ, setCurrentQ] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  if (!isOpen) return null;

  const handleAddQuestion = () => {
    if (!currentQ.question || !currentQ.answer) return;
    setQuizData({
      ...quizData,
      questions: [...quizData.questions, currentQ],
    });
    setCurrentQ({ question: "", options: ["", "", "", ""], answer: "" });
  };

  const handleSaveQuiz = () => {
    if (quizData.title && quizData.courseId && quizData.questions.length > 0) {
      createQuiz(quizData);
      onClose();
    } else {
      alert("Please complete all fields.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl animate-slideUp relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500">
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-6">Create New Quiz</h2>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Quiz Title"
            className="w-full border-2 rounded-xl px-4 py-2"
            value={quizData.title}
            onChange={(e) => setQuizData({ ...quizData, title: e.target.value })}
          />

          <select
            className="w-full border-2 rounded-xl px-4 py-2"
            value={quizData.courseId}
            onChange={(e) => setQuizData({ ...quizData, courseId: e.target.value })}
          >
            <option value="">Select Course</option>
            {myTeachingCourses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>

          {/* Add Question Section */}
          <div className="border rounded-2xl p-4">
            <input
              type="text"
              placeholder="Question"
              className="w-full border-2 rounded-xl px-4 py-2 mb-2"
              value={currentQ.question}
              onChange={(e) => setCurrentQ({ ...currentQ, question: e.target.value })}
            />
            {currentQ.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                className="w-full border-2 rounded-xl px-4 py-2 mb-2"
                value={opt}
                onChange={(e) => {
                  const newOpts = [...currentQ.options];
                  newOpts[idx] = e.target.value;
                  setCurrentQ({ ...currentQ, options: newOpts });
                }}
              />
            ))}
            <input
              type="text"
              placeholder="Correct Answer"
              className="w-full border-2 rounded-xl px-4 py-2 mb-4"
              value={currentQ.answer}
              onChange={(e) => setCurrentQ({ ...currentQ, answer: e.target.value })}
            />
            <button
              onClick={handleAddQuestion}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl w-full"
            >
              <Plus className="w-5 h-5 inline mr-1" /> Add Question
            </button>
          </div>

          <button
            onClick={handleSaveQuiz}
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
          >
            Save Quiz
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateQuizModal;
