import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Matches.css";

const API_URL = import.meta.env.VITE_API || 'http://localhost:5000/api'

function Matches() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeFilter, setActiveFilter] = useState('all')
  const [ageRange, setAgeRange] = useState([20, 35])
  const [showFilters, setShowFilters] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState(null)
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [interests, setInterests] = useState([]) 
  const [isVisible, setIsVisible] = useState(false)
  const currentUserId = localStorage.getItem('token') 

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMatches()
    fetchInterests()
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/matches/browse`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) throw new Error('Failed to fetch matches')
      const data = await res.json()
      setMatches(data.matches)
    } catch (err) {
      console.error(err)
      alert('Error loading matches')
    } finally {
      setLoading(false);
    }
  };

  const fetchInterests = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/interests`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (!res.ok) return
      const data = await res.json()
      setInterests(data.interests || [])
    } catch (err) {
      console.error(err)
    }
  }

  const handleShowInterest = async (matchId) => {
    try {
      const token = localStorage.getItem('token')
      const match = matches.find(m => m._id === matchId)
      if (!match) return alert('Match not found')

      // Check if interest already exists
      const existing = interests.find(i => i.to === match.user)
      if (existing && existing.status === 'pending') {
        return alert('Interest already sent. Waiting for acceptance.')
      }

      const res = await fetch(`${API_URL}/interests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ to: match.user })
      })
      const data = await res.json()
      if (!res.ok) return alert(data.message || 'Failed to send interest')

      if (data.mutual) {
        alert(`You are now friends with ${match.fullName}! 💖`)
        navigate(`/chat/${data.chatId}`)
      } else {
        alert(`Interest sent to ${match.fullName}. Waiting for acceptance.`)
      }

      fetchInterests()
    } catch (err) {
      console.error(err)
      alert('Error sending interest')
    }
  } catch (error) {
    console.error('Error sending interest:', error)
    alert('An error occurred')
  }
}

  const handleShortlist = async (matchId) => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`${API_URL}/interests/shortlist/add`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileId: matchId })
      })
      const data = await res.json()
      if (!res.ok) return alert(data.message || 'Failed to add to shortlist')
      alert('Added to shortlist ⭐')
    } catch (err) {
      console.error(err)
      alert('Error adding to shortlist')
    }
  };

  const getInterestStatus = (match) => {
    const interest = interests.find(i => i.to === match.user)
    if (!interest) return null
    return interest.status // pending / accepted / rejected
  }

  const filteredMatches = matches.filter(m => {
    if (activeFilter === 'online' && !m.online) return false
    if (activeFilter === 'verified' && !m.verified) return false
    if (m.age < ageRange[0] || m.age > ageRange[1]) return false
    return true
  })

  if (loading) return <div className="matches-page"><Navbar /><p>Loading...</p></div>


  return (
    <div className="matches-page">
      <Navbar />

      <main className="matches-main">
        {/* Header */}
        <div className={`matches-header ${isVisible ? "visible" : ""}`}>
          <div className="header-bg-circle circle-1"></div>
          <div className="header-bg-circle circle-2"></div>
          <div className="header-bg-circle circle-3"></div>

          <div className="header-content">
            <h1>Find Your Perfect Match</h1>
            <p>
              Discover compatible profiles and start your journey to happily
              ever after 💕
            </p>
          </div>
        </div>

        {/* Filter Section */}
        <div className={`filter-section ${isVisible ? "visible" : ""}`}>
          <div className="filter-header">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                <span className="tab-icon">👥</span>
                All Matches
                <span className="tab-count">{matches.length}</span>
              </button>
              <button
                className={`filter-tab ${activeFilter === "online" ? "active" : ""}`}
                onClick={() => setActiveFilter("online")}
              >
                <span className="tab-icon">🟢</span>
                Online Now
                <span className="tab-count">
                  {matches.filter((m) => m.online).length}
                </span>
              </button>
              <button
                className={`filter-tab ${activeFilter === "verified" ? "active" : ""}`}
                onClick={() => setActiveFilter("verified")}
              >
                <span className="tab-icon">✓</span>
                Verified
                <span className="tab-count">
                  {matches.filter((m) => m.verified).length}
                </span>
              </button>
            </div>

            <button
              className="toggle-filters-btn"
              onClick={() => setShowFilters(!showFilters)}
            >
              <span>🔍</span>
              {showFilters ? "Hide Filters" : "Show Filters"}
            </button>
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="advanced-filters">
              <div className="filters-grid">
                <div className="filter-group">
                  <label>
                    Age Range: {ageRange[0]} - {ageRange[1]}
                  </label>
                  <div className="age-range-inputs">
                    <input
                      type="number"
                      value={ageRange[0]}
                      onChange={(e) =>
                        setAgeRange([parseInt(e.target.value), ageRange[1]])
                      }
                      min="18"
                      max="60"
                    />
                    <span>to</span>
                    <input
                      type="number"
                      value={ageRange[1]}
                      onChange={(e) =>
                        setAgeRange([ageRange[0], parseInt(e.target.value)])
                      }
                      min="18"
                      max="60"
                    />
                  </div>
                </div>

                <div className="filter-group">
                  <label>Religion</label>
                  <select
                    value={filters.religion}
                    onChange={(e) =>
                      setFilters({ ...filters, religion: e.target.value })
                    }
                  >
                    <option value="">All Religions</option>
                    <option value="Muslim">Muslim</option>
                    <option value="Christian">Christian</option>
                    <option value="Hindu">Hindu</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Location</label>
                  <select
                    value={filters.location}
                    onChange={(e) =>
                      setFilters({ ...filters, location: e.target.value })
                    }
                  >
                    <option value="">All Locations</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Lahore">Lahore</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Rawalpindi">Rawalpindi</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Education</label>
                  <select
                    value={filters.education}
                    onChange={(e) =>
                      setFilters({ ...filters, education: e.target.value })
                    }
                  >
                    <option value="">All Education Levels</option>
                    <option value="Bachelor">Bachelor's Degree</option>
                    <option value="Masters">Master's Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Diploma">Diploma</option>
                  </select>
                </div>

                <div className="filter-group">
                  <label>Profession</label>
                  <input
                    type="text"
                    placeholder="e.g., Engineer, Doctor"
                    value={filters.profession}
                    onChange={(e) =>
                      setFilters({ ...filters, profession: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="filter-actions">
                <button className="btn-reset" onClick={resetFilters}>
                  Reset Filters
                </button>
                <button
                  className="btn-apply"
                  onClick={() => setShowFilters(false)}
                >
                  Apply Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Results Info */}
        <div className={`results-info ${isVisible ? "visible" : ""}`}>
          <p>
            Showing <strong>{filteredMatches.length}</strong> matches based on
            your preferences
          </p>
        </div>

        {/* Matches Grid */}
        <div className={`matches-grid ${isVisible ? "visible" : ""}`}>
          {filteredMatches.length > 0 ? (
            filteredMatches.map((match, index) => (
              <div
                key={match.id}
                className="match-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Profile Image */}
                <div className="match-image-container">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="match-image"
                  />
                  {match.online && <div className="online-badge">Online</div>}
                  {match.verified && (
                    <div className="verified-badge" title="Verified Profile">
                      ✓
                    </div>
                  )}
                </div>

                {/* Match Info */}
                <div className="match-info">
                  <h3 className="match-name">{match.name}</h3>
                  <p className="match-age">{match.age} years old</p>

                  <div className="match-details">
                    <div className="detail-item">
                      <span className="detail-icon">💼</span>
                      <span>{match.profession}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📍</span>
                      <span>{match.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">🎓</span>
                      <span>{match.education}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon">📏</span>
                      <span>{match.height}</span>
                    </div>
                  </div>

                  <p className="match-about">
                    {match.about.substring(0, 100)}...
                  </p>

                  {/* Interests */}
                  <div className="match-interests">
                    {match.interests &&
                      match.interests.slice(0, 3).map((interest, idx) => (
                        <span key={idx} className="interest-tag">
                          {interest}
                        </span>
                      ))}
                  </div>

                  {/* Actions */}
                  <div className="match-actions">
                    <button
                      className="btn-view-profile"
                      onClick={() => handleViewProfile(match)}
                    >
                      View Profile
                    </button>
                    <button
                      className="btn-icon"
                      onClick={() => handleShortlist(match.id)}
                      title="Add to Shortlist"
                    >
                      ⭐
                    </button>
                    <button
                      className="btn-interest"
                      onClick={() => handleShowInterest(match.id)}
                    >
                      💝 Send Interest
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-matches">
              <div className="no-matches-icon">😔</div>
              <h3>No matches found</h3>
              <p>Try adjusting your filters to see more profiles</p>
              <button className="btn-reset" onClick={resetFilters}>
                Reset Filters
              </button>
            </div>
          )}
        </div>

        {/* Profile Modal */}
        {showProfileModal && selectedMatch && (
          <div
            className="modal-overlay"
            onClick={() => setShowProfileModal(false)}
          >
            <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
              <button
                className="modal-close"
                onClick={() => setShowProfileModal(false)}
              >
                ×
              </button>

              <div className="modal-content">
                <div className="modal-header-section">
                  <div className="modal-image-container">
                    <img src={selectedMatch.image} alt={selectedMatch.name} />
                    {selectedMatch.online && (
                      <div className="online-badge large">Online</div>
                    )}
                  </div>

                  <div className="modal-header-info">
                    <h2>
                      {selectedMatch.name}
                      {selectedMatch.verified && (
                        <span className="verified-icon">✓</span>
                      )}
                    </h2>
                    <p className="modal-age">{selectedMatch.age} years old</p>
                    <p className="modal-profession">
                      {selectedMatch.profession}
                    </p>
                    <p className="modal-location">
                      📍 {selectedMatch.location}
                    </p>
                  </div>
                </div>

                <div className="modal-body">
                  <div className="modal-section">
                    <h3>About</h3>
                    <p>{selectedMatch.about}</p>
                  </div>

                  <div className="modal-section">
                    <h3>Basic Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Education:</span>
                        <span className="info-value">
                          {selectedMatch.education}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Height:</span>
                        <span className="info-value">
                          {selectedMatch.height}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Religion:</span>
                        <span className="info-value">
                          {selectedMatch.religion}
                        </span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Marital Status:</span>
                        <span className="info-value">
                          {selectedMatch.maritalStatus}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h3>Interests</h3>
                    <div className="interests-list">
                      {selectedMatch.interests &&
                        selectedMatch.interests.map((interest, idx) => (
                          <span key={idx} className="interest-badge">
                            {interest}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                <div className="modal-actions">
                  <button
                    className="btn-modal-shortlist"
                    onClick={() => handleShortlist(selectedMatch.id)}
                  >
                    ⭐ Shortlist
                  </button>
                  <button
                    className="btn-modal-interest"
                    onClick={() => handleShowInterest(selectedMatch.id)}
                  >
                    💝 Send Interest
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Matches;
