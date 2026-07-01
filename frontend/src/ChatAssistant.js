import React, { useState, useRef, useEffect } from "react";
import "./ChatAssistant.css";
import {FaPaperPlane, FaRobot, FaUser, FaSpinner } from "react-icons/fa";
import API_URL from "./config";

const API_BASE_URL = API_URL;

function ChatAssistant({ onNavigate }) {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! I am your AI Career Assistant. How can I help you with your resume or career goals today?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // ஆட்டோமேட்டிக்கா சாட் கீழே ஸ்க்ரோல் ஆக
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    
    // User மெசேஜை சாட்டில் சேர்க்கிறது
    setMessages((prev) => [...prev, { sender: "user", text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/Chatbot`, {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    message: userMessage,
  }),
});
      if (!response.ok) throw new Error("Network error");

      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.reply }]);
    } catch (error) {
      console.error("Chat Error:", error);
      setMessages((prev) => [...prev, { sender: "bot", text: "Something went wrong. Please check your backend connection." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chat-page">
      {/* HEADER */}
      <header className="chat-header">
        <h2>AI <span className="text-gradient-cyan">CAREER ASSISTANT</span></h2>
      </header>

      {/* CHAT WINDOW */}
      <div className="chat-container">
        <div className="messages-box">
          {messages.map((msg, index) => (
            <div key={index} className={`message-wrapper ${msg.sender}`}>
              <div className="avatar">
                {msg.sender === "bot" ? <FaRobot /> : <FaUser />}
              </div>
              <div className="message-bubble">
                <p>{msg.text}</p>
              </div>
            </div>
          ))}
          
          {/* BOT TYPING LOADING INDICATOR */}
          {loading && (
            <div className="message-wrapper bot">
              <div className="avatar">
                <FaRobot />
              </div>
              <div className="message-bubble loading-bubble">
                <FaSpinner className="spinner" /> <span>AI is thinking...</span>
              </div>
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* INPUT FORM */}
        <form className="chat-input-form" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Ask me anything about resume tips, skills, jobs..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
          />
          <button type="submit" className="send-btn" disabled={loading || !input.trim()}>
            <FaPaperPlane />
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatAssistant;