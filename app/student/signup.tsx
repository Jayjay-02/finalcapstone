import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function StudentSignup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      setSuccess("");
      return;
    }

    // Get pending and approved students
    const pending = JSON.parse(localStorage.getItem("pendingStudents") || "[]");
    const approved = JSON.parse(localStorage.getItem("approvedStudents") || "[]");

    // Check if email already exists
    const exists = [...pending, ...approved].some(
      (student: { email: string }) => student.email === email
    );

    if (exists) {
      setError("This email is already registered.");
      setSuccess("");
      return;
    }

    // Add new student to pending list with name, email, password
    const newStudent = { name, email, password };
    pending.push(newStudent);
    localStorage.setItem("pendingStudents", JSON.stringify(pending));

    setError("");
    setSuccess("Registration submitted! Awaiting admin approval...");
    setTimeout(() => router.push("/student/login"), 1500);
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
          <div className="bg-transparent p-4 rounded" style={{ width: "100%", maxWidth: "400px" }}>
            <h4 className="fw-bold mb-1">Student Signup</h4>
            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>Create a new account</p>

            <form onSubmit={handleSubmit}>
              {/* Name Input */}
              <div className="form-floating mb-3">
                <input 
                  type="text" 
                  className="form-control" 
                  id="signupStudentName" 
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="Enter your full name" 
                  required
                />
                <label htmlFor="signupStudentName">Full Name</label>
              </div>

              {/* Email Input */}
              <div className="form-floating mb-3">
                <input 
                  type="email" 
                  className="form-control" 
                  id="signupStudentEmail" 
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email" 
                  required
                />
                <label htmlFor="signupStudentEmail">Email</label>
              </div>

              {/* Password Input */}
              <div className="form-floating mb-3">
                <input 
                  type="password" 
                  className="form-control" 
                  id="signupStudentPassword" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password" 
                  required
                />
                <label htmlFor="signupStudentPassword">Password</label>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}
              {success && <div className="alert alert-success py-2">{success}</div>}

              <button 
                type="submit" 
                className="btn w-100 rounded-0 fw-semibold" 
                style={{ backgroundColor: "black", color: "white", fontSize: "16px" }}
              >
                Signup
              </button>
            </form>

            <div className="d-flex justify-content-end mt-3">
              <a 
                href="#" 
                className="text-muted text-decoration-none" 
                style={{ fontSize: "13px" }}
                onClick={e => { e.preventDefault(); router.push('/student/login'); }}
              >
                Login
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
