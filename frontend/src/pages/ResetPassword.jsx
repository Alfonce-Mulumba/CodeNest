import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ResetPassword = () => {
  const { resetPassword, loading, message } = useAuth();
  const [form, setForm] = useState({ email: "", code: "", newPassword: "" });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await resetPassword(form);
    if (success) {
      setTimeout(() => navigate("/login"), 2000);
    }
  };

  return (
    <div className="auth-container">
      <h2>Reset Password</h2>
      <p style={{ marginBottom: "10px" }}>
        Enter your email, reset code, and new password.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="code"
          placeholder="Enter Reset Code"
          value={form.code}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="newPassword"
          placeholder="Enter New Password"
          value={form.newPassword}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Resetting..." : "Reset Password"}
        </button>
      </form>

      {message && (
        <p
          className="info"
          style={{
            marginTop: "15px",
            color: message.includes("successful") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ResetPassword;
