import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import UploadDocument from "./pages/UploadDocument";
import { Navigate } from "react-router-dom";

const App: React.FC = () => {
  const isAuthenticated = !!localStorage.getItem("accessToken");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? <Dashboard /> : <Navigate to="/" replace />
          }
        />
        <Route
          path="/documents"
          element={isAuthenticated ? <Document /> : <Navigate to="/" replace />}
        />
        <Route
          path="/documents/upload"
          element={
            isAuthenticated ? <UploadDocument /> : <Navigate to="/" replace />
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
