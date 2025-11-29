import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div className="navbar">
      <h2>WorkshopHub</h2>
      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/workshops">Workshops</Link>
        <Link to="/admin">Admin</Link>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
}
