  import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";


  export default function AdviserPanelDashboard() {
    const router = useRouter();
    const [activeMenu, setActiveMenu] = useState("dashboard");
    const [instructor, setInstructor] = useState<{
      name: string;
      email: string;
      department: string;
      password: string;
      profilePic?: string;
    } | null>(null);

    // Calendar state
    const [currentDate, setCurrentDate] = useState(new Date());
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
      const stored = JSON.parse(localStorage.getItem("registeredInstructors") || "[]");
      if (stored.length > 0) setInstructor(stored[stored.length - 1]);

      // Update time every second
      const timer = setInterval(() => setCurrentTime(new Date()), 1000);
      return () => clearInterval(timer);
    }, []);

    // Generate calendar for current month
    const getCalendarDays = () => {
      const year = currentDate.getFullYear();
      const month = currentDate.getMonth();
      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();

      const calendarDays = [];
      for (let i = 0; i < firstDay; i++) calendarDays.push(null);
      for (let d = 1; d <= daysInMonth; d++) calendarDays.push(d);
      return calendarDays;
    };

    const menuItems = [
      { key: "dashboard", label: "Dashboard" },
      { key: "approve", label: "Approve Thesis Title" },
      { key: "documents", label: "Review Documents" },
      { key: "feedback", label: "Provide Feedback" },
      { key: "evaluate", label: "Evaluate Defenses" },
      { key: "advise", label: "Advise Student Groups" },
      { key: "progress", label: "Group Progress" },
    ];

    const renderContent = () => {
      switch (activeMenu) {
        case "approve":
          return (
            <div className="card p-4 shadow-sm rounded-4 border-0">
              <h3 className="fw-bold">✅ Approve Thesis Title</h3>
              <p className="text-muted">Review and approve submitted thesis topics from students.</p>
              <button
                className="btn btn-success"
                onClick={() => router.push("/instructor/ApproveThesisTitle")}
              >
                Go to Approvals
              </button>
            </div>
          );
        case "documents":
          return (
            <div className="card p-4 shadow-sm rounded-4 border-0">
              <h3 className="fw-bold">📄 Review Documents</h3>
              <p className="text-muted">Access and assess thesis drafts and submissions.</p>
              <button
                className="btn btn-secondary"
                onClick={() => router.push("/instructor/review_documents")}
              >
                Go to Review Docs
              </button>
            </div>
          );
        case "feedback":
          return (
            <div className="card p-4 shadow-sm rounded-4 border-0">
              <h3 className="fw-bold">💬 Provide Feedback</h3>
              <p className="text-muted">Give comments and guidance to student groups.</p>
              <button
                className="btn btn-secondary"
                onClick={() => router.push("/instructor/provide-feedback")}
              >
                Go to Feedback
              </button>
            </div>
          );
        case "evaluate":
          return (
            <div className="card p-4 shadow-sm rounded-4 border-0">
              <h3 className="fw-bold">📝 Evaluate Defenses</h3>
              <p className="text-muted">Score and comment on thesis defense performances.</p>
              <button
                className="btn btn-secondary"
                onClick={() => router.push("/instructor/evaulate-defense")}
              >
                Go to Evaluate
              </button>
            </div>
          );
        case "advise":
          return (
            <div className="card p-4 shadow-sm rounded-4 border-0 position-relative">
              <h3 className="fw-bold">👨‍🏫 Advise Student Groups</h3>
              <span className="badge bg-primary position-absolute top-0 end-0 m-2">Adviser only</span>
              <p className="text-muted">Directly mentor and advise one or more groups.</p>
              <button
                className="btn btn-secondary"
                onClick={() => router.push("/instructor/advise-student-group")}
              >
                Go to Advise
              </button>
            </div>
          );
        case "progress":
          return (
            <div className="card p-4 shadow-sm rounded-4 border-0 position-relative">
              <h3 className="fw-bold">📊 Group Progress</h3>
              <span className="badge bg-primary position-absolute top-0 end-0 m-2">Adviser only</span>
              <p className="text-muted">Track the thesis progress and milestones of your groups.</p>
              <button
                className="btn btn-secondary"
                onClick={() => router.push("/instructor/group-progress")}
              >
                Go to Progress
              </button>
            </div>
          );
        default:
          const calendarDays = getCalendarDays();
          const today = new Date().getDate();
          const monthName = currentDate.toLocaleString("default", { month: "long" });

          return (
            <div className="text-center text-muted">
              <h2 className="fw-bold">👨‍🏫 Adviser Dashboard</h2>
              <p>Select an option from the left menu to begin.</p>

              {/* Live Time */}
              <h4 className="fw-semibold mt-3">
                🕒 {currentTime.toLocaleTimeString()}
              </h4>

              {/* Live Calendar */}
              <div className="mt-4 shadow-sm rounded-4 bg-white p-4">
                <h4 className="fw-bold mb-3">📅 {monthName} {currentDate.getFullYear()}</h4>
                <div
                  className="d-grid"
                  style={{
                    gridTemplateColumns: "repeat(7, 1fr)",
                    gap: "5px",
                    fontSize: "1rem",
                  }}
                >
                  {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map((day) => (
                    <div key={day} className="fw-bold text-center">{day}</div>
                  ))}
                  {calendarDays.map((day, idx) =>
                    day ? (
                      <div
                        key={idx}
                        className={`text-center py-2 rounded ${
                          day === today ? "bg-primary text-white fw-bold" : "bg-light"
                        }`}
                      >
                        {day}
                      </div>
                    ) : (
                      <div key={idx}></div>
                    )
                  )}
                </div>
              </div>
            </div>
          );
      }
    };

    return (
      <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
        <div className="row g-0" style={{ minHeight: "100vh" }}>
          {/* Sidebar */}
          <div className="col-12 col-md-3 col-lg-2 bg-dark text-white d-flex flex-column p-4">
            {instructor && (
              <div className="text-center mb-4">
                <img
                  src={instructor.profilePic || "https://via.placeholder.com/100"}
                  alt="Profile"
                  className="rounded-circle mb-2 shadow"
                  width="100"
                  height="100"
                  style={{ objectFit: "cover" }}
                />
                <h5 className="fw-bold">{instructor.name}</h5>
                <p className="text-secondary small mb-1">{instructor.email}</p>
                <p className="text-secondary small">{instructor.department}</p>
                <hr className="border-secondary" />
              </div>
            )}

            <h4 className="mb-3">📌 Menu</h4>
            <ul className="nav flex-column">
              {menuItems.map((item) => (
                <li key={item.key} className="nav-item mb-2">
                  <button
                    className={`btn w-100 text-start ${
                      activeMenu === item.key ? "btn-secondary" : "btn-outline-light"
                    }`}
                    onClick={() => setActiveMenu(item.key)}
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center align-items-start bg-light p-5" style={{ overflowY: "auto" }}>
            <div className="w-100" style={{ maxWidth: "800px" }}>
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
