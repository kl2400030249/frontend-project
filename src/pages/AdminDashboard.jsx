import { Link } from "react-router-dom";

export default function AdminDashboard() {
  return (
    <div className="container">
      <h1 className="title">Admin Dashboard</h1>

      <Link to="/admin/create">
        <button className="btn btn-primary">Create New Workshop</button>
      </Link>

      <div className="card" style={{ marginTop: "30px" }}>
        <h3 className="sub-title">Registrations</h3>
        <p>12 users registered for "Web Dev Bootcamp"</p>
      </div>
    </div>
  );
}
