// import React, { useState, useEffect } from 'react';
// import { Trophy, Award, Star, BookOpen, MessageSquare, BarChart3, Users, Home, LogOut, CheckCircle, XCircle, Zap, Target, Sparkles, TrendingUp, Calendar, Clock, ArrowRight, Plus, Upload, Send, Filter, Search, Medal, Crown, Flame, HelpCircle, X, Play, FileText, Video, CheckSquare, Brain, Lightbulb, Quote, Smile, ChevronRight, Edit, Copy, ThumbsUp, Reply, MoreVertical, PieChart, Activity, TrendingDown } from 'lucide-react';

// // Enhanced Mock Data with IDs
// const initialCourses = [
//   { id: 'WD101', title: 'Web Development Fundamentals', progress: 65, instructor: 'Dr. Sarah Johnson', enrolled: 234, rating: 4.8, duration: '8 weeks', level: 'Beginner', teacherId: 'teacher1', approved: true },
//   { id: 'DS201', title: 'Data Structures & Algorithms', progress: 40, instructor: 'Prof. Michael Chen', enrolled: 189, rating: 4.9, duration: '10 weeks', level: 'Intermediate', teacherId: 'teacher1', approved: true },
//   { id: 'ML301', title: 'Machine Learning Basics', progress: 0, instructor: 'Dr. Emily Brown', enrolled: 312, rating: 4.7, duration: '12 weeks', level: 'Advanced', teacherId: 'teacher2', approved: true }
// ];

// const courseContent = {
//   'WD101': {
//     modules: [
//       { id: 1, title: 'Introduction to HTML', type: 'video', duration: '45 min', completed: true },
//       { id: 2, title: 'CSS Fundamentals', type: 'video', duration: '60 min', completed: true },
//       { id: 3, title: 'HTML Practice Exercise', type: 'assignment', duration: '30 min', completed: false },
//       { id: 4, title: 'JavaScript Basics', type: 'video', duration: '90 min', completed: false },
//       { id: 5, title: 'DOM Manipulation', type: 'reading', duration: '20 min', completed: false },
//     ]
//   }
// };

// const didYouKnowFacts = [
//   "💡 The first computer programmer was Ada Lovelace in 1843!",
//   "🌟 Learning for just 20 minutes daily can boost your knowledge by 7% weekly!",
//   "🧠 Your brain creates new neural pathways every time you learn something new!",
//   "🚀 The fastest typist can type 216 words per minute!",
//   "🎯 Teaching others is one of the best ways to master a subject!",
//   "⚡ The human brain can process images in just 13 milliseconds!",
//   "🌈 Gamified learning increases retention by up to 40%!",
//   "📚 Reading for 6 minutes can reduce stress levels by 68%!"
// ];

// const motivationalQuotes = [
//   { quote: "The expert in anything was once a beginner.", author: "Helen Hayes" },
//   { quote: "Learning never exhausts the mind.", author: "Leonardo da Vinci" },
//   { quote: "Education is the passport to the future.", author: "Malcolm X" },
//   { quote: "The more that you read, the more things you will know.", author: "Dr. Seuss" },
//   { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi" }
// ];

// // Floating particles animation component
// const FloatingParticles = () => {
//   return (
//     <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
//       {[...Array(20)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute w-2 h-2 bg-purple-400 rounded-full opacity-30 animate-float"
//           style={{
//             left: `${Math.random() * 100}%`,
//             top: `${Math.random() * 100}%`,
//             animationDelay: `${Math.random() * 5}s`,
//             animationDuration: `${5 + Math.random() * 10}s`
//           }}
//         />
//       ))}
//     </div>
//   );
// };

// // Help Chat Component
// const HelpChat = ({ isOpen, onClose, userRole }) => {
//   const [messages, setMessages] = useState([
//     { id: 1, sender: 'admin', text: 'Hello! How can I help you today?', time: '10:30 AM' }
//   ]);
//   const [newMessage, setNewMessage] = useState('');

//   const handleSend = () => {
//     if (newMessage.trim()) {
//       setMessages([...messages, {
//         id: messages.length + 1,
//         sender: 'user',
//         text: newMessage,
//         time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//       }]);
//       setNewMessage('');
      
//       setTimeout(() => {
//         setMessages(prev => [...prev, {
//           id: prev.length + 1,
//           sender: 'admin',
//           text: 'Thank you for reaching out! An admin will respond shortly.',
//           time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
//         }]);
//       }, 1000);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col animate-slideUp">
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-t-3xl flex justify-between items-center">
//         <div className="flex items-center gap-3">
//           <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
//             <HelpCircle className="w-6 h-6 text-purple-600" />
//           </div>
//           <div>
//             <h3 className="text-white font-bold">Admin Support</h3>
//             <p className="text-xs text-purple-100">We're here to help!</p>
//           </div>
//         </div>
//         <button onClick={onClose} className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full">
//           <X className="w-5 h-5" />
//         </button>
//       </div>
      
//       <div className="flex-1 p-4 overflow-y-auto space-y-3">
//         {messages.map(msg => (
//           <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
//             <div className={`max-w-[70%] p-3 rounded-2xl ${msg.sender === 'user' ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-800'}`}>
//               <p className="text-sm">{msg.text}</p>
//               <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-purple-200' : 'text-gray-500'}`}>{msg.time}</p>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <div className="p-4 border-t">
//         <div className="flex gap-2">
//           <input
//             type="text"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             placeholder="Type your message..."
//             className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//           />
//           <button onClick={handleSend} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-3 rounded-xl hover:shadow-lg transition-all">
//             <Send className="w-5 h-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Celebration Animation Component
// const CelebrationPopup = ({ show, score, onClose }) => {
//   if (!show) return null;
  
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
//       <div className="bg-gradient-to-br from-yellow-400 via-orange-400 to-pink-500 p-8 rounded-3xl shadow-2xl text-center transform animate-bounceIn max-w-md">
//         <div className="text-6xl mb-4 animate-pulse">🎉</div>
//         <h2 className="text-4xl font-bold text-white mb-2">Awesome!</h2>
//         <p className="text-2xl text-white mb-4">You scored {score}%</p>
//         <div className="flex justify-center gap-2 mb-6">
//           {[...Array(5)].map((_, i) => (
//             <Star key={i} className={`w-8 h-8 ${i < Math.floor(score/20) ? 'text-yellow-300 fill-yellow-300' : 'text-white'} animate-bounce`} style={{ animationDelay: `${i * 0.1}s` }} />
//           ))}
//         </div>
//         <div className="bg-white bg-opacity-20 rounded-lg p-4 mb-4">
//           <p className="text-white font-semibold">+{score} XP Points Earned!</p>
//         </div>
//         <button onClick={onClose} className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition-all transform hover:scale-105">
//           Continue Learning
//         </button>
//       </div>
//     </div>
//   );
// };

// // Course Creation Modal
// const CreateCourseModal = ({ isOpen, onClose, onCreateCourse }) => {
//   const [courseData, setCourseData] = useState({
//     title: '',
//     level: 'Beginner',
//     duration: '',
//     description: ''
//   });

