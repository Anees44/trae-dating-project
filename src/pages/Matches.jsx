import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import {
  FaUsers, FaUserFriends, FaCheckCircle,
  FaBriefcase, FaMapMarkerAlt, FaGraduationCap, FaRulerVertical,
  FaStar, FaClock, FaUserCircle, FaTimes, FaCheck
} from "react-icons/fa";

import "./Matches.css";

const API_URL = import.meta.env.VITE_API || "http://localhost:5000/api";

function Matches() {
  const navigate = useNavigate();

  const [isVisible, setIsVisible] = useState(false);
  const [matches, setMatches] = useState([]);
  const [friends, setFriends] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]); // ⭐ NEW: Store pending requests
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState("all");
  const [ageRange, setAgeRange] = useState([20, 35]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [showProfileModal, setShowProfileModal] = useState(false);

  const [filters, setFilters] = useState({
    religion: "",
    location: "",
    education: "",
    profession: "",
    maritalStatus: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetchMatches();
    fetchFriends();
    fetchPendingRequests(); // ⭐ NEW: Fetch pending requests
    setTimeout(() => setIsVisible(true), 100);
  }, [navigate]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/matches/browse`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched matches:", data);
        setMatches(data.matches || []);
      } else {
        const errorData = await response.json();
        console.error("API Error:", errorData);

        if (response.status === 401) {
          alert("Please login again");
          navigate("/login");
        } else if (response.status === 404) {
          alert(errorData.message || "Please complete your profile first");
          navigate("/profile");
        } else {
          alert(errorData.message || "Failed to load matches");
        }
      }
    } catch (error) {
      console.error("Error fetching matches:", error);
      alert("Error loading matches");
    } finally {
      setLoading(false);
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/matches/friends`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched friends:", data);
        setFriends(data.friends || []);
      }
    } catch (error) {
      console.error("Error fetching friends:", error);
    }
  };

  // ⭐ NEW: Fetch pending requests (people who sent interest to me)
  const fetchPendingRequests = async () => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/matches/requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Fetched pending requests:", data);
        setPendingRequests(data.requests || []);
      }
    } catch (error) {
      console.error("Error fetching pending requests:", error);
    }
  };

  const handleShowInterest = async (matchId) => {
    try {
      const token = localStorage.getItem("token");
      const match = matches.find((m) => m.id === matchId);

      if (!match) {
        alert("Match not found");
        return;
      }

      console.log("Sending interest to userId:", match.userId);

      const response = await fetch(`${API_URL}/matches/interest/${match.userId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      console.log("Interest response:", data);

      if (response.ok) {
        setMatches((prev) =>
          prev.map((m) =>
            m.id === matchId
              ? {
                ...m,
                interestSent: true,
                status: data.match.status,
                matchId: data.match._id,
              }
              : m
          )
        );

        if (data.match.isMutual) {
          alert("You are now friends! 🎉");
          fetchFriends();
          fetchMatches();
        } else {
          alert("Interest sent successfully! ⏳");
        }
      } else {
        alert(data.message || "Failed to send interest");
      }
    } catch (error) {
      console.error("Error sending interest:", error);
      alert("An error occurred");
    }
  };

  // ⭐ SIMPLIFIED: Cancel sent interest
  const handleCancelRequest = async (matchId) => {
    try {
      const token = localStorage.getItem("token");
      const match = matches.find((m) => m.id === matchId);

      if (!match) {
        alert("Match not found");
        return;
      }

      console.log("Cancelling interest to userId:", match.userId);

      // Call the simplified cancel endpoint
      const response = await fetch(
        `${API_URL}/matches/interest/${match.userId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        alert("Request cancelled successfully");
        
        // Update UI
        setMatches((prev) =>
          prev.map((m) =>
            m.id === matchId
              ? { ...m, interestSent: false, status: "none", matchId: null }
              : m
          )
        );
      } else {
        alert(data.message || "Failed to cancel request");
      }
    } catch (error) {
      console.error("Error cancelling request:", error);
      alert("An error occurred while cancelling request");
    }
  };

  // ⭐ NEW: Accept interest request
  const handleAcceptRequest = async (matchId, userId) => {
    try {
      const token = localStorage.getItem("token");

      // Find the interest document
      const notificationsResponse = await fetch(`${API_URL}/interests/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (notificationsResponse.ok) {
        const notifData = await notificationsResponse.json();
        const notification = notifData.notifications.find(
          (n) => n.from._id === userId && n.status === 'pending'
        );

        if (notification) {
          // Accept the interest
          const acceptResponse = await fetch(
            `${API_URL}/interests/${notification._id}/accept`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await acceptResponse.json();

          if (acceptResponse.ok) {
            alert("Request accepted! You are now friends! 🎉");
            
            // Refresh all data
            fetchMatches();
            fetchFriends();
            fetchPendingRequests();
          } else {
            alert(data.message || "Failed to accept request");
          }
        }
      }
    } catch (error) {
      console.error("Error accepting request:", error);
      alert("An error occurred while accepting request");
    }
  };

  // ⭐ NEW: Reject interest request
  const handleRejectRequest = async (matchId, userId) => {
    try {
      const token = localStorage.getItem("token");

      // Find the interest document
      const notificationsResponse = await fetch(`${API_URL}/interests/notifications`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (notificationsResponse.ok) {
        const notifData = await notificationsResponse.json();
        const notification = notifData.notifications.find(
          (n) => n.from._id === userId && n.status === 'pending'
        );

        if (notification) {
          // Reject the interest
          const rejectResponse = await fetch(
            `${API_URL}/interests/${notification._id}/reject`,
            {
              method: "PUT",
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const data = await rejectResponse.json();

          if (rejectResponse.ok) {
            alert("Request rejected");
            
            // Refresh data
            fetchMatches();
            fetchPendingRequests();
          } else {
            alert(data.message || "Failed to reject request");
          }
        }
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      alert("An error occurred while rejecting request");
    }
  };

  // ⭐ NEW: Unfriend functionality
  const handleUnfriend = async (matchId, friendName) => {
    const confirmUnfriend = window.confirm(
      `Are you sure you want to unfriend ${friendName}? This will delete all your messages with them.`
    );

    if (!confirmUnfriend) return;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/matches/${matchId}/unfriend`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (response.ok) {
        alert("Friend removed successfully");
        
        // Refresh data
        fetchFriends();
        fetchMatches();
      } else {
        alert(data.message || "Failed to remove friend");
      }
    } catch (error) {
      console.error("Error unfriending:", error);
      alert("An error occurred while removing friend");
    }
  };

  const handleShortlist = async (matchId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/interests/shortlist/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ profileId: matchId }),
      });

      const data = await response.json();

      if (response.ok) {
        alert("Added to shortlist!");
      } else {
        alert(data.message || "Failed to add to shortlist");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred");
    }
  };

  const handleMessageFriend = (matchId) => {
    navigate("/messages");
  };

  const handleViewProfile = (match) => {
    setSelectedMatch(match);
    setShowProfileModal(true);
  };

  // ⭐ Helper function to check if this match has a pending request TO me
  const hasPendingRequestToMe = (userId) => {
    return pendingRequests.some((req) => req.userId === userId);
  };

  const filteredMatches = matches.filter((match) => {
    if (filters.religion && match.religion !== filters.religion) return false;
    if (filters.location && !match.location.includes(filters.location))
      return false;
    if (filters.education && !match.education.includes(filters.education))
      return false;
    if (filters.profession && !match.profession.includes(filters.profession))
      return false;
    if (match.age < ageRange[0] || match.age > ageRange[1]) return false;
    return true;
  });

  const filteredFriends = friends.filter((friend) =>
    friend.name?.toLowerCase().includes("")
  );

  const resetFilters = () => {
    setFilters({
      religion: "",
      location: "",
      education: "",
      profession: "",
      maritalStatus: "",
    });
    setAgeRange([20, 35]);
    setActiveFilter("all");
    fetchMatches();
  };

  const getDisplayList = () => {
    if (activeFilter === "friends") {
      return filteredFriends;
    } else if (activeFilter === "verified") {
      return filteredMatches.filter((m) => m.verified);
    } else {
      return filteredMatches;
    }
  };

  const displayList = getDisplayList();

  if (loading) {
    return (
      <div className="matches-page">
        <Navbar />
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading matches...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="matches-page">
      <Navbar />

      <main className="matches-main">
        <div className={`matches-header ${isVisible ? "visible" : ""}`}>
          <div className="header-bg-circle circle-1"></div>
          <div className="header-bg-circle circle-2"></div>
          <div className="header-bg-circle circle-3"></div>

          <div className="header-content">
            <h1>Find Your Perfect Match</h1>
            <p>
              Discover compatible profiles and start your journey to happily
              ever after
            </p>
          </div>
        </div>

        <div className={`filter-section ${isVisible ? "visible" : ""}`}>
          <div className="filter-header">
            <div className="filter-tabs">
              <button
                className={`filter-tab ${activeFilter === "all" ? "active" : ""}`}
                onClick={() => setActiveFilter("all")}
              >
                <span className="tab-icon"><FaUsers /></span>
                All Matches
                <span className="tab-count">{matches.length}</span>
              </button>

              <button
                className={`filter-tab ${activeFilter === "friends" ? "active" : ""}`}
                onClick={() => setActiveFilter("friends")}
              >
                <span className="tab-icon"><FaUserFriends /></span>
                Friends
                <span className="tab-count">{friends.length}</span>
              </button>
              <button
                className={`filter-tab ${activeFilter === "verified" ? "active" : ""}`}
                onClick={() => setActiveFilter("verified")}
              >
                <span className="tab-icon"><FaCheckCircle /></span>
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

          {showFilters && activeFilter !== "friends" && (
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

        <div className={`results-info ${isVisible ? "visible" : ""}`}>
          <p>
            Showing <strong>{displayList.length}</strong>{" "}
            {activeFilter === "friends" ? "friends" : "matches"}
          </p>
        </div>

        <div className={`matches-grid ${isVisible ? "visible" : ""}`}>
          {displayList.length > 0 ? (
            displayList.map((match, index) => (
              <div
                key={match.id}
                className="match-card"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="match-image-container">
                  <img
                    src={match.image}
                    alt={match.name}
                    className="match-image"
                  />
                  {match.verified && (
                    <div className="verified-badge" title="Verified Profile">
                      ✓
                    </div>
                  )}
                  {activeFilter === "friends" && (
                    <div className="friend-badge">Friend 💚</div>
                  )}
                </div>

                <div className="match-info">
                  <h3 className="match-name">{match.name}</h3>
                  <p className="match-age">{match.age} years old</p>

                  <div className="match-details">
                    <div className="detail-item">
                      <span className="detail-icon"><FaBriefcase className="info-icon" /></span>
                      <span>{match.profession}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon"><FaMapMarkerAlt className="info-icon" /></span>
                      <span>{match.location}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon"><FaGraduationCap className="info-icon" /></span>
                      <span>{match.education}</span>
                    </div>
                    <div className="detail-item">
                      <span className="detail-icon"><FaRulerVertical className="info-icon" /></span>
                      <span>{match.height}</span>
                    </div>
                  </div>

                  <p className="match-about">
                    {match.about.substring(0, 100)}...
                  </p>

                  <div className="match-interests">
                    {match.interests &&
                      match.interests.slice(0, 3).map((interest, idx) => (
                        <span key={idx} className="interest-tag">
                          {interest}
                        </span>
                      ))}
                  </div>

                  {/* ⭐⭐⭐ UPDATED ACTION BUTTONS ⭐⭐⭐ */}
                  <div className="match-actions">
                    <button className="btn-view-profile" onClick={() => handleViewProfile(match)}>
                      <FaUserCircle className="action-icon" />
                      <span>View Profile</span>
                    </button>
                    <button className="btn-icon" onClick={() => handleShortlist(match.id)} title="Add to Shortlist">
                      <FaStar className="action-icon" />
                    </button>

                    {/* Show different buttons based on relationship status */}
                    {activeFilter === "friends" ? (
                      // Already friends - show message and unfriend buttons
                      <div className="action-buttons-group">
                        <button className="btn-message" onClick={() => handleMessageFriend(match.matchId)}>
                          💬 Message
                        </button>
                        <button 
                          className="btn-unfriend" 
                          onClick={() => handleUnfriend(match.matchId, match.name)}
                          title="Remove Friend"
                        >
                          <FaTimes /> Unfriend
                        </button>
                      </div>
                    ) : hasPendingRequestToMe(match.userId) ? (
                      // Someone sent request TO ME - show Accept/Reject
                      <div className="action-buttons-group">
                        <button 
                          className="btn-accept" 
                          onClick={() => handleAcceptRequest(match.id, match.userId)}
                          title="Accept Request"
                        >
                          <FaCheck /> Accept
                        </button>
                        <button 
                          className="btn-reject" 
                          onClick={() => handleRejectRequest(match.id, match.userId)}
                          title="Reject Request"
                        >
                          <FaTimes /> Reject
                        </button>
                      </div>
                    ) : match.interestSent || match.status === "pending" ? (
                      // I sent request to THEM - show Cancel Request
                      <button 
                        className="btn-cancel-request" 
                        onClick={() => handleCancelRequest(match.id)}
                      >
                        <FaTimes className="action-icon" /> Cancel Request
                      </button>
                    ) : (
                      // No relationship - show Send Interest
                      <button className="btn-interest" onClick={() => handleShowInterest(match.id)}>
                        💝 Send Interest
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="no-matches">
              <div className="no-matches-icon">😔</div>
              <h3>
                {activeFilter === "friends"
                  ? "No friends yet"
                  : "No matches found"}
              </h3>
              <p>
                {activeFilter === "friends"
                  ? "Start sending interests to make friends!"
                  : "Try adjusting your filters to see more profiles"}
              </p>
              {activeFilter !== "friends" && (
                <button className="btn-reset" onClick={resetFilters}>
                  Reset Filters
                </button>
              )}
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

                {/* ⭐ UPDATED MODAL ACTIONS */}
                <div className="modal-actions">
                  <button
                    className="btn-modal-shortlist"
                    onClick={() => handleShortlist(selectedMatch.id)}
                  >
                    ⭐ Shortlist
                  </button>

                  {activeFilter === "friends" ? (
                    <div className="modal-action-buttons-group">
                      <button
                        className="btn-modal-message"
                        onClick={() => handleMessageFriend(selectedMatch.matchId)}
                      >
                        💬 Message
                      </button>
                      <button
                        className="btn-modal-unfriend"
                        onClick={() => {
                          setShowProfileModal(false);
                          handleUnfriend(selectedMatch.matchId, selectedMatch.name);
                        }}
                      >
                        ✕ Unfriend
                      </button>
                    </div>
                  ) : hasPendingRequestToMe(selectedMatch.userId) ? (
                    <div className="modal-action-buttons-group">
                      <button
                        className="btn-modal-accept"
                        onClick={() => handleAcceptRequest(selectedMatch.id, selectedMatch.userId)}
                      >
                        ✓ Accept Request
                      </button>
                      <button
                        className="btn-modal-reject"
                        onClick={() => handleRejectRequest(selectedMatch.id, selectedMatch.userId)}
                      >
                        ✕ Reject Request
                      </button>
                    </div>
                  ) : selectedMatch.interestSent || selectedMatch.status === "pending" ? (
                    <button
                      className="btn-modal-cancel"
                      onClick={() => handleCancelRequest(selectedMatch.id)}
                    >
                      ✕ Cancel Request
                    </button>
                  ) : (
                    <button
                      className="btn-modal-interest"
                      onClick={() => handleShowInterest(selectedMatch.id)}
                    >
                      💝 Send Interest
                    </button>
                  )}
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