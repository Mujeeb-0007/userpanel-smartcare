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

  useEffect(() => {
    const t = setInterval(() => setCurrentSlide(p => (p + 1) % loginSlides.length), 3500);
    return () => clearInterval(t);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault(); setError(""); setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, loginEmail, loginPassword);
      const docSnap = await getDoc(doc(db, "users", result.user.uid));
      if (docSnap.exists() && docSnap.data().role === "user") navigate("/dashboard");
      else setError("No user account found.");
    } catch { setError("Invalid email or password."); }
    finally { setLoading(false); }
  };

  const handleRegister = async (e) => {
    e.preventDefault(); setError("");
    if (!agreeTerms) { setError("Please agree to terms and conditions."); return; }
    if (regPassword !== confirmPassword) { setError("Passwords do not match."); return; }
    if (regPassword.length < 6) { setError("Password must be at least 6 characters."); return; }
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, regEmail, regPassword);
      const now = new Date();
      await setDoc(doc(db, "users", result.user.uid), {
        name: firstName.trim(), lastName: lastName.trim(),
        fullName: `${firstName.trim()} ${lastName.trim()}`,
        gender, idType, email: regEmail, role: "user",
        createdAt: now,
        date: now.toLocaleDateString("en-GB"),
        time: now.toLocaleTimeString("en-GB", { hour:"2-digit", minute:"2-digit" }),
      });
      navigate("/dashboard");
    } catch (err) {
      if (err.code === "auth/email-already-in-use") setError("Email already registered.");
      else setError("Something went wrong. Try again.");
    } finally { setLoading(false); }
  };

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .lg-page { display:flex; min-height:calc(100vh - 65px); }
        .lg-left { flex:1; position:relative; overflow:hidden; min-height:460px; }
        .lg-slide { position:absolute; inset:0; background-size:cover; background-position:center; }
        .lg-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(0,0,0,0.75),rgba(33,147,176,0.6)); display:flex; flex-direction:column; justify-content:space-between; padding:44px 36px; }
        .lg-brand-row { display:flex; align-items:center; gap:10px; margin-bottom:20px; }
        .lg-brand-icon { font-size:24px; }
        .lg-brand-text { font-size:17px; font-weight:600; color:#fff; font-family:'Poppins',sans-serif; }
        .lg-left-title { font-size:30px; font-weight:800; color:#fff; line-height:1.3; margin-bottom:12px; font-family:'Poppins',sans-serif; }
        .lg-left-desc { font-size:14px; color:rgba(255,255,255,0.85); line-height:1.7; font-family:'Poppins',sans-serif; max-width:400px; }
        .lg-dots { display:flex; gap:7px; justify-content:center; }
        .lg-dot { width:9px; height:9px; border-radius:50%; background:rgba(255,255,255,0.5); cursor:pointer; transition:all 0.3s; }
        .lg-dot-active { background:#fff; width:26px; border-radius:5px; }
        .lg-left-btns { display:flex; gap:10px; flex-wrap:wrap; }
        .lg-left-btn { padding:9px 18px; background:rgba(255,255,255,0.15); color:#fff; border:1px solid rgba(255,255,255,0.4); border-radius:8px; font-size:13px; cursor:pointer; font-family:'Poppins',sans-serif; backdrop-filter:blur(4px); }
        .lg-right { width:460px; padding:36px 32px; background:#fff; overflow-y:auto; flex-shrink:0; }
        .lg-tabs { display:flex; border-bottom:2px solid #eee; margin-bottom:22px; }
        .lg-tab { flex:1; padding:13px; border:none; background:transparent; font-size:14px; font-weight:500; cursor:pointer; color:#888; font-family:'Poppins',sans-serif; }
        .lg-tab-active { color:#1a1a2e; border-bottom:2px solid #1a1a2e; margin-bottom:-2px; font-weight:600; }
        .lg-error { background:#fde8e8; color:#c0392b; padding:9px 13px; border-radius:8px; font-size:13px; margin-bottom:14px; font-family:'Poppins',sans-serif; }
        .lg-form-title { font-size:20px; font-weight:700; color:#1a1a2e; margin:0 0 5px; font-family:'Poppins',sans-serif; }
        .lg-form-sub { font-size:12px; color:#888; margin-bottom:20px; font-family:'Poppins',sans-serif; }
        .lg-input-group { margin-bottom:14px; }
        .lg-label { display:block; font-size:13px; font-weight:500; color:#555; margin-bottom:5px; font-family:'Poppins',sans-serif; }
        .lg-label-row { display:flex; justify-content:space-between; align-items:center; margin-bottom:5px; }
        .lg-forgot { font-size:12px; color:#2193b0; cursor:pointer; font-family:'Poppins',sans-serif; }
        .lg-input { width:100%; padding:11px 13px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:13px; box-sizing:border-box; outline:none; background:#f8fafc; font-family:'Poppins',sans-serif; color:#333; }
        .lg-check-row { display:flex; align-items:center; gap:8px; margin-bottom:18px; }
        .lg-check-label { font-size:12px; color:#555; font-family:'Poppins',sans-serif; }
        .lg-submit-btn { width:100%; padding:12px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        @media (max-width:900px) {
          .lg-page { flex-direction:column; }
          .lg-left { min-height:240px; flex:none; }
          .lg-left-title { font-size:22px; }
          .lg-overlay { padding:28px 24px; }
          .lg-right { width:100%; padding:28px 24px; box-sizing:border-box; }
        }
        @media (max-width:480px) {
          .lg-left { min-height:200px; }
          .lg-left-title { font-size:18px; }
          .lg-overlay { padding:20px 18px; }
          .lg-right { padding:22px 18px; }
          .lg-left-btns { display:none; }
          .lg-left-desc { display:none; }
        }
      `}</style>
      <Navbar />
      <div className="lg-page">
        <div className="lg-left">
          {loginSlides.map((img, i) => (
            <div key={i} className="lg-slide" style={{ backgroundImage:`url(${img})`, opacity: currentSlide === i ? 1 : 0, transition:"opacity 1s ease-in-out" }}/>
          ))}
          <div className="lg-overlay">
            <div>
              <div className="lg-brand-row">
                <span className="lg-brand-icon">💙</span>
                <span className="lg-brand-text"><span style={{ color:"#6dd5ed" }}>Smartcare</span> Polyclinic</span>
              </div>
              <h1 className="lg-left-title">Welcome to Your Health Portal</h1>
              <p className="lg-left-desc">Access your medical records, manage appointments, and communicate with your healthcare providers.</p>
            </div>
            <div className="lg-dots">
              {loginSlides.map((_, i) => (
                <div key={i} className={`lg-dot ${currentSlide === i ? "lg-dot-active" : ""}`} onClick={() => setCurrentSlide(i)}/>
              ))}
            </div>
            <div className="lg-left-btns">
              <button className="lg-left-btn" onClick={() => navigate("/")}>Return to Home</button>
              <button className="lg-left-btn">Need Help?</button>
            </div>
          </div>
        </div>
        <div className="lg-right">
          <div className="lg-tabs">
            <button className={`lg-tab ${tab === "login" ? "lg-tab-active" : ""}`} onClick={() => { setTab("login"); setError(""); }}>Login</button>
            <button className={`lg-tab ${tab === "register" ? "lg-tab-active" : ""}`} onClick={() => { setTab("register"); setError(""); }}>Register</button>
          </div>
          {error && <div className="lg-error">{error}</div>}
          {tab === "login" ? (
            <>
              <h2 className="lg-form-title">Account Login</h2>
              <p className="lg-form-sub">Enter your credentials to access your account</p>
              <form onSubmit={handleLogin}>
                <div className="lg-input-group">
                  <label className="lg-label">Email</label>
                  <input className="lg-input" type="email" placeholder="m.smith@example.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required/>
                </div>
                <div className="lg-input-group">
                  <div className="lg-label-row">
                    <label className="lg-label" style={{ margin:0 }}>Password</label>
                    <span className="lg-forgot">Forgot password?</span>
                  </div>
                  <input className="lg-input" type="password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required/>
                </div>
                <div className="lg-check-row">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)}/>
                  <span className="lg-check-label">Remember me</span>
                </div>
                <button className="lg-submit-btn" type="submit" disabled={loading}>{loading ? "Please wait..." : "Login"}</button>
              </form>
            </>
          ) : (
            <>
              <h2 className="lg-form-title">Create an Account</h2>
              <p className="lg-form-sub">Register to access our patient portal</p>
              <form onSubmit={handleRegister}>
                <div className="lg-input-group">
                  <label className="lg-label">Select ID Type</label>
                  <select className="lg-input" value={idType} onChange={(e) => setIdType(e.target.value)} required>
                    <option value="">Select ID Type</option>
                    <option value="passport">Passport</option>
                    <option value="emirates_id">Emirates ID</option>
                    <option value="national_id">National ID</option>
                  </select>
                </div>
                <div className="lg-input-group">
                  <label className="lg-label">Full Name</label>
                  <input className="lg-input" type="text" placeholder="Michael" value={firstName} onChange={(e) => setFirstName(e.target.value)} required/>
                </div>
                <div className="lg-input-group">
                  <label className="lg-label">Last Name</label>
                  <input className="lg-input" type="text" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} required/>
                </div>
                <div className="lg-input-group">
                  <label className="lg-label">Gender</label>
                  <select className="lg-input" value={gender} onChange={(e) => setGender(e.target.value)} required>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div className="lg-input-group">
                  <label className="lg-label">Email</label>
                  <input className="lg-input" type="email" placeholder="m.smith@example.com" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} required/>
                </div>
                <div className="lg-input-group">
                  <label className="lg-label">Password</label>
                  <input className="lg-input" type="password" value={regPassword} onChange={(e) => setRegPassword(e.target.value)} required/>
                </div>
                <div className="lg-input-group">
                  <label className="lg-label">Confirm Password</label>
                  <input className="lg-input" type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                <div className="lg-check-row">
                  <input type="checkbox" checked={agreeTerms} onChange={(e) => setAgreeTerms(e.target.checked)}/>
                  <span className="lg-check-label">I agree to the <span style={{ color:"#2193b0", cursor:"pointer" }}>terms and conditions</span></span>
                </div>
                <button className="lg-submit-btn" style={{ background:"#e05c5c" }} type="submit" disabled={loading}>{loading ? "Please wait..." : "Register"}</button>
              </form>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}