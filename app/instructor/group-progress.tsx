import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

interface Submission {
  id: number;
  groupName: string;
  topic: string;
  progress: number;
  feedback: {
    from: string;
    date: string;
    comment: string;
    rating: string;
  }[];
}

export default function GroupProgress() {
  const router = useRouter();
  const [groups, setGroups] = useState<Submission[]>([]);

  // Load from localStorage
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("thesisSubmissions") || "[]");
    setGroups(stored);
  }, []);

  // Update progress and save to localStorage
  const updateProgress = (id: number, value: number) => {
    const updated = groups.map((g) => {
      if (g.id === id) {
        // add automatic feedback entry
        const newFeedback = {
          from: "Adviser",
          date: new Date().toISOString().split("T")[0],
          comment: `Progress updated to ${value}%. Keep going!`,
          rating: value >= 80 ? "⭐⭐⭐⭐" : value >= 50 ? "⭐⭐⭐" : "⭐⭐",
        };
        return {
          ...g,
          progress: value,
          feedback: [...g.feedback, newFeedback],
        };
      }
      return g;
    });

    setGroups(updated);
    localStorage.setItem("thesisSubmissions", JSON.stringify(updated));
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">📊 Group Progress</h2>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => router.push("/instructor/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="alert alert-info text-center">
          No student submissions yet.
        </div>
      ) : (
        <div className="list-group shadow-sm">
          {groups.map((group) => (
            <div key={group.id} className="list-group-item p-3">
              <h6 className="fw-semibold">{group.groupName}</h6>
              <small className="text-muted">Topic: {group.topic}</small>

              <div className="mt-3">
                <div className="d-flex justify-content-between">
                  <span className="fw-semibold">Progress</span>
                  <span>{group.progress}%</span>
                </div>
                <div className="progress" style={{ height: "8px" }}>
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: `${group.progress}%` }}
                    aria-valuenow={group.progress}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>

              <div className="mt-3">
                <label className="form-label small">Update Progress (%)</label>
                <input
                  type="number"
                  className="form-control"
                  min={0}
                  max={100}
                  value={group.progress}
                  onChange={(e) =>
                    updateProgress(group.id, Number(e.target.value))
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
