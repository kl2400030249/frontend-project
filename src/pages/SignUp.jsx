import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup, loading } = useAuth();
  const navigate = useNavigate();

  async function handleSignUp(e) {
    e.preventDefault();

    if (!name || !email || !password) {
      setError("All fields are required.");
      return;
    }

    try {
      setError("");
      // Note: Admin accounts are pre-provisioned; signup always creates students.
      const u = await signup({ name, email, password });

      // After signup, explicit redirect (signup always creates students)
      if (u && u.role === "admin") navigate("/admin/dashboard", { replace: true });
      else navigate("/student/dashboard", { replace: true });
    } catch (err) {
      setError(err.message || 'Signup failed');
    }
  }

  return (
    <div className="container auth-card">
      <h1 className="title">Create Account</h1>

      {error && <p style={{ color: "var(--danger, #c0392b)" }}>{error}</p>}

      <form className="login-form" onSubmit={handleSignUp}>
        <input type="text" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button className="btn btn-success" disabled={loading}>{loading ? 'Creating...' : 'Create account'}</button>
      </form>
    </div>
  );
}
