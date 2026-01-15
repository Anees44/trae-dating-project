import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Settings.css'

function Settings() {
  const navigate = useNavigate()
  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  })
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [activeTab, setActiveTab] = useState('profile')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)

  const token = localStorage.getItem('token')
  const API_PROFILE = import.meta.env.VITE_API_PROFILE
  const axiosConfig = { headers: { Authorization: `Bearer ${token}` } }

  useEffect(() => {
    if (!token) return navigate('/login')

    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_PROFILE}/me`, axiosConfig)
        setProfileData({
          fullName: res.data.fullName || '',
          email: res.data.email || '',
          phone: res.data.phone || '',
          dateOfBirth: res.data.dateOfBirth?.split('T')[0] || '',
          gender: res.data.gender || ''
        })
      } catch (err) {
        // If profile not found, create an empty one
        if (err.response?.status === 404) {
          const emptyProfile = {
            fullName: '',
            email: '',
            phone: '',
            dateOfBirth: '',
            gender: ''
          }
          await axios.post(`${API_PROFILE}`, emptyProfile, axiosConfig)
          const newProfile = await axios.get(`${API_PROFILE}/me`, axiosConfig)
          setProfileData({
            fullName: newProfile.data.fullName || '',
            email: newProfile.data.email || '',
            phone: newProfile.data.phone || '',
            dateOfBirth: newProfile.data.dateOfBirth?.split('T')[0] || '',
            gender: newProfile.data.gender || ''
          })
        } else {
          localStorage.removeItem('token')
          navigate('/login')
        }
      }
    }

    fetchProfile()
  }, [navigate, token])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    try {
      await axios.put(`${API_PROFILE}/me`, profileData, axiosConfig)
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to update profile')
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) return alert('Passwords do not match!')
    try {
      await axios.put(`${API_PROFILE}/change-password`, {
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      }, axiosConfig)
      setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' })
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to change password')
    }
  }

  const handleEmailChange = async (newEmail) => {
    try {
      const res = await axios.put(`${API_PROFILE}/change-email`, { newEmail }, axiosConfig)
      setProfileData(prev => ({ ...prev, email: res.data.email }))
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to change email')
    }
  }

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account?')) return
    try {
      await axios.delete(`${API_PROFILE}/delete`, axiosConfig)
      localStorage.removeItem('token')
      navigate('/login')
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete account')
    }
  }

  const tabs = [
    { id: 'profile', name: 'Profile' },
    { id: 'password', name: 'Password' },
    { id: 'danger', name: 'Account' }
  ]

  return (
    <div className="settings-page">
      <Navbar />
      {showSuccessMessage && <div className="success-message">Updated successfully!</div>}

      <div className="settings-container">
        <div className="settings-sidebar">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={activeTab === tab.id ? 'active' : ''}>
              {tab.name}
            </button>
          ))}
        </div>

        <div className="settings-content">
          {activeTab === 'profile' && (
            <form onSubmit={handleProfileUpdate}>
              <input type="text" value={profileData.fullName} onChange={e => setProfileData({...profileData, fullName: e.target.value})} placeholder="Full Name"/>
              <input type="email" value={profileData.email} onChange={e => setProfileData({...profileData, email: e.target.value})} placeholder="Email"/>
              <input type="tel" value={profileData.phone} onChange={e => setProfileData({...profileData, phone: e.target.value})} placeholder="Phone"/>
              <input type="date" value={profileData.dateOfBirth} onChange={e => setProfileData({...profileData, dateOfBirth: e.target.value})}/>
              <select value={profileData.gender} onChange={e => setProfileData({...profileData, gender: e.target.value})}>
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <button type="submit">Save Profile</button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handlePasswordChange}>
              <input type="password" value={passwordData.oldPassword} onChange={e => setPasswordData({...passwordData, oldPassword: e.target.value})} placeholder="Current Password"/>
              <input type="password" value={passwordData.newPassword} onChange={e => setPasswordData({...passwordData, newPassword: e.target.value})} placeholder="New Password"/>
              <input type="password" value={passwordData.confirmPassword} onChange={e => setPasswordData({...passwordData, confirmPassword: e.target.value})} placeholder="Confirm Password"/>
              <button type="submit">Change Password</button>
            </form>
          )}

          {activeTab === 'danger' && (
            <button onClick={handleDeleteAccount} className="btn-danger">Delete Account</button>
          )}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Settings
