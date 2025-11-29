import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem("loggedIn") === "true";

  function handleLogout() {
    localStorage.removeItem("loggedIn");
    // optionally remove user info
    navigate("/");
    // reload to refresh UI if needed
    window.location.reload();
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <div className="brand" onClick={() => navigate("/")}>WorkshopHub</div>

        <nav className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/workshops">Workshops</Link>
          <Link to="/admin">Admin</Link>
          {!loggedIn ? (
            <Link to="/login" className="btn-link">Login</Link>
          ) : (
            <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
          )}
        </nav>
      </div>
    </header>
  );
}
