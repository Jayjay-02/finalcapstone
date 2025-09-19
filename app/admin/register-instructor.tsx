import AsyncStorage from "@react-native-async-storage/async-storage";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function RegisterInstructor() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!fullName || !email || !password || !confirmPassword) {
      setError("⚠️ Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("⚠️ Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const storedData = await AsyncStorage.getItem("registeredInstructors");
      const stored = storedData ? JSON.parse(storedData) : [];

      const exists = stored.find((inst: any) => inst.email === email);
      if (exists) {
        setError("⚠️ Instructor email already exists.");
        setLoading(false);
        return;
      }

      const newInstructor = { fullName, email, password, profilePic };
      stored.push(newInstructor);
      await AsyncStorage.setItem("registeredInstructors", JSON.stringify(stored));

      setSuccess("✅ Registration successful! Redirecting to login...");
      setLoading(false);

      setTimeout(() => router.push("/instructor/login"), 1500);
    } catch (err) {
      console.error("Registration Error:", err);
      setError("❌ Registration failed. Please try again later.");
      setLoading(false);
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg border-0 p-4" style={{ width: "100%", maxWidth: 450 }}>
        <h3 className="fw-bold text-center mb-4 text-primary">Instructor Registration</h3>

        <form onSubmit={handleSubmit}>
          {/* Profile Picture */}
          <div className="mb-4 text-center">
            {profilePic ? (
              <img
                src={profilePic}
                alt="Profile Preview"
                className="rounded-circle border mb-3"
                style={{ width: "100px", height: "100px", objectFit: "cover" }}
              />
            ) : (
              <div
                className="rounded-circle bg-secondary bg-opacity-25 d-flex justify-content-center align-items-center mb-3"
                style={{ width: "100px", height: "100px", fontSize: "12px", color: "#666" }}
              >
                Upload
              </div>
            )}
            <input
              type="file"
              accept="image/*"
              className="form-control form-control-sm"
              onChange={handleFileChange}
              required
            />
          </div>

          {/* Full Name */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label>Full Name</label>
          </div>

          {/* Email */}
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label>Email</label>
          </div>

          {/* Password */}
          <div className="form-floating mb-3 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label>Password</label>
            <button
              type="button"
              className="btn btn-sm btn-outline-secondary position-absolute"
              style={{ top: "8px", right: "10px" }}
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="form-floating mb-3">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <label>Confirm Password</label>
          </div>

          {/* Error + Success Messages */}
          {error && <div className="alert alert-danger small py-2">{error}</div>}
          {success && <div className="alert alert-success small py-2">{success}</div>}

          {/* Submit */}
          <div className="d-grid">
            <button className="btn btn-primary fw-semibold" type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </div>

          {/* Already have account */}
          <p className="text-center mt-3 mb-0 small">
            Already have an account?{" "}
            <a href="/instructor/login" className="text-decoration-none fw-semibold">
              Login here
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}
