import AsyncStorage from "@react-native-async-storage/async-storage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";

export default function InstructorLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const storedData = await AsyncStorage.getItem("registeredInstructors");
      const stored = storedData ? JSON.parse(storedData) : [];

      const match = stored.find(
        (inst: any) => inst.email === email && inst.password === password
      );

      if (match) {
        setError("");

        if (rememberMe) {
          await AsyncStorage.setItem("rememberInstructor", email);
        } else {
          await AsyncStorage.removeItem("rememberInstructor");
        }

        // Save full instructor info
        await AsyncStorage.setItem("loggedInstructor", JSON.stringify(match));

        router.push("/instructor/dashboard");
      } else {
        setError("❌ Invalid email or password.");
      }
    } catch (err) {
      console.error("Login Error:", err);
      setError("Something went wrong. Try again.");
    }
  }

  useEffect(() => {
    (async () => {
      const remembered = await AsyncStorage.getItem("rememberInstructor");
      if (remembered) {
        setEmail(remembered);
        setRememberMe(true);
      }

      const loggedIn = await AsyncStorage.getItem("loggedInstructor");
      if (loggedIn) {
        router.push("/instructor/dashboard");
      }
    })();
  }, []);

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        {/* Left Side */}
        <div
          className="col-md-6 d-flex flex-column justify-content-center align-items-center position-relative"
          style={{ backgroundColor: "#f9f9f9" }}
        >
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
            className="bg-white p-4 rounded shadow-sm"
            style={{ width: "100%", maxWidth: "400px" }}
          >
            <h4 className="fw-bold mb-1 text-center" style={{ color: "#333" }}>
              Welcome to PaperTrail
            </h4>
            <p className="text-muted mb-4 text-center" style={{ fontSize: "14px" }}>
              A Thesis Management System
            </p>

            <form onSubmit={handleSubmit}>
              {/* Email */}
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="instructorEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email"
                  autoComplete="username"
                  required
                />
                <label htmlFor="instructorEmail">Email</label>
              </div>

              {/* Password */}
              <div className="form-floating mb-2 position-relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="instructorPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Your Password"
                  autoComplete="current-password"
                  required
                />
                <label htmlFor="instructorPassword">Password</label>
                <button
                  type="button"
                  className="btn btn-sm btn-light position-absolute"
                  style={{ top: "8px", right: "10px", fontSize: "12px" }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "🙈 Hide" : "👁 Show"}
                </button>
              </div>

              {/* Remember Me + Register */}
              <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={() => setRememberMe(!rememberMe)}
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
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

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <button
                type="submit"
                className="btn w-100 rounded-3 fw-semibold"
                style={{ backgroundColor: "black", color: "white", fontSize: "16px" }}
              >
                🔑 Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
