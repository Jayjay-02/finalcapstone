import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function InstructorLogin() {
  return (
    <div className="container d-flex vh-100">
      <div className="row justify-content-center align-self-center w-100">
        <div className="col-md-5 bg-white p-4 rounded shadow-sm border border-2 border-secondary-subtle">
          <h2 className="text-center mb-4 text-secondary">Instructor Login</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="instructorEmail" className="form-label">Email</label>
              <input type="email" className="form-control" id="instructorEmail" placeholder="Enter your email" />
            </div>
            <div className="mb-3">
              <label htmlFor="instructorPassword" className="form-label">Password</label>
              <input type="password" className="form-control" id="instructorPassword" placeholder="Enter your password" />
            </div>
            <button type="submit" className="btn btn-secondary w-100">Login</button>
          </form>
          <div className="mt-3 text-end">
            <a className="link-secondary" href="/instructor/signup">Signup</a>
          </div>
        </div>
      </div>
    </div>
  );
}
