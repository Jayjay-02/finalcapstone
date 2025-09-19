import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

interface Panel {
  email: string;
  password?: string;
  image?: string;
  name?: string;
  groupId?: number;
}

interface ScheduleItem {
  date: string;
  event: string;
}

interface NotificationItem {
  message: string;
  time: string;
}

export default function PanelDashboard() {
  const router = useRouter();
  const [activeMenu, setActiveMenu] = useState("dashboard");
  const [panel, setPanel] = useState<Panel | null>(null);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  const menuItems = [
    { key: "dashboard", label: "Dashboard" },
    { key: "documents", label: "Review Documents" },
    { key: "feedback", label: "Provide Feedback" },
    { key: "evaluate", label: "Evaluate Defenses" },
    { key: "schedule_notifications", label: "Schedule & Notifications" },
    { key: "logout", label: "Logout" },
  ];

  useEffect(() => {
    const loggedInPanelEmail = localStorage.getItem("loggedInPanel");
    if (!loggedInPanelEmail) return;

    const registeredPanels: Panel[] = JSON.parse(localStorage.getItem("panels") || "[]");
    const currentPanel = registeredPanels.find(p => p.email === loggedInPanelEmail) || null;
    setPanel(currentPanel);

    if (currentPanel) {
      const allSchedules: Record<string, ScheduleItem[]> = JSON.parse(localStorage.getItem("panelSchedules") || "{}");
      const allNotifications: Record<string, NotificationItem[]> = JSON.parse(localStorage.getItem("panelNotifications") || "{}");
      setSchedule(allSchedules[currentPanel.email] || []);
      setNotifications(allNotifications[currentPanel.email] || []);
    }

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInPanel");
    router.push("/panel/login");
  };

  const renderCalendar = () => {
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    const weeks: JSX.Element[][] = [];
    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week: JSX.Element[] = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > daysInMonth) {
          week.push(<td key={j}></td>);
        } else {
          const isToday = day === today.getDate();
          week.push(
            <td
              key={j}
              className={`text-center fw-bold ${isToday ? "bg-primary text-white rounded-circle" : ""}`}
              style={{ width: 40, height: 40 }}
            >
              {day}
            </td>
          );
          day++;
        }
      }
      weeks.push(week);
    }

    return (
      <table className="table table-bordered text-center mt-3" style={{ tableLayout: "fixed" }}>
        <thead className="bg-dark text-white">
          <tr>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, idx) => (
            <tr key={idx}>{week}</tr>
          ))}
        </tbody>
      </table>
    );
  };

  const renderContent = () => {
    switch (activeMenu) {
      case "documents":
        return (
          <div className="card p-4 shadow-sm border-0 bg-light">
            <h3 className="fw-bold mb-3">📄 Review Documents</h3>
            <p className="text-muted">Access and review submitted thesis files from student groups.</p>
            <button className="btn btn-dark rounded-pill" onClick={() => router.push("/panel/review-documents")}>
              Review
            </button>
          </div>
        );
      case "feedback":
        return (
          <div className="card p-4 shadow-sm border-0 bg-light">
            <h3 className="fw-bold mb-3">💬 Provide Feedback</h3>
            <p className="text-muted">Comment and provide suggestions on theses for improvements.</p>
            <button className="btn btn-dark rounded-pill" onClick={() => router.push("/panel/provide_feedback")}>
              Feedback
            </button>
          </div>
        );
      case "evaluate":
        return (
          <div className="card p-4 shadow-sm border-0 bg-light">
            <h3 className="fw-bold mb-3">📝 Evaluate Defenses</h3>
            <p className="text-muted">Score and evaluate student thesis defense presentations.</p>
            <button className="btn btn-dark rounded-pill" onClick={() => router.push("/panel/evaluate-defense")}>
              Evaluate
            </button>
          </div>
        );
      case "schedule_notifications":
        return (
          <div className="card p-4 shadow-sm border-0 bg-light">
            <h3 className="fw-bold mb-3">📅 Schedule & 🔔 Notifications</h3>
            <h5>Upcoming Schedule</h5>
            {schedule.length === 0 ? (
              <p className="text-muted">No scheduled events.</p>
            ) : (
              <ul className="list-group mb-4">
                {schedule.map((item, index) => (
                  <li key={index} className="list-group-item">
                    <strong>{item.date}:</strong> {item.event}
                  </li>
                ))}
              </ul>
            )}
            <h5>Notifications</h5>
            {notifications.length === 0 ? (
              <p className="text-muted">No notifications yet.</p>
            ) : (
              <ul className="list-group">
                {notifications.map((note, index) => (
                  <li key={index} className="list-group-item">
                    {note.message} <span className="text-muted small">({note.time})</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return (
          <div className="text-center">
            {/* Live Clock */}
            <div className="mb-4 p-4 shadow-sm border rounded bg-light">
              <h1 className="fw-bold mb-2">{currentTime.toLocaleTimeString()}</h1>
              <h4 className="text-muted">{currentTime.toDateString()}</h4>
              {/* Big Calendar */}
              {renderCalendar()}
            </div>

            <h2 className="fw-bold mb-3">📋 Panel Dashboard</h2>
            <p className="text-muted">
              Welcome, Panel Member! Here you can review thesis documents, provide feedback,
              evaluate defenses, and check your schedule & notifications.
            </p>
            <small className="text-muted d-block mt-5">PaperTrail &copy; {new Date().getFullYear()}</small>
          </div>
        );
    }
  };

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 d-flex flex-column align-items-center p-4 shadow-sm" style={{ backgroundColor: "#E0E0E0", color: "black" }}>
          {panel && (
            <div className="text-center mb-4">
              {panel.image ? (
                <img src={panel.image} alt="Profile" className="rounded-circle" style={{ width: 120, height: 120, objectFit: "cover" }} />
              ) : (
                <div className="rounded-circle bg-secondary d-inline-block" style={{ width: 120, height: 120 }} />
              )}
              <h5 className="fw-bold mt-2">{panel.name || panel.email}</h5>
              <p className="text-muted mb-0">Panel Member</p>
            </div>
          )}

          <ul className="nav flex-column gap-2 w-100">
            {menuItems.map((item) => (
              <li key={item.key} className="nav-item">
                <button
                  className="btn w-100 text-start rounded-3"
                  style={{
                    backgroundColor: activeMenu === item.key ? "black" : "transparent",
                    color: activeMenu === item.key ? "white" : "black",
                    fontWeight: activeMenu === item.key ? 600 : 400,
                  }}
                  onClick={() => {
                    if (item.key === "logout") handleLogout();
                    else setActiveMenu(item.key);
                  }}
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 d-flex justify-content-center align-items-start bg-white p-5" style={{ overflowY: "auto" }}>
          <div className="w-100" style={{ maxWidth: "720px" }}>
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
