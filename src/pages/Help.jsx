import "./Help.css";

const Help = () => {
  return (
    <div className="help-container" id="help">
      {/* Header */}
      <div className="help-header">
        <h1>Help & Support</h1>
        <p>Having trouble? We’re here to help you 💙</p>
      </div>

      {/* Categories */}
      <div className="help-categories">
        <div className="help-card">
          <h3>🔐 Account Issues</h3>
          <p>Login, signup, or profile related problems</p>
        </div>

        <div className="help-card">
          <h3>💬 Messages</h3>
          <p>Send button, chat & conversation issues</p>
        </div>

        <div className="help-card">
          <h3>🎨 App Appearance</h3>
          <p>Dark mode & layout problems</p>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <h4>Why is the send button not working?</h4>
          <p>
            Make sure the message field is not empty and your internet
            connection is stable.
          </p>
        </div>

        <div className="faq-item">
          <h4>Why does dark mode not apply to all pages?</h4>
          <p>
            Dark mode needs to be applied globally using state or context.
            Page-level styling won’t affect all components.
          </p>
        </div>

        <div className="faq-item">
          <h4>Is my data safe on this platform?</h4>
          <p>
            Yes, we use secure authentication and encrypted communication.
          </p>
        </div>
      </div>

      {/* Contact */}
      <div className="contact-section">
        <h2>Still need help?</h2>
        <p>Contact our support team and we’ll respond within 24 hours.</p>

        <form className="help-form">
          <input type="email" placeholder="Your Email" required />
          <textarea placeholder="Describe your issue..." required />
          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
};

export default Help;
