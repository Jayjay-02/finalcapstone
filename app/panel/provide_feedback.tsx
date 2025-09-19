import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Student {
  email: string;
  name: string;
  groupId?: number;
  notifications?: { message: string; type: string }[];
  feedback?: { message: string; from: string }[]; // store which panel gave feedback
}

interface Panel {
  email: string;
  groupId?: number;
}

interface Group {
  id: number;
  name: string;
  members: string[]; // student emails
}

export default function ProvideFeedback() {
  const [students, setStudents] = useState<Student[]>([]);
  const [panels, setPanels] = useState<Panel[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [feedback, setFeedback] = useState("");
  const [submitted, setSubmitted] = useState(false);

  // 🔹 Load students, panels, and groups
  useEffect(() => {
    const approvedStudents: Student[] = JSON.parse(
      localStorage.getItem("approvedStudents") || "[]"
    );
    setStudents(approvedStudents);

    const registeredPanels: Panel[] = JSON.parse(
      localStorage.getItem("panels") || "[]"
    );
    setPanels(registeredPanels);

    const savedGroups: Group[] = JSON.parse(
      localStorage.getItem("createdGroups") || "[]"
    );
    setGroups(savedGroups);
  }, []);

  // 🔹 Handle feedback submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStudent || !feedback) return;

    const panelEmail = "panel@example.com"; // Replace with logged-in panel email

    const updatedStudents = students.map((s) => {
      if (s.email === selectedStudent) {
        const existingFeedback = s.feedback || [];
        existingFeedback.push({ message: feedback, from: panelEmail });
        return { ...s, feedback: existingFeedback };
      }
      return s;
    });

    localStorage.setItem("approvedStudents", JSON.stringify(updatedStudents));
    setStudents(updatedStudents);
    setFeedback("");
    setSubmitted(true);
  };

  // 🔹 Only show students under the logged-in panel's group
  const panelEmail = "panel@example.com"; // Replace with actual logged-in panel email
  const panel = panels.find((p) => p.email === panelEmail);
  const assignedStudents = panel
    ? students.filter((s) => s.groupId === panel.groupId)
    : [];

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4">💬 Provide Feedback</h2>
      <p className="text-muted mb-4">
        Comment and provide suggestions on student theses for improvements.
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Select Student</label>
          <select
            className="form-select mb-3"
            value={selectedStudent}
            onChange={(e) => setSelectedStudent(e.target.value)}
            required
          >
            <option value="">-- Choose Student --</option>
            {assignedStudents.map((s) => {
              const group = groups.find((g) => g.id === s.groupId);
              return (
                <option key={s.email} value={s.email}>
                  {s.name} ({s.email}) {group ? `- ${group.name}` : ""}
                </option>
              );
            })}
          </select>
        </div>

        <div className="mb-3">
          <textarea
            className="form-control"
            rows={6}
            placeholder="Write your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-dark rounded-pill px-4">
          Submit Feedback
        </button>
      </form>

      {submitted && (
        <div className="alert alert-success mt-3" role="alert">
          Feedback submitted successfully!
        </div>
      )}

      {assignedStudents.length > 0 && (
        <div className="mt-5">
          <h5 className="fw-bold">📋 Previous Feedback</h5>
          {assignedStudents.map((s) => {
            const group = groups.find((g) => g.id === s.groupId);
            return (
              <div key={s.email} className="mb-3">
                <strong>
                  {s.name} ({s.email}) {group ? `- ${group.name}` : ""}
                </strong>
                <ul>
                  {(s.feedback || []).map((f, idx) => (
                    <li key={idx}>
                      {f.message} <span className="text-muted">(by {f.from})</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
