import { useEffect, useState } from "react";
import { getAllWorkshops, deleteWorkshop } from "../api/workshopService";

export default function ManageWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async () => {
    try {
      setLoading(true);
      const all = await getAllWorkshops();
      setWorkshops(all);
    } catch (err) {
      setWorkshops([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!confirm('Delete this workshop?')) return;
    try {
      await deleteWorkshop(id);
      await load();
    } catch (err) {
      alert(err?.message || 'Failed to delete workshop');
    }
  };

  return (
    <div className="container">
      <h1 className="title">Manage Workshops</h1>

      {loading ? (
        <p>Loading...</p>
      ) : workshops.length === 0 ? (
        <p>No workshops created yet.</p>
      ) : (
        <div className="list">
          {workshops.map((w) => (
            <div key={w.id} className="card" style={{ marginBottom: "12px" }}>
              <h3 className="sub-title">{w.title}</h3>
              <p>📅 {w.date}</p>
              <p style={{ marginBottom: "10px" }}>{w.description}</p>
              <button className="btn btn-danger" onClick={() => handleDelete(w.id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
