import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function PanelSignup() {
  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-5 bg-white p-4 rounded shadow-sm border border-2 border-success-subtle">
          <h2 className="text-center mb-4 text-success">Panel Signup</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="signupPanelEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="signupPanelEmail" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="signupPanelPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="signupPanelPassword" placeholder="Create a password" />
            </div>
            <button type="submit" className="btn btn-success w-100">Signup</button>
          </form>
          <div className="mt-3 text-end">
            <a className="link-success" href="/panel/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
