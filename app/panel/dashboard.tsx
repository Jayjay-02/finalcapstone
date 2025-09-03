import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function PanelDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard");

  // Sidebar menu items
  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "documents", label: "Review Documents" },
    { key: "feedback", label: "Provide Feedback" },
    { key: "evaluate", label: "Evaluate Defenses" },
  ];

  // Dynamic content rendering
  const renderContent = () => {
    switch (activeMenu) {
      case "documents":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">📄 Review Documents</h3>
            <p className="text-muted">
              Access and review submitted thesis files from student groups.
            </p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/panel/review-documents")}
            >
              Review
            </button>
          </div>
        );
      case "feedback":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">💬 Provide Feedback</h3>
            <p className="text-muted">
              Comment and provide suggestions on theses for improvements.
            </p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/panel/provide_feedback")}
            >
              Feedback
            </button>
          </div>
        );
      case "evaluate":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">📝 Evaluate Defenses</h3>
            <p className="text-muted">
              Score and evaluate student thesis defense presentations.
            </p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/panel/evaluate-defense")}
            >
              Evaluate
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h2 className="fw-bold text-dark mb-3">📋 Panel Dashboard</h2>
            <p className="text-muted">
              Welcome, Panel Member! <br />
              Here you can review thesis documents, provide feedback, and
              evaluate defenses.
            </p>
            <small className="text-muted d-block mt-5">
              PaperTrail &copy; {new Date().getFullYear()}
            </small>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Sidebar */}
        <div
          className="col-12 col-md-3 col-lg-2 d-flex flex-column p-4 shadow-sm"
          style={{ backgroundColor: "#E0E0E0", color: "black" }}
        >
          <h4 className="fw-bold mb-4">📌 Menu</h4>
          <ul className="nav flex-column gap-2">
            {menuItems.map((item) => (
              <li key={item.key} className="nav-item">
                <button
                  className="btn w-100 text-start rounded-3"
                  style={{
                    backgroundColor: activeMenu === item.key ? "black" : "transparent",
                    color: activeMenu === item.key ? "white" : "black",
                    fontWeight: activeMenu === item.key ? 600 : 400,
                  }}
                  onClick={() => setActiveMenu(item.key)}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center align-items-center bg-white p-5">
          <div className="w-100" style={{ maxWidth: "720px" }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
