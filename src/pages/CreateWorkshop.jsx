import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { createWorkshop } from "../api/workshopService";

export default function CreateWorkshop() {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [desc, setDesc] = useState("");
  const [capacity, setCapacity] = useState(30);
  const [error, setError] = useState("");
  const [capacityError, setCapacityError] = useState("");
  const { user } = useAuth();

  async function handleCreate() {
    setError("");
    setCapacityError("");

    if (!title || !date || !desc) {
      setError("All fields are required");
      return;
    }

    const capNum = Number(capacity);
    if (!capNum || capNum <= 0) {
      setCapacityError("Capacity must be a number greater than 0");
      return;
    }

    try {
      await createWorkshop({ title, description: desc, date, createdBy: user.email, capacity: capNum });
      alert('Workshop Created Successfully!');
      setTitle('');
      setDate('');
      setDesc('');
      setCapacity(30);
    } catch (err) {
      setError(err?.message || 'Failed to create workshop');
    }
  }

  return (
    <div className="container" style={{ maxWidth: "760px" }}>
      <h1 className="title">Create Workshop</h1>

      <div className="card" style={{ maxWidth: 680, margin: '12px auto', padding: 20 }}>
        {error && <p style={{ color: 'var(--danger, #c0392b)' }}>{error}</p>}

        <section className="section" aria-labelledby="workshop-info">
          <h3 id="workshop-info" className="sub-title">Workshop Info</h3>

          <label htmlFor="title" style={{ display: 'block', fontWeight: 700, marginBottom: 6 }}>Title</label>
          <input id="title" className="form-control" placeholder="Enter workshop title" value={title} onChange={(e) => setTitle(e.target.value)} />

          <label htmlFor="date" style={{ display: 'block', fontWeight: 700, marginTop: 12, marginBottom: 6 }}>Date</label>
          <input id="date" className="form-control" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </section>

        <section className="section" aria-labelledby="workshop-desc" style={{ marginTop: 12 }}>
          <h3 id="workshop-desc" className="sub-title">Description</h3>
          <label htmlFor="description" style={{ display: 'block', fontWeight: 700, marginBottom: 6 }}>Summary</label>
          <textarea
            id="description"
            className="form-control"
            placeholder="Short description of the workshop"
            style={{ height: "120px" }}
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          ></textarea>
        </section>

        <section className="section" aria-labelledby="workshop-capacity" style={{ marginTop: 12 }}>
          <h3 id="workshop-capacity" className="sub-title">Capacity</h3>
          <label htmlFor="capacity" style={{ display: 'block', fontWeight: 700, marginBottom: 6 }}>Maximum attendees</label>
          <input
            id="capacity"
            className="form-control"
            type="number"
            min={1}
            value={capacity}
            onChange={(e) => { setCapacity(e.target.value); setCapacityError(""); }}
            style={{ width: 140 }}
          />
          <p className="muted" style={{ fontSize: 13, marginTop: 8 }}>Maximum number of students allowed to register</p>
          {capacityError && <p style={{ color: 'var(--danger, #c0392b)' }}>{capacityError}</p>}
        </section>

        <div style={{ marginTop: 18 }}>
          <button className="btn btn-primary" style={{ width: "100%" }} onClick={handleCreate}>
            Create Workshop
          </button>
        </div>
      </div>
    </div>
  );
}
