import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function AdminSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    const adminAccount = { email, password };
    localStorage.setItem("adminAccount", JSON.stringify(adminAccount));

    setError("");
    alert("Signup successful! You can now log in.");
    router.push("/admin/login");
  }

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Left Section */}
        <div className="col-lg-6 d-none d-lg-block position-relative" style={{ background: "#fff" }}>
          <div 
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              background: "#ddd",
              clipPath: "polygon(0 0, 100% 0, 0 100%)"
            }}
          >
            <div 
              style={{
                position: "absolute",
                top: "20px",
                left: "20px",
                width: "80px",
                height: "80px",
                background: "#f5f5f5",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold"
              }}
            >
              Logo
            </div>
          </div>
          <div 
            className="h-100 w-100 d-flex justify-content-center align-items-center"
            style={{ fontSize: "1.2rem", color: "#333" }}
          >
            Image/Logo
          </div>
        </div>

        {/* Right Section */}
        <div className="col-lg-6 d-flex align-items-center justify-content-center" style={{ background: "#e5e5e5" }}>
          <div style={{ width: "360px", maxWidth: "90%" }}>
            <h3 className="fw-bold mb-1">Create Admin Account</h3>
            <p className="text-muted mb-4" style={{ fontSize: "0.9rem" }}>Signup to manage PaperTrail</p>
            
            <form onSubmit={handleSubmit}>
              <div className="input-group mb-3">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-envelope"></i>
                </span>
                <input 
                  type="email" 
                  className="form-control border-start-0" 
                  placeholder="Your Email Id"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="input-group mb-3">
                <span className="input-group-text bg-white border-end-0">
                  <i className="bi bi-lock"></i>
                </span>
                <input 
                  type="password" 
                  className="form-control border-start-0" 
                  placeholder="Create Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <button 
                type="submit"
                className="btn btn-dark w-100 py-2 fw-semibold"
                style={{ borderRadius: "0.3rem" }}
              >
                Signup
              </button>
            </form>

            <div className="d-flex justify-content-end mt-3">
              <span className="text-muted me-1">Already have an account?</span>
              <a 
                href="#" 
                className="fw-semibold text-dark text-decoration-none"
                onClick={e => { e.preventDefault(); router.push('/admin/login'); }}
              >
                Login here
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
