import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const countries = [
  { code:"+971", flag:"🇦🇪", name:"UAE" },
  { code:"+966", flag:"🇸🇦", name:"Saudi Arabia" },
  { code:"+974", flag:"🇶🇦", name:"Qatar" },
  { code:"+973", flag:"🇧🇭", name:"Bahrain" },
  { code:"+965", flag:"🇰🇼", name:"Kuwait" },
  { code:"+968", flag:"🇴🇲", name:"Oman" },
  { code:"+92", flag:"🇵🇰", name:"Pakistan" },
  { code:"+91", flag:"🇮🇳", name:"India" },
  { code:"+880", flag:"🇧🇩", name:"Bangladesh" },
  { code:"+94", flag:"🇱🇰", name:"Sri Lanka" },
  { code:"+63", flag:"🇵🇭", name:"Philippines" },
  { code:"+62", flag:"🇮🇩", name:"Indonesia" },
  { code:"+20", flag:"🇪🇬", name:"Egypt" },
  { code:"+249", flag:"🇸🇩", name:"Sudan" },
  { code:"+212", flag:"🇲🇦", name:"Morocco" },
  { code:"+216", flag:"🇹🇳", name:"Tunisia" },
  { code:"+213", flag:"🇩🇿", name:"Algeria" },
  { code:"+218", flag:"🇱🇾", name:"Libya" },
  { code:"+962", flag:"🇯🇴", name:"Jordan" },
  { code:"+961", flag:"🇱🇧", name:"Lebanon" },
  { code:"+963", flag:"🇸🇾", name:"Syria" },
  { code:"+964", flag:"🇮🇶", name:"Iraq" },
  { code:"+90", flag:"🇹🇷", name:"Turkey" },
  { code:"+44", flag:"🇬🇧", name:"UK" },
  { code:"+1", flag:"🇺🇸", name:"USA" },
  { code:"+61", flag:"🇦🇺", name:"Australia" },
  { code:"+49", flag:"🇩🇪", name:"Germany" },
  { code:"+33", flag:"🇫🇷", name:"France" },
  { code:"+39", flag:"🇮🇹", name:"Italy" },
  { code:"+34", flag:"🇪🇸", name:"Spain" },
  { code:"+7", flag:"🇷🇺", name:"Russia" },
  { code:"+86", flag:"🇨🇳", name:"China" },
  { code:"+81", flag:"🇯🇵", name:"Japan" },
  { code:"+82", flag:"🇰🇷", name:"South Korea" },
  { code:"+27", flag:"🇿🇦", name:"South Africa" },
  { code:"+234", flag:"🇳🇬", name:"Nigeria" },
  { code:"+254", flag:"🇰🇪", name:"Kenya" },
  { code:"+55", flag:"🇧🇷", name:"Brazil" },
  { code:"+52", flag:"🇲🇽", name:"Mexico" },
  { code:"+60", flag:"🇲🇾", name:"Malaysia" },
  { code:"+65", flag:"🇸🇬", name:"Singapore" },
  { code:"+66", flag:"🇹🇭", name:"Thailand" },
  { code:"+84", flag:"🇻🇳", name:"Vietnam" },
  { code:"+977", flag:"🇳🇵", name:"Nepal" },
  { code:"+251", flag:"🇪🇹", name:"Ethiopia" },
];