//   const handleCreate = () => {
//     if (courseData.title && courseData.duration) {
//       const courseId = courseData.title.split(' ').map(w => w[0]).join('').toUpperCase() + Math.floor(Math.random() * 1000);
//       onCreateCourse({ ...courseData, id: courseId });
//       setCourseData({ title: '', level: 'Beginner', duration: '', description: '' });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-2xl w-full mx-4 animate-slideUp">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Create New Course</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Course Title</label>
//             <input
//               type="text"
//               value={courseData.title}
//               onChange={(e) => setCourseData({...courseData, title: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//               placeholder="e.g., Advanced React Development"
//             />
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Level</label>
//               <select
//                 value={courseData.level}
//                 onChange={(e) => setCourseData({...courseData, level: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//               >
//                 <option>Beginner</option>
//                 <option>Intermediate</option>
//                 <option>Advanced</option>
//               </select>
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Duration</label>
//               <input
//                 type="text"
//                 value={courseData.duration}
//                 onChange={(e) => setCourseData({...courseData, duration: e.target.value})}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//                 placeholder="e.g., 8 weeks"
//               />
//             </div>
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Description</label>
//             <textarea
//               value={courseData.description}
//               onChange={(e) => setCourseData({...courseData, description: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none h-24"
//               placeholder="Brief course description..."
//             />
//           </div>
          
//           <button onClick={handleCreate} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all">
//             Create Course & Generate ID
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Quiz Creation Modal
// const CreateQuizModal = ({ isOpen, onClose, onCreateQuiz, courses }) => {
//   const [quizData, setQuizData] = useState({
//     title: '',
//     courseId: '',
//     questions: 10,
//     timeLimit: 30
//   });

//   const handleCreate = () => {
//     if (quizData.title && quizData.courseId) {
//       onCreateQuiz(quizData);
//       setQuizData({ title: '', courseId: '', questions: 10, timeLimit: 30 });
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-xl w-full mx-4 animate-slideUp">
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-3xl font-bold text-gray-800">Create Quiz</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
//             <X className="w-6 h-6" />
//           </button>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Quiz Title</label>
//             <input
//               type="text"
//               value={quizData.title}
//               onChange={(e) => setQuizData({...quizData, title: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//               placeholder="e.g., JavaScript Fundamentals Quiz"
//             />
//           </div>
          
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Select Course</label>
//             <select
//               value={quizData.courseId}
//               onChange={(e) => setQuizData({...quizData, courseId: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//             >
//               <option value="">Choose a course...</option>
//               {courses.map(course => (
//                 <option key={course.id} value={course.id}>{course.title}</option>
//               ))}
//             </select>
//           </div>
          
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Questions</label>
//               <input
//                 type="number"
//                 value={quizData.questions}
//                 onChange={(e) => setQuizData({...quizData, questions: parseInt(e.target.value)})}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//               />
//             </div>
            
//             <div>
//               <label className="block text-gray-700 font-semibold mb-2">Time (min)</label>
//               <input
//                 type="number"
//                 value={quizData.timeLimit}
//                 onChange={(e) => setQuizData({...quizData, timeLimit: parseInt(e.target.value)})}
//                 className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//               />
//             </div>
//           </div>
          
//           <button onClick={handleCreate} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all">
//             Create Quiz
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Join Course Modal
// const JoinCourseModal = ({ isOpen, onClose, onJoinCourse }) => {
//   const [courseId, setCourseId] = useState('');

//   const handleJoin = () => {
//     if (courseId.trim()) {
//       onJoinCourse(courseId.toUpperCase());
//       setCourseId('');
//       onClose();
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 animate-fadeIn">
//       <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full mx-4 animate-bounceIn">
//         <div className="text-center mb-6">
//           <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-4 rounded-full mb-4">
//             <BookOpen className="w-12 h-12 text-white" />
//           </div>
//           <h2 className="text-3xl font-bold text-gray-800 mb-2">Join Course</h2>
//           <p className="text-gray-600">Enter the course ID provided by your teacher</p>
//         </div>
        
//         <div className="space-y-4">
//           <div>
//             <label className="block text-gray-700 font-semibold mb-2">Course ID</label>
//             <input
//               type="text"
//               value={courseId}
//               onChange={(e) => setCourseId(e.target.value)}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none text-center text-2xl font-bold tracking-wider"
//               placeholder="WD101"
//             />
//           </div>
          
//           <div className="flex gap-3">
//             <button onClick={onClose} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-300 transition-all">
//               Cancel
//             </button>
//             <button onClick={handleJoin} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
//               Join Course
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Course Detail View
// const CourseDetailView = ({ course, onBack }) => {
//   const content = courseContent[course.id] || { modules: [] };
  
//   return (
//     <div className="p-6 space-y-6 animate-fadeIn">
//       <button onClick={onBack} className="flex items-center gap-2 text-purple-600 hover:text-purple-800 font-semibold">
//         ← Back to Courses
//       </button>
      
//       <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl p-8 text-white">
//         <div className="flex justify-between items-start">
//           <div>
//             <h1 className="text-4xl font-bold mb-2">{course.title}</h1>
//             <p className="text-purple-100 mb-4">{course.instructor}</p>
//             <div className="flex gap-4">
//               <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">{course.level}</span>
//               <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full">{course.duration}</span>
//               <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full flex items-center gap-1">
//                 <Star className="w-4 h-4 fill-white" /> {course.rating}
//               </span>
//             </div>
//           </div>
//           <div className="text-center">
//             <div className="text-5xl font-bold">{course.progress}%</div>
//             <p className="text-sm text-purple-100">Complete</p>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
//         <div className="lg:col-span-2 space-y-4">
//           <h2 className="text-2xl font-bold text-gray-800">Course Content</h2>
//           {content.modules.map((module, index) => (
//             <div key={module.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer">
//               <div className="flex items-center gap-4">
//                 <div className={`w-12 h-12 rounded-full flex items-center justify-center ${module.completed ? 'bg-green-100' : 'bg-purple-100'}`}>
//                   {module.type === 'video' ? <Play className={`w-6 h-6 ${module.completed ? 'text-green-600' : 'text-purple-600'}`} /> : 
//                    module.type === 'reading' ? <FileText className={`w-6 h-6 ${module.completed ? 'text-green-600' : 'text-purple-600'}`} /> :
//                    <CheckSquare className={`w-6 h-6 ${module.completed ? 'text-green-600' : 'text-purple-600'}`} />}
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="font-bold text-gray-800">{module.title}</h3>
//                   <p className="text-sm text-gray-600">{module.duration}</p>
//                 </div>
//                 {module.completed ? (
//                   <CheckCircle className="w-6 h-6 text-green-600" />
//                 ) : (
//                   <button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-all">
//                     Start
//                   </button>
//                 )}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="space-y-4">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="font-bold text-gray-800 mb-4">Course Stats</h3>
//             <div className="space-y-3">
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Enrolled Students</span>
//                 <span className="font-bold text-purple-600">{course.enrolled}</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Completion Rate</span>
//                 <span className="font-bold text-green-600">87%</span>
//               </div>
//               <div className="flex justify-between">
//                 <span className="text-gray-600">Avg. Quiz Score</span>
//                 <span className="font-bold text-blue-600">82%</span>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-6 text-white">
//             <Brain className="w-8 h-8 mb-3" />
//             <h3 className="font-bold mb-2">Learning Tip!</h3>
//             <p className="text-sm">Practice coding along with videos for better retention!</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Login Page Component
// const LoginPage = ({ onLogin }) => {
//   const [role, setRole] = useState('student');
//   const [credentials, setCredentials] = useState({ email: '', password: '' });

