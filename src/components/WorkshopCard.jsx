import { Link } from "react-router-dom";

export default function WorkshopCard({ data }) {
  const capacity = typeof data.capacity === 'number' && data.capacity > 0 ? data.capacity : 30;
  const filled = typeof data.seatsFilled === 'number' ? data.seatsFilled : 0;
  const isFull = filled >= capacity;

  return (
    <div className="card">
      <h3 className="sub-title">{data.title}</h3>
      <p style={{ marginBottom: "8px" }}>📅 {data.date}</p>

      <p style={{ marginBottom: 12 }}>
        Seats: <strong>{filled}</strong> / <strong>{capacity}</strong> filled
        {isFull && <span className="chip" style={{ marginLeft: 8, background: '#fee2e2', color: 'var(--danger, #c0392b)' }}>Full</span>}
      </p>

      {isFull ? (
        <button className="btn btn-outline" disabled>Workshop Full</button>
      ) : (
        <Link to={`/workshop/${data.id}`}>
          <button className="btn btn-primary">View Details</button>
        </Link>
      )}
    </div>
  );
}
