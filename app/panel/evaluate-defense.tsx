import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function EvaluateDefenses() {
  const [score, setScore] = useState("");
  const [comments, setComments] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call or database saving logic goes here
    console.log("Score:", score, "Comments:", comments);
    setSubmitted(true);
    setScore("");
    setComments("");
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">📝 Evaluate Defense</h2>
      <p className="text-muted mb-4">
        Score and evaluate student thesis defense presentations.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Score (0-100)</label>
          <label className="form-label">Score (0-100)</label>
          <input
            type="number"
            className="form-control"
            min="0"
            max="100"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Comments / Feedback</label>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Write your comments here..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
        </div>

        <button type="submit" className="btn btn-dark rounded-pill px-4">
          Submit Evaluation
        </button>
      </form>

      {submitted && (
        <div className="alert alert-success mt-3" role="alert">
          Evaluation submitted successfully!
        </div>
      )}
    </div>  
  );
}
