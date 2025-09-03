import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Feedback {
  from: string;
  date: string;
  comment: string;
  rating: string;
}

export default function StudentFeedback() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

  useEffect(() => {
    // Load submissions
    const stored = JSON.parse(localStorage.getItem("thesisSubmissions") || "[]");
    // Assuming a student belongs to Group A (or fetch based on login)
    const studentGroup = stored.find((g: any) => g.groupName === "Group A");
    setFeedbacks(studentGroup ? studentGroup.feedback : []);
  }, []);

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="text-primary fw-bold mb-4 text-center">
                📋 Feedback & Evaluations
              </h2>
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>From</th>
                      <th>Date</th>
                      <th>Comment</th>
                      <th>Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.length > 0 ? (
                      feedbacks.map((f, i) => (
                        <tr key={i}>
                          <td>{f.from}</td>
                          <td>{f.date}</td>
                          <td className="text-start">{f.comment}</td>
                          <td>{f.rating}</td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={4} className="text-muted">
                          No feedback yet.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <div className="alert alert-info mt-4 text-center">
                ✅ You have received <b>{feedbacks.length}</b> feedback entries.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
