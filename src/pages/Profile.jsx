import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

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

  const API_PROFILE = import.meta.env.VITE_API_PROFILE

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchProfile()
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  const fetchProfile = async () => {
    if (!API_PROFILE) {
      setMessage({ type: 'error', text: 'API URL not defined!' })
      setLoading(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(API_PROFILE, {
        headers: { Authorization: `Bearer ${token}` },
      })

      if (data.profile) {
        setFormData({
          gender: data.profile.gender || '',
          age: data.profile.age || '',
          city: data.profile.city || '',
          education: data.profile.education || '',
          sect: data.profile.sect || '',
        })

        if (data.profile.profileImage) setImagePreview(data.profile.profileImage)
      }
    } catch (err) {
      console.error('Error fetching profile:', err)
      setMessage({ type: 'error', text: 'Failed to load profile' })
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setMessage({ type: 'error', text: 'Please upload an image file' })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      setMessage({ type: 'error', text: 'Image size should be less than 5MB' })
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

    if (!API_PROFILE) {
      setMessage({ type: 'error', text: 'API URL not defined!' })
      setSaving(false)
      return
    }

    try {
      const token = localStorage.getItem('token')
      const submitData = new FormData()
      Object.keys(formData).forEach((key) => submitData.append(key, formData[key]))
      if (profileImage) submitData.append('profileImage', profileImage)

      const { data } = await axios.post(API_PROFILE, submitData, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setMessage({ type: 'success', text: 'Profile saved successfully! ✓' })
      setTimeout(() => navigate('/dashboard'), 2000)
    } catch (err) {
      console.error(err)
      setMessage({ type: 'error', text: err.response?.data?.message || 'Failed to save profile' })
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
        {/* Header */}
        <div className={`transform transition-all duration-700 mb-8 ${isVisible ? 'translate-y-0 opacity-100' : '-translate-y-10 opacity-0'}`}>
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center text-pink-600 hover:text-pink-700 mb-4 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </button>

          <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 rounded-3xl p-8 text-white shadow-2xl">
            <h1 className="text-3xl md:text-4xl font-extrabold mb-2">My Profile</h1>
            <p className="text-pink-100 text-lg">Complete your profile to find better matches</p>
          </div>
        </div>

        {/* Form */}
        <div className={`transform transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`} style={{ transitionDelay: '200ms' }}>
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-10">
            {message.text && (
              <div className={`mb-6 p-4 rounded-xl ${message.type === 'success' ? 'bg-green-50 text-green-700 border border-green-200' : 'bg-red-50 text-red-700 border border-red-200'}`}>
                {message.text}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Profile Picture */}
              <div className="flex flex-col items-center mb-8">
                <label className="block text-sm font-semibold text-gray-700 mb-4 text-center">Profile Picture</label>
                <div className="relative">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-pink-200 shadow-lg bg-gray-100 flex items-center justify-center">
                    {imagePreview ? (
                      <img src={imagePreview} alt="Profile Preview" className="w-full h-full object-cover" />
                    ) : (
                      <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    )}
                  </div>

                  {imagePreview && (
                    <button type="button" onClick={removeImage} className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 shadow-lg transition-all transform hover:scale-110">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  )}
                </div>

                <label className="mt-4 cursor-pointer">
                  <div className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2">
                    <span>{imagePreview ? 'Change Photo' : 'Upload Photo'}</span>
                  </div>
                  <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                </label>
                <p className="text-xs text-gray-500 mt-2">Max size: 5MB (JPG, PNG, GIF)</p>
              </div>

              {/* Other fields */}
              {['gender', 'age', 'city', 'education', 'sect'].map((field) => (
                <div key={field}>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">{field.charAt(0).toUpperCase() + field.slice(1)} <span className="text-red-500">*</span></label>
                  {field === 'gender' || field === 'education' || field === 'sect' ? (
                    <select name={field} value={formData[field]} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none">
                      <option value="">Select {field.charAt(0).toUpperCase() + field.slice(1)}</option>
                      {field === 'gender' && (<><option value="Male">Male</option><option value="Female">Female</option></>)}
                      {field === 'education' && (<><option value="High School">High School</option><option value="Bachelor's Degree">Bachelor's Degree</option><option value="Master's Degree">Master's Degree</option><option value="PhD">PhD</option><option value="Other">Other</option></>)}
                      {field === 'sect' && (<><option value="Sunni">Sunni</option><option value="Shia">Shia</option><option value="Other">Other</option><option value="Prefer not to say">Prefer not to say</option></>)}
                    </select>
                  ) : (
                    <input type={field === 'age' ? 'number' : 'text'} name={field} value={formData[field]} onChange={handleChange} required className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-pink-500 focus:ring-2 focus:ring-pink-200 transition-all outline-none" placeholder={`Enter your ${field}`} />
                  )}
                </div>
              ))}

              <div className="pt-4">
                <button type="submit" disabled={saving} className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg">
                  {saving ? 'Saving...' : 'Save Profile'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
