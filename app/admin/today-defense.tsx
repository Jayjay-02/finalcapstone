// today-defense.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

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

export default function TodayDefense() {
  const [groups, setGroups] = useState<StudentGroup[]>([]);
  const [schedules, setSchedules] = useState<DefenseSchedule[]>([]);
  const [todaySchedules, setTodaySchedules] = useState<DefenseSchedule[]>([]);

  useEffect(() => {
    const createdGroups: StudentGroup[] = JSON.parse(localStorage.getItem("createdGroups") || "[]");
    setGroups(createdGroups);

    const savedSchedules: DefenseSchedule[] = JSON.parse(localStorage.getItem("defenseSchedules") || "[]");
    setSchedules(savedSchedules);

    const today = new Date();
    const filtered = savedSchedules.filter((s) => {
      const scheduleDate = new Date(s.datetime);
      return (
        scheduleDate.getFullYear() === today.getFullYear() &&
        scheduleDate.getMonth() === today.getMonth() &&
        scheduleDate.getDate() === today.getDate()
      );
    });
    setTodaySchedules(filtered);
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">📅 Today's Thesis Defenses</h2>

      {todaySchedules.length === 0 ? (
        <div className="alert alert-info text-center">No defenses scheduled for today.</div>
      ) : (
        <div className="card shadow-lg border-0">
          <div className="card-body">
            <table className="table table-striped align-middle text-center">
              <thead className="table-dark">
                <tr>
                  <th>Group</th>
                  <th>Members</th>
                  <th>Time</th>
                  <th>Panel</th>
                </tr>
              </thead>
              <tbody>
                {todaySchedules.map((s, index) => {
                  const group = groups.find((g) => g.id === s.groupId);
                  return (
                    <tr key={index}>
                      <td>{s.groupName}</td>
                      <td>{group ? group.members.join(", ") : "N/A"}</td>
                      <td>{new Date(s.datetime).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                      <td>{s.panel.join(", ")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="text-center mt-4">
              <button className="btn btn-dark" onClick={handlePrint}>
                🖨️ Print Schedule
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
