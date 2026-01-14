import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

function Register() {
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState('')

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      return
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API}/api/auth/register`, 
        {
          name: formData.name,
          email: formData.email,
          password: formData.password
        }
      )

      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong')
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* <Navbar /> */}

      <div className="flex-grow flex items-center justify-center">
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4">

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          <input
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <input
            name="confirmPassword"
            type="password"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full border p-3 rounded"
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded">
            Register
          </button>

          <p className="text-center text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600">
              Login
            </Link>
          </p>
        </form>
      </div>

      <Footer />
    </div>
  )
}

export default Register
