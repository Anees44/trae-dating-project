import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

const API_BASE = import.meta.env.VITE_API // make sure this is VITE_API_BASE in .env

function Profile() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
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

  const token = localStorage.getItem('token')

  // Redirect if no token
  useEffect(() => {
    if (!token) {
      navigate('/login')
    }
  }, [token, navigate])

  // Decode current user ID from token
  let currentUserId = null
  try {
    if (token) currentUserId = JSON.parse(atob(token.split('.')[1])).id
  } catch {
    localStorage.removeItem('token')
    navigate('/login')
  }

  // Fetch existing profile
  useEffect(() => {
    if (!token) return
    fetchProfile()
    setTimeout(() => setIsVisible(true), 100)
  }, [token])

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      if (!res.ok) {
        if (res.status === 404) {
          setMessage({ type: 'info', text: 'No profile found. You can create one.' })
        } else {
          const text = await res.text()
          console.error('Fetch profile failed:', res.status, text)
          setMessage({ type: 'error', text: 'Failed to load profile.' })
        }
        setLoading(false)
        return
      }

      const data = await res.json()
      setFormData({
        fullName: data.fullName || '',
        gender: data.gender || '',
        age: data.age || '',
        isMuslim: data.isMuslim ?? true,
        sect: data.sect || '',
        city: data.city || '',
        education: data.education || '',
        interests: data.interests?.join(', ') || '',
        about: data.about || '',
        height: data.height || '',
        profession: data.profession || ''
      })
      if (data.image) setImagePreview(data.image)
    } catch (err) {
      console.error('Error fetching profile:', err)
      setMessage({ type: 'error', text: 'Failed to load profile data.' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = e => {
    const { name, value, checked } = e.target
    if (name === 'isMuslim') {
      setFormData({ ...formData, isMuslim: checked, sect: '' })
      return
    }
    if (name === 'age') {
      if (value !== '' && parseInt(value) < 18) {
        setMessage({ type: 'error', text: 'Age must be 18 or above.' })
        return
      }
    }
    setFormData({ ...formData, [name]: value })
  }

  const handleImageChange = e => {
    const file = e.target.files[0]
    if (!file) return
    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file.' })
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 5MB.' })
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

  const handleSubmit = async e => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    if (!formData.fullName || !formData.gender || !formData.age) {
      setMessage({ type: 'error', text: 'Full Name, Gender, and Age are required.' })
      setSaving(false)
      return
    }

    if (parseInt(formData.age) < 18) {
      setMessage({ type: 'error', text: 'Age must be 18 or above.' })
      setSaving(false)
      return
    }

    try {
      const submitData = new FormData()
      Object.entries(formData).forEach(([key, value]) => {
        // send interests as array
        if (key === 'interests') {
          const arr = value.split(',').map(i => i.trim()).filter(i => i)
          submitData.append(key, JSON.stringify(arr))
        } else {
          submitData.append(key, value ?? '')
        }
      })
      if (profileImage) submitData.append('image', profileImage)

      // Check if profile exists
      const existingRes = await fetch(`${API_BASE}/api/profiles/me`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      let method = 'POST'
      let endpoint = `${API_BASE}/api/profiles`
      if (existingRes.ok) {
        const existingData = await existingRes.json()
        endpoint = `${API_BASE}/api/profiles/${existingData._id}`
        method = 'PUT'
      }

      const res = await fetch(endpoint, {
        method,
        headers: { Authorization: `Bearer ${token}` }, // FormData → do not set Content-Type
        body: submitData
      })

      const data = await res.json()
      if (res.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully! ✓' })
        setTimeout(() => navigate('/dashboard'), 2000)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save profile.' })
        console.error('Error creating/updating profile:', data)
      }
    } catch (err) {
      console.error('Error saving profile:', err)
      setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again.' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-content">
          <div className="loading-spinner-large"></div>
          <p className="loading-text">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="profile-page">
      <main className={`profile-container ${isVisible ? 'visible' : ''}`}>
        <div className="profile-header">
          <button onClick={() => navigate('/dashboard')} className="back-btn">← Back</button>
          <div className="header-card">
            <h1>My Profile</h1>
            <p>Complete your profile to find better matches</p>
          </div>
        </div>

        {message.text && <div className={`alert ${message.type}`}>{message.text}</div>}

        <form onSubmit={handleSubmit} className="profile-form">
          {/* Image Upload */}
          <div className="form-section">
            <h3>Profile Picture</h3>
            <div className="image-upload">
              <div className="image-box">
                {imagePreview ? <img src={imagePreview} alt="Profile" /> : <div className="no-image">📷 No Image</div>}
              </div>
              <div className="image-actions">
                <label htmlFor="image-input" className="upload-btn">Choose Image</label>
                <input id="image-input" type="file" accept="image/*" onChange={handleImageChange} style={{ display: 'none' }} />
                {imagePreview && <button type="button" onClick={removeImage}>Remove</button>}
              </div>
            </div>
          </div>

          {/* Basic Info */}
          <div className="form-section">
            <h3>Basic Information</h3>
            <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Full Name" required />
            <input type="number" name="age" value={formData.age} onChange={handleChange} min="18" placeholder="Age" required />
            <select name="gender" value={formData.gender} onChange={handleChange} required>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
            <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" />
          </div>

          {/* Religious */}
          <div className="form-section">
            <label><input type="checkbox" name="isMuslim" checked={formData.isMuslim} onChange={handleChange} /> I am Muslim</label>
            {formData.isMuslim && (
              <select name="sect" value={formData.sect} onChange={handleChange}>
                <option value="">Select Sect</option>
                <option value="Sunni">Sunni</option>
                <option value="Shia">Shia</option>
                <option value="Ahle Hadith">Ahle Hadith</option>
                <option value="Deobandi">Deobandi</option>
                <option value="Barelvi">Barelvi</option>
                <option value="Prefer Not to Say">Prefer Not to Say</option>
              </select>
            )}
          </div>

          {/* Location & Education */}
          <div className="form-section">
            <input type="text" name="city" value={formData.city} onChange={handleChange} placeholder="City" />
            <input type="text" name="education" value={formData.education} onChange={handleChange} placeholder="Education" />
            <input type="text" name="profession" value={formData.profession} onChange={handleChange} placeholder="Profession" />
            <input type="text" name="interests" value={formData.interests} onChange={handleChange} placeholder="Interests (comma separated)" />
          </div>

          {/* About */}
          <div className="form-section">
            <textarea name="about" value={formData.about} onChange={handleChange} placeholder="About Me" rows="5"></textarea>
          </div>

          <button type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save Profile'}</button>
        </form>
      </main>
    </div>
  )
}

export default Profile
