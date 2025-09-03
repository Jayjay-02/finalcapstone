import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

interface ThesisSubmission {
  student: string;
  email: string;
  topic: string;
  fileName: string;
  status: string;
  feedback?: string; // new field for instructor feedback
}

export default function ProvideFeedback() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<ThesisSubmission[]>([]);

  // Load thesis topics from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("thesisTopics") || "[]");
    setSubmissions(stored);
  }, []);

  // Handle feedback change in text area
  const handleFeedbackChange = (index: number, value: string) => {
    const updated = [...submissions];
    updated[index].feedback = value;
    setSubmissions(updated);
  };

  // Save feedback permanently to localStorage
  const handleSubmitFeedback = (index: number) => {
    const updated = [...submissions];
    localStorage.setItem("thesisTopics", JSON.stringify(updated));

    // Also store this feedback separately for student feedback page
    const feedbacks = JSON.parse(localStorage.getItem("feedbacks") || "[]");
    const newFeedback = {
      from: "Instructor",
      date: new Date().toISOString().slice(0, 10),
      comment: updated[index].feedback || "",
      rating: "⭐⭐⭐⭐" // default rating or dynamic if needed
    };
    localStorage.setItem("feedbacks", JSON.stringify([...feedbacks, newFeedback]));

    alert(`✅ Feedback submitted for ${updated[index].student}:\n"${updated[index].feedback || ''}"`);
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">💬 Provide Feedback</h2>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => router.push("/instructor/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Feedback List */}
      {submissions.length === 0 ? (
        <div className="alert alert-info text-center">
          No thesis topics submitted yet.
        </div>
      ) : (
        <div 
          className="list-group shadow-sm" 
          style={{ maxHeight: "500px", overflowY: "auto" }} // <-- scroll container
        >
          {submissions.map((sub, index) => (
            <div key={index} className="list-group-item p-3">
              <h6 className="fw-semibold">{sub.student}</h6>
              <small className="text-muted d-block">
                Topic: {sub.topic} | Status: {sub.status}
              </small>
              <small className="text-muted d-block">File: {sub.fileName}</small>

              {/* Feedback textarea */}
              <textarea
                className="form-control mt-2"
                rows={2}
                placeholder="Write your feedback..."
                value={sub.feedback || ""}
                onChange={(e) => handleFeedbackChange(index, e.target.value)}
              />

              <div className="text-end mt-2">
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handleSubmitFeedback(index)}
                >
                  Submit Feedback
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
