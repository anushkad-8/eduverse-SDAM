// src/pages/QuizPage.jsx
import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import { useQuizzes } from "../context/QuizContext";
import { Trophy, Plus, X, Clock, CheckCircle } from "lucide-react";

const QuizPage = () => {
  const { currentUser } = useAuth();
  const { myTeachingCourses, myEnrolledCourses } = useCourses();
  const { quizzes, createQuiz } = useQuizzes();

  // For teacher quiz creation
  const [showModal, setShowModal] = useState(false);
  const [quizTitle, setQuizTitle] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  // For student quiz taking
  const [activeQuiz, setActiveQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  // 🧑‍🏫 Handle quiz creation
  const handleAddQuestion = () => {
    if (!currentQ.question || !currentQ.answer) return;
    setQuestions([...questions, currentQ]);
    setCurrentQ({ question: "", options: ["", "", "", ""], answer: "" });
  };

  const handleSaveQuiz = () => {
    if (!quizTitle || !selectedCourse || questions.length === 0) {
      alert("Please fill all fields and add at least one question.");
      return;
    }
    createQuiz({
      title: quizTitle,
      courseId: selectedCourse,
      questions,
    });
    alert(`✅ Quiz "${quizTitle}" created successfully!`);
    setShowModal(false);
    setQuizTitle("");
    setSelectedCourse("");
    setQuestions([]);
  };

  // 🧑‍🎓 Handle student quiz flow
  const startQuiz = (quiz) => {
    setActiveQuiz(quiz);
    setCurrentQuestion(0);
    setSelectedOption("");
    setScore(0);
    setCompleted(false);
  };

  const handleAnswer = () => {
    const q = activeQuiz?.questions?.[currentQuestion];
    if (!q) return;
    if (selectedOption === q.answer) setScore((s) => s + 1);

    if (currentQuestion + 1 < activeQuiz.questions.length) {
      setCurrentQuestion((q) => q + 1);
      setSelectedOption("");
    } else {
      setCompleted(true);
    }
  };

  const closeQuiz = () => {
    setActiveQuiz(null);
    setCompleted(false);
    setSelectedOption("");
    setCurrentQuestion(0);
    setScore(0);
  };

  // 🧠 Filter quizzes for student based on enrolled courses
 const studentQuizzes = quizzes.filter((q) =>
  q.courseId && myEnrolledCourses.some((c) => c.id === q.courseId)
);

  // 🧠 Filter quizzes for teacher (their created ones)
  const teacherQuizzes = quizzes.filter((q) =>
    myTeachingCourses.some((c) => c.id === q.courseId)
  );

  return (
    <div className="relative min-h-screen p-6 bg-gray-50 overflow-hidden animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <Trophy className="w-7 h-7 mr-2 text-purple-600" />
        Quizzes
      </h1>

      {/* ====================== TEACHER VIEW ====================== */}
      {currentUser?.role === "teacher" && (
        <>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Created Quizzes
            </h2>
            <button
              onClick={() => setShowModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              Create Quiz
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {teacherQuizzes.length === 0 && (
              <div className="text-gray-500 text-sm">
                You haven’t created any quizzes yet.
              </div>
            )}
            {teacherQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <h3 className="text-lg font-bold mb-2">{quiz.title}</h3>
                <p className="text-sm opacity-90 mb-2">
                  Course:{" "}
                  {myTeachingCourses.find((c) => c.id === quiz.courseId)?.title ||
                    "Unknown"}
                </p>
                <p className="text-sm opacity-80">
                  {quiz.questions.length} question
                  {quiz.questions.length !== 1 && "s"}
                </p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ====================== STUDENT VIEW ====================== */}
      {currentUser?.role === "student" && (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {studentQuizzes.length === 0 && (
              <div className="text-gray-500 text-sm">
                No quizzes available for your enrolled courses yet.
              </div>
            )}
            {studentQuizzes.map((quiz) => (
              <div
                key={quiz.id}
                className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-5 shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all"
              >
                <h3 className="text-lg font-bold mb-2">{quiz.title}</h3>
                <p className="text-sm opacity-80 mb-4">
                  {quiz.questions.length} Questions
                </p>
                <button
                  onClick={() => startQuiz(quiz)}
                  className="bg-white text-purple-700 font-semibold py-2 rounded-lg w-full hover:bg-purple-100 transition-all"
                >
                  Start Quiz
                </button>
              </div>
            ))}
          </div>
        </>
      )}

      {/* ====================== QUIZ CREATION MODAL ====================== */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl animate-slideUp relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create New Quiz
            </h2>

            <input
              type="text"
              placeholder="Quiz Title"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              className="w-full border-2 rounded-xl px-4 py-2 mb-3"
            />

            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full border-2 rounded-xl px-4 py-2 mb-3"
            >
              <option value="">Select Course</option>
              {myTeachingCourses.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Question"
              value={currentQ.question}
              onChange={(e) =>
                setCurrentQ({ ...currentQ, question: e.target.value })
              }
              className="w-full border-2 rounded-xl px-4 py-2 mb-2"
            />

            {currentQ.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => {
                  const newOpts = [...currentQ.options];
                  newOpts[idx] = e.target.value;
                  setCurrentQ({ ...currentQ, options: newOpts });
                }}
                className="w-full border-2 rounded-xl px-4 py-2 mb-2"
              />
            ))}

            <input
              type="text"
              placeholder="Correct Answer"
              value={currentQ.answer}
              onChange={(e) =>
                setCurrentQ({ ...currentQ, answer: e.target.value })
              }
              className="w-full border-2 rounded-xl px-4 py-2 mb-4"
            />

            <button
              onClick={handleAddQuestion}
              className="w-full bg-gradient-to-r from-green-600 to-teal-500 text-white py-2 rounded-xl font-semibold hover:shadow-lg mb-4"
            >
              ➕ Add Question
            </button>

            <button
              onClick={handleSaveQuiz}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg"
            >
              Save Quiz
            </button>
          </div>
        </div>
      )}

      {/* ====================== STUDENT QUIZ MODAL ====================== */}
      {activeQuiz && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-xl relative animate-slideUp">
            <button
              onClick={closeQuiz}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            {!completed ? (
              <>
                <h2 className="text-xl font-bold text-gray-800 mb-2">
                  {activeQuiz.title}
                </h2>
                <p className="text-sm text-gray-600 mb-4">
                  Question {currentQuestion + 1} of{" "}
                  {activeQuiz.questions.length}
                </p>

                {activeQuiz?.questions?.[currentQuestion] ? (
                  <>
                    <h3 className="text-lg font-medium text-gray-800 mb-4">
                      {activeQuiz.questions[currentQuestion].question}
                    </h3>
                    <div className="space-y-2">
                      {activeQuiz.questions[currentQuestion].options.map(
                        (opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => setSelectedOption(opt)}
                            className={`w-full text-left px-4 py-3 border-2 rounded-xl transition-all ${
                              selectedOption === opt
                                ? "border-purple-600 bg-purple-50"
                                : "border-gray-200 hover:border-purple-300"
                            }`}
                          >
                            {opt}
                          </button>
                        )
                      )}
                    </div>
                    <button
                      onClick={handleAnswer}
                      disabled={!selectedOption}
                      className={`mt-6 w-full py-3 rounded-xl text-white font-semibold transition-all ${
                        selectedOption
                          ? "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg"
                          : "bg-gray-300 cursor-not-allowed"
                      }`}
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <p className="text-gray-500 text-center">
                    Loading question...
                  </p>
                )}
              </>
            ) : (
              <div className="text-center space-y-4">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto" />
                <h2 className="text-2xl font-bold text-gray-800">
                  Quiz Complete!
                </h2>
                <p className="text-gray-600">
                  Your Score: {score}/{activeQuiz.questions.length}
                </p>
                <button
                  onClick={closeQuiz}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:shadow-md"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizPage;
