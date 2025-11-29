import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreateWorkshop from "./pages/CreateWorkshop";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop/:id" element={<WorkshopDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateWorkshop />} />
      </Routes>
    </BrowserRouter>
  );
}
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails";
import Login from "./pages/Login";
import AdminDashboard from "./pages/AdminDashboard";
import CreateWorkshop from "./pages/CreateWorkshop";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop/:id" element={<WorkshopDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/create" element={<CreateWorkshop />} />
      </Routes>

      {/* FOOTER */}
      <footer className="footer">
        <div className="container footer-inner">
          <p>© 2025 WorkshopHub — Learn. Grow. Build.</p>

          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms</a>
            <a href="#">Support</a>
          </div>
        </div>
      </footer>
    </BrowserRouter>
  );
}
