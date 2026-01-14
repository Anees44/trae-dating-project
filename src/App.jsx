// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Home from './pages/Home'
// import Login from './pages/Login'
// import Register from './pages/Register'
// import Testimonials from './pages/Testimonials'
// import Contact from './pages/Contact'
// import MuslimDating from './pages/MuslimDating'
// import Dashboard from './pages/Dashboard'

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/testimonials" element={<Testimonials />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/muslim-dating" element={<MuslimDating />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   )
// }

// export default App



// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Testimonials from "./pages/Testimonials";
// import Contact from "./pages/Contact";
// import MuslimDating from "./pages/MuslimDating";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const [dark, setDark] = useState(false);

//   // Apply dark mode class to <html>
//   useEffect(() => {
//     document.documentElement.classList.toggle("dark", dark);
//   }, [dark]);

//   return (
//     <Router>
//       {/* ✅ Navbar ONLY HERE */}
//       <Navbar dark={dark} setDark={setDark} />

//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/testimonials" element={<Testimonials />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="/muslim-dating" element={<MuslimDating />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { useEffect, useState } from "react";

// import Navbar from "./components/Navbar";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import Testimonials from "./pages/Testimonials";
// import Contact from "./pages/Contact";
// import MuslimDating from "./pages/MuslimDating";
// import Dashboard from "./pages/Dashboard";

// function App() {
//   const [dark, setDark] = useState(false);

//   // 🌙 Apply dark mode class to <html>
//   useEffect(() => {
//     if (dark) {
//       document.documentElement.classList.add("dark");
//     } else {
//       document.documentElement.classList.remove("dark");
//     }
//   }, [dark]);

//   return (
//     <Router>
//       {/* 🌐 GLOBAL WRAPPER (VERY IMPORTANT) */}
//       <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">

//         {/* ✅ SINGLE NAVBAR */}
//         <Navbar dark={dark} setDark={setDark} />

//         {/* 📌 ROUTES */}
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/testimonials" element={<Testimonials />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/muslim-dating" element={<MuslimDating />} />
//           <Route path="/dashboard" element={<Dashboard />} />
//         </Routes>

//       </div>
//     </Router>
//   );
// }

// export default App;



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

  // 🌙 Apply dark mode class to <html>
  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [dark]);

  return (
    <Router>
      {/* ✅ Navbar ONLY HERE */}
      <Navbar dark={dark} setDark={setDark} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/testimonials" element={<Testimonials />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/muslim-dating" element={<MuslimDating />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>

      {/* 🌐 GLOBAL WRAPPER */}
      <div className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 min-h-screen transition-colors duration-300">

        {/* ✅ SINGLE NAVBAR */}
        <Navbar dark={dark} setDark={setDark} />

        {/* 📌 ROUTES */}
        <Routes>
          {/* Home route now includes Hero, Features, Testimonials, Footer */}
          <Route
            path="/"
            element={
              <>
                <Hero />
                <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
                  <Features />
                  <Testimonials />
                  <Footer />
                </div>
              </>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/muslim-dating" element={<MuslimDating />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

      </div>
    </Router>
  );
}

export default App;
