import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Workshops from "./pages/Workshops";
import WorkshopDetails from "./pages/WorkshopDetails";
import AdminDashboard from "./pages/AdminDashboard";
import CreateWorkshop from "./pages/CreateWorkshop";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import StudentDashboard from "./pages/StudentDashboard";
import Registrations from "./pages/Registrations";
import ManageWorkshops from "./pages/ManageWorkshops";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./router/ProtectedRoute";
import RoleRoute from "./router/RoleRoute";
import Navbar from "./components/Navbar";

function Content() {
  const location = useLocation();
  const authPaths = ["/login", "/signup"];
  const isAuth = authPaths.includes(location.pathname);

  return (
    <>
      <Navbar />
      <main className={`main-content ${isAuth ? "auth-page" : ""}`}>
        <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/workshops" element={<Workshops />} />
        <Route path="/workshop/:id" element={<WorkshopDetails />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Student dashboard (authenticated) */}
        <Route
          path="/student/dashboard"
          element={<ProtectedRoute><StudentDashboard /></ProtectedRoute>}
        />
        <Route path="/student" element={<ProtectedRoute><Navigate to="/student/dashboard" replace /></ProtectedRoute>} />
        <Route path="/student/registrations" element={<ProtectedRoute><Registrations /></ProtectedRoute>} />

        {/* Admin-only routes */}
        <Route
          path="/admin/dashboard"
          element={<RoleRoute role="admin"><AdminDashboard /></RoleRoute>}
        />
        <Route path="/admin" element={<RoleRoute role="admin"><Navigate to="/admin/dashboard" replace /></RoleRoute>} />
        <Route
          path="/admin/manage"
          element={<RoleRoute role="admin"><ManageWorkshops /></RoleRoute>}
        />
        <Route
          path="/admin/create"
          element={<RoleRoute role="admin"><CreateWorkshop /></RoleRoute>}
        />

        {/* Fallback: always go to home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </main>
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Content />
      </AuthProvider>
    </BrowserRouter>
  );
}
