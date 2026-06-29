import React, { useState } from "react";
import { FaDownload, FaCheckCircle, FaTimesCircle, FaRocket } from "react-icons/fa";
import "./Roadmap.css";

function Roadmap() {
  const [targetRole, setTargetRole] = useState("Full Stack Developer");

  const timeline = [
    { month: "Month 1", tasks: ["HTML", "CSS", "Git Basics"] },
    { month: "Month 2", tasks: ["JavaScript"] },
    { month: "Month 3", tasks: ["React"] },
    { month: "Month 4", tasks: ["Node.js"] },
    { month: "Month 5", tasks: ["MongoDB"] },
    { month: "Month 6", tasks: ["Deploy Projects & Ready"] },
  ];

  return (
    <div className="roadmap-container">
      <header className="roadmap-header">
        <h1>AI Career Roadmap</h1>
      </header>

      {/* Profile & Target Selection */}
      <div className="grid-cards">
        <div className="card">
          <h3>Current Profile</h3>
          <p><strong>Role:</strong> Student</p>
          <p><strong>Edu:</strong> B.E Computer Science</p>
        </div>
        <div className="card">
          <h3>Target Career Goal</h3>
          <select value={targetRole} onChange={(e) => setTargetRole(e.target.value)}>
            <option>Full Stack Developer</option>
            <option>AI Engineer</option>
            <option>Data Scientist</option>
          </select>
        </div>
      </div>

      <button className="generate-btn">✨ Generate AI Roadmap</button>

      {/* Timeline Section */}
      <section className="timeline">
        {timeline.map((item, index) => (
          <div key={index} className="timeline-item">
            <div className="month-badge">{item.month}</div>
            <div className="content">
              {item.tasks.map((t) => <span key={t} className="task-tag">{t}</span>)}
            </div>
          </div>
        ))}
      </section>

      {/* Skills Progress */}
      <section className="card">
        <h3>Skills Gap Analysis</h3>
        <div className="skills-grid">
          <span className="skill-item learned"><FaCheckCircle/> Python</span>
          <span className="skill-item missing"><FaTimesCircle/> Docker</span>
        </div>
      </section>
    </div>
  );
}

export default Roadmap;