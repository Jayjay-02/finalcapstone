import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React from "react";

// ✅ Import your logo
import logo from "../../assets/images/logo.jpg"; // adjust filename if needed

export default function Home() {
  const router = useRouter();
  
  return (
    <div
      className="container-fluid px-0"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div className="row w-100 m-0" style={{ minHeight: "100vh" }}>
        
        {/* ================= Left Section ================= */}
        <div
          className="col-lg-7 col-md-12 d-flex align-items-center justify-content-center position-relative"
          style={{ backgroundColor: "#d9d9d9" }}
        >
          <div className="text-center p-4 w-100">
            
            {/* 📚 Logo (replaced placeholder with image) */}
            <div
              style={{
                width: "200px",
                height: "200px",
                backgroundColor: "#fff",
                margin: "0 auto 30px auto",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid #ccc",
              }}
            >
              <img 
                src={logo} 
                alt="PaperTrail Logo" 
                style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }} 
              />
            </div>

            {/* Main Title */}
            <h2
              className="fw-bold mb-4"
              style={{ fontSize: "1.6rem", color: "#000" }}
            >
              PaperTrail: A Thesis Management System for <br />
              Environmental Science Department
            </h2>

            {/* ================= Buttons Section ================= */}
            <div className="d-flex justify-content-center gap-3 my-3 flex-wrap">
              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold px-4"
                onClick={() => router.push("/panel/login")}
              >
                📋 Panel
              </button>

              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold px-4"
                onClick={() => router.push("/admin/login")}
              >
                📋 Dean
              </button>

              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold px-4"
                onClick={() => router.push("/dean/login")}
              >
                ⚙️ Admin
              </button>

              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold px-4"
                onClick={() => router.push("/student/login")}
              >
                🎓 Student
              </button>

              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold px-4"
                onClick={() => router.push("/instructor/login")}
              >
                👨‍🏫 Adviser
              </button>
            </div>

            {/* ================= Footer ================= */}
            <div
              className="pt-2 small"
              style={{
                color: "#333",
              }}
            >
              <span className="fw-bold">Papertrail</span> &copy;{" "}
              {new Date().getFullYear()} · Documentation made easy.
            </div>
          </div>

          {/* Black angled divider (like screenshot) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              right: "-60px",
              width: "30px",
              height: "100%",
              backgroundColor: "black",
              transform: "skewX(-20deg)",
            }}
          />
        </div>

        {/* ================= Right Section ================= */}
        <div className="col-lg-5 col-md-12 d-flex align-items-center justify-content-center">
          <div
            style={{
              fontSize: "20px",
              fontWeight: "500",
              color: "#000",
            }}
          >
            Image/Logo
          </div>
        </div>

      </div>
    </div>
  );
}
