import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

export default function AdminCreateGroup() {
  const [groupName, setGroupName] = useState("");
  const [members, setMembers] = useState<string[]>([]);
  const [groups, setGroups] = useState<{ name: string; members: string[] }[]>([]);
  const [students, setStudents] = useState<string[]>([]);

  // 🔹 Load approved students on page load
  useEffect(() => {
    const approvedStudents = JSON.parse(localStorage.getItem("approvedStudents") || "[]");
    const list = approvedStudents.map((s: { name?: string; email: string }) => s.name || s.email);
    setStudents(list);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!groupName || members.length === 0) {
      alert("⚠️ Please enter a group name and select at least one student.");
      return;
    }

    const newGroup = { name: groupName, members };
    setGroups([...groups, newGroup]);

    alert(
      `✅ Group Created!\n\nGroup: ${groupName}\nMembers: ${members.join(", ")}`
    );

    // Reset form
    setGroupName("");
    setMembers([]);
  };

  const handleMemberChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = Array.from(e.target.selectedOptions, (option) => option.value);
    setMembers(selected);
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

        {/* Form Card */}
        <div
          className="card shadow border-0 rounded-4 mx-auto"
          style={{ maxWidth: "600px", backgroundColor: "#ffffff" }}
        >
          <div className="card-body p-4">
            <form onSubmit={handleSubmit} className="text-start">
              {/* Group Name */}
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

              {/* Members Selection */}
              <div className="mb-3">
                <label className="form-label fw-bold">Select Members</label>
                <select
                  className="form-select"
                  multiple
                  value={members}
                  onChange={handleMemberChange}
                  required
                  style={{ height: "120px" }}
                >
                  {students.length > 0 ? (
                    students.map((student, index) => (
                      <option key={index} value={student}>
                        {student}
                      </option>
                    ))
                  ) : (
                    <option disabled>No approved students found</option>
                  )}
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
                  ✅ Create Group
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Groups List */}
        {groups.length > 0 && (
          <div className="mt-5">
            <h3 className="fw-bold text-light">📋 Created Groups</h3>
            <div className="table-responsive">
              <table className="table table-bordered table-striped mt-3 bg-white text-dark">
                <thead className="table-dark text-white">
                  <tr>
                    <th>Group Name</th>
                    <th>Members</th>
                  </tr>
                </thead>
                <tbody>
                  {groups.map((g, index) => (
                    <tr key={index}>
                      <td>{g.name}</td>
                      <td>{g.members.join(", ")}</td>
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
