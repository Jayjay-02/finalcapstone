import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function StudentLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // Read approved students from localStorage
    const approvedStudents = JSON.parse(localStorage.getItem("approvedStudents") || "[]");

    // Check if this email/password is approved
    const studentFound = approvedStudents.find(
      (s: { email: string; password: string }) => s.email === email && s.password === password
    );

    if (studentFound) {
      setError("");

      // Save logged-in student info for dashboard
      localStorage.setItem("loggedInStudent", JSON.stringify({
        name: studentFound.name || "Student",
        email: studentFound.email
      }));

      router.push("/student/dashboard");
    } else {
      setError("You are not approved yet or credentials are incorrect.");
    }
  }

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Left Side */}
        <div 
          className="col-md-6 d-flex flex-column justify-content-center align-items-center position-relative" 
          style={{ backgroundColor: "#f1f1f1" }}
        >
          <div style={{
            position: "absolute",
            top: 0, left: 0,
            width: "100%",
            height: "50%",
            backgroundColor: "#d3d3d3",
            clipPath: "polygon(0 0, 100% 0, 0 100%)"
          }}>
            <div style={{ padding: "20px" }}>
              <div style={{
                width: "60px",
                height: "60px",
                backgroundColor: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontWeight: "bold",
                fontSize: "12px",
                boxShadow: "0 0 5px rgba(0,0,0,0.2)"
              }}>
                Logo
              </div>
            </div>
          </div>
          <h3 className="text-muted" style={{ zIndex: 1 }}>Image/Logo</h3>
        </div>

        {/* Right Side */}
        <div 
          className="col-md-6 d-flex justify-content-center align-items-center" 
          style={{ backgroundColor: "#e6e6e6" }}
        >
          <div 
            className="bg-transparent p-4 rounded" 
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h4 className="fw-bold mb-1">Student Login</h4>
            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>Access your account</p>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="studentEmail" 
                  value={email} 
                  onChange={e => setEmail(e.target.value)} 
                  placeholder="Enter your email" 
                  autoComplete="username" 
                  required 
                />
                <label htmlFor="studentEmail">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="studentPassword" 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
                  placeholder="Enter your password" 
                  autoComplete="current-password" 
                  required 
                />
                <label htmlFor="studentPassword">Password</label>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <button 
                type="submit" 
                className="btn w-100 rounded-0 fw-semibold" 
                style={{ backgroundColor: "black", color: "white", fontSize: "16px" }}
              >
                Login
              </button>
            </form>

            <div className="d-flex justify-content-end mt-3">
              <a 
                href="#" 
                className="text-muted text-decoration-none" 
                style={{ fontSize: "13px" }}
                onClick={e => { e.preventDefault(); router.push('/student/signup'); }}
              >
                Register
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
