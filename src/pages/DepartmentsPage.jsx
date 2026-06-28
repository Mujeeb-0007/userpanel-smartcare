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
      } catch (err) { console.error(err); }
      finally { setLoading(false); }
    };
    fetchDepts();
  }, []);

  const filtered = departments.filter(d => d.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .dp-hero { height:280px; position:relative; background-image:url(https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&q=80); background-size:cover; background-position:center; }
        .dp-hero-overlay { position:absolute; inset:0; background:linear-gradient(135deg,rgba(33,147,176,0.85),rgba(0,0,0,0.5)); display:flex; flex-direction:column; align-items:center; justify-content:center; padding:20px; }
        .dp-hero-title { font-size:38px; font-weight:800; color:#fff; margin:0; font-family:'Poppins',sans-serif; text-align:center; }
        .dp-hero-desc { font-size:15px; color:rgba(255,255,255,0.85); margin-top:10px; font-family:'Poppins',sans-serif; text-align:center; }
        .dp-search-section { background:#f8fafc; padding:24px 60px; display:flex; justify-content:center; }
        .dp-search-box { display:flex; align-items:center; background:#fff; border-radius:50px; padding:11px 22px; box-shadow:0 2px 12px rgba(0,0,0,0.08); width:100%; max-width:480px; gap:10px; }
        .dp-search-input { flex:1; border:none; outline:none; font-size:14px; font-family:'Poppins',sans-serif; color:#333; background:transparent; }
        .dp-section { padding:52px 60px; background:#fff; }
        .dp-badge { display:inline-block; background:#e8f4fb; color:#2193b0; padding:5px 14px; border-radius:20px; font-size:12px; font-weight:500; font-family:'Poppins',sans-serif; margin-bottom:14px; }
        .dp-section-title { font-size:28px; font-weight:700; color:#1a1a2e; margin:0 0 8px; font-family:'Poppins',sans-serif; }
        .dp-section-desc { font-size:14px; color:#666; margin-bottom:28px; font-family:'Poppins',sans-serif; }
        .dp-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(280px,1fr)); gap:22px; }
        .dp-card { background:#fff; border-radius:16px; overflow:hidden; box-shadow:0 4px 16px rgba(0,0,0,0.08); transition:transform 0.3s,box-shadow 0.3s; }
        .dp-card:hover { transform:translateY(-6px); box-shadow:0 14px 36px rgba(0,0,0,0.12); }
        .dp-card-img { width:100%; height:180px; object-fit:cover; display:block; }
        .dp-card-placeholder { width:100%; height:180px; background:#eef6fb; display:flex; align-items:center; justify-content:center; }
        .dp-card-body { padding:18px; }
        .dp-card-title { font-size:16px; font-weight:600; color:#1a1a2e; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .dp-card-desc { font-size:13px; color:#666; line-height:1.7; margin-bottom:12px; font-family:'Poppins',sans-serif; }
        .dp-fee-row { display:flex; gap:8px; align-items:center; margin-bottom:12px; }
        .dp-fee-label { font-size:12px; font-weight:600; color:#888; font-family:'Poppins',sans-serif; }
        .dp-fee-val { font-size:12px; color:#2193b0; font-weight:600; font-family:'Poppins',sans-serif; }
        .dp-card-btns { display:flex; gap:8px; }
        .dp-learn-btn { flex:1; padding:9px; background:#eef6fb; color:#2193b0; border:none; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .dp-book-btn { flex:1; padding:9px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:12px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .dp-center-text { text-align:center; padding:48px; color:#888; font-size:15px; font-family:'Poppins',sans-serif; }
        .dp-view-all { display:block; margin:24px auto 0; padding:11px 28px; background:transparent; color:#2193b0; border:2px solid #2193b0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .dp-cta { background:#2193b0; padding:52px 60px; text-align:center; }
        .dp-cta-title { font-size:28px; font-weight:700; color:#fff; margin-bottom:10px; font-family:'Poppins',sans-serif; }
        .dp-cta-desc { font-size:15px; color:rgba(255,255,255,0.85); margin-bottom:24px; font-family:'Poppins',sans-serif; }
        .dp-cta-btn { padding:13px 32px; background:#fff; color:#2193b0; border:none; border-radius:8px; font-size:14px; font-weight:700; cursor:pointer; font-family:'Poppins',sans-serif; }
        @media (max-width:1024px) {
          .dp-section { padding:40px 36px; }
          .dp-search-section { padding:20px 36px; }
          .dp-cta { padding:40px 36px; }
        }
        @media (max-width:768px) {
          .dp-hero { height:200px; }
          .dp-hero-title { font-size:26px; }
          .dp-section { padding:32px 24px; }
          .dp-search-section { padding:16px 24px; }
          .dp-cta { padding:36px 24px; }
          .dp-cta-title { font-size:22px; }
          .dp-section-title { font-size:22px; }
        }
        @media (max-width:480px) {
          .dp-hero { height:160px; }
          .dp-hero-title { font-size:20px; }
          .dp-hero-desc { font-size:12px; }
          .dp-section { padding:24px 16px; }
          .dp-search-section { padding:14px 16px; }
          .dp-grid { grid-template-columns:1fr; }
          .dp-cta { padding:28px 16px; }
          .dp-cta-title { font-size:18px; }
          .dp-section-title { font-size:18px; }
        }
      `}</style>
      <Navbar />
      <div className="dp-hero">
        <div className="dp-hero-overlay">
          <h1 className="dp-hero-title">Our Departments</h1>
          <p className="dp-hero-desc">Specialized care across multiple medical disciplines</p>
        </div>
      </div>
      <div className="dp-search-section">
        <div className="dp-search-box">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input className="dp-search-input" placeholder="Search departments..." value={search} onChange={(e) => setSearch(e.target.value)}/>
        </div>
      </div>
      <div className="dp-section">
        <span className="dp-badge">Clinical Specialities</span>
        <h2 className="dp-section-title">All Departments</h2>
        <p className="dp-section-desc">Specialized care with cutting-edge technology</p>
        {loading ? (
          <div className="dp-center-text">Loading departments...</div>
        ) : filtered.length === 0 ? (
          <div className="dp-center-text">No departments found.</div>
        ) : (
          <>
            <div className="dp-grid">
              {filtered.map((dept) => (
                <div key={dept.id} className="dp-card">
                  {dept.coverUrl ? <img src={dept.coverUrl} alt={dept.name} className="dp-card-img"/> : <div className="dp-card-placeholder"><svg width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg></div>}
                  <div className="dp-card-body">
                    <h3 className="dp-card-title">{dept.name}</h3>
                    <p className="dp-card-desc">{dept.shortDescription || dept.desc || "Specialized healthcare services."}</p>
                    {dept.fee && dept.fee !== "N/A" && (
                      <div className="dp-fee-row">
                        <span className="dp-fee-label">Fee:</span>
                        <span className="dp-fee-val">{dept.fee}</span>
                      </div>
                    )}
                    <div className="dp-card-btns">
                      <button className="dp-learn-btn" onClick={() => navigate("/departments/" + dept.id)}>Learn More →</button>
                      <button className="dp-book-btn" onClick={() => navigate("/book-appointment")}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button className="dp-view-all" onClick={() => navigate("/departments")}>View All Departments</button>
          </>
        )}
      </div>
      <div className="dp-cta">
        <h2 className="dp-cta-title">Ready to Book an Appointment?</h2>
        <p className="dp-cta-desc">Schedule a visit with our specialists today</p>
        <button className="dp-cta-btn" onClick={() => navigate("/book-appointment")}>Book Now</button>
      </div>
      <Footer />
    </div>
  );
}