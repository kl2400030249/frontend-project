import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  // Do not render navbar unless the user is authenticated
  if (!user) return null;

  const common = (
    <>
      <Link to="/workshops">Workshops</Link>
    </>
  );

  return (
    <nav className="site-nav">
      <div className="nav-inner container">
        <Link to="/" className="brand">WorkshopHub</Link>

        <div className="nav-links">
          {user.role === "student" && (
            <>
              <Link to="/student/dashboard">Dashboard</Link>
              {common}
              <Link to="/student/registrations">My Registrations</Link>
            </>
          )}

          {user.role === "admin" && (
            <>
              <Link to="/admin/dashboard">Admin Dashboard</Link>
              <Link to="/admin/manage">Manage Workshops</Link>
              <Link to="/admin/create">Create Workshop</Link>
            </>
          )}

          <span className="nav-user">{user.name}</span>
          <button className="btn-link" onClick={logout}>Logout</button>
        </div>
      </div>
    </nav>
  );
}
