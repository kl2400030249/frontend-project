import React from "react";
import { Link } from "react-router-dom";

export default function WorkshopCard({ data }) {
  return (
    <div className="card workshop-card">
      <span className="category-tag">🔥 Trending</span>

      <h3 className="sub-title">{data.title}</h3>
      <p className="muted">📅 {data.date}</p>

      {data.desc && <p style={{ marginTop: 8 }}>{data.desc}</p>}

      <Link
        to={`/workshop/${data.id}`}
        className="btn btn-primary"
        style={{ marginTop: "15px" }}
      >
        View Details →
      </Link>
    </div>
  );
}
