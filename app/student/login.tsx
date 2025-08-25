import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function StudentLogin() {
  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-5 bg-white p-4 rounded shadow-sm border border-2 border-info-subtle">
          <h2 className="text-center mb-4 text-info">Student Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="studentEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="studentEmail" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="studentPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="studentPassword" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-info w-100 text-white">Login</button>
          </form>
          <div className="mt-3 text-end">
            <a className="link-info" href="/student/signup">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
}
