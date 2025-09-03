import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function AdviserPanelDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard"); // default selected menu

  // Menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "approve", label: "Approve Thesis Title" },   // <-- Added here
    { key: "documents", label: "Review Documents" },
    { key: "feedback", label: "Provide Feedback" },
    { key: "evaluate", label: "Evaluate Defenses" },
    { key: "advise", label: "Advise Student Groups" },
    { key: "progress", label: "Group Progress" },
  ];

  // Content for each menu
  const renderContent = () => {
    switch (activeMenu) {
      case "approve":
        return (
          <div className="card p-4 shadow-sm">
            <h3>✅ Approve Thesis Title</h3>
            <p className="text-muted">Review and approve submitted thesis topics from students.</p>
            <button 
              className="btn btn-success" 
              onClick={() => router.push('/instructor/ApproveThesisTitle')}
            >
              Go to Approvals
            </button>
          </div>
        );
      case "documents":
        return (
          <div className="card p-4 shadow-sm">
            <h3>📄 Review Documents</h3>
            <p className="text-muted">Access and assess thesis drafts and submissions.</p>
            <button className="btn btn-secondary" onClick={() => router.push('/instructor/review_documents')}>
              Go to Review Docs
            </button>
          </div>
        );
      case "feedback":
        return (
          <div className="card p-4 shadow-sm">
            <h3>💬 Provide Feedback</h3>
            <p className="text-muted">Give comments and guidance to student groups.</p>
            <button className="btn btn-secondary" onClick={() => router.push('/instructor/provide-feedback')}>
              Go to Feedback
            </button>
          </div>
        );
      case "evaluate":
        return (
          <div className="card p-4 shadow-sm">
            <h3>📝 Evaluate Defenses</h3>
            <p className="text-muted">Score and comment on thesis defense performances.</p>
            <button className="btn btn-secondary" onClick={() => router.push('/instructor/evaulate-defense')}>
              Go to Evaluate
            </button>
          </div>
        );
      case "advise":
        return (
          <div className="card p-4 shadow-sm position-relative">
            <h3>👨‍🏫 Advise Student Groups</h3>
            <span className="badge bg-primary position-absolute top-0 end-0 m-2">Adviser only</span>
            <p className="text-muted">Directly mentor and advise one or more groups.</p>
            <button className="btn btn-secondary" onClick={() => router.push('/instructor/advise-student-group')}>
              Go to Advise
            </button>
          </div>
        );
      case "progress":
        return (
          <div className="card p-4 shadow-sm position-relative">
            <h3>📊 Group Progress</h3>
            <span className="badge bg-primary position-absolute top-0 end-0 m-2">Adviser only</span>
            <p className="text-muted">Track the thesis progress and milestones of your groups.</p>
            <button className="btn btn-secondary" onClick={() => router.push('/instructor/group-progress')}>
              Go to Progress
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center text-muted">
            <h2 className="fw-bold">👨‍🏫 Adviser Dashboard</h2>
            <p>Select an option from the left menu to begin.</p>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Sidebar Menu */}
        <div className="col-12 col-md-3 col-lg-2 bg-dark text-white d-flex flex-column p-4">
          <h4 className="mb-4">📌 Menu</h4>
          <ul className="nav flex-column">
            {menuItems.map((item) => (
              <li key={item.key} className="nav-item mb-2">
                <button
                  className={`btn w-100 text-start ${activeMenu === item.key ? "btn-secondary" : "btn-outline-light"}`}
                  onClick={() => setActiveMenu(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Content Area */}
        <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center align-items-center bg-light p-5">
          <div className="w-100" style={{ maxWidth: "700px" }}>
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
}
