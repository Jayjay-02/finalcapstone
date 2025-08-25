import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  return (
    <div className="container-fluid px-0" style={{
      minHeight: "100vh",
      background: "linear-gradient(120deg, #f5faff 0%, #e8eaf6 100%)",
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div className="row w-100 justify-content-center align-items-center" style={{minHeight: '100vh'}}>
        <div className="col-11 col-md-8 col-lg-7 col-xl-6 px-0">
          <div className="bg-white shadow rounded-5 border-0 px-4 py-5 text-center position-relative mb-5">
            <div className="mb-2">
              <span className="d-inline-block" style={{fontSize: 64}} role="img" aria-label="books">📚</span>
            </div>
            <div className="fw-bolder mb-2" style={{fontSize: 42, color: '#2460dc', letterSpacing: -2, lineHeight: 1.05}}>
              PaperTrail
            </div>
            <h2 className="text-primary fw-semibold mb-1" style={{fontSize: 22, lineHeight: 1.2}}>
              A Thesis Management System for Environmental Science Department
            </h2>
            <div className="fw-normal text-secondary mb-4 fs-6">Track, manage &amp; collaborate on documents with ease!</div>
            <div className="d-flex flex-wrap justify-content-center gap-2 my-4">
              <button className="btn btn-success btn-sm rounded-pill fw-semibold shadow-sm px-3" onClick={()=>router.push('/panel/login')}>
                <span role="img" aria-label="dashboard">📋</span> Panel
              </button>
              <button className="btn btn-warning btn-sm rounded-pill fw-semibold shadow-sm px-3 text-white" style={{border:0}} onClick={()=>router.push('/admin/login')}>
                <span role="img" aria-label="admin">⚙️</span> Admin
              </button>
              <button className="btn btn-info btn-sm rounded-pill fw-semibold shadow-sm px-3 text-white" style={{border:0}} onClick={()=>router.push('/student/login')}>
                <span role="img" aria-label="student">🎓</span> Student
              </button>
              <button className="btn btn-secondary btn-sm rounded-pill fw-semibold shadow-sm px-3" onClick={()=>router.push('/instructor/login')}>
                <span role="img" aria-label="instructor">👨‍🏫</span> Instructor
              </button>
            </div>
            <div className="pt-2 small text-muted">
              <span className="fw-bold text-primary">Papertrail</span> &copy; {new Date().getFullYear()} &middot; Documentation made easy.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
