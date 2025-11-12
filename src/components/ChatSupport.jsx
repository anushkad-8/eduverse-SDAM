// src/components/ChatSupport.jsx
import React, { useState } from "react";
import { X, Send } from "lucide-react";

const ChatSupport = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState([
    {
      sender: "admin",
      text: "Hello! How can I help you today?",
      time: "10:30 AM",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    const newMessage = {
      sender: "user",
      text: input,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };
    setMessages([...messages, newMessage]);
    setInput("");

    // Mock admin reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "admin",
          text: "Got it! We'll get back to you shortly.",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
        },
      ]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
<div className="fixed bottom-6 right-6 w-[26rem] h-[32rem] bg-white rounded-3xl shadow-2xl border border-gray-200 overflow-hidden animate-fadeIn z-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-3 flex justify-between items-center">
        <div>
          <h3 className="font-semibold text-sm">Admin Support</h3>
          <p className="text-xs text-white/90">We’re here to help!</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-red-200 transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Chat Messages */}
      <div className="h-64 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-3 flex ${
              msg.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[75%] px-3 py-2 rounded-2xl text-sm ${
                msg.sender === "user"
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "bg-white border border-gray-200 text-gray-800"
              }`}
            >
              {msg.text}
              <div className="text-[10px] text-gray-400 mt-1 text-right">
                {msg.time}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="border-t border-gray-200 flex items-center gap-2 p-3 bg-white">
        <input
  type="text"
  placeholder="Type your message..."
  value={input}
  onChange={(e) => setInput(e.target.value)}
  className="flex-1 px-3 py-2 text-sm text-purple-700 placeholder-gray-400 border border-gray-300 rounded-full focus:outline-none focus:border-purple-600"
  style={{ caretColor: "#6b21a8" }} // makes typing cursor purple 💜
/>
        <button
          onClick={handleSend}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-full hover:opacity-90 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ChatSupport;
