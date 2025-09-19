import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Group {
  id: number;
  name: string;
  students: { full_name: string }[];
}

interface Document {
  id: number;
  title: string;
  group: number;
  student: { full_name: string };
  file: string;
  status: string;
}

interface Panel {
  id: number;
  full_name: string;
  user: { id: number };
}

export default function ReviewDocumentsPanel() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [reviewText, setReviewText] = useState<{ [docId: number]: string }>({});
  const [loading, setLoading] = useState(true);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  // Fetch only groups assigned to this panel and their documents
  useEffect(() => {
    const fetchDocsAndGroups = async () => {
      setLoading(true);
      try {
        // Find panel user info (replace with your real auth logic)
        const panelUserId = parseInt(localStorage.getItem("panelUserId") || "0");
        // Fetch all defense schedules (includes assigned panels)
        const schedulesResp = await fetch("/api/students/defense-schedule/");
        if (!schedulesResp.ok) throw new Error("No schedules");
        const schedules = await schedulesResp.json();
        // Filter groups this panel is assigned to
        // Assume schedules[i] has panels: Panel[] and group (id)
        const myGroupIds = schedules.filter((sched: any) =>
          sched.panels?.some((p: Panel) => p.user?.id === panelUserId)
        ).map((sched: any) => sched.group);
        // Fetch all group details and documents for these groups
        const groupResp = await fetch("/api/students/group/");
        const groupData = groupResp.ok ? await groupResp.json() : [];
        const filteredGroups = (Array.isArray(groupData) ? groupData : [groupData]).filter(
          (g: Group) => myGroupIds.includes(g.id)
        );
        setGroups(filteredGroups);
        // Fetch documents for these groups
        const docResp = await fetch(`/api/students/document/`);
        const docData: Document[] = docResp.ok ? await docResp.json() : [];
        const filteredDocs = docData.filter(doc => myGroupIds.includes(doc.group));
        setDocuments(filteredDocs);
      } catch {
        setGroups([]);
        setDocuments([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDocsAndGroups();
  }, []);

  // Review document (panelist feedback)
  const submitReview = async (docId: number) => {
    setSubmitStatus("");
    if (!reviewText[docId]) {
      setSubmitStatus("Please add feedback");
      return;
    }
    try {
      const resp = await fetch(`/api/students/document/${docId}/feedback/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: reviewText[docId] }),
      });
      if (!resp.ok) throw new Error();
      setSubmitStatus("Feedback submitted!");
      setReviewText((prev) => ({ ...prev, [docId]: "" }));
    } catch {
      setSubmitStatus("Failed to submit feedback");
    }
  };

  const getGroup = (groupId: number) => groups.find((g) => g.id === groupId);

  return (
    <div className="container py-5">
      <h2 className="fw-bold mb-4 text-center">📄 Review Documents - My Assigned Groups</h2>
      {loading ? (
        <div className="text-center py-5"><div className="spinner-border text-primary" role="status"></div></div>
      ) : documents.length === 0 ? (
        <div className="alert alert-warning text-center">No documents to review for your assigned groups.</div>
      ) : (
        <div className="row g-4">
          {documents.map((doc) => {
            const group = getGroup(doc.group);
            return (
              <div key={doc.id} className="col-md-6">
                <div className="card shadow border-0">
                  <div className="card-body">
                    <h5 className="fw-bold mb-2">{doc.title}</h5>
                    <p className="mb-1"><b>Submitted by:</b> {doc.student.full_name}</p>
                    <p className="mb-1"><b>Group:</b> {group?.name || 'N/A'}</p>
                    <a href={doc.file} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                    <form className="mt-3" onSubmit={e => {e.preventDefault(); submitReview(doc.id)}}>
                      <div className="mb-2">
                        <label className="form-label">Panel Feedback</label>
                        <textarea
                          className="form-control"
                          value={reviewText[doc.id] || ""}
                          onChange={(e) => setReviewText((prev) => ({ ...prev, [doc.id]: e.target.value }))}
                          required
                        />
                      </div>
                      <button className="btn btn-primary w-100" type="submit">Submit Feedback</button>
                    </form>
                    {submitStatus && (<div className="text-success mt-2">{submitStatus}</div>)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
