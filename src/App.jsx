import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Testimonials from "./components/Testimonials";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard.jsx";
import Profile from "./pages/Profile";
import Matches from './pages/Matches'
import Messages from './pages/Messages'  
// import Settings from './pages/Settings.jsx'

import './index.css'; // Import plain CSS

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
                  <Features />
                  <Testimonials />
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
            {/* <Route path="/settings" element={<Settings />} />  */}

            {/* Other pages */}
            <Route path="/contact" element={<Contact />} />
            <Route path="/testimonials" element={<Testimonials />} />

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
      </div>
    </Router>
  );
}

export default App;
