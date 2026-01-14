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
import MuslimDating from "./pages/MuslimDating";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

function App() {
  const [dark, setDark] = useState(false);

  // 🌙 Dark mode toggle
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <Router>
      {/* 🌐 GLOBAL WRAPPER */}
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">
        
        {/* ✅ NAVBAR */}
        <Navbar dark={dark} setDark={setDark} />

        {/* 📌 ROUTES */}
        <Routes>
          {/* Home page */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Features />
                <Testimonials />
                <Footer />
              </>
            }
          />

          {/* Auth & Profile */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />

          {/* Pages */}
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/muslim-dating" element={<MuslimDating />} />
          <Route path="/dashboard" element={<Dashboard />} />

          {/* 404 fallback */}
          <Route path="*" element={<div className="p-10 text-center">Page Not Found</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