//   const handleLogin = (e) => {
//     e.preventDefault();
//     onLogin(role);
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center p-4 relative overflow-hidden">
//       <FloatingParticles />
      
//       <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full relative z-10 transform hover:scale-105 transition-transform">
//         <div className="text-center mb-8">
//           <div className="inline-block bg-gradient-to-r from-purple-600 to-blue-600 p-3 rounded-2xl mb-4 animate-bounce">
//             <BookOpen className="w-12 h-12 text-white" />
//           </div>
//           <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">EduVerse</h1>
//           <p className="text-gray-600">Learn. Play. Achieve.</p>
//         </div>

//         <div className="flex gap-2 mb-6">
//           <button onClick={() => setRole('student')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${role === 'student' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
//             Student
//           </button>
//           <button onClick={() => setRole('teacher')} className={`flex-1 py-3 rounded-xl font-semibold transition-all ${role === 'teacher' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>
//             Teacher
//           </button>
//         </div>

//         <form onSubmit={handleLogin}>
//           <div className="mb-4">
//             <label className="block text-gray-700 font-semibold mb-2">Email</label>
//             <input type="email" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors" placeholder="your.email@example.com" value={credentials.email} onChange={(e) => setCredentials({...credentials, email: e.target.value})} />
//           </div>
//           <div className="mb-6">
//             <label className="block text-gray-700 font-semibold mb-2">Password</label>
//             <input type="password" className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none transition-colors" placeholder="••••••••" value={credentials.password} onChange={(e) => setCredentials({...credentials, password: e.target.value})} />
//           </div>
//           <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transform hover:scale-105 transition-all">
//             Login to {role === 'student' ? 'Learn' : 'Teach'}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Student Dashboard Component
// const StudentDashboard = ({ onNavigate, courses }) => {
//   const [stats] = useState({
//     points: 2387,
//     streak: 31,
//     coursesCompleted: 7,
//     rank: 4
//   });

//   const [didYouKnow, setDidYouKnow] = useState(didYouKnowFacts[0]);
//   const [quote, setQuote] = useState(motivationalQuotes[0]);

//   useEffect(() => {
//     const factInterval = setInterval(() => {
//       setDidYouKnow(didYouKnowFacts[Math.floor(Math.random() * didYouKnowFacts.length)]);
//     }, 10000);

//     return () => clearInterval(factInterval);
//   }, []);

//   return (
//     <div className="p-6 space-y-6 animate-fadeIn relative">
//       <FloatingParticles />
      
//       <div className="flex justify-between items-center relative z-10">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-800">Welcome back, Anushka! 👋</h1>
//           <p className="text-gray-600">Ready to continue your learning journey?</p>
//         </div>
//         <div className="flex items-center gap-3 bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-3 rounded-2xl animate-pulse">
//           <Flame className="w-6 h-6" />
//           <div>
//             <p className="text-sm opacity-90">Current Streak</p>
//             <p className="text-2xl font-bold">{stats.streak} Days</p>
//           </div>
//         </div>
//       </div>

//       {/* Did You Know & Quote Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10">
//         <div className="bg-gradient-to-br from-cyan-400 to-blue-500 p-6 rounded-2xl text-white animate-slideUp shadow-lg">
//           <div className="flex items-center gap-3 mb-3">
//             <Lightbulb className="w-8 h-8" />
//             <h3 className="text-xl font-bold">Did You Know?</h3>
//           </div>
//           <p className="text-lg">{didYouKnow}</p>
//         </div>

//         <div className="bg-gradient-to-br from-pink-400 to-purple-500 p-6 rounded-2xl text-white animate-slideUp shadow-lg" style={{ animationDelay: '0.1s' }}>
//           <div className="flex items-center gap-3 mb-3">
//             <Quote className="w-8 h-8" />
//             <h3 className="text-xl font-bold">Motivation</h3>
//           </div>
//           <p className="text-lg italic">"{quote.quote}"</p>
//           <p className="text-sm mt-2 opacity-90">— {quote.author}</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
//         <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer shadow-lg">
//           <div className="flex items-center justify-between mb-2">
//             <Zap className="w-8 h-8" />
//             <Trophy className="w-6 h-6 opacity-50" />
//           </div>
//           <p className="text-sm opacity-90">Total Points</p>
//           <p className="text-3xl font-bold">{stats.points}</p>
//         </div>

//         <div className="bg-gradient-to-br from-blue-500 to-blue-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer shadow-lg" onClick={() => onNavigate('courses')}>
//           <div className="flex items-center justify-between mb-2">
//             <BookOpen className="w-8 h-8" />
//             <CheckCircle className="w-6 h-6 opacity-50" />
//           </div>
//           <p className="text-sm opacity-90">Courses Completed</p>
//           <p className="text-3xl font-bold">{stats.coursesCompleted}</p>
//         </div>

//         <div className="bg-gradient-to-br from-green-500 to-green-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer shadow-lg" onClick={() => onNavigate('leaderboard')}>
//           <div className="flex items-center justify-between mb-2">
//             <Medal className="w-8 h-8" />
//             <TrendingUp className="w-6 h-6 opacity-50" />
//           </div>
//           <p className="text-sm opacity-90">Global Rank</p>
//           <p className="text-3xl font-bold">#{stats.rank}</p>
//         </div>

