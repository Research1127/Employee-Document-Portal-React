import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import Document from "./pages/Document";
import UploadDocument from "./pages/UploadDocument";
import ViewDocument from "./pages/ViewDocument";

import Layout from "./layouts/Layout";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<LoginPage />} />

        {/* Protected Routes */}
        <Route
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/documents" element={<Document />} />
          <Route path="/documents/upload" element={<UploadDocument />} />
          <Route path="/documents/:id" element={<ViewDocument />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
