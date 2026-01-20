import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { FaUserCircle, FaSearch, FaComments, FaCog } from "react-icons/fa";
import './Dashboard.css';

function Dashboard() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) navigate('/login');
    setTimeout(() => setIsVisible(true), 100);
  }, [navigate]);

  return (
    <div className="dashboard-page">


      <main className="dashboard-content">
        <section className={`welcome-section ${isVisible ? 'visible' : ''}`}>
          <div className="animated-circles">
            <div className="circle circle1"></div>
            <div className="circle circle2"></div>
            <div className="circle circle3"></div>
          </div>
          <div className="welcome-text">
            <h1>Welcome to Your Dashboard</h1>
            <p>Start your journey to find your perfect life partner</p>
          </div>
        </section>

        <div className="dashboard-cards">
          <Link to="/profile" className={`card group ${isVisible ? 'visible' : ''} delay-1`} style={{ textDecoration: "none" }}>
            <div className="card-icon profile-icon">
              <FaUserCircle />
            </div>
            <h3>My Profile</h3>
            <p>Complete or update your personal and family details.</p>
            <div className="card-cta">View Profile</div>
          </Link>

          <Link to="/matches" className={`card group ${isVisible ? 'visible' : ''} delay-2`} style={{ textDecoration: "none" }}>
            <div className="card-icon matches-icon">
              <FaSearch />
            </div>
            <h3>Find Matches</h3>
            <p>Browse compatible and verified profiles.</p>
            <div className="card-cta">Explore Matches</div>
          </Link>

          <Link to="/messages" className={`card group ${isVisible ? 'visible' : ''} delay-3`} style={{ textDecoration: "none" }}>
            <div className="card-icon messages-icon">
              <FaComments />
            </div>
            <h3>Messages</h3>
            <p>Communicate safely with your matches.</p>
            <div className="card-cta">Open Messages</div>
          </Link>


          <Link to="/settings" className={`card group ${isVisible ? 'visible' : ''} delay-4`}>
            <div className="card-icon profile-icon">
              <FaCog />

            </div>
            <h3>Account Settings</h3>
            <p>Update your account preferences, email, and password.</p>
            <div className="card-cta">Manage Account</div>
          </Link>

        </div>
      </main>

    </div>
  );
}

export default Dashboard;
