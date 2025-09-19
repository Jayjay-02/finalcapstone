import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";

export default function StudentProfile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [course, setCourse] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Load student data from storage
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const data = await AsyncStorage.getItem("loggedInStudent");
        if (data) {
          const student = JSON.parse(data);
          setName(student.name || "");
          setEmail(student.email || "");
          setCourse(student.course || "");
          setProfilePic(student.profilePic || "/assets/images/default-avatar.png");
          setPassword(student.password || "");
          setConfirmPassword(student.password || "");
        }
      } catch (error) {
        console.error("Error loading profile:", error);
      }
    };
    loadProfile();
  }, []);

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  // Save profile updates
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password && password !== confirmPassword) {
      alert("❌ Passwords do not match!");
      return;
    }

    const updatedStudent = {
      name,
      email,
      course,
      profilePic: profilePic || "/assets/images/default-avatar.png",
      password,
    };

    try {
      await AsyncStorage.setItem("loggedInStudent", JSON.stringify(updatedStudent));
      alert("✅ Profile updated successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
    }
  };

  return (
    <div
      className="container-fluid"
      style={{
        minHeight: "100vh",
        overflowY: "auto", // ✅ enable scrolling
        backgroundColor: "#f8f9fa",
      }}
    >
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-4 text-primary">Update Profile</h1>

        <div
          className="card shadow-lg p-4 rounded-4 mx-auto"
          style={{ maxWidth: 600 }}
        >
          {/* Profile Picture */}
          <div className="text-center mb-4">
            <img
              src={profilePic || "/assets/images/default-avatar.png"}
              alt="Profile"
              className="rounded-circle border border-3"
              style={{ width: 140, height: 140, objectFit: "cover" }}
            />
            <div className="mt-3">
              <label className="btn btn-outline-primary btn-sm">
                📷 Change Photo
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          {/* Profile Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Full Name</label>
              <input
                type="text"
                className="form-control rounded-3"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Email</label>
              <input
                type="email"
                className="form-control rounded-3"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Course</label>
              <input
                type="text"
                className="form-control rounded-3"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                required
              />
            </div>

            {/* Password Change */}
            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">New Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>

            <div className="mb-3 text-start">
              <label className="form-label fw-semibold">Confirm Password</label>
              <input
                type="password"
                className="form-control rounded-3"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </div>

            <div className="d-grid">
              <button
                type="submit"
                className="btn btn-success rounded-pill fw-semibold"
              >
                💾 Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
