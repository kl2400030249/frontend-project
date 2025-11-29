import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function validateEmail(e) {
    const re = /\S+@\S+\.\S+/;
    return re.test(e);
  }

  function handleSubmit(ev) {
    ev.preventDefault();
    if (!email || !password) {
      setError("All fields required.");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email.");
      return;
    }

    // For hackathon, we do front-end auth (localStorage)
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("userEmail", email);
    setError("");
    navigate("/workshops");
    window.location.reload();
  }

  return (
    <div className="container" style={{ maxWidth: 480 }}>
      <div className="card">
        <h1 className="title">Login</h1>

        {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" style={{ marginTop: 12 }} value={password} onChange={(e) => setPassword(e.target.value)} />

          <div style={{ marginTop: 16 }}>
            <button className="btn btn-primary" type="submit" style={{ width: "100%" }}>Login</button>
          </div>
        </form>
      </div>
    </div>
  );
}