//         <div className="bg-gradient-to-br from-orange-500 to-orange-700 p-6 rounded-2xl text-white transform hover:scale-105 transition-all cursor-pointer shadow-lg">
//           <div className="flex items-center justify-between mb-2">
//             <Award className="w-8 h-8" />
//             <Sparkles className="w-6 h-6 opacity-50" />
//           </div>
//           <p className="text-sm opacity-90">Badges Earned</p>
//           <p className="text-3xl font-bold">3/6</p>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
//         <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
//           <h2 className="text-xl font-bold text-gray-800 mb-4">Continue Learning</h2>
//           <div className="space-y-4">
//             {courses.filter(c => c.progress > 0 && c.progress < 100 && c.approved).map(course => (
//               <div key={course.id} className="border-2 border-gray-100 rounded-xl p-4 hover:border-purple-300 transition-all cursor-pointer transform hover:scale-102">
//                 <div className="flex justify-between items-start mb-3">
//                   <div className="flex-1">
//                     <h3 className="font-bold text-gray-800 mb-1">{course.title}</h3>
//                     <p className="text-sm text-gray-600">{course.instructor}</p>
//                   </div>
//                   <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold">{course.progress}%</span>
//                 </div>
//                 <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                   <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all" style={{ width: `${course.progress}%` }}></div>
//                 </div>
//                 <button onClick={() => onNavigate('courseDetail', course)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:shadow-lg transition-all flex items-center gap-2">
//                   Continue <ArrowRight className="w-4 h-4" />
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="space-y-4">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Badges</h2>
//             <div className="space-y-3">
//               <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 transform hover:scale-105 transition-all">
//                 <div className="flex items-center gap-3">
//                   <div className="text-4xl">🎯</div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-800">First Steps</p>
//                     <p className="text-xs text-gray-600">Complete your first course</p>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-4 transform hover:scale-105 transition-all">
//                 <div className="flex items-center gap-3">
//                   <div className="text-4xl">🧠</div>
//                   <div className="flex-1">
//                     <p className="font-bold text-gray-800">Quiz Master</p>
//                     <p className="text-xs text-gray-600">Score 90+ on 5 quizzes</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-gradient-to-br from-green-400 to-teal-500 rounded-2xl p-6 text-white shadow-lg">
//             <Smile className="w-8 h-8 mb-3" />
//             <h3 className="font-bold text-lg mb-2">Keep Going!</h3>
//             <p className="text-sm">You're doing amazing! Just 3 more lessons to complete this week's goal! 🎉</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Courses Page Component
// const CoursesPage = ({ onJoinCourse, courses, onViewCourse }) => {
//   const [filter, setFilter] = useState('all');
//   const [search, setSearch] = useState('');
//   const [showJoinModal, setShowJoinModal] = useState(false);

//   return (
//     <div className="p-6 space-y-6 animate-fadeIn relative">
//       <FloatingParticles />
      
//       <div className="flex justify-between items-center relative z-10">
//         <h1 className="text-3xl font-bold text-gray-800">Explore Courses</h1>
//         <button onClick={() => setShowJoinModal(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
//           <Plus className="w-5 h-5" /> Join Course with ID
//         </button>
//       </div>

//       <JoinCourseModal isOpen={showJoinModal} onClose={() => setShowJoinModal(false)} onJoinCourse={onJoinCourse} />

//       <div className="flex gap-3 relative z-10">
//         <div className="relative flex-1">
//           <Search className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
//           <input type="text" placeholder="Search courses..." className="w-full pl-10 pr-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none" value={search} onChange={(e) => setSearch(e.target.value)} />
//         </div>
//         <select className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none" value={filter} onChange={(e) => setFilter(e.target.value)}>
//           <option value="all">All Levels</option>
//           <option value="beginner">Beginner</option>
//           <option value="intermediate">Intermediate</option>
//           <option value="advanced">Advanced</option>
//         </select>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
//         {courses.filter(c => c.approved).map(course => (
//           <div key={course.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer">
//             <div className="h-40 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 flex items-center justify-center relative">
//               <BookOpen className="w-16 h-16 text-white opacity-50" />
//               <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-bold text-purple-600">
//                 {course.id}
//               </div>
//             </div>
//             <div className="p-6">
//               <div className="flex justify-between items-start mb-3">
//                 <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.level === 'Beginner' ? 'bg-green-100 text-green-700' : course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' : 'bg-red-100 text-red-700'}`}>
//                   {course.level}
//                 </span>
//                 <div className="flex items-center gap-1">
//                   <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
//                   <span className="text-sm font-semibold text-gray-700">{course.rating}</span>
//                 </div>
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
//               <p className="text-sm text-gray-600 mb-4">{course.instructor}</p>
//               <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
//                 <div className="flex items-center gap-1">
//                   <Users className="w-4 h-4" />
//                   <span>{course.enrolled}</span>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <Clock className="w-4 h-4" />
//                   <span>{course.duration}</span>
//                 </div>
//               </div>
//               {course.progress > 0 ? (
//                 <>
//                   <div className="w-full bg-gray-200 rounded-full h-2 mb-3">
//                     <div className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full" style={{ width: `${course.progress}%` }}></div>
//                   </div>
//                   <button onClick={() => onViewCourse(course)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
//                     Continue Learning
//                   </button>
//                 </>
//               ) : (
//                 <button onClick={() => onViewCourse(course)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
//                   View Course
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// // Enhanced Discussion Forum
// const DiscussionForum = ({ userRole }) => {
//   const [posts, setPosts] = useState([
//     { id: 1, author: 'Sarah Johnson', avatar: '👩‍🎓', title: 'Help with React Hooks', content: 'Can someone explain useEffect dependencies?', replies: [
//       { id: 1, author: 'Mike Chen', content: 'useEffect dependencies tell React when to re-run the effect...', likes: 5 }
//     ], likes: 24, time: '2h ago', course: 'Web Development' },
//     { id: 2, author: 'Mike Chen', avatar: '👨‍💻', title: 'Binary Search Tree Implementation', content: 'Having trouble with BST deletion...', replies: [], likes: 15, time: '4h ago', course: 'Data Structures' }
//   ]);

//   const [newPost, setNewPost] = useState({ title: '', content: '', course: '' });
//   const [showNewPost, setShowNewPost] = useState(false);
//   const [expandedPost, setExpandedPost] = useState(null);
//   const [replyText, setReplyText] = useState('');

//   const handleCreatePost = () => {
//     if (newPost.title && newPost.content) {
//       setPosts([{
//         id: posts.length + 1,
//         author: userRole === 'student' ? 'Current User' : 'Teacher',
//         avatar: userRole === 'student' ? '👤' : '👨‍🏫',
//         title: newPost.title,
//         content: newPost.content,
//         replies: [],
//         likes: 0,
//         time: 'Just now',
//         course: newPost.course
//       }, ...posts]);
//       setNewPost({ title: '', content: '', course: '' });
//       setShowNewPost(false);
//     }
//   };

//   const handleReply = (postId) => {
//     if (replyText.trim()) {
//       setPosts(posts.map(post => 
//         post.id === postId 
//           ? { ...post, replies: [...post.replies, { id: post.replies.length + 1, author: 'Current User', content: replyText, likes: 0 }] }
//           : post
//       ));
//       setReplyText('');
//     }
//   };

//   return (
//     <div className="p-6 space-y-6 animate-fadeIn relative">
//       <FloatingParticles />
      
//       <div className="flex justify-between items-center relative z-10">
//         <h1 className="text-3xl font-bold text-gray-800">Discussion Forum</h1>
//         <button onClick={() => setShowNewPost(true)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all flex items-center gap-2">
//           <Plus className="w-5 h-5" /> New Discussion
//         </button>
//       </div>

