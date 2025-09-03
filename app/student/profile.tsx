import React, { useState } from "react";

export default function StudentProfile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("Juan Dela Cruz");
  const [email, setEmail] = useState("juan@example.com");
  const [course, setCourse] = useState("BS Environmental Science");

  // Handle file upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("✅ Profile updated successfully!");
    // Here you would send updated info to backend (API call)
  };

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold mb-4 text-primary">Update Profile</h1>

      <div className="card shadow-lg p-4 rounded-4 mx-auto" style={{ maxWidth: 600 }}>
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

          <div className="d-grid">
            <button type="submit" className="btn btn-success rounded-pill fw-semibold">
              💾 Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
