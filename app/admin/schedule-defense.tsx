// AdminScheduleDefense.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";
import { Panel } from "./register-panel";

interface StudentGroup {
  id: number;
  name: string;
  members: string[];
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
  const [panels, setPanels] = useState<Panel[]>([]);

  // Load groups, panels, schedules
  useEffect(() => {
    const createdGroups: StudentGroup[] = JSON.parse(localStorage.getItem("createdGroups") || "[]");
    setGroups(createdGroups);

    const registeredPanels: Panel[] = JSON.parse(localStorage.getItem("panels") || "[]");
    setPanels(registeredPanels);

    const savedSchedules: DefenseSchedule[] = JSON.parse(localStorage.getItem("defenseSchedules") || "[]");
    setSchedules(savedSchedules);
  }, []);

  const handlePanelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setPanel(selected);
  };

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
      groupName: selectedGroup.name,
      datetime,
      panel,
    };

    const updatedSchedules = [...schedules, newSchedule];
    setSchedules(updatedSchedules);
    localStorage.setItem("defenseSchedules", JSON.stringify(updatedSchedules));

    alert(`✅ Defense Scheduled for ${selectedGroup.name}!\nPanels: ${panel.join(", ")}`);

    setGroupId(""); setDatetime(""); setPanel([]);
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">📅 Schedule Thesis Defenses</h2>

      <form onSubmit={handleSubmit} className="card p-4 shadow-lg border-0 mb-5">
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
                {g.name} ({g.members.join(", ")})
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

        {/* Panel Members */}
        <div className="mb-3">
          <label className="form-label fw-bold">Select Panel Members</label>
          <select
            className="form-select"
            multiple
            value={panel}
            onChange={handlePanelChange}
            required
            style={{ height: "200px", overflowY: "scroll" }} // scrollable and fixed height
          >
            {panels.map((p, index) => (
              <option key={index} value={p.name}>
                {p.name} ({p.email})
              </option>
            ))}
          </select>
          <small className="text-muted">
            Hold <b>Ctrl</b> (Windows) or <b>Command</b> (Mac) to select multiple.
          </small>
        </div>

        <button className="btn btn-dark w-100" type="submit">
          ✅ Schedule Defense
        </button>
      </form>

      {/* Scheduled Defenses Table */}
      {schedules.length > 0 && (
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <h3 className="fw-bold mb-3">📋 Scheduled Defenses</h3>
            <table className="table table-striped align-middle text-center">
              <thead className="table-dark">
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
    </div>
  );
}
