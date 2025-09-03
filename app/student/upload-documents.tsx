import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function StudentUploadDocuments() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files ? event.target.files[0] : null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      alert("⚠️ Please select a document before submitting.");
      return;
    }

    // Load current documents from localStorage
    const existingDocs = JSON.parse(localStorage.getItem("documents") || "[]");

    // Create new document object
    const newDoc = {
      id: Date.now(), // unique ID
      title: file.name,
      file: file.name,
      status: "Pending Review"
    };

    // Save updated list to localStorage
    const updatedDocs = [...existingDocs, newDoc];
    localStorage.setItem("documents", JSON.stringify(updatedDocs));

    alert(`✅ Document Uploaded Successfully!\n\nFile: ${file.name}`);
    setFile(null); // clear file after upload
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #f3e5f5 0%, #ffffff 100%)",
      }}
    >
      <div
        className="bg-white shadow-lg p-5 rounded-4 border"
        style={{ maxWidth: 600, width: "100%" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <span style={{ fontSize: 60 }} role="img" aria-label="upload">
            📤
          </span>
          <h1
            className="fw-bolder text-primary mt-3"
            style={{ letterSpacing: "-0.5px" }}
          >
            Upload Thesis Documents
          </h1>
          <p className="text-muted fs-5">
            Upload your thesis documents here for faculty review.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* File Upload */}
          <div className="mb-4 text-start">
            <label className="form-label fw-semibold">
              Choose Document <span className="text-danger">*</span>
            </label>
            <input
              type="file"
              className="form-control form-control-lg"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
            <small className="text-muted">
              Accepted formats: PDF, DOC, DOCX (Max: 20MB)
            </small>
          </div>

          {/* File Preview */}
          {file && (
            <div className="alert alert-info small">
              <strong>Selected File:</strong> {file.name}
            </div>
          )}

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg rounded-pill fw-semibold shadow-sm"
            >
              🚀 Upload Document
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-4 small text-center text-muted">
          &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
        </div>
      </div>
    </div>
  );
}
