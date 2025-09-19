import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface DefenseSchedule {
  groupId: number;
  groupName: string;
  datetime: string;
  panel: string[];
}

interface Student {
  name: string;
  email: string;
  groupId?: number;
  notifications?: { message: string; type: "info" | "success" }[];
}

export default function StudentSchedules() {
  const [student, setStudent] = useState<Student | null>(null);
  const [schedules, setSchedules] = useState<DefenseSchedule[]>([]);
  const [notifications, setNotifications] = useState<
    { message: string; type: "info" | "success" }[]
  >([]);

  const refreshData = () => {
    const loggedIn: Student | null = JSON.parse(
      localStorage.getItem("loggedInStudent") || "null"
    );
    if (!loggedIn) return setStudent(null);

    setStudent(loggedIn);

    // Load defense schedules
    const allSchedules: DefenseSchedule[] = JSON.parse(
      localStorage.getItem("defenseSchedules") || "[]"
    );
    setSchedules(allSchedules);

    // Load notifications from approvedStudents
    const approvedStudents: Student[] = JSON.parse(
      localStorage.getItem("approvedStudents") || "[]"
    );
    const currentStudent = approvedStudents.find((s) => s.email === loggedIn.email);
    setNotifications(currentStudent?.notifications || []);
  };

  useEffect(() => {
    refreshData();
    const interval = setInterval(refreshData, 5000); // refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const mySchedules = student?.groupId
    ? schedules.filter((s) => s.groupId === student.groupId)
    : [];

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Schedules */}
        <div className="col-md-7">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="text-primary fw-bold mb-4 text-center">📅 My Schedules</h2>
              {mySchedules.length > 0 ? (
                <table className="table table-striped align-middle text-center">
                  <thead className="table-dark">
                    <tr>
                      <th>Date</th>
                      <th>Time</th>
                      <th>Event</th>
                      <th>Panel</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mySchedules.map((s, i) => {
                      const dateObj = new Date(s.datetime);
                      return (
                        <tr key={i}>
                          <td>{dateObj.toLocaleDateString()}</td>
                          <td>{dateObj.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</td>
                          <td>{s.groupName} Defense</td>
                          <td>{s.panel.join(", ")}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              ) : (
                <p className="text-muted text-center">No schedules assigned to your group yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="text-success fw-bold mb-4 text-center">🔔 Notifications</h2>
              {notifications.length > 0 ? (
                notifications
                  .slice() // clone to prevent mutation
                  .reverse() // show newest first
                  .map((n, i) => (
                    <div key={i} className={`alert alert-${n.type}`} role="alert">
                      {n.message}
                    </div>
                  ))
              ) : (
                <div className="alert alert-secondary text-center">No new notifications</div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
