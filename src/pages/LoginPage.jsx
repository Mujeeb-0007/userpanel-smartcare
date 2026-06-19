import React, { useState, useEffect } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const loginSlides = [
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=800&q=80",
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=800&q=80",
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80",
  "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&q=80",
];

export default function LoginPage() {
  const [tab, setTab] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const [idType, setIdType] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);

  // Auto slide
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % loginSlides.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const docSnap = await getDoc(doc(db, "users", result.user.uid));
      if (docSnap.exists() && docSnap.data().role === "user") {
        navigate("/dashboard");
      } else {
        setError("No user account found.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!agreeTerms) { setError("Please agree to terms and conditions."); return; }
    if (regPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    if (regPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const now = new Date();
      await setDoc(doc(db, "users", result.user.uid), {
        name: firstName.trim(),
        lastName: lastName.trim(),
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        gender, idType, email: regEmail, role: "user",
        createdAt: now,
        date: now.toLocaleDateString("en-GB"),
        time: now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
      });
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("Email already registered.");
      else setError("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={styles.page}>

        {/* Left Side — Slider */}
        <div style={styles.leftSide}>
          {/* Images */}
          {loginSlides.map((img, index) => (
            <div
              key={index}
              style={{
                ...styles.slideImg,
                backgroundImage: `url(${img})`,
                opacity: currentSlide === index ? 1 : 0,
                transition: "opacity 1s ease-in-out",
              }}
            />
          ))}

          {/* Overlay */}
          <div style={styles.slideOverlay}>
            <div style={styles.leftContent}>
              <div style={styles.brandRow}>
                <div style={styles.brandIcon}>💙</div>
                <span style={styles.brandText}>
                  <span style={{ color: "#6dd5ed" }}>Smartcare</span> Polyclinic
                </span>
              </div>
              <h1 style={styles.leftTitle}>Welcome to Your Health Portal</h1>
              <p style={styles.leftDesc}>
                Access your medical records, manage appointments, and communicate with your healthcare providers.
              </p>
            </div>

            {/* Dots */}
            <div style={styles.slideDots}>
              {loginSlides.map((_, i) => (
                <div key={i} onClick={() => setCurrentSlide(i)}
                  style={{ ...styles.dot, ...(currentSlide === i ? styles.dotActive : {}) }} />
              ))}
            </div>

            {/* Bottom Buttons */}
            <div style={styles.leftBtns}>
              <button style={styles.leftBtn} onClick={() => navigate("/")}>Return to Home</button>
              <button style={styles.leftBtn}>Need Help?</button>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div style={styles.rightSide}>
          <div style={styles.tabs}>
            <button style={{ ...styles.tab, ...(tab === "login" ? styles.tabActive : {}) }}
              onClick={() => { setTab("login"); setError(""); }}>Login</button>
            <button style={{ ...styles.tab, ...(tab === "register" ? styles.tabActive : {}) }}
              onClick={() => { setTab("register"); setError(""); }}>Register</button>
          </div>

          {error && <div style={styles.error}>{error}</div>}

          {tab === "login" ? (
            <div style={styles.formBox}>
              <h2 style={styles.formTitle}>Account Login</h2>
              <p style={styles.formSubtitle}>Enter your credentials to access your account</p>
              <form onSubmit={handleLogin}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input style={styles.input} type="email" placeholder="m.smith@example.com"
                    value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                  <div style={styles.labelRow}>
                    <label style={styles.label}>Password</label>
                    <span style={styles.forgotLink}>Forgot password?</span>
                  </div>
                  <input style={styles.input} type="password"
                    value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required />
                </div>
                <div style={styles.checkRow}>
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
                  <span style={styles.checkLabel}>Remember me</span>
                </div>
                <button style={styles.submitBtn} type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "Login"}
                </button>
              </form>
            </div>
          ) : (
            <div style={styles.formBox}>
              <h2 style={styles.formTitle}>Create an Account</h2>
              <p style={styles.formSubtitle}>Register to access our patient portal</p>
              <form onSubmit={handleRegister}>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Select ID Type</label>
                  <select style={styles.input} value={idType} onChange={(e) => setIdType(e.target.value)} required>
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="emirates_id">Emirates ID</option>
                    <option value="national_id">National ID</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Full Name</label>
                  <input style={styles.input} type="text" placeholder="Michael"
                    value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Last Name</label>
                  <input style={styles.input} type="text" placeholder="Smith"
                    value={lastName} onChange={(e) => setLastName(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Gender</label>
                  <select style={styles.input} value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Email</label>
                  <input style={styles.input} type="email" placeholder="m.smith@example.com"
                    value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Password</label>
                  <input style={styles.input} type="password"
                    value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required />
                </div>
                <div style={styles.inputGroup}>
                  <label style={styles.label}>Confirm Password</label>
                  <input style={styles.input} type="password"
                    value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                </div>
                <div style={styles.checkRow}>
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)} />
                  <span style={styles.checkLabel}>
                    I agree to the <span style={{ color: "#2193b0", cursor: "pointer" }}>terms and conditions</span>
                  </span>
                </div>
                <button style={{ ...styles.submitBtn, backgroundColor: "#e05c5c" }} type="submit" disabled={loading}>
                  {loading ? "Please wait..." : "Register"}
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { display: "flex", minHeight: "calc(100vh - 70px)" },

  // Left Slider
  leftSide: { flex: 1, position: "relative", overflow: "hidden", minHeight: "600px" },
  slideImg: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center" },
  slideOverlay: {
    position: "absolute", inset: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.75), rgba(33,147,176,0.6))",
    display: "flex", flexDirection: "column",
    justifyContent: "space-between", padding: "50px 40px",
  },
  leftContent: {},
  brandRow: { display: "flex", alignItems: "center", gap: "10px", marginBottom: "24px" },
  brandIcon: { fontSize: "28px" },
  brandText: { fontSize: "18px", fontWeight: "600", color: "#fff", fontFamily: "'Poppins', sans-serif" },
  leftTitle: { fontSize: "36px", fontWeight: "800", color: "#fff", lineHeight: 1.3, marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  leftDesc: { fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, fontFamily: "'Poppins', sans-serif", maxWidth: "420px" },
  slideDots: { display: "flex", gap: "8px", justifyContent: "center" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.3s" },
  dotActive: { backgroundColor: "#fff", width: "28px", borderRadius: "5px" },
  leftBtns: { display: "flex", gap: "12px" },
  leftBtn: { padding: "10px 20px", backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", border: "1px solid rgba(255,255,255,0.4)", borderRadius: "8px", fontSize: "13px", cursor: "pointer", fontFamily: "'Poppins', sans-serif", backdropFilter: "blur(4px)" },

  // Right
  rightSide: { width: "500px", padding: "40px", backgroundColor: "#fff", overflowY: "auto" },
  tabs: { display: "flex", borderBottom: "2px solid #eee", marginBottom: "24px" },
  tab: { flex: 1, padding: "14px", border: "none", backgroundColor: "transparent", fontSize: "15px", fontWeight: "500", cursor: "pointer", color: "#888", fontFamily: "'Poppins', sans-serif" },
  tabActive: { color: "#1a1a2e", borderBottom: "2px solid #1a1a2e", marginBottom: "-2px", fontWeight: "600" },
  error: { backgroundColor: "#fde8e8", color: "#c0392b", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  formBox: {},
  formTitle: { fontSize: "22px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 6px 0", fontFamily: "'Poppins', sans-serif" },
  formSubtitle: { fontSize: "13px", color: "#888", marginBottom: "24px", fontFamily: "'Poppins', sans-serif" },
  inputGroup: { marginBottom: "16px" },
  label: { display: "block", fontSize: "13px", fontWeight: "500", color: "#555", marginBottom: "6px", fontFamily: "'Poppins', sans-serif" },
  labelRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" },
  forgotLink: { fontSize: "13px", color: "#2193b0", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif", color: "#333" },
  checkRow: { display: "flex", alignItems: "center", gap: "8px", marginBottom: "20px" },
  checkLabel: { fontSize: "13px", color: "#555", fontFamily: "'Poppins', sans-serif" },
  submitBtn: { width: "100%", padding: "13px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
};