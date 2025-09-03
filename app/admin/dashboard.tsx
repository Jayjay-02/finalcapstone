import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function AdminDashboard() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true); // toggle sidebar
  const [approvedStudents, setApprovedStudents] = useState<{ email: string; password: string }[]>([]);

  // Load approved students on page load
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("approvedStudents") || "[]");
    setApprovedStudents(stored);
  }, []);

  return (
    <div 
      className="container-fluid px-0"
      style={{ minHeight: "100vh", overflowY: "auto", background: "#f8f8f8" }}
    >
      <div className="row g-0 flex-nowrap">
        {/* Sidebar */}
        <div
          className={`d-flex flex-column text-white p-3 ${isOpen ? "col-2" : "col-1"}`}
          style={{ 
            background: "#000", 
            minHeight: "100vh", 
            transition: "all 0.3s ease", 
            position: "sticky", 
            top: 0 
          }}
        >
          <button
            className="btn btn-sm btn-light mb-4 rounded-0 fw-bold"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? "⬅" : "➡"}
          </button>

          <ul className="nav flex-column">
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/PendingStudents')}
              >
                {isOpen ? "Approve Students" : "✅"}
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/assign-adviser')}
              >
                {isOpen ? "Assign Advisers" : "👨‍🏫"}
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/create-group')}
              >
                {isOpen ? "Create Groups" : "👥"}
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/schedule-defense')}
              >
                {isOpen ? "Schedule Defense" : "📅"}
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/manage-thesis')}
              >
                {isOpen ? "Manage Thesis" : "📚"}
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/archive-thesis')}
              >
                {isOpen ? "Archive Thesis" : "🗄"}
              </button>
            </li>
            <li className="nav-item mb-2">
              <button 
                className="btn btn-dark w-100 text-start rounded-0 border-0 fw-semibold"
                onClick={() => router.push('/admin/generate-reports')}
              >
                {isOpen ? "Reports" : "📊"}
              </button>
            </li>
          </ul>
        </div>

        {/* Main Content */}
        <div className={`${isOpen ? "col-10" : "col-11"} p-0`} style={{ overflowX: "hidden" }}>
          
          {/* Top Bar */}
          <nav 
            className="d-flex justify-content-end align-items-center px-4 py-3 border-bottom sticky-top"
            style={{ background: "#fff" }}
          >
            <button className="btn btn-link fw-semibold text-dark me-3 p-0" onClick={() => router.push('/admin/about')}>About</button>
            <button className="btn btn-link fw-semibold text-dark me-3 p-0" onClick={() => router.push('/admin/contact')}>Contact</button>
            <input
              type="search"
              placeholder="Search in site"
              className="form-control form-control-sm rounded-0"
              style={{ maxWidth: 200, border: "1px solid #000" }}
            />
          </nav>

          {/* Hero Section */}
          <div 
            className="d-flex align-items-center justify-content-center" 
            style={{ minHeight: "40vh", background: "#e5e5e5" }}
          >
            <div className="text-center">
              <div 
                className="d-inline-block mb-4" 
                style={{ width: 120, height: 120, background: "#ccc" }}
              ></div>
              <h2 className="fw-bold mb-0">PaperTrail: Thesis Management</h2>
              <p className="text-muted">Admin Dashboard</p>
            </div>
          </div>

          {/* Cards Section */}
          <div className="container my-5">
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
              {[
                { title: "Approve Student Accounts", text: "Review and approve new student signups.", link: "/admin/pending-students", btn: "Approve Now" },
                { title: "Assign Advisers & Panels", text: "Allocate advisers and panels to student groups.", link: "/admin/assign-adviser", btn: "Assign Now" },
                { title: "Create Student Groups", text: "Organize students into thesis groups.", link: "/admin/create-group", btn: "Create Group" },
                { title: "Schedule Defenses", text: "Plan defense sessions and notify participants.", link: "/admin/schedule-defense", btn: "Schedule" },
                { title: "Manage Thesis Data & Logs", text: "Oversee thesis records and notifications.", link: "/admin/manage-thesis", btn: "Manage Data" },
                { title: "Archive Thesis", text: "Move completed theses to archive storage.", link: "/admin/archive-thesis", btn: "Archive Now" },
                { title: "Generate Reports", text: "Export PDF, XLS, or summary reports.", link: "/admin/generate-reports", btn: "Generate" }
              ].map((card, i) => (
                <div className="col" key={i}>
                  <div className="card h-100 border-0 shadow-sm rounded-0">
                    <div className="card-body text-center">
                      <h5 className="card-title fw-bold">{card.title}</h5>
                      <p className="card-text text-muted">{card.text}</p>
                      <button 
                        className="btn btn-dark w-100 rounded-0 fw-semibold" 
                        onClick={() => router.push(card.link)}
                      >
                        {card.btn}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Approved Students Section */}
            <div className="mt-5">
              <h4 className="fw-bold mb-3">Approved Students</h4>
              {approvedStudents.length === 0 ? (
                <div className="alert alert-secondary">No approved students yet.</div>
              ) : (
                <table className="table table-bordered">
                  <thead style={{ backgroundColor: "#f8f9fa" }}>
                    <tr>
                      <th>Email</th>
                      <th>Password</th>
                    </tr>
                  </thead>
                  <tbody>
                    {approvedStudents.map((student, index) => (
                      <tr key={index}>
                        <td>{student.email}</td>
                        <td>{student.password}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
