import React from "react";
import "./Dashboard.css";
import {
  FaHome,
  FaUserCircle,
  FaThLarge,
  FaFileAlt,
  FaRobot,
  FaPenNib,
  FaChalkboardTeacher,
  FaMapSigns,
  FaSlidersH
} from "react-icons/fa";

function Dashboard({ onNavigate }) {
  return (
    <div className="dashboard">
      
      {/* PREMIER THEME HEADER */}
      <header className="heading">
        <div className="badge">
          <span className="dot"></span> AI-POWERED WORKSPACE
        </div>
        <h2>RESUME ANALYZER</h2>
      </header>

      {/* MAIN CONTENT AREA */}
      <div className="main-content">
        
        {/* WELCOME CARD (HIGHLIGHTED) */}
        <div className="welcome-card highlighted">
          <div className="welcome-glow-line"></div>
          <h3>Welcome Back</h3>
          <p>
            Analyze your resume, build ATS-friendly resumes,
            and prepare for interviews using AI.
          </p>
        </div>

        {/* CYBERPUNK CARDS GRID */}
        <div className="cards-grid">
          
          <div className="glass-card cyan-glow" onClick={() => onNavigate("analyzer")}>
            <div className="card-info">
              <span className="title-cyan">RESUME ANALYZER</span>
            </div>
            <FaFileAlt className="card-icon icon-cyan" />
          </div>

          <div className="glass-card purple-glow" onClick={() => onNavigate("Chatbot")}>
            <div className="card-info">
              <span className="title-purple">CHATBOT ASSISTANT</span>
            </div>
            <FaRobot className="card-icon icon-purple" />
          </div>

          <div className="glass-card purple-glow" onClick={() => onNavigate("ResumeMaker")}>
            <div className="card-info">
              <span className="title-purple">RESUME MAKER</span>
            </div>
            <FaPenNib className="card-icon icon-purple" />
          </div>

          <div className="glass-card cyan-glow" onClick={() => onNavigate("interview")}>
            <div className="card-info">
              <span className="title-cyan">INTERVIEW PREPARATION ASSISTANT</span>
            </div>
            <FaChalkboardTeacher className="card-icon icon-cyan" />
          </div>

          <div className="glass-card cyan-glow" onClick={() => onNavigate("roadmap")}>
            <div className="card-info">
              <span className="title-cyan">AI CAREER ROADMAP GENERATOR</span>
            </div>
            <FaMapSigns className="card-icon icon-cyan" />
          </div>

          <div className="glass-card purple-glow" onClick={() => onNavigate("tailoring")}>
            <div className="card-info">
              <span className="title-purple">SMART RESUME JOB TAILORING SYSTEM</span>
            </div>
            <FaSlidersH className="card-icon icon-purple" />
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <footer className="bottom-nav">
        <div className="nav-item" onClick={() => onNavigate("splash")}>
          <FaHome />
          <span>Splash</span>
        </div>

        <div className="nav-item active">
          <FaThLarge />
          <span>Dashboard</span>
        </div>

        <div className="nav-item" onClick={() => onNavigate("profile")}>
          <FaUserCircle />
          <span>Profile</span>
        </div>
      </footer>
    </div>
  );
}

export default Dashboard;