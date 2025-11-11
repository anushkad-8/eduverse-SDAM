import React, { useState, useEffect } from 'react';
import { Trophy, Award, Star, BookOpen, MessageSquare, BarChart3, Users, Home, LogOut, CheckCircle, XCircle, Zap, Target, Sparkles, TrendingUp, Calendar, Clock, ArrowRight, Plus, Upload, Send, Filter, Search, Medal, Crown, Flame } from 'lucide-react';

// Mock Data
const mockCourses = [
  { id: 1, title: 'Web Development Fundamentals', progress: 65, instructor: 'Dr. Sarah Johnson', enrolled: 234, rating: 4.8, duration: '8 weeks', level: 'Beginner' },
  { id: 2, title: 'Data Structures & Algorithms', progress: 40, instructor: 'Prof. Michael Chen', enrolled: 189, rating: 4.9, duration: '10 weeks', level: 'Intermediate' },
  { id: 3, title: 'Machine Learning Basics', progress: 0, instructor: 'Dr. Emily Brown', enrolled: 312, rating: 4.7, duration: '12 weeks', level: 'Advanced' }
];

const mockQuizzes = [
  { id: 1, title: 'HTML & CSS Basics', course: 'Web Development', questions: 15, timeLimit: 30, available: true, score: null },
  { id: 2, title: 'JavaScript Fundamentals', course: 'Web Development', questions: 20, timeLimit: 45, available: true, score: 85 },
  { id: 3, title: 'Arrays & Sorting', course: 'Data Structures', questions: 25, timeLimit: 60, available: false, score: null }
];

const mockLeaderboard = [
  { rank: 1, name: 'Alex Thompson', points: 2847, streak: 45, level: 28, avatar: '👨‍🎓' },
  { rank: 2, name: 'Emma Wilson', points: 2693, streak: 38, level: 26, avatar: '👩‍🎓' },
  { rank: 3, name: 'James Martinez', points: 2541, streak: 42, level: 25, avatar: '👨‍💼' },
  { rank: 4, name: 'Current User', points: 2387, streak: 31, level: 24, avatar: '👤', isCurrentUser: true },
  { rank: 5, name: 'Sophia Lee', points: 2204, streak: 28, level: 22, avatar: '👩‍💻' }
];

const mockBadges = [
  { id: 1, name: 'First Steps', icon: '🎯', earned: true, description: 'Complete your first course' },
  { id: 2, name: 'Quiz Master', icon: '🧠', earned: true, description: 'Score 90+ on 5 quizzes' },
  { id: 3, name: 'Streak Champion', icon: '🔥', earned: true, description: '30-day learning streak' },
  { id: 4, name: 'Discussion Hero', icon: '💬', earned: false, description: 'Help 50 peers in forums' },
  { id: 5, name: 'Perfect Score', icon: '💯', earned: false, description: 'Get 100% on any quiz' },
  { id: 6, name: 'Course Conqueror', icon: '🏆', earned: false, description: 'Complete 10 courses' }
];

// Celebration Animation Component
const CelebrationPopup = ({ show, score, onClose }) => {
  if (!show) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 p-8 rounded-3xl shadow-2xl text-center transform animate-bounceIn max-w-md">
        <div className="text-6xl mb-4 animate-pulse">🎉</div>
        <h2 className="text-4xl font-bold text-white mb-2">Awesome!</h2>
        <p className="text-2xl text-white mb-4">You scored {score}%</p>
        <div className="flex justify-center gap-2 mb-6">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-8 h-8 ${i < Math.floor(score/20) ? 'text-yellow-300 fill-yellow-300' : 'text-white'} animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
        <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
          <p className="text-white font-semibold">+{score} XP Points Earned!</p>
        </div>
        <button onClick={onClose} className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
          Continue Learning
        </button>
      </div>
    </div>
  );
};

