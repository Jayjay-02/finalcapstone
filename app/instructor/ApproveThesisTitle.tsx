import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

export default function ApproveThesisTitle() {
  const [submissions, setSubmissions] = useState<
    { student: string; email: string; topic: string; fileName: string; status: string }[]
  >([]);

  const loadSubmissions = () => {
    const stored = JSON.parse(localStorage.getItem("thesisTopics") || "[]");
    setSubmissions(stored);
  };

  useEffect(() => {
    loadSubmissions();
  }, []);

  const handleStatusChange = (index: number, newStatus: string) => {
    const updated = [...submissions];
    updated[index].status = newStatus;
    localStorage.setItem("thesisTopics", JSON.stringify(updated));
    setSubmissions(updated); // refresh immediately
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center fw-bold">Approve Thesis Titles</h1>

      {submissions.length === 0 ? (
        <div className="alert alert-info text-center">No thesis topics submitted yet.</div>
      ) : (
        <table className="table table-hover shadow">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Email</th>
              <th>Topic</th>
              <th>File</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {submissions.map((sub, index) => (
              <tr key={index}>
                <td>{sub.student}</td>
                <td>{sub.email}</td>
                <td>{sub.topic}</td>
                <td>{sub.fileName}</td>
                <td>
                  <span className={`badge ${
                    sub.status === "Approved"
                      ? "bg-success"
                      : sub.status === "Rejected"
                      ? "bg-danger"
                      : "bg-warning text-dark"
                  }`}>
                    {sub.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group">
                    <button className="btn btn-success btn-sm" onClick={() => handleStatusChange(index, "Approved")}>
                      Approve
                    </button>
                    <button className="btn btn-danger btn-sm" onClick={() => handleStatusChange(index, "Rejected")}>
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
