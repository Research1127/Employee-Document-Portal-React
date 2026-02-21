import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const Layout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-white shadow-md">
        <div className="w-full px-2 sm:px-6 py-4 flex justify-between items-center">
          <h1
            className="text-lg font-bold text-indigo-600 cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            EMPLOYEE DOCUMENT PORTAL
          </h1>

          <div className="flex gap-6 items-center">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-gray-700 hover:text-indigo-600"
            >
              Dashboard
            </button>

            <button
              onClick={() => navigate("/documents")}
              className="text-gray-700 hover:text-indigo-600"
            >
              Documents
            </button>

            <button
              onClick={handleLogout}
              className="bg-red-500 px-4 py-1 rounded text-white hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main className="w-full px-6 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
