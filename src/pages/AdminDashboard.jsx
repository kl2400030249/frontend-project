import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllWorkshops, getWorkshopRegistrations } from "../api/workshopService";

export default function AdminDashboard() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalWorkshops, setTotalWorkshops] = useState(0);
  const [totalRegistrations, setTotalRegistrations] = useState(0);
  const [fullWorkshops, setFullWorkshops] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const workshops = await getAllWorkshops();
        if (!mounted) return;
        setTotalWorkshops(workshops.length);

        const pairs = await Promise.all(
          workshops.map(async (w) => {
            const regs = await getWorkshopRegistrations(w.id);
            const capacity = typeof w.capacity === 'number' && w.capacity > 0 ? w.capacity : 30;
            return { id: w.id, regs: regs || [], capacity };
          })
        );

        if (!mounted) return;
        const totalRegs = pairs.reduce((sum, p) => sum + (p.regs ? p.regs.length : 0), 0);
        const fullCount = pairs.reduce((sum, p) => sum + ((p.regs ? p.regs.length : 0) >= p.capacity ? 1 : 0), 0);

        setTotalRegistrations(totalRegs);
        setFullWorkshops(fullCount);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load dashboard data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => (mounted = false);
  }, []);

  return (
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12 }}>
        <h1 className="title">Admin Dashboard</h1>
        <Link to="/admin/create">
          <button className="btn btn-primary">Create New Workshop</button>
        </Link>
      </div>

      <div style={{ marginTop: 20 }}>
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: 'var(--danger, #c0392b)' }}>{error}</p>
        ) : (
          <div className="stat-cards">
            <div className="stat-card card">
              <h3 className="sub-title">Total Workshops</h3>
              <p className="number">{totalWorkshops}</p>
              <p className="muted">Workshops in the system</p>
            </div>

            <div className="stat-card card">
              <h3 className="sub-title">Total Registrations</h3>
              <p className="number">{totalRegistrations}</p>
              <p className="muted">Sum of all workshop registrations</p>
            </div>

            <div className="stat-card card">
              <h3 className="sub-title">Full Workshops</h3>
              <p className="number">{fullWorkshops}</p>
              <p className="muted">Workshops that have reached capacity</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
