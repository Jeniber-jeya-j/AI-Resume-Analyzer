import React, { useState } from "react";
import { FaGraduationCap, FaCode, FaUserTie, FaChevronRight, FaChevronDown } from "react-icons/fa";
import "./InterviewAssistant.css";
import { technicalQuestionsBank } from "./questionsData";
import {hrQuestions} from "./questionsData";
import {aptitudeQuestions} from "./questionsData";

function InterviewAssistant() {
  const roles = [
    "Data Scientist", 
    "Full Stack Developer", 
    "Software Engineer", 
    "Machine Learning Engineer", 
    "DevOps Engineer", 
    "Product Manager", 
    "UI/UX Designer", 
    "Mobile App Developer", 
    "Cloud Solutions Architect", 
    "Cybersecurity Analyst",
    "Web Developer",
    "Frontend Developer",
    "Backend Developer",
    "Data Analyst",
    "QA Engineer",
    "Network Engineer",
    "AI/ML Engineer",
    "Blockchain Developer"
  ];
  
  const [selectedRole, setSelectedRole] = useState("Data Scientist");
  const [activeTab, setActiveTab] = useState("aptitude");
  const [visibleAnswers, setVisibleAnswers] = useState({});

  const toggleAnswer = (id) => {
    setVisibleAnswers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getQuestions = () => {
    if (activeTab === "aptitude") return aptitudeQuestions;
    if (activeTab === "hr") return hrQuestions;
    if (activeTab === "technical") {
      return technicalQuestionsBank[selectedRole] || [];
    }
    return [];
  };

  const currentQuestions = getQuestions();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="assistant-container">
      {/* 1. Main Header */}
      <header className="assistant-header">
        <h2><span className="text-gradient-pink">AI INTERVIEW PREPARATION ASSISTANT</span></h2>
      </header>

      {/* 2. Sub-text Card */}
      <div className="sub-header-card">
        <p>Master your aptitude, technical domain, and HR skills with guided templates</p>
      </div>

      {/* 3. Role Selection Dropdown */}
<div className="role-selector-card">
  <label>Choose target job role:</label>
  <div className="custom-dropdown">
    <div className="dropdown-header" onClick={() => setIsOpen(!isOpen)}>
      {selectedRole} <FaChevronDown />
    </div>
    {isOpen && (
      <div className="dropdown-list">
        {roles.map((role) => (
          <div 
            key={role} 
            className="dropdown-item"
            onClick={() => {
              setSelectedRole(role);
              setIsOpen(false);
              setVisibleAnswers({});
            }}
          >
            {role}
          </div>
        ))}
      </div>
    )}
  </div>
</div>

      {/* 4. Fixed Category Tabs */}
      <div className="tabs-container">
        <button 
          className={`tab-btn ${activeTab === "aptitude" ? "active-tab cyan" : ""}`}
          onClick={() => { setActiveTab("aptitude"); setVisibleAnswers({}); }}
        >
          <FaGraduationCap className="tab-icon" /> <span>Aptitude</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === "technical" ? "active-tab purple" : ""}`}
          onClick={() => { setActiveTab("technical"); setVisibleAnswers({}); }}
        >
          <FaCode className="tab-icon" /> <span>Technical</span>
        </button>
        <button 
          className={`tab-btn ${activeTab === "hr" ? "active-tab pink" : ""}`}
          onClick={() => { setActiveTab("hr"); setVisibleAnswers({}); }}
        >
          <FaUserTie className="tab-icon" /> <span>HR</span>
        </button>
      </div>

      {/* 5. Questions Display Area */}
      <div className="questions-list">
        {currentQuestions.length > 0 ? (
          currentQuestions.map((q, index) => {
            const uniqueKey = `${activeTab}-${selectedRole}-${q.id}`;
            return (
              <div key={uniqueKey} className="question-card">
                <div className="question-header" onClick={() => toggleAnswer(uniqueKey)}>
                  <h4>
                    <span className="q-number">Q{index + 1}:</span> {q.question}
                  </h4>
                  <button className="toggle-btn">
                    {visibleAnswers[uniqueKey] ? <FaChevronDown /> : <FaChevronRight />}
                  </button>
                </div>
                
                {visibleAnswers[uniqueKey] && (
                  <div className="answer-body">
                    <h5>Suggested Answer / Hint:</h5>
                    <p>{q.answer}</p>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="no-data">No questions found for this section.</p>
        )}
      </div>
    </div>
  );
}

export default InterviewAssistant;