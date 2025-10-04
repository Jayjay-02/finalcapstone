import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div
      className="container-fluid px-0"
      style={{
        minHeight: "100vh",
        backgroundImage:
          "url('/assets/images/c7d42c63-b68a-4e37-ba82-afe43fbae873.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      <div
        className="row justify-content-center align-items-center w-100"
        style={{ minHeight: "100vh" }}
      >
        <div className="col-11 col-md-8 col-lg-6 col-xl-5 px-0">
          <div className="bg-dark bg-opacity-75 rounded-4 shadow p-5 mb-4">
            <div className="mb-3">
              <span style={{ fontSize: 72 }} role="img" aria-label="books">
                📚
              </span>
            </div>

            {/* Main Title */}
            <h1
              className="fw-bolder mb-3"
              style={{
                fontSize: 64,
                letterSpacing: -1,
                lineHeight: 1.1,
                textShadow: "3px 4px 8px rgba(0, 0, 0, 0.6)",
                color: "#fff",
              }}
            >
              PaperTrail
            </h1>

            <h2
              className="fw-semibold mb-3"
              style={{
                fontSize: 24,
                lineHeight: 1.3,
                textShadow: "2px 2px 6px rgba(0,0,0,0.5)",
                color: "#ddd",
              }}
            >
              A Thesis Management System for Environmental Science Department
            </h2>

            <p
              className="fw-normal mb-4 fs-6"
              style={{
                textShadow: "1px 1px 4px rgba(0,0,0,0.5)",
                color: "#ccc",
              }}
            >
              Track, manage &amp; collaborate on documents with ease!
            </p>

            {/* Unified Minimalist Buttons */}
            <div className="d-flex flex-wrap justify-content-center gap-2 my-4">
              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold shadow-sm px-4"
                onClick={() => router.push("/panel/login")}
              >
                📋 Panel
              </button>
              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold shadow-sm px-4"
                onClick={() => router.push("/admin/login")}
              >
                
                📋 Dean
              </button>
              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold shadow-sm px-4"
                onClick={() => router.push("/dean/login")}
              >
                ⚙️ Admin
              </button>
              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold shadow-sm px-4"
                onClick={() => router.push("/student/login")}
              >
                🎓 Student
              </button>
              <button
                className="btn btn-dark btn-lg rounded-pill fw-semibold shadow-sm px-4"
                onClick={() => router.push("/instructor/login")}
              >
                👨‍🏫 Adviser
              </button>
            </div>

            {/* Footer */}
            <div
              className="pt-2 small"
              style={{
                textShadow: "1px 1px 4px rgba(0,0,0,0.6)",
                color: "#bbb",
              }}
            >
              <span className="fw-bold">Papertrail</span> &copy;{" "}
              {new Date().getFullYear()} · Documentation made easy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
