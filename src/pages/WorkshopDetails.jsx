import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getAllWorkshops, getWorkshopRegistrations, registerForWorkshop } from "../api/workshopService";

export default function WorkshopDetails() {
  const { id } = useParams();
  const { user } = useAuth();

  const [workshop, setWorkshop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [regLoading, setRegLoading] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      try {
        const all = await getAllWorkshops();
        const found = all.find((w) => w.id === id) || null;
        if (!mounted) return;
        setWorkshop(found);

        // check registration status if user is student
        if (user && user.role === "student") {
          const regs = await getWorkshopRegistrations(id);
          const exists = regs.some((r) => r.studentEmail.toLowerCase() === user.email.toLowerCase());
          setRegistered(Boolean(exists));
        }
      } catch (err) {
        setMessage(err.message || "Failed to load workshop");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [id, user]);

  async function handleRegister() {
    if (!user) {
      setMessage("You must be logged in as a student to register.");
      return;
    }

    if (user.role !== "student") {
      setMessage("Only students can register for workshops.");
      return;
    }

    setRegLoading(true);
    setMessage("");

    try {
      await registerForWorkshop(id, user.email);
      setRegistered(true);
      setMessage("Successfully registered.");
    } catch (err) {
      setMessage(err.message || "Registration failed");
    } finally {
      setRegLoading(false);
    }
  }

  if (loading) return <div className="container">Loading...</div>;
  if (!workshop) return <div className="container">Workshop not found.</div>;

  return (
    <div className="container">
      <h1 className="title">{workshop.title}</h1>
      <p className="muted">{workshop.date}</p>
      <p>{workshop.description}</p>

      {user && user.role === "student" ? (
        <div style={{ marginTop: 16 }}>
          {registered ? (
            <span className="chip">Already registered</span>
          ) : (
            <button className="btn btn-success" disabled={regLoading} onClick={handleRegister}>
              {regLoading ? "Registering..." : "Register for Workshop"}
            </button>
          )}

          {message && <p style={{ marginTop: 8, color: registered ? "green" : "var(--danger, #c0392b)" }}>{message}</p>}
        </div>
      ) : (
        !user && <p>Please log in as a student to register for this workshop.</p>
      )}

      <h2 className="sub-title">Training Materials</h2>
      <ul className="material-list">
        <li>📄 PDF Notes</li>
        <li>🎥 Session Recording</li>
      </ul>

      <button className="btn btn-primary" style={{ marginTop: "20px" }}>
        Join Live Session
      </button>
    </div>
  );
}
