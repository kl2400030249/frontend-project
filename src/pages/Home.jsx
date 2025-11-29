import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>

      {/* Decorative wave divider */}
      <div className="wave-divider"></div>

      {/* HERO SECTION */}
      <div className="home-hero">
        <div className="home-content card home-card">
          <span className="tag">✨ Online Workshops Platform</span>

          <h1 className="title home-title">
            Learn, Grow & Build Skills with <span className="highlight">WorkshopHub</span>
          </h1>

          <p className="lead home-lead">
            Register for workshops, join live sessions, access materials, and improve your skills — all in one place.
          </p>

          <div className="hero-buttons">
            <Link to="/workshops" className="btn btn-primary hero-btn">Browse Workshops</Link>
            <Link to="/login" className="btn btn-success hero-outline">Join Now</Link>
          </div>

          <div className="stats-row">
            <div className="stat-box">
              <h2>20+</h2>
              <p>Live Workshops</p>
            </div>
            <div className="stat-box">
              <h2>500+</h2>
              <p>Active Learners</p>
            </div>
            <div className="stat-box">
              <h2>30+</h2>
              <p>Expert Mentors</p>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES SECTION */}
      <section className="features-section container animate-up">
        <h2 className="title section-title">Why Choose WorkshopHub?</h2>

        <div className="grid grid-3 features-grid">
          <div className="feature-card card">
            <div className="feature-icon">📚</div>
            <h3>High Quality Workshops</h3>
            <p>Expert instructors, curated sessions, and industry-ready content.</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">🎥</div>
            <h3>Live Interactive Sessions</h3>
            <p>Attend live sessions, ask questions, and engage with mentors.</p>
          </div>

          <div className="feature-card card">
            <div className="feature-icon">📄</div>
            <h3>Materials & Resources</h3>
            <p>Access PDF notes, recordings, and assignments anytime.</p>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="testimonials-section animate-up">
        <h2 className="title section-title center">What Our Learners Say</h2>

        <div className="testimonials container">
          <div className="testimonial-card card">
            <p>“Amazing workshops! I learned so much and the mentors were super friendly.”</p>
            <h4>- Priya</h4>
          </div>

          <div className="testimonial-card card">
            <p>“Very well organized and easy to access. Loved the materials!”</p>
            <h4>- Rohan</h4>
          </div>

          <div className="testimonial-card card">
            <p>“Helped me build confidence in skills I never tried before.”</p>
            <h4>- Sneha</h4>
          </div>
        </div>
      </section>

    </div>
  );
}
