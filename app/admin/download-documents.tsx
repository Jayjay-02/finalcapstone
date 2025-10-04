import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";

export default function DownloadThesis() {
  const [year, setYear] = useState<string>("");

  const handleDownload = () => {
    if (!year) {
      alert("⚠ Please select a year before downloading.");
      return;
    }

    // Example file path (you need to replace with your real backend or storage)
    const fileUrl = `/files/thesis-${year}.zip`;

    const link = document.createElement("a");
    link.href = fileUrl;
    link.setAttribute("download", `thesis-${year}.zip`);
    document.body.appendChild(link);
    link.click();
    link.parentNode?.removeChild(link);

    alert(`📂 Download started for thesis documents of year ${year}`);
  };

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  return (
    <div
      className="container py-5"
      style={{ minHeight: "100vh", background: "#f8f8f8" }}
    >
      <h2 className="fw-bold mb-4 text-center">⬇ Download Thesis Documents</h2>

      <div className="card shadow border-0 rounded-3 p-4 mx-auto" style={{ maxWidth: 500 }}>
        <div className="mb-3">
          <label className="form-label fw-semibold">Select Year</label>
          <select
            className="form-select"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">-- Choose Year --</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        <div className="d-grid">
          <button
            className="btn btn-success fw-semibold"
            onClick={handleDownload}
          >
            ⬇ Download
          </button>
        </div>
      </div>
    </div>
  );
}
