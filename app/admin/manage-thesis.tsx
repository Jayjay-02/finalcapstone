import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface ThesisSubmission {
  id: number;
  topic: string;
  status: string;
  student: { full_name: string };
  group: number;
  created_at: string;
  archived?: boolean;
}

export default function ManageThesis() {
  const [theses, setTheses] = useState<ThesisSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all thesis submissions from backend
  const fetchTheses = async () => {
    setLoading(true);
    try {
      // Update endpoint if you use a different URL
      const resp = await fetch("/api/students/thesis/");
      if (!resp.ok) throw new Error("Failed to fetch");
      const data = await resp.json();
      setTheses(Array.isArray(data) ? data : [data]);
    } catch (e) {
      setTheses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  // Approve or reject thesis
  const updateThesisStatus = async (id: number, status: string) => {
    try {
      const resp = await fetch(`/api/students/thesis/${id}/approve/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (!resp.ok) throw new Error("Status update failed");
      fetchTheses();
    } catch (e) {
      alert("Failed to update thesis status.");
    }
  };

  // Archive/restore thesis (assumes backend supports an 'archived' flag on the model)
  const archiveThesis = async (id: number, archived: boolean) => {
    try {
      const resp = await fetch(`/api/students/thesis/${id}/archive/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived }),
      });
      if (!resp.ok) throw new Error("Archive failed");
      fetchTheses();
    } catch {
      alert("Failed to archive/restore thesis.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">📑 Manage Thesis Submissions</h2>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : theses.length === 0 ? (
        <div className="alert alert-warning text-center">
          No thesis submissions found.
        </div>
      ) : (
        <table className="table table-bordered table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Created</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {theses.map((t) => (
              <tr key={t.id}>
                <td>{t.student?.full_name}</td>
                <td>{t.topic}</td>
                <td>
                  <span
                    className={`badge ${
                      t.status === "Approved"
                        ? "bg-success"
                        : t.status === "Rejected"
                        ? "bg-danger"
                        : "bg-secondary"
                    }`}
                  >
                    {t.status}
                  </span>
                </td>
                <td>{new Date(t.created_at).toLocaleString()}</td>
                <td>
                  {t.status === "Pending" && (
                    <>
                      <button
                        className="btn btn-success btn-sm me-2"
                        onClick={() => updateThesisStatus(t.id, "Approved")}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger btn-sm me-2"
                        onClick={() => updateThesisStatus(t.id, "Rejected")}
                      >
                        Reject
                      </button>
                    </>
                  )}
                  <button
                    className={`btn btn-warning btn-sm ${t.archived ? "" : "me-2"}`}
                    onClick={() => archiveThesis(t.id, !t.archived)}
                  >
                    {t.archived ? "Restore" : "Archive"}
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
