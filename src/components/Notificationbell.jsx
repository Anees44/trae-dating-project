// NotificationBell.jsx - Floating notification component

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './NotificationBell.css';

const API_BASE = import.meta.env.VITE_API;

function NotificationBell() {
  const navigate = useNavigate();
  const panelRef = useRef(null);
  
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch unread count every 30 seconds
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    fetchUnreadCount();
    
    const interval = setInterval(fetchUnreadCount, 30000); // 30 seconds
    
    return () => clearInterval(interval);
  }, []);

  // Fetch full notifications when panel opens
  useEffect(() => {
    if (showPanel) {
      fetchNotifications();
    }
  }, [showPanel]);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setShowPanel(false);
      }
    };

    if (showPanel) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPanel]);

  const fetchUnreadCount = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch(`${API_BASE}/interests/notifications/unread-count`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching unread count:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE}/interests/notifications`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.unreadCount || 0);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAccept = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE}/interests/${notificationId}/accept`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok) {
        alert('Interest accepted! You can now start messaging. 💝');
        
        // Refresh notifications
        await fetchNotifications();
        await fetchUnreadCount();
        
        // Navigate to messages
        navigate('/messages');
      } else {
        alert(data.message || 'Failed to accept interest');
      }
    } catch (error) {
      console.error('Error accepting interest:', error);
      alert('An error occurred');
    }
  };

  const handleReject = async (notificationId) => {
    try {
      const token = localStorage.getItem('token');

      const res = await fetch(`${API_BASE}/interests/${notificationId}/reject`, {
        method: 'PUT',
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await res.json();

      if (res.ok) {
        alert('Interest rejected');
        
        // Refresh notifications
        await fetchNotifications();
        await fetchUnreadCount();
      } else {
        alert(data.message || 'Failed to reject interest');
      }
    } catch (error) {
      console.error('Error rejecting interest:', error);
      alert('An error occurred');
    }
  };

  const handleViewProfile = (userId) => {
    // You can implement profile viewing later
    console.log('View profile:', userId);
    alert('Profile viewing coming soon!');
  };

  // Don't show bell if no notifications
  if (unreadCount === 0 && !showPanel) {
    return null;
  }

  return (
    <>
      {/* Floating Bell Button */}
      <div className="notification-bell-container">
        <button 
          className="notification-bell-btn"
          onClick={() => setShowPanel(!showPanel)}
          aria-label="Notifications"
        >
          🔔
          {unreadCount > 0 && (
            <span className="notification-badge">{unreadCount}</span>
          )}
        </button>
      </div>

      {/* Notification Panel */}
      {showPanel && (
        <div className="notification-panel" ref={panelRef}>
          <div className="notification-panel-header">
            <h3>Notifications</h3>
            <button 
              className="close-panel-btn"
              onClick={() => setShowPanel(false)}
            >
              ×
            </button>
          </div>

          <div className="notification-panel-body">
            {loading ? (
              <div className="notification-loading">
                <div className="spinner"></div>
                <p>Loading...</p>
              </div>
            ) : notifications.length === 0 ? (
              <div className="no-notifications">
                <span className="empty-icon">🔕</span>
                <p>No notifications</p>
              </div>
            ) : (
              <div className="notifications-list">
                {notifications.map((notif) => (
                  <div 
                    key={notif._id} 
                    className={`notification-item ${notif.read ? 'read' : 'unread'}`}
                  >
                    <div className="notification-avatar">
                      <img 
                        src={notif.from.image} 
                        alt={notif.from.name}
                        onClick={() => handleViewProfile(notif.from._id)}
                      />
                    </div>

                    <div className="notification-content">
                      <div className="notification-header">
                        <strong>{notif.from.name}</strong>
                        {notif.from.age && <span>, {notif.from.age}</span>}
                      </div>
                      
                      <p className="notification-message">
                        💝 Sent you an interest
                      </p>

                      {notif.from.city && (
                        <p className="notification-location">📍 {notif.from.city}</p>
                      )}

                      <p className="notification-time">
                        {new Date(notif.createdAt).toLocaleDateString()} at{' '}
                        {new Date(notif.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>

                      {notif.status === 'pending' && (
                        <div className="notification-actions">
                          <button 
                            className="btn-accept"
                            onClick={() => handleAccept(notif._id)}
                          >
                            ✓ Accept
                          </button>
                          <button 
                            className="btn-reject"
                            onClick={() => handleReject(notif._id)}
                          >
                            ✕ Reject
                          </button>
                        </div>
                      )}

                      {notif.status === 'accepted' && (
                        <p className="status-badge accepted">✓ Accepted</p>
                      )}

                      {notif.status === 'rejected' && (
                        <p className="status-badge rejected">✕ Rejected</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="notification-panel-footer">
            <button 
              className="view-all-btn"
              onClick={() => {
                setShowPanel(false);
                navigate('/interests'); // You can create an interests page later
              }}
            >
              View All Interests
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default NotificationBell;