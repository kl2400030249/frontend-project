import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const USERS_KEY = "workshop_users";
const CURRENT_USER_KEY = "workshop_current_user";

const seedUsers = () => {
  const existing = localStorage.getItem(USERS_KEY);
  if (existing) return;

  const seed = [
    {
      id: "u-admin",
      name: "Demo Admin",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
    },
    {
      id: "u-student",
      name: "Demo Student",
      email: "student@example.com",
      password: "student123",
      role: "student",
    },
  ];

  localStorage.setItem(USERS_KEY, JSON.stringify(seed));
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem(CURRENT_USER_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      return null;
    }
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Seed demo users on app start
    seedUsers();
  }, []);

  useEffect(() => {
    if (user) localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
    else localStorage.removeItem(CURRENT_USER_KEY);
  }, [user]);

  const findUserByEmail = (email) => {
    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];
    return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  };

  const login = async (email, password) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // simulate delay

    const existing = findUserByEmail(email);
    if (!existing || existing.password !== password) {
      setLoading(false);
      throw new Error("Invalid credentials");
    }

    const safeUser = { id: existing.id, name: existing.name, email: existing.email, role: existing.role };
    setUser(safeUser);
    setLoading(false);

    // Do not navigate here — let caller handle post-login redirect to avoid timing issues
    return safeUser;
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 500)); // simulate delay

    const raw = localStorage.getItem(USERS_KEY);
    const users = raw ? JSON.parse(raw) : [];

    if (users.find((u) => u.email.toLowerCase() === email.toLowerCase())) {
      setLoading(false);
      throw new Error("An account with this email already exists");
    }

    // Admin accounts are pre-provisioned and cannot be created via signup.
    // Enforce 'student' role for all signups to prevent privilege escalation.
    const role = "student";

    const newUser = {
      id: `u-${Date.now()}`,
      name,
      email,
      password,
      role,
    };

    users.push(newUser);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));

    const safeUser = { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role };
    setUser(safeUser);
    setLoading(false);

    // Do not navigate here — let caller handle post-signup redirect
    return safeUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(CURRENT_USER_KEY);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
