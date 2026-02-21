import React, { useEffect, useState } from "react";
import api from "../api/axios"; // Axios instance for API calls
import type { Document } from "../types/document";
import type { PaginatedResponse } from "../types/PaginatedResponse";
import { useNavigate } from "react-router-dom";

const Document: React.FC = () => {
  const navigate = useNavigate();
  const [response, setResponse] = useState<PaginatedResponse<Document> | null>(
    null,
  );
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSize, setPageSize] = useState(10);
  const [departments, setDepartments] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [departmentId, setDepartmentId] = useState<string>("");
  const [categoryId, setCategoryId] = useState<string>("");
  const [search, setSearch] = useState("");

  const handleDownloadCurrentPage = () => {
    if (!response?.data?.length) return;

    const headers = [
      "ID",
      "Title",
      "Description",
      "File Name",
      "File Path",
      "File Type",
      "File Size",
      "Category ID",
      "Department ID",
      "Uploaded By",
      "Access Level",
      "Download Count",
      "Created At",
      "Updated At",
    ];

    const rows = response.data.map((doc) => [
      doc.id,
      doc.title,
      doc.description,
      doc.file_name,
      doc.file_path,
      doc.file_type,
      doc.file_size,
      doc.category_id,
      doc.department_id,
      doc.uploaded_by,
      doc.access_level,
      doc.download_count,
      doc.created_at,
      doc.updated_at,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers, ...rows].map((row) => row.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "documents_current_page.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    const getDocuments = async () => {
      setLoading(true);

      try {
        const res = await api.get("/documents", {
          params: {
            page: page,
            per_page: pageSize,
            department_id: departmentId || undefined,
            category_id: categoryId || undefined,
            search: search || undefined,
          },
        });
        setResponse(res.data);
      } catch (error) {
        console.error("Failed to fetch documents", error);
      } finally {
        setLoading(false);
      }
    };

    getDocuments();
  }, [page, pageSize, departmentId, categoryId, search]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [deptRes, catRes] = await Promise.all([
          api.get("/departments"),
          api.get("/document-categories"),
        ]);

        setDepartments(deptRes.data);
        setCategories(catRes.data);
      } catch (error) {
        console.error("Failed to fetch filters", error);
      }
    };

    fetchFilters();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Page Title */}
      <h1 className="text-3xl font-bold mb-6">Document Management</h1>
      {/* White Card Container */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            FILTER DOCUMENTS
          </h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleDownloadCurrentPage}
              className="rounded-lg bg-green-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-green-500"
            >
              Download Current Page
            </button>

            <button
              onClick={() => navigate("/documents/upload")}
              className="rounded-lg bg-indigo-600 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-500"
            >
              Upload Document
            </button>
          </div>
        </div>
        {/* Search Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Search
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              placeholder="Search documents..."
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50
                   focus:outline-none focus:ring-2 focus:ring-indigo-500
                   focus:border-indigo-500 transition duration-200"
            />
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Department
            </label>
            <select
              value={departmentId}
              onChange={(e) => {
                setDepartmentId(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition duration-200"
            >
              <option value="">All Departments</option>
              {departments.map((dept) => (
                <option key={dept.id} value={dept.id}>
                  {dept.name}
                </option>
              ))}
            </select>
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Category
            </label>
            <select
              value={categoryId}
              onChange={(e) => {
                setCategoryId(e.target.value);
                setPage(1);
              }}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 
                   focus:border-indigo-500 transition duration-200"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.title}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left">
            {/* Table Header */}
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="px-6 py-4">ID</th>
                <th className="px-6 py-4">Title</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">File Name</th>
                <th className="px-6 py-4">File Path</th>
                <th className="px-6 py-4">File Type</th>
                <th className="px-6 py-4">File Size</th>
                <th className="px-6 py-4">Category ID</th>
                <th className="px-6 py-4">Department ID</th>
                <th className="px-6 py-4">Uploaded By</th>
                <th className="px-6 py-4">Access Level</th>
                <th className="px-6 py-4">Download Count</th>
                <th className="px-6 py-4">Created At</th>
                <th className="px-6 py-4">Updated At</th>
                <th className="px-6 py-4">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={14} className="text-center p-6">
                    Loading...
                  </td>
                </tr>
              ) : response?.data?.length ? (
                response.data.map((document) => (
                  <tr key={document.id} className="border-b hover:bg-gray-50">
                    <td className="px-6 py-4 max-w-sm truncate">
                      {document.id}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.title}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.description}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.file_name}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.file_path}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.file_type}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.file_size}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.category_id}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.department_id}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.uploaded_by}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.access_level}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.download_count}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.created_at}
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate">
                      {document.updated_at}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => navigate(`/documents/${document.id}`)}
                        className="rounded-lg bg-indigo-500 px-6 py-2 text-sm font-semibold text-white shadow transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={14} className="text-center p-6 text-gray-500">
                    No documents found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="flex justify-between items-center px-6 py-4 bg-gray-50 border-t">
          {/* Left side info */}
          {/* Left side info */}
          <p className="text-sm text-gray-600">
            Showing <span className="font-semibold">{response?.from ?? 0}</span>{" "}
            to <span className="font-semibold">{response?.to ?? 0}</span> of{" "}
            <span className="font-semibold">{response?.total ?? 0}</span>{" "}
            entries
          </p>

          {/* Right side pages */}
          <div className="flex gap-2">
            <button
              disabled={page <= 1}
              onClick={() => setPage((prev) => prev - 1)}
              className="px-3 py-1 rounded-lg border hover:bg-gray-200 disabled:opacity-50"
            >
              Prev
            </button>

            <button className="px-3 py-1 rounded-lg bg-gray-800 text-white">
              {page}
            </button>

            <button
              disabled={!response || page >= response.last_page}
              onClick={() => setPage((prev) => prev + 1)}
              className="px-3 py-1 rounded-lg border hover:bg-gray-200 disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Document;
