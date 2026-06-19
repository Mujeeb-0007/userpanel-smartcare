import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { db } from "../firebase";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const steps = [
  { num: 1, label: "Select Department & Doctor" },
  { num: 2, label: "Choose Date & Time" },
  { num: 3, label: "Patient Information" },
  { num: 4, label: "Review & Payment" },
];

const bookingTabs = ["Book a Doctor", "Book a Health Package", "Book Lab Services/IV infusion"];

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
  const [patientInfo, setPatientInfo] = useState({ firstName: "", lastName: "", phone: "", email: "", notes: "" });

  // Fetch departments
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

  // Fetch doctors when department changes
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

  // Get available time slots for selected doctor
  const getTimeSlots = () => {
    if (!selectedDoctor || !selectedDate) return [];
    const doctor = doctors.find(d => d.id === selectedDoctor);
    if (!doctor?.schedule) return [];
    const dayName = new Date(selectedDate).toLocaleDateString("en-US", { weekday: "long" });
    const slot = doctor.schedule.find(s => s.day === dayName && s.status === "Enable");
    if (!slot || !slot.startTime || !slot.endTime) return [];

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

  const canContinueStep1 = selectedDept !== "" && selectedDoctor !== "";
  const canContinueStep2 = selectedDate !== "" && selectedTime !== "";
  const canContinueStep3 = patientInfo.firstName && patientInfo.lastName && patientInfo.phone && patientInfo.email;

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif", backgroundColor: "#fff" }}>
      <Navbar />
      <div style={styles.page}>

        {/* Steps */}
        <div style={styles.stepsRow}>
          {steps.map((step, idx) => (
            <React.Fragment key={step.num}>
              <div style={styles.stepItem}>
                <div style={{ ...styles.stepCircle, backgroundColor: currentStep >= step.num ? "#2193b0" : "#e0e0e0", color: currentStep >= step.num ? "#fff" : "#999" }}>
                  {currentStep > step.num ? "✓" : step.num}
                </div>
                <span style={{ ...styles.stepLabel, color: currentStep === step.num ? "#2193b0" : currentStep > step.num ? "#555" : "#aaa", fontWeight: currentStep === step.num ? "600" : "400" }}>
                  {step.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div style={{ ...styles.stepLine, backgroundColor: currentStep > step.num ? "#2193b0" : "#e0e0e0" }} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div style={styles.card}>

          {/* ===== STEP 1 ===== */}
          {currentStep === 1 && (
            <>
              <div style={styles.tabsRow}>
                {bookingTabs.map((tab, i) => (
                  <button key={i} style={{ ...styles.tabBtn, ...(activeTab === i ? styles.tabBtnActive : {}) }} onClick={() => setActiveTab(i)}>
                    {tab}
                  </button>
                ))}
              </div>
              <div style={styles.cardBody}>
                <h3 style={styles.stepTitle}>Select Department & Doctor</h3>
                <p style={styles.stepDesc}>Choose the department and doctor for your appointment</p>

                {/* Location */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Choose Location</label>
                  <div style={styles.radioRow}>
                    {["In Clinic", "Telemedicine", "At Home"].map((loc) => (
                      <label key={loc} style={styles.radioLabel}>
                        <input type="radio" name="location" value={loc} checked={location === loc} onChange={() => setLocation(loc)} style={{ accentColor: "#2193b0" }} />
                        <span style={styles.radioText}>{loc}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Department */}
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Department</label>
                  <select style={styles.select} value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
                    <option value="">Select a department</option>
                    {loadingDepts ? <option disabled>Loading...</option> : (
                      departments.map(dept => <option key={dept.id} value={dept.id}>{dept.name}</option>)
                    )}
                  </select>
                </div>

                {/* Doctor Selection */}
                {selectedDept && (
                  <div style={styles.fieldGroup}>
                    <label style={styles.fieldLabel}>Select Doctor</label>
                    {loadingDoctors ? (
                      <p style={{ color: "#888", fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}>Loading doctors...</p>
                    ) : doctors.length === 0 ? (
                      <p style={{ color: "#aaa", fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}>No doctors available for this department.</p>
                    ) : (
                      <div style={styles.doctorsGrid}>
                        {doctors.map((doctor) => (
                          <div
                            key={doctor.id}
                            style={{
                              ...styles.doctorCard,
                              border: selectedDoctor === doctor.id ? "2px solid #2193b0" : "2px solid #eee",
                              backgroundColor: selectedDoctor === doctor.id ? "#eef6fb" : "#fff",
                            }}
                            onClick={() => setSelectedDoctor(doctor.id)}
                          >
                            <div style={styles.doctorAvatar}>
                              {doctor.fullName?.charAt(0) || "D"}
                            </div>
                            <div style={styles.doctorInfo}>
                              <p style={styles.doctorName}>Dr. {doctor.fullName}</p>
                              <p style={styles.doctorSpec}>{doctor.specialization || "General"}</p>
                              <div style={styles.availDays}>
                                {doctor.schedule?.filter(s => s.status === "Enable").map(s => (
                                  <span key={s.day} style={styles.availDay}>{s.day.slice(0, 3)}</span>
                                ))}
                              </div>
                            </div>
                            {selectedDoctor === doctor.id && (
                              <div style={styles.selectedCheck}>✓</div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                <div style={styles.btnRow}>
                  <div />
                  <button style={{ ...styles.continueBtn, opacity: canContinueStep1 ? 1 : 0.5, cursor: canContinueStep1 ? "pointer" : "not-allowed" }}
                    onClick={() => canContinueStep1 && setCurrentStep(2)}>
                    Continue →
                  </button>
                </div>
              </div>
            </>
          )}

          {/* ===== STEP 2 ===== */}
          {currentStep === 2 && (
            <div style={styles.cardBody}>
              <h3 style={styles.stepTitle}>Choose Date & Time</h3>
              <p style={styles.stepDesc}>
                Booking with <strong>Dr. {selectedDoctorObj?.fullName}</strong> — {selectedDeptObj?.name}
              </p>

              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Select Date</label>
                <input style={styles.input} type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split("T")[0]}
                  onChange={(e) => { setSelectedDate(e.target.value); setSelectedTime(""); }} />
              </div>

              {selectedDate && (
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Available Time Slots</label>
                  {timeSlots.length === 0 ? (
                    <p style={{ color: "#e05c5c", fontSize: "14px", fontFamily: "'Poppins', sans-serif" }}>
                      Doctor is not available on this day. Please select another date.
                    </p>
                  ) : (
                    <div style={styles.timeSlotsGrid}>
                      {timeSlots.map((time) => (
                        <button key={time} style={{ ...styles.timeSlot, ...(selectedTime === time ? styles.timeSlotActive : {}) }}
                          onClick={() => setSelectedTime(time)}>
                          {time}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              <div style={styles.btnRow}>
                <button style={styles.backBtn} onClick={() => setCurrentStep(1)}>← Back</button>
                <button style={{ ...styles.continueBtn, opacity: canContinueStep2 ? 1 : 0.5, cursor: canContinueStep2 ? "pointer" : "not-allowed" }}
                  onClick={() => canContinueStep2 && setCurrentStep(3)}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 3 ===== */}
          {currentStep === 3 && (
            <div style={styles.cardBody}>
              <h3 style={styles.stepTitle}>Patient Information</h3>
              <p style={styles.stepDesc}>Please provide your details for the appointment</p>
              <div style={styles.row2}>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>First Name *</label>
                  <input style={styles.input} type="text" placeholder="First name" value={patientInfo.firstName}
                    onChange={(e) => setPatientInfo({ ...patientInfo, firstName: e.target.value })} />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Last Name *</label>
                  <input style={styles.input} type="text" placeholder="Last name" value={patientInfo.lastName}
                    onChange={(e) => setPatientInfo({ ...patientInfo, lastName: e.target.value })} />
                </div>
              </div>
              <div style={styles.row2}>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Phone Number *</label>
                  <input style={styles.input} type="tel" placeholder="+971 XX XXX XXXX" value={patientInfo.phone}
                    onChange={(e) => setPatientInfo({ ...patientInfo, phone: e.target.value })} />
                </div>
                <div style={styles.fieldGroup}>
                  <label style={styles.fieldLabel}>Email Address *</label>
                  <input style={styles.input} type="email" placeholder="your@email.com" value={patientInfo.email}
                    onChange={(e) => setPatientInfo({ ...patientInfo, email: e.target.value })} />
                </div>
              </div>
              <div style={styles.fieldGroup}>
                <label style={styles.fieldLabel}>Additional Notes</label>
                <textarea style={styles.textarea} placeholder="Any additional information for the doctor..." value={patientInfo.notes} rows={4}
                  onChange={(e) => setPatientInfo({ ...patientInfo, notes: e.target.value })} />
              </div>
              <div style={styles.btnRow}>
                <button style={styles.backBtn} onClick={() => setCurrentStep(2)}>← Back</button>
                <button style={{ ...styles.continueBtn, opacity: canContinueStep3 ? 1 : 0.5, cursor: canContinueStep3 ? "pointer" : "not-allowed" }}
                  onClick={() => canContinueStep3 && setCurrentStep(4)}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {/* ===== STEP 4 ===== */}
          {currentStep === 4 && (
            <div style={styles.cardBody}>
              <h3 style={styles.stepTitle}>Review & Payment</h3>
              <p style={styles.stepDesc}>Review your appointment details before confirming</p>

              <div style={styles.summaryBox}>
                <h4 style={styles.summaryTitle}>Appointment Summary</h4>
                <div style={styles.summaryGrid}>
                  {[
                    { label: "Department", value: selectedDeptObj?.name || selectedDept },
                    { label: "Doctor", value: `Dr. ${selectedDoctorObj?.fullName || ""}` },
                    { label: "Specialization", value: selectedDoctorObj?.specialization || "—" },
                    { label: "Location", value: location },
                    { label: "Date", value: selectedDate },
                    { label: "Time", value: selectedTime },
                    { label: "Patient", value: `${patientInfo.firstName} ${patientInfo.lastName}` },
                    { label: "Phone", value: patientInfo.phone },
                    { label: "Email", value: patientInfo.email },
                  ].map((item, i) => (
                    <div key={i} style={styles.summaryItem}>
                      <span style={styles.summaryLabel}>{item.label}</span>
                      <span style={styles.summaryValue}>{item.value}</span>
                    </div>
                  ))}
                  {patientInfo.notes && (
                    <div style={{ ...styles.summaryItem, gridColumn: "1 / -1" }}>
                      <span style={styles.summaryLabel}>Notes</span>
                      <span style={styles.summaryValue}>{patientInfo.notes}</span>
                    </div>
                  )}
                </div>
              </div>

              <div style={styles.paymentNote}>
                <span style={{ fontSize: "20px" }}>💳</span>
                <div>
                  <p style={styles.paymentNoteTitle}>Payment at Clinic</p>
                  <p style={styles.paymentNoteDesc}>Payment will be collected at the clinic upon your visit.</p>
                </div>
              </div>

              <div style={styles.btnRow}>
                <button style={styles.backBtn} onClick={() => setCurrentStep(3)}>← Back</button>
                <button style={styles.confirmBtn} onClick={() => {
                  alert("✅ Appointment booked successfully! We'll contact you shortly.");
                  navigate("/dashboard");
                }}>
                  Confirm Appointment ✓
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { maxWidth: "900px", margin: "0 auto", padding: "40px 30px 60px" },
  stepsRow: { display: "flex", alignItems: "center", marginBottom: "32px", flexWrap: "wrap", gap: "8px" },
  stepItem: { display: "flex", alignItems: "center", gap: "8px" },
  stepCircle: { width: "30px", height: "30px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700", fontFamily: "'Poppins', sans-serif", flexShrink: 0 },
  stepLabel: { fontSize: "13px", fontFamily: "'Poppins', sans-serif", whiteSpace: "nowrap" },
  stepLine: { width: "40px", height: "2px", borderRadius: "2px", flexShrink: 0 },
  card: { border: "1px solid #e0e0e0", borderRadius: "8px", overflow: "hidden" },
  tabsRow: { display: "flex", borderBottom: "1px solid #e0e0e0" },
  tabBtn: { flex: 1, padding: "14px 16px", border: "none", backgroundColor: "#f8fafc", fontSize: "13px", fontWeight: "500", cursor: "pointer", fontFamily: "'Poppins', sans-serif", color: "#666", borderRight: "1px solid #e0e0e0", transition: "all 0.2s" },
  tabBtnActive: { backgroundColor: "#fff", color: "#1a1a2e", fontWeight: "600", borderBottom: "2px solid #fff", marginBottom: "-1px" },
  cardBody: { padding: "28px" },
  stepTitle: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", marginBottom: "6px", fontFamily: "'Poppins', sans-serif" },
  stepDesc: { fontSize: "14px", color: "#888", marginBottom: "24px", fontFamily: "'Poppins', sans-serif" },
  fieldGroup: { marginBottom: "20px", flex: 1 },
  fieldLabel: { display: "block", fontSize: "13px", fontWeight: "500", color: "#555", marginBottom: "8px", fontFamily: "'Poppins', sans-serif" },
  radioRow: { display: "flex", gap: "24px", alignItems: "center" },
  radioLabel: { display: "flex", alignItems: "center", gap: "6px", cursor: "pointer" },
  radioText: { fontSize: "14px", color: "#444", fontFamily: "'Poppins', sans-serif" },
  select: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", outline: "none", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif", color: "#333", cursor: "pointer" },
  input: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif", color: "#333" },
  textarea: { width: "100%", padding: "12px 14px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "14px", boxSizing: "border-box", outline: "none", backgroundColor: "#f8fafc", fontFamily: "'Poppins', sans-serif", color: "#333", resize: "vertical" },
  row2: { display: "flex", gap: "16px" },

  // Doctor Cards
  doctorsGrid: { display: "flex", flexDirection: "column", gap: "12px" },
  doctorCard: { display: "flex", alignItems: "center", gap: "14px", padding: "14px 16px", borderRadius: "10px", cursor: "pointer", transition: "all 0.2s", position: "relative" },
  doctorAvatar: { width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#2193b0", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: "18px", fontWeight: "700", fontFamily: "'Poppins', sans-serif", flexShrink: 0 },
  doctorInfo: { flex: 1 },
  doctorName: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e", margin: "0 0 4px 0", fontFamily: "'Poppins', sans-serif" },
  doctorSpec: { fontSize: "13px", color: "#2193b0", margin: "0 0 6px 0", fontFamily: "'Poppins', sans-serif" },
  availDays: { display: "flex", gap: "4px", flexWrap: "wrap" },
  availDay: { backgroundColor: "#eef6fb", color: "#2193b0", padding: "2px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: "600", fontFamily: "'Poppins', sans-serif" },
  selectedCheck: { width: "24px", height: "24px", borderRadius: "50%", backgroundColor: "#2193b0", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "13px", fontWeight: "700" },

  // Time Slots
  timeSlotsGrid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: "8px" },
  timeSlot: { padding: "10px 8px", border: "1.5px solid #e0e0e0", borderRadius: "8px", fontSize: "12px", fontWeight: "500", cursor: "pointer", fontFamily: "'Poppins', sans-serif", color: "#555", backgroundColor: "#f8fafc", transition: "all 0.2s" },
  timeSlotActive: { backgroundColor: "#2193b0", color: "#fff", borderColor: "#2193b0" },

  // Summary
  summaryBox: { backgroundColor: "#f8fafc", borderRadius: "10px", padding: "20px", marginBottom: "20px", border: "1px solid #eee" },
  summaryTitle: { fontSize: "15px", fontWeight: "600", color: "#1a1a2e", marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  summaryGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" },
  summaryItem: { display: "flex", flexDirection: "column", gap: "4px" },
  summaryLabel: { fontSize: "11px", color: "#aaa", fontWeight: "600", textTransform: "uppercase", fontFamily: "'Poppins', sans-serif" },
  summaryValue: { fontSize: "14px", color: "#333", fontWeight: "500", fontFamily: "'Poppins', sans-serif" },
  paymentNote: { display: "flex", gap: "14px", alignItems: "flex-start", backgroundColor: "#eef6fb", borderRadius: "10px", padding: "16px", marginBottom: "24px", border: "1px solid #c0dff0" },
  paymentNoteTitle: { fontSize: "14px", fontWeight: "600", color: "#1a1a2e", margin: "0 0 4px 0", fontFamily: "'Poppins', sans-serif" },
  paymentNoteDesc: { fontSize: "13px", color: "#666", margin: 0, fontFamily: "'Poppins', sans-serif" },

  // Buttons
  btnRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px" },
  backBtn: { padding: "11px 24px", backgroundColor: "#f0f0f0", color: "#555", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "500", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  continueBtn: { padding: "11px 28px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  confirmBtn: { padding: "11px 28px", backgroundColor: "#27ae60", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
};