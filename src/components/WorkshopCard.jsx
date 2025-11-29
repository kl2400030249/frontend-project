import React from "react";
import { Link } from "react-router-dom";

export default function WorkshopCard({ data }) {
  // data: { id, title, date, desc }
  return (
    <article className="card">
      <h3 className="sub-title">{data.title}</h3>
      <p className="muted">📅 {data.date}</p>
      {data.desc && <p className="muted" style={{ marginTop: 8 }}>{data.desc}</p>}
      <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
        <Link to={`/workshop/${data.id}`} className="btn btn-primary">View Details</Link>
      </div>
    </article>
  );
}
