import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function AdminAssignAdviser() {
  const [student, setStudent] = useState("");
  const [adviser, setAdviser] = useState("");
  const [panels, setPanels] = useState<string[]>([]);

  // 🔹 Dummy data (replace with backend data later)
  const students = ["Juan Dela Cruz", "Maria Santos", "Pedro Reyes"];
  const faculty = ["Prof. Cruz", "Dr. Santos", "Engr. Dela Peña", "Prof. Reyes"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(
      `✅ Adviser Assigned!\n\nStudent: ${student}\nAdviser: ${adviser}\nPanels: ${panels.join(
        ", "
      )}`
    );

    // Reset after submit
    setStudent("");
    setAdviser("");
    setPanels([]);
  };

  const handlePanelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setPanels(selected);
  };

  return (
    <div
      className="min-vh-100 p-4"
      style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)", // ✅ light black gradient
        color: "#f8f9fa",
        overflowY: "auto", // ✅ scrollable page
      }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">
            👩‍🏫 Assign Advisers & Panels
          </h1>
          <p className="text-secondary fs-5">
            Select a student and assign their adviser and panel members.
          </p>
        </div>

        {/* Form */}
        <div
          className="card shadow border-0 rounded-4 mx-auto"
          style={{ maxWidth: "650px", backgroundColor: "#ffffff" }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} className="text-start">
              {/* Student Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Student</label>
                <select
                  className="form-select"
                  value={student}
                  onChange={(e) => setStudent(e.target.value)}
                  required
                >
                  <option value="">-- Choose Student --</option>
                  {students.map((s, index) => (
                    <option key={index} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Adviser Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold">Assign Adviser</label>
                <select
                  className="form-select"
                  value={adviser}
                  onChange={(e) => setAdviser(e.target.value)}
                  required
                >
                  <option value="">-- Choose Adviser --</option>
                  {faculty.map((f, index) => (
                    <option key={index} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* Panel Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold">Assign Panel Members</label>
                <select
                  className="form-select"
                  multiple
                  value={panels}
                  onChange={handlePanelChange}
                  style={{ height: "120px" }}
                >
                  {faculty.map((f, index) => (
                    <option key={index} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
                <small className="text-muted">
                  Hold <b>Ctrl</b> (Windows) or <b>Command</b> (Mac) to select multiple.
                </small>
              </div>

              {/* Submit Button */}
              <div className="d-grid mt-4">
                <button
                  className="btn btn-dark btn-lg rounded-3 fw-semibold"
                  type="submit"
                >
                  ✅ Assign Adviser & Panels
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 small text-light">
          &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
        </div>
      </div>
    </div>
  );
}
