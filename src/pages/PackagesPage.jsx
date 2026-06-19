import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  { service: "Price", desc: "–", cols: ["199 AED", "299 AED", "399 AED", "239 AED"], isPrice: true },
  { service: "GP Consultation", desc: "Meet a doctor to review your health", cols: [{ check: true, text: "Included" }, { check: true, text: "Included" }, { check: true, text: "Included" }, { check: true, text: "Included" }] },
  { service: "Oral Health", desc: "Keep your teeth & gums in check", cols: [{ check: false }, { check: false }, { check: true, text: "Included" }, { check: true, text: "Included" }] },
  { service: "Specialist Consultation", desc: "–", cols: [{ check: false }, { check: true, text: "If Referred – 15% Discounted" }, { check: true, text: "If Referred – 30% Discounted" }, { check: false }] },
  { service: "Vital Signs & BMI Assessment", desc: "BP, HR, Temp, SpO2 with AI Diagnostics", cols: [{ check: true, text: "Included" }, { check: true, text: "Included" }, { check: true, text: "Included" }, { check: true, text: "Included" }] },
  { service: "Blood Health", desc: "Feeling Tired? Detect anemia, infections & immunity", cols: [{ check: true, text: "CBC + Iron" }, { check: true, text: "CBC + Iron" }, { check: true, text: "CBC + Iron" }, { check: true, text: "CBC + Iron" }] },
  { service: "Kidney and Liver Health", desc: "Ensure your body's filters are working smoothly", cols: [{ check: true, text: "LFT + RFT" }, { check: true, text: "LFT + RFT" }, { check: true, text: "LFT + RFT" }, { check: true, text: "LFT + RFT" }] },
  { service: "Heart Risk", desc: "Protect your heart & arteries for a healthier life", cols: [{ check: true, text: "Lipid Profile" }, { check: true, text: "Lipid Profile + ECG" }, { check: true, text: "Lipid Profile + ECG" }, { check: true, text: "ECG" }] },
  { service: "Diabetes Screening", desc: "Spot sugar problems early to prevent complications", cols: [{ check: true, text: "Random Sugar" }, { check: true, text: "Fasting Sugar + HbA1c" }, { check: true, text: "Fasting Sugar + HbA1c" }, { check: true, text: "HbA1C" }] },
  { service: "Inflammation Markers", desc: "Detect hidden stress, infection, or inflammation", cols: [{ check: true, text: "CRP + ESR" }, { check: true, text: "CRP + ESR" }, { check: true, text: "CRP + ESR" }, { check: true, text: "CRP" }] },
  { service: "Urine Health", desc: "Simple test to safeguard kidneys & urinary system", cols: [{ check: false }, { check: true, text: "Included" }, { check: true, text: "Included" }, { check: false }] },
  { service: "Thyroid Function", desc: "Balance weight, mood & energy levels", cols: [{ check: false }, { check: true, text: "TSH + T3 + T4" }, { check: true, text: "TSH + T3 + T4" }, { check: false }] },
  { service: "Nerve & Energy Levels", desc: "Check vitamins & minerals for sharper focus & stamina", cols: [{ check: true, text: "Vitamin D" }, { check: true, text: "Vitamin D" }, { check: true, text: "Vitamin D + B12" }, { check: false }] },
  { service: "Electrolyte Balance", desc: "Stay hydrated & keep muscles and nerves strong", cols: [{ check: false }, { check: false }, { check: true, text: "5 Metabolics" }, { check: false }] },
  { service: "Radiology Referral", desc: "Xray, MRI, CT, Ultrasound", cols: [{ check: true, text: "Included" }, { check: true, text: "Extra Discount – 7%" }, { check: true, text: "Extra Discount – 12%" }, { check: true, text: "Extra Discount – 5%" }] },
  { service: "Follow-up Consultation", desc: "–", cols: [{ check: false }, { check: false }, { check: true, text: "Only 50 AED" }, { check: false }] },
  { service: "Priority Appointment", desc: "–", cols: [{ check: false }, { check: false }, { check: true, text: "Included" }, { check: true, text: "Included" }] },
];

// Perfect circle check icon
function CheckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="10" stroke="#27ae60" strokeWidth="1.5" fill="none" />
      <path d="M6.5 11L9.5 14L15.5 8" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Perfect circle cross icon
function CrossIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="10" stroke="#e74c3c" strokeWidth="1.5" fill="none" />
      <path d="M7.5 7.5L14.5 14.5" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" />
      <path d="M14.5 7.5L7.5 14.5" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

