import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function StudentDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [student, setStudent] = useState({
    name: "Student Unknown",
    profilePic: "https://via.placeholder.com/120",
  });

  useEffect(() => {
    // Get logged-in student data from localStorage
    const studentData = JSON.parse(localStorage.getItem("loggedInStudent") || "null");
    if (studentData) {
      setStudent({
        name: studentData.email, // or studentData.name if you save a name during signup
        profilePic: "https://via.placeholder.com/120", // replace if you later support profile uploads
      });
    }
  }, []);

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "submit", label: "Submit Thesis Topic" },
    { key: "upload", label: "Upload Documents" },
    { key: "collaborate", label: "Collaborate" },
    { key: "schedules", label: "Schedules & Notifications" },
    { key: "feedback", label: "Feedback & Evaluations" },
    { key: "profile", label: "Update Profile" },
  ];

  const renderContent = () => {
    switch (activeMenu) {
      case "submit":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">📑 Submit Thesis Topic</h3>
            <p className="text-muted">Propose your thesis research title for approval.</p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/student/submit-topic")}
            >
              Submit Topic
            </button>
          </div>
        );
      case "upload":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">📤 Upload Thesis Documents</h3>
            <p className="text-muted">Upload project drafts, defense scripts, and final papers.</p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/student/upload-documents")}
            >
              Upload
            </button>
          </div>
        );
      case "collaborate":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">🤝 Collaborate on Documents</h3>
            <p className="text-muted">Invite group members and work together on your files.</p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/student/collaborate")}
            >
              Collaborate
            </button>
          </div>
        );
      case "schedules":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">📅 View Schedules & Notifications</h3>
            <p className="text-muted">Stay updated on deadlines, defense dates, and news.</p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/student/schedules")}
            >
              View Schedule
            </button>
          </div>
        );
      case "feedback":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">📝 Receive Feedback & Evaluations</h3>
            <p className="text-muted">Access comments and grades from your advisers and panel.</p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/student/feedback")}
            >
              View Feedback
            </button>
          </div>
        );
      case "profile":
        return (
          <div className="card p-4 shadow-sm border-0" style={{ backgroundColor: "#E0E0E0" }}>
            <h3 className="fw-bold text-dark mb-2">👤 Update Profile</h3>
            <p className="text-muted">Review and update your personal and group information.</p>
            <button
              className="btn px-4 rounded-pill"
              style={{ backgroundColor: "black", color: "white" }}
              onClick={() => router.push("/student/profile")}
            >
              Update
            </button>
          </div>
        );
      default:
        return (
          <div className="text-center">
            <h2 className="fw-bold text-dark mb-3">🎓 Student Dashboard</h2>
            <p className="text-muted">Select an option from the menu to begin.</p>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 d-flex flex-column p-4 shadow-sm" style={{ backgroundColor: "#E0E0E0", color: "black" }}>
          <div className="text-center mb-4">
            <img
              src={student.profilePic}
              alt="Profile"
              className="rounded-circle border border-dark mb-2"
              style={{ width: "100px", height: "100px", objectFit: "cover" }}
            />
            <h5>{student.name}</h5>
          </div>

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

        {/* Content */}
        <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center align-items-center bg-white p-5">
          <div className="w-100" style={{ maxWidth: "720px" }}>
            {renderContent()}
          </div>
        </div>

      </div>
    </div>
  );
}
