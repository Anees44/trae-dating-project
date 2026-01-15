import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Navbar from "../components/Navbar"
import "./Matches.css"

const API_BASE = import.meta.env.VITE_API

function Matches() {
  const navigate = useNavigate()
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Get token safely
  const token = localStorage.getItem("token")
  let currentUserId = null
  if (token) {
    try {
      currentUserId = JSON.parse(atob(token.split(".")[1])).id
    } catch (err) {
      console.error("Invalid token", err)
      localStorage.removeItem("token")
      navigate("/login")
    }
  } else {
    navigate("/login")
  }

  useEffect(() => {
    if (!token) return
    fetchMatches()
  }, [navigate, token])

  const fetchMatches = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/matches`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (!res.ok) {
        const text = await res.text()
        console.error("Matches fetch failed:", res.status, text)
        setError("Failed to load matches")
        setMatches([])
        return
      }

      const data = await res.json()
      setMatches(data)
    } catch (err) {
      console.error("Matches fetch error:", err)
      setError("Failed to load matches")
      setMatches([])
    } finally {
      setLoading(false)
    }
  }

  // Loading fallback
  if (loading) {
    return (
      <div>
        <Navbar />
        <p style={{ textAlign: "center", marginTop: "40px" }}>Loading...</p>
      </div>
    )
  }

  return (
    <div className="matches-page">
      <Navbar />

      {error && (
        <p style={{ textAlign: "center", marginTop: "40px", color: "red" }}>
          {error}
        </p>
      )}

      {!error && matches.length === 0 && (
        <p style={{ textAlign: "center", marginTop: "40px" }}>
          No matches yet. Send interests to connect ❤️
        </p>
      )}

      {!error && matches.length > 0 && (
        <div className="matches-grid">
          {matches.map(match => {
            // find the other user (not the current logged-in user)
            const otherUser = match.users.find(u => u._id !== currentUserId)
            return (
              <div key={match._id} className="match-card">
                <h3>{otherUser?.name}</h3>
                <p>{otherUser?.age} years</p>
                <p>{otherUser?.profession}</p>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default Matches
