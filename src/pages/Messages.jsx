import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Messages.css";
import { io } from "socket.io-client";
import {
  FaComments,
  FaSearch,
  FaTrash,
  FaSmile,
  FaPaperclip,
  FaPaperPlane,
  FaPhoneAlt,
  FaVideo, FaEllipsisV
} from "react-icons/fa";


const API_BASE = import.meta.env.VITE_API || "http://localhost:5000/api";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_BASE || "http://localhost:5000";

function Messages() {
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null); // ⭐ FIXED: Added this ref
  const socketRef = useRef(null);

  const [conversations, setConversations] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);

  // Get current user ID from token
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        setCurrentUserId(payload.id);
        console.log("Current user ID:", payload.id);
      } catch (err) {
        console.error("Error parsing token:", err);
      }
    }
  }, []);

  // Scroll to bottom function
  const scrollToBottom = () => {
    const container = messagesContainerRef.current;
    if (!container) return;
    container.scrollTop = container.scrollHeight;
  };

  // Initialize Socket.IO
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    // Connect to Socket.IO
    socketRef.current = io(SOCKET_URL, {
      auth: { token },
      transports: ["websocket", "polling"],
    });

    socketRef.current.on("connect", () => {
      console.log("✅ Socket.IO connected:", socketRef.current.id);
    });

    socketRef.current.on("disconnect", () => {
      console.log("❌ Socket.IO disconnected");
    });

    // ⭐ FIXED: Listen for new messages with proper isMine detection
    socketRef.current.on("newMessage", (message) => {
      console.log("📩 New message received:", message);
      console.log("Message sender ID:", message.sender?._id);
      console.log("Current user ID:", currentUserId);
      
      // ⭐ Set correct isMine based on sender
      const messageWithCorrectSide = {
        ...message,
        isMine: message.sender?._id === currentUserId || message.sender === currentUserId
      };
      
      console.log("Setting isMine to:", messageWithCorrectSide.isMine);
      
      setMessages((prev) => [...prev, messageWithCorrectSide]);
      
      // Auto scroll for new messages
      setTimeout(scrollToBottom, 100);
    });

    // Listen for message deletions
    socketRef.current.on("messageDeleted", ({ messageId }) => {
      console.log("🗑️ Message deleted:", messageId);
      setMessages((prev) => prev.filter((msg) => msg._id !== messageId));
    });

    fetchConversations(token);
    setTimeout(() => setIsVisible(true), 100);

    // Cleanup on unmount
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [navigate, currentUserId]);

  // Scroll to bottom when chat is first opened or messages change
  useEffect(() => {
    if (messages.length > 0 && selectedChat) {
      setTimeout(scrollToBottom, 300);
    }
  }, [selectedChat, messages.length]);

  const fetchConversations = async (token) => {
    try {
      const res = await fetch(`${API_BASE}/messages/conversations`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      console.log("Conversations response:", data);

      if (data.success && data.conversations) {
        setConversations(data.conversations);
      } else {
        setConversations([]);
      }
    } catch (err) {
      console.error("Error fetching conversations:", err);
      setConversations([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMessages = async (matchId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/messages/${matchId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = await res.json();
      
      if (data.success && data.messages) {
        // ⭐ FIXED: Ensure each message has correct isMine flag
        const messagesWithCorrectSide = data.messages.map(msg => ({
          ...msg,
          isMine: msg.sender._id === currentUserId || msg.sender === currentUserId
        }));
        setMessages(messagesWithCorrectSide);
      } else {
        setMessages([]);
      }
      
      setSelectedChat(matchId);

      // Join Socket.IO room for this chat
      if (socketRef.current) {
        socketRef.current.emit("joinChat", matchId);
        console.log("Joined chat room:", matchId);
      }
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || !selectedChat) return;

    setSending(true);
    const token = localStorage.getItem("token");

    const tempId = Date.now();
    const newMessage = {
      _id: tempId,
      text: messageText.trim(),
      isMine: true,
      createdAt: new Date(),
      sender: { _id: currentUserId },
    };

    // Instant UI update
    setMessages((prev) => [...prev, newMessage]);
    setMessageText("");

    // Auto scroll for sent messages
    setTimeout(scrollToBottom, 100);

    try {
      const res = await fetch(`${API_BASE}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          matchId: selectedChat,
          text: newMessage.text,
        }),
      });

      const data = await res.json();
      if (data.success) {
        console.log("✅ Message sent successfully:", data.message);
        
        // Replace temp message with real one
        setMessages((prev) =>
          prev.map((msg) => (msg._id === tempId ? data.message : msg)),
        );

        // ⭐ FIXED: Emit to Socket.IO for INSTANT delivery to other user
        if (socketRef.current) {
          console.log("📤 Broadcasting message to room:", selectedChat);
          socketRef.current.emit("sendMessage", {
            matchId: selectedChat,
            message: data.message,
          });
        }
      } else {
        console.error("Failed to send message:", data);
        setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
        alert("Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setMessages((prev) => prev.filter((msg) => msg._id !== tempId));
      alert("Error sending message");
    } finally {
      setSending(false);
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!confirm("Delete this message?")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/messages/${messageId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setMessages((prev) => prev.filter((msg) => msg._id !== messageId));

        // Emit deletion to Socket.IO for INSTANT update
        if (socketRef.current) {
          socketRef.current.emit("deleteMessage", {
            matchId: selectedChat,
            messageId,
          });
        }
      } else {
        alert("Failed to delete message");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Error deleting message");
    }
  };

  const handleDeleteConversation = async (matchId) => {
    if (!confirm("Delete this conversation? This cannot be undone.")) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_BASE}/matches/${matchId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setConversations((prev) =>
          prev.filter((conv) => conv.matchId !== matchId),
        );
        if (selectedChat === matchId) {
          setSelectedChat(null);
          setMessages([]);
        }
        alert("Conversation deleted");
      } else {
        alert("Failed to delete conversation");
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
      alert("Error deleting conversation");
    }
  };

  const handleEmojiClick = (emoji) => {
    setMessageText((prev) => prev + emoji);
    setShowEmojiPicker(false);
  };

  const getTimeAgo = (date) => {
    const now = new Date();
    const messageDate = new Date(date);
    const diffInMins = Math.floor((now - messageDate) / 60000);
    if (diffInMins < 1) return "Just now";
    if (diffInMins < 60) return `${diffInMins}m ago`;
    const diffInHours = Math.floor(diffInMins / 60);
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return "Yesterday";
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return messageDate.toLocaleDateString();
  };

  const filteredConversations = conversations.filter((conv) =>
    conv.user?.name?.toLowerCase().includes(searchQuery.toLowerCase()),
  );
  const selectedConversation = conversations.find(
    (c) => c.matchId === selectedChat,
  );
  const emojis = ["😊", "😂", "❤️", "👍", "🎉", "😍", "🙏", "😢", "😮", "🔥"];

  return (
    <div className="messages-page">
      <main className="messages-main">
        {/* Header */}
        <div className={`messages-header ${isVisible ? "visible" : ""}`}>
          <div className="header-bg-circle circle-1"></div>
          <div className="header-bg-circle circle-2"></div>
          <div className="header-content">
            <h1><FaComments /> Messages</h1>
            <p>Connect and chat with your matches</p>
          </div>
        </div>

        {/* Messages Container */}
        <div className={`messages-container ${isVisible ? "visible" : ""}`}>
          {/* Conversations Sidebar */}
          <div className="conversations-sidebar">
            <div className="sidebar-header">
              <h2>Conversations</h2>
              {conversations.length > 0 && (
                <span className="unread-badge">{conversations.length}</span>
              )}
            </div>

            {/* Search Box */}
            <div className="search-box">
              <span className="search-icon"><FaSearch /></span>
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Conversations List */}
            <div className="conversations-list">
              {loading && (
                <div className="no-conversations">
                  <p>Loading conversations...</p>
                </div>
              )}

              {!loading && filteredConversations.length === 0 && (
                <div className="no-conversations">
                  
                  <p>No conversations yet</p>
                  <small>Start matching to begin chatting!</small>
                </div>
              )}

              {filteredConversations.map((conv) => (
                <div
                  key={conv._id}
                  className={`conversation-item ${selectedChat === conv.matchId ? "active" : ""}`}
                >
                  <div
                    className="conv-clickable"
                    onClick={() => fetchMessages(conv.matchId)}
                  >
                    <div className="conv-avatar-container">
                      <img
                        src={conv.user?.image || "https://i.pravatar.cc/400?img=1"}
                        alt={conv.user?.name || "User"}
                        className="conv-avatar"
                      />
                      <span className="online-indicator"></span>
                    </div>

                    <div className="conv-details">
                      <div className="conv-header">
                        <h3 className="conv-name">
                          {conv.user?.name || "Unknown User"}
                        </h3>
                        {conv.lastMessage && (
                          <span className="conv-time">
                            {getTimeAgo(conv.lastMessage.createdAt)}
                          </span>
                        )}
                      </div>
                      <div className="conv-message-row">
                        <p className="conv-last-message">
                          {conv.lastMessage?.text || "No messages yet"}
                        </p>
                        {conv.unreadCount > 0 && (
                          <span className="unread-count">
                            {conv.unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Delete Conversation Button */}
                  <button
                    className="delete-conv-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteConversation(conv.matchId);
                    }}
                    title="Delete conversation"
                  >
                    <FaTrash className="trash" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="chat-area">
            {!selectedChat ? (
              <div className="no-chat-selected">
                <div className="no-chat-icon"><FaComments /></div>
                <h3>Select a conversation</h3>
                <p>Choose a conversation from the list to start messaging</p>
              </div>
            ) : (
              <>
                {/* Chat Header */}
                <div className="chat-header">
                  <div className="chat-user-info">
                    <div className="chat-avatar-container">
                      <img
                        src={
                          selectedConversation?.user?.image ||
                          "https://i.pravatar.cc/400?img=1"
                        }
                        alt={selectedConversation?.user?.name || "User"}
                      />
                    </div>
                    <div className="chat-user-details">
                      <h3>
                        {selectedConversation?.user?.name || "Unknown User"}
                      </h3>
                      <p className="user-status">Active now</p>
                    </div>
                  </div>
                  <div className="chat-actions">
                    <button className="chat-action-btn" title="Call">
                      <FaPhoneAlt />
                    </button>
                    <button className="chat-action-btn" title="Video call">
                      <FaVideo />
                    </button>
                    <button className="chat-action-btn" title="More">
                      <FaEllipsisV />
                    </button>
                  </div>
                </div>

                {/* Messages Area - ⭐ FIXED: Added ref */}
                <div className="messages-area" ref={messagesContainerRef}>
                  <div className="messages-list">
                    {messages.length === 0 ? (
                      <div
                        style={{
                          textAlign: "center",
                          padding: "2rem",
                          color: "#6b7280",
                        }}
                      >
                        <FaComments className="big-icon" />
                        <p>No messages yet. Start the conversation!</p>
                      </div>
                    ) : (
                      messages.map((msg) => (
                        <div
                          key={msg._id}
                          className={`message-bubble ${msg.isMine ? "sent" : "received"}`}
                        >
                          <div className="message-content">
                            <p>{msg.text}</p>
                            <div className="message-meta">
                              <span className="message-time">
                                {getTimeAgo(msg.createdAt)}
                              </span>
                              {msg.isMine && (
                                <>
                                  <span className="message-status">✓✓</span>
                                  <button
                                    className="delete-msg-btn"
                                    onClick={() => handleDeleteMessage(msg._id)}
                                    title="Delete message"
                                  >
                                    <FaTrash className="trash" />
                                  </button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </div>

                {/* Message Input */}
                <div className="message-input-container">
                  <form
                    onSubmit={handleSendMessage}
                    className="message-input-form-inline"
                  >
                    <button
                      type="button"
                      className="emoji-btn-inline"
                      onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                    >
                      <FaSmile />
                    </button>

                    {showEmojiPicker && (
                      <div className="emoji-picker">
                        {emojis.map((emoji, idx) => (
                          <button
                            key={idx}
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
                      className="message-input-inline"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                      placeholder="Type a message..."
                      disabled={sending}
                    />

                    <button
                      type="button"
                      className="attach-btn-inline"
                      title="Attach file"
                    >
                      <FaPaperclip />
                    </button>

                    <button
                      type="submit"
                      className="send-btn-inline"
                      disabled={!messageText.trim() || sending}
                    >
                      <span className="send-icon"><FaPaperPlane /></span>
                    </button>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Tips Section */}
        <div className={`tips-section ${isVisible ? "visible" : ""}`}>
          <div className="tip-card">
            <div className="tip-icon">🔒</div>
            <div className="tip-content">
              <h4>Stay Safe</h4>
              <p>
                Never share personal information like passwords or financial
                details
              </p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">🤝</div>
            <div className="tip-content">
              <h4>Be Respectful</h4>
              <p>
                Treat everyone with kindness and respect in your conversations
              </p>
            </div>
          </div>
          <div className="tip-card">
            <div className="tip-icon">💡</div>
            <div className="tip-content">
              <h4>Take Your Time</h4>
              <p>Get to know your matches before moving to other platforms</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Messages;