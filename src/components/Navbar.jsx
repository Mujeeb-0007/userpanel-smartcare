import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userData } = useAuth();
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showBookDropdown, setShowBookDropdown] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav style={styles.nav}>
      {/* Logo */}
      <div style={styles.logo} onClick={() => navigate("/")}>
        <div style={styles.logoIcon}>
          <span style={{ color: "#e05c5c", fontSize: "20px", fontWeight: "bold" }}>✚</span>
        </div>
        <div>
          <div style={styles.logoText}>
            <span style={{ color: "#e05c5c" }}>SMART </span>
            <span style={{ color: "#2193b0" }}>CARE</span>
          </div>
          <div style={styles.logoSub}>POLYCLINIC</div>
        </div>
      </div>

      {/* Links */}
      <div style={styles.links}>
        <span style={{ ...styles.link, ...(isActive("/about") ? styles.linkActive : {}) }}
          onClick={() => navigate("/about")}
          onMouseEnter={(e) => { if (!isActive("/about")) e.currentTarget.style.color = "#2193b0"; }}
          onMouseLeave={(e) => { if (!isActive("/about")) e.currentTarget.style.color = "#555"; }}>
          About Us
        </span>

        <span style={{ ...styles.link, ...(isActive("/departments") ? styles.linkActive : {}) }}
          onClick={() => navigate("/departments")}
          onMouseEnter={(e) => { if (!isActive("/departments")) e.currentTarget.style.color = "#2193b0"; }}
          onMouseLeave={(e) => { if (!isActive("/departments")) e.currentTarget.style.color = "#555"; }}>
          Departments
        </span>

        {/* Book Appointment Dropdown */}
        <div style={{ position: "relative" }}
          onMouseEnter={() => setShowBookDropdown(true)}
          onMouseLeave={() => setShowBookDropdown(false)}
        >
          <span style={{
            ...styles.link,
            ...(location.pathname.includes("book") || location.pathname.includes("verify") ? styles.linkActive : {}),
          }}>
            Book Appointment ▾
          </span>

          {showBookDropdown && (
            <div style={styles.bookDropdown}>
              {/* Book */}
              <div style={styles.bookDropItem}
                onClick={() => { navigate("/book-appointment"); setShowBookDropdown(false); }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              >
                <div style={styles.dropIconBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                    <line x1="16" y1="2" x2="16" y2="6" />
                    <line x1="8" y1="2" x2="8" y2="6" />
                    <line x1="3" y1="10" x2="21" y2="10" />
                    <path d="M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                </div>
                <span style={styles.dropItemText}>Book</span>
              </div>

              {/* Manage */}
              <div style={{ ...styles.bookDropItem, borderBottom: "none" }}
                onClick={() => { navigate("/verify-number"); setShowBookDropdown(false); }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}
              >
                <div style={styles.dropIconBox}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                    <line x1="9" y1="13" x2="15" y2="13" />
                    <line x1="9" y1="17" x2="13" y2="17" />
                  </svg>
                </div>
                <span style={styles.dropItemText}>Manage</span>
              </div>
            </div>
          )}
        </div>

        <span style={{ ...styles.link, ...(isActive("/packages") ? styles.linkActive : {}) }}
          onClick={() => navigate("/packages")}
          onMouseEnter={(e) => { if (!isActive("/packages")) e.currentTarget.style.color = "#2193b0"; }}
          onMouseLeave={(e) => { if (!isActive("/packages")) e.currentTarget.style.color = "#555"; }}>
          Packages
        </span>

        <span style={{ ...styles.link, ...(isActive("/contact") ? styles.linkActive : {}) }}
          onClick={() => navigate("/contact")}
          onMouseEnter={(e) => { if (!isActive("/contact")) e.currentTarget.style.color = "#2193b0"; }}
          onMouseLeave={(e) => { if (!isActive("/contact")) e.currentTarget.style.color = "#555"; }}>
          Contact
        </span>
      </div>

      {/* Auth */}
      {user ? (
        <div style={styles.userBox} onClick={() => setShowUserDropdown(!showUserDropdown)}>
          <div style={styles.avatar}>
            {userData?.name?.charAt(0).toUpperCase() || "U"}
          </div>
          <span style={styles.userName}>{userData?.name || "User"}</span>
          <span style={{ fontSize: "11px", color: "#888" }}>▾</span>
          {showUserDropdown && (
            <div style={styles.userDropdown}>
              <div style={styles.dropItem}
                onClick={(e) => { e.stopPropagation(); navigate("/dashboard"); setShowUserDropdown(false); }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                🏠 Dashboard
              </div>
              <div style={styles.dropItem}
                onClick={(e) => { e.stopPropagation(); navigate("/profile"); setShowUserDropdown(false); }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f0f8ff"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                👤 Profile
              </div>
              <div style={{ ...styles.dropItem, color: "#e05c5c", borderBottom: "none" }}
                onClick={(e) => { e.stopPropagation(); handleLogout(); setShowUserDropdown(false); }}
                onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#fff5f5"}
                onMouseLeave={(e) => e.currentTarget.style.backgroundColor = "#fff"}>
                🚪 Logout
              </div>
            </div>
          )}
        </div>
      ) : (
        <button style={styles.loginBtn} onClick={() => navigate("/login")}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a7a9a"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2193b0"; }}>
          Login
        </button>
      )}
    </nav>
  );
}

