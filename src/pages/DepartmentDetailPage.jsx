import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function DepartmentDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dept, setDept] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDept = async () => {
      try {
        const docSnap = await getDoc(doc(db, "departments", id));
        if (docSnap.exists()) {
          setDept({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDept();
  }, [id]);

  if (loading) return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={styles.loadingBox}>Loading...</div>
      <Footer />
    </div>
  );

  if (!dept) return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={styles.loadingBox}>Department not found.</div>
      <Footer />
    </div>
  );

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={styles.hero}>
        {dept.coverUrl ? (
          <img src={dept.coverUrl} alt={dept.name} style={styles.heroImg} />
        ) : (
          <div style={styles.heroPlaceholder} />
        )}
        <div style={styles.heroOverlay}>
          <button style={styles.backBtn} onClick={() => navigate("/departments")}>
            ← Back to Departments
          </button>
          <h1 style={styles.heroTitle}>{dept.name}</h1>
          {dept.shortDescription && (
            <p style={styles.heroDesc}>{dept.shortDescription}</p>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div style={styles.mainSection}>

        {/* Left */}
        <div style={styles.leftSide}>

          {/* About */}
          {dept.description && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>About {dept.name}</h2>
              <p style={styles.sectionText}>{dept.description}</p>
            </div>
          )}

          {/* Why Choose Us */}
          {dept.whyChooseUs && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Why Choose Us</h2>
              <p style={styles.sectionText}>{dept.whyChooseUs}</p>
            </div>
          )}

          {/* FAQs */}
          {dept.faqs && dept.faqs.length > 0 && (
            <div style={styles.section}>
              <h2 style={styles.sectionTitle}>Frequently Asked Questions</h2>
              {dept.faqs.map((faq, i) => (
                <FaqItem key={i} faq={faq} />
              ))}
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div style={styles.rightSide}>
          <div style={styles.infoCard}>
            <h3 style={styles.infoCardTitle}>Department Info</h3>

            {dept.fee && (
              <div style={styles.infoRow}>
                <span style={styles.infoLabel}>Consultation Fee</span>
                <span style={styles.infoValue}>{dept.fee}</span>
              </div>
            )}
            <div style={styles.infoRow}>
              <span style={styles.infoLabel}>Status</span>
              <span style={styles.statusBadge}>{dept.status || "Active"}</span>
            </div>

            <button style={styles.bookBtn} onClick={() => navigate("/login")}>
              Book Appointment
            </button>
            <button style={styles.contactBtn} onClick={() => navigate("/contact")}>
              Contact Us
            </button>
          </div>

          {/* Cover Image */}
          {dept.coverUrl && (
            <div style={styles.coverCard}>
              <img src={dept.coverUrl} alt={dept.name} style={styles.coverImg} />
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Book an Appointment?</h2>
        <p style={styles.ctaDesc}>Schedule a visit with our {dept.name} specialists today</p>
        <button style={styles.ctaBtn} onClick={() => navigate("/login")}>Book Now</button>
      </div>

      <Footer />
    </div>
  );
}

function FaqItem({ faq }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={faqStyles.item}>
      <div style={faqStyles.question} onClick={() => setOpen(!open)}>
        <span>{faq.question}</span>
        <span style={{ fontSize: "18px", color: "#2193b0" }}>{open ? "−" : "+"}</span>
      </div>
      {open && <p style={faqStyles.answer}>{faq.answer}</p>}
    </div>
  );
}

const faqStyles = {
  item: { borderBottom: "1px solid #eee", marginBottom: "4px" },
  question: { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 0", cursor: "pointer", fontSize: "15px", fontWeight: "500", color: "#1a1a2e", fontFamily: "'Poppins', sans-serif" },
  answer: { fontSize: "14px", color: "#666", lineHeight: 1.7, paddingBottom: "14px", fontFamily: "'Poppins', sans-serif" },
};

const styles = {
  loadingBox: { minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", color: "#888", fontFamily: "'Poppins', sans-serif" },
  hero: { position: "relative", height: "380px", overflow: "hidden" },
  heroImg: { width: "100%", height: "100%", objectFit: "cover" },
  heroPlaceholder: { width: "100%", height: "100%", background: "linear-gradient(135deg, #2193b0, #6dd5ed)" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.3))", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px 60px" },
  backBtn: { display: "inline-block", marginBottom: "16px", backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "8px", padding: "8px 16px", fontSize: "13px", cursor: "pointer", fontFamily: "'Poppins', sans-serif", backdropFilter: "blur(4px)", width: "fit-content" },
  heroTitle: { fontSize: "42px", fontWeight: "800", color: "#fff", margin: "0 0 12px 0", fontFamily: "'Poppins', sans-serif" },
  heroDesc: { fontSize: "16px", color: "rgba(255,255,255,0.85)", maxWidth: "600px", fontFamily: "'Poppins', sans-serif" },
  mainSection: { display: "flex", gap: "40px", padding: "60px 60px", backgroundColor: "#fff", alignItems: "flex-start" },
  leftSide: { flex: 1 },
  rightSide: { width: "320px" },
  section: { marginBottom: "40px" },
  sectionTitle: { fontSize: "24px", fontWeight: "700", color: "#1a1a2e", marginBottom: "16px", fontFamily: "'Poppins', sans-serif", borderBottom: "2px solid #eef6fb", paddingBottom: "10px" },
  sectionText: { fontSize: "15px", color: "#555", lineHeight: 1.8, fontFamily: "'Poppins', sans-serif" },
  infoCard: { backgroundColor: "#f8fafc", borderRadius: "16px", padding: "24px", border: "1px solid #eee", marginBottom: "20px" },
  infoCardTitle: { fontSize: "17px", fontWeight: "700", color: "#1a1a2e", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  infoRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px", paddingBottom: "14px", borderBottom: "1px solid #eee" },
  infoLabel: { fontSize: "13px", color: "#888", fontFamily: "'Poppins', sans-serif" },
  infoValue: { fontSize: "14px", fontWeight: "600", color: "#1a1a2e", fontFamily: "'Poppins', sans-serif" },
  statusBadge: { backgroundColor: "#d4edda", color: "#155724", padding: "4px 12px", borderRadius: "20px", fontSize: "12px", fontFamily: "'Poppins', sans-serif" },
  bookBtn: { width: "100%", padding: "13px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif", marginBottom: "10px", marginTop: "8px" },
  contactBtn: { width: "100%", padding: "13px", backgroundColor: "transparent", color: "#2193b0", border: "2px solid #2193b0", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  coverCard: { borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
  coverImg: { width: "100%", height: "200px", objectFit: "cover" },
  ctaSection: { backgroundColor: "#2193b0", padding: "60px", textAlign: "center" },
  ctaTitle: { fontSize: "32px", fontWeight: "800", color: "#fff", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  ctaDesc: { fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontFamily: "'Poppins', sans-serif" },
  ctaBtn: { padding: "14px 40px", backgroundColor: "#fff", color: "#2193b0", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
};