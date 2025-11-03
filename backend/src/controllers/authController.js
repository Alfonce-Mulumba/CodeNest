import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const SECRET = process.env.JWT_SECRET || "supersecret";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ✅ Register User — generate 6-digit code
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing)
      return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const user = await prisma.user.create({
      data: { name, email, password: hashed, verificationCode },
    });

    await sendEmail(
      email,
      "Verify Your CodeNest Account",
      `<p>Hello ${name},</p>
      <p>Your verification code is:</p>
      <h2 style="color:#2b7a78; letter-spacing:2px;">${verificationCode}</h2>
      <p>Enter this code on the verification page to activate your account.</p>`
    );

    res
      .status(201)
      .json({ message: "User registered. Check your email for a 6-digit code." });
  } catch (error) {
    console.error("❌ Registration error:", error);
    next(error);
  }
};

// ✅ Verify Email — check 6-digit code
export const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verified)
      return res.status(400).json({ message: "Account already verified" });

    if (user.verificationCode !== code)
      return res.status(400).json({ message: "Invalid verification code" });

    await prisma.user.update({
      where: { email },
      data: { verified: true, verificationCode: null },
    });

    res.json({ message: "Account verified successfully!" });
  } catch (error) {
    console.error("❌ Verification error:", error);
    next(error);
  }
};

// ✅ Login User
// ✅ Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Find user by email only
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    // Check if user is verified
    if (!user.verified)
      return res
        .status(400)
        .json({ message: "Please verify your account before logging in." });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    // Generate JWT token
    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    // Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};


// ✅ Forgot Password (send reset link)
export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes

    await prisma.user.update({
      where: { email },
      data: { resetToken, resetTokenExpiry },
    });

    const resetLink = `${FRONTEND_URL}/reset-password?token=${resetToken}&email=${email}`;
    await sendEmail(
      email,
      "Reset your CodeNest Password",
      `<p>Click the link below to reset your password (valid for 15 minutes):</p>
      <a href="${resetLink}">${resetLink}</a>`
    );

    res.json({ message: "Password reset email sent successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ Reset Password
export const resetPassword = async (req, res, next) => {
  try {
    const { email, token, newPassword } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.resetToken !== token)
      return res.status(400).json({ message: "Invalid or expired reset token" });

    if (new Date() > user.resetTokenExpiry)
      return res.status(400).json({ message: "Reset token expired" });

    const hashed = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { email },
      data: { password: hashed, resetToken: null, resetTokenExpiry: null },
    });

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    next(error);
  }
};
