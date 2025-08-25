import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InstructorSignup() {
  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-5 bg-white p-4 rounded shadow-sm border border-2 border-secondary-subtle">
          <h2 className="text-center mb-4 text-secondary">Instructor Signup</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="signupInstructorEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="signupInstructorEmail" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="signupInstructorPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="signupInstructorPassword" placeholder="Create a password" />
            </div>
            <button type="submit" className="btn btn-secondary w-100">Signup</button>
          </form>
          <div className="mt-3 text-end">
            <a className="link-secondary" href="/instructor/login">Login</a>
          </div>
        </div>
      </div>
    </div>
  );
}
