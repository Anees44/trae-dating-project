// import { Link } from "react-router-dom";
// import "./Footer.css";

// function Footer() {
//   return (
//     <footer className="footer">
//       <div className="footer-pattern"></div>

//       <div className="footer-container">
//         <div className="footer-top">
//           <div className="footer-brand">
//             <h3>Mashallah</h3>
//             <p>
//               Connecting Muslims worldwide to find their perfect life partner
//               through a trusted and respectful platform.
//             </p>

//             <div className="footer-socials">
//               <a href="#" aria-label="Facebook">★</a>
//               <a href="#" aria-label="Twitter">★</a>
//               <a href="#" aria-label="Instagram">★</a>
//             </div>
//           </div>

//           <div className="footer-links">
//             <h4>Quick Links</h4>
//             <ul>
//               <li><Link to="/">Home</Link></li>
//               <li><Link to="/">How it Works</Link></li>
//               <li><Link to="/">Success Stories</Link></li>
//               <li><Link to="/">About Us</Link></li>
//             </ul>
//           </div>

//           <div className="footer-links">
//             <h4>Support</h4>
//             <ul>
//               <li><Link to="/">Help Center</Link></li>
//               <li><Link to="/">Contact Us</Link></li>
//               <li><Link to="/">Privacy Policy</Link></li>
//               <li><Link to="/">Terms of Service</Link></li>
//             </ul>
//           </div>
//         </div>

//         <div className="footer-bottom">
//           <p>&copy; 2024 Mashallah. All rights reserved.</p>
//           <div className="footer-bottom-links">
//             <Link to="/">Privacy</Link>
//             <Link to="/">Terms</Link>
//             <Link to="/">Cookies</Link>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer;




import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <h3>Mashallah</h3>
            <p>
              Connecting Muslims worldwide to find their perfect life partner
              through a trusted and respectful platform.
            </p>

            <div className="footer-socials">
              <a href="#" aria-label="Facebook">F</a>
              <a href="#" aria-label="Twitter">T</a>
              <a href="#" aria-label="Instagram">I</a>
            </div>
          </div>

          <div className="footer-links">
            <h4>Quick Links</h4>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="#features">Features</Link></li>
              <li><Link to="#testimonials">Success Stories</Link></li>
              <li><Link to="#about">About Us</Link></li>
            </ul>
          </div>

          <div className="footer-links">
            <h4>Support</h4>
            <ul>
              <li><Link to="/">Help Center</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
              <li><Link to="/">Privacy Policy</Link></li>
              <li><Link to="/">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2024 Mashallah. All rights reserved.</p>
          <div className="footer-bottom-links">
            <Link to="/">Privacy</Link>
            <Link to="/">Terms</Link>
            <Link to="/">Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

