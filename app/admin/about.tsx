import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";

export default function About() {
  return (
    <div 
      className="d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "100vh", background: "#f8f8f8", padding: "2rem" }}
    >
      <h1 className="fw-bold mb-4">About PaperTrail</h1>
      <p className="text-muted" style={{ maxWidth: 600, fontSize: "1.1rem" }}>
        PaperTrail is a specialized Thesis Management System designed for universities to streamline the administration of thesis submissions, advisories, group management, defense scheduling, and reporting. 
        It serves as a centralized platform for both students and administrators, improving organization, communication, and record-keeping efficiency.
      </p>
    </div>
  );
}
