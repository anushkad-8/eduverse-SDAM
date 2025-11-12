// src/pages/Dashboard/StudentDashboard.js
import React from "react";
import { ArrowRight, BookOpen, Flame, Medal, Trophy, Smile } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { useCourses } from "../../context/CourseContext";
import FloatingParticles from "../../components/FloatingParticles";

/**
 * Styled Student Dashboard — keeps the original cards and gradients.
 * Uses useCourses() derived lists.
 */
const StudentDashboard = ({ onNavigate }) => {
  const { currentUser, logout } = useAuth();
  const { publishedCourses, myEnrolledCourses, joinCourse, leaveCourse } = useCourses();

  const stats = {
    points: 2387,
    streak: 31,
    coursesCompleted: 7,
    rank: 4
  };

  // Top leaderboard (by enrollments) — small derived sample
  const leaderboard = [...publishedCourses].sort((a,b)=> (b.students?.length||0) - (a.students?.length||0)).slice(0,5);

  return (
    <div className="p-6 space-y-6 animate-fadeIn relative min-h-screen">
      <FloatingParticles />
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {currentUser?.name.split(' ')[0] || 'Student'}! 👋</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl animate-pulse">
          <Flame className="w-6 h-6" />
          <div>
            <p className="text-sm opacity-90">Current Streak</p>
            <p className="text-2xl font-bold">{stats.streak} Days</p>
          </div>
        </div>
      </div>

      {/* top metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer glass-shadow">
          <div className="flex items-center justify-between mb-2">
            <Trophy className="w-7 h-7" />
            <Medal className="w-5 h-5 opacity-50" />
          </div>
          <p className="text-sm opacity-90">Total Points</p>
          <p className="text-3xl font-bold">{stats.points}</p>
        </div>

        <div onClick={() => onNavigate && onNavigate('courses')} className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer glass-shadow">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-7 h-7" />
            <span className="opacity-50">✔</span>
          </div>
          <p className="text-sm opacity-90">Courses Completed</p>
          <p className="text-3xl font-bold">{stats.coursesCompleted}</p>
        </div>

        <div onClick={() => onNavigate && onNavigate('leaderboard')} className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer glass-shadow">
          <div className="flex items-center justify-between mb-2">
            <Medal className="w-7 h-7" />
            <span className="opacity-50">↗</span>
          </div>
          <p className="text-sm opacity-90">Global Rank</p>
          <p className="text-3xl font-bold">#{stats.rank}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer glass-shadow">
          <div className="flex items-center justify-between mb-2">
            <Medal className="w-7 h-7" />
            <span className="opacity-50">★</span>
          </div>
          <p className="text-sm opacity-90">Badges Earned</p>
          <p className="text-3xl font-bold">3/6</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>

          <div className="space-y-4">
            {publishedCourses.filter(c => c.progress > 0 && c.progress < 100).map(course => (
              <div key={course.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 transition-all cursor-pointer transform hover:scale-[1.02]">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{course.progress}%</span>
                </div>

                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }} />
                </div>

                <button onClick={() => onNavigate && onNavigate('courseDetail', course)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}

            {publishedCourses.filter(c => c.progress > 0 && c.progress < 100).length === 0 && (
              <div className="text-sm text-gray-500">No in-progress courses. Explore new courses from the list.</div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Badges</h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🎯</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">First Steps</p>
                    <p className="text-xs text-gray-600">Complete your first course</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">🧠</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">Quiz Master</p>
                    <p className="text-xs text-gray-600">Score 90+ on 5 quizzes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
            <Smile className="w-8 h-8 mb-3" />
            <h3 className="font-bold text-lg mb-2">Keep Going!</h3>
            <p className="text-sm">You're doing amazing! Just 3 more lessons to complete this week's goal! 🎉</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <h3 className="font-bold mb-3">Leaderboard</h3>
          <ol className="space-y-2 text-sm">
            {leaderboard.map((c, i) => (
              <li key={c.id} className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm">{i+1}. {c.title}</div>
                  <div className="text-xs text-gray-500">{c.instructor}</div>
                </div>
                <div className="text-sm text-indigo-600">{c.students?.length || 0} learners</div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
