import "./About.css";

function About() {
  return (
    <section className="about" id="about">
      <div className="about-container">
        <div className="about-text">
          <h2 className="about-title">About Our Platform</h2>
          <p className="about-description">
            Our mission is to connect Muslims worldwide through a safe,
            verified, and respectful matrimony platform. We prioritize
            privacy, authenticity, and fostering meaningful connections.
          </p>

          <div className="about-features">
            <div className="about-feature">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Verified Profiles</span>
            </div>
            <div className="about-feature">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Secure & Private</span>
            </div>
            <div className="about-feature">
              <svg fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>24/7 Support</span>
            </div>
          </div>
        </div>

        <div className="about-image">
          <img src="src/assests/hero-image.jpg" alt="About Us" />
        </div>
      </div>
    </section>
  );
}

export default About;
