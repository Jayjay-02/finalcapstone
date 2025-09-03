import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function ArchiveThesis() {
  const router = useRouter();

  // Sample thesis data
  const [theses, setTheses] = useState([
    { id: 1, title: "AI in Healthcare", group: "Group 1", status: "Ongoing" },
    { id: 2, title: "Blockchain for Finance", group: "Group 2", status: "Completed" },
    { id: 3, title: "IoT for Smart Cities", group: "Group 3", status: "Ongoing" },
  ]);

  const [archived, setArchived] = useState<any[]>([]);

  // Archive function
  const handleArchive = (id: number) => {
    const thesisToArchive = theses.find((t) => t.id === id);
    if (!thesisToArchive) return;

    setArchived([...archived, thesisToArchive]);
    setTheses(theses.filter((t) => t.id !== id));
  };

  return (
    <div className="container py-5 d-flex justify-content-center">
      <div className="card shadow border-0 w-100" style={{ maxWidth: "850px" }}>
        <div className="card-body">
          <h2 className="fw-bold mb-3 text-primary">📦 Archive Thesis</h2>
          <p className="text-muted fw-light mb-4">
            Select a thesis to archive. Archived theses will be shown below.
          </p>

          {/* Back Button */}
          <button
            className="btn btn-outline-secondary mb-4 rounded-pill px-4"
            onClick={() => router.push("/admin/dashboard")}
          >
            ← Back to Dashboard
          </button>

          {/* Thesis Table */}
          <div className="table-responsive mb-5">
            <table className="table table-hover align-middle">
              <thead className="table-light">
                <tr className="fw-semibold text-muted small">
                  <th>Title</th>
                  <th>Group</th>
                  <th>Status</th>
                  <th className="text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {theses.length > 0 ? (
                  theses.map((thesis) => (
                    <tr key={thesis.id}>
                      <td className="fw-semibold">{thesis.title}</td>
                      <td>{thesis.group}</td>
                      <td>
                        <span
                          className={`badge px-3 py-2 rounded-pill ${
                            thesis.status === "Completed"
                              ? "bg-success"
                              : "bg-warning text-dark"
                          }`}
                        >
                          {thesis.status}
                        </span>
                      </td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-dark rounded-pill px-3"
                          onClick={() => handleArchive(thesis.id)}
                        >
                          Archive
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="text-center text-muted">
                      No theses available to archive.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Archived Theses */}
          <h5 className="fw-semibold text-secondary mb-3">📜 Archived Theses</h5>
          <ul className="list-group list-group-flush">
            {archived.length > 0 ? (
              archived.map((item) => (
                <li
                  className="list-group-item small d-flex justify-content-between align-items-center"
                  key={item.id}
                >
                  <div>
                    <strong>{item.title}</strong> — {item.group}
                  </div>
                  <span
                    className={`badge px-3 py-2 rounded-pill ${
                      item.status === "Completed"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {item.status}
                  </span>
                </li>
              ))
            ) : (
              <li className="list-group-item text-muted small">
                No theses archived yet.
              </li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}
