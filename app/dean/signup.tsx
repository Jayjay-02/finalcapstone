import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function DeanSignup() {
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

    const deanAccount = { email, password };
    localStorage.setItem("deanAccount", JSON.stringify(deanAccount));

    setError("");
    alert("Signup successful! You can now log in.");
    router.push("/dean/login");
  }

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* LEFT SIDE */}
        <div className="col-12 col-lg-6 d-flex flex-column justify-content-center align-items-center position-relative bg-light">
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "50%",
              backgroundColor: "#e5e5e5",
              clipPath: "polygon(0 0, 100% 0, 0 100%)",
              borderBottom: "5px solid black",
            }}
          />
          <div className="text-center mt-5">
            <div
              style={{
                width: 100,
                height: 100,
                backgroundColor: "#fff",
                border: "2px solid #ddd",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: "bold",
                marginBottom: "20px",
              }}
            >
              Logo
            </div>
            <h5 className="fw-semibold text-muted">Image/Logo</h5>
          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="col-12 col-lg-6 d-flex justify-content-center align-items-center bg-light">
          <div
            className="bg-white rounded-4 shadow p-5"
            style={{ width: "100%", maxWidth: 420 }}
          >
            <h3 className="fw-bold mb-1">Create Dean Account</h3>
            <p className="text-muted mb-4">Sign up to manage PaperTrail</p>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="signupDeanEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                />
                <label htmlFor="signupDeanEmail">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="signupDeanPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                />
                <label htmlFor="signupDeanPassword">Password</label>
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <button
                type="submit"
                className="btn btn-dark w-100 py-2 fw-semibold rounded-3 mb-3"
              >
                Sign Up
              </button>

              <div className="text-center">
                <span className="me-1 text-muted">Already have an account?</span>
                <a
                  className="fw-semibold text-decoration-none text-dark"
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    router.push("/dean/login");
                  }}
                >
                  Login here
                </a>
              </div>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
}
