import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function AdviserPanelDashboard() {
  return (
    <div className="container-fluid px-0 bg-light" style={{minHeight: "100vh"}}>
      <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-10 col-lg-7 col-xl-6 py-5">
          <div className="bg-white rounded-4 shadow p-5 mb-4">
            <h1 className="fw-bold text-secondary mb-4 text-center">
              <span style={{fontSize: 38, marginRight: 10}}>👨‍🏫</span> Adviser &amp; Panel Dashboard
            </h1>
            <div className="row row-cols-1 row-cols-md-2 g-4">
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Review Documents</h5>
                    <p className="card-text text-muted">Access and assess thesis drafts and submissions.</p>
                    <button className="btn btn-secondary w-100 disabled">Review Docs</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Provide Feedback</h5>
                    <p className="card-text text-muted">Give comments and guidance to student groups.</p>
                    <button className="btn btn-secondary w-100 disabled">Feedback</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm">
                  <div className="card-body text-center">
                    <h5 className="card-title">Evaluate Defenses</h5>
                    <p className="card-text text-muted">Score and comment on thesis defense performances.</p>
                    <button className="btn btn-secondary w-100 disabled">Evaluate</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm position-relative">
                  <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary fw-normal" style={{fontSize:11, zIndex:2, marginTop: 8, right:10}}>Adviser only</div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Advise Student Groups</h5>
                    <p className="card-text text-muted">Directly mentor and advise one or more groups.</p>
                    <button className="btn btn-secondary w-100 disabled">Advise</button>
                  </div>
                </div>
              </div>
              <div className="col">
                <div className="card h-100 border-0 shadow-sm position-relative">
                  <div className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-primary fw-normal" style={{fontSize:11, zIndex:2, marginTop: 8, right:10}}>Adviser only</div>
                  <div className="card-body text-center">
                    <h5 className="card-title">Access Group Progress</h5>
                    <p className="card-text text-muted">Track the thesis progress and milestones of your groups.</p>
                    <button className="btn btn-secondary w-100 disabled">Progress</button>
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
