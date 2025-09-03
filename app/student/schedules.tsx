import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function StudentSchedules() {
  const [schedules] = useState([
    { date: "2025-09-01", time: "09:00 AM", event: "Proposal Defense", location: "Room 101" },
    { date: "2025-09-05", time: "01:30 PM", event: "Adviser Meeting", location: "Library" },
    { date: "2025-09-10", time: "10:00 AM", event: "Final Defense", location: "Main Hall" },
  ]);

  const [notifications] = useState([
    { message: "Your adviser added feedback to Chapter 2.", type: "info" },
    { message: "Schedule for Proposal Defense has been updated.", type: "warning" },
    { message: "Final Defense results will be released soon.", type: "success" },
  ]);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {/* Schedules */}
        <div className="col-md-7">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="text-primary fw-bold mb-4 text-center">📅 My Schedules</h2>
              <table className="table table-striped align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Event</th>
                    <th>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {schedules.map((s, i) => (
                    <tr key={i}>
                      <td>{s.date}</td>
                      <td>{s.time}</td>
                      <td>{s.event}</td>
                      <td>{s.location}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="col-md-5">
          <div className="card shadow-lg border-0">
            <div className="card-body">
              <h2 className="text-success fw-bold mb-4 text-center">🔔 Notifications</h2>
              <ul className="list-group">
                {notifications.map((n, i) => (
                  <li
                    key={i}
                    className={`list-group-item list-group-item-${
                      n.type === "success" ? "success" : n.type === "warning" ? "warning" : "info"
                    }`}
                  >
                    {n.message}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
