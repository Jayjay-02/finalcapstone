import React, { useEffect, useRef, useState } from "react";

const initialStudents = [
  "Student A",
  "Student B",
  "Student C"
];

export default function PanelProvideFeedback() {
  const [feedbacks, setFeedbacks] = useState<
    { student: string; feedback: string; submittedAt: string }[]
  >([]);
  const [student, setStudent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const feedbackInputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (successMsg) {
      const t = setTimeout(() => setSuccessMsg(""), 2000);
      return () => clearTimeout(t);
    }
  }, [successMsg]);

  const handleFeedback = () => {
    setErrorMsg("");
    setSuccessMsg("");
    if (student.trim() === "" || feedback.trim() === "") {
      setErrorMsg("Please select a student and provide feedback before submitting.");
      return;
    }
    setFeedbacks((prev) => [
      ...prev,
      {
        student,
        feedback,
        submittedAt: new Date().toLocaleString(),
      }
    ]);
    setSuccessMsg(`Feedback submitted for ${student}.`);
    setStudent("");
    setFeedback("");
    feedbackInputRef.current?.focus();
  };

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0" tabIndex={-1}>
        <div className="card-body">
          <h1 className="text-center text-primary fw-bold mb-4">📝 Provide Feedback</h1>
          <p className="text-center text-muted mb-4">
            Panel members can provide feedback and suggestions to students here.
          </p>

          {/* Error & Success Messages */}
          {errorMsg && (
            <div className="alert alert-danger py-2" role="alert" tabIndex={0}>
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="alert alert-success py-2" role="alert" tabIndex={0} aria-live="polite">
              {successMsg}
            </div>
          )}

          {/* Student Selection */}
          <div className="mb-3">
            <label htmlFor="studentSelect" className="form-label fw-bold">
              👩‍🎓 Select Student <span className="text-danger">*</span>
            </label>
            <select
              className="form-select"
              id="studentSelect"
              value={student}
              onChange={(e) => setStudent(e.target.value)}
              required
              aria-required="true"
              aria-label="Select student"
            >
              <option value="">-- Choose a student --</option>
              {initialStudents.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>

          {/* Feedback Textarea */}
          <div className="mb-3">
            <label htmlFor="feedbackInput" className="form-label fw-bold">
              💬 Feedback <span className="text-danger">*</span>
            </label>
            <textarea
              ref={feedbackInputRef}
              className="form-control"
              id="feedbackInput"
              rows={4}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Write feedback for the student..."
              maxLength={500}
              required
              aria-required="true"
              aria-label="Feedback textarea"
            ></textarea>
            <div className="form-text text-end">{feedback.length}/500 characters</div>
          </div>

          {/* Submit Button */}
          <div className="text-center">
            <button
              className="btn btn-primary px-4 fw-bold"
              onClick={handleFeedback}
              type="button"
              disabled={student.trim() === "" || feedback.trim() === ""}
              aria-disabled={student.trim() === "" || feedback.trim() === ""}
            >
              📤 Submit Feedback
            </button>
          </div>
        </div>
      </div>

      {/* Feedback History */}
      {feedbacks.length > 0 && (
        <div className="card mt-4 shadow-sm">
          <div className="card-body">
            <h4 className="fw-bold text-secondary mb-3">📜 Feedback History</h4>
            <hr />
            <ul className="list-group" aria-live="polite">
              {feedbacks.map((f, i) => (
                <li key={i} className="list-group-item">
                  <div className="d-flex align-items-start">
                    <span className="me-2 fs-5">👩‍🎓</span>
                    <div>
                      <strong>{f.student}</strong>
                      <span className="ms-2 small text-muted">{f.submittedAt}</span>
                      <div className="mt-1 text-muted">{f.feedback}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}