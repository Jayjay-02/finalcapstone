import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";

export default function PanelLogin() {
  const router = useRouter();
  return (
    <div className="container-fluid px-0" style={{
      minHeight: "100vh",
      background: "linear-gradient(110deg, #f1f9ff 0%, #f9fafe 100%)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="row w-100 justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-8 col-lg-5 col-xl-4 px-0">
          <div className="bg-white shadow rounded-5 border-0 px-4 py-5 text-center position-relative mb-5">
            <div className="mb-2">
              <span style={{fontSize: 48, display: 'inline-block'}} role="img" aria-label="panel">📋</span>
            </div>
            <h2 className="fw-bold text-success mb-2" style={{fontSize: 29}}>Panel Login</h2>
            <form className="mb-2">
              <div className="form-floating mb-3 text-start">
                <input type="email" className="form-control" id="panelEmail" placeholder="Enter your email" />
                <label htmlFor="panelEmail">Email</label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input type="password" className="form-control" id="panelPassword" placeholder="Enter your password" />
                <label htmlFor="panelPassword">Password</label>
              </div>
              <button type="submit" className="btn btn-success btn-lg w-100 rounded-pill fw-semibold shadow-sm my-2" style={{fontSize: 17}}>Login</button>
            </form>
            <div className="text-end">
              <span className="me-1 text-muted">No account?</span>
              <a className="fw-semibold text-success text-decoration-none" href="#" onClick={e => {e.preventDefault(); router.push('/panel/signup')}}>Signup here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
