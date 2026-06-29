import React, { useState } from "react";
import "./ResumeMaker.css";
import { 
  FaUser, FaBriefcase, FaGraduationCap, FaCode, 
  FaFilePdf, FaFileWord, FaEnvelope, FaPhone, FaPlus, FaTrash,
  FaAward, FaCertificate, FaRunning, FaHeart, FaLanguage
} from "react-icons/fa";
import { jsPDF } from "jspdf";

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
  const downloadPDF = () => {
    const doc = new jsPDF();
    let currentY = 50; 
    
    doc.setFillColor(3, 7, 12); // Dark BG
    doc.rect(0, 0, 210, 297, "F");

    doc.setTextColor(0, 229, 255); // Cyan Title
    doc.setFontSize(22);
    doc.text(formData.fullName.toUpperCase() || "YOUR NAME", 20, 25);

    doc.setTextColor(255, 255, 255);
    doc.setFontSize(10);
    doc.text(`Email: ${formData.email} | Phone: ${formData.phone}`, 20, 35);
    doc.line(20, 40, 190, 40);

    // Summary Section
    doc.setTextColor(255, 79, 216); 
    doc.setFontSize(14);
    doc.text("PROFESSIONAL SUMMARY", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    doc.text(doc.splitTextToSize(formData.summary || "No summary provided.", 170), 20, currentY);
    
    // Experience Section
    currentY += 25;
    doc.setTextColor(255, 79, 216);
    doc.setFontSize(14);
    doc.text("WORK EXPERIENCE", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    formData.experience.forEach((exp) => {
      if(exp.trim() !== "") {
        doc.text(`• ${exp}`, 25, currentY);
        currentY += 7;
      }
    });

    // Education Section
    currentY += 15;
    doc.setTextColor(0, 229, 255); 
    doc.setFontSize(14);
    doc.text("EDUCATION", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    formData.education.forEach((edu) => {
      if(edu.trim() !== "") {
        doc.text(`• ${edu}`, 25, currentY);
        currentY += 7;
      }
    });

    // Skills Section (புள்ளிகளாக மாற்றப்பட்டுள்ளது)
    currentY += 15;
    doc.setTextColor(0, 229, 255);
    doc.setFontSize(14);
    doc.text("SKILLS", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    formData.skills.forEach((skill) => {
      if(skill.trim() !== "") {
        doc.text(`• ${skill}`, 25, currentY);
        currentY += 7;
      }
    });

    // Certificates Section
    currentY += 15;
    doc.setTextColor(255, 79, 216);
    doc.setFontSize(14);
    doc.text("CERTIFICATES", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    formData.certificates.forEach((cert) => {
      if(cert && cert.trim() !== "") {
        doc.text(`• ${cert}`, 25, currentY);
        currentY += 7;
      }
    });

    // Achievements Section
    currentY += 15;
    doc.setTextColor(255, 79, 216);
    doc.setFontSize(14);
    doc.text("ACHIEVEMENTS", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    formData.achievements.forEach((ach) => {
      if(ach && ach.trim() !== "") {
        doc.text(`• ${ach}`, 25, currentY);
        currentY += 7;
      }
    });

    // Extra Curricular Section
    currentY += 15;
    doc.setTextColor(0, 229, 255);
    doc.setFontSize(14);
    doc.text("EXTRA CURRICULAR ACTIVITIES", 20, currentY);
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(11);
    currentY += 8;
    formData.extracurricular.forEach((act) => {
      if(act && act.trim() !== "") {
        doc.text(`• ${act}`, 25, currentY);
        currentY += 7;
      }
    });

    // Languages Section (புள்ளிகளாக பிரிக்கப்பட்டுள்ளது)
    if(formData.languages.trim() !== "") {
      currentY += 15;
      doc.setTextColor(0, 229, 255);
      doc.setFontSize(14);
      doc.text("LANGUAGES", 20, currentY);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      currentY += 8;
      formData.languages.split(",").forEach((lang) => {
        if(lang.trim() !== "") {
          doc.text(`• ${lang.trim()}`, 25, currentY);
          currentY += 7;
        }
      });
    }

    // Hobbies Section (புள்ளிகளாக பிரிக்கப்பட்டுள்ளது)
    if(formData.hobbies.trim() !== "") {
      currentY += 15;
      doc.setTextColor(255, 79, 216);
      doc.setFontSize(14);
      doc.text("HOBBIES", 20, currentY);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      currentY += 8;
      formData.hobbies.split(",").forEach((hobby) => {
        if(hobby.trim() !== "") {
          doc.text(`• ${hobby.trim()}`, 25, currentY);
          currentY += 7;
        }
      });
    }

    doc.save(`${formData.fullName || "Resume"}.pdf`);
  };

  // 📝 WORD (DOC) DOWNLOAD FUNCTION
  const downloadWORD = () => {
    const expHTML = formData.experience.map(exp => exp ? `<li>${exp}</li>` : '').join('');
    const eduHTML = formData.education.map(edu => edu ? `<li>${edu}</li>` : '').join('');
    const skillHTML = formData.skills.map(skill => skill ? `<li>${skill}</li>` : '').join('');
    const certHTML = formData.certificates.map(cert => cert ? `<li>${cert}</li>` : '').join('');
    const achHTML = formData.achievements.map(ach => ach ? `<li>${ach}</li>` : '').join('');
    const extraHTML = formData.extracurricular.map(act => act ? `<li>${act}</li>` : '').join('');
    
    // கமாவால் பிரிக்கப்பட்டவற்றை பாயிண்டுகளாக மாற்றுதல்
    const langHTML = formData.languages.split(',').map(l => l.trim() ? `<li>${l.trim()}</li>` : '').join('');
    const hobbyHTML = formData.hobbies.split(',').map(h => h.trim() ? `<li>${h.trim()}</li>` : '').join('');

    const htmlContent = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><title>Resume</title><style>body {font-family: Arial; line-height: 1.6;} ul {margin-top:0;}</style></head>
      <body>
        <h2>${formData.fullName.toUpperCase()}</h2>
        <p>Email: ${formData.email} | Phone: ${formData.phone}</p>
        <hr/>
        <h3>Professional Summary</h3><p>${formData.summary}</p>
        <h3>Experience</h3><ul>${expHTML}</ul>
        <h3>Education</h3><ul>${eduHTML}</ul>
        <h3>Skills</h3><ul>${skillHTML}</ul>
        <h3>Certificates</h3><ul>${certHTML}</ul>
        <h3>Achievements</h3><ul>${achHTML}</ul>
        <h3>Extra Curricular Activities</h3><ul>${extraHTML}</ul>
        <h3>Languages</h3><ul>${langHTML}</ul>
        <h3>Hobbies</h3><ul>${hobbyHTML}</ul>
      </body>
      </html>
    `;

    const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formData.fullName || "Resume"}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
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