export default function PackagesPage() {
  const navigate = useNavigate();

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#fff" }}>
      <Navbar />
      <div style={styles.page}>
        <h2 style={styles.pageTitle}>Service Package Details</h2>
        <div style={styles.tableContainer}>
          <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.thService}>SERVICE</th>
                <th style={styles.thDesc}>DESCRIPTION</th>
                <th style={styles.th}>STAY ESSENTIALLY<br />SMART</th>
                <th style={styles.th}>STAY TOTALLY SMART</th>
                <th style={styles.th}>STAY EXCEPTIONALLY<br />SMART</th>
                <th style={styles.th}>TRAVEL SMART</th>
              </tr>
            </thead>
            <tbody>
              {services.map((row, rowIdx) => (
                <tr key={rowIdx} style={styles.tr}
                  onMouseEnter={(e) => { if (!row.isPrice) e.currentTarget.style.backgroundColor = "#f0f8ff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = rowIdx % 2 === 0 ? "#fff" : "#fafafa"; }}
                >
                  <td style={styles.tdService}>{row.service}</td>
                  <td style={styles.tdDesc}>{row.desc}</td>
                  {row.isPrice ? (
                    row.cols.map((price, i) => (
                      <td key={i} style={styles.tdPrice}>{price}</td>
                    ))
                  ) : (
                    row.cols.map((col, i) => (
                      <td key={i} style={styles.td}>
                        {col.check ? (
                          <div style={styles.checkCell}>
                            <CheckIcon />
                            {col.text && <span style={styles.cellText}>{col.text}</span>}
                          </div>
                        ) : (
                          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <CrossIcon />
                          </div>
                        )}
                      </td>
                    ))
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={styles.bookBtnRow}>
          <button
            style={styles.bookBtn}
            onClick={() => navigate("/book-appointment")}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#1a7a9a"; e.currentTarget.style.transform = "translateY(-2px)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#2193b0"; e.currentTarget.style.transform = "translateY(0)"; }}
          >
            Book Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { maxWidth: "1200px", margin: "0 auto", padding: "40px 30px 60px" },
  pageTitle: { fontSize: "22px", fontWeight: "700", color: "#1a1a2e", marginBottom: "24px", fontFamily: "'Poppins', sans-serif" },
  tableContainer: { overflowX: "auto", border: "1px solid #e0e0e0", borderRadius: "4px" },
  table: { width: "100%", borderCollapse: "collapse", minWidth: "900px" },
  thService: { padding: "14px 16px", backgroundColor: "#2193b0", color: "#fff", textAlign: "left", fontSize: "11px", fontWeight: "700", letterSpacing: "0.8px", fontFamily: "'Poppins', sans-serif", width: "160px", borderRight: "1px solid rgba(255,255,255,0.2)" },
  thDesc: { padding: "14px 16px", backgroundColor: "#2193b0", color: "#fff", textAlign: "left", fontSize: "11px", fontWeight: "700", letterSpacing: "0.8px", fontFamily: "'Poppins', sans-serif", width: "220px", borderRight: "1px solid rgba(255,255,255,0.2)" },
  th: { padding: "14px 12px", backgroundColor: "#2193b0", color: "#fff", textAlign: "center", fontSize: "11px", fontWeight: "700", letterSpacing: "0.8px", fontFamily: "'Poppins', sans-serif", lineHeight: 1.5, borderRight: "1px solid rgba(255,255,255,0.2)" },
  tr: { borderBottom: "1px solid #ebebeb", backgroundColor: "#fff", transition: "background-color 0.15s" },
  tdService: { padding: "14px 16px", fontSize: "13px", fontWeight: "600", color: "#222", borderRight: "1px solid #ebebeb", fontFamily: "'Poppins', sans-serif", verticalAlign: "middle" },
  tdDesc: { padding: "14px 16px", fontSize: "13px", color: "#555", borderRight: "1px solid #ebebeb", fontFamily: "'Poppins', sans-serif", lineHeight: 1.5, verticalAlign: "middle" },
  td: { padding: "14px 12px", textAlign: "center", borderRight: "1px solid #ebebeb", verticalAlign: "middle" },
  tdPrice: { padding: "14px 12px", textAlign: "center", fontSize: "14px", fontWeight: "600", color: "#333", borderRight: "1px solid #ebebeb", fontFamily: "'Poppins', sans-serif", verticalAlign: "middle" },
  checkCell: { display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" },
  cellText: { fontSize: "11px", color: "#444", fontFamily: "'Poppins', sans-serif", textAlign: "center", lineHeight: 1.4, maxWidth: "110px" },
  bookBtnRow: { display: "flex", justifyContent: "flex-end", marginTop: "20px" },
  bookBtn: { padding: "13px 50px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "6px", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif", transition: "all 0.2s" },
};