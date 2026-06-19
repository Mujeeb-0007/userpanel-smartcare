import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const FORMSPREE_ID = "YOUR_FORM_ID";

export default function ContactPage() {
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: `${formData.firstName} ${formData.lastName}`, email: formData.email, phone: formData.phone, subject: formData.subject, message: formData.message }),
      });
      if (res.ok) {
        setSuccess(true);
        setFormData({ firstName: "", lastName: "", email: "", phone: "", subject: "", message: "" });
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError("Failed to send. Try again.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={styles.hero}>
        <img src="https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=1400&q=80" alt="contact" style={styles.heroImg} />
        <div style={styles.heroOverlay}>
          <div style={styles.heroCard}>
            <h1 style={styles.heroTitle}>Contact Us</h1>
            <p style={styles.heroDesc}>We're here to help. Reach out to us with any questions or to schedule an appointment.</p>
          </div>
        </div>
      </div>

      <div style={styles.mainSection}>
        {/* Form */}
        <div style={styles.formSide}>
          <h2 style={styles.formTitle}>Get In Touch/Feedback</h2>
          <p style={styles.formDesc}>Fill out the form and our team will get back to you within 24 hours.</p>
          {success && <div style={styles.successMsg}>✅ Message sent! We'll get back to you within 24 hours.</div>}
          {error && <div style={styles.errorMsg}>{error}</div>}
          <form onSubmit={handleSubmit}>
            <div style={styles.row2}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>First name</label>
                <input style={styles.input} name="firstName" placeholder="Enter your first name" value={formData.firstName} onChange={handleChange} required />
              </div>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Last name</label>
                <input style={styles.input} name="lastName" placeholder="Enter your last name" value={formData.lastName} onChange={handleChange} required />
              </div>
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Email</label>
              <input style={styles.input} name="email" type="email" placeholder="Enter your email" value={formData.email} onChange={handleChange} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Phone</label>
              <input style={styles.input} name="phone" placeholder="Enter your phone number" value={formData.phone} onChange={handleChange} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Subject</label>
              <input style={styles.input} name="subject" placeholder="Enter the subject" value={formData.subject} onChange={handleChange} required />
            </div>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Message</label>
              <textarea style={styles.textarea} name="message" placeholder="Enter your message" value={formData.message} onChange={handleChange} rows={5} required />
            </div>
            <button style={styles.submitBtn} type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"}</button>
          </form>
        </div>

        {/* Info */}
        <div style={styles.infoSide}>
          <h2 style={styles.infoTitle}>Contact Information</h2>
          <p style={styles.infoDesc}>Visit us at our location or reach out through any of the channels below.</p>

          {/* Phone */}
          <div style={styles.infoCard}>
            <div style={styles.infoIconCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
            </div>
            <div style={styles.infoTextBox}>
              <h4 style={styles.infoCardTitle}>Phone</h4>
              <p style={styles.infoCardText}>Main: +971 (0) 4379 3562</p>
              <p style={styles.infoCardText}>Emergency: +971 (0) 4379 3562</p>
            </div>
          </div>

          {/* Email */}
          <div style={styles.infoCard}>
            <div style={styles.infoIconCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
            </div>
            <div style={styles.infoTextBox}>
              <h4 style={styles.infoCardTitle}>Email</h4>
              <p style={styles.infoCardText}>General: smart@smcare.ae</p>
              <p style={styles.infoCardText}>Appointments: smart@smcare.ae</p>
            </div>
          </div>

          {/* Working Hours */}
          <div style={styles.infoCard}>
            <div style={styles.infoIconCircle}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </svg>
            </div>
            <div style={styles.infoTextBox}>
              <h4 style={styles.infoCardTitle}>Working Hours</h4>
              <p style={styles.infoCardText}>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p style={styles.infoCardText}>Saturday: 9:00 AM - 5:00 PM</p>
              <p style={styles.infoCardText}>Sunday: Closed</p>
            </div>
          </div>

          <h4 style={styles.followTitle}>Follow Us</h4>
          <div style={styles.socialRow}>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1877f2"; e.currentTarget.children[0].setAttribute("fill", "white"); }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#eef6fb"; e.currentTarget.children[0].setAttribute("fill", "#2193b0"); }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2193b0">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e1306c"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#eef6fb"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="#2193b0" stroke="none" />
              </svg>
            </a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" style={styles.socialIcon}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0077b5"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#eef6fb"}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#2193b0">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" fill="#2193b0" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      {/* Map */}
      <div style={styles.mapSection}>
        <h2 style={styles.mapTitle}>Find Us</h2>
        <p style={styles.mapDesc}>Conveniently located in Dubai Healthcare City</p>
        <iframe title="map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.1763392!2d55.3265!3d25.2697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f5d3b7e3a4a3d%3A0x5e8e4b3a5b7e4a3d!2sDoha%20Centre!5e0!3m2!1sen!2sae!4v1234567890"
          width="100%" height="450"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen loading="lazy" />
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  hero: { position: "relative", height: "380px", overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center" },
  heroCard: { backgroundColor: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "16px", padding: "30px 50px", textAlign: "center" },
  heroTitle: { fontSize: "42px", fontWeight: "800", color: "#e05c5c", margin: 0, fontFamily: "'Poppins', sans-serif" },
  heroDesc: { fontSize: "16px", color: "rgba(255,255,255,0.9)", marginTop: "10px", maxWidth: "500px", fontFamily: "'Poppins', sans-serif" },
  mainSection: { display: "flex", gap: "60px", padding: "60px 60px", backgroundColor: "#fff", alignItems: "flex-start" },
  formSide: { flex: 1 },
  formTitle: { fontSize: "28px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  formDesc: { fontSize: "14px", color: "#888", marginBottom: "28px", fontFamily: "'Poppins', sans-serif" },
  successMsg: { backgroundColor: "#d4edda", color: "#155724", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  errorMsg: { backgroundColor: "#fde8e8", color: "#c0392b", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  row2: { display: "flex", gap: "16px" },
  inputGroup: { marginBottom: "18px", flex: 1 },
  label: { display: "block", fontSize: "13px", fontWeight: "500", color: "#555", marginBottom: "6px", fontFamily: "'Poppins', sans-serif" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif", color: "#333" },
  textarea: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif", color: "#333", resize: "vertical" },
  submitBtn: { width: "100%", padding: "14px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  infoSide: { width: "420px" },
  infoTitle: { fontSize: "28px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  infoDesc: { fontSize: "14px", color: "#888", marginBottom: "24px", fontFamily: "'Poppins', sans-serif" },

  // Info card — icon bilkul text ke saath inline
  infoCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "14px",
    backgroundColor: "#f8fafc",
    borderRadius: "12px",
    padding: "16px 18px",
    marginBottom: "14px",
    border: "1px solid #eee",
  },
  infoIconCircle: {
    width: "36px",
    height: "36px",
    backgroundColor: "#fff",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 6px rgba(0,0,0,0.08)",
    flexShrink: 0,
    marginTop: "2px",
  },
  infoTextBox: { flex: 1 },
  infoCardTitle: { fontSize: "14px", fontWeight: "700", color: "#1a1a2e", marginBottom: "4px", margin: "0 0 4px 0", fontFamily: "'Poppins', sans-serif" },
  infoCardText: { fontSize: "13px", color: "#666", margin: "2px 0", fontFamily: "'Poppins', sans-serif" },
  followTitle: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginTop: "20px", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  socialRow: { display: "flex", gap: "12px" },
  socialIcon: { width: "42px", height: "42px", backgroundColor: "#eef6fb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", textDecoration: "none", transition: "background-color 0.2s" },
  mapSection: { padding: "60px", backgroundColor: "#f8fafc" },
  mapTitle: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e", textAlign: "center", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  mapDesc: { fontSize: "15px", color: "#666", textAlign: "center", marginBottom: "32px", fontFamily: "'Poppins', sans-serif" },
};