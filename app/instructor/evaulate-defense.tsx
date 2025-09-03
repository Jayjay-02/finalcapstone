import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function EvaluateDefenses() {
  const router = useRouter();

  // Example defense list with scoring
  const [defenses, setDefenses] = useState([
    { id: 1, group: "Group A", topic: "AI in Education", score: "", remarks: "" },
    { id: 2, group: "Group B", topic: "E-commerce Web App", score: "", remarks: "" },
    { id: 3, group: "Group C", topic: "Climate Change Study", score: "", remarks: "" },
  ]);

  const handleScoreChange = (id: number, value: string) => {
    setDefenses((prev) =>
      prev.map((d) => (d.id === id ? { ...d, score: value } : d))
    );
  };

  const handleRemarksChange = (id: number, value: string) => {
    setDefenses((prev) =>
      prev.map((d) => (d.id === id ? { ...d, remarks: value } : d))
    );
  };

  const handleSubmit = (id: number) => {
    const defense = defenses.find((d) => d.id === id);
    alert(
      `✅ Evaluation submitted for ${defense?.group}\nTopic: ${defense?.topic}\nScore: ${defense?.score}\nRemarks: ${defense?.remarks}`
    );
    // 🔹 Later: send to backend
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
      <div className="list-group shadow-sm">
        {defenses.map((defense) => (
          <div
            key={defense.id}
            className="list-group-item p-3"
          >
            <h6 className="fw-semibold">{defense.group}</h6>
            <small className="text-muted">Topic: {defense.topic}</small>

            {/* Score Input */}
            <div className="mt-2">
              <label className="form-label fw-semibold">Score</label>
              <input
                type="number"
                min="0"
                max="100"
                className="form-control"
                placeholder="Enter score (0-100)"
                value={defense.score}
                onChange={(e) => handleScoreChange(defense.id, e.target.value)}
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
                onChange={(e) => handleRemarksChange(defense.id, e.target.value)}
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
    </div>
  );
}
