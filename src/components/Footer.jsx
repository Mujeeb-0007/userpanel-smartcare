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
      } catch (err) { console.error(err); }
    };
    fetchDepts();
  }, []);

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        .ft {
          background: #0f1923;
          color: #fff;
          padding: 48px 60px 0;
          width: 100%;
          overflow: hidden;
        }
        .ft-container {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr 1.5fr;
          gap: 36px;
          max-width: 1200px;
          margin: 0 auto;
        }
        .ft-brand-row {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 14px;
        }
        .ft-logo-icon {
          width: 36px;
          height: 36px;
          border: 2px solid #e05c5c;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .ft-brand-name {
          font-size: 14px;
          font-weight: 700;
          color: #fff;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          line-height: 1.3;
        }
        .ft-brand-desc {
          color: #aaa;
          font-size: 13px;
          line-height: 1.7;
          margin: 0 0 18px;
          font-family: 'Poppins', sans-serif;
        }
        .ft-social-row { display: flex; gap: 10px; }
        .ft-social-icon {
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,0.1);
          border-radius: 50%;
          transition: background 0.2s;
          text-decoration: none;
          flex-shrink: 0;
        }
        .ft-col-title {
          font-size: 13px;
          font-weight: 700;
          color: #fff;
          margin: 0 0 16px;
          font-family: 'Poppins', sans-serif;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        .ft-link {
          color: #aaa;
          font-size: 13px;
          cursor: pointer;
          margin: 0 0 10px;
          transition: color 0.2s;
          display: block;
          font-family: 'Poppins', sans-serif;
        }
        .ft-link:hover { color: #2193b0; }
        .ft-contact-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 10px;
        }
        .ft-contact-text {
          color: #aaa;
          font-size: 13px;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          line-height: 1.5;
          word-break: break-word;
        }
        .ft-bottom {
          margin-top: 36px;
          border-top: 1px solid #1e2d3a;
          padding: 18px 0;
          max-width: 1200px;
          margin-left: auto;
          margin-right: auto;
          display: flex;
          justify-content: center;
        }
        .ft-bottom-text {
          font-size: 12px;
          color: #555;
          margin: 0;
          font-family: 'Poppins', sans-serif;
          text-align: center;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .ft { padding: 40px 32px 0; }
          .ft-container {
            grid-template-columns: 1fr 1fr;
            gap: 28px;
          }
        }

        /* Mobile */
        @media (max-width: 600px) {
          .ft { padding: 32px 20px 0; }
          .ft-container {
            grid-template-columns: 1fr 1fr;
            gap: 24px 16px;
          }
          .ft-brand-col {
            grid-column: 1 / -1;
          }
          .ft-col-title { font-size: 12px; letter-spacing: 0.5px; }
          .ft-link { font-size: 12px; margin-bottom: 8px; }
          .ft-contact-text { font-size: 12px; }
          .ft-brand-desc { font-size: 12px; }
          .ft-brand-name { font-size: 13px; }
          .ft-bottom { padding: 14px 0; margin-top: 24px; }
          .ft-bottom-text { font-size: 11px; }
        }

        @media (max-width: 380px) {
          .ft-container {
            grid-template-columns: 1fr;
          }
          .ft-brand-col { grid-column: 1; }
        }
      `}</style>

      <footer className="ft">
        <div className="ft-container">

          {/* Col 1 — Brand */}
          <div className="ft-brand-col">
            <div className="ft-brand-row">
              <div className="ft-logo-icon">
                <span style={{ color: "#e05c5c", fontSize: "16px", fontWeight: "bold" }}>✚</span>
              </div>
              <h3 className="ft-brand-name">Smart Care Polyclinic</h3>
            </div>
            <p className="ft-brand-desc">
              Providing quality healthcare services with compassion and expertise.
            </p>
            <div className="ft-social-row">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="ft-social-icon"
                onMouseEnter={(e) => e.currentTarget.style.background = "#1877f2"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="ft-social-icon"
                onMouseEnter={(e) => e.currentTarget.style.background = "#0077b5"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="white">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                  <circle cx="4" cy="4" r="2" fill="white"/>
                </svg>
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="ft-social-icon"
                onMouseEnter={(e) => e.currentTarget.style.background = "#e1306c"}
                onMouseLeave={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="0.5" fill="white" stroke="none"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 className="ft-col-title">Quick Links</h4>
            {[
              { label: "Home", path: "/" },
              { label: "Departments", path: "/departments" },
              { label: "Packages", path: "/packages" },
              { label: "Book Appointment", path: "/book-appointment" },
              { label: "Contact", path: "/contact" },
              { label: "About Us", path: "/about" },
            ].map(link => (
              <p key={link.label} className="ft-link" onClick={() => navigate(link.path)}>
                {link.label}
              </p>
            ))}
          </div>

          {/* Col 3 — Departments */}
          <div>
            <h4 className="ft-col-title">Departments</h4>
            {departments.map(dept => (
              <p
                key={dept.id}
                className="ft-link"
                onClick={() => navigate(`/departments/${dept.id}`)}
              >
                {dept.name}
              </p>
            ))}
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="ft-col-title">Contact</h4>
            <div className="ft-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
              <p className="ft-contact-text">+971 (0) 4379 3562</p>
            </div>
            <div className="ft-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <polyline points="22,6 12,13 2,6"/>
              </svg>
              <p className="ft-contact-text">smart@smcare.ae</p>
            </div>
            <div className="ft-contact-row">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 2 }}>
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
                <circle cx="12" cy="10" r="3"/>
              </svg>
              <p className="ft-contact-text">Dubai, UAE</p>
            </div>
          </div>

        </div>

        <div className="ft-bottom">
          <p className="ft-bottom-text">© 2025 Smartcare Polyclinic. All rights reserved.</p>
        </div>
      </footer>
    </>
  );
}