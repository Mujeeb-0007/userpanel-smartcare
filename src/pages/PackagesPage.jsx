import React from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const services = [
  { service:"Price", desc:"–", cols:["199 AED","299 AED","399 AED","239 AED"], isPrice:true },
  { service:"GP Consultation", desc:"Meet a doctor to review your health", cols:[{c:true,t:"Included"},{c:true,t:"Included"},{c:true,t:"Included"},{c:true,t:"Included"}] },
  { service:"Oral Health", desc:"Keep your teeth & gums in check", cols:[{c:false},{c:false},{c:true,t:"Included"},{c:true,t:"Included"}] },
  { service:"Specialist Consultation", desc:"–", cols:[{c:false},{c:true,t:"If Referred – 15% Discounted"},{c:true,t:"If Referred – 30% Discounted"},{c:false}] },
  { service:"Vital Signs & BMI", desc:"BP, HR, Temp, SpO2 with AI Diagnostics", cols:[{c:true,t:"Included"},{c:true,t:"Included"},{c:true,t:"Included"},{c:true,t:"Included"}] },
  { service:"Blood Health", desc:"Detect anemia, infections & immunity", cols:[{c:true,t:"CBC + Iron"},{c:true,t:"CBC + Iron"},{c:true,t:"CBC + Iron"},{c:true,t:"CBC + Iron"}] },
  { service:"Kidney & Liver Health", desc:"Ensure your body's filters work smoothly", cols:[{c:true,t:"LFT + RFT"},{c:true,t:"LFT + RFT"},{c:true,t:"LFT + RFT"},{c:true,t:"LFT + RFT"}] },
  { service:"Heart Risk", desc:"Protect your heart & arteries", cols:[{c:true,t:"Lipid Profile"},{c:true,t:"Lipid Profile + ECG"},{c:true,t:"Lipid Profile + ECG"},{c:true,t:"ECG"}] },
  { service:"Diabetes Screening", desc:"Spot sugar problems early", cols:[{c:true,t:"Random Sugar"},{c:true,t:"Fasting Sugar + HbA1c"},{c:true,t:"Fasting Sugar + HbA1c"},{c:true,t:"HbA1C"}] },
  { service:"Inflammation Markers", desc:"Detect hidden stress or infection", cols:[{c:true,t:"CRP + ESR"},{c:true,t:"CRP + ESR"},{c:true,t:"CRP + ESR"},{c:true,t:"CRP"}] },
  { service:"Urine Health", desc:"Safeguard kidneys & urinary system", cols:[{c:false},{c:true,t:"Included"},{c:true,t:"Included"},{c:false}] },
  { service:"Thyroid Function", desc:"Balance weight, mood & energy", cols:[{c:false},{c:true,t:"TSH + T3 + T4"},{c:true,t:"TSH + T3 + T4"},{c:false}] },
  { service:"Nerve & Energy", desc:"Check vitamins & minerals", cols:[{c:true,t:"Vitamin D"},{c:true,t:"Vitamin D"},{c:true,t:"Vitamin D + B12"},{c:false}] },
  { service:"Electrolyte Balance", desc:"Stay hydrated & keep muscles strong", cols:[{c:false},{c:false},{c:true,t:"5 Metabolics"},{c:false}] },
  { service:"Radiology Referral", desc:"Xray, MRI, CT, Ultrasound", cols:[{c:true,t:"Included"},{c:true,t:"Extra Discount – 7%"},{c:true,t:"Extra Discount – 12%"},{c:true,t:"Extra Discount – 5%"}] },
  { service:"Follow-up Consultation", desc:"–", cols:[{c:false},{c:false},{c:true,t:"Only 50 AED"},{c:false}] },
  { service:"Priority Appointment", desc:"–", cols:[{c:false},{c:false},{c:true,t:"Included"},{c:true,t:"Included"}] },
];

function CheckIcon() {
  return <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#27ae60" strokeWidth="1.5"/><path d="M6.5 11L9.5 14L15.5 8" stroke="#27ae60" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function CrossIcon() {
  return <svg width="20" height="20" viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="10" stroke="#e74c3c" strokeWidth="1.5"/><path d="M7.5 7.5L14.5 14.5" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/><path d="M14.5 7.5L7.5 14.5" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round"/></svg>;
}

