import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";

export default function DepartmentsPage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const q = query(collection(db, "departments"), orderBy("created_at", "desc"));
        const snap = await getDocs(q);
        setDepartments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDepts();
  }, []);

  const filtered = departments.filter(d =>
    d.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={styles.hero}>
        <div style={styles.heroOverlay}>
          <h1 style={styles.heroTitle}>Our Departments</h1>
          <p style={styles.heroDesc}>Specialized care across multiple medical disciplines</p>
        </div>
      </div>

      {/* Search */}
      <div style={styles.searchSection}>
        <div style={styles.searchBox}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input style={styles.searchInput} placeholder="Search departments..."
            value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
      </div>

      {/* Grid */}
      <div style={styles.section}>
        <div style={styles.badgeWrap}>
          <span style={styles.badge}>Clinical Specialities</span>
        </div>
        <h2 style={styles.sectionTitle}>All Departments</h2>
        <p style={styles.sectionDesc}>Specialized care with cutting-edge technology</p>

        {loading ? (
          <div style={styles.centerText}>Loading departments...</div>
        ) : filtered.length === 0 ? (
          <div style={styles.centerText}>No departments found.</div>
        ) : (
          <div style={styles.grid}>
            {filtered.map((dept) => (
              <div key={dept.id} style={styles.card}
                onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-8px)"; e.currentTarget.style.boxShadow = "0 16px 40px rgba(0,0,0,0.12)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"; }}
              >
                {dept.coverUrl ? (
                  <img src={dept.coverUrl} alt={dept.name} style={styles.cardImg} />
                ) : (
                  <div style={styles.cardImgPlaceholder}>
                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                      <polyline points="9 22 9 12 15 12 15 22" />
                    </svg>
                  </div>
                )}
                <div style={styles.cardBody}>
                  <h3 style={styles.cardTitle}>{dept.name}</h3>
                  <p style={styles.cardDesc}>{dept.shortDescription || dept.desc || "Specialized healthcare services."}</p>
                  {dept.fee && dept.fee !== "N/A" && (
                    <div style={styles.feeRow}>
                      <span style={styles.feeLabel}>Fee:</span>
                      <span style={styles.feeValue}>{dept.fee}</span>
                    </div>
                  )}
                  <div style={styles.cardBtns}>
                    <button style={styles.learnBtn} onClick={() => navigate("/departments/" + dept.id)}>
                      Learn More →
                    </button>
                    <button style={styles.bookBtn} onClick={() => navigate("/book-appointment")}>
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Book an Appointment?</h2>
        <p style={styles.ctaDesc}>Schedule a visit with our specialists today</p>
        <button style={styles.ctaBtn} onClick={() => navigate("/book-appointment")}>Book Now</button>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  hero: { height: "300px", position: "relative", backgroundImage: "url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80)", backgroundSize: "cover", backgroundPosition: "center" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(135deg, rgba(33,147,176,0.85), rgba(0,0,0,0.5))", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" },
  heroTitle: { fontSize: "42px", fontWeight: "800", color: "#fff", margin: 0, fontFamily: "'Poppins', sans-serif" },
  heroDesc: { fontSize: "16px", color: "rgba(255,255,255,0.85)", marginTop: "12px", fontFamily: "'Poppins', sans-serif" },
  searchSection: { backgroundColor: "#f8fafc", padding: "30px 60px", display: "flex", justifyContent: "center" },
  searchBox: { display: "flex", alignItems: "center", backgroundColor: "#fff", borderRadius: "50px", padding: "12px 24px", boxShadow: "0 2px 12px rgba(0,0,0,0.08)", width: "100%", maxWidth: "500px", gap: "10px" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "15px", fontFamily: "'Poppins', sans-serif", color: "#333", backgroundColor: "transparent" },
  section: { padding: "60px 60px", backgroundColor: "#fff" },
  badgeWrap: { marginBottom: "16px" },
  badge: { display: "inline-block", backgroundColor: "#e8f4fb", color: "#2193b0", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", fontFamily: "'Poppins', sans-serif" },
  sectionTitle: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 12px 0", fontFamily: "'Poppins', sans-serif" },
  sectionDesc: { fontSize: "15px", color: "#666", marginBottom: "40px", fontFamily: "'Poppins', sans-serif" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "24px" },
  card: { backgroundColor: "#fff", borderRadius: "16px", overflow: "hidden", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
  cardImg: { width: "100%", height: "200px", objectFit: "cover" },
  cardImgPlaceholder: { width: "100%", height: "200px", backgroundColor: "#eef6fb", display: "flex", alignItems: "center", justifyContent: "center" },
  cardBody: { padding: "20px" },
  cardTitle: { fontSize: "18px", fontWeight: "600", color: "#1a1a2e", marginBottom: "10px", fontFamily: "'Poppins', sans-serif" },
  cardDesc: { fontSize: "14px", color: "#666", lineHeight: 1.7, marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  feeRow: { display: "flex", gap: "8px", alignItems: "center", marginBottom: "16px" },
  feeLabel: { fontSize: "13px", fontWeight: "600", color: "#888", fontFamily: "'Poppins', sans-serif" },
  feeValue: { fontSize: "13px", color: "#2193b0", fontWeight: "600", fontFamily: "'Poppins', sans-serif" },
  cardBtns: { display: "flex", gap: "10px" },
  learnBtn: { flex: 1, padding: "10px", backgroundColor: "#eef6fb", color: "#2193b0", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  bookBtn: { flex: 1, padding: "10px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "13px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  centerText: { textAlign: "center", padding: "60px", color: "#888", fontSize: "16px", fontFamily: "'Poppins', sans-serif" },
  ctaSection: { backgroundColor: "#2193b0", padding: "60px", textAlign: "center" },
  ctaTitle: { fontSize: "32px", fontWeight: "700", color: "#fff", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  ctaDesc: { fontSize: "16px", color: "rgba(255,255,255,0.85)", marginBottom: "28px", fontFamily: "'Poppins', sans-serif" },
  ctaBtn: { padding: "14px 36px", backgroundColor: "#fff", color: "#2193b0", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "700", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
};