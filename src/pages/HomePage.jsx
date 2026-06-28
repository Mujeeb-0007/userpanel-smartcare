import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { collection, getDocs, limit, query } from "firebase/firestore";
import { db } from "../firebase";

const heroSlides = [
  { image:"https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=1200&q=80", title:"Your Doctor. Your", h1:"Schedule.", h2:"Your Choice." },
  { image:"https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=1200&q=80", title:"Expert Care.", h1:"Trusted Doctors.", h2:"Your Health." },
  { image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&q=80", title:"Modern Facilities.", h1:"Advanced Care.", h2:"Better Outcomes." },
  { image:"https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&q=80", title:"Quality Healthcare.", h1:"Compassionate.", h2:"Always Here." },
];

const apptImages = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=600&q=80",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=600&q=80",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=600&q=80",
  "https://images.unsplash.com/photo-1504813184591-01572f98c85f?w=600&q=80",
];

const whyChoose = [
  { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M9 9l2 2 4-4"/><path d="M8 21h8M12 17v4"/></svg>, title:"AI in Care", desc:"Clinically proven AI-driven tools for faster, more accurate diagnoses and outcomes that patients trust." },
  { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, title:"Expert Team", desc:"Our doctors work hand-in-hand with advanced digital platforms, ensuring you receive the highest standard of care." },
  { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, title:"Smart & Timely", desc:"Smart appointment scheduling and virtual triage minimize waiting times and get you to the right care — fast." },
  { icon: <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>, title:"Tech-Enabled", desc:"From telemedicine to in-home visits, we use intelligent health systems to bring care to you, tailored to your needs." },
];

const testimonials = [
  { text:"The clinic has a very professional setup. Dr. Amani took time to listen and explain, and the staff are attentive and polite. I felt comfortable and well cared for from start to finish." },
  { text:"The services are reasonably priced without compromising on quality. I appreciated the clear pricing and affordable health packages. Thumbs Up!" },
  { text:"Booking was smooth and I was seen quickly without long waiting times. The whole visit felt organized and efficient, which really saves time." },
];

export default function HomePage() {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [heroSlide, setHeroSlide] = useState(0);
  const [apptSlide, setApptSlide] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setHeroSlide(p => (p + 1) % heroSlides.length), 4000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setApptSlide(p => (p + 1) % apptImages.length), 3000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const fetchDepts = async () => {
      try {
        const q = query(collection(db, "departments"), limit(3));
        const snap = await getDocs(q);
        setDepartments(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      } catch (err) { console.error(err); }
    };
    fetchDepts();
  }, []);

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .hp-hero { position:relative; height:500px; overflow:hidden; }
        .hp-slide { position:absolute; inset:0; background-size:cover; background-position:center; }
        .hp-hero-overlay { position:absolute; inset:0; background:linear-gradient(to right,rgba(0,0,0,0.75) 55%,transparent); display:flex; align-items:center; }
        .hp-hero-content { padding:0 60px; max-width:600px; }
        .hp-hero-title { font-size:40px; font-weight:800; color:#fff; line-height:1.2; margin-bottom:14px; font-family:'Poppins',sans-serif; }
        .hp-hero-desc { font-size:14px; color:rgba(255,255,255,0.85); line-height:1.7; margin-bottom:24px; font-family:'Poppins',sans-serif; }
        .hp-hero-btns { display:flex; gap:12px; flex-wrap:wrap; }
        .hp-btn-red { padding:12px 22px; background:#e05c5c; color:#fff; border:none; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .hp-btn-outline { padding:12px 22px; background:transparent; color:#fff; border:2px solid #fff; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .hp-dots { position:absolute; bottom:18px; left:60px; display:flex; gap:7px; }
        .hp-dot { width:9px; height:9px; border-radius:50%; background:rgba(255,255,255,0.5); cursor:pointer; transition:all 0.3s; }
        .hp-dot-active { background:#fff; width:26px; border-radius:5px; }
        .hp-book { display:flex; align-items:center; padding:70px 60px; gap:52px; background:#f8fafc; }
        .hp-book-left { flex:1; }
        .hp-appt-slider { position:relative; height:360px; border-radius:16px; overflow:hidden; }
        .hp-appt-img { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; }
        .hp-appt-dots { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); display:flex; gap:7px; z-index:10; }
        .hp-book-right { flex:1; }
        .hp-badge { background:#e8f4fb; color:#2193b0; padding:5px 14px; border-radius:20px; font-size:12px; font-weight:500; font-family:'Poppins',sans-serif; display:inline-block; }
        .hp-section-title { font-size:26px; font-weight:700; color:#1a1a2e; margin:12px 0 8px; font-family:'Poppins',sans-serif; }
        .hp-section-desc { font-size:14px; color:#666; line-height:1.7; font-family:'Poppins',sans-serif; }
        .hp-book-card { background:#fff; border-radius:12px; padding:22px; box-shadow:0 4px 16px rgba(0,0,0,0.08); margin-top:20px; }
        .hp-book-now-btn { width:100%; padding:13px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; margin-bottom:8px; }
        .hp-book-note { text-align:center; font-size:12px; color:#888; font-family:'Poppins',sans-serif; }
        .hp-depts { padding:70px 60px; background:#eef6fb; }
        .hp-center-badge { text-align:center; margin-bottom:12px; }
        .hp-depts-grid { display:flex; gap:20px; margin-top:28px; flex-wrap:wrap; }
        .hp-dept-card { flex:1; min-width:220px; background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 12px rgba(0,0,0,0.06); transition:transform 0.3s,box-shadow 0.3s; }
        .hp-dept-card:hover { transform:translateY(-5px); box-shadow:0 10px 28px rgba(0,0,0,0.1); }
        .hp-dept-name { font-size:16px; font-weight:600; color:#1a1a2e; margin-bottom:10px; font-family:'Poppins',sans-serif; }
        .hp-dept-desc { font-size:13px; color:#666; line-height:1.7; margin-bottom:16px; font-family:'Poppins',sans-serif; }
        .hp-learn-more { color:#2193b0; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .hp-view-all-wrap { text-align:center; margin-top:24px; }
        .hp-view-all-btn { padding:11px 26px; background:transparent; color:#2193b0; border:2px solid #2193b0; border-radius:8px; font-size:13px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .hp-why { padding:70px 60px; background:#fff; }
        .hp-why-title { font-size:30px; font-weight:800; color:#1a1a2e; text-align:center; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .hp-why-grid { display:flex; gap:20px; flex-wrap:wrap; margin-top:28px; }
        .hp-why-card { flex:1; min-width:190px; border:1px solid #eee; border-radius:12px; padding:24px; text-align:center; transition:border-color 0.2s,transform 0.2s; }
        .hp-why-card:hover { border-color:#2193b0; transform:translateY(-3px); }
        .hp-why-icon { display:flex; justify-content:center; margin-bottom:12px; }
        .hp-why-card-title { font-size:15px; font-weight:600; color:#1a1a2e; margin-bottom:8px; font-family:'Poppins',sans-serif; }
        .hp-why-card-desc { font-size:13px; color:#666; line-height:1.7; font-family:'Poppins',sans-serif; }
        .hp-testi { padding:70px 60px; background:#f8fafc; }
        .hp-testi-grid { display:flex; gap:20px; flex-wrap:wrap; margin-top:28px; }
        .hp-testi-card { flex:1; min-width:220px; background:#fff; border-radius:12px; padding:24px; box-shadow:0 2px 12px rgba(0,0,0,0.06); transition:transform 0.3s,box-shadow 0.3s; }
        .hp-testi-card:hover { transform:translateY(-5px); box-shadow:0 10px 28px rgba(0,0,0,0.1); }
        .hp-quote { font-size:36px; color:#2193b0; font-weight:800; line-height:1; margin-bottom:10px; }
        .hp-testi-text { font-size:13px; color:#555; line-height:1.8; font-family:'Poppins',sans-serif; }
        .hp-contact { display:flex; padding:70px 60px; gap:52px; align-items:flex-start; background:#eef6fb; }
        .hp-contact-left { flex:1; }
        .hp-contact-right { flex:1; }
        .hp-contact-title { font-size:26px; font-weight:700; color:#1a1a2e; margin-bottom:10px; font-family:'Poppins',sans-serif; }
        .hp-contact-desc { font-size:14px; color:#666; line-height:1.7; margin-bottom:20px; font-family:'Poppins',sans-serif; }
        .hp-contact-item { display:flex; gap:10px; margin-bottom:12px; font-size:13px; color:#444; font-family:'Poppins',sans-serif; align-items:flex-start; }
        @media (max-width:1024px) {
          .hp-hero-content { padding:0 40px; }
          .hp-dots { left:40px; }
          .hp-book { padding:52px 40px; gap:36px; }
          .hp-depts { padding:52px 40px; }
          .hp-why { padding:52px 40px; }
          .hp-testi { padding:52px 40px; }
          .hp-contact { padding:52px 40px; gap:36px; }
        }
        @media (max-width:768px) {
          .hp-hero { height:380px; }
          .hp-hero-content { padding:0 28px; max-width:100%; }
          .hp-hero-title { font-size:28px; }
          .hp-dots { left:28px; }
          .hp-book { flex-direction:column; padding:40px 28px; gap:28px; }
          .hp-appt-slider { height:240px; }
          .hp-depts { padding:40px 28px; }
          .hp-depts-grid { flex-direction:column; }
          .hp-why { padding:40px 28px; }
          .hp-why-title { font-size:24px; }
          .hp-why-grid { flex-direction:column; }
          .hp-testi { padding:40px 28px; }
          .hp-testi-grid { flex-direction:column; }
          .hp-contact { flex-direction:column; padding:40px 28px; gap:28px; }
          .hp-contact-title { font-size:22px; }
          .hp-section-title { font-size:22px; }
        }
        @media (max-width:480px) {
          .hp-hero { height:280px; }
          .hp-hero-content { padding:0 18px; }
          .hp-hero-title { font-size:20px; }
          .hp-hero-desc { font-size:12px; display:none; }
          .hp-dots { left:18px; bottom:10px; }
          .hp-book { padding:28px 18px; }
          .hp-appt-slider { height:200px; }
          .hp-depts { padding:28px 18px; }
          .hp-why { padding:28px 18px; }
          .hp-why-title { font-size:20px; }
          .hp-testi { padding:28px 18px; }
          .hp-contact { padding:28px 18px; }
          .hp-contact-title { font-size:18px; }
          .hp-section-title { font-size:18px; }
          .hp-hero-btns { flex-direction:column; gap:8px; }
          .hp-btn-red, .hp-btn-outline { width:100%; max-width:240px; text-align:center; }
        }
      `}</style>
      <Navbar />
      <div className="hp-hero">
        {heroSlides.map((slide, i) => (
          <div key={i} className="hp-slide" style={{ backgroundImage:`url(${slide.image})`, opacity: heroSlide === i ? 1 : 0, transition:"opacity 1s ease-in-out" }}/>
        ))}
        <div className="hp-hero-overlay">
          <div className="hp-hero-content">
            <h1 className="hp-hero-title">
              {heroSlides[heroSlide].title}<br/>
              <span style={{ color:"#e05c5c" }}>{heroSlides[heroSlide].h1}</span>{" "}
              <span style={{ color:"#6dd5ed" }}>{heroSlides[heroSlide].h2}</span>
            </h1>
            <p className="hp-hero-desc">Enjoy flexible booking at your convenience. Schedule appointments with DHA-licensed doctors — anytime that fits your schedule.</p>
            <div className="hp-hero-btns">
              <button className="hp-btn-red" onClick={() => navigate("/book-appointment")}>Book a Consultation</button>
              <button className="hp-btn-outline" onClick={() => navigate("/packages")}>Book a Health Package</button>
            </div>
          </div>
        </div>
        <div className="hp-dots">
          {heroSlides.map((_, i) => (
            <div key={i} className={`hp-dot ${heroSlide === i ? "hp-dot-active" : ""}`} onClick={() => setHeroSlide(i)}/>
          ))}
        </div>
      </div>
      <div className="hp-book">
        <div className="hp-book-left">
          <div className="hp-appt-slider">
            {apptImages.map((img, i) => (
              <img key={i} src={img} alt="appointment" className="hp-appt-img" style={{ opacity: apptSlide === i ? 1 : 0, transition:"opacity 1s ease-in-out" }}/>
            ))}
            <div className="hp-appt-dots">
              {apptImages.map((_, i) => (
                <div key={i} className={`hp-dot ${apptSlide === i ? "hp-dot-active" : ""}`} onClick={() => setApptSlide(i)}/>
              ))}
            </div>
          </div>
        </div>
        <div className="hp-book-right">
          <span className="hp-badge">Quick Appointment</span>
          <h2 className="hp-section-title">Book Your Appointment</h2>
          <p className="hp-section-desc">Schedule a visit with our specialists in just a few clicks</p>
          <div className="hp-book-card">
            <button className="hp-book-now-btn" onClick={() => navigate("/book-appointment")}>Book Now</button>
            <p className="hp-book-note">🕐 Most appointments available within 24–48 hours</p>
          </div>
        </div>
      </div>
      <div className="hp-depts">
        <div className="hp-center-badge"><span className="hp-badge">Clinical Specialities</span></div>
        <h2 className="hp-section-title" style={{ textAlign:"center" }}>Our Departments</h2>
        <p className="hp-section-desc" style={{ textAlign:"center" }}>Specialized care across multiple medical disciplines</p>
        <div className="hp-depts-grid">
          {(departments.length > 0 ? departments : [
            { id:"1", name:"Family Medicine", shortDescription:"Specialized healthcare services with expert medical professionals." },
            { id:"2", name:"Dentistry", shortDescription:"Specialized healthcare services with expert medical professionals." },
            { id:"3", name:"Paediatrics", shortDescription:"Specialized healthcare services with expert medical professionals." },
          ]).map((dept) => (
            <div key={dept.id} className="hp-dept-card">
              <h3 className="hp-dept-name">{dept.name}</h3>
              <p className="hp-dept-desc">{dept.shortDescription || dept.desc || ""}</p>
              <span className="hp-learn-more" onClick={() => navigate(departments.length > 0 ? "/departments/" + dept.id : "/departments")}>Learn More &gt;</span>
            </div>
          ))}
        </div>
        <div className="hp-view-all-wrap">
          <button className="hp-view-all-btn" onClick={() => navigate("/departments")}>View All Departments</button>
        </div>
      </div>
      <div className="hp-why">
        <h2 className="hp-why-title">
          Why Choose <span style={{ color:"#2193b0" }}>Smart</span>{" "}
          <span style={{ color:"#e05c5c" }}>Care</span> Polyclinic
        </h2>
        <p className="hp-section-desc" style={{ textAlign:"center" }}>We're committed to providing exceptional healthcare services</p>
        <div className="hp-why-grid">
          {whyChoose.map((item, i) => (
            <div key={i} className="hp-why-card">
              <div className="hp-why-icon">{item.icon}</div>
              <h3 className="hp-why-card-title">{item.title}</h3>
              <p className="hp-why-card-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hp-testi">
        <h2 className="hp-section-title" style={{ textAlign:"center" }}>Patient Testimonials</h2>
        <p className="hp-section-desc" style={{ textAlign:"center" }}>Hear what our patients say about Smartcare Polyclinic</p>
        <div className="hp-testi-grid">
          {testimonials.map((t, i) => (
            <div key={i} className="hp-testi-card">
              <div className="hp-quote">"</div>
              <p className="hp-testi-text">{t.text}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="hp-contact">
        <div className="hp-contact-left">
          <h2 className="hp-contact-title">Contact Us</h2>
          <p className="hp-contact-desc">We're here to help. Reach out with any questions or to schedule an appointment.</p>
          <div className="hp-contact-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.44 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.64a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
            <span>04-2558804</span>
          </div>
          <div className="hp-contact-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>Ground & Mezzanine Floor, Doha Centre, Al Maktoum Road, Deira, Dubai.</span>
          </div>
          <div className="hp-contact-item">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2193b0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:2}}><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            <span>Mon–Fri: 8am–8pm, Sat: 9am–5pm, Sun: Closed</span>
          </div>
        </div>
        <div className="hp-contact-right">
          <iframe title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.3!2d55.3!3d25.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjXCsDE2JzEyLjAiTiA1NcKwMTgnMDAuMCJF!5e0!3m2!1sen!2sae!4v1234567890"
            width="100%" height="300" style={{ border:0, borderRadius:"12px" }} allowFullScreen loading="lazy"/>
        </div>
      </div>
      <Footer />
    </div>
  );
}