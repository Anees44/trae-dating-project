// import { Link } from "react-router-dom";
// import { useEffect, useRef } from "react";
// import intro from "../assests/intro.mp4";
// import "./Hero.css";

// function Hero() {
//   const videoRef = useRef(null);

//   useEffect(() => {
//     if (videoRef.current) {
//       videoRef.current.play().catch(() => {});
//     }
//   }, []);

//   const features = ["Verified Profiles", "Secure & Private", "24/7 Support"];

//   return (
//     <section className="hero">
//       <video ref={videoRef} autoPlay loop muted playsInline className="hero-video">
//         <source src={intro} type="video/mp4" />
//       </video>

//       <div className="hero-overlay"></div>

//       <div className="hero-floating">
//         <div className="float1"></div>
//         <div className="float2"></div>
//       </div>

//       <div className="hero-content">
//         <div className="hero-text">
//           <span className="hero-subtitle">Trusted by 100,000+ Members Worldwide</span>

//           <h1 className="hero-title">
//             <span>Find Your</span>
//             <span>Perfect Match</span>
//           </h1>

//           <p className="hero-description">
//             Join thousands of Muslims finding their life partners through our
//             trusted matrimony platform. Verified profiles, active moderation,
//             and a respectful community.
//           </p>

//           <div className="hero-cta">
//             <Link to="/register" className="btn-primary">Get Started Free</Link>
//             <Link to="/login" className="btn-secondary">Log In</Link>
//           </div>

//           <div className="hero-features">
//             {features.map((item, i) => (
//               <div key={i} className="hero-feature-item">
//                 <svg fill="currentColor" viewBox="0 0 20 20">
//                   <path
//                     fillRule="evenodd"
//                     d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                     clipRule="evenodd"
//                   />
//                 </svg>
//                 <span>{item}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div className="hero-scroll">
//         <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
//         </svg>
//       </div>
//     </section>
//   );
// }

// export default Hero;



import { Link } from "react-router-dom";
import "./Hero.css";
import heroImage from "../assests/hero-image.jpg"; // Islamic background image

function Hero() {
  const features = ["Verified Profiles", "Secure & Private", "24/7 Support"];

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
            <span>Find Your</span>
            <span>Perfect Match</span>
          </h1>

          <p className="hero-description">
            Connect with Muslims worldwide in a safe, respectful, and verified community.
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
