import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

// ✅ Import your logo image here
import heroImage from "../../assets/images/logo.jpg";

interface Student {
  email: string;
  password: string;
  section?: string;
  approved?: boolean;
  online?: boolean;
  defenseDate?: string; // ISO string for defense
}

export default function AdminDashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [approvedStudents, setApprovedStudents] = useState<Student[]>([]);
  const [showAllStudents, setShowAllStudents] = useState(false);
  const [showTodaysDefense, setShowTodaysDefense] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Load approved students
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("approvedStudents") || "[]");
    setApprovedStudents(
      stored.map((s: any) => ({
        ...s,
        online: Math.random() > 0.5, // Simulate online status
      }))
    );

    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Filter students with defense today
  const todaysDefenseStudents = approvedStudents.filter((s) => {
    if (!s.defenseDate) return false;
    const defenseDay = new Date(s.defenseDate);
    const today = new Date();
    return (
      defenseDay.getFullYear() === today.getFullYear() &&
      defenseDay.getMonth() === today.getMonth() &&
      defenseDay.getDate() === today.getDate()
    );
  });

  // Delete student
  const deleteStudent = (email: string) => {
    if (confirm("Are you sure you want to delete this student?")) {
      const updated = approvedStudents.filter((s) => s.email !== email);
      setApprovedStudents(updated);
      localStorage.setItem("approvedStudents", JSON.stringify(updated));
    }
  };

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh", background: "#f8f8f8" }}>
      <div className="row g-0 flex-nowrap">

        {/* Sidebar */}
        <div
          className={`d-flex flex-column text-white p-3 ${isOpen ? "col-2" : "col-1"}`}
          style={{
            background: "#000",
            minHeight: "100vh",
            transition: "all 0.3s ease",
            position: "sticky",
            top: 0,
            overflowY: "auto",
          }}
        >
          <button
            className="btn btn-sm btn-light mb-4 rounded-0 fw-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "⬅" : "➡"}
          </button>

          <ul className="nav flex-column">
            {[
              { label: "Approve Students", icon: "✅", route: "/admin/PendingStudents" },
              { label: "Register Instructor", icon: "👨‍🏫", route: "/admin/register-instructor" },
              { label: "Register Panel", icon: "📝", route: "/admin/register-panel" },
              { label: "Assign Advisers", icon: "👨‍🏫", route: "/admin/assign-adviser" },
              { label: "Create Groups", icon: "👥", route: "/admin/create-group" },
              { label: "Schedule Defense", icon: "📅", route: "/admin/schedule-defense" },
              { label: "Manage Thesis", icon: "📚", route: "/admin/manage-thesis" },
              { label: "Archive Thesis", icon: "🗄", route: "/admin/archive-thesis" },
              { label: "Reports", icon: "📊", route: "/admin/generate-reports" },
            ].map((item, idx) => (
              <li className="nav-item mb-2" key={idx}>
                <button
                  className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                  onClick={() => router.push(item.route)}
                >
                  {isOpen ? item.label : item.icon}
                </button>
              </li>
            ))}

            {/* All Students Button */}
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => {
                  setShowAllStudents(!showAllStudents);
                  setShowTodaysDefense(false);
                }}
              >
                {isOpen ? "All Students" : "👨‍🎓"}
              </button>
            </li>

            {/* Today's Defense Button */}
            <li className="nav-item mb-2">
              <button
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => {
                  setShowTodaysDefense(true);
                  setShowAllStudents(false);
                }}
              >
                {isOpen ? "Today's Defense" : "🛡"}
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div
          className={`${isOpen ? "col-10" : "col-11"} p-0`}
          style={{ overflowY: "auto", maxHeight: "100vh" }}
        >
          {/* Topbar */}
          <nav
            className="d-flex justify-content-between align-items-center px-4 py-3 border-bottom sticky-top"
            style={{ background: "#fff", zIndex: 10 }}
          >
            <div className="d-flex align-items-center gap-3">
              <button className="btn btn-link fw-semibold text-dark p-0" onClick={() => router.push("/admin/about")}>
                About
              </button>
              <button className="btn btn-link fw-semibold text-dark p-0" onClick={() => router.push("/admin/contact")}>
                Contact
              </button>
            </div>
            <div className="d-flex align-items-center gap-3">
              <input
                type="search"
                placeholder="Search in site"
                className="form-control form-control-sm rounded-0"
                style={{ maxWidth: 200, border: "1px solid #000" }}
              />
              <div className="text-end">
                <div className="fw-bold">{currentTime.toLocaleTimeString()}</div>
                <div className="text-muted" style={{ fontSize: "0.85rem" }}>{currentTime.toDateString()}</div>
              </div>
            </div>
          </nav>

          {/* Hero Section */}
          <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "40vh", background: "#e5e5e5" }}>
            <div className="text-center">
              {/* ✅ Display logo.jpg */}
              <img 
                src={heroImage} 
                alt="logo" 
                className="mb-4"
                style={{ width: 120, height: 120, borderRadius: "50%", objectFit: "cover" }}
              />
              <h2 className="fw-bold mb-0">PaperTrail: Thesis Management</h2>
              <p className="text-muted">Admin Dashboard</p>
            </div>
          </div>

          <div className="container my-5">
            {/* Cards Section */}
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-5">
              {[
                { title: "Approve Student Accounts", text: "Review and approve new student signups.", link: "/admin/pending-students", btn: "Approve Now" },
                { title: "Assign Advisers & Panels", text: "Allocate advisers and panels to student groups.", link: "/admin/assign-adviser", btn: "Assign Now" },
                { title: "Create Student Groups", text: "Organize students into thesis groups.", link: "/admin/create-group", btn: "Create Group" },
                { title: "Schedule Defenses", text: "Plan defense sessions and notify participants.", link: "/admin/schedule-defense", btn: "Schedule" },
                { title: "Manage Thesis Data & Logs", text: "Oversee thesis records and notifications.", link: "/admin/manage-thesis", btn: "Manage Data" },
                { title: "Archive Thesis", text: "Move completed theses to archive storage.", link: "/admin/archive-thesis", btn: "Archive Now" },
                { title: "Generate Reports", text: "Export PDF, XLS, or summary reports.", link: "/admin/generate-reports", btn: "Generate" },
                { title: "Register Panel", text: "Add new panel members to the system.", link: "/admin/register-panel", btn: "Register" },
              ].map((card, i) => (
                <div className="col" key={i}>
                  <div className="card h-100 border-0 shadow-sm rounded-0">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">{card.title}</h5>
                      <p className="card-text text-muted">{card.text}</p>
                      <button className="btn btn-dark w-100 rounded-0 fw-semibold" onClick={() => router.push(card.link)}>
                        {card.btn}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Approved Students Table */}
            {!showAllStudents && !showTodaysDefense && (
              <div className="mt-5">
                <h4 className="fw-bold mb-3">Approved Students</h4>
                {approvedStudents.length === 0 ? (
                  <div className="alert alert-secondary">No approved students yet.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="bg-light">
                        <tr>
                          <th>Email</th>
                          <th>Password</th>
                          <th>Section</th>
                          <th>Status</th>
                          <th>Active</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {approvedStudents.map((student, index) => (
                          <tr key={index} className={!student.approved ? "table-danger" : ""}>
                            <td>{student.email}</td>
                            <td>{student.password}</td>
                            <td>{student.section || "Unassigned"}</td>
                            <td>{student.approved ? "Approved" : "Needs Approval"}</td>
                            <td>
                              <span
                                className="badge rounded-circle"
                                style={{
                                  display: "inline-block",
                                  width: 12,
                                  height: 12,
                                  backgroundColor: student.online ? "green" : "gray",
                                }}
                              ></span>
                            </td>
                            <td>
                              <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(student.email)}>Delete</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* All Students Section */}
            {showAllStudents && (
              <div className="mt-5">
                <h4 className="fw-bold mb-3">All Students by Section</h4>
                {approvedStudents.length === 0 ? (
                  <div className="alert alert-secondary">No students available.</div>
                ) : (
                  Object.entries(
                    approvedStudents.reduce((groups, student) => {
                      const section = student.section || "Unassigned";
                      if (!groups[section]) groups[section] = [];
                      groups[section].push(student);
                      return groups;
                    }, {} as Record<string, Student[]>)
                  ).map(([section, students], idx) => (
                    <div key={idx} className="mb-3">
                      <button
                        className="btn btn-dark w-100 text-start fw-bold"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse-${section}`}
                        aria-expanded="false"
                        aria-controls={`collapse-${section}`}
                      >
                        Section {section}
                      </button>
                      <div className="collapse mt-2" id={`collapse-${section}`}>
                        <ul className="list-group">
                          {students.map((student, index) => (
                            <li
                              key={index}
                              className={`list-group-item d-flex justify-content-between align-items-center ${!student.approved ? "bg-danger text-white" : ""}`}
                            >
                              {student.email}
                              <div className="d-flex align-items-center gap-2">
                                <span className="badge bg-secondary">Section {section}</span>
                                <span
                                  className="badge rounded-circle"
                                  style={{
                                    display: "inline-block",
                                    width: 12,
                                    height: 12,
                                    backgroundColor: student.online ? "green" : "gray",
                                  }}
                                ></span>
                                <button className="btn btn-sm btn-danger" onClick={() => deleteStudent(student.email)}>Delete</button>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Today's Defense Section */}
            {showTodaysDefense && (
              <div className="mt-5">
                <h4 className="fw-bold mb-3">Today's Defense</h4>
                {todaysDefenseStudents.length === 0 ? (
                  <div className="alert alert-secondary">No defenses scheduled for today.</div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-bordered">
                      <thead className="bg-light">
                        <tr>
                          <th>Email</th>
                          <th>Section</th>
                          <th>Defense Time</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {todaysDefenseStudents.map((student, idx) => (
                          <tr key={idx}>
                            <td>{student.email}</td>
                            <td>{student.section || "Unassigned"}</td>
                            <td>{new Date(student.defenseDate!).toLocaleTimeString()}</td>
                            <td>{student.approved ? "Approved" : "Pending"}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

          </div>
        </div>
      </div>
    </div>
  );
}