//       {showNewPost && (
//         <div className="bg-white rounded-2xl shadow-lg p-6 relative z-10 animate-slideUp">
//           <h3 className="text-xl font-bold text-gray-800 mb-4">Start New Discussion</h3>
//           <div className="space-y-4">
//             <input
//               type="text"
//               placeholder="Discussion Title"
//               value={newPost.title}
//               onChange={(e) => setNewPost({...newPost, title: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//             />
//             <textarea
//               placeholder="What's your question or topic?"
//               value={newPost.content}
//               onChange={(e) => setNewPost({...newPost, content: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none h-24"
//             />
//             <input
//               type="text"
//               placeholder="Course (optional)"
//               value={newPost.course}
//               onChange={(e) => setNewPost({...newPost, course: e.target.value})}
//               className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//             />
//             <div className="flex gap-3">
//               <button onClick={() => setShowNewPost(false)} className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-xl font-semibold">Cancel</button>
//               <button onClick={handleCreatePost} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold">Post</button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 relative z-10">
//         <div className="lg:col-span-2 space-y-4">
//           {posts.map(post => (
//             <div key={post.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all">
//               <div className="flex items-start gap-4">
//                 <div className="text-4xl">{post.avatar}</div>
//                 <div className="flex-1">
//                   <div className="flex items-center gap-2 mb-2">
//                     <h3 className="font-bold text-lg text-gray-800">{post.title}</h3>
//                     {post.course && <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">{post.course}</span>}
//                   </div>
//                   <p className="text-gray-600 mb-3">{post.content}</p>
//                   <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
//                     <span className="font-semibold text-gray-700">{post.author}</span>
//                     <span>•</span>
//                     <span>{post.time}</span>
//                     <button className="flex items-center gap-1 hover:text-purple-600">
//                       <ThumbsUp className="w-4 h-4" />
//                       <span>{post.likes}</span>
//                     </button>
//                     <button onClick={() => setExpandedPost(expandedPost === post.id ? null : post.id)} className="flex items-center gap-1 hover:text-purple-600">
//                       <Reply className="w-4 h-4" />
//                       <span>{post.replies.length} replies</span>
//                     </button>
//                   </div>
                  
//                   {expandedPost === post.id && (
//                     <div className="border-t pt-4 mt-4 space-y-3">
//                       {post.replies.map(reply => (
//                         <div key={reply.id} className="bg-gray-50 rounded-xl p-4">
//                           <p className="font-semibold text-sm text-gray-800 mb-1">{reply.author}</p>
//                           <p className="text-sm text-gray-600 mb-2">{reply.content}</p>
//                           <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-purple-600">
//                             <ThumbsUp className="w-3 h-3" />
//                             <span>{reply.likes}</span>
//                           </button>
//                         </div>
//                       ))}
//                       <div className="flex gap-2">
//                         <input
//                           type="text"
//                           value={replyText}
//                           onChange={(e) => setReplyText(e.target.value)}
//                           placeholder="Write a reply..."
//                           className="flex-1 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-purple-600 focus:outline-none"
//                         />
//                         <button onClick={() => handleReply(post.id)} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2 rounded-xl hover:shadow-lg transition-all">
//                           <Send className="w-4 h-4" />
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="space-y-4">
//           <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl shadow-lg p-6">
//             <h3 className="font-bold text-lg mb-4">📢 Forum Guidelines</h3>
//             <ul className="space-y-2 text-sm">
//               <li>✓ Be respectful and helpful</li>
//               <li>✓ Search before posting</li>
//               <li>✓ Use clear titles</li>
//               <li>✓ Mark solved discussions</li>
//             </ul>
//           </div>
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <h3 className="font-bold text-lg text-gray-800 mb-4">🔥 Trending Topics</h3>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-700">#ReactHooks</span>
//                 <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">124</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-700">#AlgorithmHelp</span>
//                 <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">98</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <span className="text-sm text-gray-700">#MLBasics</span>
//                 <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-semibold">87</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // Quiz Page (keeping existing implementation)
// const QuizPage = ({ quizzes }) => {
//   const [selectedQuiz, setSelectedQuiz] = useState(null);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showExplanation, setShowExplanation] = useState(false);
//   const [score, setScore] = useState(0);
//   const [quizComplete, setQuizComplete] = useState(false);
//   const [showCelebration, setShowCelebration] = useState(false);

//   const sampleQuestions = [
//     {
//       question: "What does HTML stand for?",
//       options: ["Hyper Text Markup Language", "High Tech Modern Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language"],
//       correct: 0,
//       explanation: "HTML stands for Hyper Text Markup Language. It's the standard markup language for creating web pages. 'Hyper Text' refers to links that connect web pages, and 'Markup Language' means it uses tags to define elements."
//     },
//     {
//       question: "Which CSS property controls text size?",
//       options: ["text-style", "font-style", "text-size", "font-size"],
//       correct: 3,
//       explanation: "The 'font-size' property is used to control text size in CSS. Other options like 'font-style' controls italic/normal text, while 'text-style' and 'text-size' are not valid CSS properties."
//     },
//     {
//       question: "What is the correct syntax for referring to an external JavaScript file?",
//       options: ["<script href='app.js'>", "<script name='app.js'>", "<script src='app.js'>", "<script file='app.js'>"],
//       correct: 2,
//       explanation: "The correct syntax is <script src='app.js'>. The 'src' attribute specifies the URL of the external script file, similar to how 'src' is used in <img> tags for images."
//     }
//   ];

//   const handleAnswerSelect = (index) => {
//     if (showExplanation) return;
//     setSelectedAnswer(index);
//   };

//   const handleSubmitAnswer = () => {
//     setShowExplanation(true);
//     if (selectedAnswer === sampleQuestions[currentQuestion].correct) {
//       setScore(score + 1);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion < sampleQuestions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//       setShowExplanation(false);
//     } else {
//       const finalScore = Math.round(((score + (selectedAnswer === sampleQuestions[currentQuestion].correct ? 1 : 0)) / sampleQuestions.length) * 100);
//       setQuizComplete(true);
//       setShowCelebration(true);
//     }
//   };

//   if (!selectedQuiz) {
//     return (
//       <div className="p-6 space-y-6 animate-fadeIn relative">
//         <FloatingParticles />
//         <h1 className="text-3xl font-bold text-gray-800 relative z-10">Available Quizzes</h1>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
//           {quizzes.map(quiz => (
//             <div key={quiz.id} className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-2xl transition-all transform hover:scale-105">
//               <div className="flex items-start justify-between mb-4">
//                 <div className="bg-gradient-to-br from-purple-100 to-blue-100 p-3 rounded-xl">
//                   <Target className="w-8 h-8 text-purple-600" />
//                 </div>
//                 {quiz.score !== null && (
//                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">{quiz.score}%</span>
//                 )}
//               </div>
//               <h3 className="text-xl font-bold text-gray-800 mb-2">{quiz.title}</h3>
//               <p className="text-sm text-gray-600 mb-4">{quiz.course}</p>
//               <div className="space-y-2 mb-4">
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>Questions</span>
//                   <span className="font-semibold">{quiz.questions}</span>
//                 </div>
//                 <div className="flex items-center justify-between text-sm text-gray-600">
//                   <span>Time Limit</span>
//                   <span className="font-semibold">{quiz.timeLimit} min</span>
//                 </div>
//               </div>
//               {quiz.available ? (
//                 <button onClick={() => setSelectedQuiz(quiz)} className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
//                   {quiz.score !== null ? 'Retake Quiz' : 'Start Quiz'}
//                 </button>
//               ) : (
//                 <button disabled className="w-full bg-gray-300 text-gray-500 py-3 rounded-xl font-semibold cursor-not-allowed">
//                   Available in 24h
//                 </button>
//               )}
//             </div>
//           ))}
//         </div>
//       </div>
//     );
//   }

