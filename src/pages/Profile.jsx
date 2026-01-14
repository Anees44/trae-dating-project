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
  const BACKEND_URL = "https://backend-production-217a.up.railway.app"

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
      return
    }

    fetchProfile()
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  // ================= FETCH PROFILE =================
  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token')

      const { data } = await axios.get(`${API_PROFILE}/me`, {
        headers: { Authorization: `Bearer ${token}` },
      })

      setFormData({
        gender: data.gender || '',
        age: data.age || '',
        city: data.city || '',
        education: data.education || '',
        sect: data.sect || '',
      })

      if (data.image) {
        setImagePreview(`${BACKEND_URL}${data.image}`)
      }

    } catch (err) {
      if (err.response?.status !== 404) {
        setMessage({ type: 'error', text: 'Failed to load profile' })
      }
    } finally {
      setLoading(false)
    }
  }

  // ================= FORM HANDLERS =================
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
    setImagePreview(URL.createObjectURL(file))
  }

  const removeImage = () => {
    setProfileImage(null)
    setImagePreview(null)
  }

  // ================= SAVE PROFILE =================
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setMessage({ type: '', text: '' })

    try {
      const token = localStorage.getItem('token')
      const submitData = new FormData()

      Object.keys(formData).forEach((key) =>
        submitData.append(key, formData[key])
      )

      if (profileImage) {
        submitData.append('image', profileImage) // must be "image"
      }

      try {
        // First try update
        await axios.put(`${API_PROFILE}/me`, submitData, {
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch (err) {
        if (err.response?.status === 404) {
          // If not found, create
          await axios.post(API_PROFILE, submitData, {
            headers: { Authorization: `Bearer ${token}` },
          })
        } else {
          throw err
        }
      }

      setMessage({ type: 'success', text: 'Profile saved successfully! ✓' })
      setTimeout(() => navigate('/dashboard'), 1500)

    } catch (err) {
      setMessage({
        type: 'error',
        text: err.response?.data?.message || 'Failed to save profile',
      })
    } finally {
      setSaving(false)
    }
  }

  // ================= LOADING =================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading profile...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 flex flex-col">
      <main className="flex-grow max-w-4xl mx-auto px-4 py-12 w-full">

        {message.text && (
          <div className={`mb-6 p-4 rounded-xl ${
            message.type === 'success'
              ? 'bg-green-50 text-green-700'
              : 'bg-red-50 text-red-700'
          }`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* IMAGE */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border">
              {imagePreview ? (
                <img src={imagePreview} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  No Image
                </div>
              )}
            </div>

            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {/* FIELDS */}
          {['gender', 'age', 'city', 'education', 'sect'].map((field) => (
            <input
              key={field}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field}
              className="w-full border p-2 rounded"
              required
            />
          ))}

          <button
            type="submit"
            disabled={saving}
            className="w-full bg-pink-600 text-white py-3 rounded"
          >
            {saving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default Profile
