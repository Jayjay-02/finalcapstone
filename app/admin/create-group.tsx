import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Student {
  name: string;
  email: string;
  groupId?: number;
}

interface Group {
  id: number;
  name: string;
  members: string[]; // student emails
}

export default function AdminCreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [selectedMember, setSelectedMember] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [students, setStudents] = useState<Student[]>([]);

  // Load approved students and existing groups
  useEffect(() => {
    const approvedStudents: Student[] = JSON.parse(
      localStorage.getItem("approvedStudents") || "[]"
    );
    setStudents(approvedStudents);

    const savedGroups: Group[] = JSON.parse(
      localStorage.getItem("createdGroups") || "[]"
    );
    setGroups(savedGroups);
  }, []);

  // Add selected student to members list
  const handleAddMember = () => {
    if (!selectedMember) return;
    if (members.includes(selectedMember)) {
      alert("⚠️ This student is already added to the group.");
      return;
    }
    setMembers([...members, selectedMember]);
    setSelectedMember("");
  };

  // Remove student from members list
  const handleRemoveMember = (member: string) => {
    setMembers(members.filter((m) => m !== member));
  };

  // Create new group
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!groupName || members.length === 0) {
      alert("⚠️ Please enter a group name and add at least one student.");
      return;
    }

    const newGroupId = Date.now();
    const newGroup: Group = { id: newGroupId, name: groupName, members };

    // Update students with groupId
    const updatedStudents = students.map((s) =>
      members.includes(s.email) ? { ...s, groupId: newGroupId } : s
    );

    const updatedGroups = [...groups, newGroup];
    setGroups(updatedGroups);
    setStudents(updatedStudents);

    // Persist to localStorage
    localStorage.setItem("createdGroups", JSON.stringify(updatedGroups));
    localStorage.setItem("approvedStudents", JSON.stringify(updatedStudents));

    alert(`✅ Group Created!\n\nGroup: ${groupName}\nMembers: ${members.join(", ")}`);

    // Reset form
    setGroupName("");
    setMembers([]);
  };

  // Delete group
  const handleDeleteGroup = (index: number) => {
    if (!window.confirm("Are you sure you want to delete this group?")) return;

    const groupToDelete = groups[index];

    // Remove groupId from assigned students
    const updatedStudents = students.map((s) =>
      groupToDelete.members.includes(s.email) ? { ...s, groupId: undefined } : s
    );

    const updatedGroups = groups.filter((_, i) => i !== index);

    setGroups(updatedGroups);
    setStudents(updatedStudents);

    localStorage.setItem("createdGroups", JSON.stringify(updatedGroups));
    localStorage.setItem("approvedStudents", JSON.stringify(updatedStudents));
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
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="fw-bold text-light">👥 Create Student Groups</h1>
          <p className="text-secondary fs-5">
            Assign students into groups for projects or thesis work.
          </p>
        </div>

        {/* Create Group Form */}
        <div
          className="card shadow border-0 rounded-4 mx-auto mb-5"
          style={{ maxWidth: "650px", backgroundColor: "#ffffff" }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label fw-bold">Group Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter group name (e.g., Group A)"
                  value={groupName}
                  onChange={(e) => setGroupName(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label fw-bold">Add Members</label>
                <div className="d-flex gap-2">
                  <select
                    className="form-select"
                    value={selectedMember}
                    onChange={(e) => setSelectedMember(e.target.value)}
                  >
                    <option value="">-- Select a student --</option>
                    {students
                      .filter((s) => !s.groupId)
                      .map((student) => (
                        <option key={student.email} value={student.email}>
                          {student.name || student.email}
                        </option>
                      ))}
                  </select>
                  <button
                    type="button"
                    className="btn btn-dark fw-semibold"
                    onClick={handleAddMember}
                  >
                    ➕ Add
                  </button>
                </div>
              </div>

              {members.length > 0 && (
                <ul className="list-group mb-3">
                  {members.map((m) => (
                    <li
                      key={m}
                      className="list-group-item d-flex justify-content-between align-items-center"
                    >
                      {m}
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => handleRemoveMember(m)}
                      >
                        ❌ Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}

              <div className="d-grid mt-4">
                <button
                  className="btn btn-dark btn-lg rounded-3 fw-semibold"
                  type="submit"
                >
                  ✅ Create Group
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* List of Groups */}
        {groups.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold text-light">📋 Created Groups</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3 bg-white text-dark">
                <thead className="table-dark text-white">
                  <tr>
                    <th>Group Name</th>
                    <th>Members</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g, index) => (
                    <tr key={g.id}>
                      <td className="fw-semibold">{g.name}</td>
                      <td>{g.members.join(", ")}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDeleteGroup(index)}
                        >
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-5 small text-light">
          &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
        </div>
      </div>
    </div>
  );
}
