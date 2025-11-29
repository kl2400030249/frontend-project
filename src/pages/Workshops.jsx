import React, { useEffect, useState } from "react";
import WorkshopCard from "../components/WorkshopCard";

export default function Workshops() {
  const [apiWorkshops, setApiWorkshops] = useState([]);
  const [localWorkshops, setLocalWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=6")
      .then((r) => r.json())
      .then((data) => {
        const mapped = data.map((p) => ({
          id: `api-${p.id}`,
          title: p.title.slice(0, 40),
          date: "2025-04-01",
          desc: p.body.slice(0, 80),
        }));
        setApiWorkshops(mapped);
      })
      .catch((e) => setError("Failed to load workshops"))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("workshops") || "[]");
    setLocalWorkshops(stored);
  }, []);

  const combined = [...localWorkshops, ...apiWorkshops];

  return (
    <div className="container">
      <h1 className="title">Upcoming Workshops</h1>

      {loading && <div className="card">Loading workshops…</div>}
      {error && <div className="card" style={{ color: "red" }}>{error}</div>}

      <div className="grid grid-3" style={{ marginTop: 16 }}>
        {combined.length === 0 && !loading ? (
          <div className="card">No workshops available.</div>
        ) : (
          combined.map((w) => <WorkshopCard key={w.id} data={w} />)
        )}
      </div>
    </div>
  );
}
