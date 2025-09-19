import "bootstrap/dist/css/bootstrap.min.css";
import { useRouter } from "expo-router";
import React, { useState } from "react";

export default function RegisterInstructor() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onloadend = () => setProfilePic(reader.result as string);
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      setError("⚠ Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("⚠ Passwords do not match.");
      return;
    }

    // Save to localStorage
    const existing = JSON.parse(localStorage.getItem("registeredInstructors") || "[]");
    const newInstructor = { name, email, department, password, profilePic };
    localStorage.setItem("registeredInstructors", JSON.stringify([...existing, newInstructor]));

    alert("✅ Instructor registered successfully!");
    router.push("/instructor/login");
  };

  return (
    <div className="container-fluid px-0" style={{ minHeight: "100vh" }}>
      <div className="row g-0" style={{ minHeight: "100vh" }}>
        
        {/* Left Side */}
        <div className="col-md-6 d-flex flex-column justify-content-center align-items-center position-relative" 
             style={{ backgroundColor: "#f1f1f1" }}>
          <h3 className="fw-bold">Instructor Registration</h3>
          {profilePic ? (
            <img src={profilePic} alt="Preview" className="rounded-circle mt-3 shadow" width="150" height="150" />
          ) : (
            <div className="rounded-circle mt-3 shadow d-flex justify-content-center align-items-center"
                 style={{ width: "150px", height: "150px", background: "#ddd" }}>
              <span className="text-muted">No Image</span>
            </div>
          )}
          <p className="text-muted mt-2">Profile Preview</p>
        </div>

        {/* Right Side */}
        <div className="col-md-6 d-flex justify-content-center align-items-center bg-light">
          <div className="bg-white p-4 rounded shadow-sm" style={{ width: "100%", maxWidth: "400px" }}>
            <h4 className="fw-bold mb-1">Register Instructor</h4>
            <p className="text-muted mb-4" style={{ fontSize: "14px" }}>Fill in your details below</p>

            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="name"
                       value={name} onChange={e => setName(e.target.value)} placeholder="Full Name" required />
                <label htmlFor="name">Full Name</label>
              </div>

              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="department"
                       value={department} onChange={e => setDepartment(e.target.value)} placeholder="Department" />
                <label htmlFor="department">Department (Optional)</label>
              </div>

              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email"
                       value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                <label htmlFor="email">Email</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password"
                       value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required />
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="confirmPassword"
                       value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} placeholder="Confirm Password" required />
                <label htmlFor="confirmPassword">Confirm Password</label>
              </div>

              <div className="mb-3">
                <label className="form-label">Upload Profile Picture</label>
                <input type="file" accept="image/*" className="form-control" onChange={handleFileChange} />
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}

              <button type="submit" className="btn w-100 rounded-0 fw-semibold"
                      style={{ backgroundColor: "black", color: "white", fontSize: "16px" }}>
                Register
              </button>
            </form>

            <div className="d-flex justify-content-end mt-3">
              <a href="#" className="text-muted text-decoration-none" style={{ fontSize: "13px" }}
                 onClick={e => { e.preventDefault(); router.push("/instructor/login"); }}>
                Back to Login
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