const styles = {
  nav: { display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 50px", backgroundColor: "#fff", boxShadow: "0 2px 10px rgba(0,0,0,0.08)", position: "sticky", top: 0, zIndex: 100 },
  logo: { display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" },
  logoIcon: { width: "40px", height: "40px", border: "2px solid #e05c5c", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" },
  logoText: { fontWeight: "700", fontSize: "14px", fontFamily: "'Poppins', sans-serif" },
  logoSub: { fontSize: "9px", color: "#aaa", letterSpacing: "2px", fontFamily: "'Poppins', sans-serif" },
  links: { display: "flex", gap: "28px", alignItems: "center" },
  link: { fontSize: "14px", color: "#555", cursor: "pointer", fontFamily: "'Poppins', sans-serif", fontWeight: "500", padding: "4px 0", borderBottom: "2px solid transparent", transition: "all 0.2s" },
  linkActive: { color: "#2193b0", borderBottom: "2px solid #2193b0" },
  bookDropdown: { position: "absolute", top: "30px", left: "50%", transform: "translateX(-50%)", backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: "160px", overflow: "hidden", zIndex: 200, border: "1px solid #eee" },
  bookDropItem: { display: "flex", alignItems: "center", gap: "10px", padding: "12px 16px", fontSize: "14px", color: "#444", fontFamily: "'Poppins', sans-serif", cursor: "pointer", borderBottom: "1px solid #f5f5f5", transition: "background 0.15s", backgroundColor: "#fff" },
  dropIconBox: { width: "28px", height: "28px", backgroundColor: "#eef6fb", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
  dropItemText: { fontSize: "14px", fontWeight: "500", color: "#444", fontFamily: "'Poppins', sans-serif" },
  loginBtn: { padding: "10px 24px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" },
  userBox: { display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", position: "relative" },
  avatar: { width: "36px", height: "36px", backgroundColor: "#2193b0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "600", fontSize: "15px" },
  userName: { fontSize: "14px", fontWeight: "500", color: "#333", fontFamily: "'Poppins', sans-serif" },
  userDropdown: { position: "absolute", top: "48px", right: 0, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", minWidth: "170px", overflow: "hidden", zIndex: 200, border: "1px solid #eee" },
  dropItem: { padding: "12px 16px", fontSize: "14px", color: "#444", fontFamily: "'Poppins', sans-serif", cursor: "pointer", borderBottom: "1px solid #f5f5f5", transition: "background 0.15s", backgroundColor: "#fff" },
};