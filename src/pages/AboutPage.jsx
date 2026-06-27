import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const values = [
  "S – Service Excellence – Delivering outstanding care in every patient interaction",
  "M – Modern Innovation – Using AI and technology for smarter healthcare",
  "A – Accountability – Acting with integrity and transparency",
  "R – Respect & Compassion – Caring for every person with empathy",
  "T – Trust – Building lasting confidence through consistent quality",
];

const achievements = [
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>,
    title: "Patient-Centric Excellence",
    desc: "Consistently high satisfaction ratings through compassionate, personalised care.",
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/><path d="M9 9l2 2 4-4"/></svg>,
    title: "AI-Powered Healthcare",
    desc: "Harnessing AI for operational efficiency, faster consultation, diagnostics, personalised treatment, and improved outcomes.",
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="9" height="9" rx="1"/><rect x="13" y="2" width="9" height="9" rx="1"/><rect x="2" y="13" width="9" height="9" rx="1"/><rect x="13" y="13" width="9" height="9" rx="1"/></svg>,
    title: "State-of-the-Art",
    desc: "Modern facilities with the latest medical technology.",
  },
  {
    icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    title: "International Team",
    desc: "Doctors trained at prestigious institutions worldwide.",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .ab-hero { position:relative; height:400px; overflow:hidden; }
        .ab-hero img { width:100%; height:100%; object-fit:cover; }
        .ab-hero-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.45); display:flex; align-items:center; justify-content:center; padding:20px; }
        .ab-hero-card { background:rgba(255,255,255,0.15); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3); border-radius:16px; padding:30px 50px; text-align:center; }
        .ab-hero-title { font-size:42px; font-weight:800; margin:0; font-family:'Poppins',sans-serif; }
        .ab-hero-desc { font-size:16px; color:rgba(255,255,255,0.9); margin-top:10px; font-family:'Poppins',sans-serif; }
        .ab-story { display:flex; gap:60px; padding:80px 60px; align-items:center; background:#fff; }
        .ab-story-left { flex:1; }
        .ab-story-right { flex:1; }
        .ab-badge { display:inline-block; background:#2193b0; color:#fff; padding:6px 16px; border-radius:20px; font-size:13px; font-weight:500; margin-bottom:16px; font-family:'Poppins',sans-serif; }
        .ab-section-title { font-size:36px; font-weight:800; color:#1a1a2e; margin:0 0 20px; font-family:'Poppins',sans-serif; }
        .ab-text { font-size:15px; color:#555; line-height:1.8; margin-bottom:16px; font-family:'Poppins',sans-serif; }
        .ab-img-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .ab-img-grid img:first-child { width:100%; height:220px; object-fit:cover; border-radius:12px; }
        .ab-img-grid img:last-child { width:100%; height:220px; object-fit:cover; border-radius:12px; margin-top:24px; }
        .ab-mission { padding:80px 60px; background:#f8fafc; }
        .ab-center-title { font-size:36px; font-weight:800; color:#1a1a2e; text-align:center; margin-bottom:12px; font-family:'Poppins',sans-serif; }
        .ab-center-desc { font-size:15px; color:#666; text-align:center; margin-bottom:48px; font-family:'Poppins',sans-serif; }
        .ab-mission-grid { display:flex; gap:24px; flex-wrap:wrap; }
        .ab-mission-card { flex:1; min-width:280px; background:#fff; border-radius:16px; padding:30px; box-shadow:0 4px 16px rgba(0,0,0,0.06); }
        .ab-mission-icon-row { display:flex; align-items:center; gap:12px; margin-bottom:16px; }
        .ab-mission-card-title { font-size:18px; font-weight:700; color:#1a1a2e; margin:0; font-family:'Poppins',sans-serif; }
        .ab-mission-card-desc { font-size:14px; color:#555; line-height:1.8; font-family:'Poppins',sans-serif; }
        .ab-value-item { display:flex; gap:8px; margin-bottom:10px; align-items:flex-start; }
        .ab-value-text { font-size:13px; color:#555; line-height:1.6; font-family:'Poppins',sans-serif; }
        .ab-achieve { padding:80px 60px; background:#fff; }
        .ab-achieve-grid { display:flex; gap:24px; flex-wrap:wrap; }
        .ab-achieve-card { flex:1; min-width:220px; border:1px solid #eee; border-radius:16px; padding:30px; text-align:center; box-shadow:0 2px 8px rgba(0,0,0,0.06); transition:transform 0.3s,box-shadow 0.3s; }
        .ab-achieve-card:hover { transform:translateY(-6px); box-shadow:0 12px 30px rgba(0,0,0,0.1); }
        .ab-achieve-icon { display:flex; justify-content:center; margin-bottom:16px; }
        .ab-achieve-title { font-size:16px; font-weight:700; color:#1a1a2e; margin-bottom:12px; font-family:'Poppins',sans-serif; }
        .ab-achieve-desc { font-size:13px; color:#666; line-height:1.7; font-family:'Poppins',sans-serif; }
        .ab-cta { background:#2193b0; padding:80px 60px; text-align:center; }
        .ab-cta-title { font-size:36px; font-weight:800; color:#fff; margin-bottom:12px; font-family:'Poppins',sans-serif; }
        .ab-cta-desc { font-size:16px; color:rgba(255,255,255,0.85); margin-bottom:32px; font-family:'Poppins',sans-serif; }
        .ab-cta-btns { display:flex; gap:16px; justify-content:center; flex-wrap:wrap; }
        .ab-btn1 { padding:14px 32px; background:#fff; color:#2193b0; border:none; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Poppins',sans-serif; }
        .ab-btn2 { padding:14px 32px; background:transparent; color:#fff; border:2px solid #fff; border-radius:8px; font-size:15px; font-weight:700; cursor:pointer; font-family:'Poppins',sans-serif; }

        @media (max-width:900px) {
          .ab-hero { height:300px; }
          .ab-hero-card { padding:24px 28px; }
          .ab-hero-title { font-size:30px; }
          .ab-story { flex-direction:column; gap:32px; padding:50px 32px; }
          .ab-mission { padding:50px 32px; }
          .ab-achieve { padding:50px 32px; }
          .ab-cta { padding:50px 32px; }
          .ab-cta-title { font-size:26px; }
          .ab-section-title { font-size:26px; }
          .ab-center-title { font-size:26px; }
        }
        @media (max-width:600px) {
          .ab-hero { height:240px; }
          .ab-hero-card { padding:18px 20px; }
          .ab-hero-title { font-size:22px; }
          .ab-hero-desc { font-size:13px; }
          .ab-story { padding:36px 20px; }
          .ab-img-grid { grid-template-columns:1fr; }
          .ab-img-grid img:last-child { margin-top:0; }
          .ab-mission { padding:36px 20px; }
          .ab-mission-card { min-width:100%; }
          .ab-achieve { padding:36px 20px; }
          .ab-achieve-card { min-width:100%; }
          .ab-cta { padding:40px 20px; }
          .ab-section-title { font-size:22px; }
          .ab-center-title { font-size:22px; }
        }
      `}</style>
      <Navbar />

      {/* Hero */}
      <div className="ab-hero">
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80" alt="clinic"/>
        <div className="ab-hero-overlay">
          <div className="ab-hero-card">
            <h1 className="ab-hero-title">
              <span style={{color:"#2193b0"}}>Smart</span>{" "}
              <span style={{color:"#e05c5c"}}>Care</span>{" "}
              <span style={{color:"#fff"}}>Polyclinic</span>
            </h1>
            <p className="ab-hero-desc">Providing exceptional healthcare services in Dubai.</p>
          </div>
        </div>
      </div>

      {/* Story */}
      <div className="ab-story">
        <div className="ab-story-left">
          <span className="ab-badge">Our Story</span>
          <h2 className="ab-section-title">Leading Healthcare in Dubai</h2>
          <p className="ab-text">Smart Care Polyclinic is a new-generation medical center in Dubai that combines clinical excellence with the power of Artificial Intelligence to transform the healthcare experience. From AI-assisted diagnostics to personalized treatment pathways, we use intelligent technology to deliver faster, more accurate, and more connected care—setting a new benchmark for quality and innovation in the UAE.</p>
          <p className="ab-text">Smart Care Polyclinic stands as a trusted name in modern healthcare—driven by innovation, guided by compassion, and committed to ethical, transparent, and high-impact medical care.</p>
        </div>
        <div className="ab-story-right">
          <div className="ab-img-grid">
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" alt="clinic"/>
            <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80" alt="clinic"/>
          </div>
        </div>
      </div>

      {/* Mission */}
      <div className="ab-mission">
        <h2 className="ab-center-title">Our Mission & Values</h2>
        <p className="ab-center-desc">Guided by our commitment to excellence and compassionate care</p>
        <div className="ab-mission-grid">
          <div className="ab-mission-card">
            <div className="ab-mission-icon-row">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              <h3 className="ab-mission-card-title">Our Mission</h3>
            </div>
            <p className="ab-mission-card-desc">To deliver clinical excellence through a smart, multi-specialty polyclinic that blends AI-driven diagnostics, personalised care, and evidence-based care, ensuring faster, more accurate, and compassionate healthcare for the UAE community.</p>
          </div>
          <div className="ab-mission-card">
            <div className="ab-mission-icon-row">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="6"/><path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>
              <h3 className="ab-mission-card-title">Our Vision</h3>
            </div>
            <p className="ab-mission-card-desc">To lead the future of healthcare in the UAE through a network of smart, patient-first clinics, uniting advanced technology and compassionate care to enhance health, longevity, and quality of life.</p>
          </div>
          <div className="ab-mission-card">
            <div className="ab-mission-icon-row">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <h3 className="ab-mission-card-title">Our Values</h3>
            </div>
            <div style={{marginTop:"8px"}}>
              {values.map((v, i) => (
                <div key={i} className="ab-value-item">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><polyline points="20 6 9 17 4 12"/></svg>
                  <span className="ab-value-text">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div className="ab-achieve">
        <h2 className="ab-center-title">Our Achievements</h2>
        <p className="ab-center-desc">Recognized for excellence in healthcare services</p>
        <div className="ab-achieve-grid">
          {achievements.map((item, i) => (
            <div key={i} className="ab-achieve-card">
              <div className="ab-achieve-icon">{item.icon}</div>
              <h3 className="ab-achieve-title">{item.title}</h3>
              <p className="ab-achieve-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="ab-cta">
        <h2 className="ab-cta-title">Experience the Smart Care Difference</h2>
        <p className="ab-cta-desc">Join thousands of satisfied patients who trust us with their healthcare needs</p>
        <div className="ab-cta-btns">
          <button className="ab-btn1" onClick={() => navigate("/book-appointment")}>Book an Appointment</button>
          <button className="ab-btn2" onClick={() => navigate("/contact")}>Contact Us</button>
        </div>
      </div>

      <Footer />
    </div>
  );
}