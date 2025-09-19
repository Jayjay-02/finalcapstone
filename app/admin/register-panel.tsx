// RegisterPanel.tsx
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

export interface Panel {
  email: string;
  password: string;
  name: string;
  image: string;
  groupId?: number;
}

export default function RegisterPanel() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const getPanels = (): Panel[] =>
    JSON.parse(localStorage.getItem("panels") || "[]");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleRegister = () => {
    if (!email || !password || !image || !name) {
      setMessage("⚠️ Please fill in all fields and upload an image.");
      return;
    }

    const panels = getPanels();
    if (panels.find((p) => p.email === email)) {
      setMessage("⚠️ This email is already registered.");
      return;
    }

    const newPanel: Panel = { email, password, name, image };
    panels.push(newPanel);
    localStorage.setItem("panels", JSON.stringify(panels));

    setMessage("✅ Panel registered successfully! You can now schedule defenses.");
    setEmail("");
    setPassword("");
    setName("");
    setImage(null);
  };

  return (
    <div className="container-fluid min-vh-100 d-flex align-items-center bg-light">
      <div className="row w-100 justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card shadow-lg rounded-4 overflow-hidden">
            <div className="row g-0">
              {/* LEFT SIDE (Image/Logo/Info) */}
              <div className="col-lg-6 d-none d-lg-flex bg-dark text-white flex-column justify-content-center align-items-center p-4">
                <h2 className="fw-bold">PaperTrail</h2>
                <p className="text-center">
                  Manage your thesis panels with ease. Register and start scheduling today.
                </p>
                <div
                  style={{
                    width: 150,
                    height: 150,
                    backgroundColor: "#fff",
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    color: "#000",
                  }}
                >
                  Logo
                </div>
              </div>

              {/* RIGHT SIDE (Form) */}
              <div className="col-lg-6 p-5">
                <h3 className="fw-bold mb-3">Register Panel</h3>
                <p className="text-muted mb-4">Fill out the details below to create a new panel account.</p>

                {message && <div className="alert alert-info">{message}</div>}

                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Profile Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {image && (
                  <div className="mb-3 text-center">
                    <img
                      src={image}
                      alt="Preview"
                      style={{ width: 120, height: 120, borderRadius: "50%" }}
                    />
                  </div>
                )}

                <button
                  className="btn btn-dark w-100 py-2 fw-semibold"
                  onClick={handleRegister}
                >
                  Register Panel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
