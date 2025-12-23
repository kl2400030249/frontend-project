import { useEffect, useState } from "react";
import { getAllWorkshops, deleteWorkshop, getWorkshopRegistrations } from "../api/workshopService";

export default function ManageWorkshops() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);

  // registrationsById: { [workshopId]: { loading, error, regs } }
  const [registrationsById, setRegistrationsById] = useState({});
  const [expanded, setExpanded] = useState({});

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
      // remove registrations cache for deleted workshop
      setRegistrationsById((prev) => {
        const copy = { ...prev };
        delete copy[id];
        return copy;
      });
      await load();
    } catch (err) {
      alert(err?.message || 'Failed to delete workshop');
    }
  };

  const toggleRegistrations = async (workshopId) => {
    setExpanded((prev) => ({ ...prev, [workshopId]: !prev[workshopId] }));

    // if expanding and we don't have data yet, fetch
    if (!expanded[workshopId]) {
      setRegistrationsById((prev) => ({ ...prev, [workshopId]: { loading: true, error: "", regs: [] } }));
      try {
        const regs = await getWorkshopRegistrations(workshopId);
        setRegistrationsById((prev) => ({ ...prev, [workshopId]: { loading: false, error: "", regs } }));
      } catch (err) {
        setRegistrationsById((prev) => ({ ...prev, [workshopId]: { loading: false, error: err?.message || "Failed to load registrations", regs: [] } }));
      }
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
          {workshops.map((w) => {
            const info = registrationsById[w.id] || { loading: false, error: "", regs: [] };
            const isExpanded = Boolean(expanded[w.id]);

            return (
              <div key={w.id} className="card" style={{ marginBottom: "12px" }}>
                <h3 className="sub-title">{w.title}</h3>
                <p>📅 {w.date}</p>
                <p style={{ marginBottom: "10px" }}>{w.description}</p>

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <button className="btn btn-outline" onClick={() => toggleRegistrations(w.id)}>
                    {isExpanded ? "Hide Registrations" : "View Registrations"}
                  </button>

                  <button className="btn btn-danger" onClick={() => handleDelete(w.id)}>Delete</button>
                </div>

                {isExpanded && (
                  <div style={{ marginTop: 12, paddingLeft: 8 }}>
                    {info.loading ? (
                      <p>Loading registrations...</p>
                    ) : info.error ? (
                      <p style={{ color: "var(--danger, #c0392b)" }}>{info.error}</p>
                    ) : info.regs.length === 0 ? (
                      <p>No students have registered yet.</p>
                    ) : (
                      <div>
                        <p>Total registrations: {info.regs.length}</p>
                        <ul>
                          {info.regs.map((r) => (
                            <li key={`${r.workshopId}-${r.studentEmail}`}>{r.studentEmail}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
