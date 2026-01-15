import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import './Profile.css'

function Profile() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    gender: '',
    age: '',
    city: '',
    education: '',
    sect: '',
  })
  
  const [profileImage, setProfileImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }
    
    // Fetch existing profile
    fetchProfile()
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch('http://localhost:5000/api/profile', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.profile) {
          setFormData({
            gender: data.profile.gender || '',
            age: data.profile.age || '',
            city: data.profile.city || '',
            education: data.profile.education || '',
            sect: data.profile.sect || '',
          })
          // Set existing profile image if available
          if (data.profile.profileImage) {
            setImagePreview(data.profile.profileImage)
          }
        }
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }
  
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setMessage({ type: 'error', text: 'Image size should be less than 5MB' })
        return
      }
      
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setMessage({ type: 'error', text: 'Please upload an image file' })
        return
      }
      
      setProfileImage(file)
      
      // Create preview
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result)
      }
      reader.readAsDataURL(file)
    }
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
      const token = localStorage.getItem('token')
      
      // Create FormData for file upload
      const submitData = new FormData()
      submitData.append('gender', formData.gender)
      submitData.append('age', formData.age)
      submitData.append('city', formData.city)
      submitData.append('education', formData.education)
      submitData.append('sect', formData.sect)
      
      // Add image if selected
      if (profileImage) {
        submitData.append('profileImage', profileImage)
      }

      const response = await fetch('http://localhost:5000/api/profile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
          // Don't set Content-Type header - browser will set it automatically with boundary
        },
        body: submitData
      })

      const data = await response.json()

      if (response.ok) {
        setMessage({ type: 'success', text: 'Profile saved successfully! ✓' })
        setTimeout(() => {
          navigate('/dashboard')
        }, 2000)
      } else {
        setMessage({ type: 'error', text: data.message || 'Failed to save profile' })
      }
    } catch (error) {
      setMessage({ type: 'error', text: 'An error occurred. Please try again.' })
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
    <div className="profile-container">
      <main className="profile-main">
        {/* Header Section */}
        <div className={`profile-header ${!isVisible ? 'hidden' : ''}`}>
          <button onClick={() => navigate('/dashboard')} className="back-button">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>
          
          <div className="header-banner">
            <h1>My Profile</h1>
            <p>Complete your profile to find better matches</p>
          </div>
        </div>

        {/* Form Section */}
        <div className={`form-wrapper ${!isVisible ? 'hidden' : ''}`}>
          <div className="form-card">
            {/* Message Alert */}
            {message.text && (
              <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-error'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Profile Picture Upload */}
              <div className="profile-picture-section">
                <label className="profile-picture-label">
                  Profile Picture
                </label>
                
                <div className="image-preview-wrapper">
                  {/* Image Preview */}
                  <div className="image-preview">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile Preview" />
                    ) : (
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>
                  
                  {/* Remove Image Button */}
                  {imagePreview && (
                    <button type="button" onClick={removeImage} className="remove-image-button">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>
                
                {/* Upload Button */}
                <div className="upload-button-wrapper">
                  <label className="upload-button-label">
                    <div className="upload-button">
                      <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      <span>{imagePreview ? 'Change Photo' : 'Upload Photo'}</span>
                    </div>
                    <input type="file" accept="image/*" onChange={handleImageChange} />
                  </label>
                </div>
                <p className="upload-hint">Max size: 5MB (JPG, PNG, GIF)</p>
              </div>

              {/* Gender */}
              <div className="form-group">
                <label className="form-label">
                  Gender <span className="required">*</span>
                </label>
                <select name="gender" value={formData.gender} onChange={handleChange} required className="form-select">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* Age */}
              <div className="form-group">
                <label className="form-label">
                  Age <span className="required">*</span>
                </label>
                <input type="number" name="age" value={formData.age} onChange={handleChange} required min="18" max="100" placeholder="Enter your age" className="form-input" />
              </div>

              {/* City */}
              <div className="form-group">
                <label className="form-label">
                  City <span className="required">*</span>
                </label>
                <input type="text" name="city" value={formData.city} onChange={handleChange} required placeholder="Enter your city" className="form-input" />
              </div>

              {/* Education */}
              <div className="form-group">
                <label className="form-label">
                  Education <span className="required">*</span>
                </label>
                <select name="education" value={formData.education} onChange={handleChange} required className="form-select">
                  <option value="">Select Education</option>
                  <option value="High School">High School</option>
                  <option value="Bachelor's Degree">Bachelor's Degree</option>
                  <option value="Master's Degree">Master's Degree</option>
                  <option value="PhD">PhD</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              {/* Sect */}
              <div className="form-group">
                <label className="form-label">
                  Sect <span className="required">*</span>
                </label>
                <select name="sect" value={formData.sect} onChange={handleChange} required className="form-select">
                  <option value="">Select Sect</option>
                  <option value="Sunni">Sunni</option>
                  <option value="Shia">Shia</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Submit Button */}
              <div className="submit-button-wrapper">
                <button type="submit" disabled={saving} className="submit-button">
                  {saving ? (
                    <span className="submit-button-loading">
                      <svg className="loading-spinner" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10"></circle>
                        <path d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    'Save Profile'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>

    </div>
  )
}

export default Profile