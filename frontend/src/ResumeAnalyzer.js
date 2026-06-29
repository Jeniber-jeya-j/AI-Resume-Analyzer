import React, { useState } from "react";
import "./ResumeAnalyzer.css";
import { FaCloudUploadAlt, FaArrowLeft, FaFilePdf, FaSpinner, FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";

function Analyzer({ onNavigate }) {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState("No file chosen");
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  
  // New state to manage inline error messages instead of alerts
  const [errorMessage, setErrorMessage] = useState("");

  const handleFileChange = (e) => {
    setErrorMessage(""); // Clear error when user interacts
    if (e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    } else {
      setFile(null);
      setFileName("No file chosen");
    }
  };

  const handleAnalyze = async () => {
    setErrorMessage("");

    // Validation Check: Supposed upload pannala na intha condition true aagum
    if (!jobDescription.trim() && !file) {
      setErrorMessage("Please upload your Resume and paste the Job Description to proceed.");
      return;
    }
    if (!jobDescription.trim()) {
      setErrorMessage("Please paste the Job Description before analyzing.");
      return;
    }
    if (!file) {
      setErrorMessage("Please upload your Resume (PDF format only).");
      return;
    }

    setLoading(true);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file); 
    formData.append("job_description", jobDescription); 

    try {
      const response = await fetch("http://127.0.0.1:8000/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Server error occurred!");
      }

      const data = await response.json();
      setResult(data); 
    } catch (error) {
      console.error("Error connecting to backend:", error);
      setErrorMessage("Connection to backend failed! Please ensure that your Uvicorn server is running.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="analyzer-page">
      
      {/* HEADER */}
      <header className="analyzer-header">
        <h2>RESUME <span className="text-gradient-cyan">ANALYZER</span></h2>
      </header>

      {/* MAIN CONTENT WORKSPACE */}
      <div className="analyzer-content">
        <div className="upload-container">
          
          <h3>AI Resume Evaluation</h3>
          <p className="subtitle">Upload resume and paste JD to calculate ATS Match</p>

          {/* 1. JOB DESCRIPTION INPUT */}
          <div className="input-group">
            <label className="input-label">Job Description</label>
            <textarea
              className="jd-textarea"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => {
                setErrorMessage("");
                setJobDescription(e.target.value);
              }}
              disabled={loading}
            />
          </div>

          {/* 2. FILE UPLOAD DROPZONE */}
          <div className="input-group">
            <label className="input-label">Resume (PDF)</label>
            <label className="dropzone-card">
              <input 
                type="file" 
                className="hidden-file-input" 
                accept=".pdf"
                onChange={handleFileChange}
                disabled={loading}
              />
              <div className="dropzone-inner">
                <FaCloudUploadAlt className="upload-icon" />
                <span className="upload-text">Click to browse your PDF</span>
              </div>
            </label>
          </div>

          {/* FILE STATUS Display */}
          <div className={`file-status-box ${file ? "file-selected" : ""}`}>
            <FaFilePdf className="status-file-icon" />
            <span className="file-name-text">{fileName}</span>
          </div>

          {/* 🛑 INLINE ERROR NOTE (Saves space and looks clean) */}
          {errorMessage && (
            <div className="error-note-box">
              <FaExclamationTriangle className="error-note-icon" />
              <span><strong>Note:</strong> {errorMessage}</span>
            </div>
          )}

          {/* ANALYZE BUTTON */}
          <button 
            className="analyze-submit-btn" 
            onClick={handleAnalyze}
            disabled={loading}
          >
            {loading ? <FaSpinner className="spinner" /> : "ANALYZE RESUME"}
          </button>

          {/* BACKEND DATA DISPLAY CARD */}
          {result && (
            <div className="result-display-card">
              <h4>Analysis Dashboard</h4>
              
              {/* ATS Score Meter */}
              <div className="score-section">
                <span className="score-label">ATS Match Score:</span>
                <div className="score-badge">{result.ats_score}%</div>
              </div>

              {/* Skills Found */}
              <div className="result-block">
                <h5><FaCheckCircle className="icon-success" /> Skills Found:</h5>
                <div className="skills-tags">
                  {result.skills_found && result.skills_found.length > 0 ? (
                    result.skills_found.map((skill, index) => (
                      <span key={index} className="skill-tag">{skill}</span>
                    ))
                  ) : (
                    <span className="no-data">No matching skills found</span>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              {result.missing_skills && result.missing_skills.length > 0 && (
                <div className="result-block">
                  <h5><FaExclamationTriangle className="icon-warning" /> Missing Key Skills:</h5>
                  <div className="skills-tags">
                    {result.missing_skills.map((skill, index) => (
                      <span key={index} className="missing-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {result.suggestions && result.suggestions.length > 0 && (
                <div className="result-block">
                  <h5>Suggestions:</h5>
                  <ul className="suggestions-list">
                    {result.suggestions.map((tip, index) => (
                      <li key={index}>{tip}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* AI Feedback */}
              {result.ai_feedback && (
                <div className="result-block ai-feedback-section">
                  <h5>AI Detailed Feedback:</h5>
                  <p className="ai-text-output">{result.ai_feedback}</p>
                </div>
              )}

            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Analyzer;