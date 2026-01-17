import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import './Register.css'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('All fields are required')
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE}/api/auth/register`,
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      )

      localStorage.setItem('token', res.data.token)
      setSuccess('Account created successfully! Please create your profile first.')

      setTimeout(() => {
        navigate('/profile') // direct user to profile creation
      }, 1500)
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed, please try again')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="register-page">
      <div className="register-wrapper">
        <form onSubmit={handleSubmit} className="register-form">

          <h2>Create Your Account</h2>
          <p className="subtitle">
            Start your journey with a secure and personalized profile
          </p>

          {error && <div className="alert error">{error}</div>}
          {success && <div className="alert success">{success}</div>}

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="register-input"
          />

          <input
            name="email"
            type="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="register-input"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="register-input"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="register-input"
          />

          <button type="submit" disabled={loading} className="register-btn">
            {loading ? 'Creating Account...' : 'Register'}
          </button>

          <p className="login-link">
            Already have an account?{' '}
            <Link to="/login">Login</Link>
          </p>

        </form>
      </div>

    </div>
  )
}

export default Register
