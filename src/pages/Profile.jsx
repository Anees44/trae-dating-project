import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })

  const [formData, setFormData] = useState({
    fullName: '',
    gender: '',
    age: '',
    isMuslim: true,
    sect: '',
    city: '',
    education: '',
    interests: '',
    about: '',
    height: '',
    profession: ''
  })

  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const API_PROFILE = import.meta.env.VITE_API_PROFILE

  const getAuthHeader = () => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return null
    }
    return { Authorization: `Bearer ${token}` }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const headers = getAuthHeader()
      if (!headers) return

      const { data } = await axios.get(API_PROFILE, { headers })

      setFormData({
        fullName: data.fullName || '',
        gender: data.gender || '',
        age: data.age || '',
        isMuslim: data.isMuslim ?? true,
        sect: data.sect || '',
        city: data.city || '',
        education: data.education || '',
        interests: data.interests || '',
        about: data.about || '',
        height: data.height || '',
        profession: data.profession || ''
      })

      if (data.image) setImagePreview(data.image)
    } catch (err) {
      setMessage({ type: 'error', text: 'Failed to load profile data.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target

    if (name === 'age' && value < 18) {
      setMessage({ type: 'error', text: 'Age must be 18 or above.' })
      return
    }
    if (formData.age === '') formData.age = null
    if (name === 'isMuslim') {
      setFormData({ ...formData, isMuslim: checked, sect: '' }) // reset sect if religion changes
      return
    }

    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Only image files are allowed.' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size must be under 5MB.' })
      return
    }

    setProfileImage(file)
    const reader = new FileReader()
    reader.onloadend = () => setImagePreview(reader.result)
    reader.readAsDataURL(file)
  }

  const removeImage = () => {
    setProfileImage(null)
    setImagePreview(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const headers = getAuthHeader()
      if (!headers) return

      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) =>
        submitData.append(key, value)
      )
      if (profileImage) submitData.append('image', profileImage)

      await axios.post(API_PROFILE, submitData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data',
        },
      })

      setMessage({ type: 'success', text: 'Profile updated successfully.' })
      setTimeout(() => navigate('/dashboard'), 1500)
    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Profile save failed.',
      })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loader-page">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <main className="profile-container">

        <div className="profile-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">
            ← Back to Dashboard
          </button>
          <div className="header-card">
            <h1>My Profile</h1>
            <p>Keep your information updated for better matches.</p>
          </div>
        </div>

        {message.text && (
          <div className={`alert ${message.type}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">

          <div className="image-upload">
            <div className="image-box">
              {imagePreview ? <img src={imagePreview} alt="Profile" /> : <span>No Image</span>}
            </div>
            <input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && <button type="button" onClick={removeImage} className="remove-img">Remove Image</button>}
          </div>

          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required className="profile-input" />
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={(e) =>
              setFormData({ ...formData, age: e.target.value ? parseInt(e.target.value) : '' })
            }
            placeholder="Age"
            className="profile-input"
          />


          <select name="gender" value={formData.gender} onChange={handleChange} required className="profile-input">
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label className="checkbox-label">
            <input type="checkbox" name="isMuslim" checked={formData.isMuslim} onChange={handleChange} />
            Muslim
          </label>

          {formData.isMuslim && (
            <select
              name="sect"
              value={formData.sect}
              onChange={handleChange}
              className="profile-input"
            >
              <option value="">Select Sect</option>
              <option value="Sunni">Sunni</option>
              <option value="Shia">Shia</option>
              <option value="Ahle Hadith">Ahle Hadith</option>
              <option value="Deobandi">Deobandi</option>
              <option value="Barelvi">Barelvi</option>
              <option value="Prefer Not to Say">Prefer Not to Say</option>
            </select>

          )}

          <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" className="profile-input" />
          <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" className="profile-input" />
          <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests" className="profile-input" />
          <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" className="profile-input" />
          <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" className="profile-input" />
          <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About Me" className="profile-input"></textarea>

          <button type="submit" disabled={saving} className="save-btn">
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
