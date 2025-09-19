import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Panel {
  id: number;
  full_name: string;
  user: { id: number; username: string; email: string };
}

interface Student {
  id: number;
  full_name: string;
  user: { id: number; username: string; email: string };
}

interface Group {
  id: number;
  name: string;
  students: Student[];
}

interface DefenseSchedule {
  id: number;
  group: number;
  datetime: string;
  panels: Panel[];
}

export default function TodayDefense() {
  const [schedules, setSchedules] = useState<DefenseSchedule[]>([]);
  const [groups, setGroups] = useState<Group[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch today's defense schedules from the backend API
  useEffect(() => {
    // Fetch all schedules
    const fetchSchedules = async () => {
      setLoading(true);
      try {
        // Get all defense schedules (update URL as per your backend routing if different)
        const resp = await fetch("/api/students/defense-schedule/");
        if (!resp.ok) throw new Error("Failed to fetch");
        const allSchedules = await resp.json();

        // Get all groups (optional, if API includes group details inline, skip this)
        const groupResp = await fetch("/api/students/group/");
        const groupData = groupResp.ok ? await groupResp.json() : [];
        setGroups(groupData instanceof Array ? groupData : [groupData]);

        // Filter for today:
        const today = new Date();
        const isToday = (dateStr: string) => {
          const d = new Date(dateStr);
          return (
            d.getDate() === today.getDate() &&
            d.getMonth() === today.getMonth() &&
            d.getFullYear() === today.getFullYear()
          );
        };
        const todaysSchedules = allSchedules.filter((s: DefenseSchedule) => isToday(s.datetime));
        setSchedules(todaysSchedules);
      } catch (error) {
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedules();
  }, []);

  const getGroup = (groupId: number) => groups.find((g) => g.id === groupId);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">🎓 Today's Thesis Defenses</h2>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : schedules.length === 0 ? (
        <div className="alert alert-warning text-center">
          No thesis defenses scheduled for today.
        </div>
      ) : (
        <div className="card shadow-lg border-0">
          <div className="card-body">
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
                {schedules.map((s) => {
                  const group = getGroup(s.group);
                  return (
                    <tr key={s.id}>
                      <td>{group ? group.name : "Unknown"}</td>
                      <td>{group && group.students ? group.students.map((m) => m.full_name).join(", ") : "N/A"}</td>
                      <td>{new Date(s.datetime).toLocaleString()}</td>
                      <td>{s.panels.map((p) => p.full_name).join(", ")}</td>
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
