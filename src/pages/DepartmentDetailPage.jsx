import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom:"1px solid #eee", marginBottom:"4px" }}>
      <div onClick={() => setOpen(!open)} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"13px 0", cursor:"pointer", fontSize:"14px", fontWeight:"500", color:"#1a1a2e", fontFamily:"'Poppins',sans-serif" }}>
        <span>{faq.question}</span>
        <span style={{ fontSize:"20px", color:"#2193b0", flexShrink:0, marginLeft:"12px" }}>{open ? "−" : "+"}</span>
      </div>
      {open && <p style={{ fontSize:"13px", color:"#666", lineHeight:1.7, paddingBottom:"13px", fontFamily:"'Poppins',sans-serif" }}>{faq.answer}</p>}
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
  if (!dept) return loadingUI("Department not found.");

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .dd-hero { position:relative; height:360px; overflow:hidden; }
        .dd-hero img { width:100%; height:100%; object-fit:cover; }
        .dd-hero-placeholder { width:100%; height:100%; background:linear-gradient(135deg,#2193b0,#6dd5ed); }
        .dd-hero-overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(0,0,0,0.7),rgba(0,0,0,0.3)); display:flex; flex-direction:column; justify-content:flex-end; padding:36px 56px; }
        .dd-back-btn { display:inline-block; margin-bottom:14px; background:rgba(255,255,255,0.2); color:#fff; border:1px solid rgba(255,255,255,0.4); border-radius:8px; padding:7px 14px; font-size:13px; cursor:pointer; font-family:'Poppins',sans-serif; backdrop-filter:blur(4px); width:fit-content; }
        .dd-hero-title { font-size:38px; font-weight:800; color:#fff; margin:0 0 10px; font-family:'Poppins',sans-serif; }
        .dd-hero-desc { font-size:15px; color:rgba(255,255,255,0.85); max-width:560px; font-family:'Poppins',sans-serif; }
        .dd-main { display:flex; gap:36px; padding:52px 56px; background:#fff; align-items:flex-start; }
        .dd-left { flex:1; min-width:0; }
        .dd-right { width:280px; flex-shrink:0; }
        .dd-section { margin-bottom:36px; }
        .dd-section-title { font-size:22px; font-weight:700; color:#1a1a2e; margin-bottom:14px; font-family:'Poppins',sans-serif; border-bottom:2px solid #eef6fb; padding-bottom:8px; }
        .dd-section-text { font-size:14px; color:#555; line-height:1.8; font-family:'Poppins',sans-serif; }
        .dd-info-card { background:#f8fafc; border-radius:16px; padding:22px; border:1px solid #eee; margin-bottom:18px; }
        .dd-info-card-title { font-size:16px; font-weight:700; color:#1a1a2e; margin-bottom:18px; font-family:'Poppins',sans-serif; }
        .dd-info-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:12px; padding-bottom:12px; border-bottom:1px solid #eee; }
        .dd-info-label { font-size:12px; color:#888; font-family:'Poppins',sans-serif; }
        .dd-info-value { font-size:13px; font-weight:600; color:#1a1a2e; font-family:'Poppins',sans-serif; }
        .dd-status-badge { background:#d4edda; color:#155724; padding:3px 10px; border-radius:20px; font-size:11px; font-family:'Poppins',sans-serif; }
        .dd-book-btn { width:100%; padding:12px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; margin-bottom:10px; margin-top:8px; }
        .dd-contact-btn { width:100%; padding:12px; background:transparent; color:#2193b0; border:2px solid #2193b0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .dd-cover-card { border-radius:12px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.1); }
        .dd-cover-card img { width:100%; height:160px; object-fit:cover; display:block; }
        .dd-cta { background:#2193b0; padding:52px 56px; text-align:center; }
        .dd-cta-title { font-size:28px; font-weight:800; color:#fff; margin-bottom:10px; font-family:'Poppins',sans-serif; }
        .dd-cta-desc { font-size:15px; color:rgba(255,255,255,0.85); margin-bottom:24px; font-family:'Poppins',sans-serif; }
        .dd-cta-btn { padding:13px 36px; background:#fff; color:#2193b0; border:none; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer; font-family:'Poppins',sans-serif; }
        @media (max-width:1024px) {
          .dd-hero-overlay { padding:28px 36px; }
          .dd-main { padding:40px 36px; }
          .dd-cta { padding:40px 36px; }
        }
        @media (max-width:768px) {
          .dd-hero { height:260px; }
          .dd-hero-overlay { padding:20px 24px; }
          .dd-hero-title { font-size:26px; }
          .dd-main { flex-direction:column; padding:32px 24px; gap:24px; }
          .dd-right { width:100%; }
          .dd-cta { padding:40px 24px; }
          .dd-cta-title { font-size:22px; }
        }
        @media (max-width:480px) {
          .dd-hero { height:200px; }
          .dd-hero-overlay { padding:16px 18px; }
          .dd-hero-title { font-size:20px; }
          .dd-hero-desc { font-size:12px; }
          .dd-main { padding:24px 16px; }
          .dd-section-title { font-size:18px; }
          .dd-cta { padding:32px 16px; }
          .dd-cta-title { font-size:18px; }
        }
      `}</style>
      <Navbar />
      <div className="dd-hero">
        {dept.coverUrl ? <img src={dept.coverUrl} alt={dept.name}/> : <div className="dd-hero-placeholder"/>}
        <div className="dd-hero-overlay">
          <button className="dd-back-btn" onClick={() => navigate("/departments")}>← Back to Departments</button>
          <h1 className="dd-hero-title">{dept.name}</h1>
          {dept.shortDescription && <p className="dd-hero-desc">{dept.shortDescription}</p>}
        </div>
      </div>
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
      <div className="dd-cta">
        <h2 className="dd-cta-title">Ready to Book an Appointment?</h2>
        <p className="dd-cta-desc">Schedule a visit with our {dept.name} specialists today</p>
        <button className="dd-cta-btn" onClick={() => navigate("/book-appointment")}>Book Now</button>
      </div>
      <Footer />
    </div>
  );
}