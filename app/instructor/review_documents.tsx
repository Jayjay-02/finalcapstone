import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function ReviewDocuments() {
  const router = useRouter();

  const [documents, setDocuments] = useState<
    { id: number; title: string; file: string; status: string }[]
  >([]);

  // Load documents from localStorage whenever page loads
  useEffect(() => {
    const storedDocs = JSON.parse(localStorage.getItem("documents") || "[]");
    setDocuments(storedDocs);
  }, []);

  // Review document by opening in new tab and mark as Reviewed
  function handleReview(doc: { id: number; file: string }) {
    // Open document in new tab
    window.open(`/files/${doc.file}`, "_blank");

    // Mark as Reviewed
    const updatedDocs = documents.map((d) =>
      d.id === doc.id ? { ...d, status: "Reviewed" } : d
    );
    setDocuments(updatedDocs);
    localStorage.setItem("documents", JSON.stringify(updatedDocs));
  }

  // Download document
  const handleDownload = (file: string) => {
    const link = document.createElement("a");
    link.href = `/files/${file}`;
    link.download = file;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📄 Review Documents</h2>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => router.push("/instructor/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* If no submissions */}
      {documents.length === 0 ? (
        <div className="alert alert-secondary text-center">
          No student documents submitted yet.
        </div>
      ) : (
        <div className="list-group shadow-sm">
          {documents.map((doc) => (
            <div
              key={doc.id}
              className="list-group-item d-flex justify-content-between align-items-center flex-wrap"
            >
              <div className="mb-2 mb-md-0">
                <h6 className="mb-1 fw-semibold">{doc.title}</h6>
                <small className="text-muted">File: {doc.file}</small>
                <br />
                <span
                  className={`badge mt-1 ${
                    doc.status === "Reviewed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {doc.status}
                </span>
              </div>
              <div className="d-flex gap-2">
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handleReview(doc)}
                >
                  Review
                </button>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => handleDownload(doc.file)}
                >
                  ⬇ Download
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
