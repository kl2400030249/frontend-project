import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function WorkshopDetails() {
  const { id } = useParams();
  const [workshop, setWorkshop] = useState(null);
  const [registered, setRegistered] = useState(false);

  useEffect(() => {
    // Try localStorage first
    const local = JSON.parse(localStorage.getItem("workshops") || "[]");
    const foundLocal = local.find((w) => String(w.id) === String(id) || String(w.id) === id);
    if (foundLocal) {
      setWorkshop(foundLocal);
      return;
    }

    // fallback: fetch fake API item if id starts with "api-"
    if (String(id).startsWith("api-")) {
      const numeric = id.replace("api-", "");
      fetch(`https://jsonplaceholder.typicode.com/posts/${numeric}`)
        .then((r) => r.json())
        .then((p) => {
          setWorkshop({
            id,
            title: p.title,
            date: "2025-04-01",
            desc: p.body,
          });
        })
        .catch(() => setWorkshop(null));
    } else {
      setWorkshop(null);
    }
  }, [id]);

  useEffect(() => {
    const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
    setRegistered(regs.some((r) => String(r.id) === String(id)));
  }, [id]);

  function handleRegister() {
    const regs = JSON.parse(localStorage.getItem("registrations") || "[]");
    if (regs.some((r) => String(r.id) === String(id))) {
      alert("You are already registered.");
      setRegistered(true);
      return;
    }
    const entry = { id, date: new Date().toISOString() };
    localStorage.setItem("registrations", JSON.stringify([...regs, entry]));
    alert("Registered successfully!");
    setRegistered(true);
  }

  if (!workshop) {
    return (
      <div className="container">
        <div className="card">Workshop not found.</div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="card">
        <h1 className="title">{workshop.title}</h1>
        <p className="muted">📅 {workshop.date}</p>
        <p style={{ marginTop: 12 }}>{workshop.desc}</p>

        <div style={{ marginTop: 18 }}>
          <button className="btn btn-success" onClick={handleRegister} disabled={registered}>
            {registered ? "Registered" : "Register"}
          </button>

          <button
            className="btn btn-primary"
            style={{ marginLeft: 12 }}
            onClick={() => window.open("https://meet.google.com", "_blank")}
          >
            Join Live Session
          </button>
        </div>

        <h3 className="sub-title" style={{ marginTop: 18 }}>Materials</h3>
        <ul className="material-list">
          <li>📄 PDF Notes (sample)</li>
          <li>🎥 Recording Link (sample)</li>
        </ul>
      </div>
    </div>
  );
}
