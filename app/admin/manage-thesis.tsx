import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function AdminManageThesis() {
  const [search, setSearch] = useState("");
  const [thesisList, setThesisList] = useState([
    { id: 1, title: "AI-Based Student Attendance System", author: "Juan Dela Cruz", adviser: "Dr. Santos", status: "Approved" },
    { id: 2, title: "E-Learning Platform for STEM", author: "Maria Clara", adviser: "Prof. Reyes", status: "Pending" },
    { id: 3, title: "IoT Smart Farming", author: "Jose Rizal", adviser: "Engr. Dela Rosa", status: "In Review" },
  ]);

  const filteredList = thesisList.filter(
    (thesis) =>
      thesis.title.toLowerCase().includes(search.toLowerCase()) ||
      thesis.author.toLowerCase().includes(search.toLowerCase()) ||
      thesis.adviser.toLowerCase().includes(search.toLowerCase()) ||
      thesis.status.toLowerCase().includes(search.toLowerCase())
  );

  const handleDelete = (id: number) => {
    setThesisList(thesisList.filter((t) => t.id !== id));
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" }}
    >
      <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "1000px" }}>
        <div className="card-body">
          {/* Header */}
          <h1 className="text-center fw-bold mb-4" style={{ color: "#2c2c2c" }}>
            📑 Manage Thesis Data & Logs
          </h1>
          <p className="text-center text-muted mb-4">
            Search, view, edit, and manage student thesis records efficiently.
          </p>

          {/* Search Bar */}
          <div className="d-flex justify-content-end mb-3">
            <input
              type="text"
              className="form-control w-50 shadow-sm"
              placeholder="🔍 Search thesis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Thesis Table */}
          <div className="table-responsive">
            <table className="table table-bordered align-middle shadow-sm">
              <thead style={{ backgroundColor: "#e6e6e6" }}>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Adviser</th>
                  <th>Status</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredList.length > 0 ? (
                  filteredList.map((thesis) => (
                    <tr key={thesis.id}>
                      <td>{thesis.id}</td>
                      <td>{thesis.title}</td>
                      <td>{thesis.author}</td>
                      <td>{thesis.adviser}</td>
                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            thesis.status === "Approved"
                              ? "bg-success"
                              : thesis.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-info text-dark"
                          }`}
                        >
                          {thesis.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-dark me-2"
                          style={{ borderColor: "#2c2c2c", color: "#2c2c2c" }}
                        >
                          👁 View
                        </button>
                        <button
                          className="btn btn-sm btn-outline-dark me-2"
                          style={{ borderColor: "#2c2c2c", color: "#2c2c2c" }}
                        >
                          ✏️ Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(thesis.id)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No thesis records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 small text-muted">
        &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
      </div>
    </div>
  );
}