// Login Page Component
const LoginPage = ({ onLogin }) => {
  const [role, setRole] = useState('student');
  const [credentials, setCredentials] = useState({ email: '', password: '' });

  const handleLogin = (e) => {
    e.preventDefault();
    onLogin(role);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -top-48 -left-48 animate-pulse"></div>
        <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full -bottom-48 -right-48 animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>
      
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10 transform hover:scale-105 transition-transform">
        <div className="text-center mb-8">
          <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl mb-4">
            <BookOpen className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">EduVerse</h1>
          <p className="text-gray-600">Learn. Play. Achieve.</p>
        </div>

        <div className="flex gap-2 mb-6">
          <button onClick={() => setRole('student')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${role === 'student' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            Student
          </button>
          <button onClick={() => setRole('teacher')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${role === 'teacher' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
            Teacher
          </button>
        </div>

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">Email</label>
            <input type="email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors" placeholder="your.email@example.com" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
          </div>
          <div className="mb-6">
            <label className="block text-gray-700 font-semibold mb-2">Password</label>
            <input type="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors" placeholder="••••••••" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
          </div>
          <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all">
            Login to {role === 'student' ? 'Learn' : 'Teach'}
          </button>
        </form>
      </div>
    </div>
  );
};

// Student Dashboard Component
const StudentDashboard = ({ onNavigate }) => {
  const [stats] = useState({
    points: 2387,
    streak: 31,
    coursesCompleted: 7,
    rank: 4
  });

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, Student! 👋</h1>
          <p className="text-gray-600">Ready to continue your learning journey?</p>
        </div>
        <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl">
          <Flame className="w-6 h-6" />
          <div>
            <p className="text-sm opacity-90">Current Streak</p>
            <p className="text-2xl font-bold">{stats.streak} Days</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <Zap className="w-8 h-8" />
            <Trophy className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90">Total Points</p>
          <p className="text-3xl font-bold">{stats.points}</p>
        </div>

        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer" onClick={() => onNavigate('courses')}>
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="w-8 h-8" />
            <CheckCircle className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90">Courses Completed</p>
          <p className="text-3xl font-bold">{stats.coursesCompleted}</p>
        </div>

        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer" onClick={() => onNavigate('leaderboard')}>
          <div className="flex items-center justify-between mb-2">
            <Medal className="w-8 h-8" />
            <TrendingUp className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90">Global Rank</p>
          <p className="text-3xl font-bold">#{stats.rank}</p>
        </div>

        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer">
          <div className="flex items-center justify-between mb-2">
            <Award className="w-8 h-8" />
            <Sparkles className="w-6 h-6 opacity-50" />
          </div>
          <p className="text-sm opacity-90">Badges Earned</p>
          <p className="text-3xl font-bold">{mockBadges.filter(b => b.earned).length}/{mockBadges.length}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>
          <div className="space-y-4">
            {mockCourses.filter(c => c.progress > 0 && c.progress < 100).map(course => (
              <div key={course.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 transition-all cursor-pointer transform hover:scale-102">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
                    <p className="text-sm text-gray-600">{course.instructor}</p>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{course.progress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
                </div>
                <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
                  Continue <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Badges</h2>
          <div className="space-y-3">
            {mockBadges.filter(b => b.earned).slice(0, 3).map(badge => (
              <div key={badge.id} className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 transform hover:scale-105 transition-all">
                <div className="flex items-center gap-3">
                  <div className="text-4xl">{badge.icon}</div>
                  <div className="flex-1">
                    <p className="font-bold text-gray-800">{badge.name}</p>
                    <p className="text-xs text-gray-600">{badge.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Courses Page Component
const CoursesPage = () => {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input type="text" placeholder="Search courses..." className="pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none" value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Levels</option>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockCourses.map(course => (
          <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
            <div className="h-40 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center">
              <BookOpen className="w-16 h-16 text-white opacity-50" />
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start mb-3">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
                  {course.level}
                </span>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <div className="flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  <span>{course.enrolled}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{course.duration}</span>
                </div>
              </div>
              {course.progress > 0 ? (
                <>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
                  </div>
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                    Continue Learning
                  </button>
                </>
              ) : (
                <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Enroll Now
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Quiz Page Component
const QuizPage = () => {
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const sampleQuestions = [
    {
      question: "What does HTML stand for?",
      options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
      correct: 0,
      explanation: "HTML stands for Hyper Text Markup Language. It's the standard markup language for creating web pages. 'Hyper Text' refers to links that connect web pages, and 'Markup Language' means it uses tags to define elements."
    },
    {
      question: "Which CSS property controls text size?",
      options: ["text-style", "font-style", "text-size", "font-size"],
      correct: 3,
      explanation: "The 'font-size' property is used to control text size in CSS. Other options like 'font-style' controls italic/normal text, while 'text-style' and 'text-size' are not valid CSS properties."
    },
    {
      question: "What is the correct syntax for referring to an external JavaScript file?",
      options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"],
      correct: 2,
      explanation: "The correct syntax is <script src='app.js'>. The 'src' attribute specifies the URL of the external script file, similar to how 'src' is used in <img> tags for images."
    }
  ];

  const handleAnswerSelect = (index) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
  };

  const handleSubmitAnswer = () => {
    setShowExplanation(true);
    if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion < sampleQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      const finalScore = Math.round(((score + (selectedAnswer === sampleQuestions[currentQuestion].correct ? 1 : 0)) / sampleQuestions.length) * 100);
      setQuizComplete(true);
      setShowCelebration(true);
    }
  };

  if (!selectedQuiz) {
    return (
      <div className="p-6 space-y-6 animate-fadeIn">
        <h1 className="text-3xl font-bold text-gray-800">Available Quizzes</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockQuizzes.map(quiz => (
            <div key={quiz.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
              <div className="flex items-start justify-between mb-4">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-3 rounded-xl">
                  <Target className="w-8 h-8 text-purple-600" />
                </div>
                {quiz.score !== null && (
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{quiz.score}%</span>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
              <p className="text-sm text-gray-600 mb-4">{quiz.course}</p>
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Questions</span>
                  <span className="font-semibold">{quiz.questions}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Time Limit</span>
                  <span className="font-semibold">{quiz.timeLimit} min</span>
                </div>
              </div>
              {quiz.available ? (
                <button onClick={() => setSelectedQuiz(quiz)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  {quiz.score !== null ? 'Retake Quiz' : 'Start Quiz'}
                </button>
              ) : (
                <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed">
                  Available in 24h
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (quizComplete) {
    const finalScore = Math.round((score / sampleQuestions.length) * 100);
    return (
      <>
        <CelebrationPopup show={showCelebration} score={finalScore} onClose={() => {
          setShowCelebration(false);
          setSelectedQuiz(null);
          setCurrentQuestion(0);
          setScore(0);
          setQuizComplete(false);
        }} />
        <div className="p-6 flex items-center justify-center min-h-screen animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full text-center">
            <div className="text-6xl mb-4">
              {finalScore >= 80 ? '🏆' : finalScore >= 60 ? '🎉' : '📚'}
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Quiz Complete!</h2>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
              <p className="text-5xl font-bold text-purple-600 mb-2">{finalScore}%</p>
              <p className="text-gray-600">You got {score} out of {sampleQuestions.length} questions correct</p>
            </div>
            <button onClick={() => {
              setSelectedQuiz(null);
              setCurrentQuestion(0);
              setScore(0);
              setQuizComplete(false);
            }} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-lg transition-all">
              Back to Quizzes
            </button>
          </div>
        </div>
      </>
    );
  }

  const question = sampleQuestions[currentQuestion];
  const isCorrect = selectedAnswer === question.correct;

  return (
    <div className="p-6 flex items-center justify-center min-h-screen animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <button onClick={() => setSelectedQuiz(null)} className="text-gray-600 hover:text-gray-800">
              ← Back
            </button>
          </div>
          <div className="flex items-center gap-2">
            <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
              Question {currentQuestion + 1}/{sampleQuestions.length}
            </div>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>
          <div className="space-y-3">
            {question.options.map((option, index) => (
              <button key={index} onClick={() => handleAnswerSelect(index)} disabled={showExplanation} className={`w-full text-left p-4 rounded-xl border-2 transition-all ${selectedAnswer === index ? (showExplanation ? (index === question.correct ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50') : 'border-purple-500 bg-purple-50') : 'border-gray-200 hover:border-purple-300'} ${showExplanation && index === question.correct ? 'border-green-500 bg-green-50' : ''}`}>
                <div className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedAnswer === index ? (showExplanation ? (index === question.correct ? 'border-green-500 bg-green-500' : 'border-red-500 bg-red-500') : 'border-purple-500 bg-purple-500') : 'border-gray-300'}`}>
                    {showExplanation && selectedAnswer === index && (
                      isCorrect ? <CheckCircle className="w-4 h-4 text-white" /> : <XCircle className="w-4 h-4 text-white" />
                    )}
                    {showExplanation && index === question.correct && selectedAnswer !== index && (
                      <CheckCircle className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <span className="font-medium text-gray-800">{option}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {showExplanation && (
          <div className={`mb-6 p-6 rounded-xl ${isCorrect ? 'bg-green-50 border-2 border-green-200' : 'bg-blue-50 border-2 border-blue-200'}`}>
            <div className="flex items-start gap-3 mb-3">
              {isCorrect ? (
                <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
              ) : (
                <XCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-1" />
              )}
              <div>
                <h3 className={`font-bold text-lg mb-2 ${isCorrect ? 'text-green-800' : 'text-blue-800'}`}>
                  {isCorrect ? '🎉 Correct!' : '📚 Learning Opportunity'}
                </h3>
                <p className="text-gray-700 leading-relaxed">{question.explanation}</p>
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end">
          {!showExplanation ? (
            <button onClick={handleSubmitAnswer} disabled={selectedAnswer === null} className={`px-8 py-3 rounded-xl font-semibold transition-all ${selectedAnswer !== null ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:shadow-lg' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}>
              Submit Answer
            </button>
          ) : (
            <button onClick={handleNextQuestion} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
              {currentQuestion < sampleQuestions.length - 1 ? 'Next Question' : 'Finish Quiz'} <ArrowRight className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Leaderboard Component
const LeaderboardPage = () => {
  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">🏆 Global Leaderboard</h1>
        <p className="text-gray-600">Compete with learners worldwide!</p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {mockLeaderboard.slice(0, 3).map((user, idx) => (
            <div key={user.rank} className={`${idx === 0 ? 'col-span-3 md:col-span-1 md:order-2' : idx === 1 ? 'md:order-1' : 'md:order-3'}`}>
              <div className={`bg-white rounded-2xl shadow-lg p-6 text-center transform hover:scale-105 transition-all ${idx === 0 ? 'border-4 border-yellow-400' : idx === 1 ? 'border-4 border-gray-300' : 'border-4 border-orange-400'}`}>
                <div className="text-6xl mb-3">{idx === 0 ? '👑' : user.avatar}</div>
                {idx === 0 && <Crown className="w-12 h-12 text-yellow-500 mx-auto mb-2" />}
                <div className={`text-4xl font-bold mb-2 ${idx === 0 ? 'text-yellow-600' : idx === 1 ? 'text-gray-600' : 'text-orange-600'}`}>
                  #{user.rank}
                </div>
                <h3 className="font-bold text-lg text-gray-800 mb-1">{user.name}</h3>
                <p className="text-2xl font-bold text-purple-600 mb-2">{user.points}</p>
                <div className="flex justify-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Flame className="w-4 h-4 text-orange-500" />
                    <span>{user.streak}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4 text-purple-500" />
                    <span>Lv {user.level}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {mockLeaderboard.slice(3).map((user) => (
            <div key={user.rank} className={`flex items-center justify-between p-6 border-b border-gray-100 hover:bg-purple-50 transition-all ${user.isCurrentUser ? 'bg-purple-100' : ''}`}>
              <div className="flex items-center gap-4">
                <div className="text-2xl font-bold text-gray-400 w-8">{user.rank}</div>
                <div className="text-3xl">{user.avatar}</div>
                <div>
                  <h3 className="font-bold text-gray-800">{user.name}</h3>
                  <div className="flex gap-3 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>{user.streak} day streak</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Target className="w-4 h-4 text-purple-500" />
                      <span>Level {user.level}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-purple-600">{user.points}</p>
                <p className="text-xs text-gray-500">points</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Discussion Forum Component
const DiscussionForum = () => {
  const [posts] = useState([
    { id: 1, author: 'Sarah Johnson', avatar: '👩‍🎓', title: 'Help with React Hooks', content: 'Can someone explain useEffect dependencies?', replies: 12, likes: 24, time: '2h ago', course: 'Web Development' },
    { id: 2, author: 'Mike Chen', avatar: '👨‍💻', title: 'Binary Search Tree Implementation', content: 'Having trouble with BST deletion...', replies: 8, likes: 15, time: '4h ago', course: 'Data Structures' },
    { id: 3, author: 'Emma Wilson', avatar: '👩‍💼', title: 'Neural Network Optimization', content: 'What are best practices for learning rate?', replies: 20, likes: 45, time: '1d ago', course: 'Machine Learning' }
  ]);

  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Discussion Forum</h1>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> New Discussion
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          {posts.map(post => (
            <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{post.avatar}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg text-gray-800">{post.title}</h3>
                    <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{post.course}</span>
                  </div>
                  <p className="text-gray-600 mb-3">{post.content}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span className="font-semibold text-gray-700">{post.author}</span>
                    <span>•</span>
                    <span>{post.time}</span>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.replies} replies</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4" />
                      <span>{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg mb-4">📢 Forum Guidelines</h3>
            <ul className="space-y-2 text-sm">
              <li>✓ Be respectful and helpful</li>
              <li>✓ Search before posting</li>
              <li>✓ Use clear titles</li>
              <li>✓ Mark solved discussions</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="font-bold text-lg text-gray-800 mb-4">🔥 Trending Topics</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">#ReactHooks</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">124</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">#AlgorithmHelp</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">98</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-700">#MLBasics</span>
                <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">87</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Teacher Dashboard Component
const TeacherDashboard = ({ onNavigate }) => {
  return (
    <div className="p-6 space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard 👨‍🏫</h1>
          <p className="text-gray-600">Manage your courses and track student progress</p>
        </div>
        <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
          <Plus className="w-5 h-5" /> Create Course
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white">
          <BookOpen className="w-8 h-8 mb-3" />
          <p className="text-sm opacity-90">Total Courses</p>
          <p className="text-3xl font-bold">12</p>
        </div>
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-2xl text-white">
          <Users className="w-8 h-8 mb-3" />
          <p className="text-sm opacity-90">Active Students</p>
          <p className="text-3xl font-bold">847</p>
        </div>
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl text-white">
          <Target className="w-8 h-8 mb-3" />
          <p className="text-sm opacity-90">Quizzes Created</p>
          <p className="text-3xl font-bold">34</p>
        </div>
        <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-2xl text-white">
          <BarChart3 className="w-8 h-8 mb-3" />
          <p className="text-sm opacity-90">Avg. Score</p>
          <p className="text-3xl font-bold">87%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">My Courses</h2>
          <div className="space-y-4">
            {mockCourses.map(course => (
              <div key={course.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 transition-all">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-gray-800">{course.title}</h3>
                  <button className="text-purple-600 hover:text-purple-800">
                    <Upload className="w-5 h-5" />
                  </button>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{course.enrolled} students</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span>{course.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
              <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">New enrollment</p>
                <p className="text-xs text-gray-600">45 students enrolled in Web Development</p>
                <p className="text-xs text-gray-500 mt-1">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
              <Trophy className="w-5 h-5 text-green-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">High performer</p>
                <p className="text-xs text-gray-600">Sarah achieved 98% in latest quiz</p>
                <p className="text-xs text-gray-500 mt-1">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-purple-50 rounded-lg">
              <MessageSquare className="w-5 h-5 text-purple-600 flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm font-semibold text-gray-800">New discussion</p>
                <p className="text-xs text-gray-600">12 new posts in ML forum</p>
                <p className="text-xs text-gray-500 mt-1">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main App Component
export default function EduVerseApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const handleLogin = (role) => {
    setUserRole(role);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserRole(null);
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const navItems = userRole === 'student' 
    ? [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'courses', label: 'Courses', icon: BookOpen },
        { id: 'quiz', label: 'Quizzes', icon: Target },
        { id: 'leaderboard', label: 'Leaderboard', icon: Trophy },
        { id: 'forum', label: 'Forum', icon: MessageSquare },
      ]
    : [
        { id: 'dashboard', label: 'Dashboard', icon: Home },
        { id: 'courses', label: 'My Courses', icon: BookOpen },
        { id: 'analytics', label: 'Analytics', icon: BarChart3 },
        { id: 'forum', label: 'Forum', icon: MessageSquare },
      ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gradient-to-b from-purple-700 to-blue-700 text-white p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-white p-2 rounded-xl">
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">EduVerse</h1>
            <p className="text-xs opacity-75">{userRole === 'student' ? 'Student Portal' : 'Teacher Portal'}</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {navItems.map(item => (
            <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentPage === item.id ? 'bg-white text-purple-700' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
              <item.icon className="w-5 h-5" />
              <span className="font-semibold">{item.label}</span>
            </button>
          ))}
        </nav>

        <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all">
          <LogOut className="w-5 h-5" />
          <span className="font-semibold">Logout</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {userRole === 'student' ? (
          <>
            {currentPage === 'dashboard' && <StudentDashboard onNavigate={setCurrentPage} />}
            {currentPage === 'courses' && <CoursesPage />}
            {currentPage === 'quiz' && <QuizPage />}
            {currentPage === 'leaderboard' && <LeaderboardPage />}
            {currentPage === 'forum' && <DiscussionForum />}
          </>
        ) : (
          <>
            {currentPage === 'dashboard' && <TeacherDashboard onNavigate={setCurrentPage} />}
            {currentPage === 'courses' && <CoursesPage />}
            {currentPage === 'forum' && <DiscussionForum />}
            {currentPage === 'analytics' && (
              <div className="p-6">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Student Analytics</h1>
                <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-purple-600 mx-auto mb-4" />
                  <p className="text-gray-600">Detailed analytics dashboard coming soon...</p>
                </div>
              </div>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes bounceIn {
          0% { transform: scale(0.3); opacity: 0; }
          50% { transform: scale(1.05); }
          70% { transform: scale(0.9); }
          100% { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
        .animate-bounceIn {
          animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        }
      `}</style>
    </div>
  );
}