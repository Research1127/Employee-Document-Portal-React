import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { User } from "../types/user";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-800">Dashboard</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-xl bg-white p-8 shadow-md">
          <h2 className="text-2xl font-bold text-gray-900">
            Welcome Back {user?.name || "User"}! 👋
          </h2>

          <p className="mt-2 text-gray-600">
            Manage your documents and system features here.
          </p>

          <div className="mt-6">
            <button
              onClick={() => navigate("/documents")}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Document Management
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
