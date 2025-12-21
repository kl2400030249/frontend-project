import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container hero">
      <div className="hero-content">
        <div className="hero-icon" aria-hidden>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.5C3 6.5 8 3 12 3s9 3.5 9 3.5v11C21 17 16 14.5 12 14.5S3 17 3 17v-10.5z" stroke="#06b6a4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 14.5v4.5" stroke="#06b6a4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <h1 className="hero-title">WorkshopHub</h1>

        <p className="hero-subtitle">
          Join interactive workshops, learn new skills, and connect with experts. Your journey to knowledge
          starts here.
        </p>

        <div className="hero-buttons">
          <Link to="/login" className="btn btn-success">Login as Student</Link>
          <Link to="/login" className="btn btn-outline">Login as Admin</Link>
        </div>
      </div>
    </div>
  );
}
