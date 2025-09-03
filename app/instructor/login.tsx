import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function InstructorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const savedEmail = localStorage.getItem("instructorEmail");
    const savedPassword = localStorage.getItem("instructorPassword");

    if (email === savedEmail && password === savedPassword) {
      setError("");
      router.push("/instructor/dashboard");
    } else {
      setError("Invalid email or password.");
    }
  }

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Left Side */}
        <div 
          className="col-md-6 d-flex flex-column justify-content-center align-items-center position-relative" 
          style={{ backgroundColor: "#f9f9f9" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "#e0e0e0",
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
            }}
          >
            <div style={{ padding: "20px" }}>
              <div
                style={{
                  width: "60px",
                  height: "60px",
                  backgroundColor: "#fff",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontWeight: "bold",
                  fontSize: "12px",
                  boxShadow: "0 0 5px rgba(0,0,0,0.2)",
                }}
              >
                Logo
              </div>
            </div>
          </div>
          <h3 className="text-muted" style={{ zIndex: 1, color: "#444" }}>
            Image/Logo
          </h3>
        </div>

        {/* Right Side */}
        <div
          className="col-md-6 d-flex justify-content-center align-items-center"
          style={{ backgroundColor: "#f5f5f5" }}
        >
          <div
            className="bg-transparent p-4 rounded"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h4 className="fw-bold mb-1" style={{ color: "#333" }}>
              Welcome to PaperTrail
            </h4>
            <p
              className="text-muted mb-4"
              style={{ fontSize: "14px", color: "#555" }}
            >
              A Thesis Management System
            </p>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="instructorEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email Id"
                  autoComplete="username"
                  required
                />
                <label htmlFor="instructorEmail" style={{ color: "#444" }}>
                  Email
                </label>
              </div>

              <div className="form-floating mb-2">
                <input
                  type="password"
                  className="form-control"
                  id="instructorPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  autoComplete="current-password"
                  required
                />
                <label htmlFor="instructorPassword" style={{ color: "#444" }}>
                  Password
                </label>
              </div>

              <div className="d-flex justify-content-end mb-3">
                <a
                  href="#"
                  className="text-decoration-none"
                  style={{ fontSize: "13px", color: "#666" }}
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/instructor/signup");
                  }}
                >
                  Register
                </a>
              </div>

              {error && (
                <div className="alert alert-danger py-2">{error}</div>
              )}

              <button
                type="submit"
                className="btn w-100 rounded-0 fw-semibold"
                style={{
                  backgroundColor: "black",
                  color: "white",
                  fontSize: "16px",
                }}
              >
                Login
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
