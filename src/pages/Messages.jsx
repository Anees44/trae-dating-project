import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import './Messages.css'

function Messages() {
  const navigate = useNavigate()
  const [isVisible, setIsVisible] = useState(false)
  const [selectedChat, setSelectedChat] = useState(null)
  const [messageText, setMessageText] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)
  const messagesEndRef = useRef(null)

  // Dummy conversations data - Replace with API call
  const [conversations, setConversations] = useState([
    {
      id: 1,
      userId: 1,
      name: 'Sarah Ahmed',
      image: 'https://i.pravatar.cc/100?img=5',
      lastMessage: 'Thank you for your interest! I would love to know more about you.',
      timestamp: '2 mins ago',
      unread: 3,
      online: true,
      typing: false
    },
    {
      id: 2,
      userId: 2,
      name: 'Fatima Khan',
      image: 'https://i.pravatar.cc/100?img=9',
      lastMessage: 'That sounds wonderful! When would be a good time to talk?',
      timestamp: '1 hour ago',
      unread: 0,
      online: false,
      typing: false
    },
    {
      id: 3,
      userId: 3,
      name: 'Ayesha Malik',
      image: 'https://i.pravatar.cc/100?img=10',
      lastMessage: 'I really appreciate your message 😊',
      timestamp: '3 hours ago',
      unread: 1,
      online: true,
      typing: false
    },
    {
      id: 4,
      userId: 4,
      name: 'Zainab Ali',
      image: 'https://i.pravatar.cc/100?img=20',
      lastMessage: 'Looking forward to connecting with you!',
      timestamp: '1 day ago',
      unread: 0,
      online: false,
      typing: false
    },
    {
      id: 5,
      userId: 5,
      name: 'Hira Hussain',
      image: 'https://i.pravatar.cc/100?img=23',
      lastMessage: 'Thank you for reaching out 💕',
      timestamp: '2 days ago',
      unread: 0,
      online: true,
      typing: false
    }
  ])

  // Dummy messages for selected chat - Replace with API call
  const [messages, setMessages] = useState({
    1: [
      {
        id: 1,
        senderId: 1,
        text: 'Hi! I saw your profile and would love to connect.',
        timestamp: '10:30 AM',
        delivered: true,
        read: true
      },
      {
        id: 2,
        senderId: 'me',
        text: 'Hello! Thank you for your interest. I\'d be happy to get to know you better.',
        timestamp: '10:35 AM',
        delivered: true,
        read: true
      },
      {
        id: 3,
        senderId: 1,
        text: 'That\'s wonderful! Could you tell me a bit about your family and background?',
        timestamp: '10:40 AM',
        delivered: true,
        read: true
      },
      {
        id: 4,
        senderId: 'me',
        text: 'Of course! I come from a close-knit family. My parents are both educators and I have one younger sister.',
        timestamp: '10:45 AM',
        delivered: true,
        read: true
      },
      {
        id: 5,
        senderId: 1,
        text: 'Thank you for your interest! I would love to know more about you.',
        timestamp: '10:50 AM',
        delivered: true,
        read: false
      }
    ],
    2: [
      {
        id: 1,
        senderId: 'me',
        text: 'Hello! I noticed we share similar interests.',
        timestamp: 'Yesterday',
        delivered: true,
        read: true
      },
      {
        id: 2,
        senderId: 2,
        text: 'That sounds wonderful! When would be a good time to talk?',
        timestamp: 'Yesterday',
        delivered: true,
        read: true
      }
    ],
    3: [
      {
        id: 1,
        senderId: 3,
        text: 'I really appreciate your message 😊',
        timestamp: '3 hours ago',
        delivered: true,
        read: false
      }
    ]
  })

  const emojis = ['😊', '😍', '❤️', '👍', '🙏', '😄', '🌹', '💕', '✨', '🎉']

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      navigate('/login')
    }
    
    // Fetch conversations from your API here
    // fetchConversations()
    
    setTimeout(() => setIsVisible(true), 100)
  }, [navigate])

  useEffect(() => {
    // Scroll to bottom when messages change
    scrollToBottom()
  }, [messages, selectedChat])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleSendMessage = (e) => {
    e.preventDefault()
    if (!messageText.trim() || !selectedChat) return

    const newMessage = {
      id: Date.now(),
      senderId: 'me',
      text: messageText,
      timestamp: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
      delivered: true,
      read: false
    }

    // Update messages
    setMessages(prev => ({
      ...prev,
      [selectedChat]: [...(prev[selectedChat] || []), newMessage]
    }))

    // Update last message in conversation
    setConversations(prev => prev.map(conv => 
      conv.id === selectedChat 
        ? { ...conv, lastMessage: messageText, timestamp: 'Just now', unread: 0 }
        : conv
    ))

    setMessageText('')
    setShowEmojiPicker(false)

    // Add your API call here to send message
    // sendMessageToAPI(selectedChat, messageText)
  }

  const handleEmojiClick = (emoji) => {
    setMessageText(prev => prev + emoji)
    setShowEmojiPicker(false)
  }

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId)
    
    // Mark messages as read
    setConversations(prev => prev.map(conv => 
      conv.id === chatId ? { ...conv, unread: 0 } : conv
    ))

    // Fetch messages for this conversation from API
    // fetchMessages(chatId)
  }

  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const selectedConversation = conversations.find(conv => conv.id === selectedChat)
  const currentMessages = selectedChat ? (messages[selectedChat] || []) : []

  const formatTime = (timestamp) => {
    return timestamp
  }

  return (
    <div className="messages-page">
      <Navbar />

      <main className="messages-main">
        {/* Header */}
        <div className={`messages-header ${isVisible ? 'visible' : ''}`}>
          <div className="header-bg-circle circle-1"></div>
          <div className="header-bg-circle circle-2"></div>
          
          <div className="header-content">
            <h1>Messages</h1>
            <p>Connect and communicate with your matches 💬</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className={`messages-container ${isVisible ? 'visible' : ''}`}>
          
          {/* Conversations List */}
          <div className="conversations-sidebar">
            <div className="sidebar-header">
              <h2>Chats</h2>
              <div className="unread-badge">
                {conversations.reduce((sum, conv) => sum + conv.unread, 0)}
              </div>
            </div>

            {/* Search */}
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Conversations List */}
            <div className="conversations-list">
              {filteredConversations.length > 0 ? (
                filteredConversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`conversation-item ${selectedChat === conv.id ? 'active' : ''}`}
                    onClick={() => handleChatSelect(conv.id)}
                  >
                    <div className="conv-avatar-container">
                      <img src={conv.image} alt={conv.name} className="conv-avatar" />
                      {conv.online && <span className="online-indicator"></span>}
                    </div>
                    
                    <div className="conv-details">
                      <div className="conv-header">
                        <h3 className="conv-name">{conv.name}</h3>
                        <span className="conv-time">{conv.timestamp}</span>
                      </div>
                      <div className="conv-message-row">
                        <p className="conv-last-message">
                          {conv.typing ? (
                            <span className="typing-indicator">
                              <span></span><span></span><span></span>
                            </span>
                          ) : (
                            conv.lastMessage
                          )}
                        </p>
                        {conv.unread > 0 && (
                          <span className="unread-count">{conv.unread}</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-conversations">
                  <p>No conversations found</p>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-area">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-user-info">
                    <div className="chat-avatar-container">
                      <img src={selectedConversation.image} alt={selectedConversation.name} />
                      {selectedConversation.online && <span className="online-indicator"></span>}
                    </div>
                    <div className="chat-user-details">
                      <h3>{selectedConversation.name}</h3>
                      <p className="user-status">
                        {selectedConversation.typing ? 'Typing...' : selectedConversation.online ? 'Online' : 'Offline'}
                      </p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="chat-action-btn" title="Voice Call">
                      📞
                    </button>
                    <button className="chat-action-btn" title="Video Call">
                      📹
                    </button>
                    <button className="chat-action-btn" title="More Options">
                      ⋮
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="messages-area">
                  <div className="messages-list">
                    {currentMessages.map((message) => (
                      <div
                        key={message.id}
                        className={`message-bubble ${message.senderId === 'me' ? 'sent' : 'received'}`}
                      >
                        <div className="message-content">
                          <p>{message.text}</p>
                          <div className="message-meta">
                            <span className="message-time">{message.timestamp}</span>
                            {message.senderId === 'me' && (
                              <span className="message-status">
                                {message.read ? '✓✓' : message.delivered ? '✓✓' : '✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="message-input-container">
                  <form onSubmit={handleSendMessage} className="message-input-form">
                    <button
                      type="button"
                      className="emoji-btn"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      😊
                    </button>

                    {showEmojiPicker && (
                      <div className="emoji-picker">
                        {emojis.map((emoji, index) => (
                          <button
                            key={index}
                            type="button"
                            className="emoji-item"
                            onClick={() => handleEmojiClick(emoji)}
                          >
                            {emoji}
                          </button>
                        ))}
                      </div>
                    )}

                    <input
                      type="text"
                      placeholder="Type a message..."
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      className="message-input"
                    />

                    <button type="button" className="attach-btn" title="Attach File">
                      📎
                    </button>

                    <button 
                      type="submit" 
                      className="send-btn"
                      disabled={!messageText.trim()}
                    >
                      <span className="send-icon">➤</span>
                    </button>
                  </form>
                </div>
              </>
            ) : (
              <div className="no-chat-selected">
                <div className="no-chat-icon">💬</div>
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the left to start messaging</p>
              </div>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className={`tips-section ${isVisible ? 'visible' : ''}`}>
          <div className="tip-card">
            <span className="tip-icon">🛡️</span>
            <div className="tip-content">
              <h4>Stay Safe</h4>
              <p>Never share personal information like phone numbers or addresses in initial messages.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-icon">💝</span>
            <div className="tip-content">
              <h4>Be Respectful</h4>
              <p>Treat others with kindness and respect. Building meaningful connections starts with good communication.</p>
            </div>
          </div>
          <div className="tip-card">
            <span className="tip-icon">⚡</span>
            <div className="tip-content">
              <h4>Quick Responses</h4>
              <p>Respond promptly to show interest and keep the conversation flowing naturally.</p>
            </div>
          </div>
        </div>

      </main>

    </div>
  )
}

export default Messages