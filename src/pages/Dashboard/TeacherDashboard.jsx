// src/pages/Dashboard/TeacherDashboard.js
import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";
import { useQuizzes } from "../../context/QuizContext";
import FloatingParticles from "../../components/FloatingParticles";
import { Star, Play, Plus } from "lucide-react";

/**
 * TeacherDashboard — enhanced version
 * Includes course creation + quiz creation (linked to courses)
 */
const TeacherDashboard = ({ onNavigate }) => {
  const { currentUser } = useAuth();
  const {
    myTeachingCourses,
    createCourse,
    publishCourse,
    unpublishCourse,
    getCourseById,
  } = useCourses();
  const { createQuiz } = useQuizzes();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [feedback, setFeedback] = useState(null);

  // For quiz creation
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [quizTitle, setQuizTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    question: "",
    options: ["", "", "", ""],
    answer: "",
  });

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFeedback({ type: "error", text: "Title required" });
      return;
    }
    const res = createCourse({
      title: title.trim(),
      description: description.trim(),
      published,
    });
    if (res.ok) {
      setFeedback({ type: "success", text: `Created ${res.course.title}` });
      setTitle("");
      setDescription("");
      setPublished(true);
      setTimeout(() => setFeedback(null), 1400);
    } else {
      setFeedback({ type: "error", text: res.message || "Could not create" });
    }
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.answer) return;
    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: "",
      options: ["", "", "", ""],
      answer: "",
    });
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
    // Reset
    setShowQuizModal(false);
    setQuizTitle("");
    setSelectedCourse("");
    setQuestions([]);
  };

  const totalStudents = myTeachingCourses.reduce(
    (s, c) => s + (c.students?.length || 0),
    0
  );

  return (
    <div className="p-6 animate-fadeIn relative min-h-screen">
      <FloatingParticles />
      <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative z-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            👩‍🏫 Teacher Dashboard
          </h1>
          <div className="flex items-center gap-3">
            <div className="text-sm text-gray-500">
              Welcome, {currentUser?.name}
            </div>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-5">
            <p className="text-sm opacity-90">Students Enrolled</p>
            <p className="text-2xl font-bold">{totalStudents}</p>
            <p className="text-xs opacity-80 mt-2">Across your courses</p>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl p-5">
            <p className="text-sm opacity-90">Avg Quiz Score</p>
            <p className="text-2xl font-bold">78%</p>
            <p className="text-xs opacity-80 mt-2">Class average (est)</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-5">
            <p className="text-sm opacity-90">Completion Rate</p>
            <p className="text-2xl font-bold">63%</p>
            <p className="text-xs opacity-80 mt-2">Course progress</p>
          </div>
        </div>

        {/* COURSE CREATION */}
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-gray-800">Create New Course</h3>
          </div>

          <form
            onSubmit={handleCreate}
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Course title"
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600"
            />
            <input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description"
              className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600"
            />
            <div className="flex items-center gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                <span className="text-sm">Published</span>
              </label>
              <button
                type="submit"
                className="ml-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl font-semibold"
              >
                Create
              </button>
            </div>
          </form>

          {feedback && (
            <div
              className={`mt-3 p-2 rounded text-sm ${
                feedback.type === "error"
                  ? "bg-red-50 text-red-700"
                  : "bg-green-50 text-green-700"
              }`}
            >
              {feedback.text}
            </div>
          )}

          <hr className="my-4" />

          {/* TEACHER COURSES LIST */}
          <h4 className="font-medium mb-3">Your Courses</h4>
          <div className="space-y-3">
            {myTeachingCourses.length === 0 && (
              <div className="text-sm text-gray-500">No courses yet.</div>
            )}
            {myTeachingCourses.map((c) => (
              <div
                key={c.id}
                className="border rounded p-3 flex items-start justify-between"
              >
                <div>
                  <div className="font-medium">{c.title}</div>
                  <div className="text-xs text-gray-500">{c.description}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Enrolled: {c.students?.length || 0}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <button
                    onClick={() =>
                      c.published
                        ? unpublishCourse(c.id)
                        : publishCourse(c.id)
                    }
                    className={`px-3 py-1 text-sm rounded ${
                      c.published
                        ? "bg-green-100 text-green-800"
                        : "bg-yellow-100 text-yellow-800"
                    }`}
                  >
                    {c.published ? "Published" : "Unpublished"}
                  </button>
                  <button
                    onClick={() => {
                      const full = getCourseById(c.id);
                      alert(
                        `Course preview:\n\n${full.title}\nInstructor: ${full.instructor}\nEnrolled: ${
                          full.students?.length || 0
                        }`
                      );
                    }}
                    className="px-3 py-1 text-sm border rounded"
                  >
                    Preview
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Create Quiz Section */}
          <div className="mt-8">
            <h3 className="font-bold text-gray-800 mb-3">Create Quiz</h3>
            <button
              onClick={() => setShowQuizModal(true)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4 inline-block mr-2" />
              New Quiz
            </button>
          </div>
        </div>
      </div>

      {/* QUIZ CREATION MODAL */}
      {showQuizModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-2xl animate-slideUp relative">
            <button
              onClick={() => setShowQuizModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              ✖
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
              value={currentQuestion.question}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, question: e.target.value })
              }
              className="w-full border-2 rounded-xl px-4 py-2 mb-2"
            />

            {currentQuestion.options.map((opt, idx) => (
              <input
                key={idx}
                type="text"
                placeholder={`Option ${idx + 1}`}
                value={opt}
                onChange={(e) => {
                  const updated = [...currentQuestion.options];
                  updated[idx] = e.target.value;
                  setCurrentQuestion({ ...currentQuestion, options: updated });
                }}
                className="w-full border-2 rounded-xl px-4 py-2 mb-2"
              />
            ))}

            <input
              type="text"
              placeholder="Correct Answer"
              value={currentQuestion.answer}
              onChange={(e) =>
                setCurrentQuestion({ ...currentQuestion, answer: e.target.value })
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
    </div>
  );
};

export default TeacherDashboard;
