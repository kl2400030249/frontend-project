import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getStudentRegistrations, getAllWorkshops } from "../api/workshopService";

export default function Registrations() {
  const { user } = useAuth();
  const [regs, setRegs] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        if (!user) {
          setRegs([]);
          setWorkshops([]);
          return;
        }

        const [r, w] = await Promise.all([getStudentRegistrations(user.email), getAllWorkshops()]);
        if (!mounted) return;
        setRegs(r || []);
        setWorkshops(w || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load registrations");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => (mounted = false);
  }, [user]);

  if (loading) return <div className="container">Loading...</div>;

  if (!user) {
    return (
      <div className="container">
        <h1 className="title">My Registrations</h1>
        <p>Please log in to view your registrations.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <h1 className="title">My Registrations</h1>
        <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>
      </div>
    );
  }

  if (!regs.length) {
    return (
      <div className="container">
        <h1 className="title">My Registrations</h1>
        <p>You haven't registered for any workshops yet. When you do, they'll appear here.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="title">My Registrations</h1>

      <div className="list">
        {regs.map((r) => {
          const wk = workshops.find((w) => w.id === r.workshopId) || { id: r.workshopId, title: "Unknown workshop", date: "-", description: "" };

          // determine status: Upcoming if date >= today, Completed if date < today
          const wkDate = wk.date ? new Date(wk.date) : null;
          const today = new Date();
          // normalize dates to YYYY-MM-DD for comparison
          const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isUpcoming = wkDate ? wkDate >= startOfToday : false;

          return (
            <div key={`${r.workshopId}-${r.studentEmail}`} className="card" style={{ marginBottom: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                <div>
                  <h3 className="sub-title" style={{ marginBottom: 6 }}>{wk.title}</h3>
                  <p className="muted" style={{ marginBottom: 8 }}>{wk.date}</p>
                  <p style={{ marginBottom: 10 }}>{wk.description}</p>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`chip ${isUpcoming ? 'badge-upcoming' : 'badge-completed'}`} style={{ marginBottom: 8, display: 'inline-block' }}>{isUpcoming ? 'Upcoming' : 'Completed'}</span>

                  <div style={{ marginTop: 12, display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
                    <Link className="btn btn-outline" to={`/workshop/${wk.id}`}>View Details</Link>
                    <button className="btn btn-success" onClick={(e) => e.preventDefault()}>Join Session</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