export default function PackagesPage() {
  const navigate = useNavigate();
  return (
    <div style={{ fontFamily:"'Poppins',sans-serif", background:"#f8fafc", minHeight:"100vh" }}>
      <style>{`
        .pk-page { max-width:1200px; margin:0 auto; padding:36px 24px 56px; }
        .pk-header { margin-bottom:8px; }
        .pk-title { font-size:20px; font-weight:700; color:#1a1a2e; font-family:'Poppins',sans-serif; }
        .pk-scroll-hint { font-size:12px; color:#888; margin-bottom:10px; font-family:'Poppins',sans-serif; display:none; }
        .pk-table-wrap { overflow-x:auto; border:1px solid #e0e0e0; border-radius:8px; -webkit-overflow-scrolling:touch; background:#fff; box-shadow:0 2px 10px rgba(0,0,0,0.06); }
        .pk-table { width:100%; border-collapse:collapse; min-width:820px; }
        .pk-th-service { padding:13px 14px; background:#2193b0; color:#fff; text-align:left; font-size:10px; font-weight:700; letter-spacing:0.8px; font-family:'Poppins',sans-serif; width:140px; border-right:1px solid rgba(255,255,255,0.2); }
        .pk-th-desc { padding:13px 14px; background:#2193b0; color:#fff; text-align:left; font-size:10px; font-weight:700; letter-spacing:0.8px; font-family:'Poppins',sans-serif; width:180px; border-right:1px solid rgba(255,255,255,0.2); }
        .pk-th { padding:13px 10px; background:#2193b0; color:#fff; text-align:center; font-size:10px; font-weight:700; letter-spacing:0.5px; font-family:'Poppins',sans-serif; line-height:1.4; border-right:1px solid rgba(255,255,255,0.2); }
        .pk-tr { border-bottom:1px solid #ebebeb; background:#fff; transition:background 0.15s; }
        .pk-tr:hover { background:#f0f8ff; }
        .pk-td-service { padding:13px 14px; font-size:12px; font-weight:600; color:#222; border-right:1px solid #ebebeb; font-family:'Poppins',sans-serif; vertical-align:middle; }
        .pk-td-desc { padding:13px 14px; font-size:12px; color:#555; border-right:1px solid #ebebeb; font-family:'Poppins',sans-serif; line-height:1.5; vertical-align:middle; }
        .pk-td { padding:12px 10px; text-align:center; border-right:1px solid #ebebeb; vertical-align:middle; }
        .pk-td-price { padding:12px 10px; text-align:center; font-size:13px; font-weight:700; color:#2193b0; border-right:1px solid #ebebeb; font-family:'Poppins',sans-serif; vertical-align:middle; }
        .pk-check-cell { display:flex; flex-direction:column; align-items:center; gap:3px; }
        .pk-cell-text { font-size:10px; color:#444; font-family:'Poppins',sans-serif; text-align:center; line-height:1.4; max-width:100px; }
        .pk-btn-row { display:flex; justify-content:flex-end; margin-top:18px; }
        .pk-book-btn { padding:12px 44px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; transition:all 0.2s; }
        .pk-book-btn:hover { background:#1a7a9a; transform:translateY(-2px); }
        @media (max-width:768px) {
          .pk-page { padding:24px 16px 40px; }
          .pk-scroll-hint { display:block; }
          .pk-btn-row { justify-content:center; }
          .pk-book-btn { width:100%; max-width:300px; }
        }
        @media (max-width:480px) {
          .pk-page { padding:18px 12px 32px; }
          .pk-title { font-size:16px; }
        }
      `}</style>
      <Navbar />
      <div className="pk-page">
        <div className="pk-header">
          <h2 className="pk-title">Service Package Details</h2>
        </div>
        <p className="pk-scroll-hint">← Scroll horizontally to see all packages →</p>
        <div className="pk-table-wrap">
          <table className="pk-table">
            <thead>
              <tr>
                <th className="pk-th-service">SERVICE</th>
                <th className="pk-th-desc">DESCRIPTION</th>
                <th className="pk-th">STAY ESSENTIALLY SMART</th>
                <th className="pk-th">STAY TOTALLY SMART</th>
                <th className="pk-th">STAY EXCEPTIONALLY SMART</th>
                <th className="pk-th">TRAVEL SMART</th>
              </tr>
            </thead>
            <tbody>
              {services.map((row, rowIdx) => (
                <tr key={rowIdx} className="pk-tr">
                  <td className="pk-td-service">{row.service}</td>
                  <td className="pk-td-desc">{row.desc}</td>
                  {row.isPrice
                    ? row.cols.map((price, i) => <td key={i} className="pk-td-price">{price}</td>)
                    : row.cols.map((col, i) => (
                        <td key={i} className="pk-td">
                          {col.c ? (
                            <div className="pk-check-cell">
                              <CheckIcon/>
                              {col.t && <span className="pk-cell-text">{col.t}</span>}
                            </div>
                          ) : (
                            <div style={{ display:"flex", justifyContent:"center" }}><CrossIcon/></div>
                          )}
                        </td>
                      ))
                  }
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pk-btn-row">
          <button className="pk-book-btn" onClick={() => navigate("/book-appointment")}>Book Now</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}