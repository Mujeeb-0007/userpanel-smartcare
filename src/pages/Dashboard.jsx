import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../context/AuthContext";

const features = [
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a5 5 0 1 0 5 5A5 5 0 0 0 12 2zm0 8a3 3 0 1 1 3-3 3 3 0 0 1-3 3zm9 11v-1a7 7 0 0 0-7-7H10a7 7 0 0 0-7 7v1" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "AI in Care",
    desc: "Clinically proven AI-driven tools for faster, more accurate diagnoses and outcomes that patients trust.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Expert Team",
    desc: "Our doctors work hand-in-hand with advanced digital platforms, ensuring you receive the highest standard of care.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Smart and Timely Services",
    desc: "Smart appointment scheduling and virtual triage minimize waiting times and get you to the right care — fast.",
  },
  {
    icon: (
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Tech-Enabled and Patience Centered",
    desc: "From telemedicine to in-home visits, we use intelligent health systems to bring care to you, tailored to your needs and lifestyle.",
  },
];

export default function Dashboard() {
  const { userData } = useAuth();
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>
          <h2 style={styles.title}>Welcome, {userData?.name || "User"}! 👋</h2>
          <p style={styles.subtitle}>Manage your health information and appointments</p>

          {/* Action Cards */}
          <div style={styles.cardsGrid}>
            {[
              { icon: "📅", title: "My Appointments", desc: "View and manage your upcoming appointments", btn: "View Appointments", path: "/book-appointment", color: "#2193b0" },
              { icon: "👤", title: "My Profile", desc: "Update your personal information", btn: "Edit Profile", path: "/profile", color: "#2193b0" },
              { icon: "🏥", title: "Book Appointment", desc: "Schedule a new appointment with our specialists", btn: "Book Now", path: "/book-appointment", color: "#27ae60" },
              { icon: "📞", title: "Contact Us", desc: "Get in touch with our support team", btn: "Contact", path: "/contact", color: "#2193b0" },
            ].map((card, i) => (
              <div key={i} style={styles.card}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; }}
              >
                <div style={styles.cardIcon}>{card.icon}</div>
                <h3 style={styles.cardTitle}>{card.title}</h3>
                <p style={styles.cardDesc}>{card.desc}</p>
                <button
                  style={{ ...styles.cardBtn, backgroundColor: card.color }}
                  onClick={() => navigate(card.path)}
                >
                  {card.btn}
                </button>
              </div>
            ))}
          </div>

          {/* Why Choose Section */}
          <div style={styles.whySection}>
            <h3 style={styles.whyTitle}>Why Smart Care?</h3>
            <div style={styles.featuresRow}>
              {features.map((f, i) => (
                <div key={i} style={styles.featureCard}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2193b0"; e.currentTarget.style.transform = "translateY(-4px)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  <div style={styles.featureIcon}>{f.icon}</div>
                  <h4 style={styles.featureTitle}>{f.title}</h4>
                  <p style={styles.featureDesc}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* User Info */}
          <div style={styles.infoBox}>
            <h3 style={styles.infoTitle}>Account Information</h3>
            <div style={styles.infoGrid}>
              {[
                { label: "Name", value: userData?.fullName || userData?.name || "—" },
                { label: "Email", value: userData?.email || "—" },
                { label: "Gender", value: userData?.gender || "—" },
                { label: "ID Type", value: userData?.idType || "—" },
                { label: "Member Since", value: userData?.date || "—" },
              ].map((item, i) => (
                <div key={i} style={styles.infoItem}>
                  <span style={styles.infoLabel}>{item.label}</span>
                  <span style={styles.infoValue}>{item.value}</span>
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

const styles = {
  page: { backgroundColor: "#f5f6fa", minHeight: "calc(100vh - 70px)", padding: "40px 0" },
  container: { maxWidth: "1100px", margin: "0 auto", padding: "0 30px" },
  title: { fontSize: "26px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  subtitle: { fontSize: "15px", color: "#888", marginBottom: "36px", fontFamily: "'Poppins', sans-serif" },
  cardsGrid: { display: "flex", gap: "20px", flexWrap: "wrap", marginBottom: "40px" },
  card: { flex: 1, minWidth: "220px", backgroundColor: "#fff", borderRadius: "12px", padding: "24px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", textAlign: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
  cardIcon: { fontSize: "36px", marginBottom: "12px" },
  cardTitle: { fontSize: "16px", fontWeight: "600", color: "#1a1a2e", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  cardDesc: { fontSize: "13px", color: "#888", marginBottom: "16px", lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" },
  cardBtn: { padding: "10px 20px", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  whySection: { marginBottom: "36px" },
  whyTitle: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  featuresRow: { display: "flex", gap: "16px", flexWrap: "wrap" },
  featureCard: { flex: 1, minWidth: "200px", backgroundColor: "#fff", borderRadius: "12px", padding: "24px", textAlign: "center", border: "1px solid #eee", transition: "border-color 0.2s, transform 0.2s" },
  featureIcon: { display: "flex", justifyContent: "center", marginBottom: "14px" },
  featureTitle: { fontSize: "14px", fontWeight: "600", color: "#1a1a2e", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  featureDesc: { fontSize: "12px", color: "#888", lineHeight: 1.6, fontFamily: "'Poppins', sans-serif" },
  infoBox: { backgroundColor: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 2px 8px rgba(0,0,0,0.06)" },
  infoTitle: { fontSize: "17px", fontWeight: "600", color: "#1a1a2e", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  infoGrid: { display: "flex", flexWrap: "wrap", gap: "16px" },
  infoItem: { flex: 1, minWidth: "180px", backgroundColor: "#f8fafc", borderRadius: "8px", padding: "14px" },
  infoLabel: { display: "block", fontSize: "11px", color: "#aaa", fontWeight: "600", marginBottom: "4px", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" },
  infoValue: { fontSize: "14px", color: "#333", fontWeight: "500", fontFamily: "'Poppins', sans-serif" },
};