import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  FaUser, 
  FaLock, 
  FaShieldAlt, 
  FaBell, 
  FaExclamationTriangle, 
  FaEye, 
  FaCamera, 
  FaPhone, 
  FaEnvelope, 
  FaHeart, 
    FaComment,
    FaStar,
  FaGift 
} from "react-icons/fa";
import './Settings.css'

const API = import.meta.env.VITE_API

function Settings() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const tabs = [
  { id: 'profile', name: 'Profile Info', icon: <FaUser /> },
  { id: 'password', name: 'Password', icon: <FaLock /> },
  { id: 'privacy', name: 'Privacy', icon: <FaShieldAlt /> },
  { id: 'notifications', name: 'Notifications', icon: <FaBell /> },
  { id: 'danger', name: 'Account', icon: <FaExclamationTriangle /> }
]

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  })

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: false,
    showPhotos: false,
    showContact: false,
    allowMessages: false,
    showLastSeen: false
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: false,
    newMatches: false,
    messages: false,
    interests: false,
    promotions: false
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Helper function to show messages
  const showMessage = (message, isError = false) => {
    if (isError) {
      setErrorMessage(message)
      setTimeout(() => setErrorMessage(''), 3000)
    } else {
      setShowSuccessMessage(true)
      setTimeout(() => setShowSuccessMessage(false), 3000)
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) return navigate("/login")

    fetch(`${API}/settings`, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to load settings')
        return res.json()
      })
      .then(data => {
        setProfileData({
          fullName: data.name || "",
          email: data.email || "",
          phone: data.phone || "",
          dateOfBirth: data.dateOfBirth || "",
          gender: data.gender || ""
        })

        setPrivacySettings({
          showProfile: data.privacySettings?.showProfile ?? false,
          showPhotos: data.privacySettings?.showPhotos ?? false,
          showContact: data.privacySettings?.showContact ?? false,
          allowMessages: data.privacySettings?.allowMessages ?? false,
          showLastSeen: data.privacySettings?.showLastSeen ?? false
        })

        setNotificationSettings({
          emailNotifications: data.notificationSettings?.emailNotifications ?? false,
          newMatches: data.notificationSettings?.newMatches ?? false,
          messages: data.notificationSettings?.messages ?? false,
          interests: data.notificationSettings?.interests ?? false,
          promotions: data.notificationSettings?.promotions ?? false
        })
      })
      .catch(() => {
        showMessage('Failed to load settings', true)
        navigate("/login")
      })

    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  const handleProfileUpdate = async (e) => {
    e.preventDefault()
    setLoading(true)
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch(`${API}/settings/profile`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(profileData)
      })

      const data = await res.json()
      
      if (!res.ok) throw new Error(data.message || 'Update failed')
      
      showMessage('Profile updated successfully!')
    } catch (error) {
      showMessage(error.message, true)
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      return showMessage("Passwords do not match", true)
    }
    
    setLoading(true)
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch(`${API}/settings/password`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(passwordData)
      })

      const data = await res.json()
      
      if (!res.ok) throw new Error(data.message || 'Password update failed')
      
      setPasswordData({ currentPassword: "", newPassword: "", confirmPassword: "" })
      showMessage('Password updated successfully!')
    } catch (error) {
      showMessage(error.message, true)
    } finally {
      setLoading(false)
    }
  }

  const handlePrivacyUpdate = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch(`${API}/settings/privacy`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(privacySettings)
      })

      const data = await res.json()
      
      if (!res.ok) throw new Error(data.message || 'Privacy update failed')
      
      // 👇 STATE UPDATE WITH RESPONSE DATA
      if (data.privacySettings) {
        setPrivacySettings(data.privacySettings)
      }
      
      showMessage('Privacy settings updated!')
    } catch (error) {
      showMessage(error.message, true)
    } finally {
      setLoading(false)
    }
  }

  const handleNotificationUpdate = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch(`${API}/settings/notifications`, {
        method: "PUT",
        headers: { 
          "Content-Type": "application/json", 
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(notificationSettings)
      })

      const data = await res.json()
      
      if (!res.ok) throw new Error(data.message || 'Notification update failed')
      
      // 👇 STATE UPDATE WITH RESPONSE DATA
      if (data.notificationSettings) {
        setNotificationSettings(data.notificationSettings)
      }
      
      showMessage('Notification settings updated!')
    } catch (error) {
      showMessage(error.message, true)
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch(`${API}/settings/delete`, { 
        method: "DELETE", 
        headers: { Authorization: `Bearer ${token}` } 
      })

      if (!res.ok) throw new Error('Delete failed')
      
      localStorage.removeItem("token")
      navigate("/login")
    } catch (error) {
      showMessage(error.message, true)
      setShowDeleteConfirm(false)
    } finally {
      setLoading(false)
    }
  }

  const handleDeactivateAccount = async () => {
    setLoading(true)
    const token = localStorage.getItem("token")
    
    try {
      const res = await fetch(`${API}/settings/deactivate`, { 
        method: "PUT", 
        headers: { Authorization: `Bearer ${token}` } 
      })

      if (!res.ok) throw new Error('Deactivation failed')
      
      localStorage.removeItem("token")
      navigate("/login")
    } catch (error) {
      showMessage(error.message, true)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="settings-page">
      <main className="settings-main">
        {/* Header */}
        <div className={`settings-header ${isVisible ? 'visible' : ''}`}>
          <div className="header-bg-circle circle-1"></div>
          <div className="header-bg-circle circle-2"></div>
          
          <div className="header-content">
            <h1>Account Settings</h1>
            <p>Manage your account preferences and security</p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="success-message">
            <div className="success-content">
              <svg className="success-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p>Settings updated successfully!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMessage && (
          <div className="error-message">
            <div className="error-content">
              <svg className="error-icon" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p>{errorMessage}</p>
            </div>
          </div>
        )}

        {/* Settings Container */}
        <div className="settings-container">
          {/* Sidebar Tabs */}
          <div className={`settings-sidebar ${isVisible ? 'visible' : ''}`}>
            <div className="sidebar-inner">
              <nav className="sidebar-nav">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                  >
                    <span className="tab-icon">{tab.icon}</span>
                    <span className="tab-name">{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div className={`settings-content ${isVisible ? 'visible' : ''}`}>
            <div className="content-card">
              
              {/* Profile Info Tab */}
              {activeTab === 'profile' && (
                
                <div className="tab-content">
                  <h2 className="tab-title">
                    <span className="title-icon"><FaUser/></span>
                    Personal Information
                  </h2>
                  <form onSubmit={handleProfileUpdate} className="settings-form">
                    <div className="form-grid">
                      <div className="form-group">
                        <label>Full Name</label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div className="form-group">
                        <label>Email Address</label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          placeholder="your@email.com"
                        />
                      </div>

                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          placeholder="+92 300 1234567"
                        />
                      </div>

                      <div className="form-group">
                        <label>Date of Birth</label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                        />
                      </div>

                      <div className="form-group">
                        <label>Gender</label>
                        <select
                          value={profileData.gender}
                          onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div className="tab-content">
                  <h2 className="tab-title">
                    <span className="title-icon"><FaLock/></span>
                    Change Password
                  </h2>
                  <form onSubmit={handlePasswordChange} className="settings-form password-form">
                    <div className="form-group">
                      <label>Current Password</label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>New Password</label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        placeholder="Enter new password"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Confirm New Password</label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        placeholder="Confirm new password"
                        required
                      />
                    </div>

                    <div className="info-box">
                      <p>
                        <strong>Password Requirements:</strong> Minimum 8 characters, at least one uppercase letter, one number, and one special character.
                      </p>
                    </div>

                    <button type="submit" className="btn-primary full-width" disabled={loading}>
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </form>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="tab-content">
                  <h2 className="tab-title">
                    <span className="title-icon"><FaShieldAlt /></span>
                    Privacy Settings
                  </h2>
                  <div className="privacy-sections">
                    <div className="privacy-section purple">
                      <h3>Profile Visibility</h3>
                      <div className="privacy-options">
                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaEye /></div>
                            <div>
                              <p className="option-title">Show My Profile</p>
                              <p className="option-desc">Allow others to view your profile</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={privacySettings.showProfile}
                              onChange={(e) => setPrivacySettings({...privacySettings, showProfile: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaCamera /></div>
                            <div>
                              <p className="option-title">Show Photos</p>
                              <p className="option-desc">Display your photos to visitors</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={privacySettings.showPhotos}
                              onChange={(e) => setPrivacySettings({...privacySettings, showPhotos: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaPhone /></div>
                            <div>
                              <p className="option-title">Show Contact Info</p>
                              <p className="option-desc">Share phone number with matches</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={privacySettings.showContact}
                              onChange={(e) => setPrivacySettings({...privacySettings, showContact: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="privacy-section blue">
                      <h3>Communication</h3>
                      <div className="privacy-options">
                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaEnvelope /></div>
                            <div>
                              <p className="option-title">Allow Messages</p>
                              <p className="option-desc">Receive messages from matches</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={privacySettings.allowMessages}
                              onChange={(e) => setPrivacySettings({...privacySettings, allowMessages: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaHeart /></div>
                            <div>
                              <p className="option-title">Show Last Seen</p>
                              <p className="option-desc">Let others see when you were active</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={privacySettings.showLastSeen}
                              onChange={(e) => setPrivacySettings({...privacySettings, showLastSeen: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button onClick={handlePrivacyUpdate} className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Privacy Settings'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="tab-content">
                  <h2 className="tab-title">
                    <span className="title-icon"><FaBell /></span>
                    Notification Preferences
                  </h2>
                  <div className="privacy-sections">
                    <div className="privacy-section amber">
                      <h3>Email Notifications</h3>
                      <div className="privacy-options">
                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaEnvelope /></div>
                            <div>
                              <p className="option-title">Enable Email Notifications</p>
                              <p className="option-desc">Receive updates via email</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaHeart /></div>
                            <div>
                              <p className="option-title">New Matches</p>
                              <p className="option-desc">Get notified about new matches</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.newMatches}
                              onChange={(e) => setNotificationSettings({...notificationSettings, newMatches: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaComment /></div>
                            <div>
                              <p className="option-title">Messages</p>
                              <p className="option-desc">Alert for new messages</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.messages}
                              onChange={(e) => setNotificationSettings({...notificationSettings, messages: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaStar /></div>
                            <div>
                              <p className="option-title">Interests</p>
                              <p className="option-desc">When someone shows interest</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.interests}
                              onChange={(e) => setNotificationSettings({...notificationSettings, interests: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>

                        <label className="toggle-option">
                          <div className="option-info">
                            <div className="option-icon"><FaGift /></div>
                            <div>
                              <p className="option-title">Promotions</p>
                              <p className="option-desc">Special offers and updates</p>
                            </div>
                          </div>
                          <div className="toggle-switch">
                            <input
                              type="checkbox"
                              checked={notificationSettings.promotions}
                              onChange={(e) => setNotificationSettings({...notificationSettings, promotions: e.target.checked})}
                            />
                            <span className="toggle-slider"></span>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="form-actions">
                      <button onClick={handleNotificationUpdate} className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Notification Settings'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Danger Zone Tab */}
              {activeTab === 'danger' && (
                <div className="tab-content">
                  <h2 className="tab-title">
                    <span className="title-icon"><FaExclamationTriangle /></span>
                    Danger Zone
                  </h2>
                  <div className="danger-sections">
                    <div className="danger-section red">
                      <h3>Delete Account</h3>
                      <p>
                        Once you delete your account, there is no going back. This action will permanently remove your profile, messages, and all associated data.
                      </p>
                      <ul>
                        <li>All your profile information will be deleted</li>
                        <li>Your matches and conversations will be lost</li>
                        <li>You won't be able to recover your account</li>
                        <li>Other users won't be able to see your profile</li>
                      </ul>
                      <button onClick={() => setShowDeleteConfirm(true)} className="btn-danger" disabled={loading}>
                        Delete My Account
                      </button>
                    </div>

                    <div className="danger-section yellow">
                      <h3>Deactivate Account</h3>
                      <p>
                        Temporarily hide your profile from others. You can reactivate anytime.
                      </p>
                      <button onClick={handleDeactivateAccount} className="btn-warning" disabled={loading}>
                        {loading ? 'Processing...' : 'Deactivate Account'}
                      </button>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>

        {/* Delete Confirmation Modal */}
        {showDeleteConfirm && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <div className="modal-icon">⚠️</div>
                <h3>Delete Account?</h3>
                <p>
                  This action cannot be undone. All your data will be permanently removed.
                </p>
              </div>
              <div className="modal-actions">
                <button onClick={() => setShowDeleteConfirm(false)} className="btn-secondary" disabled={loading}>
                  Cancel
                </button>
                <button onClick={handleDeleteAccount} className="btn-danger" disabled={loading}>
                  {loading ? 'Deleting...' : 'Delete'}
                </button>
              </div>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}

export default Settings