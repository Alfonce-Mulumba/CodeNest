import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/api";

const VerifyAccount = () => {
  const [form, setForm] = useState({ email: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await api.post("/auth/verify", form);
      setMessage(res.data.message || "Account verified successfully! ✅");

      // ✅ Redirect to login after short delay
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.error("Verification error:", err);
      setMessage(err.response?.data?.message || "Verification failed. Check your code.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <h2>Verify Your Account</h2>
      <p style={{ marginBottom: "10px" }}>
        Enter the <strong>6-digit code</strong> sent to your email to verify your account.
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
          placeholder="Enter 6-digit Code"
          value={form.code}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Verifying..." : "Verify Account"}
        </button>
      </form>

      {message && (
        <p
          className="info"
          style={{
            marginTop: "15px",
            color: message.includes("successfully") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default VerifyAccount;
