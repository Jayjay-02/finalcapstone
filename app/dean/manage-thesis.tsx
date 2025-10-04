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
  const [searchTerm, setSearchTerm] = useState("");

  // ✅ Sample thesis data (used if no backend)
  const sampleData: ThesisSubmission[] = [
    {
      id: 1,
      topic: "AI-Based Traffic Management System",
      status: "Pending",
      student: { full_name: "John Dela Cruz" },
      group: 1,
      created_at: "2025-09-10T08:30:00Z",
    },
    {
      id: 2,
      topic: "Blockchain for Academic Record Security",
      status: "Approved",
      student: { full_name: "Maria Santos" },
      group: 2,
      created_at: "2025-09-12T10:15:00Z",
    },
    {
      id: 3,
      topic: "IoT-Based Flood Monitoring Device",
      status: "Rejected",
      student: { full_name: "Carlos Reyes" },
      group: 3,
      created_at: "2025-09-15T14:20:00Z",
    },
    {
      id: 4,
      topic: "Smart Agriculture Using Drones",
      status: "Pending",
      student: { full_name: "Anna Lopez" },
      group: 4,
      created_at: "2025-09-18T09:45:00Z",
    },
  ];

  // ✅ Fetch all thesis submissions (mocked with sample data)
  const fetchTheses = async () => {
    setLoading(true);
    try {
      // Simulate backend delay
      await new Promise((res) => setTimeout(res, 800));
      setTheses(sampleData);
    } catch (e) {
      setTheses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTheses();
  }, []);

  // ✅ Filter theses based on search
  const filteredTheses = theses.filter(
    (t) =>
      t.topic.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // ✅ Approve or reject thesis (mock action)
  const updateThesisStatus = async (id: number, status: string) => {
    const updated = theses.map((t) =>
      t.id === id ? { ...t, status } : t
    );
    setTheses(updated);
    alert(`Thesis ID ${id} has been ${status}.`);
  };

  // ✅ Archive or restore thesis (mock action)
  const archiveThesis = async (id: number, archived: boolean) => {
    const updated = theses.map((t) =>
      t.id === id ? { ...t, archived } : t
    );
    setTheses(updated);
    alert(`Thesis ID ${id} ${archived ? "archived" : "restored"}.`);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center text-primary">
        📑 Manage Thesis Submissions
      </h2>

      {/* ✅ Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          className="form-control w-50 d-inline"
          placeholder="Search by topic, student, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : filteredTheses.length === 0 ? (
        <div className="alert alert-warning text-center">
          No thesis submissions found.
        </div>
      ) : (
        <table className="table table-bordered table-striped align-middle text-center shadow-sm">
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
            {filteredTheses.map((t) => (
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
                    className={`btn btn-warning btn-sm ${
                      t.archived ? "" : "me-2"
                    }`}
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
