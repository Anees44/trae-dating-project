// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "Testimonials", path: "/testimonials" },
//   { name: "Contact", path: "/contact" },
//   { name: "Help", path: "/muslim-dating" },
//   { name: "Muslim dating site", path: "/muslim-dating" },
// ];

// function Navbar() {
//   const navigate = useNavigate();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dark, setDark] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   // Check auth state
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   // Dark mode from storage
//   useEffect(() => {
//     const storedDark = localStorage.getItem("darkMode");
//     if (storedDark === "true") {
//       setDark(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   // Scroll effect
//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   // Dark mode toggle
//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("darkMode", "true");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("darkMode", "false");
//     }
//   }, [dark]);

//   // Logout handler
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">Mashallah</Link>

//         <div className="navbar-links">
//           {navLinks.map((link) => (
//             <Link key={link.name} to={link.path}>{link.name}</Link>
//           ))}
//         </div>

//         {/* Desktop Actions */}
//         <div className="navbar-actions">
//           <button
//             className="dark-toggle"
//             onClick={() => setDark(!dark)}
//             aria-label="Toggle dark mode"
//           >
//             {dark ? "☀️" : "🌙"}
//           </button>

//           {!isLoggedIn ? (
//             <Link to="/login" className="btn-login">Log in</Link>
//           ) : (
//             <>
//               <Link to="/profile" className="btn-login">Profile</Link>
//               <button onClick={handleLogout} className="btn-logout">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         <button
//           className="mobile-menu-button"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//           aria-label="Toggle menu"
//         >
//           ☰
//         </button>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="mobile-menu">
//           {navLinks.map((link) => (
//             <Link
//               key={link.name}
//               to={link.path}
//               onClick={() => setIsMenuOpen(false)}
//             >
//               {link.name}
//             </Link>
//           ))}

//           <div className="mobile-menu-actions">
//             {!isLoggedIn ? (
//               <Link to="/login" onClick={() => setIsMenuOpen(false)}>
//                 Log in
//               </Link>
//             ) : (
//               <>
//                 <Link
//                   to="/profile"
//                   onClick={() => setIsMenuOpen(false)}
//                 >
//                   Profile
//                 </Link>
//                 <button
//                   onClick={() => {
//                     handleLogout();
//                     setIsMenuOpen(false);
//                   }}
//                   className="btn-logout"
//                 >
//                   Logout
//                 </button>
//               </>
//             )}

//             <button
//               className="dark-toggle"
//               onClick={() => setDark(!dark)}
//               aria-label="Toggle dark mode"
//             >
//               {dark ? "☀️" : "🌙"}
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;



// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./Navbar.css";

// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "Testimonials", path: "/testimonials" },
//   { name: "Contact", path: "/contact" },
//   { name: "Help", path: "/muslim-dating" },
//   { name: "Muslim dating site", path: "/muslim-dating" },
// ];

// function Navbar() {
//   const navigate = useNavigate();

//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const [dark, setDark] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     setIsLoggedIn(!!token);
//   }, []);

//   useEffect(() => {
//     const storedDark = localStorage.getItem("darkMode");
//     if (storedDark === "true") {
//       setDark(true);
//       document.documentElement.classList.add("dark");
//     }
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//       localStorage.setItem("darkMode", "true");
//     } else {
//       document.documentElement.classList.remove("dark");
//       localStorage.setItem("darkMode", "false");
//     }
//   }, [dark]);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setIsLoggedIn(false);
//     navigate("/login");
//   };

//   return (
//     <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
//       <div className="navbar-container">
//         <Link to="/" className="navbar-logo">Mashallah</Link>

//         <div className="navbar-links">
//           {navLinks.map((link) => (
//             <Link key={link.name} to={link.path}>{link.name}</Link>
//           ))}
//         </div>

//         <div className="navbar-actions">
//           <button className="dark-toggle" onClick={() => setDark(!dark)}>
//             {dark ? "☀️" : "🌙"}
//           </button>

//           {!isLoggedIn ? (
//             <Link to="/login" className="btn-login">Log in</Link>
//           ) : (
//             <>
//               <Link to="/profile" className="btn-login">Profile</Link>
//               <button onClick={handleLogout} className="btn-logout">
//                 Logout
//               </button>
//             </>
//           )}
//         </div>

//         <button
//           className="mobile-menu-button"
//           onClick={() => setIsMenuOpen(!isMenuOpen)}
//         >
//           ☰
//         </button>
//       </div>

//       {isMenuOpen && (
//         <div className="mobile-menu">
//           {navLinks.map((link) => (
//             <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)}>
//               {link.name}
//             </Link>
//           ))}

//           <div className="mobile-menu-actions">
//             {!isLoggedIn ? (
//               <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
//             ) : (
//               <>
//                 <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
//                 <button onClick={handleLogout} className="btn-logout">Logout</button>
//               </>
//             )}

//             <button className="dark-toggle" onClick={() => setDark(!dark)}>
//               {dark ? "☀️" : "🌙"}
//             </button>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;


import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/#about" }, // ✅ Added About section
  { name: "Testimonials", path: "/testimonials" },
  { name: "Contact", path: "/contact" },
  { name: "Help", path: "/" },
];

function Navbar() {
  const navigate = useNavigate();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    const storedDark = localStorage.getItem("darkMode");
    if (storedDark === "true") {
      setDark(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("darkMode", "true");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("darkMode", "false");
    }
  }, [dark]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">Rishta.com</Link>

        <div className="navbar-links">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path}>{link.name}</Link>
          ))}
        </div>  

        <div className="navbar-actions">
          <button className="dark-toggle" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>

          {!isLoggedIn ? (
            <Link to="/login" className="btn-login">Log in</Link>
          ) : (
            <>
              <Link to="/profile" className="btn-login">Profile</Link>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          )}
        </div>

        <button
          className="mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>
      </div>

      {isMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link key={link.name} to={link.path} onClick={() => setIsMenuOpen(false)}>
              {link.name}
            </Link>
          ))}

          <div className="mobile-menu-actions">
            {!isLoggedIn ? (
              <Link to="/login" onClick={() => setIsMenuOpen(false)}>Log in</Link>
            ) : (
              <>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>Profile</Link>
                <button onClick={handleLogout} className="btn-logout">Logout</button>
              </>
            )}

            <button className="dark-toggle" onClick={() => setDark(!dark)}>
              {dark ? "☀️" : "🌙"}
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
