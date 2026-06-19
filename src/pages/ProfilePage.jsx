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
    name: userData?.name || "",
    lastName: userData?.lastName || "",
    gender: userData?.gender || "",
    idType: userData?.idType || "",
    email: userData?.email || "",
    phone: userData?.phone || "",
  });

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateDoc(doc(db, "users", user.uid), {
        name: formData.name,
        lastName: formData.lastName,
        fullName: `${formData.name} ${formData.lastName}`,
        gender: formData.gender,
        idType: formData.idType,
        phone: formData.phone,
      });
      setSuccess(true);
      setEditing(false);
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div style={{ fontFamily: "'Poppins', sans-serif" }}>
      <Navbar />
      <div style={styles.page}>
        <div style={styles.container}>

          {/* Header */}
          <div style={styles.header}>
            <button style={styles.backBtn} onClick={() => navigate("/dashboard")}>← Back</button>
            <h2 style={styles.title}>My Profile</h2>
          </div>

          {success && <div style={styles.successMsg}>✅ Profile updated successfully!</div>}

          {/* Profile Card */}
          <div style={styles.card}>
            {/* Avatar */}
            <div style={styles.avatarSection}>
              <div style={styles.avatar}>
                {userData?.name?.charAt(0).toUpperCase() || "U"}
              </div>
              <div>
                <h3 style={styles.userName}>{userData?.fullName || userData?.name || "User"}</h3>
                <span style={styles.roleBadge}>Patient</span>
              </div>
            </div>

            <hr style={styles.divider} />

            {/* Info Grid */}
            <div style={styles.infoGrid}>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>First Name</label>
                {editing ? (
                  <input style={styles.input} value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
                ) : (
                  <p style={styles.infoValue}>{userData?.name || "—"}</p>
                )}
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Last Name</label>
                {editing ? (
                  <input style={styles.input} value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })} />
                ) : (
                  <p style={styles.infoValue}>{userData?.lastName || "—"}</p>
                )}
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Email</label>
                <p style={styles.infoValue}>{userData?.email || "—"}</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Phone</label>
                {editing ? (
                  <input style={styles.input} value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
                ) : (
                  <p style={styles.infoValue}>{userData?.phone || "—"}</p>
                )}
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Gender</label>
                {editing ? (
                  <select style={styles.input} value={formData.gender}
                    onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                ) : (
                  <p style={styles.infoValue}>{userData?.gender || "—"}</p>
                )}
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>ID Type</label>
                {editing ? (
                  <select style={styles.input} value={formData.idType}
                    onChange={(e) => setFormData({ ...formData, idType: e.target.value })}>
                    <option value="">Select</option>
                    <option value="passport">Passport</option>
                    <option value="emirates_id">Emirates ID</option>
                    <option value="national_id">National ID</option>
                  </select>
                ) : (
                  <p style={styles.infoValue}>{userData?.idType || "—"}</p>
                )}
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Member Since</label>
                <p style={styles.infoValue}>{userData?.date || "—"}</p>
              </div>
              <div style={styles.infoItem}>
                <label style={styles.infoLabel}>Account Role</label>
                <p style={styles.infoValue}>Patient</p>
              </div>
            </div>

            {/* Buttons */}
            <div style={styles.btnRow}>
              {editing ? (
                <>
                  <button style={styles.cancelBtn} onClick={() => setEditing(false)}>Cancel</button>
                  <button style={styles.saveBtn} onClick={handleSave} disabled={saving}>
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </>
              ) : (
                <button style={styles.editBtn} onClick={() => setEditing(true)}>Edit Profile</button>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#f5f6fa", minHeight: "calc(100vh - 70px)", padding: "40px 0" },
  container: { maxWidth: "800px", margin: "0 auto", padding: "0 30px" },
  header: { display: "flex", alignItems: "center", gap: "16px", marginBottom: "28px" },
  backBtn: { background: "none", border: "none", fontSize: "16px", cursor: "pointer", color: "#2193b0", fontFamily: "'Poppins', sans-serif", fontWeight: "500" },
  title: { fontSize: "24px", fontWeight: "700", color: "#1a1a2e", margin: 0, fontFamily: "'Poppins', sans-serif" },
  successMsg: { backgroundColor: "#d4edda", color: "#155724", padding: "12px 16px", borderRadius: "8px", fontSize: "14px", marginBottom: "20px", fontFamily: "'Poppins', sans-serif" },
  card: { backgroundColor: "#fff", borderRadius: "16px", padding: "32px", boxShadow: "0 4px 20px rgba(0,0,0,0.08)" },
  avatarSection: { display: "flex", alignItems: "center", gap: "20px", marginBottom: "24px" },
  avatar: { width: "72px", height: "72px", backgroundColor: "#2193b0", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: "700", fontSize: "28px", fontFamily: "'Poppins', sans-serif" },
  userName: { fontSize: "20px", fontWeight: "700", color: "#1a1a2e", margin: "0 0 6px 0", fontFamily: "'Poppins', sans-serif" },
  roleBadge: { backgroundColor: "#e8f4fb", color: "#2193b0", padding: "4px 14px", borderRadius: "20px", fontSize: "12px", fontWeight: "600", fontFamily: "'Poppins', sans-serif" },
  divider: { border: "none", borderTop: "1px solid #f0f0f0", margin: "20px 0" },
  infoGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px", marginBottom: "28px" },
  infoItem: { backgroundColor: "#f8fafc", borderRadius: "10px", padding: "16px" },
  infoLabel: { display: "block", fontSize: "11px", fontWeight: "600", color: "#aaa", textTransform: "uppercase", marginBottom: "6px", fontFamily: "'Poppins', sans-serif" },
  infoValue: { fontSize: "15px", color: "#333", fontWeight: "500", margin: 0, fontFamily: "'Poppins', sans-serif" },
  input: { width: "100%", padding: "8px 12px", border: "1.5px solid #2193b0", borderRadius: "6px", fontSize: "14px", boxSizing: "border-box", outline: "none", fontFamily: "'Poppins', sans-serif" },
  btnRow: { display: "flex", gap: "12px", justifyContent: "flex-end" },
  editBtn: { padding: "11px 28px", backgroundColor: "#2193b0", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  saveBtn: { padding: "11px 28px", backgroundColor: "#27ae60", color: "#fff", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
  cancelBtn: { padding: "11px 28px", backgroundColor: "#f0f0f0", color: "#555", border: "none", borderRadius: "8px", fontSize: "14px", fontWeight: "600", cursor: "pointer", fontFamily: "'Poppins', sans-serif" },
};