import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React, { useState } from "react";

// Hashing using SubtleCrypto
async function hashPassword(password: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest("SHA-256", data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

export default function StudentSignup() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Handle file upload
  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePic(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword || !profilePic) {
      setError("Please fill in all fields and upload a profile picture.");
      setSuccess("");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      setSuccess("");
      return;
    }

    try {
      const hashedPassword = await hashPassword(password);

      const pendingStudents = JSON.parse(localStorage.getItem("pendingStudents") || "[]");
      const approvedStudents = JSON.parse(localStorage.getItem("approvedStudents") || "[]");

      // Check if email already exists
      if (
        pendingStudents.some((s: any) => s.email === email) ||
        approvedStudents.some((s: any) => s.email === email)
      ) {
        setError("This email is already registered.");
        setSuccess("");
        return;
      }

      // New student entry
      const newStudent = {
        name,
        email,
        password: hashedPassword,
        profilePic,
        notifications: [] as { message: string; type: "info" | "success" }[],
      };

      const updatedPending = [...pendingStudents, newStudent];
      localStorage.setItem("pendingStudents", JSON.stringify(updatedPending));

      setError("");
      setSuccess("Registration submitted! Awaiting admin approval...");

      // Reset form fields
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      setProfilePic(null);

      // Redirect to login after short delay
      setTimeout(() => router.push("/student/login"), 1500);
    } catch (e) {
      console.error("Signup error:", e);
      setError("⚠️ Registration failed. Please try again later.");
      setSuccess("");
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
          <div className="bg-transparent p-4 rounded" style={{ width: "100%", maxWidth: "400px" }}>
            <h4 className="fw-bold mb-1">Student Signup</h4>
            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>Create a new account</p>

            <form onSubmit={handleSubmit}>
              {/* Name */}
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

              {/* Email */}
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

              {/* Profile Picture */}
              <div className="mb-3">
                <label htmlFor="signupStudentPic" className="form-label fw-semibold">Upload Profile Picture</label>
                <input 
                  type="file" 
                  accept="image/*"
                  className="form-control"
                  id="signupStudentPic"
                  onChange={handleFileUpload}
                  required
                />
                {profilePic && (
                  <div className="text-center mt-2">
                    <img 
                      src={profilePic} 
                      alt="Preview" 
                      className="rounded-circle border" 
                      style={{ width: "80px", height: "80px", objectFit: "cover" }} 
                    />
                  </div>
                )}
              </div>

              {/* Password */}
              <div className="form-floating mb-3 position-relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  id="signupStudentPassword" 
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Create a password" 
                  required
                />
                <label htmlFor="signupStudentPassword">Password</label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="btn btn-sm btn-outline-secondary position-absolute"
                  style={{ top: "8px", right: "10px" }}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>

              {/* Confirm Password */}
              <div className="form-floating mb-3">
                <input 
                  type={showPassword ? "text" : "password"} 
                  className="form-control" 
                  id="signupStudentConfirmPassword" 
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password" 
                  required
                />
                <label htmlFor="signupStudentConfirmPassword">Confirm Password</label>
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
