import React, { useState } from "react";
import "./ResumeMaker.css";
import { 
  FaUser, FaBriefcase, FaGraduationCap, FaCode, 
  FaFilePdf, FaFileWord, FaEnvelope, FaPhone, FaPlus, FaTrash,
  FaAward, FaCertificate, FaRunning, FaHeart, FaLanguage
} from "react-icons/fa";
import { jsPDF } from "jspdf";

const API_URL = "https://ai-resume-analyzer-f5i9.onrender.com";

function ResumeMaker({ onBack }) {
  // 1. ஆரம்ப கட்ட டேட்டா வடிவமைப்பு (அனைத்து புதிய ஃபீல்டுகளும் சேர்க்கப்பட்டுள்ளன)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    summary: "",
    experience: [""], 
    education: [""],  
    skills: [""],
    certificates: [""],
    achievements: [""],
    extracurricular: [""],
    hobbies: "",
    languages: ""
  });

  const [preview, setPreview] = useState(false);

  // சாதாரண இன்புட்களை மாற்றுவதற்கு
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // டைனமிக் லிஸ்ட் இன்புட்களை மாற்றுவதற்கு
  const handleDynamicChange = (index, field, value) => {
    const updatedList = [...formData[field]];
    updatedList[index] = value;
    setFormData({ ...formData, [field]: updatedList });
  };

  // புதிய செட் ஆட் செய்ய (+)
  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  // இருக்கும் செட்டை நீக்க (Trash Icon)
  const removeField = (index, field) => {
    if (formData[field].length > 1) {
      const updatedList = formData[field].filter((_, i) => i !== index);
      setFormData({ ...formData, [field]: updatedList });
    }
  };

  // 📄 PDF DOWNLOAD FUNCTION
  const downloadPDF = async () => {
  try {
    const response = await fetch(`${API_URL}/api/resume/download-pdf`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.fullName || "Resume"}.pdf`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.log(err);
    alert("PDF Download Failed");
  }
};

  // 📝 WORD (DOC) DOWNLOAD FUNCTION
  const downloadWORD = async () => {
  try {
    const response = await fetch(`${API_URL}/api/resume/download-word`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const blob = await response.blob();

    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${formData.fullName || "Resume"}.docx`;

    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);

  } catch (err) {
    console.log(err);
    alert("Word Download Failed");
  }
};

  return (
    <div className="resume-maker">
      {/* HEADER */}
      <header className="maker-header">
        <h2>AI RESUME BUILDER</h2>
      </header>

      <div className="scroll-container">
        {!preview ? (
          /* INPUT FORM SCREEN */
          <div className="form-container glass-card-maker">
            <h3 className="section-title cyan-text">Enter Your Details</h3>

            <div className="input-group">
              <label><FaUser className="input-icon" /> Full Name</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Enter your full name" />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label><FaEnvelope className="input-icon" /> Email</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email address" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label><FaPhone className="input-icon" /> Phone</label>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Enter your phone number" />
              </div>
            </div>

            <div className="input-group">
              <label><FaBriefcase className="input-icon" /> Summary</label>
              <textarea name="summary" value={formData.summary} onChange={handleChange} rows="3" placeholder="Brief about professional profile..."></textarea>
            </div>

            {/* DYNAMIC EXPERIENCE SECTION */}
            <div className="dynamic-section-header">
              <label><FaBriefcase className="input-icon" /> Experience</label>
              <button type="button" className="add-set-btn" onClick={() => addField("experience")} title="Add Experience"><FaPlus /></button>
            </div>
            {formData.experience.map((exp, index) => (
              <div key={index} className="dynamic-input-row">
                <textarea value={exp} onChange={(e) => handleDynamicChange(index, "experience", e.target.value)} rows="2" placeholder="Job Title, Company (Year - Year)"></textarea>
                {formData.experience.length > 1 && (
                  <button type="button" className="remove-set-btn" onClick={() => removeField(index, "experience")}><FaTrash /></button>
                )}
              </div>
            ))}

            {/* DYNAMIC EDUCATION SECTION */}
            <div className="dynamic-section-header" style={{marginTop: '15px'}}>
              <label><FaGraduationCap className="input-icon" /> Education</label>
              <button type="button" className="add-set-btn" onClick={() => addField("education")} title="Add Education"><FaPlus /></button>
            </div>
            {formData.education.map((edu, index) => (
              <div key={index} className="dynamic-input-row">
                <textarea value={edu} onChange={(e) => handleDynamicChange(index, "education", e.target.value)} rows="2" placeholder="Degree, University"></textarea>
                {formData.education.length > 1 && (
                  <button type="button" className="remove-set-btn" onClick={() => removeField(index, "education")}><FaTrash /></button>
                )}
              </div>
            ))}

            {/* DYNAMIC SKILLS SECTION */}
            <div className="dynamic-section-header" style={{marginTop: '15px'}}>
              <label><FaCode className="input-icon" /> Skills</label>
              <button type="button" className="add-set-btn" onClick={() => addField("skills")} title="Add Skill"><FaPlus /></button>
            </div>
            {formData.skills.map((skill, index) => (
              <div key={index} className="dynamic-input-row">
                <input type="text" value={skill} onChange={(e) => handleDynamicChange(index, "skills", e.target.value)} placeholder="React, Node.js, Python etc." />
                {formData.skills.length > 1 && (
                  <button type="button" className="remove-set-btn" onClick={() => removeField(index, "skills")}><FaTrash /></button>
                )}
              </div>
            ))}

            {/* DYNAMIC CERTIFICATE SECTION */}
            <div className="dynamic-section-header" style={{marginTop: '15px'}}>
              <label><FaCertificate className="input-icon" /> Certificate</label>
              <button type="button" className="add-set-btn" onClick={() => addField("certificates")} title="Add Certificate"><FaPlus /></button>
            </div>
            {formData.certificates && formData.certificates.map((cert, index) => (
              <div key={index} className="dynamic-input-row">
                <input type="text" value={cert} onChange={(e) => handleDynamicChange(index, "certificates", e.target.value)} placeholder="Certification Name, Issuing Organization" />
                {formData.certificates.length > 1 && (
                  <button type="button" className="remove-set-btn" onClick={() => removeField(index, "certificates")}><FaTrash /></button>
                )}
              </div>
            ))}

            {/* DYNAMIC ACHIEVEMENT SECTION */}
            <div className="dynamic-section-header" style={{marginTop: '15px'}}>
              <label><FaAward className="input-icon" /> Achievement</label>
              <button type="button" className="add-set-btn" onClick={() => addField("achievements")} title="Add Achievement"><FaPlus /></button>
            </div>
            {formData.achievements && formData.achievements.map((ach, index) => (
              <div key={index} className="dynamic-input-row">
                <input type="text" value={ach} onChange={(e) => handleDynamicChange(index, "achievements", e.target.value)} placeholder="Achievement Description" />
                {formData.achievements.length > 1 && (
                  <button type="button" className="remove-set-btn" onClick={() => removeField(index, "achievements")}><FaTrash /></button>
                )}
              </div>
            ))}  

            {/* DYNAMIC EXTRA CURRICULAR SECTION */}
            <div className="dynamic-section-header" style={{marginTop: '15px'}}>
              <label><FaRunning className="input-icon" /> Extra Curricular Activities</label>
              <button type="button" className="add-set-btn" onClick={() => addField("extracurricular")} title="Add Activity"><FaPlus /></button>
            </div>
            {formData.extracurricular && formData.extracurricular.map((activity, index) => (
              <div key={index} className="dynamic-input-row">
                <input type="text" value={activity} onChange={(e) => handleDynamicChange(index, "extracurricular", e.target.value)} placeholder="Activity Description" />
                {formData.extracurricular.length > 1 && (
                  <button type="button" className="remove-set-btn" onClick={() => removeField(index, "extracurricular")}><FaTrash /></button>
                )}
              </div>
            ))}

            <div className="input-row">
              <div className="input-group">
                <label><FaHeart className="input-icon" /> Hobbies </label>
                <input type="text" name="hobbies" value={formData.hobbies} onChange={handleChange} placeholder="Reading, Coding, Sports" />
              </div>
            </div>
            <div className="input-row">
              <div className="input-group">
                <label><FaLanguage className="input-icon" /> Languages </label>
                <input type="text" name="languages" value={formData.languages} onChange={handleChange} placeholder="Tamil, English, Hindi" />
              </div>
            </div>

            <button className="action-btn neon-purple-btn" style={{marginTop: '25px'}} onClick={() => setPreview(true)}>Generate Resume</button>
          </div>
        ) : (
          /* GENERATED RESUME PREVIEW & DOWNLOAD SCREEN */
          <div className="preview-container">
            <div className="resume-preview glass-card-maker neon-border-cyan">
              <h1 className="preview-name">{formData.fullName || "Your Name"}</h1>
              <p className="preview-contact">✉ {formData.email || "email@example.com"} | 📞 {formData.phone || "Phone"}</p>
              
              <div className="preview-divider"></div>

              <h4 className="purple-text">SUMMARY</h4>
              <p className="preview-text">{formData.summary || "Summary details will appear here..."}</p>

              <h4 className="purple-text">EXPERIENCE</h4>
              {formData.experience.map((exp, i) => exp && <p key={i} className="preview-text">• {exp}</p>)}

              <h4 className="cyan-text">EDUCATION</h4>
              {formData.education.map((edu, i) => edu && <p key={i} className="preview-text">• {edu}</p>)}

              {/* SKILLS AS POINTS */}
              <h4 className="cyan-text">SKILLS</h4>
              {formData.skills.map((skill, i) => skill && <p key={i} className="preview-text">• {skill}</p>)}

              {/* CERTIFICATES */}
              {formData.certificates && formData.certificates.some(Boolean) && (
                <>
                  <h4 className="purple-text">CERTIFICATES</h4>
                  {formData.certificates.map((cert, i) => cert && <p key={i} className="preview-text">• {cert}</p>)}
                </>
              )}

              {/* ACHIEVEMENTS */}
              {formData.achievements && formData.achievements.some(Boolean) && (
                <>
                  <h4 className="purple-text">ACHIEVEMENTS</h4>
                  {formData.achievements.map((ach, i) => ach && <p key={i} className="preview-text">• {ach}</p>)}
                </>
              )}

              {/* EXTRA CURRICULAR */}
              {formData.extracurricular && formData.extracurricular.some(Boolean) && (
                <>
                  <h4 className="cyan-text">EXTRA CURRICULAR ACTIVITIES</h4>
                  {formData.extracurricular.map((act, i) => act && <p key={i} className="preview-text">• {act}</p>)}
                </>
              )}

              {/* LANGUAGES AS POINTS */}
              {formData.languages && (
                <>
                  <h4 className="cyan-text">LANGUAGES</h4>
                  {formData.languages.split(",").map((lang, i) => lang.trim() && <p key={i} className="preview-text">• {lang.trim()}</p>)}
                </>
              )}

              {/* HOBBIES AS POINTS */}
              {formData.hobbies && (
                <>
                  <h4 className="purple-text">HOBBIES</h4>
                  {formData.hobbies.split(",").map((hobby, i) => hobby.trim() && <p key={i} className="preview-text">• {hobby.trim()}</p>)}
                </>
              )}
            </div>

            {/* DOWNLOAD BUTTONS */}
            <div className="download-actions">
              <button className="download-btn pdf-btn" onClick={downloadPDF}>
                <FaFilePdf /> Download PDF
              </button>
              <button className="download-btn word-btn" onClick={downloadWORD}>
                <FaFileWord /> Download Word
              </button>
            </div>

            <button className="action-btn back-to-edit" onClick={() => setPreview(false)}>Edit Details</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeMaker;