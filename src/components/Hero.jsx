
import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../assests/hero.png";

function Hero() {
  const features = ["Verified Profiles", "Secure Messaging", "24/7 Support"];

  return (
    <section
      className="hero"
      style={{ backgroundImage: `url(${heroImage})` }}
    >
      <div className="hero-overlay"></div>

      <div className="hero-floating">
        <div className="float1"></div>
        <div className="float2"></div>
      </div>

      <div className="hero-content">
        <div className="hero-text">
          <span className="hero-subtitle">
            بِسْمِ ٱللّٰهِ ٱلرَّحْمٰنِ ٱلرَّحِيمِ
          </span>

          <h1 className="hero-title">
            <span>Where Faith</span>
            <span>Meets Compatibility</span>
          </h1>

          <p className="hero-description">
           A trusted Islamic matchmaking platform designed to help Muslims connect safely, sincerely, and with purpose.
          </p>

          <div className="hero-cta">
            <Link to="/register" className="btn-primary">Get Started Free</Link>
            <Link to="/login" className="btn-secondary">Log In</Link>
          </div>

          <div className="hero-features">
            {features.map((item, i) => (
              <div key={i} className="hero-feature-item">
                <svg fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
