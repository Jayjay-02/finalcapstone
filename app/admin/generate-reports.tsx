import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function AdminGenerateReports() {
  const [reportType, setReportType] = useState("thesis");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [generated, setGenerated] = useState(false);

  const handleGenerate = () => {
    if (!dateFrom || !dateTo) {
      alert("⚠️ Please select both From and To dates.");
      return;
    }
    setGenerated(true);
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{ background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)" }}
    >
      <div className="card shadow-lg border-0 rounded-4 mx-auto" style={{ maxWidth: "1000px" }}>
        <div className="card-body">
          {/* Header */}
          <h1 className="text-center fw-bold mb-4" style={{ color: "#2c2c2c" }}>
            📊 Generate Reports
          </h1>
          <p className="text-center text-muted mb-4">
            Select report type and date range to generate detailed reports.
          </p>

          {/* Report Form */}
          <div className="row g-4 mb-4">
            {/* Report Type */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">Report Type</label>
              <select
                className="form-select"
                value={reportType}
                onChange={(e) => setReportType(e.target.value)}
              >
                <option value="thesis">📑 Thesis Submissions</option>
                <option value="defense">🎤 Defense Schedules</option>
                <option value="groups">👥 Student Groups</option>
                <option value="logs">📝 Activity Logs</option>
              </select>
            </div>

            {/* Date From */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">From</label>
              <input
                type="date"
                className="form-control"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
            </div>

            {/* Date To */}
            <div className="col-md-4">
              <label className="form-label fw-semibold">To</label>
              <input
                type="date"
                className="form-control"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          </div>

          {/* Generate Button */}
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark px-4 fw-semibold rounded-3"
              onClick={handleGenerate}
            >
              📊 Generate Report
            </button>
          </div>

          {/* Generated Report Preview */}
          {generated && (
            <div className="mt-5">
              <h4 className="text-center mb-3" style={{ color: "#2c2c2c" }}>
                ✅ {reportType.charAt(0).toUpperCase() + reportType.slice(1)} Report Generated
              </h4>
              <div className="table-responsive">
                <table className="table table-bordered align-middle shadow-sm">
                  <thead style={{ backgroundColor: "#e6e6e6" }}>
                    <tr>
                      <th>#</th>
                      <th>Details</th>
                      <th>Date</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>Sample Report Data</td>
                      <td>{new Date().toLocaleDateString()}</td>
                      <td>
                        <span className="badge bg-success px-3 py-2">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Export Options */}
              <div className="d-flex justify-content-center gap-3 mt-3">
                <button
                  className="btn btn-outline-dark"
                  style={{ borderColor: "#2c2c2c", color: "#2c2c2c" }}
                >
                  ⬇️ Export as PDF
                </button>
                <button
                  className="btn btn-outline-dark"
                  style={{ borderColor: "#2c2c2c", color: "#2c2c2c" }}
                >
                  ⬇️ Export as Excel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-4 small text-muted">
        &copy; {new Date().getFullYear()} Papertrail · Thesis Management System
      </div>
    </div>
  );
}
