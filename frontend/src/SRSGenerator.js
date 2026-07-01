import React, { useState } from "react";
import {
  FaRobot,
  FaProjectDiagram,
  FaFilePdf,
  FaFileWord,
  FaSpinner,
} from "react-icons/fa";
import "./SRSGenerator.css";
import API_URL from "./config";

function SRSGenerator() {
  const [projectTitle, setProjectTitle] = useState("");
  const [projectType, setProjectType] = useState("Web Application");
  const [loading, setLoading] = useState(false);

  const [srs, setSrs] = useState(null);

  const handleGenerate = async () => {
    if (!projectTitle.trim()) {
      alert("Please enter Project Title");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/generate-srs`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_title: projectTitle,
          project_type: projectType,
        }),
      });

if (!response.ok) {
  throw new Error("Failed to generate SRS");
}

const data = await response.json();

setSrs(data);

    } catch (error) {
      console.log(error);

      alert("Unable to generate SRS");
    }finally {
    setLoading(false);
    }
  };

  // ------------------------
  // Download PDF
  // ------------------------
  const downloadPDF = async () => {

    if (!srs) return;

    try {

      const response = await fetch(
        `${API_URL}/download-srs-pdf`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(srs),
        }
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `${srs.project_title}.pdf`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {

      console.log(err);

      alert("PDF Download Failed");

    }

  };


  // ------------------------
  // Download DOCX
  // ------------------------
  const downloadDOCX = async () => {

    if (!srs) return;

    try {

      const response = await fetch(
          `${API_URL}/download-srs-docx`,        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(srs),
        }
      );

      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");

      a.href = url;
      a.download = `${srs.project_title}.docx`;

      document.body.appendChild(a);

      a.click();

      a.remove();

      window.URL.revokeObjectURL(url);

    } catch (err) {

      console.log(err);

      alert("DOCX Download Failed");

    }

  };

  return (
    <div className="srs-container">

      <header className="srs-header">
        <h2><FaRobot /><span className="text-gradient-pink"> AI SRS Generator</span></h2>
        </header>
        <div className="grid-cards">
  <div className="welcome-card">
    <p>
      AI-powered Software Requirements Specification for your project with modules, requirements, database design, and recommended tech stack in seconds.
    </p>
  </div>
</div>

      <div className="input-card">

        <label>Project Title</label>

        <input
          type="text"
          placeholder="Enter Project Title"
          value={projectTitle}
          onChange={(e) => setProjectTitle(e.target.value)}
        />

        <label>Project Type</label>

        <select
          value={projectType}
          onChange={(e) => setProjectType(e.target.value)}
        >
          <option>Web Application</option>
          <option>Mobile App</option>
          <option>AI Project</option>
          <option>Desktop Application</option>
          <option>IoT Project</option>
        </select>

        <button
          className="generate-btn"
          onClick={handleGenerate}
        >
          {loading ? (
            <>
              <FaSpinner className="spin" />
              Generating...
            </>
          ) : (
            <>
              <FaProjectDiagram />
              Generate AI SRS
            </>
          )}
        </button>

      </div>

      {srs && (

        <div className="output-card">

          <h2>{srs.project_title}</h2>

          <section>
            <h3>Introduction</h3>
            <p>{srs.introduction}</p>
          </section>

          <section>
            <h3>Objectives</h3>

            <ul>
              {srs.objectives.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section>
            <h3>Scope</h3>

            <p>{srs.scope}</p>

          </section>

          <section>
            <h3>Functional Requirements</h3>

            <ul>
              {srs.functional_requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section>
            <h3>Non Functional Requirements</h3>

            <ul>
              {srs.non_functional_requirements.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section>
            <h3>User Roles</h3>

            <ul>
              {srs.user_roles.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section>
            <h3>Suggested Modules</h3>

            <ul>
              {srs.modules.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section>
            <h3>Database Tables</h3>

            <ul>
              {srs.database_tables.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>

          </section>

          <section>
            <h3>Recommended Tech Stack</h3>

            <div className="tech-grid">

              <div className="tech-box">
                <h4>Frontend</h4>
                <p>{srs.tech_stack.frontend}</p>
              </div>

              <div className="tech-box">
                <h4>Backend</h4>
                <p>{srs.tech_stack.backend}</p>
              </div>

              <div className="tech-box">
                <h4>Database</h4>
                <p>{srs.tech_stack.database}</p>
              </div>

              <div className="tech-box">
                <h4>Authentication</h4>
                <p>{srs.tech_stack.authentication}</p>
              </div>

              <div className="tech-box">
                <h4>Deployment</h4>
                <p>{srs.tech_stack.deployment}</p>
              </div>

            </div>

          </section>

          <section>

            <h3>Development Timeline</h3>

            <ul>
              {srs.timeline.map((item, index) => (
                <li key={index}>
                  <strong>{item.week}</strong> - {item.task}
                </li>
              ))}
            </ul>

          </section>

          <div className="download-buttons">

            <button
            className="pdf-btn"
            onClick={downloadPDF}
            >
            <FaFilePdf />
            Download PDF
            </button>

            <button
            className="doc-btn"
            onClick={downloadDOCX}
            >
            <FaFileWord />
            Download DOCX
            </button>

          </div>

        </div>

      )}

    </div>
  );
}

export default SRSGenerator;