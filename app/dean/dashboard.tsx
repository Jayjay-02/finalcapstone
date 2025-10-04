import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FaBell, FaHome, FaSearch, FaUser } from "react-icons/fa";

interface Thesis {
  title: string;
  abstract: string;
}

export default function DeanDashboard() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedThesis, setSelectedThesis] = useState<Thesis | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  // ✅ Sample Thesis Data (replace with DB later)
  const thesisList: Thesis[] = [
    {
      title: "Smart Waste Management System",
      abstract:
        "This project focuses on creating an IoT-enabled waste monitoring system to optimize garbage collection routes.",
    },
    {
      title: "E-Learning Mobile App",
      abstract:
        "The study presents a mobile-based e-learning platform designed for flexible and accessible education delivery.",
    },
    {
      title: "Blockchain Voting System",
      abstract:
        "A secure and transparent voting system using blockchain technology to prevent fraud and ensure integrity.",
    },
  ];

  // ✅ Dashboard Pages
  const pages = [
    { title: "Manage Thesis", subtitle: "Thesis Management", bg: "#198754", link: "/dean/manage-thesis" },
    { title: "Register Instructor", subtitle: "Add Faculty Account", bg: "#0d6efd", link: "/admin/register-instructor" },
    { title: "Register Panel", subtitle: "Panel Registration", bg: "#6f42c1", link: "/admin/register-panel" },
    { title: "Register Student", subtitle: "Student Registration", bg: "#20c997", link: "/admin/register-student" },
    { title: "Assign Adviser", subtitle: "Adviser Assignment", bg: "#fd7e14", link: "/admin/assign-adviser" },
    { title: "Assign Panel", subtitle: "Panel Assignment", bg: "#ffc107", link: "/admin/assign-panel" },
    { title: "Pending Students", subtitle: "Awaiting Approval", bg: "#dc3545", link: "/admin/PendingStudents" },
    { title: "Approved Students", subtitle: "Verified Accounts", bg: "#198754", link: "/admin/ApprovedStudents" },
    { title: "Rejected Students", subtitle: "Declined Applications", bg: "#6c757d", link: "/admin/RejectedStudents" },
    { title: "View Reports", subtitle: "Generate Analytics", bg: "#0dcaf0", link:"/dean/view-report" },
    { title: "Manage Defense Schedule", subtitle: "Defense Calendar", bg: "#fd7e14", link: "/admin/DefenseSchedule" },
    { title: "Thesis Archive", subtitle: "Stored Researches", bg: "#20c997", link: "/admin/ThesisArchive" },
    { title: "Faculty List", subtitle: "View Faculty Members", bg: "#dc3545", link: "/admin/FacultyList" },
    { title: "Student List", subtitle: "All Registered Students", bg: "#198754", link: "/admin/StudentList" },
  ];

  // ✅ Filter thesis based on search term
  const filteredThesis = thesisList.filter((t) =>
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ overflowY: "auto", maxHeight: "100vh" }}>
      {/* ================= Top Navbar ================= */}
      <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Left: Logo */}
        <div className="d-flex align-items-center">
          <img
            src="../../assets/images/logo.jpg"
            alt="PaperTrail Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <div>
            <h4 className="fw-bold mb-0 text-primary">PAPERTRAIL</h4>
            <small className="text-muted">Document Tracking System</small>
          </div>
        </div>

        {/* Right: Icons */}
        <div className="d-flex align-items-center gap-3">
          {/* 🔍 Search Icon */}
          <FaSearch
            size={20}
            className="text-primary"
            style={{ cursor: "pointer" }}
            onClick={() => setShowSearch(!showSearch)}
          />

          {/* 🔔 Notifications */}
          <div className="position-relative">
            <FaBell
              size={20}
              className="text-secondary"
              style={{ cursor: "pointer" }}
              onClick={() => setShowNotifications(!showNotifications)}
            />
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "10px" }}
            >
              1
            </span>

            {showNotifications && (
              <div
                className="position-absolute bg-white shadow p-2"
                style={{ top: "30px", right: 0, width: "200px", zIndex: 10 }}
              >
                <p className="mb-1 fw-bold">Notifications</p>
                <small>No new updates.</small>
              </div>
            )}
          </div>

          {/* 👤 User */}
          <div className="d-flex align-items-center">
            <div
              className="rounded-circle bg-secondary d-flex align-items-center justify-content-center"
              style={{ width: "40px", height: "40px" }}
            >
              <FaUser size={20} className="text-white" />
            </div>
            <span className="ms-2 fw-semibold text-warning">dean</span>
          </div>
        </div>
      </div>

      {/* ================= Search Thesis Projects ================= */}
      {showSearch && (
        <div className="container my-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search thesis projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {searchTerm && (
            <div className="list-group mt-2 shadow">
              {filteredThesis.length > 0 ? (
                filteredThesis.map((t, i) => (
                  <button
                    key={i}
                    className="list-group-item list-group-item-action"
                    onClick={() => setSelectedThesis(t)}
                  >
                    {t.title}
                  </button>
                ))
              ) : (
                <p className="text-muted p-2">No thesis found.</p>
              )}
            </div>
          )}
        </div>
      )}

      {/* ================= Thesis Abstract Modal ================= */}
      {selectedThesis && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{selectedThesis.title}</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setSelectedThesis(null)}
                ></button>
              </div>
              <div className="modal-body">
                <p>{selectedThesis.abstract}</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setSelectedThesis(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ================= Navigation Menu ================= */}
      <div className="bg-primary text-white">
        <div className="container d-flex align-items-center gap-4 py-2">
          <a><FaHome className="me-1" /> Dashboard</a>
          
          
        </div>
      </div>

      {/* ================= Dashboard Cards ================= */}
      <div className="container py-5">
        <div className="text-center mb-5">
          <h1 className="fw-bold text-primary">PaperTrail Dashboard</h1>
          <p className="text-muted">
            Manage thesis processes and student records efficiently
          </p>
        </div>

        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {pages.map((card, i) => (
            <div className="col" key={i}>
              <div
                className="card h-100 shadow-sm border-0"
                style={{
                  borderRadius: "12px",
                  overflow: "hidden",
                  cursor: "pointer",
                  transition: "transform 0.2s ease, box-shadow 0.2s ease",
                }}
                onClick={() => router.push(card.link)}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                {/* Banner Texture */}
                <div
                  style={{
                    height: "120px",
                    background: card.bg,
                    backgroundImage:
                      "linear-gradient(135deg, rgba(255,255,255,0.2) 25%, transparent 25%), " +
                      "linear-gradient(225deg, rgba(255,255,255,0.2) 25%, transparent 25%), " +
                      "linear-gradient(45deg, rgba(255,255,255,0.2) 25%, transparent 25%), " +
                      "linear-gradient(315deg, rgba(255,255,255,0.2) 25%, transparent 25%)",
                    backgroundSize: "40px 40px",
                    backgroundPosition: "0 0, 0 20px, 20px -20px, -20px 0px",
                  }}
                ></div>

                <div className="card-body text-center">
                  <h5 className="card-title fw-bold">{card.title}</h5>
                  <p className="card-text text-muted">{card.subtitle}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= Footer ================= */}
      <footer className="text-center text-muted py-3 small">
        © {new Date().getFullYear()} PaperTrail | All Rights Reserved
      </footer>
    </div>
  );
}
