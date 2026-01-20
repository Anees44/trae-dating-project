import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./Navbar.css";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
  { name: "Help", path: "/help" },
];

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Auth check
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, [location.pathname]);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <>
      <nav className={`navbar ${scrolled ? "navbar-scrolled" : ""}`}>
        <div className="navbar-container">
          {/* Logo */}
          <Link to="/" className="navbar-logo">
            FaithBond
          </Link>

          {/* Desktop Links */}
          <div className="navbar-links">
            {navLinks.map((link) => (
              <Link key={link.name} to={link.path}>
                {link.name}
              </Link>
            ))}
            {isLoggedIn && (
              <Link to="/dashboard" className="dashboard-link">
                Dashboard
              </Link>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="navbar-actions">
            {!isLoggedIn ? (
              <Link to="/login" className="btn-login">
                Login
              </Link>
            ) : (
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <button
            className="mobile-menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            ☰
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setIsMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}

          {isLoggedIn && (
            <Link
              to="/dashboard"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </Link>
          )}

          {!isLoggedIn ? (
            <Link
              to="/login"
              onClick={() => setIsMenuOpen(false)}
            >
              Login
            </Link>
          ) : (
            <button
              onClick={() => {
                handleLogout();
                setIsMenuOpen(false);
              }}
              className="btn-logout mobile-logout"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
