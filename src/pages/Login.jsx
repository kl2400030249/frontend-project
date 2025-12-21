import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login, loading, user } = useAuth();
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }

    try {
      setError("");
      const u = await login(email, password);

      // Role-based redirect after successful login
      if (u && u.role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate("/student/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || "Login failed");
    }
  }

  return (
    <div className="container auth-card">
      <h1 className="title">Login</h1>

      {error && <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>}

      <form className="login-form" onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="Password"
          style={{ marginTop: "15px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-success" disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>

        <p className="signup-text">
          New user? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </div>
  );
}
