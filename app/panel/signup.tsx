import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function PanelSignup() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSignup(e: React.FormEvent) {
    e.preventDefault();

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    const users = JSON.parse(localStorage.getItem("panelUsers") || "[]");
    if (users.find((u: any) => u.email === email)) {
      setError("Email already registered.");
      return;
    }

    users.push({ email, password });
    localStorage.setItem("panelUsers", JSON.stringify(users));

    alert("Signup successful! You can now login.");
    router.push("/panel/login");
  }

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* LEFT SIDE WITH LOGO + DIAGONAL */}
        <div className="col-md-6 d-none d-md-block position-relative bg-light">
          <div style={{
            position: "absolute",
            top: 30,
            left: 30,
            width: 80,
            height: 80,
            background: "#fff",
            border: "1px solid #ccc",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 12
          }}>
            Logo
          </div>
          <div style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "50%",
            background: "#ddd",
            clipPath: "polygon(0 0, 100% 0, 0 100%)"
          }} />
          <div style={{
            position: "absolute",
            top: "40%",
            left: "20%",
            fontSize: 20,
            fontWeight: "500"
          }}>
            Image/Logo
          </div>
          <div style={{
            position: "absolute",
            top: "50%",
            left: 0,
            width: "100%",
            borderTop: "5px solid black",
            transform: "rotate(-20deg)"
          }} />
        </div>

        {/* RIGHT SIDE SIGNUP FORM */}
        <div className="col-12 col-md-6 d-flex align-items-center justify-content-center bg-light">
          <div className="p-4" style={{ width: "100%", maxWidth: 400 }}>
            <h4 className="fw-bold mb-1">Welcome to PaperTrail</h4>
            <p className="text-muted mb-4">A Thesis Management System</p>

            <form onSubmit={handleSignup}>
              <div className="mb-3">
                <input
                  type="email"
                  className="form-control rounded-3"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Your Email Id"
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control rounded-3"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Your Password"
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" className="btn btn-dark w-100 rounded-3">Signup</button>
            </form>

            <div className="mt-3 text-end">
              <a href="/panel/login" className="text-decoration-none text-dark">Already have an account?</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
