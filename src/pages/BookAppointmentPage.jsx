import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  { num: 1, label: "Dept & Doctor" },
  { num: 2, label: "Date & Time" },
  { num: 3, label: "Patient Info" },
  { num: 4, label: "Review" },
];

export default function BookAppointmentPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [location, setLocation] = useState("In Clinic");
  const [selectedDept, setSelectedDept] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [departments, setDepartments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [loadingDepts, setLoadingDepts] = useState(true);
  const [loadingDoctors, setLoadingDoctors] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientInfo, setPatientInfo] = useState({ firstName:"", lastName:"", phone:"", email:"", notes:"" });

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const q = query(collection(db, "departments"), orderBy("created_at", "desc"));
        const snap = await getDocs(q);
        setDepartments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.error(err); }
      finally { setLoadingDepts(false); }
    };
    fetchDepts();
  }, []);

  useEffect(() => {
    if (!selectedDept) { setDoctors([]); setSelectedDoctor(""); return; }
    const fetchDoctors = async () => {
      setLoadingDoctors(true);
      try {
        const q = query(collection(db, "doctors"), where("departmentId", "==", selectedDept));
        const snap = await getDocs(q);
        setDoctors(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.error(err); }
      finally { setLoadingDoctors(false); }
    };
    fetchDoctors();
    setSelectedDoctor("");
  }, [selectedDept]);

  const getTimeSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor?.schedule) return [];
    const dayName = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" });
    const slot = doctor.schedule.find(s => s.day === dayName && s.status === "Enable");
    if (!slot?.startTime || !slot?.endTime) return [];
    const times = [];
    const [startH, startM] = slot.startTime.split(":").map(Number);
    const [endH, endM] = slot.endTime.split(":").map(Number);
    let current = startH * 60 + startM;
    const end = endH * 60 + endM;
    while (current < end) {
      const h = Math.floor(current / 60);
      const m = current % 60;
      const ampm = h >= 12 ? "PM" : "AM";
      const displayH = h > 12 ? h - 12 : h === 0 ? 12 : h;
      times.push(`${displayH}:${m.toString().padStart(2, "0")} ${ampm}`);
      current += 30;
    }
    return times;
  };

  const timeSlots = getTimeSlots();
  const selectedDoctorObj = doctors.find(d => d.id === selectedDoctor);
  const selectedDeptObj = departments.find(d => d.id === selectedDept);
  const canStep1 = selectedDept && selectedDoctor;
  const canStep2 = selectedDate && selectedTime;
  const canStep3 = patientInfo.firstName && patientInfo.lastName && patientInfo.phone && patientInfo.email;

  const bookingTabs = ["Book a Doctor", "Book a Package", "Book Lab/IV"];

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif", background:"#fff" }}>
      <style>{`
        .bk-page { max-width:900px; margin:0 auto; padding:40px 30px 60px; }
        .bk-steps { display:flex; align-items:center; margin-bottom:32px; gap:4px; overflow-x:auto; padding-bottom:4px; }
        .bk-step-item { display:flex; align-items:center; gap:6px; flex-shrink:0; }
        .bk-step-circle { width:30px; height:30px; border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; font-family:'Poppins',sans-serif; flex-shrink:0; }
        .bk-step-label { font-size:12px; font-family:'Poppins',sans-serif; white-space:nowrap; }
        .bk-step-line { width:32px; height:2px; border-radius:2px; flex-shrink:0; }
        .bk-card { border:1px solid #e0e0e0; border-radius:8px; overflow:hidden; }
        .bk-tabs { display:flex; border-bottom:1px solid #e0e0e0; overflow-x:auto; }
        .bk-tab { flex:1; min-width:120px; padding:14px 12px; border:none; background:#f8fafc; font-size:12px; font-weight:500; cursor:pointer; font-family:'Poppins',sans-serif; color:#666; border-right:1px solid #e0e0e0; transition:all 0.2s; white-space:nowrap; }
        .bk-tab:last-child { border-right:none; }
        .bk-tab-active { background:#fff; color:#1a1a2e; font-weight:600; border-bottom:2px solid #2193b0; }
        .bk-body { padding:28px; }
        .bk-step-title { font-size:20px; font-weight:700; color:#1a1a2e; margin-bottom:6px; font-family:'Poppins',sans-serif; }
        .bk-step-desc { font-size:14px; color:#888; margin-bottom:24px; font-family:'Poppins',sans-serif; }
        .bk-field { margin-bottom:20px; }
        .bk-label { display:block; font-size:13px; font-weight:500; color:#555; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .bk-radio-row { display:flex; gap:20px; flex-wrap:wrap; }
        .bk-radio-lbl { display:flex; align-items:center; gap:6px; cursor:pointer; font-size:14px; color:#444; font-family:'Poppins',sans-serif; }
        .bk-select { width:100%; padding:12px 14px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:14px; outline:none; background:#f8fafc; font-family:'Poppins',sans-serif; color:#333; cursor:pointer; }
        .bk-input { width:100%; padding:12px 14px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:14px; box-sizing:border-box; outline:none; background:#f8fafc; font-family:'Poppins',sans-serif; color:#333; }
        .bk-textarea { width:100%; padding:12px 14px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:14px; box-sizing:border-box; outline:none; background:#f8fafc; font-family:'Poppins',sans-serif; color:#333; resize:vertical; }
        .bk-row2 { display:flex; gap:16px; }
        .bk-doctors-grid { display:flex; flex-direction:column; gap:12px; }
        .bk-doctor-card { display:flex; align-items:center; gap:14px; padding:14px 16px; border-radius:10px; cursor:pointer; transition:all 0.2s; position:relative; border:2px solid #eee; }
        .bk-doctor-card.selected { border-color:#2193b0; background:#eef6fb; }
        .bk-doctor-avatar { width:48px; height:48px; border-radius:50%; background:#2193b0; display:flex; align-items:center; justify-content:center; color:#fff; font-size:18px; font-weight:700; flex-shrink:0; font-family:'Poppins',sans-serif; }
        .bk-doctor-name { font-size:15px; font-weight:600; color:#1a1a2e; margin:0 0 4px; font-family:'Poppins',sans-serif; }
        .bk-doctor-spec { font-size:13px; color:#2193b0; margin:0 0 6px; font-family:'Poppins',sans-serif; }
        .bk-avail-days { display:flex; gap:4px; flex-wrap:wrap; }
        .bk-avail-day { background:#eef6fb; color:#2193b0; padding:2px 8px; border-radius:4px; font-size:11px; font-weight:600; font-family:'Poppins',sans-serif; }
        .bk-selected-check { width:24px; height:24px; border-radius:50%; background:#2193b0; color:#fff; display:flex; align-items:center; justify-content:center; font-size:13px; font-weight:700; flex-shrink:0; }
        .bk-times-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(100px,1fr)); gap:8px; }
        .bk-time-slot { padding:10px 8px; border:1.5px solid #e0e0e0; border-radius:8px; font-size:12px; font-weight:500; cursor:pointer; font-family:'Poppins',sans-serif; color:#555; background:#f8fafc; transition:all 0.2s; }
        .bk-time-slot.active { background:#2193b0; color:#fff; border-color:#2193b0; }
        .bk-summary-box { background:#f8fafc; border-radius:10px; padding:20px; margin-bottom:20px; border:1px solid #eee; }
        .bk-summary-title { font-size:15px; font-weight:600; color:#1a1a2e; margin-bottom:16px; font-family:'Poppins',sans-serif; }
        .bk-summary-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        .bk-summary-item { display:flex; flex-direction:column; gap:4px; }
        .bk-summary-label { font-size:11px; color:#aaa; font-weight:600; text-transform:uppercase; font-family:'Poppins',sans-serif; }
        .bk-summary-value { font-size:14px; color:#333; font-weight:500; font-family:'Poppins',sans-serif; }
        .bk-pay-note { display:flex; gap:14px; align-items:flex-start; background:#eef6fb; border-radius:10px; padding:16px; margin-bottom:24px; border:1px solid #c0dff0; }
        .bk-pay-title { font-size:14px; font-weight:600; color:#1a1a2e; margin:0 0 4px; font-family:'Poppins',sans-serif; }
        .bk-pay-desc { font-size:13px; color:#666; margin:0; font-family:'Poppins',sans-serif; }
        .bk-btn-row { display:flex; justify-content:space-between; align-items:center; margin-top:8px; flex-wrap:wrap; gap:10px; }
        .bk-back-btn { padding:11px 24px; background:#f0f0f0; color:#555; border:none; border-radius:8px; font-size:14px; font-weight:500; cursor:pointer; font-family:'Poppins',sans-serif; }
        .bk-continue-btn { padding:11px 28px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .bk-confirm-btn { padding:11px 28px; background:#27ae60; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }

        @media (max-width:700px) {
          .bk-page { padding:24px 16px 40px; }
          .bk-body { padding:18px 16px; }
          .bk-step-title { font-size:17px; }
          .bk-row2 { flex-direction:column; gap:0; }
          .bk-summary-grid { grid-template-columns:1fr; }
          .bk-times-grid { grid-template-columns:repeat(auto-fill,minmax(80px,1fr)); }
          .bk-step-label { display:none; }
        }
      `}</style>

      <Navbar />
      <div className="bk-page">

        {/* Steps */}
        <div className="bk-steps">
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div className="bk-step-item">
                <div className="bk-step-circle" style={{ background: currentStep >= step.num ? "#2193b0" : "#e0e0e0", color: currentStep >= step.num ? "#fff" : "#999" }}>
                  {currentStep > step.num ? "✓" : step.num}
                </div>
                <span className="bk-step-label" style={{ color: currentStep === step.num ? "#2193b0" : currentStep > step.num ? "#555" : "#aaa", fontWeight: currentStep === step.num ? "600" : "400" }}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && <div className="bk-step-line" style={{ background: currentStep > step.num ? "#2193b0" : "#e0e0e0" }}/>}
            </React.Fragment>
          ))}
        </div>

        <div className="bk-card">

          {/* STEP 1 */}
          {currentStep === 1 && (
            <>
              <div className="bk-tabs">
                {bookingTabs.map((tab, i) => (
                  <button key={i} className={`bk-tab ${activeTab === i ? "bk-tab-active" : ""}`} onClick={() => setActiveTab(i)}>{tab}</button>
                ))}
              </div>
              <div className="bk-body">
                <h3 className="bk-step-title">Select Department & Doctor</h3>
                <p className="bk-step-desc">Choose the department and doctor for your appointment</p>
                <div className="bk-field">
                  <label className="bk-label">Choose Location</label>
                  <div className="bk-radio-row">
                    {["In Clinic", "Telemedicine", "At Home"].map(loc => (
                      <label key={loc} className="bk-radio-lbl">
                        <input type="radio" name="location" value={loc} checked={location === loc} onChange={() => setLocation(loc)} style={{accentColor:"#2193b0"}}/>
                        {loc}
                      </label>
                    ))}
                  </div>
                </div>
                <div className="bk-field">
                  <label className="bk-label">Department</label>
                  <select className="bk-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                    <option value="">Select a department</option>
                    {loadingDepts ? <option disabled>Loading...</option> : departments.map(d => <option key={d.id} value={d.id}>{d.name}</option>)}
                  </select>
                </div>
                {selectedDept && (
                  <div className="bk-field">
                    <label className="bk-label">Select Doctor</label>
                    {loadingDoctors ? <p style={{color:"#888",fontSize:"14px",fontFamily:"'Poppins',sans-serif"}}>Loading doctors...</p>
                    : doctors.length === 0 ? <p style={{color:"#aaa",fontSize:"14px",fontFamily:"'Poppins',sans-serif"}}>No doctors available for this department.</p>
                    : (
                      <div className="bk-doctors-grid">
                        {doctors.map(doctor => (
                          <div key={doctor.id} className={`bk-doctor-card ${selectedDoctor === doctor.id ? "selected" : ""}`} onClick={() => setSelectedDoctor(doctor.id)}>
                            <div className="bk-doctor-avatar">{doctor.fullName?.charAt(0) || "D"}</div>
                            <div style={{flex:1}}>
                              <p className="bk-doctor-name">Dr. {doctor.fullName}</p>
                              <p className="bk-doctor-spec">{doctor.specialization || "General"}</p>
                              <div className="bk-avail-days">
                                {doctor.schedule?.filter(s => s.status === "Enable").map(s => (
                                  <span key={s.day} className="bk-avail-day">{s.day.slice(0,3)}</span>
                                ))}
                              </div>
                            </div>
                            {selectedDoctor === doctor.id && <div className="bk-selected-check">✓</div>}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                <div className="bk-btn-row">
                  <div/>
                  <button className="bk-continue-btn" style={{opacity: canStep1 ? 1 : 0.5, cursor: canStep1 ? "pointer" : "not-allowed"}} onClick={() => canStep1 && setCurrentStep(2)}>Continue →</button>
                </div>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {currentStep === 2 && (
            <div className="bk-body">
              <h3 className="bk-step-title">Choose Date & Time</h3>
              <p className="bk-step-desc">Booking with <strong>Dr. {selectedDoctorObj?.fullName}</strong> — {selectedDeptObj?.name}</p>
              <div className="bk-field">
                <label className="bk-label">Select Date</label>
                <input className="bk-input" type="date" value={selectedDate} min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }}/>
              </div>
              {selectedDate && (
                <div className="bk-field">
                  <label className="bk-label">Available Time Slots</label>
                  {timeSlots.length === 0
                    ? <p style={{color:"#e05c5c",fontSize:"14px",fontFamily:"'Poppins',sans-serif"}}>Doctor is not available on this day. Please select another date.</p>
                    : <div className="bk-times-grid">
                        {timeSlots.map(time => (
                          <button key={time} className={`bk-time-slot ${selectedTime === time ? "active" : ""}`} onClick={() => setSelectedTime(time)}>{time}</button>
                        ))}
                      </div>
                  }
                </div>
              )}
              <div className="bk-btn-row">
                <button className="bk-back-btn" onClick={() => setCurrentStep(1)}>← Back</button>
                <button className="bk-continue-btn" style={{opacity: canStep2 ? 1 : 0.5, cursor: canStep2 ? "pointer" : "not-allowed"}} onClick={() => canStep2 && setCurrentStep(3)}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {currentStep === 3 && (
            <div className="bk-body">
              <h3 className="bk-step-title">Patient Information</h3>
              <p className="bk-step-desc">Please provide your details for the appointment</p>
              <div className="bk-row2">
                <div className="bk-field" style={{flex:1}}>
                  <label className="bk-label">First Name *</label>
                  <input className="bk-input" type="text" placeholder="First name" value={patientInfo.firstName} onChange={(e) => setPatientInfo({...patientInfo, firstName: e.target.value})}/>
                </div>
                <div className="bk-field" style={{flex:1}}>
                  <label className="bk-label">Last Name *</label>
                  <input className="bk-input" type="text" placeholder="Last name" value={patientInfo.lastName} onChange={(e) => setPatientInfo({...patientInfo, lastName: e.target.value})}/>
                </div>
              </div>
              <div className="bk-row2">
                <div className="bk-field" style={{flex:1}}>
                  <label className="bk-label">Phone Number *</label>
                  <input className="bk-input" type="tel" placeholder="+971 XX XXX XXXX" value={patientInfo.phone} onChange={(e) => setPatientInfo({...patientInfo, phone: e.target.value})}/>
                </div>
                <div className="bk-field" style={{flex:1}}>
                  <label className="bk-label">Email Address *</label>
                  <input className="bk-input" type="email" placeholder="your@email.com" value={patientInfo.email} onChange={(e) => setPatientInfo({...patientInfo, email: e.target.value})}/>
                </div>
              </div>
              <div className="bk-field">
                <label className="bk-label">Additional Notes</label>
                <textarea className="bk-textarea" rows={4} placeholder="Any additional information..." value={patientInfo.notes} onChange={(e) => setPatientInfo({...patientInfo, notes: e.target.value})}/>
              </div>
              <div className="bk-btn-row">
                <button className="bk-back-btn" onClick={() => setCurrentStep(2)}>← Back</button>
                <button className="bk-continue-btn" style={{opacity: canStep3 ? 1 : 0.5, cursor: canStep3 ? "pointer" : "not-allowed"}} onClick={() => canStep3 && setCurrentStep(4)}>Continue →</button>
              </div>
            </div>
          )}

          {/* STEP 4 */}
          {currentStep === 4 && (
            <div className="bk-body">
              <h3 className="bk-step-title">Review & Confirm</h3>
              <p className="bk-step-desc">Review your appointment details before confirming</p>
              <div className="bk-summary-box">
                <h4 className="bk-summary-title">Appointment Summary</h4>
                <div className="bk-summary-grid">
                  {[
                    {label:"Department", value: selectedDeptObj?.name || selectedDept},
                    {label:"Doctor", value: `Dr. ${selectedDoctorObj?.fullName || ""}`},
                    {label:"Specialization", value: selectedDoctorObj?.specialization || "—"},
                    {label:"Location", value: location},
                    {label:"Date", value: selectedDate},
                    {label:"Time", value: selectedTime},
                    {label:"Patient", value: `${patientInfo.firstName} ${patientInfo.lastName}`},
                    {label:"Phone", value: patientInfo.phone},
                    {label:"Email", value: patientInfo.email},
                  ].map((item, i) => (
                    <div key={i} className="bk-summary-item">
                      <span className="bk-summary-label">{item.label}</span>
                      <span className="bk-summary-value">{item.value}</span>
                    </div>
                  ))}
                  {patientInfo.notes && (
                    <div className="bk-summary-item" style={{gridColumn:"1/-1"}}>
                      <span className="bk-summary-label">Notes</span>
                      <span className="bk-summary-value">{patientInfo.notes}</span>
                    </div>
                  )}
                </div>
              </div>
              <div className="bk-pay-note">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
                <div>
                  <p className="bk-pay-title">Payment at Clinic</p>
                  <p className="bk-pay-desc">Payment will be collected at the clinic upon your visit.</p>
                </div>
              </div>
              <div className="bk-btn-row">
                <button className="bk-back-btn" onClick={() => setCurrentStep(3)}>← Back</button>
                <button className="bk-confirm-btn" onClick={() => { alert("✅ Appointment booked successfully!"); navigate("/dashboard"); }}>Confirm Appointment ✓</button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}