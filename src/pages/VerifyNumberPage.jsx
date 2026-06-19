import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const countries = [
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+974", flag: "🇶🇦", name: "Qatar" },
  { code: "+973", flag: "🇧🇭", name: "Bahrain" },
  { code: "+965", flag: "🇰🇼", name: "Kuwait" },
  { code: "+968", flag: "🇴🇲", name: "Oman" },
  { code: "+92", flag: "🇵🇰", name: "Pakistan" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+880", flag: "🇧🇩", name: "Bangladesh" },
  { code: "+94", flag: "🇱🇰", name: "Sri Lanka" },
  { code: "+63", flag: "🇵🇭", name: "Philippines" },
  { code: "+62", flag: "🇮🇩", name: "Indonesia" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+249", flag: "🇸🇩", name: "Sudan" },
  { code: "+212", flag: "🇲🇦", name: "Morocco" },
  { code: "+216", flag: "🇹🇳", name: "Tunisia" },
  { code: "+213", flag: "🇩🇿", name: "Algeria" },
  { code: "+218", flag: "🇱🇾", name: "Libya" },
  { code: "+962", flag: "🇯🇴", name: "Jordan" },
  { code: "+961", flag: "🇱🇧", name: "Lebanon" },
  { code: "+963", flag: "🇸🇾", name: "Syria" },
  { code: "+964", flag: "🇮🇶", name: "Iraq" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+44", flag: "🇬🇧", name: "UK" },
  { code: "+1", flag: "🇺🇸", name: "USA" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+234", flag: "🇳🇬", name: "Nigeria" },
  { code: "+254", flag: "🇰🇪", name: "Kenya" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+66", flag: "🇹🇭", name: "Thailand" },
  { code: "+84", flag: "🇻🇳", name: "Vietnam" },
  { code: "+977", flag: "🇳🇵", name: "Nepal" },
  { code: "+251", flag: "🇪🇹", name: "Ethiopia" },
];

export default function VerifyNumberPage() {
  const navigate = useNavigate();
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCountries = countries.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.code.includes(search)
  );

  const handleVerify = (e) => {
    e.preventDefault();
    setError("");
    if (!phone || phone.length < 7) {
      setError("Please enter a valid phone number.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert(`Verification code sent to ${selectedCountry.code} ${phone}`);
    }, 1500);
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#f8fafc", minHeight: "100vh" }}>
      <Navbar />

      <div style={styles.page}>
        <div style={styles.card}>
          {/* Icon */}
          <div style={styles.topIcon}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
          </div>

          <h2 style={styles.title}>Verify Your Phone Number</h2>
          <p style={styles.desc}>Enter your phone number to manage your appointments</p>

          {error && <div style={styles.errorMsg}>{error}</div>}

          <form onSubmit={handleVerify}>
            <div style={styles.fieldGroup}>
              <label style={styles.label}>Phone Number</label>
              <div style={styles.phoneRow}>

                {/* Country Selector */}
                <div style={{ position: "relative" }}>
                  <div
                    style={styles.countrySelector}
                    onClick={() => { setShowDropdown(!showDropdown); setSearch(""); }}
                  >
                    <span style={{ fontSize: "20px" }}>{selectedCountry.flag}</span>
                    <span style={styles.countryCode}>{selectedCountry.code}</span>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </div>

                  {/* Dropdown */}
                  {showDropdown && (
                    <div style={styles.countryDropdown}>
                      {/* Search */}
                      <div style={styles.searchBox}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                        </svg>
                        <input
                          style={styles.searchInput}
                          placeholder="Search country..."
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          autoFocus
                        />
                      </div>

                      {/* List */}
                      <div style={styles.countryList}>
                        {filteredCountries.map((country, i) => (
                          <div
                            key={i}
                            style={{
                              ...styles.countryItem,
                              backgroundColor: selectedCountry.code === country.code ? "#eef6fb" : "#fff",
                            }}
                            onClick={() => {
                              setSelectedCountry(country);
                              setShowDropdown(false);
                              setSearch("");
                            }}
                            onMouseEnter={(e) => { if (selectedCountry.code !== country.code) e.currentTarget.style.backgroundColor = "#f8fafc"; }}
                            onMouseLeave={(e) => { if (selectedCountry.code !== country.code) e.currentTarget.style.backgroundColor = "#fff"; }}
                          >
                            <span style={{ fontSize: "18px" }}>{country.flag}</span>
                            <span style={styles.countryName}>{country.name}</span>
                            <span style={styles.countryCodeSmall}>{country.code}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <input
                  style={styles.phoneInput}
                  type="tel"
                  placeholder="XX XXX XXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value.replace(/[^0-9]/g, ""))}
                  required
                />
              </div>

              {/* Selected country info */}
              <p style={styles.countryHint}>
                {selectedCountry.flag} {selectedCountry.name} ({selectedCountry.code})
              </p>
            </div>

            <button style={styles.verifyBtn} type="submit" disabled={loading}>
              {loading ? (
                <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="12" r="10" strokeDasharray="31.4" strokeDashoffset="10">
                      <animateTransform attributeName="transform" type="rotate" from="0 12 12" to="360 12 12" dur="1s" repeatCount="indefinite" />
                    </circle>
                  </svg>
                  Sending...
                </span>
              ) : "Verify"}
            </button>
          </form>

          <p style={styles.backLink} onClick={() => navigate("/")}>
            ← Return to Home
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  page: { minHeight: "calc(100vh - 140px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "40px 30px" },
  card: { backgroundColor: "#fff", borderRadius: "16px", padding: "40px", width: "100%", maxWidth: "500px", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" },
  topIcon: { width: "60px", height: "60px", backgroundColor: "#eef6fb", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px auto" },
  title: { fontSize: "22px", fontWeight: "700", color: "#1a1a2e", marginBottom: "8px", textAlign: "center", fontFamily: "'Poppins', sans-serif" },
  desc: { fontSize: "14px", color: "#888", marginBottom: "28px", textAlign: "center", fontFamily: "'Poppins', sans-serif" },
  errorMsg: { backgroundColor: "#fde8e8", color: "#c0392b", padding: "10px 14px", borderRadius: "8px", fontSize: "13px", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  fieldGroup: { marginBottom: "20px" },
  label: { display: "block", fontSize: "13px", fontWeight: "500", color: "#555", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  phoneRow: { display: "flex", border: "1.5px solid #e0e0e0", borderRadius: "10px", overflow: "visible", backgroundColor: "#f8fafc" },

  // Country Selector
  countrySelector: { display: "flex", alignItems: "center", gap: "6px", padding: "12px 14px", borderRight: "1px solid #e0e0e0", backgroundColor: "#fff", cursor: "pointer", borderRadius: "10px 0 0 10px", minWidth: "110px", userSelect: "none" },
  countryCode: { fontSize: "14px", color: "#333", fontFamily: "'Poppins', sans-serif", fontWeight: "500" },

  // Dropdown
  countryDropdown: { position: "absolute", top: "calc(100% + 4px)", left: 0, backgroundColor: "#fff", borderRadius: "10px", boxShadow: "0 8px 24px rgba(0,0,0,0.12)", border: "1px solid #eee", zIndex: 300, width: "260px" },
  searchBox: { display: "flex", alignItems: "center", gap: "8px", padding: "10px 14px", borderBottom: "1px solid #f0f0f0" },
  searchInput: { flex: 1, border: "none", outline: "none", fontSize: "13px", fontFamily: "'Poppins', sans-serif", color: "#333", backgroundColor: "transparent" },
  countryList: { maxHeight: "220px", overflowY: "auto" },
  countryItem: { display: "flex", alignItems: "center", gap: "10px", padding: "10px 14px", cursor: "pointer", transition: "background 0.15s" },
  countryName: { flex: 1, fontSize: "13px", color: "#333", fontFamily: "'Poppins', sans-serif" },
  countryCodeSmall: { fontSize: "12px", color: "#888", fontFamily: "'Poppins', sans-serif" },

  phoneInput: { flex: 1, padding: "12px 14px", border: "none", outline: "none", fontSize: "14px", fontFamily: "'Poppins', sans-serif", backgroundColor: "#f8fafc", color: "#333", borderRadius: "0 10px 10px 0" },
  countryHint: { fontSize: "12px", color: "#aaa", marginTop: "6px", fontFamily: "'Poppins', sans-serif" },
  verifyBtn: { width: "100%", padding: "13px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif", marginBottom: "16px" },
  backLink: { textAlign: "center", fontSize: "13px", color: "#2193b0", cursor: "pointer", fontFamily: "'Poppins', sans-serif", display: "block" },
};