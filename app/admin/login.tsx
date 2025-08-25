import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const adminAccount = localStorage.getItem("adminAccount");
    if (!adminAccount) {
      setError("No admin account found. Please sign up.");
      return;
    }
    const { email: storedEmail, password: storedPassword } = JSON.parse(adminAccount);
    if (email === storedEmail && password === storedPassword) {
      setError("");
      router.push("/admin/dashboard");
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
              <span style={{fontSize: 40, display: 'inline-block'}} role="img" aria-label="admin">⚙️</span>
            </div>
            <h2 className="fw-bold text-warning mb-3" style={{fontSize: 27}}>Admin Login</h2>
            <form onSubmit={handleSubmit} className="mb-2">
              <div className="form-floating mb-3 text-start">
                <input type="email" className="form-control" id="adminEmail" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" />
                <label htmlFor="adminEmail">Email</label>
              </div>
              <div className="form-floating mb-3 text-start">
                <input type="password" className="form-control" id="adminPassword" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" />
                <label htmlFor="adminPassword">Password</label>
              </div>
              {error && <div className="alert alert-danger py-2" role="alert">{error}</div>}
              <button type="submit" className="btn btn-warning btn-lg w-100 rounded-pill fw-semibold shadow-sm text-white" style={{fontSize: 17}}>Login</button>
            </form>
            <div className="text-end">
              <span className="me-1 text-muted">No account?</span>
              <a className="fw-semibold text-warning text-decoration-none" href="#" onClick={e => {e.preventDefault(); router.push('/admin/signup')}}>Signup here</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
