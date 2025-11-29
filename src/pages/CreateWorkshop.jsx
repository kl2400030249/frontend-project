import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CreateWorkshop() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const navigate = useNavigate();

  function handleCreate() {
    if (!title.trim() || !date || !desc.trim()) {
      alert("All fields are required.");
      return;
    }
    const old = JSON.parse(localStorage.getItem("workshops") || "[]");
    const newWorkshop = { id: Date.now(), title: title.trim(), date, desc: desc.trim() };
    localStorage.setItem("workshops", JSON.stringify([newWorkshop, ...old]));
    alert("Workshop created!");
    navigate("/workshops");
  }

  return (
    <div className="container" style={{ maxWidth: 700 }}>
      <div className="card">
        <h1 className="title">Create Workshop</h1>

        <label className="label">Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Workshop title" />

        <label className="label" style={{ marginTop: 12 }}>Date</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

        <label className="label" style={{ marginTop: 12 }}>Description</label>
        <textarea value={desc} onChange={(e) => setDesc(e.target.value)} placeholder="Short description" />

        <div style={{ marginTop: 16 }}>
          <button className="btn btn-primary" onClick={handleCreate}>Create Workshop</button>
        </div>
      </div>
    </div>
  );
}
