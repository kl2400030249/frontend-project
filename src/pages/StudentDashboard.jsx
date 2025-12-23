import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getStudentRegistrations, getAllWorkshops } from "../api/workshopService";

export default function StudentDashboard() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        if (!user) {
          setRegistrations([]);
          setWorkshops([]);
          return;
        }

        const [r, w] = await Promise.all([getStudentRegistrations(user.email), getAllWorkshops()]);
        if (!mounted) return;
        setRegistrations(r || []);
        setWorkshops(w || []);
      } catch (err) {
        if (!mounted) return;
        setError(err.message || "Failed to load dashboard data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => (mounted = false);
  }, [user]);

  // derive counts
  const startOfToday = new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate());

  const regWorkshops = registrations
    .map((r) => workshops.find((w) => w.id === r.workshopId))
    .filter(Boolean);

  const totalRegistrations = registrations.length;
  const upcomingCount = regWorkshops.filter((w) => (w.date ? new Date(w.date) >= startOfToday : false)).length;
  const completedCount = regWorkshops.filter((w) => (w.date ? new Date(w.date) < startOfToday : false)).length;

  return (
    <div className="container">
      <h1 className="title">Student Dashboard</h1>
      <p>Welcome to your dashboard — view your registered workshops and progress here.</p>

      <section style={{ marginTop: 20 }} aria-label="Dashboard summary">
        <h2 className="sub-title" style={{ marginBottom: 12 }}>Dashboard Summary</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>
        ) : (
          <div className="stat-cards">
            <div className="stat-card">
              <h3 className="sub-title">Registered Workshops</h3>
              <p className="number">{totalRegistrations}</p>
              <p className="muted">Total workshops you've registered for</p>
            </div>

            <div className="stat-card">
              <h3 className="sub-title">Upcoming Workshops</h3>
              <p className="number">{upcomingCount}</p>
              <p className="muted">Workshops scheduled for today or later</p>
            </div>

            <div className="stat-card">
              <h3 className="sub-title">Completed Workshops</h3>
              <p className="number">{completedCount}</p>
              <p className="muted">Workshops with a past date</p>
            </div>
          </div>
        )}
      </section>

      <section style={{ marginTop: 20 }} aria-label="Next workshop">
        <h2 className="sub-title" style={{ marginBottom: 12 }}>Next Workshop</h2>

        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>
        ) : (() => {
          const upcoming = regWorkshops
            .filter((w) => (w.date ? new Date(w.date) >= startOfToday : false))
            .sort((a, b) => new Date(a.date) - new Date(b.date));
          const next = upcoming[0] || null;

          if (!next) {
            return <p>You have no upcoming workshops.</p>;
          }

          return (
            <div className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12 }}>
                <div>
                  <h3 className="sub-title">{next.title}</h3>
                  <p className="muted" style={{ marginBottom: 8 }}>{next.date}</p>
                  <p style={{ marginBottom: 12 }}>{next.description}</p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'flex-end' }}>
                  <div style={{ marginBottom: 8 }}>
                    <a className="btn btn-outline" href={`/workshop/${next.id}`}>View Details</a>
                  </div>
                  <button className="btn btn-success" onClick={(e) => e.preventDefault()}>Join Session</button>
                </div>
              </div>
            </div>
          );
        })()}
      </section>
    </div>
  );
}
