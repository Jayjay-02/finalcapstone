import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface StudentGroup {
  id: number;
  groupName: string;
  members: string[]; // list of student names
}

interface DefenseSchedule {
  groupId: number;
  groupName: string;
  datetime: string;
  panel: string[];
}

export default function AdminScheduleDefense() {
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [groupId, setGroupId] = useState<number | "">("");
  const [datetime, setDatetime] = useState("");
  const [panel, setPanel] = useState<string[]>([]);
  const [schedules, setSchedules] = useState<DefenseSchedule[]>([]);

  // faculty list (can also be pulled from localStorage if dynamic)
  const faculty = ["Prof. Cruz", "Dr. Santos", "Prof. Reyes", "Dr. Villanueva"];

  // Load student groups from localStorage
  useEffect(() => {
    const registeredStudents = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
    // Expect registeredStudents = [{id:1, groupName:"Group A", members:["Alice","Bob"]}, ...]

    if (registeredStudents.length > 0) {
      setGroups(registeredStudents);
    }

    // Load existing schedules
    const savedSchedules = JSON.parse(localStorage.getItem("defenseSchedules") || "[]");
    setSchedules(savedSchedules);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupId || !datetime || panel.length === 0) {
      alert("⚠️ Please complete all fields before scheduling.");
      return;
    }

    const selectedGroup = groups.find((g) => g.id === groupId);
    if (!selectedGroup) {
      alert("Group not found.");
      return;
    }

    const newSchedule: DefenseSchedule = {
      groupId: selectedGroup.id,
      groupName: selectedGroup.groupName,
      datetime,
      panel
    };

    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    localStorage.setItem("defenseSchedules", JSON.stringify(updatedSchedules));

    alert(
      `✅ Defense Scheduled!\n\nGroup: ${selectedGroup.groupName}\nDate: ${datetime}\nPanel: ${panel.join(", ")}`
    );

    // Reset form
    setGroupId("");
    setDatetime("");
    setPanel([]);
  };

  const handlePanelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setPanel(selected);
  };

  return (
    <div
      className="min-vh-100 p-5"
      style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" }}
    >
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold" style={{ color: "#2c2c2c" }}>
            📅 Schedule Thesis Defenses
          </h1>
          <p className="text-muted fs-5">
            Assign defense dates and panels for student groups.
          </p>
        </div>

        {/* Form Card */}
        <div
          className="card shadow-sm border-0 rounded-4 mx-auto"
          style={{ maxWidth: "650px" }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} className="text-start">
              {/* Select Group */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Group</label>
                <select
                  className="form-select"
                  value={groupId}
                  onChange={(e) => setGroupId(Number(e.target.value))}
                  required
                >
                  <option value="">-- Choose Group --</option>
                  {groups.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.groupName} ({g.members.join(", ")})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time */}
              <div className="mb-3">
                <label className="form-label fw-bold">Defense Date & Time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  value={datetime}
                  onChange={(e) => setDatetime(e.target.value)}
                  required
                />
              </div>

              {/* Select Panel Members */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Panel Members</label>
                <select
                  className="form-select"
                  multiple
                  value={panel}
                  onChange={handlePanelChange}
                  required
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
                  className="btn btn-dark btn-lg rounded-3"
                  style={{ backgroundColor: "#2c2c2c", borderColor: "#2c2c2c" }}
                  type="submit"
                >
                  ✅ Schedule Defense
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Scheduled Defenses List */}
        {schedules.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold" style={{ color: "#2c2c2c" }}>
              📋 Scheduled Defenses
            </h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3">
                <thead style={{ backgroundColor: "#e6e6e6" }}>
                  <tr>
                    <th>Group</th>
                    <th>Members</th>
                    <th>Date & Time</th>
                    <th>Panel</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((s, index) => {
                    const group = groups.find((g) => g.id === s.groupId);
                    return (
                      <tr key={index}>
                        <td>{s.groupName}</td>
                        <td>{group ? group.members.join(", ") : "N/A"}</td>
                        <td>{new Date(s.datetime).toLocaleString()}</td>
                        <td>{s.panel.join(", ")}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-5 small text-muted">
          &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
        </div>
      </div>
    </div>
  );
}
