import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createWorkshop } from "../api/workshopService";

export default function CreateWorkshop() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const { user } = useAuth();

  async function handleCreate() {
    if (!title || !date || !desc) {
      alert("All fields are required!");
      return;
    }

    try {
      await createWorkshop({ title, description: desc, date, createdBy: user.email });
      alert('Workshop Created Successfully!');
      setTitle('');
      setDate('');
      setDesc('');
    } catch (err) {
      alert(err?.message || 'Failed to create workshop');
    }
  }

  return (
    <div className="container" style={{ maxWidth: "600px" }}>
      <h1 className="title">Create Workshop</h1>

      <input placeholder="Workshop Title" value={title} onChange={(e) => setTitle(e.target.value)} />

      <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ marginTop: "15px" }} />

      <textarea
        placeholder="Description"
        style={{ marginTop: "15px", height: "120px" }}
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      ></textarea>

      <button className="btn btn-primary" style={{ marginTop: "20px", width: "100%" }} onClick={handleCreate}>
        Create Workshop
      </button>
    </div>
  );
}
