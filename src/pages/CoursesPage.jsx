import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useCourses } from "../context/CourseContext";
import {
  BookOpen,
  Star,
  Clock,
  Users,
  Plus,
  X,
  UserPlus,
  UserMinus,
} from "lucide-react";

const CoursesPage = () => {
  const { currentUser } = useAuth();
  const {
    publishedCourses,
    myTeachingCourses,
    myEnrolledCourses,
    joinCourse,
    leaveCourse,
    createCourse,
  } = useCourses();

  const isTeacher = currentUser?.role === "teacher";

  // For Create Course Modal
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [published, setPublished] = useState(true);
  const [feedback, setFeedback] = useState(null);

  const handleCreate = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      setFeedback({ type: "error", text: "Course title is required" });
      return;
    }
    const res = createCourse({ title, description, published });
    if (res.ok) {
      setFeedback({ type: "success", text: "Course created successfully!" });
      setTitle("");
      setDescription("");
      setPublished(true);
      setTimeout(() => setShowModal(false), 1000);
    } else {
      setFeedback({ type: "error", text: res.message });
    }
  };

  const renderCourseCard = (course, isJoined) => (
    <div
      key={course.id}
      className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
    >
      {/* Top Section - Gradient Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-500 h-32 flex flex-col justify-center items-center relative">
        <BookOpen className="w-10 h-10 text-white opacity-90" />
        <span className="absolute top-3 right-3 bg-white text-purple-700 text-xs font-semibold px-3 py-1 rounded-full shadow">
          {course.id || "WD101"}
        </span>
      </div>

      {/* Bottom Section - Course Details */}
      <div className="p-5">
        <div className="flex justify-between items-center mb-2">
          <span className="text-xs bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium">
            Beginner
          </span>
          <div className="flex items-center text-yellow-500 text-sm font-medium">
            <Star className="w-4 h-4 mr-1" /> 4.8
          </div>
        </div>

        <h3 className="font-bold text-lg text-gray-800">
          {course.title || "Web Development Fundamentals"}
        </h3>
        <p className="text-sm text-gray-600 mb-1">
          {course.instructor || "Dr. Sarah Johnson"}
        </p>

        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {course.students?.length || 234}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" /> 8 weeks
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div className="bg-gradient-to-r from-purple-500 to-blue-500 h-2 rounded-full w-1/4"></div>
        </div>

        {/* Button */}
        {!isTeacher && (
          <>
            {isJoined ? (
              <button
                onClick={() => leaveCourse(course.id)}
                className="w-full flex items-center justify-center gap-2 bg-red-100 text-red-700 py-2 rounded-lg font-semibold text-sm hover:bg-red-200 transition-all"
              >
                <UserMinus className="w-4 h-4" /> Leave Course
              </button>
            ) : (
              <button
                onClick={() => joinCourse(course.id)}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all"
              >
                <UserPlus className="w-4 h-4" /> Continue Learning
              </button>
            )}
          </>
        )}

        {isTeacher && (
          <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-lg font-semibold text-sm hover:shadow-md transition-all">
            View Course
          </button>
        )}
      </div>
    </div>
  );

  return (
    <div className="relative z-10 p-6 animate-fadeIn min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          <BookOpen className="inline-block w-7 h-7 mr-2 text-purple-600" />
          Explore Courses
        </h1>

        {isTeacher && (
          <button
            onClick={() => setShowModal(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2 rounded-xl font-semibold shadow hover:shadow-lg transition-all flex items-center gap-2"
          >
            <Plus className="w-5 h-5" /> Create Course
          </button>
        )}
      </div>

      {/* Courses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isTeacher
          ? myTeachingCourses.map((course) => renderCourseCard(course, false))
          : publishedCourses.map((course) => {
              const isJoined = myEnrolledCourses.some(
                (c) => c.id === course.id
              );
              return renderCourseCard(course, isJoined);
            })}
      </div>

      {/* Create Course Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg animate-slideUp relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              <X className="w-6 h-6" />
            </button>

            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Create New Course
            </h2>

            <form onSubmit={handleCreate} className="space-y-4">
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Course title"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-purple-600"
              />
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Short description"
                rows="3"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-purple-600"
              ></textarea>

              <label className="flex items-center gap-2 text-sm text-gray-700">
                <input
                  type="checkbox"
                  checked={published}
                  onChange={(e) => setPublished(e.target.checked)}
                />
                Published
              </label>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all"
              >
                Create
              </button>
            </form>

            {feedback && (
              <div
                className={`mt-3 p-2 text-center rounded text-sm ${
                  feedback.type === "error"
                    ? "bg-red-50 text-red-700"
                    : "bg-green-50 text-green-700"
                }`}
              >
                {feedback.text}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default CoursesPage;
