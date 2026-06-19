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
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
      </svg>
    ),
    title: "Patient-Centric Excellence",
    desc: "Consistently high satisfaction ratings through compassionate, personalised care.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
        <path d="M9 9l2 2 4-4" />
      </svg>
    ),
    title: "AI-Powered Healthcare",
    desc: "Harnessing Artificial Intelligence for operational efficiency, faster consultation, diagnostics, personalised treatment, and improved outcomes.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="9" height="9" rx="1" />
        <rect x="13" y="2" width="9" height="9" rx="1" />
        <rect x="2" y="13" width="9" height="9" rx="1" />
        <rect x="13" y="13" width="9" height="9" rx="1" />
      </svg>
    ),
    title: "State-of-the-Art",
    desc: "Modern facilities with the latest medical technology",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    ),
    title: "International Team",
    desc: "Doctors trained at prestigious institutions worldwide",
  },
];

export default function AboutPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={styles.hero}>
        <img src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1400&q=80"
          alt="clinic" style={styles.heroImg} />
        <div style={styles.heroOverlay}>
          <div style={styles.heroCard}>
            <h1 style={styles.heroTitle}>
              <span style={{ color: "#2193b0" }}>Smart</span>{" "}
              <span style={{ color: "#e05c5c" }}>Care</span>{" "}
              <span style={{ color: "#1a1a2e" }}>Polyclinic</span>
            </h1>
            <p style={styles.heroDesc}>Providing exceptional healthcare services in Dubai.</p>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div style={styles.storySection}>
        <div style={styles.storyLeft}>
          <span style={styles.badge}>Our Story</span>
          <h2 style={styles.storyTitle}>Leading Healthcare in Dubai</h2>
          <p style={styles.storyText}>
            Smart Care Polyclinic is a new-generation medical center in Dubai that combines clinical excellence with the power of Artificial Intelligence to transform the healthcare experience. From AI-assisted diagnostics to personalized treatment pathways, we use intelligent technology to deliver faster, more accurate, and more connected care—setting a new benchmark for quality and innovation in the UAE.
          </p>
          <p style={styles.storyText}>
            Smart Care Polyclinic stands as a trusted name in modern healthcare—driven by innovation, guided by compassion, and committed to ethical, transparent, and high-impact medical care. We are proud to serve the UAE's vibrant community with a model of healthcare that's smarter, kinder, and more effective.
          </p>
        </div>
        <div style={styles.storyRight}>
          <div style={styles.imgGrid}>
            <img src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80" alt="clinic" style={styles.gridImg1} />
            <img src="https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&q=80" alt="clinic" style={styles.gridImg2} />
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div style={styles.missionSection}>
        <h2 style={styles.centerTitle}>Our Mission & Values</h2>
        <p style={styles.centerDesc}>Guided by our commitment to excellence and compassionate care</p>
        <div style={styles.missionGrid}>

          {/* Mission */}
          <div style={styles.missionCard}>
            <div style={styles.missionIconRow}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              <h3 style={styles.missionCardTitle}>Our Mission</h3>
            </div>
            <p style={styles.missionCardDesc}>
              To deliver clinical excellence through a smart, multi-specialty polyclinic that blends AI-driven diagnostics, personalised care, and evidence-based care, ensuring faster, more accurate, and compassionate healthcare for the UAE community.
            </p>
          </div>

          {/* Vision */}
          <div style={styles.missionCard}>
            <div style={styles.missionIconRow}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="6" />
                <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
              </svg>
              <h3 style={styles.missionCardTitle}>Our Vision</h3>
            </div>
            <p style={styles.missionCardDesc}>
              To lead the future of healthcare in the UAE through a network of smart, patient-first clinics, uniting advanced technology such as AI and compassionate care to enhance health, longevity, and quality of life.
            </p>
          </div>

          {/* Values */}
          <div style={styles.missionCard}>
            <div style={styles.missionIconRow}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              <h3 style={styles.missionCardTitle}>Our Values</h3>
            </div>
            <div style={{ marginTop: "8px" }}>
              {values.map((v, i) => (
                <div key={i} style={styles.valueItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 8 12 12 14 14" />
                  </svg>
                  <span style={styles.valueText}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements */}
      <div style={styles.achieveSection}>
        <h2 style={styles.centerTitle}>Our Achievements</h2>
        <p style={styles.centerDesc}>Recognized for excellence in healthcare services</p>
        <div style={styles.achieveGrid}>
          {achievements.map((item, i) => (
            <div key={i} style={styles.achieveCard}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
            >
              <div style={styles.achieveIconBox}>{item.icon}</div>
              <h3 style={styles.achieveTitle}>{item.title}</h3>
              <p style={styles.achieveDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Experience the Smart Care Difference</h2>
        <p style={styles.ctaDesc}>Join thousands of satisfied patients who trust us with their healthcare needs</p>
        <div style={styles.ctaBtns}>
          <button style={styles.ctaBtn1} onClick={() => navigate("/book-appointment")}>
            Book an Appointment
          </button>
          <button style={styles.ctaBtn2} onClick={() => navigate("/contact")}>
            Contact Us
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  hero: { position: "relative", height: "400px", overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover" },
  heroOverlay: { position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center" },
  heroCard: { backgroundColor: "rgba(255,255,255,0.15)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)", borderRadius: "16px", padding: "30px 50px", textAlign: "center" },
  heroTitle: { fontSize: "42px", fontWeight: "800", margin: 0, fontFamily: "'Poppins', sans-serif" },
  heroDesc: { fontSize: "16px", color: "rgba(255,255,255,0.9)", marginTop: "10px", fontFamily: "'Poppins', sans-serif" },
  badge: { display: "inline-block", backgroundColor: "#2193b0", color: "#fff", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  storySection: { display: "flex", gap: "60px", padding: "80px 60px", alignItems: "center", backgroundColor: "#fff" },
  storyLeft: { flex: 1 },
  storyTitle: { fontSize: "36px", fontWeight: "800", color: "#1a1a2e", margin: "0 0 20px 0", fontFamily: "'Poppins', sans-serif" },
  storyText: { fontSize: "15px", color: "#555", lineHeight: 1.8, marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  storyRight: { flex: 1 },
  imgGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  gridImg1: { width: "100%", height: "220px", objectFit: "cover", borderRadius: "12px" },
  gridImg2: { width: "100%", height: "220px", objectFit: "cover", borderRadius: "12px", marginTop: "24px" },
  missionSection: { padding: "80px 60px", backgroundColor: "#f8fafc" },
  centerTitle: { fontSize: "36px", fontWeight: "800", color: "#1a1a2e", textAlign: "center", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  centerDesc: { fontSize: "15px", color: "#666", textAlign: "center", marginBottom: "48px", fontFamily: "'Poppins', sans-serif" },
  missionGrid: { display: "flex", gap: "24px", flexWrap: "wrap" },
  missionCard: { flex: 1, minWidth: "280px", backgroundColor: "#fff", borderRadius: "16px", padding: "30px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" },
  missionIconRow: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" },
  missionCardTitle: { fontSize: "18px", fontWeight: "700", color: "#1a1a2e", margin: 0, fontFamily: "'Poppins', sans-serif" },
  missionCardDesc: { fontSize: "14px", color: "#555", lineHeight: 1.8, fontFamily: "'Poppins', sans-serif" },
  valueItem: { display: "flex", gap: "8px", marginBottom: "10px", alignItems: "flex-start" },
  valueText: { fontSize: "13px", color: "#555", lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" },
  achieveSection: { padding: "80px 60px", backgroundColor: "#fff" },
  achieveGrid: { display: "flex", gap: "24px", flexWrap: "wrap" },
  achieveCard: { flex: 1, minWidth: "220px", border: "1px solid #eee", borderRadius: "16px", padding: "30px", textAlign: "center", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
  achieveIconBox: { display: "flex", justifyContent: "center", marginBottom: "16px" },
  achieveTitle: { fontSize: "16px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  achieveDesc: { fontSize: "13px", color: "#666", lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" },
  ctaSection: { backgroundColor: "#2193b0", padding: "80px 60px", textAlign: "center" },
  ctaTitle: { fontSize: "36px", fontWeight: "800", color: "#fff", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  ctaDesc: { fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "32px", fontFamily: "'Poppins', sans-serif" },
  ctaBtns: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" },
  ctaBtn1: { padding: "14px 32px", backgroundColor: "#fff", color: "#2193b0", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  ctaBtn2: { padding: "14px 32px", backgroundColor: "transparent", color: "#fff", border: "2px solid #fff", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
};