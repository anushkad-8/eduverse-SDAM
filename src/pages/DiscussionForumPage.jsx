// src/pages/DiscussionForumPage.jsx
import React, { useState } from "react";
import { MessageCircle, ThumbsUp, Plus, Send, ArrowLeft } from "lucide-react";
import { useAuth } from "../context/AuthContext";

const DiscussionForumPage = () => {
  const { currentUser } = useAuth();

  // Mock forum topics (initial posts)
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Help with React Hooks",
      category: "Web Development",
      author: "Sarah Johnson",
      time: "2h ago",
      replies: 1,
      likes: 24,
      content: "Can someone explain useEffect dependencies?",
      messages: [
        {
          id: 1,
          user: "Riya Sharma",
          time: "2h ago",
          text: "How do we improve accuracy in machine learning models?",
        },
        {
          id: 2,
          user: "Amit Desai",
          time: "1h ago",
          text: "Try hyperparameter tuning or using ensemble methods like XGBoost.",
        },
      ],
    },
    {
      id: 2,
      title: "Binary Search Tree Implementation",
      category: "Data Structures",
      author: "Mike Chen",
      time: "4h ago",
      replies: 0,
      likes: 15,
      content: "Having trouble with BST deletion...",
      messages: [],
    },
  ]);

  const [selectedTopic, setSelectedTopic] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [showNewPostModal, setShowNewPostModal] = useState(false);
  const [newPost, setNewPost] = useState({
    title: "",
    category: "",
    content: "",
  });

  // Create new discussion topic
  const handleCreatePost = (e) => {
    e.preventDefault();
    if (!newPost.title.trim() || !newPost.content.trim()) return;
    const newTopic = {
      id: topics.length + 1,
      title: newPost.title,
      category: newPost.category || "General",
      author: currentUser?.name || "Anonymous",
      time: "Just now",
      replies: 0,
      likes: 0,
      content: newPost.content,
      messages: [],
    };
    setTopics([newTopic, ...topics]);
    setNewPost({ title: "", category: "", content: "" });
    setShowNewPostModal(false);
  };

  // Handle replies in a discussion
  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    const updatedTopics = topics.map((t) =>
      t.id === selectedTopic.id
        ? {
            ...t,
            replies: t.replies + 1,
            messages: [
              ...t.messages,
              {
                id: Date.now(),
                user: currentUser?.name || "Guest",
                time: "Just now",
                text: newMessage,
              },
            ],
          }
        : t
    );
    setTopics(updatedTopics);
    setSelectedTopic(
      updatedTopics.find((t) => t.id === selectedTopic.id)
    );
    setNewMessage("");
  };

  // Like functionality (frontend only)
  const handleLike = (topicId) => {
    setTopics((prev) =>
      prev.map((t) =>
        t.id === topicId ? { ...t, likes: t.likes + 1 } : t
      )
    );
  };

  // ================== MAIN VIEW ==================
  return (
    <div className="p-6 animate-fadeIn min-h-screen bg-gray-50">
      {/* Back button for thread view */}
      {selectedTopic && (
        <button
          onClick={() => setSelectedTopic(null)}
          className="flex items-center text-purple-600 font-medium mb-4 hover:underline"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Back to Discussions
        </button>
      )}

      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center">
        <MessageCircle className="w-7 h-7 mr-2 text-purple-600" />
        Discussion Forum
      </h1>

      {/* ================= LIST VIEW ================= */}
      {!selectedTopic && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Forum List */}
          <div className="lg:col-span-3 space-y-4">
            {topics.map((topic) => (
              <div
                key={topic.id}
                onClick={() => setSelectedTopic(topic)}
                className="bg-white p-5 rounded-2xl shadow-md hover:shadow-lg transition-all cursor-pointer flex justify-between items-start"
              >
                <div>
                  <h3 className="text-lg font-bold text-gray-800 mb-1">
                    {topic.title}
                  </h3>
                  <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                    {topic.category}
                  </span>
                  <p className="text-sm text-gray-600 mt-2 mb-3">
                    {topic.content}
                  </p>
                  <div className="flex items-center gap-4 text-xs text-gray-500">
                    <span>{topic.author}</span>
                    <span>• {topic.time}</span>
                    <span>👍 {topic.likes}</span>
                    <span>💬 {topic.replies} replies</span>
                  </div>
                </div>
                <div className="flex items-center text-purple-600">
                  <ThumbsUp
                    className="w-5 h-5 cursor-pointer hover:text-purple-800"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleLike(topic.id);
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white p-5 rounded-2xl shadow-md">
              <h3 className="font-semibold text-lg mb-3">
                Forum Guidelines
              </h3>
              <ul className="text-sm space-y-2 opacity-90">
                <li>✔️ Be respectful and helpful</li>
                <li>✔️ Search before posting</li>
                <li>✔️ Use clear titles</li>
                <li>✔️ Mark solved discussions</li>
              </ul>
            </div>

            <div className="bg-white p-5 rounded-2xl shadow-md">
              <h3 className="font-semibold text-gray-800 mb-3">
                🔥 Trending Topics
              </h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li>#ReactHooks <span className="float-right">124</span></li>
                <li>#AlgorithmHelp <span className="float-right">98</span></li>
                <li>#MLBasics <span className="float-right">87</span></li>
              </ul>
            </div>

            <button
              onClick={() => setShowNewPostModal(true)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-2 rounded-xl font-semibold flex items-center justify-center gap-2 hover:shadow-lg transition-all"
            >
              <Plus className="w-4 h-4" /> New Discussion
            </button>
          </div>
        </div>
      )}

      {/* ================= THREAD VIEW ================= */}
      {selectedTopic && (
        <div className="max-w-3xl mx-auto">
          <div className="bg-white rounded-3xl shadow-lg p-6 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {selectedTopic.title}
            </h2>
            <p className="text-sm text-gray-600 mb-2">
              {selectedTopic.content}
            </p>
            <span className="text-xs bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
              {selectedTopic.category}
            </span>
          </div>

          <div className="bg-purple-50 rounded-3xl p-6 shadow-inner space-y-3 mb-4">
            {selectedTopic.messages.length === 0 ? (
              <p className="text-sm text-gray-500 text-center">
                No replies yet. Be the first to comment!
              </p>
            ) : (
              selectedTopic.messages.map((msg) => (
                <div
                  key={msg.id}
                  className="bg-white p-4 rounded-2xl shadow-sm border border-purple-100"
                >
                  <p className="font-semibold text-purple-700 mb-1">
                    {msg.user}{" "}
                    <span className="text-xs text-gray-400">
                      • {msg.time}
                    </span>
                  </p>
                  <p className="text-sm text-gray-700">{msg.text}</p>
                </div>
              ))
            )}
          </div>

          <div className="flex gap-3 items-center">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border-2 border-gray-200 rounded-2xl px-4 py-3 focus:border-purple-600 outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-3 rounded-2xl font-semibold hover:shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Send
            </button>
          </div>
        </div>
      )}

      {/* ================= NEW DISCUSSION MODAL ================= */}
      {showNewPostModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg relative animate-slideUp">
            <button
              onClick={() => setShowNewPostModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-600 transition"
            >
              ✖
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Start a New Discussion
            </h2>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <input
                type="text"
                placeholder="Discussion Title"
                value={newPost.title}
                onChange={(e) =>
                  setNewPost({ ...newPost, title: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-purple-600"
              />
              <input
                type="text"
                placeholder="Category (e.g. Web Dev, AI, DBMS)"
                value={newPost.category}
                onChange={(e) =>
                  setNewPost({ ...newPost, category: e.target.value })
                }
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-purple-600"
              />
              <textarea
                placeholder="What's on your mind?"
                value={newPost.content}
                onChange={(e) =>
                  setNewPost({ ...newPost, content: e.target.value })
                }
                rows="3"
                className="w-full border-2 border-gray-200 rounded-xl px-4 py-2 focus:border-purple-600"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 rounded-xl font-semibold hover:shadow-md transition-all"
              >
                Post Discussion
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiscussionForumPage;
