import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const ForgotPassword = () => {
  const { forgotPassword, loading, message } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    forgotPassword(email);
  };

  return (
    <div className="auth-container">
      <h2>Forgot Password</h2>
      <p style={{ marginBottom: "10px" }}>
        Enter your email and we’ll send you a reset link or code.
      </p>

      <form className="auth-form" onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Sending..." : "Send Reset Link"}
        </button>
      </form>

      {message && (
        <p
          className="info"
          style={{
            marginTop: "15px",
            color: message.includes("sent") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default ForgotPassword;
