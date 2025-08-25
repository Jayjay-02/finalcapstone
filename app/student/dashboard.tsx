import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentDashboard() {
  return (
    <div className="container-fluid px-0 bg-light" style={{minHeight: "100vh"}}>
      <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-10 col-lg-7 col-xl-6 py-5">
          <div className="bg-white rounded-4 shadow p-5 mb-4">
            <h1 className="fw-bold text-info mb-4 text-center">
              <span style={{fontSize: 38, marginRight: 10}}>🎓</span> Student Dashboard
            </h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Submit Thesis Topic</h5>
                    <p className="card-text text-muted">Propose your thesis research title for approval.</p>
                    <button className="btn btn-info text-white w-100 disabled">Submit Topic</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Upload Thesis Documents</h5>
                    <p className="card-text text-muted">Upload project drafts, defense scripts, and final papers.</p>
                    <button className="btn btn-info text-white w-100 disabled">Upload</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Collaborate on Documents</h5>
                    <p className="card-text text-muted">Invite group members and work together on your files.</p>
                    <button className="btn btn-info text-white w-100 disabled">Collaborate</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">View Schedules &amp; Notifications</h5>
                    <p className="card-text text-muted">Stay updated on deadlines, defense dates, and news.</p>
                    <button className="btn btn-info text-white w-100 disabled">View Schedule</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Receive Feedback &amp; Evaluations</h5>
                    <p className="card-text text-muted">Access comments and grades from your advisers and panel.</p>
                    <button className="btn btn-info text-white w-100 disabled">View Feedback</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Update Profile</h5>
                    <p className="card-text text-muted">Review and update your personal and group information.</p>
                    <button className="btn btn-info text-white w-100 disabled">Update</button>
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
