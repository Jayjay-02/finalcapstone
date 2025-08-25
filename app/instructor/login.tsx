import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";

export default function InstructorLogin() {
  const router = useRouter();
  // Autofill instructor values
  const [email, setEmail] = useState('instructor');
  const [password, setPassword] = useState('instructor123');
  const [error, setError] = useState("");

  // Optionally, try auto-login if values match
  useEffect(() => {
    if (email === 'instructor' && password === 'instructor123') {
      // Optionally, perform auto-login here
    }
    // eslint-disable-next-line
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === 'instructor' && password === 'instructor123') {
      setError("");
      router.push("/instructor/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="container-fluid px-0" style={{minHeight: "100vh", background: "linear-gradient(110deg, #f1f9ff 0%, #f9fafe 100%)"}}>
      <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-8 col-lg-5 col-xl-4 px-0">
          <div className="bg-white rounded-4 shadow p-5 mb-4 text-center">
            <div className="mb-2">
              <span style={{fontSize: 40, display: 'inline-block'}} role="img" aria-label="instructor">👨‍🏫</span>
            </div>
            <h2 className="fw-bold text-secondary mb-3" style={{fontSize: 27}}>Instructor Login</h2>
            <form onSubmit={handleSubmit} className="mb-2">
              <div className="form-floating mb-3 text-start">
                <input type="text" className="form-control" id="instructorEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" autoComplete="username" />
                <label htmlFor="instructorEmail">Email</label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input type="password" className="form-control" id="instructorPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
                <label htmlFor="instructorPassword">Password</label>
              </div>
              {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
              <button type="submit" className="btn btn-secondary btn-lg w-100 rounded-pill fw-semibold shadow-sm" style={{fontSize: 17}}>Login</button>
            </form>
            <div className="text-end">
              <span className="me-1 text-muted">No account?</span>
              <a className="fw-semibold text-secondary text-decoration-none" href="#" onClick={e => {e.preventDefault(); router.push('/instructor/signup')}}>Signup here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
