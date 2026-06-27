import React, { useState, useRef, useEffect } from "react";
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileBookOpen, setMobileBookOpen] = useState(false);

  const navRef = useRef(null);
  const bookTimerRef = useRef(null);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileBookOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const handler = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setShowUserDropdown(false);
        setShowBookDropdown(false);
        setMobileMenuOpen(false);
        setMobileBookOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  const isActive = (path) => location.pathname === path;
  const isBookActive = location.pathname.includes("book") || location.pathname.includes("verify");

  const navLinks = [
    { label: "About Us",    path: "/about" },
    { label: "Departments", path: "/departments" },
    { label: "Packages",    path: "/packages" },
    { label: "Contact",     path: "/contact" },
  ];

  // Hover delay handlers — dropdown stays 300ms after mouse leaves
  const handleBookEnter = () => {
    clearTimeout(bookTimerRef.current);
    setShowBookDropdown(true);
  };
  const handleBookLeave = () => {
    bookTimerRef.current = setTimeout(() => setShowBookDropdown(false), 300);
  };

  return (
    <>
      <style>{`
        .nb { display:flex; align-items:center; justify-content:space-between; padding:14px 50px; background:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.08); position:sticky; top:0; z-index:100; }
        .nb-logo { display:flex; align-items:center; gap:10px; cursor:pointer; flex-shrink:0; }
        .nb-logo-icon { width:40px; height:40px; border:2px solid #e05c5c; border-radius:8px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .nb-logo-text { font-weight:700; font-size:14px; font-family:'Poppins',sans-serif; }
        .nb-logo-sub { font-size:9px; color:#aaa; letter-spacing:2px; font-family:'Poppins',sans-serif; }
        .nb-links { display:flex; gap:28px; align-items:center; }
        .nb-link { font-size:14px; color:#555; cursor:pointer; font-family:'Poppins',sans-serif; font-weight:500; padding:4px 0; border-bottom:2px solid transparent; transition:all 0.2s; white-space:nowrap; user-select:none; }
        .nb-link:hover { color:#2193b0; }
        .nb-link-active { color:#2193b0; border-bottom:2px solid #2193b0; }
        .nb-book-wrap { position:relative; }
        .nb-book-dropdown { position:absolute; top:100%; left:50%; transform:translateX(-50%); background:#fff; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.12); min-width:180px; overflow:hidden; z-index:200; border:1px solid #eee; margin-top:8px; }
        .nb-book-item { display:flex; align-items:center; gap:10px; padding:12px 16px; font-size:14px; color:#444; font-family:'Poppins',sans-serif; cursor:pointer; border-bottom:1px solid #f5f5f5; transition:background 0.15s; }
        .nb-book-item:last-child { border-bottom:none; }
        .nb-book-item:hover { background:#f0f8ff; }
        .nb-drop-icon { width:30px; height:30px; background:#eef6fb; border-radius:6px; display:flex; align-items:center; justify-content:center; flex-shrink:0; }
        .nb-login-btn { padding:10px 24px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; transition:background 0.2s; white-space:nowrap; }
        .nb-login-btn:hover { background:#1a7a9a; }
        .nb-user-box { display:flex; align-items:center; gap:8px; cursor:pointer; position:relative; }
        .nb-avatar { width:36px; height:36px; background:#2193b0; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:600; font-size:15px; flex-shrink:0; }
        .nb-user-name { font-size:14px; font-weight:500; color:#333; font-family:'Poppins',sans-serif; }
        .nb-user-dropdown { position:absolute; top:48px; right:0; background:#fff; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.12); min-width:170px; overflow:hidden; z-index:200; border:1px solid #eee; }
        .nb-drop-item { padding:12px 16px; font-size:14px; color:#444; font-family:'Poppins',sans-serif; cursor:pointer; border-bottom:1px solid #f5f5f5; transition:background 0.15s; display:flex; align-items:center; gap:10px; }
        .nb-drop-item:last-child { border-bottom:none; }
        .nb-drop-item:hover { background:#f0f8ff; }
        .nb-drop-logout { color:#e05c5c !important; }
        .nb-drop-logout:hover { background:#fff5f5 !important; }
        .nb-hamburger { display:none; flex-direction:column; gap:5px; cursor:pointer; padding:6px; background:none; border:none; border-radius:6px; transition:background 0.2s; }
        .nb-hamburger:hover { background:#f5f5f5; }
        .nb-hamburger span { display:block; width:22px; height:2px; background:#444; border-radius:2px; transition:all 0.3s; }
        .nb-hamburger.open span:nth-child(1) { transform:translateY(7px) rotate(45deg); }
        .nb-hamburger.open span:nth-child(2) { opacity:0; transform:scaleX(0); }
        .nb-hamburger.open span:nth-child(3) { transform:translateY(-7px) rotate(-45deg); }
        .nb-mobile-menu { display:none; position:fixed; top:69px; left:0; right:0; background:#fff; box-shadow:0 8px 24px rgba(0,0,0,0.12); z-index:99; padding:8px 0 16px; max-height:calc(100vh - 69px); overflow-y:auto; }
        .nb-mobile-menu.open { display:block; }
        .nb-mobile-link { display:flex; align-items:center; gap:10px; padding:13px 24px; font-size:15px; color:#444; font-family:'Poppins',sans-serif; font-weight:500; cursor:pointer; border-bottom:1px solid #f5f5f5; transition:background 0.15s; }
        .nb-mobile-link:hover { background:#f0f8ff; color:#2193b0; }
        .nb-mobile-link-active { color:#2193b0; background:#f0f8ff; }
        .nb-mobile-book-toggle { display:flex; justify-content:space-between; align-items:center; padding:13px 24px; font-size:15px; color:#444; font-family:'Poppins',sans-serif; font-weight:500; cursor:pointer; border-bottom:1px solid #f5f5f5; transition:background 0.15s; }
        .nb-mobile-book-toggle:hover { background:#f0f8ff; }
        .nb-mobile-book-toggle.active { color:#2193b0; }
        .nb-chevron { font-size:12px; transition:transform 0.25s; color:#aaa; }
        .nb-chevron.open { transform:rotate(180deg); }
        .nb-mobile-book-sub { background:#fafafa; overflow:hidden; max-height:0; transition:max-height 0.3s ease; }
        .nb-mobile-book-sub.open { max-height:200px; }
        .nb-mobile-sub-item { display:flex; align-items:center; gap:10px; padding:11px 32px; font-size:14px; color:#555; font-family:'Poppins',sans-serif; cursor:pointer; transition:background 0.15s; border-bottom:1px solid #f5f5f5; }
        .nb-mobile-sub-item:last-child { border-bottom:none; }
        .nb-mobile-sub-item:hover { background:#e8f4fa; color:#2193b0; }
        .nb-mobile-divider { height:1px; background:#eee; margin:8px 0; }
        .nb-mobile-user-info { display:flex; align-items:center; gap:12px; padding:14px 24px; border-bottom:1px solid #f5f5f5; }
        .nb-mobile-user-name { font-size:15px; font-weight:600; color:#333; font-family:'Poppins',sans-serif; }
        .nb-mobile-auth-btn { margin:12px 24px 0; display:block; padding:13px; background:#2193b0; color:#fff; border:none; border-radius:10px; font-size:15px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; text-align:center; transition:background 0.2s; width:calc(100% - 48px); }
        .nb-mobile-auth-btn:hover { background:#1a7a9a; }
        .nb-mobile-logout-btn { background:#fff0f0 !important; color:#e05c5c !important; }
        .nb-mobile-logout-btn:hover { background:#fde0e0 !important; }
        @media (max-width:900px) { .nb { padding:14px 24px; } .nb-links, .nb-login-btn, .nb-user-box { display:none; } .nb-hamburger { display:flex; } }
        @media (max-width:600px) { .nb { padding:12px 16px; } }
      `}</style>

      <nav className="nb" ref={navRef}>
        {/* Logo */}
        <div className="nb-logo" onClick={() => navigate("/")}>
          <div className="nb-logo-icon">
            <span style={{ color:"#e05c5c", fontSize:"20px", fontWeight:"bold" }}>✚</span>
          </div>
          <div>
            <div className="nb-logo-text">
              <span style={{ color:"#e05c5c" }}>SMART </span>
              <span style={{ color:"#2193b0" }}>CARE</span>
            </div>
            <div className="nb-logo-sub">POLYCLINIC</div>
          </div>
        </div>

        {/* Desktop Links */}
        <div className="nb-links">
          {navLinks.map(({ label, path }) => (
            <span key={path} className={`nb-link ${isActive(path) ? "nb-link-active" : ""}`} onClick={() => navigate(path)}>
              {label}
            </span>
          ))}

          {/* Book Appointment — hover with delay */}
          <div className="nb-book-wrap" onMouseEnter={handleBookEnter} onMouseLeave={handleBookLeave}>
            <span className={`nb-link ${isBookActive ? "nb-link-active" : ""}`}>
              Book Appointment ▾
            </span>
            {showBookDropdown && (
              <div className="nb-book-dropdown">
                <div className="nb-book-item" onClick={() => { navigate("/book-appointment"); setShowBookDropdown(false); }}>
                  <div className="nb-drop-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                    </svg>
                  </div>
                  <span>Book Appointment</span>
                </div>
                <div className="nb-book-item" onClick={() => { navigate("/verify-number"); setShowBookDropdown(false); }}>
                  <div className="nb-drop-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="9" y1="13" x2="15" y2="13"/><line x1="9" y1="17" x2="13" y2="17"/>
                    </svg>
                  </div>
                  <span>Manage</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Desktop Auth */}
        {user ? (
          <div className="nb-user-box" onClick={() => setShowUserDropdown(!showUserDropdown)}>
            <div className="nb-avatar">{userData?.name?.charAt(0).toUpperCase() || "U"}</div>
            <span className="nb-user-name">{userData?.name || "User"}</span>
            <span style={{ fontSize:"11px", color:"#888" }}>▾</span>
            {showUserDropdown && (
              <div className="nb-user-dropdown">
                <div className="nb-drop-item" onClick={(e) => { e.stopPropagation(); navigate("/dashboard"); setShowUserDropdown(false); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                  Dashboard
                </div>
                <div className="nb-drop-item" onClick={(e) => { e.stopPropagation(); navigate("/profile"); setShowUserDropdown(false); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  Profile
                </div>
                <div className="nb-drop-item nb-drop-logout" onClick={(e) => { e.stopPropagation(); handleLogout(); }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e05c5c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : (
          <button className="nb-login-btn" onClick={() => navigate("/login")}>Login</button>
        )}

        {/* Hamburger */}
        <button className={`nb-hamburger ${mobileMenuOpen ? "open" : ""}`} onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu">
          <span/><span/><span/>
        </button>
      </nav>

      {/* Mobile Drawer */}
      <div className={`nb-mobile-menu ${mobileMenuOpen ? "open" : ""}`}>
        {user && (
          <div className="nb-mobile-user-info">
            <div className="nb-avatar">{userData?.name?.charAt(0).toUpperCase() || "U"}</div>
            <span className="nb-mobile-user-name">{userData?.name || "User"}</span>
          </div>
        )}
        {navLinks.map(({ label, path }) => (
          <div key={path} className={`nb-mobile-link ${isActive(path) ? "nb-mobile-link-active" : ""}`} onClick={() => navigate(path)}>
            {label}
          </div>
        ))}
        <div className={`nb-mobile-book-toggle ${isBookActive ? "active" : ""}`} onClick={() => setMobileBookOpen(!mobileBookOpen)}>
          <span>Book Appointment</span>
          <span className={`nb-chevron ${mobileBookOpen ? "open" : ""}`}>▾</span>
        </div>
        <div className={`nb-mobile-book-sub ${mobileBookOpen ? "open" : ""}`}>
          <div className="nb-mobile-sub-item" onClick={() => navigate("/book-appointment")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            Book Appointment
          </div>
          <div className="nb-mobile-sub-item" onClick={() => navigate("/verify-number")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
            Manage Appointments
          </div>
        </div>
        <div className="nb-mobile-divider"/>
        {user ? (
          <>
            <div className="nb-mobile-link" onClick={() => navigate("/dashboard")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
              Dashboard
            </div>
            <div className="nb-mobile-link" onClick={() => navigate("/profile")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              Profile
            </div>
            <button className="nb-mobile-auth-btn nb-mobile-logout-btn" onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <button className="nb-mobile-auth-btn" onClick={() => navigate("/login")}>Login</button>
        )}
      </div>
    </>
  );
}