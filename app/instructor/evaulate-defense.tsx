import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

interface Defense {
  id: number;
  group: string;
  topic: string;
  score: string;
  remarks: string;
}

export default function EvaluateDefenses() {
  const router = useRouter();
  const [defenses, setDefenses] = useState<Defense[]>([]);

  // Load defenses from localStorage
  useEffect(() => {
    const storedDefenses: Defense[] = JSON.parse(
      localStorage.getItem("defenses") || "[]"
    );
    setDefenses(storedDefenses);
  }, []);

  const handleScoreChange = (id: number, value: string) => {
    const updated = defenses.map(d => d.id === id ? { ...d, score: value } : d);
    setDefenses(updated);
    localStorage.setItem("defenses", JSON.stringify(updated));
  };

  const handleRemarksChange = (id: number, value: string) => {
    const updated = defenses.map(d => d.id === id ? { ...d, remarks: value } : d);
    setDefenses(updated);
    localStorage.setItem("defenses", JSON.stringify(updated));
  };

  const handleSubmit = (id: number) => {
    const defense = defenses.find(d => d.id === id);
    if (!defense) return;
    alert(
      `✅ Evaluation submitted for ${defense.group}\nTopic: ${defense.topic}\nScore: ${defense.score}\nRemarks: ${defense.remarks}`
    );
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📝 Evaluate Defenses</h2>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => router.push("/instructor/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {/* Defense Evaluation List */}
      {defenses.length === 0 ? (
        <div className="alert alert-secondary text-center">
          No defenses available to evaluate.
        </div>
      ) : (
        <div className="list-group shadow-sm" style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {defenses.map(defense => (
            <div key={defense.id} className="list-group-item p-3 mb-2 rounded shadow-sm">
              <h6 className="fw-semibold">{defense.group}</h6>
              <small className="text-muted">Topic: {defense.topic}</small>

              {/* Score Input */}
              <div className="mt-2">
                <label className="form-label fw-semibold">Score</label>
                <input
                  type="number"
                  min={0}
                  max={100}
                  className="form-control"
                  placeholder="Enter score (0-100)"
                  value={defense.score}
                  onChange={e => handleScoreChange(defense.id, e.target.value)}
                />
              </div>

              {/* Remarks Input */}
              <div className="mt-2">
                <label className="form-label fw-semibold">Remarks</label>
                <textarea
                  className="form-control"
                  rows={2}
                  placeholder="Write your remarks..."
                  value={defense.remarks}
                  onChange={e => handleRemarksChange(defense.id, e.target.value)}
                />
              </div>

              <div className="text-end mt-2">
                <button
                  className="btn btn-dark btn-sm"
                  onClick={() => handleSubmit(defense.id)}
                >
                  Submit Evaluation
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
