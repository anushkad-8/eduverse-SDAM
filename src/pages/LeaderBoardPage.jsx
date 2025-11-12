// src/pages/LeaderboardPage.jsx
import React, { useState, useMemo } from "react";
import { Trophy } from "lucide-react";

const LeaderboardPage = () => {
  // Mock leaderboard data
  const [users] = useState([
    { id: 1, name: "Anushkaa", points: 4520, courses: 6 },
    { id: 2, name: "Nirwani Adhau", points: 4390, courses: 5 },
    { id: 3, name: "Emily Brown", points: 4280, courses: 8 },
    { id: 4, name: "Apurvaa", points: 4100, courses: 7 },
    { id: 5, name: "Mayank", points: 3950, courses: 4 },
  ]);

  const [searchTerm, setSearchTerm] = useState("");

  // Derived metrics
  const topPoints = useMemo(() => Math.max(...users.map((u) => u.points)), [users]);
  const avgPoints = useMemo(
    () => Math.round(users.reduce((a, b) => a + b.points, 0) / users.length),
    [users]
  );

  const filteredUsers = users.filter((u) =>
    u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 animate-fadeIn min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-xl p-8">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <Trophy className="w-8 h-8 text-yellow-500 mr-3" />
            Leaderboard
          </h1>
          <div className="flex items-center gap-2">
            <input
              type="text"
              placeholder="Search name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-gray-200 rounded-xl px-4 py-2 text-sm focus:border-purple-600 outline-none"
            />
            <button
              onClick={() => setSearchTerm("")}
              className="text-sm text-gray-500 hover:text-red-500 transition"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Table Header */}
        <div className="grid grid-cols-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 px-4 rounded-t-2xl">
          <div>Rank</div>
          <div>Name</div>
          <div>Points</div>
          <div>Courses</div>
        </div>

        {/* Table Rows */}
        {filteredUsers.map((user, index) => (
          <div
            key={user.id}
            className="grid grid-cols-4 py-3 px-4 border-b border-gray-100 hover:bg-gray-50 transition"
          >
            <div className="font-medium text-gray-800">#{index + 1}</div>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 text-purple-700 font-semibold flex items-center justify-center rounded-full text-sm">
                {user.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-800">{user.name}</p>
                <p className="text-xs text-gray-500">Top performer</p>
              </div>
            </div>
            <div className="text-gray-700 font-semibold">{user.points}</div>
            <div className="text-gray-600">{user.courses}</div>
          </div>
        ))}

        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-6 mt-8">
          <div className="bg-gradient-to-r from-purple-600 to-purple-400 text-white rounded-2xl p-4 text-center shadow-md">
            <p className="text-sm opacity-90">Top Points</p>
            <p className="text-2xl font-bold">{topPoints}</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-2xl p-4 text-center shadow-md">
            <p className="text-sm opacity-90">Average Points</p>
            <p className="text-2xl font-bold">{avgPoints}</p>
          </div>

          <div className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-2xl p-4 text-center shadow-md">
            <p className="text-sm opacity-90">Total Users</p>
            <p className="text-2xl font-bold">{users.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
