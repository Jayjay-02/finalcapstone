import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Group {
  id: number;
  name: string;
  topic: string;
  students: { full_name: string }[];
}

interface DefenseSchedule {
  id: number;
  group: number;
  datetime: string;
}

interface Evaluation {
  id?: number;
  group: number;
  panel: number;
  score: number;
  comment: string;
}

export default function PanelEvaluateDefense() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [schedules, setSchedules] = useState<DefenseSchedule[]>([]);
  const [evaluations, setEvaluations] = useState<{ [groupId: number]: Evaluation }>({});
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState("");

  useEffect(() => {
    const fetchAssignments = async () => {
      setLoading(true);
      try {
        // Fetch defense schedules where this panel is assigned (update endpoint as needed)
        const scheduleResp = await fetch("/api/students/defense-schedule/");
        if (!scheduleResp.ok) throw new Error("No schedules");
        const scheduleData: DefenseSchedule[] = await scheduleResp.json();

        // Assume panel user info is stored in local/sessionstorage (replace with real auth context)
        const panelUserId = parseInt(localStorage.getItem("panelUserId") || "0");
        // Find groups with panel assignment
        const assignedSchedules = scheduleData.filter(sch => {
          // You may need to adapt how 'panels' is returned from your backend!
          // For now assume scheduleData[i] has panels: Panel[]
          // @ts-ignore
          return sch.panels?.some((p: any) => p.user?.id === panelUserId);
        });
        setSchedules(assignedSchedules);
        // Get unique group IDs
        const groupIds = assignedSchedules.map(s => s.group);

        // Fetch details for each group
        const groupResp = await fetch("/api/students/group/");
        const groupData = groupResp.ok ? await groupResp.json() : [];
        // If response is array, filter, otherwise wrap in array and filter
        const panelGroups = (Array.isArray(groupData) ? groupData : [groupData]).filter((g: Group) => groupIds.includes(g.id));
        setGroups(panelGroups);
      } catch {
        setGroups([]);
        setSchedules([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAssignments();
  }, []);

  // Handle evaluation form input
  const handleInput = (groupId: number, field: keyof Evaluation, value: any) => {
    setEvaluations((prev) => ({ ...prev, [groupId]: { ...prev[groupId], [field]: value, group: groupId } }));
  };

  // Submit evaluation for a group
  const handleSubmitEvaluation = async (groupId: number) => {
    setSubmitStatus("");
    const data = evaluations[groupId];
    if (!data || !data.score || !data.comment) {
      setSubmitStatus("Please enter score and comment");
      return;
    }
    try {
      // API endpoint to POST evaluation (update as needed)
      const resp = await fetch(`/api/students/group/${groupId}/evaluate/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ score: data.score, comment: data.comment }),
      });
      if (!resp.ok) throw new Error("Submit failed");
      setSubmitStatus("Submitted!");
    } catch {
      setSubmitStatus("Submission failed");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">📝 Evaluate Defense - My Assigned Groups</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : groups.length === 0 ? (
        <div className="alert alert-warning text-center">You do not have any assigned defenses today.</div>
      ) : (
        <div className="row g-4">
          {groups.map((group) => (
            <div key={group.id} className="col-md-6">
              <div className="card shadow border-0">
                <div className="card-body">
                  <h5 className="fw-bold mb-2">{group.name}</h5>
                  <p className="mb-2"><b>Topic:</b> {group.topic}</p>
                  <p className="mb-2"><b>Members:</b> {group.students.map((m) => m.full_name).join(", ")}</p>
                  <form onSubmit={e => {e.preventDefault(); handleSubmitEvaluation(group.id)}}>
                    <div className="mb-2">
                      <label className="form-label">Evaluation Score (1-100)</label>
                      <input
                        type="number"
                        min={1}
                        max={100}
                        className="form-control"
                        value={evaluations[group.id]?.score || ""}
                        onChange={e => handleInput(group.id, "score", e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-2">
                      <label className="form-label">Comments</label>
                      <textarea
                        className="form-control"
                        value={evaluations[group.id]?.comment || ""}
                        onChange={e => handleInput(group.id, "comment", e.target.value)}
                        required
                      />
                    </div>
                    <button className="btn btn-primary w-100" type="submit">Submit Evaluation</button>
                  </form>
                  {submitStatus && (<div className="text-success mt-2">{submitStatus}</div>)}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