//   if (quizComplete) {
//     const finalScore = Math.round((score / sampleQuestions.length) * 100);
//     return (
//       <>
//         <CelebrationPopup show={showCelebration} score={finalScore} onClose={() => {
//           setShowCelebration(false);
//           setSelectedQuiz(null);
//           setCurrentQuestion(0);
//           setScore(0);
//           setQuizComplete(false);
//         }} />
//       </>
//     );
//   }

//   const question = sampleQuestions[currentQuestion];
//   const isCorrect = selectedAnswer === question.correct;

//   return (
//     <div className="p-6 flex items-center justify-center min-h-screen animate-fadeIn relative">
//       <FloatingParticles />
//       <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-3xl w-full relative z-10">
//         <div className="flex justify-between items-center mb-6">
//           <button onClick={() => setSelectedQuiz(null)} className="text-gray-600 hover:text-gray-800">← Back</button>
//           <div className="bg-purple-100 text-purple-700 px-4 py-2 rounded-full font-semibold">
//             Question {currentQuestion + 1}/{sampleQuestions.length}
//           </div>
//         </div>
//                 <h2 className="text-2xl font-bold text-gray-800 mb-6">{question.question}</h2>

//         <div className="space-y-4 mb-6">
//           {question.options.map((option, index) => (
//             <button
//               key={index}
//               onClick={() => handleAnswerSelect(index)}
//               disabled={showExplanation}
//               className={`w-full text-left px-6 py-4 border-2 rounded-xl transition-all font-semibold ${
//                 selectedAnswer === index
//                   ? selectedAnswer === question.correct
//                     ? "border-green-500 bg-green-50 text-green-700"
//                     : "border-red-500 bg-red-50 text-red-700"
//                   : "border-gray-200 hover:border-purple-400 hover:bg-purple-50"
//               }`}
//             >
//               {option}
//             </button>
//           ))}
//         </div>

//         {!showExplanation ? (
//           <button
//             onClick={handleSubmitAnswer}
//             disabled={selectedAnswer === null}
//             className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
//               selectedAnswer === null
//                 ? "bg-gray-300 cursor-not-allowed"
//                 : "bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-lg transform hover:scale-105"
//             }`}
//           >
//             Submit Answer
//           </button>
//         ) : (
//           <div className="space-y-4">
//             <div
//               className={`p-4 rounded-xl ${
//                 isCorrect
//                   ? "bg-green-100 text-green-800"
//                   : "bg-red-100 text-red-800"
//               }`}
//             >
//               <p className="font-semibold text-lg mb-2">
//                 {isCorrect ? "✅ Correct!" : "❌ Incorrect"}
//               </p>
//               <p className="text-sm">{question.explanation}</p>
//             </div>

//             <button
//               onClick={handleNextQuestion}
//               className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-4 rounded-xl font-bold hover:shadow-lg transition-all transform hover:scale-105"
//             >
//               {currentQuestion === sampleQuestions.length - 1
//                 ? "Finish Quiz"
//                 : "Next Question"}
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
// // ---------- LeaderboardPage (visually styled + interactive) ----------
// const LeaderboardPage = () => {
//   const [data, setData] = useState([
//     { rank: 1, name: "Anushkaa", points: 4520, courses: 6 },
//     { rank: 2, name: "Nirwani Adhau", points: 4390, courses: 5 },
//     { rank: 3, name: "Emily Brown", points: 4280, courses: 8 },
//     { rank: 4, name: "Apurvaa", points: 4100, courses: 7 },
//     { rank: 5, name: "Mayank", points: 3950, courses: 4 }
//   ]);
//   const [sortKey, setSortKey] = useState('rank');
//   const [direction, setDirection] = useState('asc');
//   const [query, setQuery] = useState('');

//   useEffect(() => {
//     // keep ranks correct after sorting/filtering
//     setData(prev => prev.map((item, i) => ({ ...item, rank: i + 1 })));
//     // eslint-disable-next-line
//   }, []);

//   const handleSort = (key) => {
//     let nextDir = direction === 'asc' ? 'desc' : 'asc';
//     setDirection(nextDir);
//     setSortKey(key);
//     const sorted = [...data].sort((a, b) => {
//       if (a[key] < b[key]) return nextDir === 'asc' ? -1 : 1;
//       if (a[key] > b[key]) return nextDir === 'asc' ? 1 : -1;
//       return 0;
//     });
//     setData(sorted.map((item, idx) => ({ ...item, rank: idx + 1 })));
//   };

//   const filtered = data.filter(d => d.name.toLowerCase().includes(query.toLowerCase()));

//   return (
//     <div className="p-6 animate-fadeIn relative">
//       <FloatingParticles />
//       <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative z-10">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">🏆 Leaderboard</h1>
//           <div className="flex items-center gap-3">
//             <input
//               value={query}
//               onChange={(e) => setQuery(e.target.value)}
//               placeholder="Search name..."
//               className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600"
//             />
//             <button onClick={() => { setQuery(''); }} className="px-3 py-2 bg-gray-100 rounded-xl hover:bg-gray-200">Clear</button>
//           </div>
//         </div>

//         <div className="overflow-hidden rounded-2xl border">
//           <table className="w-full table-auto">
//             <thead className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
//               <tr>
//                 <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('rank')}>Rank</th>
//                 <th className="py-3 px-4 text-left cursor-pointer" onClick={() => handleSort('name')}>Name</th>
//                 <th className="py-3 px-4 text-right cursor-pointer" onClick={() => handleSort('points')}>Points</th>
//                 <th className="py-3 px-4 text-right cursor-pointer" onClick={() => handleSort('courses')}>Courses</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((row) => (
//                 <tr key={row.name} className="border-b hover:bg-purple-50 transition-all">
//                   <td className="py-3 px-4 font-semibold text-purple-700">#{row.rank}</td>
//                   <td className="py-3 px-4">
//                     <div className="flex items-center gap-3">
//                       <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center text-xl">
//                         {row.name.split(' ').map(n => n[0]).slice(0,2).join('')}
//                       </div>
//                       <div>
//                         <div className="font-semibold text-gray-800">{row.name}</div>
//                         <div className="text-xs text-gray-500">Top performer</div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="py-3 px-4 text-right font-bold">{row.points}</td>
//                   <td className="py-3 px-4 text-right">{row.courses}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
//           <div className="bg-gradient-to-br from-purple-500 to-purple-700 text-white rounded-2xl p-4">
//             <p className="text-sm opacity-90">Top Points</p>
//             <p className="text-2xl font-bold">{Math.max(...data.map(d => d.points))}</p>
//           </div>
//           <div className="bg-gradient-to-br from-blue-500 to-teal-500 text-white rounded-2xl p-4">
//             <p className="text-sm opacity-90">Average Points</p>
//             <p className="text-2xl font-bold">{Math.round(data.reduce((s, d) => s + d.points, 0)/data.length)}</p>
//           </div>
//           <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-4">
//             <p className="text-sm opacity-90">Total Users</p>
//             <p className="text-2xl font-bold">{data.length}</p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------- TeacherDashboard (visually styled, interactive mini-charts) ----------
// const TeacherDashboard = ({ onNavigate }) => {
//   // We'll use your initialCourses for list (exists above in file)
//   const [courses, setCourses] = useState(initialCourses || []);
//   const [selectedCourse, setSelectedCourse] = useState(courses[0]?.id || null);
//   const [timeRange, setTimeRange] = useState('30'); // days
//   const [showDetails, setShowDetails] = useState(true);

