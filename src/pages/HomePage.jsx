import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";

const heroSlides = [
  { image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80", title: "Your Doctor. Your", highlight1: "Schedule.", highlight2: "Your Choice." },
  { image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80", title: "Expert Care.", highlight1: "Trusted Doctors.", highlight2: "Your Health." },
  { image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80", title: "Modern Facilities.", highlight1: "Advanced Care.", highlight2: "Better Outcomes." },
  { image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80", title: "Quality Healthcare.", highlight1: "Compassionate.", highlight2: "Always Here." },
];

const appointmentImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&q=80",
  "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
];

const whyChoose = [
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <path d="M9 9l2 2 4-4" />
        <path d="M8 21h8M12 17v4" />
      </svg>
    ),
    title: "AI in Care",
    desc: "Clinically proven AI-driven tools for faster, more accurate diagnoses and outcomes that patients trust.",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    title: "Expert Team",
    desc: "Our doctors work hand-in-hand with advanced digital platforms, ensuring you receive the highest standard of care, guided by both experience and innovation.",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    title: "Smart and Timely Services",
    desc: "Smart appointment scheduling and virtual triage minimize waiting times and get you to the right care — fast.",
  },
  {
    icon: (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    title: "Tech-Enabled and Patience Centered",
    desc: "From telemedicine to in-home visits, we use intelligent health systems to bring care to you, tailored to your needs and lifestyle.",
  },
];

const testimonials = [
  { text: "The clinic has a very professional setup. Dr. Amani took time to listen and explain, and the staff are attentive and polite. I felt comfortable and well cared for from start to finish." },
  { text: "The services are reasonably priced without compromising on quality. I appreciated the clear pricing and affordable health packages. Thumbs Up!" },
  { text: "Booking was smooth and I was seen quickly without long waiting times. The whole visit felt organized and efficient, which really saves time." },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [heroSlide, setHeroSlide] = useState(0);
  const [apptSlide, setApptSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide((p) => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setApptSlide((p) => (p + 1) % appointmentImages.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const q = query(collection(db, "departments"), limit(3));
        const snap = await getDocs(q);
        setDepartments(snap.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (err) {
        console.error(err);
      }
    };
    fetchDepts();
  }, []);

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />

      {/* Hero */}
      <div style={styles.hero}>
        {heroSlides.map((slide, index) => (
          <div key={index} style={{ ...styles.heroSlide, backgroundImage: `url(${slide.image})`, opacity: heroSlide === index ? 1 : 0, transition: "opacity 1s ease-in-out" }} />
        ))}
        <div style={styles.heroOverlay}>
          <div style={styles.heroContent}>
            <h1 style={styles.heroTitle}>
              {heroSlides[heroSlide].title}<br />
              <span style={{ color: "#e05c5c" }}>{heroSlides[heroSlide].highlight1}</span>{" "}
              <span style={{ color: "#6dd5ed" }}>{heroSlides[heroSlide].highlight2}</span>
            </h1>
            <p style={styles.heroDesc}>Enjoy flexible booking at your convenience. Schedule appointments with DHA-licensed doctors — anytime that fits your schedule</p>
            <div style={styles.heroBtns}>
              <button style={styles.btnRed} onClick={() => navigate("/book-appointment")}>Book a Consultation</button>
              <button style={styles.btnOutline} onClick={() => navigate("/packages")}>Book a Health Package</button>
            </div>
          </div>
        </div>
        <div style={styles.heroDots}>
          {heroSlides.map((_, i) => (
            <div key={i} onClick={() => setHeroSlide(i)}
              style={{ ...styles.dot, ...(heroSlide === i ? styles.dotActive : {}) }} />
          ))}
        </div>
      </div>

      {/* Book Appointment */}
      <div style={styles.bookSection}>
        <div style={styles.bookLeft}>
          <div style={styles.apptSlider}>
            {appointmentImages.map((img, index) => (
              <img key={index} src={img} alt="appointment"
                style={{ ...styles.apptImg, opacity: apptSlide === index ? 1 : 0, transition: "opacity 1s ease-in-out" }} />
            ))}
            <div style={styles.apptDots}>
              {appointmentImages.map((_, i) => (
                <div key={i} onClick={() => setApptSlide(i)}
                  style={{ ...styles.dot, ...(apptSlide === i ? styles.dotActive : {}) }} />
              ))}
            </div>
          </div>
        </div>
        <div style={styles.bookRight}>
          <span style={styles.badge}>Quick Appointment</span>
          <h2 style={styles.sectionTitle}>Book Your Appointment</h2>
          <p style={styles.sectionDesc}>Schedule a visit with our specialists in just a few clicks</p>
          <div style={styles.bookCard}>
            <button style={styles.bookNowBtn} onClick={() => navigate("/book-appointment")}>
              Book Now
            </button>
            <p style={styles.bookNote}>🕐 Most appointments available within 24-48 hours</p>
          </div>
        </div>
      </div>

      {/* Departments */}
      <div style={styles.deptsSection}>
        <div style={styles.centerBadge}><span style={styles.badge}>Clinical Specialities</span></div>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Our Departments</h2>
        <p style={{ ...styles.sectionDesc, textAlign: "center" }}>Specialized care across multiple medical disciplines with cutting-edge technology</p>
        <div style={styles.deptsGrid}>
          {departments.length > 0 ? departments.map((dept) => (
            <div key={dept.id} style={styles.deptCard}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
            >
              <h3 style={styles.deptName}>{dept.name}</h3>
              <p style={styles.deptDesc}>{dept.shortDescription || dept.desc || ""}</p>
              <span style={styles.learnMore} onClick={() => navigate("/departments/" + dept.id)}>Learn More &gt;</span>
            </div>
          )) : (
            ["Family Medicine", "Dentistry", "Paediatrics"].map((name) => (
              <div key={name} style={styles.deptCard}>
                <h3 style={styles.deptName}>{name}</h3>
                <p style={styles.deptDesc}>Specialized healthcare services with expert medical professionals.</p>
                <span style={styles.learnMore} onClick={() => navigate("/departments")}>Learn More &gt;</span>
              </div>
            ))
          )}
        </div>
        <div style={{ textAlign: "center", marginTop: "30px" }}>
          <button style={styles.viewAllBtn} onClick={() => navigate("/departments")}>View All Departments</button>
        </div>
      </div>

      {/* Why Choose Us */}
      <div style={styles.whySection}>
        <h2 style={styles.whyTitle}>
          Why Choose <span style={{ color: "#2193b0" }}>Smart</span>{" "}
          <span style={{ color: "#e05c5c" }}>Care</span> Polyclinic
        </h2>
        <p style={{ ...styles.sectionDesc, textAlign: "center", marginBottom: "40px" }}>
          We're committed to providing exceptional healthcare services
        </p>
        <div style={styles.whyGrid}>
          {whyChoose.map((item) => (
            <div key={item.title} style={styles.whyCard}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#2193b0"; e.currentTarget.style.transform = "translateY(-4px)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#eee"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={styles.whyIcon}>{item.icon}</div>
              <h3 style={styles.whyCardTitle}>{item.title}</h3>
              <p style={styles.whyCardDesc}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Testimonials */}
      <div style={styles.testimonialSection}>
        <h2 style={{ ...styles.sectionTitle, textAlign: "center" }}>Patient Testimonials</h2>
        <p style={{ ...styles.sectionDesc, textAlign: "center", marginBottom: "40px" }}>
          Hear what our patients have to say about their experience at Smartcare Polyclinic
        </p>
        <div style={styles.testimonialGrid}>
          {testimonials.map((t, i) => (
            <div key={i} style={styles.testimonialCard}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.1)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.06)"; }}
            >
              <div style={styles.quoteIcon}>"</div>
              <p style={styles.testimonialText}>{t.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact */}
      <div style={styles.contactSection}>
        <div style={styles.contactLeft}>
          <h2 style={styles.contactTitle}>Contact Us</h2>
          <p style={styles.contactDesc}>We're here to help. Reach out to us with any questions or to schedule an appointment.</p>
          <div style={styles.contactItem}><span>📞</span><span>04-2558804</span></div>
          <div style={styles.contactItem}><span>📍</span><span>Ground & Mezzanine Floor, Doha Centre, Al Maktoum Road, Deira, Dubai.</span></div>
          <div style={styles.contactItem}><span>📅</span><span>Mon-Fri: 8am-8pm, Sat: 9am-5pm, Sun: Closed</span></div>
        </div>
        <div style={styles.contactRight}>
          <iframe title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3!2d55.3!3d25.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzEyLjAiTiA1NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
            width="100%" height="350"
            style={{ border: 0, borderRadius: "12px" }}
            allowFullScreen loading="lazy" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

const styles = {
  hero: { position: "relative", height: "500px", overflow: "hidden" },
  heroSlide: { position: "absolute", inset: 0, backgroundSize: "cover", backgroundPosition: "center" },
  heroOverlay: { position: "absolute", inset: 0, background: "linear-gradient(to right, rgba(0,0,0,0.75) 50%, transparent)", display: "flex", alignItems: "center" },
  heroContent: { padding: "0 60px", maxWidth: "600px" },
  heroTitle: { fontSize: "42px", fontWeight: "800", color: "#fff", lineHeight: 1.2, marginBottom: "16px", fontFamily: "'Poppins', sans-serif" },
  heroDesc: { fontSize: "15px", color: "rgba(255,255,255,0.85)", lineHeight: 1.7, marginBottom: "28px", fontFamily: "'Poppins', sans-serif" },
  heroBtns: { display: "flex", gap: "16px", flexWrap: "wrap" },
  btnRed: { padding: "13px 28px", backgroundColor: "#e05c5c", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  btnOutline: { padding: "13px 28px", backgroundColor: "transparent", color: "#fff", border: "2px solid #fff", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  heroDots: { position: "absolute", bottom: "20px", left: "60px", display: "flex", gap: "8px" },
  dot: { width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "rgba(255,255,255,0.5)", cursor: "pointer", transition: "all 0.3s" },
  dotActive: { backgroundColor: "#fff", width: "28px", borderRadius: "5px" },
  bookSection: { display: "flex", alignItems: "center", padding: "80px 60px", gap: "60px", backgroundColor: "#f8fafc" },
  bookLeft: { flex: 1 },
  apptSlider: { position: "relative", height: "400px", borderRadius: "16px", overflow: "hidden" },
  apptImg: { position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" },
  apptDots: { position: "absolute", bottom: "16px", left: "50%", transform: "translateX(-50%)", display: "flex", gap: "8px", zIndex: 10 },
  bookRight: { flex: 1 },
  badge: { backgroundColor: "#e8f4fb", color: "#2193b0", padding: "6px 16px", borderRadius: "20px", fontSize: "13px", fontWeight: "500", fontFamily: "'Poppins', sans-serif" },
  sectionTitle: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e", margin: "16px 0 10px 0", fontFamily: "'Poppins', sans-serif" },
  sectionDesc: { fontSize: "15px", color: "#666", lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" },
  bookCard: { backgroundColor: "#fff", borderRadius: "12px", padding: "25px", boxShadow: "0 4px 16px rgba(0,0,0,0.08)", marginTop: "24px" },
  bookNowBtn: { width: "100%", padding: "14px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "15px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif", marginBottom: "12px", transition: "background 0.2s" },
  bookNote: { textAlign: "center", fontSize: "13px", color: "#888", fontFamily: "'Poppins', sans-serif" },
  deptsSection: { padding: "80px 60px", backgroundColor: "#eef6fb" },
  centerBadge: { textAlign: "center", marginBottom: "16px" },
  deptsGrid: { display: "flex", gap: "24px", marginTop: "40px", flexWrap: "wrap" },
  deptCard: { flex: 1, minWidth: "250px", backgroundColor: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
  deptName: { fontSize: "18px", fontWeight: "600", color: "#1a1a2e", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  deptDesc: { fontSize: "14px", color: "#666", lineHeight: 1.7, marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  learnMore: { color: "#2193b0", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  viewAllBtn: { padding: "12px 30px", backgroundColor: "transparent", color: "#2193b0", border: "2px solid #2193b0", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  whySection: { padding: "80px 60px", backgroundColor: "#fff" },
  whyTitle: { fontSize: "36px", fontWeight: "800", color: "#1a1a2e", textAlign: "center", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  whyGrid: { display: "flex", gap: "24px", flexWrap: "wrap" },
  whyCard: { flex: 1, minWidth: "200px", border: "1px solid #eee", borderRadius: "12px", padding: "28px", textAlign: "center", transition: "border-color 0.2s, transform 0.2s" },
  whyIcon: { display: "flex", justifyContent: "center", marginBottom: "16px" },
  whyCardTitle: { fontSize: "16px", fontWeight: "600", color: "#1a1a2e", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  whyCardDesc: { fontSize: "13px", color: "#666", lineHeight: 1.7, fontFamily: "'Poppins', sans-serif" },
  testimonialSection: { padding: "80px 60px", backgroundColor: "#f8fafc" },
  testimonialGrid: { display: "flex", gap: "24px", flexWrap: "wrap" },
  testimonialCard: { flex: 1, minWidth: "250px", backgroundColor: "#fff", borderRadius: "12px", padding: "28px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", transition: "transform 0.3s ease, box-shadow 0.3s ease" },
  quoteIcon: { fontSize: "40px", color: "#2193b0", fontWeight: "800", lineHeight: 1, marginBottom: "12px" },
  testimonialText: { fontSize: "14px", color: "#555", lineHeight: 1.8, fontFamily: "'Poppins', sans-serif" },
  contactSection: { display: "flex", padding: "80px 60px", gap: "60px", alignItems: "flex-start", backgroundColor: "#eef6fb" },
  contactLeft: { flex: 1 },
  contactTitle: { fontSize: "32px", fontWeight: "700", color: "#1a1a2e", marginBottom: "12px", fontFamily: "'Poppins', sans-serif" },
  contactDesc: { fontSize: "15px", color: "#666", lineHeight: 1.7, marginBottom: "24px", fontFamily: "'Poppins', sans-serif" },
  contactItem: { display: "flex", gap: "12px", marginBottom: "14px", fontSize: "14px", color: "#444", fontFamily: "'Poppins', sans-serif", alignItems: "flex-start" },
  contactRight: { flex: 1 },
};