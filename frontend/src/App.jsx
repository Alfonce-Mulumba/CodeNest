import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyAccount from "./pages/VerifyAccount";
import Profile from "./pages/Profile";
import BookingModal from "./components/BookingModal";
import { startBinaryBackground } from "./canvas/BinaryBackground";
import "./canvas/canvas.css";

const App = () => {
  useEffect(() => {
    startBinaryBackground();
  }, []);

  return (
    <>
      <canvas id="binaryCanvas"></canvas>

      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/verify" element={<VerifyAccount />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/booking" element={<BookingModal />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
