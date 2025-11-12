import React, { useState } from "react";
import { useCourses } from "../context/CourseContext";
import { BookOpen, PlusCircle, CheckCircle } from "lucide-react";

const TeacherQuizPage = () => {
  const { myTeachingCourses, addQuiz } = useCourses();

  const [selectedCourse, setSelectedCourse] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
    explanation: "",
  });
  const [feedback, setFeedback] = useState("");

  // ✅ Add a question
  const handleAddQuestion = () => {
    const { question, options, answer, explanation } = currentQuestion;

    if (!question.trim() || options.some((opt) => !opt.trim()) || !answer.trim()) {
      setFeedback("⚠️ Please fill all fields before adding the question.");
      return;
    }

    setQuestions((prev) => [...prev, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
      explanation: "",
    });
    setFeedback("✅ Question added successfully!");
    setTimeout(() => setFeedback(""), 2000);
  };

  // ✅ Create the full quiz and store in shared context
  const handleCreateQuiz = () => {
    if (!selectedCourse || !quizTitle.trim() || questions.length === 0) {
      setFeedback("⚠️ Please fill all quiz details before creating.");
      return;
    }

    const newQuiz = {
      title: quizTitle,
      courseId: selectedCourse,
      questions,
    };

    const res = addQuiz(newQuiz);
    if (res.ok) {
      setQuizTitle("");
      setQuestions([]);
      setSelectedCourse("");
      setFeedback("🎉 Quiz created successfully!");
      setTimeout(() => setFeedback(""), 2000);
    } else {
      setFeedback("❌ Could not create quiz");
    }
  };

  return (
    <div className="p-6 animate-fadeIn min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <BookOpen className="w-7 h-7 mr-3 text-purple-600" />
        Create a New Quiz
      </h1>

      {/* Select Course */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <label className="block mb-2 font-semibold text-gray-700">Select Course:</label>
        <select
          value={selectedCourse}
          onChange={(e) => setSelectedCourse(e.target.value)}
          className="w-full border border-gray-300 rounded-xl p-3 focus:border-purple-600"
        >
          <option value="">-- Choose a course --</option>
          {myTeachingCourses.map((course) => (
            <option key={course.id} value={course.id}>
              {course.title}
            </option>
          ))}
        </select>

        <label className="block mt-4 mb-2 font-semibold text-gray-700">Quiz Title:</label>
        <input
          type="text"
          value={quizTitle}
          onChange={(e) => setQuizTitle(e.target.value)}
          placeholder="Enter quiz title"
          className="w-full border border-gray-300 rounded-xl p-3 focus:border-purple-600"
        />
      </div>

      {/* Add Question */}
      <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <PlusCircle className="w-6 h-6 mr-2 text-purple-600" />
          Add Question
        </h2>

        <label className="block mb-2 font-semibold text-gray-700">Question:</label>
        <input
          type="text"
          value={currentQuestion.question}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, question: e.target.value })
          }
          placeholder="Enter your question"
          className="w-full border border-gray-300 rounded-xl p-3 mb-4 focus:border-purple-600"
        />

        {currentQuestion.options.map((opt, i) => (
          <div key={i} className="mb-3">
            <label className="text-sm font-medium text-gray-600">
              Option {String.fromCharCode(65 + i)}:
            </label>
            <input
              type="text"
              value={opt}
              onChange={(e) => {
                const updated = [...currentQuestion.options];
                updated[i] = e.target.value;
                setCurrentQuestion({ ...currentQuestion, options: updated });
              }}
              placeholder={`Enter option ${String.fromCharCode(65 + i)}`}
              className="w-full border border-gray-300 rounded-xl p-2 mt-1 focus:border-purple-600"
            />
          </div>
        ))}

        <label className="block mt-3 mb-2 font-semibold text-gray-700">
          Correct Answer:
        </label>
        <input
          type="text"
          value={currentQuestion.answer}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, answer: e.target.value })
          }
          placeholder="Enter the correct answer (must match one option exactly)"
          className="w-full border border-gray-300 rounded-xl p-3 focus:border-purple-600"
        />

        <label className="block mt-4 mb-2 font-semibold text-gray-700">
          Explanation (why this answer is correct):
        </label>
        <textarea
          value={currentQuestion.explanation}
          onChange={(e) =>
            setCurrentQuestion({ ...currentQuestion, explanation: e.target.value })
          }
          placeholder="Provide an explanation for the correct answer"
          className="w-full border border-gray-300 rounded-xl p-3 h-24 focus:border-purple-600"
        ></textarea>

        <button
          onClick={handleAddQuestion}
          className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:scale-[1.02] transition"
        >
          Add Question
        </button>

        {feedback && (
          <div className="mt-3 text-sm text-green-600 font-medium">{feedback}</div>
        )}
      </div>

      {/* Added Questions Preview */}
      {questions.length > 0 && (
        <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
          <h3 className="font-bold text-gray-800 mb-4 flex items-center">
            <CheckCircle className="w-6 h-6 mr-2 text-green-500" />
            Added Questions
          </h3>
          <div className="space-y-4">
            {questions.map((q, index) => (
              <div key={index} className="border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-800">
                  Q{index + 1}. {q.question}
                </p>
                <ul className="ml-5 mt-2 list-disc text-sm text-gray-600">
                  {q.options.map((opt, i) => (
                    <li key={i}>{opt}</li>
                  ))}
                </ul>
                <p className="text-sm text-green-600 mt-2">
                  ✅ Correct: {q.answer}
                </p>
                <p className="text-sm text-gray-500 italic mt-1">
                  💡 Explanation: {q.explanation}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Final Create Button */}
      <div className="text-center mt-6">
        <button
          onClick={handleCreateQuiz}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-2xl font-bold hover:scale-[1.03] transition"
        >
          Create Quiz
        </button>
      </div>
    </div>
  );
};

export default TeacherQuizPage;
