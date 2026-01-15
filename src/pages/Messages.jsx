import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import './Messages.css'

const API_BASE = import.meta.env.VITE_API

function Messages() {
  const navigate = useNavigate()
  const messagesEndRef = useRef(null)

  const [conversations, setConversations] = useState([])
  const [selectedChat, setSelectedChat] = useState(null)
  const [messages, setMessages] = useState([])
  const [messageText, setMessageText] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return navigate('/login')

    fetchConversations(token)
  }, [navigate])

  const fetchConversations = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/api/messages/conversations`, {
        headers: { Authorization: `Bearer ${token}` }
      })

      const data = await res.json()
      setConversations(data)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const fetchMessages = async (chatId) => {
    const token = localStorage.getItem('token')

    const res = await fetch(`${API_BASE}/api/messages/${chatId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })

    const data = await res.json()
    setMessages(data)
    setSelectedChat(chatId)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText.trim() || !selectedChat) return

    const token = localStorage.getItem('token')

    await fetch(`${API_BASE}/api/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        chatId: selectedChat,
        text: messageText
      })
    })

    setMessageText('')
    fetchMessages(selectedChat)
  }

  return (
    <div className="messages-page">
      <Navbar />

      <div className="messages-container">
        {/* LEFT */}
        <div className="conversations-sidebar">
          <h3>Chats</h3>

          {loading && <p>Loading chats...</p>}

          {!loading && conversations.length === 0 && (
            <p>No conversation has started yet</p>
          )}

          {conversations.map(chat => (
            <div
              key={chat._id}
              onClick={() => fetchMessages(chat._id)}
              style={{ cursor: 'pointer' }}
            >
              {chat.user.name}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="chat-area">
          {!selectedChat ? (
            <p>Select a conversation to start messaging</p>
          ) : (
            <>
              <div className="messages-list">
                {messages.length === 0 ? (
                  <p>No messages yet</p>
                ) : (
                  messages.map(m => (
                    <div key={m._id}>
                      <p>{m.text}</p>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={handleSendMessage}>
                <input
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type a message..."
                />
                <button type="submit">Send</button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Messages
