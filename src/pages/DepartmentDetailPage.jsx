import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "1px solid #eee", marginBottom: "4px" }}>
      <div onClick={() => setOpen(!open)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"14px 0", cursor:"pointer", fontSize:"15px", fontWeight:"500", color:"#1a1a2e", fontFamily:"'Poppins',sans-serif" }}>
        <span>{faq.question}</span>
        <span style={{ fontSize:"20px", color:"#2193b0", flexShrink:0, marginLeft:"12px" }}>{open ? "−" : "+"}</span>
      </div>
      {open && <p style={{ fontSize:"14px", color:"#666", lineHeight:1.7, paddingBottom:"14px", fontFamily:"'Poppins',sans-serif" }}>{faq.answer}</p>}
    </div>
  );
}

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const docSnap = await getDoc(doc(db, "departments", id));
        if (docSnap.exists()) setDept({ id: docSnap.id, ...docSnap.data() });
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchDept();
  }, [id]);

  const loadingUI = (msg) => (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <Navbar />
      <div style={{ minHeight:"60vh", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"16px", color:"#888", fontFamily:"'Poppins',sans-serif" }}>{msg}</div>
      <Footer />
    </div>
  );

  if (loading) return loadingUI("Loading...");
  if (!dept)   return loadingUI("Department not found.");

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .dd-hero { position:relative; height:380px; overflow:hidden; }
        .dd-hero img { width:100%; height:100%; object-fit:cover; }
        .dd-hero-placeholder { width:100%; height:100%; background:linear-gradient(135deg,#2193b0,#6dd5ed); }
        .dd-hero-overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.3)); display:flex; flex-direction:column; justify-content:flex-end; padding:40px 60px; }
        .dd-back-btn { display:inline-block; margin-bottom:16px; background:rgba(255,255,255,0.2); color:#fff; border:1px solid rgba(255,255,255,0.4); border-radius:8px; padding:8px 16px; font-size:13px; cursor:pointer; font-family:'Poppins',sans-serif; backdrop-filter:blur(4px); width:fit-content; }
        .dd-hero-title { font-size:42px; font-weight:800; color:#fff; margin:0 0 12px; font-family:'Poppins',sans-serif; }
        .dd-hero-desc { font-size:16px; color:rgba(255,255,255,0.85); max-width:600px; font-family:'Poppins',sans-serif; }

        .dd-main { display:flex; gap:40px; padding:60px; background:#fff; align-items:flex-start; }
        .dd-left { flex:1; min-width:0; }
        .dd-right { width:300px; flex-shrink:0; }

        .dd-section { margin-bottom:40px; }
        .dd-section-title { font-size:24px; font-weight:700; color:#1a1a2e; margin-bottom:16px; font-family:'Poppins',sans-serif; border-bottom:2px solid #eef6fb; padding-bottom:10px; }
        .dd-section-text { font-size:15px; color:#555; line-height:1.8; font-family:'Poppins',sans-serif; }

        .dd-info-card { background:#f8fafc; border-radius:16px; padding:24px; border:1px solid #eee; margin-bottom:20px; }
        .dd-info-card-title { font-size:17px; font-weight:700; color:#1a1a2e; margin-bottom:20px; font-family:'Poppins',sans-serif; }
        .dd-info-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:14px; padding-bottom:14px; border-bottom:1px solid #eee; }
        .dd-info-label { font-size:13px; color:#888; font-family:'Poppins',sans-serif; }
        .dd-info-value { font-size:14px; font-weight:600; color:#1a1a2e; font-family:'Poppins',sans-serif; }
        .dd-status-badge { background:#d4edda; color:#155724; padding:4px 12px; border-radius:20px; font-size:12px; font-family:'Poppins',sans-serif; }
        .dd-book-btn { width:100%; padding:13px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; margin-bottom:10px; margin-top:8px; }
        .dd-contact-btn { width:100%; padding:13px; background:transparent; color:#2193b0; border:2px solid #2193b0; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .dd-cover-card { border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.1); }
        .dd-cover-card img { width:100%; height:180px; object-fit:cover; display:block; }

        .dd-cta { background:#2193b0; padding:60px; text-align:center; }
        .dd-cta-title { font-size:32px; font-weight:800; color:#fff; margin-bottom:12px; font-family:'Poppins',sans-serif; }
        .dd-cta-desc { font-size:16px; color:rgba(255,255,255,0.85); margin-bottom:28px; font-family:'Poppins',sans-serif; }
        .dd-cta-btn { padding:14px 40px; background:#fff; color:#2193b0; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Poppins',sans-serif; }

        @media (max-width:900px) {
          .dd-hero { height:280px; }
          .dd-hero-overlay { padding:28px 32px; }
          .dd-hero-title { font-size:28px; }
          .dd-main { flex-direction:column; padding:40px 32px; gap:32px; }
          .dd-right { width:100%; }
          .dd-cta { padding:48px 32px; }
          .dd-cta-title { font-size:24px; }
        }
        @media (max-width:600px) {
          .dd-hero { height:220px; }
          .dd-hero-overlay { padding:20px; }
          .dd-hero-title { font-size:22px; }
          .dd-hero-desc { font-size:13px; }
          .dd-main { padding:28px 20px; }
          .dd-section-title { font-size:19px; }
          .dd-cta { padding:36px 20px; }
          .dd-cta-title { font-size:20px; }
        }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div className="dd-hero">
        {dept.coverUrl ? <img src={dept.coverUrl} alt={dept.name}/> : <div className="dd-hero-placeholder"/>}
        <div className="dd-hero-overlay">
          <button className="dd-back-btn" onClick={() => navigate("/departments")}>← Back to Departments</button>
          <h1 className="dd-hero-title">{dept.name}</h1>
          {dept.shortDescription && <p className="dd-hero-desc">{dept.shortDescription}</p>}
        </div>
      </div>

      {/* Main */}
      <div className="dd-main">
        <div className="dd-left">
          {dept.description && (
            <div className="dd-section">
              <h2 className="dd-section-title">About {dept.name}</h2>
              <p className="dd-section-text">{dept.description}</p>
            </div>
          )}
          {dept.whyChooseUs && (
            <div className="dd-section">
              <h2 className="dd-section-title">Why Choose Us</h2>
              <p className="dd-section-text">{dept.whyChooseUs}</p>
            </div>
          )}
          {dept.faqs?.length > 0 && (
            <div className="dd-section">
              <h2 className="dd-section-title">Frequently Asked Questions</h2>
              {dept.faqs.map((faq, i) => <FaqItem key={i} faq={faq}/>)}
            </div>
          )}
        </div>

        <div className="dd-right">
          <div className="dd-info-card">
            <h3 className="dd-info-card-title">Department Info</h3>
            {dept.fee && (
              <div className="dd-info-row">
                <span className="dd-info-label">Consultation Fee</span>
                <span className="dd-info-value">{dept.fee}</span>
              </div>
            )}
            <div className="dd-info-row" style={{ borderBottom:"none", marginBottom:0, paddingBottom:0 }}>
              <span className="dd-info-label">Status</span>
              <span className="dd-status-badge">{dept.status || "Active"}</span>
            </div>
            <button className="dd-book-btn" onClick={() => navigate("/book-appointment")}>Book Appointment</button>
            <button className="dd-contact-btn" onClick={() => navigate("/contact")}>Contact Us</button>
          </div>
          {dept.coverUrl && (
            <div className="dd-cover-card">
              <img src={dept.coverUrl} alt={dept.name}/>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="dd-cta">
        <h2 className="dd-cta-title">Ready to Book an Appointment?</h2>
        <p className="dd-cta-desc">Schedule a visit with our {dept.name} specialists today</p>
        <button className="dd-cta-btn" onClick={() => navigate("/book-appointment")}>Book Now</button>
      </div>

      <Footer />
    </div>
  );
}