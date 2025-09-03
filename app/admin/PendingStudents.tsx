import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect, useState } from "react";

export default function PendingStudents() {
  const [pendingStudents, setPendingStudents] = useState<{ email: string; password: string }[]>([]);
  const [approvedStudents, setApprovedStudents] = useState<{ email: string; password: string }[]>([]);

  // Load pending and approved students from localStorage on page load
  useEffect(() => {
    const pending = JSON.parse(localStorage.getItem("pendingStudents") || "[]");
    const approved = JSON.parse(localStorage.getItem("approvedStudents") || "[]");
    setPendingStudents(pending);
    setApprovedStudents(approved);
  }, []);

  // Approve a student
  const handleApprove = (index: number) => {
    const student = pendingStudents[index];

    // Add to approved list
    const updatedApproved = [...approvedStudents, student];
    localStorage.setItem("approvedStudents", JSON.stringify(updatedApproved));
    setApprovedStudents(updatedApproved);

    // Remove from pending list
    const updatedPending = pendingStudents.filter((_, i) => i !== index);
    localStorage.setItem("pendingStudents", JSON.stringify(updatedPending));
    setPendingStudents(updatedPending);
  };

  // Reject a student
  const handleReject = (index: number) => {
    const updatedPending = pendingStudents.filter((_, i) => i !== index);
    localStorage.setItem("pendingStudents", JSON.stringify(updatedPending));
    setPendingStudents(updatedPending);
  };

  return (
    <div className="container my-5">
      <h4 className="fw-bold mb-3">Pending Students</h4>

      {pendingStudents.length === 0 ? (
        <div className="alert alert-secondary">No pending students.</div>
      ) : (
        <table className="table table-bordered table-hover">
          <thead style={{ backgroundColor: "#f8f9fa" }}>
            <tr>
              <th>Email</th>
              <th>Password</th>
              <th style={{ width: 150 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.email}</td>
                <td>{student.password}</td>
                <td>
                  <button 
                    className="btn btn-success btn-sm me-2 fw-semibold" 
                    onClick={() => handleApprove(index)}
                  >
                    Approve
                  </button>
                  <button 
                    className="btn btn-danger btn-sm fw-semibold" 
                    onClick={() => handleReject(index)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
