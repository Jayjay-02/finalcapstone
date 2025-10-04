import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface AdviserAssignment {
  groupId: number;
  groupName: string;
  adviser: string;
  panels: string[];
}

interface ProjectGroup {
  groupId: number;
  groupName: string;
  members: string[]; // student emails
}

interface Panel {
  email: string;
  password: string;
  image: string;
  groupId?: number;
  notifications?: { message: string; type: string }[];
}

interface Student {
  email: string;
  name?: string;
  groupId?: number;
  notifications?: { message: string; type: string }[];
}

export default function AdminAssignAdviser() {
  const [groupId, setGroupId] = useState<number | "">("");
  const [adviser, setAdviser] = useState("");
  const [selectedPanels, setSelectedPanels] = useState<string[]>([]);
  const [groups, setGroups] = useState<ProjectGroup[]>([]);
  const [registeredPanels, setRegisteredPanels] = useState<Panel[]>([]);
  const [faculty, setFaculty] = useState<string[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [assignments, setAssignments] = useState<AdviserAssignment[]>([]);

  // Load groups, panels, faculty, students, and assignments
  useEffect(() => {
    const storedGroups: ProjectGroup[] = JSON.parse(
      localStorage.getItem("createdGroups") || "[]"
    );
    const formattedGroups = storedGroups.map((g: any) => ({
      groupId: g.id,
      groupName: g.name,
      members: g.members,
    }));
    setGroups(formattedGroups);

    const storedPanels: Panel[] = JSON.parse(
      localStorage.getItem("panels") || "[]"
    );
    setRegisteredPanels(storedPanels);

    const registeredInstructors = JSON.parse(
      localStorage.getItem("registeredInstructors") || "[]"
    );
    const facultyList = registeredInstructors.map(
      (inst: { name: string; email: string }) => `${inst.name} (${inst.email})`
    );
    setFaculty(facultyList);

    const approvedStudents: Student[] = JSON.parse(
      localStorage.getItem("approvedStudents") || "[]"
    );
    setStudents(approvedStudents);

    const storedAssignments: AdviserAssignment[] = JSON.parse(
      localStorage.getItem("adviserAssignments") || "[]"
    );
    setAssignments(storedAssignments);
  }, []);

  const handlePanelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setSelectedPanels(selected);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupId || !adviser) return;

    const group = groups.find((g) => g.groupId === groupId);
    if (!group) return;

    let updatedAssignments = [...assignments];
    const existingIndex = updatedAssignments.findIndex((a) => a.groupId === groupId);

    if (existingIndex >= 0) {
      updatedAssignments[existingIndex] = {
        groupId,
        groupName: group.groupName,
        adviser,
        panels: selectedPanels,
      };
    } else {
      updatedAssignments.push({
        groupId,
        groupName: group.groupName,
        adviser,
        panels: selectedPanels,
      });
    }

    setAssignments(updatedAssignments);
    localStorage.setItem("adviserAssignments", JSON.stringify(updatedAssignments));

    // Update students
    const updatedStudents = students.map((s) => {
      if (group.members.includes(s.email)) {
        const notifs = s.notifications || [];
        notifs.push({
          message: `✅ Adviser assigned: ${adviser}. Panels: ${selectedPanels.join(", ")}`,
          type: "success",
        });
        return { ...s, notifications: notifs, groupId: group.groupId };
      }
      return s;
    });
    setStudents(updatedStudents);
    localStorage.setItem("approvedStudents", JSON.stringify(updatedStudents));

    // Update panels
    const updatedPanels = registeredPanels.map((p) => {
      if (selectedPanels.includes(p.email)) {
        const notifs = p.notifications || [];
        notifs.push({
          message: `✅ You are assigned to group "${group.groupName}" (Adviser: ${adviser})`,
          type: "success",
        });
        return { ...p, groupId: group.groupId, notifications: notifs };
      }
      return p;
    });
    setRegisteredPanels(updatedPanels);
    localStorage.setItem("panels", JSON.stringify(updatedPanels));

    alert(`✅ Adviser & Panels assigned to "${group.groupName}"!`);

    setGroupId("");
    setAdviser("");
    setSelectedPanels([]);
  };

  return (
    <div
      className="min-vh-100 p-4"
      style={{
        background: "linear-gradient(135deg, #2c2c2c 0%, #3a3a3a 100%)",
        color: "#f8f9fa",
        overflowY: "auto",
      }}
    >
      <div className="container">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">👩‍🏫 Assign Advisers & Panels</h1>
          <p className="text-secondary fs-5">
            Select a group and assign their adviser and panel members.
          </p>
        </div>

        {/* Form */}
        <div
          className="card shadow border-0 rounded-4 mx-auto"
          style={{ maxWidth: "650px", backgroundColor: "#ffffff" }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} className="text-start">
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
                    <option key={g.groupId} value={g.groupId}>
                      {g.groupName}
                    </option>
                  ))}
                </select>
              </div>

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

              <div className="mb-3">
                <label className="form-label fw-bold">Assign Panel Members</label>
                <select
                  className="form-select"
                  multiple
                  value={selectedPanels}
                  onChange={handlePanelChange}
                  style={{ height: "150px" }}
                >
                  {registeredPanels.map((p) => (
                    <option key={p.email} value={p.email}>
                      {p.email}
                    </option>
                  ))}
                </select>
                <small className="text-muted">
                  Hold <b>Ctrl</b> (Windows) or <b>Command</b> (Mac) to select multiple.
                </small>
              </div>

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

        {/* Display Saved Assignments */}
        {assignments.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold text-light">📋 Adviser & Panel Assignments</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3 bg-white text-dark">
                <thead className="table-dark text-white">
                  <tr>
                    <th>Group Name</th>
                    <th>Adviser</th>
                    <th>Panels</th>
                  </tr>
                </thead>
                <tbody>
                  {assignments.map((a) => (
                    <tr key={a.groupId}>
                      <td>{a.groupName}</td>
                      <td>{a.adviser}</td>
                      <td>{a.panels.join(", ") || "None"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <div className="text-center mt-5 small text-light">
          &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
        </div>
      </div>
    </div>
  );
}
