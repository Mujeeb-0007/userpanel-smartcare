import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import { db } from "../firebase";

export default function Footer() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const q = query(
          collection(db, "departments"),
          orderBy("created_at", "desc"),
          limit(4)
        );
        const snap = await getDocs(q);
        setDepartments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepts();
  }, []);

  return (
    <footer style={styles.footer}>
      <div style={styles.container}>

        {/* Col 1 — Brand */}
        <div style={styles.col}>
          <div style={styles.brandRow}>
            <div style={styles.logoIcon}>
              <span style={{ color: "#e05c5c", fontSize: "16px", fontWeight: "bold" }}>✚</span>
            </div>
            <h3 style={styles.brandName}>Smart Care Polyclinic</h3>
          </div>

          <p style={styles.brandDesc}>
            Providing quality healthcare services with compassion and expertise.
          </p>

          {/* ✅ FIXED Social Icons */}
          <div style={styles.socialRow}>

            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#1877f2"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#0077b5"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                <circle cx="4" cy="4" r="2" fill="white" />
              </svg>
            </a>

            <a
              href="https://www.instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              style={styles.socialIcon}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#e1306c"}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "rgba(255,255,255,0.1)"}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none" />
              </svg>
            </a>

          </div>
        </div>

        {/* Col 2 — Quick Links */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Quick Links</h4>
          {[
            { label: "Home", path: "/" },
            { label: "Departments", path: "/departments" },
            { label: "Packages", path: "/packages" },
            { label: "Book Appointment", path: "/book-appointment" },
            { label: "Contact", path: "/contact" },
            { label: "About Us", path: "/about" },
          ].map((link) => (
            <p
              key={link.label}
              style={styles.footerLink}
              onClick={() => navigate(link.path)}
            >
              {link.label}
            </p>
          ))}
        </div>

        {/* Col 3 — Departments */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Departments</h4>

          {departments.map((dept) => (
            <p
              key={dept.id}
              style={styles.footerLink}
              onClick={() => navigate(`/departments/${dept.id}`)}
            >
              {dept.name}
            </p>
          ))}
        </div>

        {/* Col 4 — Contact */}
        <div style={styles.col}>
          <h4 style={styles.colTitle}>Contact</h4>
          <p style={styles.contactText}>📞 +971 (0) 4379 3562</p>
          <p style={styles.contactText}>✉️ smart@smcare.ae</p>
          <p style={styles.contactText}>📍 Dubai, UAE</p>
        </div>

      </div>

      {/* Bottom */}
      <div style={styles.bottomBar}>
        <p style={styles.bottomText}>
          © 2025 Smartcare Polyclinic. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

const styles = {
  footer: { background: "#0f1923", color: "#fff", padding: "40px" },
  container: { display: "flex", gap: "30px", flexWrap: "wrap" },
  col: { flex: 1, minWidth: "200px" },
  socialRow: { display: "flex", gap: "10px" },
  socialIcon: {
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "rgba(255,255,255,0.1)",
    borderRadius: "50%",
  },
  footerLink: { cursor: "pointer", color: "#aaa" },
  contactText: { color: "#aaa", fontSize: "13px" },
  bottomBar: { marginTop: "20px", borderTop: "1px solid #333", paddingTop: "10px" },
  bottomText: { fontSize: "12px", color: "#666" },
};