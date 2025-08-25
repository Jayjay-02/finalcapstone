import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdminDashboard() {
  return (
    <div className="container-fluid px-0 bg-light" style={{minHeight: "100vh"}}>
      <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-10 col-lg-7 col-xl-6 py-5">
          <div className="bg-white rounded-4 shadow p-5 mb-4">
            <h1 className="fw-bold text-primary mb-4 text-center">
              <span style={{fontSize: 38, marginRight: 10}}>⚙️</span> Admin Dashboard
            </h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Assign Advisers &amp; Panels</h5>
                    <p className="card-text text-muted">Easily allocate advisers and panels to student groups.</p>
                    <button className="btn btn-primary w-100 disabled">Assign Now</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Create Student Groups</h5>
                    <p className="card-text text-muted">Organize students into groups for thesis collaboration.</p>
                    <button className="btn btn-primary w-100 disabled">Create Group</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Schedule Defenses</h5>
                    <p className="card-text text-muted">Set up defense session dates and notify all concerned parties.</p>
                    <button className="btn btn-primary w-100 disabled">Schedule</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Manage Thesis Data &amp; Logs</h5>
                    <p className="card-text text-muted">Oversee all thesis records, send logs and notifications.</p>
                    <button className="btn btn-primary w-100 disabled">Manage Data</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Generate Reports</h5>
                    <p className="card-text text-muted">Export PDF, XLS, or on-screen summary reports.</p>
                    <button className="btn btn-primary w-100 disabled">Generate</button>
                  </div>
                </div>
              </div>
            </div>{/* row-cols */}
          </div>
        </div>
      </div>
    </div>
  );
}
