import { useEffect, useState } from "react";
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

      <ul className="workshop-list">
        {regs.map((r) => {
          const wk = workshops.find((w) => w.id === r.workshopId) || { title: "Unknown workshop", date: "-", description: "" };
          return (
            <li key={`${r.workshopId}-${r.studentEmail}`} className="workshop-item">
              <h3>{wk.title}</h3>
              <p className="muted">{wk.date}</p>
              <p>{wk.description}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
