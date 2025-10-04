// 📂 app/admin/search-thesis.tsx

import "bootstrap/dist/css/bootstrap.min.css";
import React, { useEffect, useState } from "react";

interface Thesis {
  title: string;
  year: number;
  authors: string[];
}

export default function SearchThesis() {
  const [query, setQuery] = useState("");
  const [thesisList, setThesisList] = useState<Thesis[]>([]);
  const [results, setResults] = useState<Thesis[]>([]);

  // ✅ Load thesis projects from localStorage (later you can connect DB)
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("thesisList") || "[]");
    setThesisList(stored);
  }, []);

  // ✅ Search thesis projects
  const handleSearch = () => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    const filtered = thesisList.filter((thesis) =>
      thesis.title.toLowerCase().includes(query.toLowerCase())
    );
    setResults(filtered);
  };

  return (
    <div className="container p-4">
      <h2 className="fw-bold">📚 Thesis Project Search</h2>
      <p className="text-muted">
        Use this search to check if a thesis project already exists and avoid duplicates.
      </p>

      {/* 🔍 Search Bar */}
      <div className="d-flex mb-3">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Enter thesis title keywords..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="btn btn-dark" onClick={handleSearch}>
          Search
        </button>
      </div>

      {/* 📊 Results */}
      {results.length > 0 ? (
        <div className="table-responsive">
          <table className="table table-bordered">
            <thead className="bg-light">
              <tr>
                <th>Thesis Title</th>
                <th>Year</th>
                <th>Authors</th>
              </tr>
            </thead>
            <tbody>
              {results.map((thesis, index) => (
                <tr key={index}>
                  <td>{thesis.title}</td>
                  <td>{thesis.year}</td>
                  <td>{thesis.authors.join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        query && (
          <div className="alert alert-warning">
            ⚠ No matching thesis found for "{query}"
          </div>
        )
      )}
    </div>
  );
}
