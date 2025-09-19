import "bootstrap/dist/css/bootstrap.min.css";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

interface Thesis {
  id: number;
  title: string;
  author: string;
  adviser: string;
  status: "Approved" | "Pending" | "In Review";
}

export default function EditThesis() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const thesisId = Number(params.id);

  const [thesis, setThesis] = useState<Thesis | null>(null);
  const [allTheses, setAllTheses] = useState<Thesis[]>([]);

  useEffect(() => {
    // Load thesis list from localStorage
    const storedTheses: Thesis[] = JSON.parse(localStorage.getItem("thesisList") || "[]");
    setAllTheses(storedTheses);

    // Find thesis by ID
    const found = storedTheses.find((t) => t.id === thesisId);
    if (found) setThesis(found);
  }, [thesisId]);

  const handleChange = (field: keyof Thesis, value: string) => {
    if (!thesis) return;
    setThesis({ ...thesis, [field]: value } as Thesis);
  };

  const handleSave = () => {
    if (!thesis) return;
    const updatedList = allTheses.map((t) => (t.id === thesis.id ? thesis : t));
    localStorage.setItem("thesisList", JSON.stringify(updatedList));
    router.push("/admin/manage-thesis"); // Go back to Manage Thesis page
  };

  if (!thesis) {
    return (
      <div className="container py-5 text-center">
        <h3 className="text-muted">Thesis not found.</h3>
        <button className="btn btn-dark mt-3" onClick={() => router.push("/admin/manage-thesis")}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <div className="card shadow-lg border-0 mx-auto" style={{ maxWidth: 600 }}>
        <div className="card-body">
          <h2 className="fw-bold mb-4 text-center">✏️ Edit Thesis</h2>

          <div className="mb-3">
            <label className="form-label fw-semibold">Title</label>
            <input
              type="text"
              className="form-control"
              value={thesis.title}
              onChange={(e) => handleChange("title", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Author</label>
            <input
              type="text"
              className="form-control"
              value={thesis.author}
              onChange={(e) => handleChange("author", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Adviser</label>
            <input
              type="text"
              className="form-control"
              value={thesis.adviser}
              onChange={(e) => handleChange("adviser", e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Status</label>
            <select
              className="form-select"
              value={thesis.status}
              onChange={(e) => handleChange("status", e.target.value)}
            >
              <option value="Approved">Approved</option>
              <option value="Pending">Pending</option>
              <option value="In Review">In Review</option>
            </select>
          </div>

          <div className="d-flex justify-content-between mt-4">
            <button className="btn btn-secondary" onClick={() => router.push("/admin/manage-thesis")}>
              Cancel
            </button>
            <button className="btn btn-dark" onClick={handleSave}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
