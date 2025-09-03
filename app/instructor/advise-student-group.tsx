import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

interface Group {
  id: number;
  name: string;
  topic: string;
  notes: string;
  meeting: string;
}

export default function AdviseGroups() {
  const router = useRouter();
  const [groups, setGroups] = useState<Group[]>([]);

  useEffect(() => {
    // Load student submissions (uploaded docs)
    const docs = JSON.parse(localStorage.getItem("documents") || "[]");
    const savedGroups = JSON.parse(localStorage.getItem("groups") || "[]");

    const generatedGroups = docs.map((doc: any) => {
      const existing = savedGroups.find((g: any) => g.id === doc.id);
      return {
        id: doc.id,
        name: doc.file.split(".")[0], // File name before extension = Group name
        topic: doc.title,
        notes: existing?.notes || "",
        meeting: existing?.meeting || ""
      };
    });

    setGroups(generatedGroups);
  }, []);

  const handleChange = (id: number, field: "notes" | "meeting", value: string) => {
    setGroups((prev) =>
      prev.map((g) => (g.id === id ? { ...g, [field]: value } : g))
    );
  };

  const handleSave = (id: number) => {
    localStorage.setItem("groups", JSON.stringify(groups));
    const g = groups.find((x) => x.id === id);
    alert(`✅ Notes saved for ${g?.name}\nTopic: ${g?.topic}`);
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold">👨‍🏫 Advise Student Groups</h2>
        <button
          className="btn btn-outline-dark btn-sm"
          onClick={() => router.push("/instructor/dashboard")}
        >
          ⬅ Back to Dashboard
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="alert alert-secondary text-center">
          No student submissions yet.
        </div>
      ) : (
        <div className="list-group shadow-sm">
          {groups.map((g) => (
            <div key={g.id} className="list-group-item p-3">
              <h6 className="fw-semibold">{g.name}</h6>
              <small className="text-muted">Topic: {g.topic}</small>

              <div className="mt-2">
                <label className="form-label fw-semibold">Adviser Notes</label>
                <textarea
                  className="form-control"
                  rows={2}
                  value={g.notes}
                  placeholder="Write feedback or advice..."
                  onChange={(e) => handleChange(g.id, "notes", e.target.value)}
                />
              </div>

              <div className="mt-2">
                <label className="form-label fw-semibold">Next Meeting</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={g.meeting}
                  onChange={(e) => handleChange(g.id, "meeting", e.target.value)}
                />
              </div>

              <div className="text-end mt-2">
                <button className="btn btn-primary btn-sm" onClick={() => handleSave(g.id)}>
                  Save Notes
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
