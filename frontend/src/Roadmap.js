import React, { useState } from "react";
import {FaCheckCircle, FaTimesCircle,} from "react-icons/fa";
import "./Roadmap.css";

function Roadmap() {
  const [targetRole, setTargetRole] = useState("Full Stack Developer");
  const [currentProfile, setCurrentProfile] = useState("Student");
  const [showRoadmap, setShowRoadmap] = useState(false);
const [loading, setLoading] = useState(false);

const handleGenerate = () => {
  setLoading(true);

  setTimeout(() => {
    setLoading(false);
    setShowRoadmap(true);
  }, 2000); // 2 seconds loading
};


const roadmapData = {
  "Full Stack Developer": {
    timeline: [
      { month: "Month 1", tasks: ["HTML", "CSS", "Git"] },
      { month: "Month 2", tasks: ["JavaScript", "ES6"] },
      { month: "Month 3", tasks: ["React"] },
      { month: "Month 4", tasks: ["Node.js", "Express"] },
      { month: "Month 5", tasks: ["MongoDB"] },
      { month: "Month 6", tasks: ["Deploy", "Interview Prep"] },
    ],

    skills: {
      learned: ["HTML", "CSS", "JavaScript"],
      missing: ["React", "Node.js", "MongoDB", "Docker", "AWS"]
    },

    projects: [
      {
        title: "Portfolio Website",
        desc: "Responsive portfolio using React.",
        tech: ["React", "CSS"],
        level: "Beginner"
      },
      {
        title: "AI Resume Analyzer",
        desc: "ATS score checker using AI.",
        tech: ["React", "FastAPI", "Python"],
        level: "Intermediate"
      },
      {
        title: "Job Portal",
        desc: "Complete MERN Job Portal.",
        tech: ["MongoDB", "Express", "React", "Node"],
        level: "Advanced"
      }
    ]
  },

  "AI Engineer": {
    timeline: [
      { month: "Month 1", tasks: ["Python", "Git"] },
      { month: "Month 2", tasks: ["NumPy", "Pandas"] },
      { month: "Month 3", tasks: ["Machine Learning"] },
      { month: "Month 4", tasks: ["Deep Learning"] },
      { month: "Month 5", tasks: ["LLM", "Prompt Engineering"] },
      { month: "Month 6", tasks: ["Deploy AI Models"] },
    ],

    skills: {
      learned: ["Python"],
      missing: ["TensorFlow", "PyTorch", "LLMs", "LangChain"]
    },

    projects: [
      {
        title: "AI Chatbot",
        desc: "Gemini/OpenAI chatbot.",
        tech: ["Python", "FastAPI", "Gemini"],
        level: "Beginner"
      },
      {
        title: "AI Resume Analyzer",
        desc: "Resume ATS Scoring.",
        tech: ["Python", "React", "FastAPI"],
        level: "Intermediate"
      },
      {
        title: "Document QA Bot",
        desc: "RAG based chatbot.",
        tech: ["LangChain", "FAISS", "LLM"],
        level: "Advanced"
      }
    ]
  },

  "Mern Stack Developer": {
    timeline: [
      { month: "Month 1", tasks: ["HTML", "CSS", "JavaScript"] },
      { month: "Month 2", tasks: ["React"] },
      { month: "Month 3", tasks: ["Node.js"] },
      { month: "Month 4", tasks: ["Express"] },
      { month: "Month 5", tasks: ["MongoDB"] },
      { month: "Month 6", tasks: ["Deployment"] },
    ],

    skills: {
      learned: ["HTML", "CSS"],
      missing: ["React", "Node", "MongoDB", "JWT"]
    },

    projects: [
      {
        title: "Todo App",
        desc: "CRUD MERN application.",
        tech: ["React", "Node"],
        level: "Beginner"
      },
      {
        title: "E-Commerce",
        desc: "Shopping website.",
        tech: ["MongoDB", "Express", "React", "Node"],
        level: "Intermediate"
      },
      {
        title: "Hospital Management",
        desc: "Complete MERN Dashboard.",
        tech: ["MERN"],
        level: "Advanced"
      }
    ]
  },

  "Data Scientist": {
    timeline: [
      { month: "Month 1", tasks: ["Python"] },
      { month: "Month 2", tasks: ["Pandas", "NumPy"] },
      { month: "Month 3", tasks: ["Visualization"] },
      { month: "Month 4", tasks: ["Machine Learning"] },
      { month: "Month 5", tasks: ["Statistics"] },
      { month: "Month 6", tasks: ["Real Dataset Projects"] },
    ],

    skills: {
      learned: ["Python"],
      missing: ["SQL", "Machine Learning", "Power BI"]
    },

    projects: [
      {
        title: "Sales Dashboard",
        desc: "Power BI Dashboard.",
        tech: ["Power BI"],
        level: "Beginner"
      },
      {
        title: "House Price Prediction",
        desc: "ML Regression.",
        tech: ["Python", "Scikit-learn"],
        level: "Intermediate"
      },
      {
        title: "Customer Churn Prediction",
        desc: "Classification Model.",
        tech: ["ML"],
        level: "Advanced"
      }
    ]
  },

  "Cyber Security": {
    timeline: [
      { month: "Month 1", tasks: ["Networking"] },
      { month: "Month 2", tasks: ["Linux"] },
      { month: "Month 3", tasks: ["Ethical Hacking"] },
      { month: "Month 4", tasks: ["Web Security"] },
      { month: "Month 5", tasks: ["OWASP"] },
      { month: "Month 6", tasks: ["CTF Challenges"] },
    ],

    skills: {
      learned: ["Networking"],
      missing: ["Linux", "Burp Suite", "Metasploit"]
    },

    projects: [
      {
        title: "Password Strength Checker",
        desc: "Password security.",
        tech: ["Python"],
        level: "Beginner"
      },
      {
        title: "Port Scanner",
        desc: "Python Port Scanner.",
        tech: ["Python"],
        level: "Intermediate"
      },
      {
        title: "Vulnerability Scanner",
        desc: "Security Scanner.",
        tech: ["Python"],
        level: "Advanced"
      }
    ]
  },

  "Cloud Engineer": {
    timeline: [
      { month: "Month 1", tasks: ["Linux"] },
      { month: "Month 2", tasks: ["AWS Basics"] },
      { month: "Month 3", tasks: ["EC2", "S3"] },
      { month: "Month 4", tasks: ["Docker"] },
      { month: "Month 5", tasks: ["Kubernetes"] },
      { month: "Month 6", tasks: ["CI/CD"] },
    ],

    skills: {
      learned: ["Linux"],
      missing: ["AWS", "Docker", "Terraform", "Kubernetes"]
    },

    projects: [
      {
        title: "AWS Static Website",
        desc: "Deploy portfolio.",
        tech: ["S3"],
        level: "Beginner"
      },
      {
        title: "Dockerized MERN App",
        desc: "Containerize application.",
        tech: ["Docker"],
        level: "Intermediate"
      },
      {
        title: "Kubernetes Deployment",
        desc: "Deploy scalable apps.",
        tech: ["Kubernetes"],
        level: "Advanced"
      }
    ]
  },

  "DevOps Engineer": {
    timeline: [
      { month: "Month 1", tasks: ["Linux", "Git"] },
      { month: "Month 2", tasks: ["Docker"] },
      { month: "Month 3", tasks: ["Jenkins"] },
      { month: "Month 4", tasks: ["Kubernetes"] },
      { month: "Month 5", tasks: ["Terraform"] },
      { month: "Month 6", tasks: ["AWS CI/CD"] },
    ],

    skills: {
      learned: ["Git"],
      missing: ["Docker", "Jenkins", "Terraform", "Kubernetes"]
    },

    projects: [
      {
        title: "CI/CD Pipeline",
        desc: "Deploy React App.",
        tech: ["GitHub Actions"],
        level: "Beginner"
      },
      {
        title: "Docker Deployment",
        desc: "Deploy MERN App.",
        tech: ["Docker"],
        level: "Intermediate"
      },
      {
        title: "Terraform Infrastructure",
        desc: "AWS Automation.",
        tech: ["Terraform", "AWS"],
        level: "Advanced"
      }
    ]
  }
};

const currentRoadmap = roadmapData[targetRole];

  return (
    <div className="roadmap-container">
      <header className="roadmap-header">
        <h2><span className="text-gradient-pink">AI Career Roadmap</span></h2>
      </header>

      <div className="grid-cards">
  <div className="W-card">
    <p>Get an AI-powered roadmap tailored to your current skills and career goals. Learn the right technologies, build projects, and track your progress step by step.</p>
    </div>
    </div>

      {/* Profile & Target Selection */}
      {/* Current Profile */}
<div className="grid-cards">
  <div className="card">
    <h3>Current Profile</h3>

    <div className="profile-buttons">
      <button
        className={currentProfile === "Student" ? "active" : ""}
        onClick={() => setCurrentProfile("Student")}
      >
      Student
      </button>

      <button
        className={currentProfile === "Fresher" ? "active" : ""}
        onClick={() => setCurrentProfile("Fresher")}
      >
      Fresher
      </button>

      <button
        className={currentProfile === "Experienced" ? "active" : ""}
        onClick={() => setCurrentProfile("Experienced")}
      >
        Experience
      </button>
    </div>

  </div>
</div>
      <div className="grid-cards">
  <div className="card">
    <h3>Target Career Goal</h3>

    <select
      className="target-dropdown"
      value={targetRole}
      onChange={(e) => setTargetRole(e.target.value)}
    >
      <option value="Full Stack Developer">Full Stack Developer</option>
      <option value="AI Engineer">AI Engineer</option>
      <option value="Mern Stack Developer">Mern Stack Developer</option>
      <option value="Data Scientist">Data Scientist</option>
      <option value="Cyber Security">Cyber Security</option>
      <option value="Cloud Engineer">Cloud Engineer</option>
      <option value="DevOps Engineer">DevOps Engineer</option>
    </select>

  </div>
</div>

      <button
  className="generate-btn"
  onClick={handleGenerate}
  disabled={loading}
>
  {loading ? "Generating AI Roadmap..." : "Generate AI Roadmap"}
</button>

      {showRoadmap && (
  <>
    {/* Timeline Section */}
    <section className="timeline">
  {currentRoadmap.timeline.map((item, index) => (
    <div key={index} className="timeline-item">
      <div className="month-badge">{item.month}</div>

      <div className="content">
        {item.tasks.map((task) => (
          <span key={task} className="task-tag">
            {task}
          </span>
        ))}
      </div>
    </div>
  ))}
</section>

    {/* Skills Progress */}
    <section className="card">
      <h3>Skills Gap Analysis</h3>

      <div className="skills-grid">

{currentRoadmap.skills.learned.map((skill) => (
  <span className="skill-item learned" key={skill}>
    <FaCheckCircle /> {skill}
  </span>
))}

{currentRoadmap.skills.missing.map((skill) => (
  <span className="skill-item missing" key={skill}>
    <FaTimesCircle /> {skill}
  </span>
))}

</div>
    </section>

    {/* Recommended Projects */}
<section className="card">
  <h3>Recommended Projects</h3>

  <div className="projects-grid">
    {currentRoadmap.projects.map((project) => (
      <div className="project-card" key={project.title}>
        <h4>{project.title}</h4>

        <p>{project.desc}</p>

        <div className="tech-stack">
          {project.tech.map((tech) => (
            <span key={tech}>{tech}</span>
          ))}
        </div>

        <span
          className={`difficulty ${project.level.toLowerCase()}`}
        >
          {project.level}
        </span>
      </div>
    ))}
  </div>
</section>
  </>
)}
    </div>
  );
}

export default Roadmap;