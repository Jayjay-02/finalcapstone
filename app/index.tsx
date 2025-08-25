import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";
import React from "react";

export default function Home() {
  const router = useRouter();
  return (
    <div
      className="w-100 d-flex align-items-center justify-content-center"
      style={{
        minHeight: "100vh",
        background: "url('/assets/images/c7d42c63-b68a-4e37-ba82-afe43fbae873.jpg') center/cover no-repeat",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="shadow-lg border-0 p-5 rounded-5 text-center" style={{
        background: 'rgba(30,40,60,0.79)',
        color: '#fff',
        width: 700,
        maxWidth: "90vw"
      }}>
        <span style={{fontSize: 58}} role="img" aria-label="books" className="mb-2">📚</span>
        <h1 className="fw-bolder mt-2 mb-4" style={{fontSize:32, letterSpacing: -1, lineHeight: 1.2}}>
          PaperTrail: A Thesis Management System<br/>
          for Environmental Science Department
        </h1>
        <div className="mb-4 fs-5 fw-normal" style={{color: '#dcf3ff'}}>Track, manage &amp; collaborate on documents with ease!</div>
        <div className="d-flex justify-content-center gap-3 mb-4 flex-wrap">
          <button className="btn btn-success btn-md rounded-pill px-4 fw-semibold shadow-sm" onClick={()=>router.push('/panel/login')}>
            <span role="img" aria-label="dashboard">📋</span> Panel
          </button>
          <button className="btn btn-warning btn-md rounded-pill px-4 fw-semibold shadow-sm text-white" style={{ border: 0 }} onClick={()=>router.push('/admin/login')}>
            <span role="img" aria-label="admin">⚙️</span> Admin
          </button>
          <button className="btn btn-info btn-md rounded-pill px-4 fw-semibold shadow-sm text-white" style={{ border: 0 }} onClick={()=>router.push('/student/login')}>
            <span role="img" aria-label="student">🎓</span> Student
          </button>
          <button className="btn btn-secondary btn-md rounded-pill px-4 fw-semibold shadow-sm" onClick={()=>router.push('/instructor/login')}>
            <span role="img" aria-label="instructor">👨‍🏫</span> Instructor
          </button>
        </div>
        <div className="pt-2 small" style={{color:'#b3cdea'}}>
          <span className="fw-bold">Papertrail</span> &copy; {new Date().getFullYear()} &middot; Documentation made easy.
        </div>
      </div>
    </div>
  );
}
