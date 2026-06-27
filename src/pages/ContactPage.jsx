import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FORMSPREE_ID = "YOUR_FORM_ID";

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName:"", lastName:"", email:"", phone:"", subject:"", message:"" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true); setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method:"POST", headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ name:`${formData.firstName} ${formData.lastName}`, email:formData.email, phone:formData.phone, subject:formData.subject, message:formData.message }),
      });
      if (res.ok) { setSuccess(true); setFormData({ firstName:"", lastName:"", email:"", phone:"", subject:"", message:"" }); setTimeout(() => setSuccess(false), 5000); }
      else setError("Failed to send. Try again.");
    } catch { setError("Something went wrong."); }
    finally { setSending(false); }
  };

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .ct-hero { position:relative; height:380px; overflow:hidden; }
        .ct-hero img { width:100%; height:100%; object-fit:cover; }
        .ct-hero-overlay { position:absolute; inset:0; background:rgba(0,0,0,0.5); display:flex; align-items:center; justify-content:center; padding:20px; }
        .ct-hero-card { background:rgba(255,255,255,0.12); backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.3); border-radius:16px; padding:30px 50px; text-align:center; }
        .ct-hero-title { font-size:42px; font-weight:800; color:#e05c5c; margin:0; font-family:'Poppins',sans-serif; }
        .ct-hero-desc { font-size:16px; color:rgba(255,255,255,0.9); margin-top:10px; max-width:500px; font-family:'Poppins',sans-serif; }
        .ct-main { display:flex; gap:60px; padding:60px; background:#fff; align-items:flex-start; }
        .ct-form-side { flex:1; min-width:0; }
        .ct-info-side { width:380px; flex-shrink:0; }
        .ct-form-title { font-size:28px; font-weight:700; color:#1a1a2e; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .ct-form-desc { font-size:14px; color:#888; margin-bottom:28px; font-family:'Poppins',sans-serif; }
        .ct-success { background:#d4edda; color:#155724; padding:12px 16px; border-radius:8px; font-size:14px; margin-bottom:20px; font-family:'Poppins',sans-serif; }
        .ct-error { background:#fde8e8; color:#c0392b; padding:12px 16px; border-radius:8px; font-size:14px; margin-bottom:20px; font-family:'Poppins',sans-serif; }
        .ct-row2 { display:flex; gap:16px; }
        .ct-input-group { margin-bottom:18px; flex:1; }
        .ct-label { display:block; font-size:13px; font-weight:500; color:#555; margin-bottom:6px; font-family:'Poppins',sans-serif; }
        .ct-input { width:100%; padding:12px 14px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:14px; box-sizing:border-box; outline:none; background:#f8fafc; font-family:'Poppins',sans-serif; color:#333; }
        .ct-textarea { width:100%; padding:12px 14px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:14px; box-sizing:border-box; outline:none; background:#f8fafc; font-family:'Poppins',sans-serif; color:#333; resize:vertical; }
        .ct-submit-btn { width:100%; padding:14px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:15px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .ct-info-title { font-size:28px; font-weight:700; color:#1a1a2e; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .ct-info-desc { font-size:14px; color:#888; margin-bottom:24px; font-family:'Poppins',sans-serif; }
        .ct-info-card { display:flex; gap:14px; align-items:flex-start; background:#f8fafc; border-radius:12px; padding:16px 18px; margin-bottom:14px; border:1px solid #eee; }
        .ct-info-icon { width:36px; height:36px; background:#fff; border-radius:50%; display:flex; align-items:center; justify-content:center; box-shadow:0 2px 6px rgba(0,0,0,0.08); flex-shrink:0; margin-top:2px; }
        .ct-info-card-title { font-size:14px; font-weight:700; color:#1a1a2e; margin:0 0 4px; font-family:'Poppins',sans-serif; }
        .ct-info-card-text { font-size:13px; color:#666; margin:2px 0; font-family:'Poppins',sans-serif; }
        .ct-follow-title { font-size:15px; font-weight:600; color:#1a1a2e; margin:20px 0 12px; font-family:'Poppins',sans-serif; }
        .ct-social-row { display:flex; gap:12px; }
        .ct-social-icon { width:42px; height:42px; background:#eef6fb; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer; text-decoration:none; transition:background 0.2s; }
        .ct-map-section { padding:60px; background:#f8fafc; }
        .ct-map-title { font-size:32px; font-weight:700; color:#1a1a2e; text-align:center; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .ct-map-desc { font-size:15px; color:#666; text-align:center; margin-bottom:32px; font-family:'Poppins',sans-serif; }

        @media (max-width:900px) {
          .ct-hero { height:280px; }
          .ct-hero-card { padding:22px 28px; }
          .ct-hero-title { font-size:30px; }
          .ct-main { flex-direction:column; gap:40px; padding:40px 32px; }
          .ct-info-side { width:100%; }
          .ct-map-section { padding:40px 32px; }
          .ct-map-title { font-size:26px; }
        }
        @media (max-width:600px) {
          .ct-hero { height:220px; }
          .ct-hero-card { padding:18px 20px; }
          .ct-hero-title { font-size:24px; }
          .ct-hero-desc { font-size:13px; }
          .ct-main { padding:28px 20px; gap:32px; }
          .ct-row2 { flex-direction:column; gap:0; }
          .ct-map-section { padding:32px 20px; }
          .ct-map-title { font-size:22px; }
        }
      `}</style>

      <Navbar />

      {/* Hero */}
      <div className="ct-hero">
        <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1400&q=80" alt="contact"/>
        <div className="ct-hero-overlay">
          <div className="ct-hero-card">
            <h1 className="ct-hero-title">Contact Us</h1>
            <p className="ct-hero-desc">We're here to help. Reach out to us with any questions or to schedule an appointment.</p>
          </div>
        </div>
      </div>

      <div className="ct-main">
        {/* Form */}
        <div className="ct-form-side">
          <h2 className="ct-form-title">Get In Touch</h2>
          <p className="ct-form-desc">Fill out the form and our team will get back to you within 24 hours.</p>
          {success && <div className="ct-success">✅ Message sent! We'll get back to you within 24 hours.</div>}
          {error && <div className="ct-error">{error}</div>}
          <form onSubmit={handleSubmit}>
            <div className="ct-row2">
              <div className="ct-input-group">
                <label className="ct-label">First name</label>
                <input className="ct-input" name="firstName" placeholder="First name" value={formData.firstName} onChange={handleChange} required/>
              </div>
              <div className="ct-input-group">
                <label className="ct-label">Last name</label>
                <input className="ct-input" name="lastName" placeholder="Last name" value={formData.lastName} onChange={handleChange} required/>
              </div>
            </div>
            <div className="ct-input-group">
              <label className="ct-label">Email</label>
              <input className="ct-input" name="email" type="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} required/>
            </div>
            <div className="ct-input-group">
              <label className="ct-label">Phone</label>
              <input className="ct-input" name="phone" placeholder="+971 XX XXX XXXX" value={formData.phone} onChange={handleChange} required/>
            </div>
            <div className="ct-input-group">
              <label className="ct-label">Subject</label>
              <input className="ct-input" name="subject" placeholder="Subject" value={formData.subject} onChange={handleChange} required/>
            </div>
            <div className="ct-input-group">
              <label className="ct-label">Message</label>
              <textarea className="ct-textarea" name="message" placeholder="Your message..." rows={5} value={formData.message} onChange={handleChange} required/>
            </div>
            <button className="ct-submit-btn" type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
          </form>
        </div>

        {/* Info */}
        <div className="ct-info-side">
          <h2 className="ct-info-title">Contact Information</h2>
          <p className="ct-info-desc">Visit us or reach out through any channel below.</p>
          <div className="ct-info-card">
            <div className="ct-info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            </div>
            <div>
              <h4 className="ct-info-card-title">Phone</h4>
              <p className="ct-info-card-text">Main: +971 (0) 4379 3562</p>
              <p className="ct-info-card-text">Emergency: +971 (0) 4379 3562</p>
            </div>
          </div>
          <div className="ct-info-card">
            <div className="ct-info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
            </div>
            <div>
              <h4 className="ct-info-card-title">Email</h4>
              <p className="ct-info-card-text">smart@smcare.ae</p>
            </div>
          </div>
          <div className="ct-info-card">
            <div className="ct-info-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
            <div>
              <h4 className="ct-info-card-title">Working Hours</h4>
              <p className="ct-info-card-text">Mon – Fri: 8:00 AM – 8:00 PM</p>
              <p className="ct-info-card-text">Saturday: 9:00 AM – 5:00 PM</p>
              <p className="ct-info-card-text">Sunday: Closed</p>
            </div>
          </div>
          <h4 className="ct-follow-title">Follow Us</h4>
          <div className="ct-social-row">
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="ct-social-icon"
              onMouseEnter={(e) => e.currentTarget.style.background="#1877f2"}
              onMouseLeave={(e) => e.currentTarget.style.background="#eef6fb"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2193b0"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/></svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="ct-social-icon"
              onMouseEnter={(e) => e.currentTarget.style.background="#e1306c"}
              onMouseLeave={(e) => e.currentTarget.style.background="#eef6fb"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.5" fill="#2193b0" stroke="none"/></svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="ct-social-icon"
              onMouseEnter={(e) => e.currentTarget.style.background="#0077b5"}
              onMouseLeave={(e) => e.currentTarget.style.background="#eef6fb"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2193b0"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2" fill="#2193b0"/></svg>
            </a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div className="ct-map-section">
        <h2 className="ct-map-title">Find Us</h2>
        <p className="ct-map-desc">Conveniently located in Dubai</p>
        <iframe title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1763392!2d55.3265!3d25.2697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3b7e3a4a3d%3A0x5e8e4b3a5b7e4a3d!2sDoha%20Centre!5e0!3m2!1sen!2sae!4v1234567890"
          width="100%" height="450" style={{border:0, borderRadius:"12px"}} allowFullScreen loading="lazy"/>
      </div>

      <Footer />
    </div>
  );
}