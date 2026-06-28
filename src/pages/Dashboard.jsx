import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const actionCards = [
  { icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01"/></svg>, title:"My Appointments", desc:"View and manage your upcoming appointments", btn:"View Appointments", path:"/book-appointment", color:"#2193b0" },
  { icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, title:"My Profile", desc:"Update your personal information", btn:"Edit Profile", path:"/profile", color:"#2193b0" },
  { icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#27ae60" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/><path d="M9 16l2 2 4-4"/></svg>, title:"Book Appointment", desc:"Schedule a new appointment with our specialists", btn:"Book Now", path:"/book-appointment", color:"#27ae60" },
  { icon: <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, title:"Contact Us", desc:"Get in touch with our support team", btn:"Contact", path:"/contact", color:"#2193b0" },
];

const features = [
  { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M9 9l2 2 4-4"/><path d="M8 21h8M12 17v4"/></svg>, title:"AI in Care", desc:"Clinically proven AI-driven tools for faster, more accurate diagnoses." },
  { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title:"Expert Team", desc:"Our doctors work with advanced digital platforms for the highest standard of care." },
  { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title:"Smart & Timely", desc:"Smart scheduling and virtual triage minimize waiting times." },
  { icon: <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title:"Patient-Centered", desc:"From telemedicine to in-home visits, care tailored to your needs." },
];

export default function Dashboard() {
  const { userData } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .db-page { background:#f5f6fa; min-height:calc(100vh - 65px); padding:32px 0; }
        .db-wrap { max-width:1100px; margin:0 auto; padding:0 24px; }
        .db-title { font-size:24px; font-weight:700; color:#1a1a2e; margin-bottom:4px; font-family:'Poppins',sans-serif; }
        .db-sub { font-size:14px; color:#888; margin-bottom:28px; font-family:'Poppins',sans-serif; }
        .db-cards { display:grid; grid-template-columns:repeat(4,1fr); gap:16px; margin-bottom:32px; }
        .db-card { background:#fff; border-radius:14px; padding:22px 18px; box-shadow:0 2px 10px rgba(0,0,0,0.06); text-align:center; transition:transform 0.3s,box-shadow 0.3s; display:flex; flex-direction:column; align-items:center; }
        .db-card:hover { transform:translateY(-5px); box-shadow:0 10px 28px rgba(0,0,0,0.1); }
        .db-card-icon { width:62px; height:62px; background:#f0f8ff; border-radius:50%; display:flex; align-items:center; justify-content:center; margin-bottom:12px; }
        .db-card-title { font-size:14px; font-weight:600; color:#1a1a2e; margin-bottom:6px; font-family:'Poppins',sans-serif; }
        .db-card-desc { font-size:12px; color:#888; margin-bottom:14px; line-height:1.6; font-family:'Poppins',sans-serif; flex:1; }
        .db-card-btn { padding:9px 16px; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:500; cursor:pointer; font-family:'Poppins',sans-serif; width:100%; }
        .db-why-title { font-size:18px; font-weight:700; color:#1a1a2e; margin-bottom:16px; font-family:'Poppins',sans-serif; }
        .db-features { display:grid; grid-template-columns:repeat(4,1fr); gap:14px; margin-bottom:28px; }
        .db-feat { background:#fff; border-radius:12px; padding:20px; text-align:center; border:1px solid #eee; transition:border-color 0.2s,transform 0.2s; }
        .db-feat:hover { border-color:#2193b0; transform:translateY(-3px); }
        .db-feat-icon { display:flex; justify-content:center; margin-bottom:10px; }
        .db-feat-title { font-size:13px; font-weight:600; color:#1a1a2e; margin-bottom:6px; font-family:'Poppins',sans-serif; }
        .db-feat-desc { font-size:12px; color:#888; line-height:1.6; font-family:'Poppins',sans-serif; }
        .db-info-box { background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 8px rgba(0,0,0,0.06); }
        .db-info-title { font-size:16px; font-weight:600; color:#1a1a2e; margin-bottom:16px; font-family:'Poppins',sans-serif; }
        .db-info-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; }
        .db-info-item { background:#f8fafc; border-radius:8px; padding:12px; }
        .db-info-label { display:block; font-size:10px; color:#aaa; font-weight:600; margin-bottom:3px; text-transform:uppercase; font-family:'Poppins',sans-serif; }
        .db-info-val { font-size:13px; color:#333; font-weight:500; font-family:'Poppins',sans-serif; word-break:break-all; }
        @media (max-width:1024px) {
          .db-cards { grid-template-columns:repeat(2,1fr); }
          .db-features { grid-template-columns:repeat(2,1fr); }
          .db-info-grid { grid-template-columns:repeat(3,1fr); }
        }
        @media (max-width:768px) {
          .db-wrap { padding:0 20px; }
          .db-page { padding:24px 0; }
          .db-title { font-size:20px; }
          .db-cards { grid-template-columns:repeat(2,1fr); gap:12px; }
          .db-info-grid { grid-template-columns:repeat(2,1fr); }
        }
        @media (max-width:480px) {
          .db-wrap { padding:0 14px; }
          .db-page { padding:20px 0; }
          .db-title { font-size:18px; }
          .db-cards { grid-template-columns:repeat(2,1fr); gap:10px; }
          .db-card { padding:16px 10px; }
          .db-card-icon { width:50px; height:50px; }
          .db-card-desc { display:none; }
          .db-features { grid-template-columns:repeat(2,1fr); gap:10px; }
          .db-feat { padding:16px 12px; }
          .db-info-grid { grid-template-columns:repeat(2,1fr); }
        }
      `}</style>
      <Navbar />
      <div className="db-page">
        <div className="db-wrap">
          <h2 className="db-title">Welcome, {userData?.name || "User"}! 👋</h2>
          <p className="db-sub">Manage your health information and appointments</p>
          <div className="db-cards">
            {actionCards.map((card, i) => (
              <div key={i} className="db-card">
                <div className="db-card-icon">{card.icon}</div>
                <h3 className="db-card-title">{card.title}</h3>
                <p className="db-card-desc">{card.desc}</p>
                <button className="db-card-btn" style={{ background: card.color }} onClick={() => navigate(card.path)}>{card.btn}</button>
              </div>
            ))}
          </div>
          <h3 className="db-why-title">Why Smart Care?</h3>
          <div className="db-features">
            {features.map((f, i) => (
              <div key={i} className="db-feat">
                <div className="db-feat-icon">{f.icon}</div>
                <h4 className="db-feat-title">{f.title}</h4>
                <p className="db-feat-desc">{f.desc}</p>
              </div>
            ))}
          </div>
          <div className="db-info-box">
            <h3 className="db-info-title">Account Information</h3>
            <div className="db-info-grid">
              {[
                { label:"Name", value: userData?.fullName || userData?.name || "—" },
                { label:"Email", value: userData?.email || "—" },
                { label:"Gender", value: userData?.gender || "—" },
                { label:"ID Type", value: userData?.idType || "—" },
                { label:"Member Since", value: userData?.date || "—" },
              ].map((item, i) => (
                <div key={i} className="db-info-item">
                  <span className="db-info-label">{item.label}</span>
                  <span className="db-info-val">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}