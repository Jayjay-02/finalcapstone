import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

export default function StudentSubmitTopic() {
  const [topic, setTopic] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [mySubmissions, setMySubmissions] = useState<
    { student: string; topic: string; fileName: string; status: string }[]
  >([]);

  // Load the logged-in student's submissions
  useEffect(() => {
    const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent") || "null");
    const studentName = loggedInStudent?.name || "Unknown Student";

    const allTopics = JSON.parse(localStorage.getItem("thesisTopics") || "[]");
    const studentTopics = allTopics.filter((t: any) => t.student === studentName);
    setMySubmissions(studentTopics);
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFile(event.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!topic || !file) {
      alert("⚠️ Please enter a thesis topic and select a file before submitting.");
      return;
    }

    // Get current logged-in student
    const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent") || "null");
    const studentName = loggedInStudent?.name || "Unknown Student";

    // Get existing submissions
    const existing = JSON.parse(localStorage.getItem("thesisTopics") || "[]");

    // Add new submission with "Pending" status
    const newSubmission = {
      student: studentName,
      topic,
      fileName: file.name,
      status: "Pending",
    };

    const updatedTopics = [...existing, newSubmission];
    localStorage.setItem("thesisTopics", JSON.stringify(updatedTopics));

    alert(`✅ Thesis Topic Submitted!\n\nTopic: ${topic}\nFile: ${file.name}`);

    // Reset form and update state
    setTopic("");
    setFile(null);
    setMySubmissions([...mySubmissions, newSubmission]);
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center bg-light bg-gradient"
      style={{
        background: "linear-gradient(135deg, #e3f2fd 0%, #ffffff 100%)",
      }}
    >
      <div
        className="bg-white shadow-lg p-5 rounded-4 border"
        style={{ maxWidth: 650, width: "100%" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <span style={{ fontSize: 60 }} role="img" aria-label="document">
            📄
          </span>
          <h1
            className="fw-bolder mt-3"
            style={{ color: "#333", letterSpacing: "-0.5px" }}
          >
            Submit Thesis Topic
          </h1>
          <p className="text-muted fs-5">
            Upload your research proposal for review and approval.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Thesis Topic Input */}
          <div className="mb-4 text-start">
            <label className="form-label fw-semibold">Thesis Title / Topic</label>
            <input
              type="text"
              className="form-control form-control-lg"
              placeholder="Enter your thesis title"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div className="mb-4 text-start">
            <label className="form-label fw-semibold">Upload File</label>
            <input
              type="file"
              className="form-control form-control-lg"
              accept=".pdf,.doc,.docx"
              onChange={handleFileChange}
              required
            />
            <small className="text-muted">
              Accepted formats: PDF, DOC, DOCX (Max: 10MB)
            </small>
          </div>

          {/* Submit Button */}
          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-success btn-lg rounded-pill fw-semibold shadow-sm"
            >
              📤 Submit Topic
            </button>
          </div>
        </form>

        {/* Student's previous submissions */}
        {mySubmissions.length > 0 && (
          <div className="mt-5">
            <h4 className="fw-bold text-secondary mb-3">My Submissions</h4>
            <table className="table table-bordered table-sm">
              <thead className="table-light">
                <tr>
                  <th>Thesis Title</th>
                  <th>File</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mySubmissions.map((s, index) => (
                  <tr key={index}>
                    <td>{s.topic}</td>
                    <td>{s.fileName}</td>
                    <td>
                      <span
                        className={`badge ${
                          s.status === "Approved"
                            ? "bg-success"
                            : s.status === "Rejected"
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        {s.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Footer */}
        <div className="mt-4 small text-center text-muted">
          &copy; {new Date().getFullYear()} Papertrail · Stay Curious 📚
        </div>
      </div>
    </div>
  );
}
