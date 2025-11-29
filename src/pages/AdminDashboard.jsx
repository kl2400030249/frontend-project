import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function AdminDashboard() {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const local = JSON.parse(localStorage.getItem("workshops") || "[]");
    setWorkshops(local);
  }, []);

  function handleDelete(id) {
    if (!confirm("Delete this workshop?")) return;
    const updated = workshops.filter((w) => w.id !== id);
    localStorage.setItem("workshops", JSON.stringify(updated));
    setWorkshops(updated);
  }

  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>

      <div style={{ marginTop: 12 }}>
        <Link to="/admin/create" className="btn btn-primary">Create New Workshop</Link>
      </div>

      <div style={{ marginTop: 18 }}>
        {workshops.length === 0 ? (
          <div className="card">No created workshops yet.</div>
        ) : (
          workshops.map((w) => (
            <div key={w.id} className="card" style={{ marginBottom: 12 }}>
              <h3 className="sub-title">{w.title}</h3>
              <p className="muted">📅 {w.date}</p>
              <div style={{ marginTop: 8 }}>
                <button className="btn btn-ghost" onClick={() => handleDelete(w.id)}>Delete</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