//   // Dummy analytics generation per course
//   const analyticsFor = (courseId) => {
//     // deterministic seed from courseId
//     const base = courseId.split('').reduce((s, c) => s + c.charCodeAt(0), 0);
//     const students = (base % 200) + 50;
//     const avgScore = 60 + (base % 40);
//     const completion = Math.min(100, 30 + (base % 70));
//     const weekly = Array.from({ length: 7 }).map((_, i) => Math.max(10, Math.round((Math.sin((base + i) / 5) + 1) * (avgScore / 2))));
//     return { students, avgScore, completion, weekly };
//   };

//   const currentAnalytics = analyticsFor(selectedCourse || (courses[0] && courses[0].id));

//   return (
//     <div className="p-6 animate-fadeIn relative">
//       <FloatingParticles />
//       <div className="max-w-5xl mx-auto bg-white rounded-3xl shadow-2xl p-8 relative z-10">
//         <div className="flex justify-between items-center mb-6">
//           <h1 className="text-3xl font-bold text-gray-800">👩‍🏫 Teacher Dashboard</h1>
//           <div className="flex items-center gap-3">
//             <select
//               value={selectedCourse}
//               onChange={(e) => setSelectedCourse(e.target.value)}
//               className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600"
//             >
//               {courses.map(c => <option key={c.id} value={c.id}>{c.title} ({c.id})</option>)}
//             </select>

//             <select
//               value={timeRange}
//               onChange={(e) => setTimeRange(e.target.value)}
//               className="px-3 py-2 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-600"
//             >
//               <option value="7">7 days</option>
//               <option value="30">30 days</option>
//               <option value="90">90 days</option>
//             </select>

//             <button onClick={() => setShowDetails(s => !s)} className="px-3 py-2 rounded-xl bg-gray-100 hover:bg-gray-200">
//               {showDetails ? 'Hide Details' : 'Show Details'}
//             </button>
//           </div>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
//           <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white rounded-2xl p-5">
//             <p className="text-sm opacity-90">Students Enrolled</p>
//             <p className="text-2xl font-bold">{currentAnalytics.students}</p>
//             <p className="text-xs opacity-80 mt-2">In last {timeRange} days</p>
//           </div>

//           <div className="bg-gradient-to-br from-green-500 to-teal-500 text-white rounded-2xl p-5">
//             <p className="text-sm opacity-90">Avg Quiz Score</p>
//             <p className="text-2xl font-bold">{currentAnalytics.avgScore}%</p>
//             <p className="text-xs opacity-80 mt-2">Class average</p>
//           </div>

//           <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white rounded-2xl p-5">
//             <p className="text-sm opacity-90">Completion Rate</p>
//             <p className="text-2xl font-bold">{currentAnalytics.completion}%</p>
//             <p className="text-xs opacity-80 mt-2">Course progress</p>
//           </div>
//         </div>

//         <div className="bg-white rounded-2xl shadow-lg p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h3 className="font-bold text-gray-800">Weekly Activity</h3>
//             <div className="text-sm text-gray-500">Interactive mini-chart</div>
//           </div>

//           <div className="flex items-end gap-3 h-36">
//             {currentAnalytics.weekly.map((v, i) => {
//               const height = Math.max(8, (v / 100) * 100);
//               return (
//                 <div key={i} className="flex-1 text-center">
//                   <div
//                     title={`${v}%`}
//                     className="mx-auto rounded-t-xl"
//                     style={{
//                       height: `${height}%`,
//                       background: 'linear-gradient(180deg,#7c3aed,#06b6d4)',
//                       width: '60%',
//                       marginBottom: '6px',
//                     }}
//                   />
//                   <div className="text-xs text-gray-600">Day {i+1}</div>
//                 </div>
//               );
//             })}
//           </div>

//           {showDetails && (
//             <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div className="p-4 border rounded-xl">
//                 <h4 className="font-semibold mb-2">Student Distribution</h4>
//                 <p className="text-sm text-gray-600">Example: Most students are active around mid-course.</p>
//                 <div className="mt-3 flex gap-2">
//                   <div className="flex-1">
//                     <div className="text-xs text-gray-500 mb-1">Active</div>
//                     <div className="w-full bg-gray-200 h-3 rounded-full overflow-hidden">
//                       <div className="h-3 rounded-full" style={{ width: `${Math.min(100, currentAnalytics.students / 5)}%`, background: 'linear-gradient(90deg,#8b5cf6,#06b6d4)' }} />
//                     </div>
//                   </div>
//                   <div className="w-20 text-center">
//                     <div className="text-lg font-bold">{Math.round(currentAnalytics.students/10)}</div>
//                     <div className="text-xs text-gray-500">Active</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="p-4 border rounded-xl">
//                 <h4 className="font-semibold mb-2">Upcoming Assignments</h4>
//                 <ul className="space-y-2">
//                   <li className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">DOM Practice</div>
//                       <div className="text-xs text-gray-500">Due in 3 days</div>
//                     </div>
//                     <div className="text-sm bg-purple-100 text-purple-700 px-3 py-1 rounded-full">Draft</div>
//                   </li>
//                   <li className="flex justify-between items-center">
//                     <div>
//                       <div className="font-semibold">Quiz: CSS Basics</div>
//                       <div className="text-xs text-gray-500">Due in 6 days</div>
//                     </div>
//                     <div className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">Scheduled</div>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           )}
//         </div>

//         <div className="mt-6 text-center">
//           <button onClick={() => onNavigate && onNavigate('courses')} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg">
//             View Course Management
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// // ---------- App() - main wrapper (passes data into child pages) ----------
// function App() {
//   // keep your original state names if they already existed above; if duplicate, remove the duplicate above.
//   const [userRole, setUserRole] = useState('student');
//   const [currentPage, setCurrentPage] = useState('dashboard');
//   const [showHelp, setShowHelp] = useState(false);

