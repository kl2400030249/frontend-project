import { Link } from "react-router-dom";

export default function WorkshopCard({ data }) {
  return (
    <div className="card">
      <h3 className="sub-title">{data.title}</h3>
      <p style={{ marginBottom: "10px" }}>📅 {data.date}</p>

      <Link to={`/workshop/${data.id}`}>
        <button className="btn btn-primary">View Details</button>
      </Link>
    </div>
  );
}
