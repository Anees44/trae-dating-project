import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Features from "./components/Features.jsx";
// import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer.jsx";
import NotificationBell from "./components/NotificationBell.jsx";


import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Contact from "./pages/Contact.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile.jsx";
import Matches from './pages/Matches.jsx';
import Messages from './pages/Messages.jsx';
import Settings from './pages/Settings.jsx';
import Help from "./pages/Help";


import './index.css'; // Import plain CSS
import About from "./components/About.jsx";

// Component to conditionally show NotificationBell
function ConditionalNotificationBell() {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);

    // Optional: Listen for storage changes (login/logout in other tabs)
    const handleStorageChange = () => {
      const token = localStorage.getItem('token');
      setIsLoggedIn(!!token);
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [location]); // Re-check when location changes

  // Pages where bell should NOT appear (public pages)
  const hideBellOnPages = ['/', '/login', '/register', '/contact'];

  // Show bell only if:
  // 1. User is logged in (has token)
  // 2. NOT on public pages
  const shouldShowBell = isLoggedIn && !hideBellOnPages.includes(location.pathname);

  return shouldShowBell ? <NotificationBell /> : null;
}

function App() {
  const [dark, setDark] = useState(false);

  // 🌙 Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark-mode", dark);
  }, [dark]);

  return (
    <Router>
      <div className="app-container">
        {/* Navbar */}
        <Navbar dark={dark} setDark={setDark} />

        {/* Main Routes */}
        <main className="main-content">
          <Routes>
            {/* Home page */}
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <About />
                  <Features />
                  <Contact />
                </>
              }
            />

            {/* Auth pages */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* User pages */}
            <Route path="/profile" element={<Profile />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/matches" element={<Matches />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/settings" element={<Settings />} />


            {/* Other pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/help" element={<Help />} />
            {/* <Route path="/testimonials" element={<Testimonials />} /> */}

            {/* 404 fallback */}
            <Route
              path="*"
              element={
                <div className="page-404">
                  404 — Page Not Found
                </div>
              }
            />
          </Routes>
        </main>

        {/* Footer always visible */}
        <Footer />

        {/* Floating Notification Bell - Smart Visibility */}
        <ConditionalNotificationBell />
      </div>
    </Router>
  );
}

export default App;