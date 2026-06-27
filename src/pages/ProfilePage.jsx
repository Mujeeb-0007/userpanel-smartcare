import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useAuth } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name:     userData?.name     || "",
    lastName: userData?.lastName || "",
    gender:   userData?.gender   || "",
    idType:   userData?.idType   || "",
    email:    userData?.email    || "",
    phone:    userData?.phone    || "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name, lastName: formData.lastName,
        fullName: `${formData.name} ${formData.lastName}`,
        gender: formData.gender, idType: formData.idType, phone: formData.phone,
      });
      setSuccess(true); setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) { console.error(err); }
    finally { setSaving(false); }
  };

  return (
    <div style={{ fontFamily:"'Poppins',sans-serif" }}>
      <style>{`
        .pf-page { background:#f5f6fa; min-height:calc(100vh - 70px); padding:40px 0; }
        .pf-wrap { max-width:800px; margin:0 auto; padding:0 30px; }
        .pf-header { display:flex; align-items:center; gap:16px; margin-bottom:28px; }
        .pf-back-btn { background:none; border:none; font-size:15px; cursor:pointer; color:#2193b0; font-family:'Poppins',sans-serif; font-weight:500; padding:0; }
        .pf-title { font-size:24px; font-weight:700; color:#1a1a2e; margin:0; font-family:'Poppins',sans-serif; }
        .pf-success { background:#d4edda; color:#155724; padding:12px 16px; border-radius:8px; font-size:14px; margin-bottom:20px; font-family:'Poppins',sans-serif; }
        .pf-card { background:#fff; border-radius:16px; padding:32px; box-shadow:0 4px 20px rgba(0,0,0,0.08); }
        .pf-avatar-row { display:flex; align-items:center; gap:20px; margin-bottom:24px; }
        .pf-avatar { width:72px; height:72px; background:#2193b0; border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-weight:700; font-size:28px; flex-shrink:0; font-family:'Poppins',sans-serif; }
        .pf-user-name { font-size:20px; font-weight:700; color:#1a1a2e; margin:0 0 6px; font-family:'Poppins',sans-serif; }
        .pf-role-badge { background:#e8f4fb; color:#2193b0; padding:4px 14px; border-radius:20px; font-size:12px; font-weight:600; font-family:'Poppins',sans-serif; }
        .pf-divider { border:none; border-top:1px solid #f0f0f0; margin:20px 0; }
        .pf-info-grid { display:grid; grid-template-columns:1fr 1fr; gap:18px; margin-bottom:28px; }
        .pf-info-item { background:#f8fafc; border-radius:10px; padding:16px; }
        .pf-info-label { display:block; font-size:11px; font-weight:600; color:#aaa; text-transform:uppercase; margin-bottom:6px; font-family:'Poppins',sans-serif; }
        .pf-info-value { font-size:15px; color:#333; font-weight:500; margin:0; font-family:'Poppins',sans-serif; }
        .pf-input { width:100%; padding:9px 12px; border:1.5px solid #2193b0; border-radius:6px; font-size:14px; box-sizing:border-box; outline:none; font-family:'Poppins',sans-serif; }
        .pf-btn-row { display:flex; gap:12px; justify-content:flex-end; flex-wrap:wrap; }
        .pf-edit-btn { padding:11px 28px; background:#2193b0; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .pf-save-btn { padding:11px 28px; background:#27ae60; color:#fff; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }
        .pf-cancel-btn { padding:11px 28px; background:#f0f0f0; color:#555; border:none; border-radius:8px; font-size:14px; font-weight:600; cursor:pointer; font-family:'Poppins',sans-serif; }

        @media (max-width:600px) {
          .pf-wrap { padding:0 16px; }
          .pf-page { padding:24px 0; }
          .pf-card { padding:20px 16px; }
          .pf-title { font-size:19px; }
          .pf-info-grid { grid-template-columns:1fr; }
          .pf-avatar { width:56px; height:56px; font-size:22px; }
          .pf-user-name { font-size:17px; }
          .pf-btn-row { justify-content:stretch; }
          .pf-edit-btn, .pf-save-btn, .pf-cancel-btn { flex:1; }
        }
      `}</style>

      <Navbar />
      <div className="pf-page">
        <div className="pf-wrap">
          <div className="pf-header">
            <button className="pf-back-btn" onClick={() => navigate("/dashboard")}>← Back</button>
            <h2 className="pf-title">My Profile</h2>
          </div>

          {success && <div className="pf-success">✅ Profile updated successfully!</div>}

          <div className="pf-card">
            <div className="pf-avatar-row">
              <div className="pf-avatar">{userData?.name?.charAt(0).toUpperCase() || "U"}</div>
              <div>
                <h3 className="pf-user-name">{userData?.fullName || userData?.name || "User"}</h3>
                <span className="pf-role-badge">Patient</span>
              </div>
            </div>

            <hr className="pf-divider"/>

            <div className="pf-info-grid">
              {[
                { label:"First Name",   field:"name",     type:"text",   placeholder:"First name" },
                { label:"Last Name",    field:"lastName", type:"text",   placeholder:"Last name" },
                { label:"Email",        field:"email",    type:"text",   readonly:true },
                { label:"Phone",        field:"phone",    type:"tel",    placeholder:"+971 XX XXX XXXX" },
                { label:"Gender",       field:"gender",   type:"select", options:[{v:"male",l:"Male"},{v:"female",l:"Female"},{v:"other",l:"Other"}] },
                { label:"ID Type",      field:"idType",   type:"select", options:[{v:"passport",l:"Passport"},{v:"emirates_id",l:"Emirates ID"},{v:"national_id",l:"National ID"}] },
                { label:"Member Since", field:"date",     readonly:true, staticVal: userData?.date || "—" },
                { label:"Account Role", field:"role",     readonly:true, staticVal:"Patient" },
              ].map((item, i) => (
                <div key={i} className="pf-info-item">
                  <label className="pf-info-label">{item.label}</label>
                  {editing && !item.readonly ? (
                    item.type === "select" ? (
                      <select className="pf-input" value={formData[item.field]} onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}>
                        <option value="">Select</option>
                        {item.options.map(o => <option key={o.v} value={o.v}>{o.l}</option>)}
                      </select>
                    ) : (
                      <input className="pf-input" type={item.type} placeholder={item.placeholder} value={formData[item.field]} onChange={(e) => setFormData({ ...formData, [item.field]: e.target.value })}/>
                    )
                  ) : (
                    <p className="pf-info-value">{item.staticVal || userData?.[item.field] || formData[item.field] || "—"}</p>
                  )}
                </div>
              ))}
            </div>

            <div className="pf-btn-row">
              {editing ? (
                <>
                  <button className="pf-cancel-btn" onClick={() => setEditing(false)}>Cancel</button>
                  <button className="pf-save-btn" onClick={handleSave} disabled={saving}>{saving ? "Saving..." : "Save Changes"}</button>
                </>
              ) : (
                <button className="pf-edit-btn" onClick={() => setEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}