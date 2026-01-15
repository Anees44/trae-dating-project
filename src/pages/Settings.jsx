import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

function Settings() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showSuccessMessage, setShowSuccessMessage] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  const [profileData, setProfileData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: ''
  })

  const [privacySettings, setPrivacySettings] = useState({
    showProfile: true,
    showPhotos: true,
    showContact: false,
    allowMessages: true,
    showLastSeen: true
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    newMatches: true,
    messages: true,
    interests: true,
    promotions: false
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
    
    setProfileData({
      fullName: 'John Doe',
      email: 'john@example.com',
      phone: '+92 300 1234567',
      dateOfBirth: '1995-01-15',
      gender: 'male'
    })
    
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  const handleProfileUpdate = (e) => {
    e.preventDefault()

    console.log('Updating profile:', profileData)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handlePasswordChange = (e) => {
    e.preventDefault()
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }
    console.log('Changing password')
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handlePrivacyUpdate = () => {
    console.log('Updating privacy settings:', privacySettings)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleNotificationUpdate = () => {
    console.log('Updating notification settings:', notificationSettings)
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  const handleDeleteAccount = () => {

    console.log('Deleting account')
    localStorage.removeItem('token')
    navigate('/login')
  }

  const tabs = [
    { id: 'profile', name: 'Profile Info', icon: '👤' },
    { id: 'password', name: 'Password', icon: '🔒' },
    { id: 'privacy', name: 'Privacy', icon: '🛡️' },
    { id: 'notifications', name: 'Notifications', icon: '🔔' },
    { id: 'danger', name: 'Account', icon: '⚠️' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50 flex flex-col">
      <Navbar />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div 
          className={`relative overflow-hidden bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 rounded-3xl p-8 md:p-12 text-white shadow-2xl mb-8 transform transition-all duration-700 ${
            isVisible ? 'translate-y-0 opacity-100 scale-100' : '-translate-y-10 opacity-0 scale-95'
          }`}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white opacity-5 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative z-10">
            <h1 className="text-3xl md:text-5xl font-extrabold mb-3">
              Account Settings
            </h1>
            <p className="text-slate-200 text-lg">
              Manage your account preferences and security
            </p>
          </div>
        </div>

        {/* Success Message */}
        {showSuccessMessage && (
          <div className="mb-6 bg-green-50 border-l-4 border-green-500 p-4 rounded-lg shadow-md animate-fade-in">
            <div className="flex items-center">
              <svg className="w-6 h-6 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <p className="text-green-700 font-semibold">Settings updated successfully!</p>
            </div>
          </div>
        )}

        {/* Settings Container */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Tabs */}
          <div 
            className={`lg:col-span-1 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-4 sticky top-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-slate-500 to-slate-600 text-white shadow-lg scale-105'
                        : 'text-gray-700 hover:bg-gray-100 hover:scale-102'
                    }`}
                  >
                    <span className="text-2xl">{tab.icon}</span>
                    <span>{tab.name}</span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Content Area */}
          <div 
            className={`lg:col-span-3 transform transition-all duration-700 ${
              isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'
            }`}
          >
            <div className="bg-white rounded-2xl shadow-lg p-8">
              
              {/* Profile Info Tab */}
              {activeTab === 'profile' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">👤</span>
                    Personal Information
                  </h2>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <input
                          type="text"
                          value={profileData.fullName}
                          onChange={(e) => setProfileData({...profileData, fullName: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                          placeholder="Enter your full name"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                          placeholder="your@email.com"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                          placeholder="+92 300 1234567"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          value={profileData.dateOfBirth}
                          onChange={(e) => setProfileData({...profileData, dateOfBirth: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                          Gender
                        </label>
                        <select
                          value={profileData.gender}
                          onChange={(e) => setProfileData({...profileData, gender: e.target.value})}
                          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                        >
                          <option value="">Select Gender</option>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                          <option value="other">Other</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        type="submit"
                        className="px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Password Tab */}
              {activeTab === 'password' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">🔒</span>
                    Change Password
                  </h2>
                  <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Current Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                        placeholder="Enter current password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                        placeholder="Enter new password"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Confirm New Password
                      </label>
                      <input
                        type="password"
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-slate-500 focus:ring-4 focus:ring-slate-100 transition-all outline-none"
                        placeholder="Confirm new password"
                        required
                      />
                    </div>

                    <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
                      <p className="text-sm text-blue-700">
                        <strong>Password Requirements:</strong> Minimum 8 characters, at least one uppercase letter, one number, and one special character.
                      </p>
                    </div>

                    <button
                      type="submit"
                      className="w-full px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                    >
                      Update Password
                    </button>
                  </form>
                </div>
              )}

              {/* Privacy Tab */}
              {activeTab === 'privacy' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">🛡️</span>
                    Privacy Settings
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Profile Visibility</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                              <span className="text-xl">👁️</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Show My Profile</p>
                              <p className="text-sm text-gray-600">Allow others to view your profile</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacySettings.showProfile}
                              onChange={(e) => setPrivacySettings({...privacySettings, showProfile: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                              <span className="text-xl">📸</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Show Photos</p>
                              <p className="text-sm text-gray-600">Display your photos to visitors</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacySettings.showPhotos}
                              onChange={(e) => setPrivacySettings({...privacySettings, showPhotos: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                              <span className="text-xl">📞</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Show Contact Info</p>
                              <p className="text-sm text-gray-600">Share phone number with matches</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacySettings.showContact}
                              onChange={(e) => setPrivacySettings({...privacySettings, showContact: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-purple-500 peer-checked:to-pink-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Communication</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <span className="text-xl">💬</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Allow Messages</p>
                              <p className="text-sm text-gray-600">Receive messages from matches</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacySettings.allowMessages}
                              onChange={(e) => setPrivacySettings({...privacySettings, allowMessages: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                              <span className="text-xl">🕐</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Show Last Seen</p>
                              <p className="text-sm text-gray-600">Let others see when you were active</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={privacySettings.showLastSeen}
                              onChange={(e) => setPrivacySettings({...privacySettings, showLastSeen: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-blue-500 peer-checked:to-indigo-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handlePrivacyUpdate}
                        className="px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Save Privacy Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">🔔</span>
                    Notification Preferences
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Email Notifications</h3>
                      <div className="space-y-4">
                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                              <span className="text-xl">📧</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Enable Email Notifications</p>
                              <p className="text-sm text-gray-600">Receive updates via email</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notificationSettings.emailNotifications}
                              onChange={(e) => setNotificationSettings({...notificationSettings, emailNotifications: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                              <span className="text-xl">💝</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">New Matches</p>
                              <p className="text-sm text-gray-600">Get notified about new matches</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notificationSettings.newMatches}
                              onChange={(e) => setNotificationSettings({...notificationSettings, newMatches: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                              <span className="text-xl">💬</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Messages</p>
                              <p className="text-sm text-gray-600">Alert for new messages</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notificationSettings.messages}
                              onChange={(e) => setNotificationSettings({...notificationSettings, messages: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                              <span className="text-xl">⭐</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Interests</p>
                              <p className="text-sm text-gray-600">When someone shows interest</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notificationSettings.interests}
                              onChange={(e) => setNotificationSettings({...notificationSettings, interests: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>

                        <label className="flex items-center justify-between cursor-pointer group">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center group-hover:bg-amber-200 transition-colors">
                              <span className="text-xl">🎁</span>
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">Promotions</p>
                              <p className="text-sm text-gray-600">Special offers and updates</p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={notificationSettings.promotions}
                              onChange={(e) => setNotificationSettings({...notificationSettings, promotions: e.target.checked})}
                              className="sr-only peer"
                            />
                            <div className="w-14 h-8 bg-gray-300 rounded-full peer peer-checked:bg-gradient-to-r peer-checked:from-amber-500 peer-checked:to-orange-500 transition-all duration-300"></div>
                            <div className="absolute left-1 top-1 w-6 h-6 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6 shadow-md"></div>
                          </div>
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button
                        onClick={handleNotificationUpdate}
                        className="px-8 py-3 bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Save Notification Settings
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Danger Zone Tab */}
              {activeTab === 'danger' && (
                <div className="animate-fade-in">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                    <span className="text-3xl">⚠️</span>
                    Danger Zone
                  </h2>
                  <div className="space-y-6">
                    <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-red-600 mb-2">Delete Account</h3>
                      <p className="text-gray-700 mb-4">
                        Once you delete your account, there is no going back. This action will permanently remove your profile, messages, and all associated data.
                      </p>
                      <ul className="list-disc list-inside text-sm text-gray-600 mb-6 space-y-1">
                        <li>All your profile information will be deleted</li>
                        <li>Your matches and conversations will be lost</li>
                        <li>You won't be able to recover your account</li>
                        <li>Other users won't be able to see your profile</li>
                      </ul>
                      <button
                        onClick={() => setShowDeleteConfirm(true)}
                        className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Delete My Account
                      </button>
                    </div>

                    <div className="bg-yellow-50 border-2 border-yellow-200 rounded-xl p-6">
                      <h3 className="text-lg font-bold text-yellow-700 mb-2">Deactivate Account</h3>
                      <p className="text-gray-700 mb-4">
                        Temporarily hide your profile from others. You can reactivate anytime.
                      </p>
                      <button
                        className="px-6 py-3 bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                      >
                        Deactivate Account
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
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-fade-in">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl transform animate-scale-in">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-4xl">⚠️</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Delete Account?</h3>
                <p className="text-gray-600">
                  This action cannot be undone. All your data will be permanently removed.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteConfirm(false)}
                  className="flex-1 px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold rounded-xl transition-all duration-300"
                >
                  Cancel
                </button>
                <button
                  onClick={handleDeleteAccount}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-xl transition-all duration-300"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        )}

      </main>

      <Footer />

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes scale-in {
          from {
            opacity: 0;
            transform: scale(0.9);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  )
}

export default Settings