//   // create sampleQuizzes for QuizPage
//   const sampleQuizzes = [
//     { id: 'Q1', title: 'Software Development and Modelling', course: 'SDAM Fundamentals 100', questions: 10, timeLimit: 15, available: true, score: null },
//     { id: 'Q2', title: 'Design and Analysis of Algorithms', course: 'DAA Fundamentals 100', questions: 12, timeLimit: 20, available: true, score: 82 },
//     { id: 'Q3', title: 'Computer Networks', course: 'CN fundamentals from textbook', questions: 15, timeLimit: 25, available: false, score: null }
//   ];

//   const handleLogout = () => {
//     // preserve original behaviour you had: reload or sign out
//     window.location.reload();
//   };

//   // nav items (use same icons as your earlier code)
//   const navItems = [
//     { id: 'dashboard', label: 'Dashboard', icon: Home },
//     { id: 'courses', label: 'Courses', icon: BookOpen },
//     { id: 'quiz', label: 'Quiz', icon: Target },
//     { id: 'leaderboard', label: 'Leaderboard', icon: Medal },
//     { id: 'forum', label: 'Forum', icon: MessageSquare },
//     ...(userRole === 'teacher' ? [{ id: 'analytics', label: 'Analytics', icon: BarChart3 }] : [])
//   ];

//   return (
//     <div className="flex h-screen bg-gray-50">
//       {/* Sidebar */}
//       <div className="w-64 bg-gradient-to-b from-purple-700 to-blue-700 text-white p-6 flex flex-col">
//         <div className="flex items-center gap-3 mb-8">
//           <div className="bg-white p-2 rounded-xl">
//             <BookOpen className="w-8 h-8 text-purple-600" />
//           </div>
//           <div>
//             <h1 className="text-2xl font-bold">EduVerse</h1>
//             <p className="text-xs opacity-75">{userRole === 'student' ? 'Student Portal' : 'Teacher Portal'}</p>
//           </div>
//         </div>

//         <nav className="flex-1 space-y-2">
//           {navItems.map(item => (
//             <button key={item.id} onClick={() => setCurrentPage(item.id)} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${currentPage === item.id ? 'bg-white text-purple-700' : 'text-white hover:bg-white hover:bg-opacity-10'}`}>
//               <item.icon className="w-5 h-5" />
//               <span className="font-semibold">{item.label}</span>
//             </button>
//           ))}
//         </nav>

//         <div className="mt-4 space-y-2">
//           <div className="flex items-center gap-2">
//             <button onClick={() => setUserRole(r => r === 'student' ? 'teacher' : 'student')} className="flex-1 bg-white text-purple-700 py-2 rounded-xl font-semibold hover:shadow">
//               Switch Role
//             </button>
//             <button onClick={() => setShowHelp(s => !s)} className="p-2 bg-white bg-opacity-10 rounded-xl">
//               <HelpCircle className="w-5 h-5" />
//             </button>
//           </div>
//           <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-3 text-white hover:bg-white hover:bg-opacity-10 rounded-xl transition-all">
//             <LogOut className="w-5 h-5" />
//             <span className="font-semibold">Logout</span>
//           </button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 overflow-y-auto">
//         {userRole === 'student' ? (
//           <>
//             {currentPage === 'dashboard' && <StudentDashboard onNavigate={setCurrentPage} courses={initialCourses} quizzes={sampleQuizzes} />}
//             {currentPage === 'courses' && <CoursesPage onJoinCourse={() => {}} courses={initialCourses} onViewCourse={() => {}} />}
//             {currentPage === 'quiz' && <QuizPage quizzes={sampleQuizzes} />}
//             {currentPage === 'leaderboard' && <LeaderboardPage />}
//             {currentPage === 'forum' && <DiscussionForum userRole={userRole} />}
//           </>
//         ) : (
//           <>
//             {currentPage === 'dashboard' && <TeacherDashboard onNavigate={setCurrentPage} />}
//             {currentPage === 'courses' && <CoursesPage onJoinCourse={() => {}} courses={initialCourses} onViewCourse={() => {}} />}
//             {currentPage === 'forum' && <DiscussionForum userRole={userRole} />}
//             {currentPage === 'analytics' && <TeacherDashboard onNavigate={setCurrentPage} />}
//           </>
//         )}
//       </div>

//       <HelpChat isOpen={showHelp} onClose={() => setShowHelp(false)} userRole={userRole} />

//       <style jsx>{`
//         @keyframes fadeIn {
//           from { opacity: 0; }
//           to { opacity: 1; }
//         }
//         @keyframes bounceIn {
//           0% { transform: scale(0.3); opacity: 0; }
//           50% { transform: scale(1.05); }
//           70% { transform: scale(0.9); }
//           100% { transform: scale(1); opacity: 1; }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.5s ease-in;
//         }
//         .animate-bounceIn {
//           animation: bounceIn 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55);
//         }
//       `}</style>
//     </div>
//   );
// }

// export default App;


// src/App.js
import React, { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { CourseProvider } from "./context/CourseContext";
import { QuizProvider } from "./context/QuizContext";
import "./styles/animations.css";

// Core Layout Components
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm";

// Dashboard Pages
import StudentDashboard from "./pages/Dashboard/StudentDashboard";
import TeacherDashboard from "./pages/Dashboard/TeacherDashboard";
import TeacherQuizPage from "./pages/TeacherQuizPage.jsx";

// Feature Pages
import CoursesPage from "./pages/CoursesPage.jsx";
import QuizPage from "./pages/QuizPage.jsx";
import LeaderboardPage from "./pages/LeaderBoardPage.jsx";
import DiscussionForumPage from "./pages/DiscussionForumPage.jsx";

/**
 * AppContent - Handles conditional rendering after login
 */
const AppContent = ({ setCurrentPage, currentPage }) => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    return <LoginForm />;
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar Navigation */}
      <Sidebar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6">
          {/* Student Views */}
          {currentUser.role === "student" ? (
            <>
              {currentPage === "dashboard" && (
                <StudentDashboard onNavigate={setCurrentPage} />
              )}
              {currentPage === "courses" && <CoursesPage />}
              {currentPage === "quiz" && <QuizPage />}
              {currentPage === "leaderboard" && <LeaderboardPage />}
              {currentPage === "forum" && <DiscussionForumPage />}
            </>
          ) : (
            /* Teacher Views */
           <>
  {currentPage === "dashboard" && (
    <TeacherDashboard onNavigate={setCurrentPage} />
  )}
  {currentPage === "courses" && <CoursesPage />}
  {currentPage === "quiz" && <TeacherQuizPage />}
    {currentPage === "leaderboard" && <LeaderboardPage />}   {/* ✅ Add this line */}
  {currentPage === "forum" && <DiscussionForumPage />}
  {currentPage === "analytics" && (
    <TeacherDashboard onNavigate={setCurrentPage} />
  )}
</>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * App - Root component
 * Wraps the entire app inside AuthProvider and CourseProvider
 */
function App() {
  const [currentPage, setCurrentPage] = useState("dashboard");

  return (
    // ✅ Correct Provider Hierarchy
    <AuthProvider>
      <CourseProvider>
           <QuizProvider>
        <AppContent
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        </QuizProvider>
      </CourseProvider>
    </AuthProvider>
  );
}

export default App;
