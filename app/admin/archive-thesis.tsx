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

export default function ArchiveThesis() {
  const [theses, setTheses] = useState<ThesisSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchArchivedTheses = async () => {
    setLoading(true);
    try {
      // Update endpoint to fit your backend, add ?archived=true filter if supported
      const resp = await fetch("/api/students/thesis/?archived=true");
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
    fetchArchivedTheses();
  }, []);

  // Restore thesis
  const restoreThesis = async (id: number) => {
    try {
      const resp = await fetch(`/api/students/thesis/${id}/archive/`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: false }),
      });
      if (!resp.ok) throw new Error("Restore failed");
      fetchArchivedTheses();
    } catch {
      alert("Failed to restore thesis.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">🗄 Archived Theses</h2>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : theses.length === 0 ? (
        <div className="alert alert-warning text-center">
          No archived theses found.
        </div>
      ) : (
        <table className="table table-bordered table-striped align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th>Student</th>
              <th>Topic</th>
              <th>Status</th>
              <th>Created</th>
              <th>Action</th>
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
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => restoreThesis(t.id)}
                  >
                    Restore
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
