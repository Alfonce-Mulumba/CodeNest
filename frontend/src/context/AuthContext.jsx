import React, { createContext, useContext, useState, useEffect } from "react";
import api from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const safeParse = (value) => {
    try {
      return value ? JSON.parse(value) : null;
    } catch {
      return null;
    }
  };

  const [user, setUser] = useState(safeParse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // ✅ Save to localStorage whenever user or token changes
  useEffect(() => {
    if (user) localStorage.setItem("user", JSON.stringify(user));
    else localStorage.removeItem("user");

    if (token) localStorage.setItem("token", token);
    else localStorage.removeItem("token");
  }, [user, token]);

  // ✅ Login
  const login = async (email, password) => {
    const res = await api.post("/auth/login", { email, password });
    const { token, user } = res.data;
    setUser(user);
    setToken(token);
    return user;
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // ✅ Register
  const register = async (name, email, password) => {
    const res = await api.post("/auth/register", { name, email, password });
    return res.data;
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
