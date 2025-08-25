import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PanelDashboard() {
  return (
    <div className="container-fluid px-0 bg-light" style={{minHeight: "100vh"}}>
      <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-10 col-lg-7 col-xl-6 py-5">
          <div className="bg-white rounded-4 shadow p-5 mb-4">
            <h1 className="fw-bold text-success mb-4 text-center">
              <span style={{fontSize: 38, marginRight: 10}}>📋</span> Panel Dashboard
            </h1>
            <div className="fs-5 text-center text-secondary mb-4">
              Welcome, Panel Member!<br />
              Here you can review thesis documents, provide feedback, and evaluate defenses.
            </div>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Review Documents</h5>
                    <p className="card-text text-muted">Access and review submitted thesis files from student groups.</p>
                    <button className="btn btn-success w-100 disabled">Review</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Provide Feedback</h5>
                    <p className="card-text text-muted">Comment and provide suggestions on theses for improvements.</p>
                    <button className="btn btn-success w-100 disabled">Feedback</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Evaluate Defenses</h5>
                    <p className="card-text text-muted">Score and evaluate student thesis defense presentations.</p>
                    <button className="btn btn-success w-100 disabled">Evaluate</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-4 small text-center text-muted">Papertrail &copy; {new Date().getFullYear()}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
