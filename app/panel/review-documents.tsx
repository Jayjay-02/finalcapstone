import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function PanelReviewDocuments() {
  const [reviews, setReviews] = useState<{ doc: string; comment: string; status: string }[]>([]);
  const [comment, setComment] = useState("");

  const handleReview = (doc: string, status: string) => {
    if (comment.trim() === "") return alert("Please add a comment before submitting.");
    setReviews([...reviews, { doc, comment, status }]);
    setComment("");
    alert(`Document "${doc}" marked as ${status}.`);
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow border-0" style={{ maxWidth: "650px", width: "100%" }}>
        <div className="card-body">
          <h1 className="text-center fw-bold mb-3" style={{ color: "#0d6efd" }}>
            📑 Review Documents
          </h1>
          <p className="text-center text-muted fw-light mb-4">
            Panel members can view, comment, and approve/reject student documents here.
          </p>

          {/* Example Documents */}
          <ul className="list-group list-group-flush mb-4">
            {["Chapter 1 - Introduction", "Chapter 2 - RRL", "Chapter 3 - Methodology"].map(
              (doc, index) => (
                <li
                  key={index}
                  className="list-group-item d-flex justify-content-between align-items-center small text-muted"
                >
                  <span className="fw-semibold text-dark">{doc}</span>
                  <div>
                    <button
                      className="btn btn-sm btn-outline-success me-2 shadow-sm"
                      onClick={() => handleReview(doc, "Approved")}
                    >
                      ✅ Approve
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger shadow-sm"
                      onClick={() => handleReview(doc, "Rejected")}
                    >
                      ❌ Reject
                    </button>
                  </div>
                </li>
              )
            )}
          </ul>

          {/* Comment Box */}
          <div className="mb-3">
            <label className="form-label fw-semibold small text-muted">💬 Add Comment</label>
            <textarea
              className="form-control shadow-sm"
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write feedback for students..."
            ></textarea>
          </div>
        </div>
      </div>

      {/* Review Log */}
      {reviews.length > 0 && (
        <div className="card mt-4 shadow-sm border-0" style={{ maxWidth: "650px", width: "100%" }}>
          <div className="card-body">
            <h5 className="fw-semibold text-secondary mb-3">📜 Review History</h5>
            <ul className="list-group list-group-flush">
              {reviews.map((r, i) => (
                <li key={i} className="list-group-item small">
                  <strong>{r.doc}</strong> -{" "}
                  <span
                    className={r.status === "Approved" ? "text-success fw-semibold" : "text-danger fw-semibold"}
                  >
                    {r.status}
                  </span>
                  <p className="mb-0 text-muted">💬 {r.comment}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
