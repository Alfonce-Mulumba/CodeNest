import { prisma } from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { sendEmail } from "../utils/sendEmail.js";

const SECRET = process.env.JWT_SECRET || "supersecret";
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// ✅ Register User
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) return res.status(400).json({ message: "Email already registered" });

    const hashed = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(32).toString("hex");

    const user = await prisma.user.create({
      data: { name, email, password: hashed, verificationToken },
    });

    const verifyLink = `${FRONTEND_URL}/verify?token=${verificationToken}&email=${email}`;
    await sendEmail(
      email,
      "Verify your CodeNest Account",
      `<p>Hello ${name},</p>
      <p>Please verify your account by clicking this link:</p>
      <a href="${verifyLink}">${verifyLink}</a>`
    );

    res.status(201).json({ message: "User registered. Check email to verify account." });
  } catch (error) {
    next(error);
  }
};

// ✅ Verify Email
export const verifyUser = async (req, res, next) => {
  try {
    const { email, token } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || user.verificationToken !== token)
      return res.status(400).json({ message: "Invalid token or user" });

    await prisma.user.update({
      where: { email },
      data: { verified: true, verificationToken: null },
    });

    res.json({ message: "Account verified successfully" });
  } catch (error) {
    next(error);
  }
};

// ✅ Login User
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) return res.status(401).json({ message: "User not found" });
    if (!user.verified) return res.status(401).json({ message: "Please verify your email first" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: "1d" });
    res.json({ message: "Login successful", token });
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