export default function VerifyNumberPage() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const filtered = countries.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) || c.code.includes(search)
  );

  const handleVerify = (e) => {
    e.preventDefault(); setError("");
    if (!phone || phone.length < 7) { setError("Please enter a valid phone number."); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Verification code sent to ${selectedCountry.code} ${phone}`);
    }, 1500);
  };

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <style>{`
        .vn-page { min-height:calc(100vh - 130px); display:flex; align-items:center; justify-content:center; padding:32px 16px; }
        .vn-card { background:#fff; border-radius:16px; padding:36px 32px; width:100%; max-width:460px; box-shadow:0 4px 24px rgba(0,0,0,0.08); }
        .vn-icon { width:56px; height:56px; background:#eef6fb; border-radius:50%; display:flex; align-items:center; justify-content:center; margin:0 auto 18px; }
        .vn-title { font-size:20px; font-weight:700; color:#1a1a2e; margin-bottom:6px; text-align:center; font-family:'Poppins',sans-serif; }
        .vn-desc { font-size:13px; color:#888; margin-bottom:24px; text-align:center; font-family:'Poppins',sans-serif; }
        .vn-error { background:#fde8e8; color:#c0392b; padding:9px 13px; border-radius:8px; font-size:13px; margin-bottom:14px; font-family:'Poppins',sans-serif; }
        .vn-label { display:block; font-size:13px; font-weight:500; color:#555; margin-bottom:7px; font-family:'Poppins',sans-serif; }
        .vn-phone-row { display:flex; border:1.5px solid #e0e0e0; border-radius:10px; overflow:visible; background:#f8fafc; position:relative; }
        .vn-country-selector { display:flex; align-items:center; gap:5px; padding:11px 12px; border-right:1px solid #e0e0e0; background:#fff; cursor:pointer; border-radius:10px 0 0 10px; min-width:94px; user-select:none; flex-shrink:0; }
        .vn-code { font-size:13px; color:#333; font-family:'Poppins',sans-serif; font-weight:500; }
        .vn-dropdown { position:absolute; top:calc(100% + 4px); left:0; background:#fff; border-radius:10px; box-shadow:0 8px 24px rgba(0,0,0,0.12); border:1px solid #eee; z-index:300; width:250px; }
        .vn-search-box { display:flex; align-items:center; gap:8px; padding:9px 13px; border-bottom:1px solid #f0f0f0; }
        .vn-search-input { flex:1; border:none; outline:none; font-size:13px; font-family:'Poppins',sans-serif; color:#333; background:transparent; }
        .vn-country-list { max-height:210px; overflow-y:auto; }
        .vn-country-item { display:flex; align-items:center; gap:9px; padding:9px 13px; cursor:pointer; transition:background 0.15s; }
        .vn-country-item:hover { background:#f8fafc; }
        .vn-country-name { flex:1; font-size:12px; color:#333; font-family:'Poppins',sans-serif; }
        .vn-code-small { font-size:11px; color:#888; font-family:'Poppins',sans-serif; }
        .vn-phone-input { flex:1; padding:11px 13px; border:none; outline:none; font-size:14px; font-family:'Poppins',sans-serif; background:#f8fafc; color:#333; border-radius:0 10px 10px 0; min-width:0; }
        .vn-hint { font-size:11px; color:#aaa; margin-top:5px; font-family:'Poppins',sans-serif; }
        .vn-btn { width:100%; padding:12px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; margin:18px 0 12px; }
        .vn-back { text-align:center; font-size:13px; color:#2193b0; cursor:pointer; font-family:'Poppins',sans-serif; display:block; }
        @media (max-width:480px) {
          .vn-card { padding:24px 18px; }
          .vn-title { font-size:17px; }
          .vn-dropdown { width:200px; }
        }
      `}</style>
      <Navbar />
      <div className="vn-page">
        <div className="vn-card">
          <div className="vn-icon">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </div>
          <h2 className="vn-title">Verify Your Phone Number</h2>
          <p className="vn-desc">Enter your phone number to manage your appointments</p>
          {error && <div className="vn-error">{error}</div>}
          <form onSubmit={handleVerify}>
            <label className="vn-label">Phone Number</label>
            <div className="vn-phone-row">
              <div className="vn-country-selector" onClick={() => { setShowDropdown(!showDropdown); setSearch(""); }}>
                <span style={{ fontSize:"18px" }}>{selectedCountry.flag}</span>
                <span className="vn-code">{selectedCountry.code}</span>
                <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>
              </div>
              {showDropdown && (
                <div className="vn-dropdown">
                  <div className="vn-search-box">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input className="vn-search-input" placeholder="Search country..." value={search} onChange={(e) => setSearch(e.target.value)} autoFocus/>
                  </div>
                  <div className="vn-country-list">
                    {filtered.map((country, i) => (
                      <div key={i} className="vn-country-item" style={{ background: selectedCountry.code === country.code ? "#eef6fb" : "#fff" }}
                        onClick={() => { setSelectedCountry(country); setShowDropdown(false); setSearch(""); }}>
                        <span style={{ fontSize:"16px" }}>{country.flag}</span>
                        <span className="vn-country-name">{country.name}</span>
                        <span className="vn-code-small">{country.code}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <input className="vn-phone-input" type="tel" placeholder="XX XXX XXXX" value={phone} onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))} required/>
            </div>
            <p className="vn-hint">{selectedCountry.flag} {selectedCountry.name} ({selectedCountry.code})</p>
            <button className="vn-btn" type="submit" disabled={loading}>{loading ? "Sending..." : "Verify"}</button>
          </form>
          <span className="vn-back" onClick={() => navigate("/")}>← Return to Home</span>
        </div>
      </div>
      <Footer />
    </div>
  );
}