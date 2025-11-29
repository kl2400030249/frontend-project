import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    if (!email || !password) {
      setError("All fields are required.");
      return;
    }

    if (!email.includes("@")) {
      setError("Enter a valid email.");
      return;
    }

    setError("");
    localStorage.setItem("loggedIn", "true");
    alert("Login Successful!");
  }

  return (
    <div className="container" style={{ maxWidth: "450px" }}>
      <h1 className="title">Login</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleLogin}>
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />

        <input
          type="password"
          placeholder="Password"
          style={{ marginTop: "15px" }}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="btn btn-primary" style={{ marginTop: "20px", width: "100%" }}>
          Login
        </button>
      </form>
    </div>
  );
}
