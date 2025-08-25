import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";

export default function StudentLogin() {
  const router = useRouter();
  // Autofill values
  const [email, setEmail] = useState('student');
  const [password, setPassword] = useState('student123');
  const [error, setError] = useState("");

  // Optionally, try auto-login if values match
  useEffect(() => {
    if (email === 'student' && password === 'student123') {
      // Could auto-login here if you want (uncomment next lines to make it immediate):
      // handleAutoLogin(); 
    }
    // eslint-disable-next-line
  }, []);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (email === 'student' && password === 'student123') {
      setError("");
      router.push("/student/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  // Optional auto-login function (uncomment inside useEffect to use)
  // function handleAutoLogin() {
  //   router.push("/student/dashboard");
  // }

  return (
    <div className="container-fluid px-0" style={{minHeight: "100vh", background: "linear-gradient(110deg, #f1f9ff 0%, #f9fafe 100%)"}}>
      <div className="row justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-8 col-lg-5 col-xl-4 px-0">
          <div className="bg-white rounded-4 shadow p-5 mb-4 text-center">
            <div className="mb-2">
              <span style={{fontSize: 40, display: 'inline-block'}} role="img" aria-label="student">🎓</span>
            </div>
            <h2 className="fw-bold text-info mb-3" style={{fontSize: 27}}>Student Login</h2>
            <form onSubmit={handleSubmit} className="mb-2">
              <div className="form-floating mb-3 text-start">
                <input type="text" className="form-control" id="studentEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" autoComplete="username" />
                <label htmlFor="studentEmail">Email</label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input type="password" className="form-control" id="studentPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" autoComplete="current-password" />
                <label htmlFor="studentPassword">Password</label>
              </div>
              {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
              <button type="submit" className="btn btn-info btn-lg w-100 rounded-pill fw-semibold shadow-sm text-white" style={{fontSize: 17}}>Login</button>
            </form>
            <div className="text-end">
              <span className="me-1 text-muted">No account?</span>
              <a className="fw-semibold text-info text-decoration-none" href="#" onClick={e => {e.preventDefault(); router.push('/student/signup')}}>Signup here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
