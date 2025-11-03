import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const { register, loading, message } = useAuth();
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form className="auth-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Full Name" onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit" className="btn" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {message && <p className="info">{message}</p>}
    </div>
  );
};

export default Register;
