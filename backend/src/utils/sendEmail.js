import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `"CodeNest Developers" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    console.log("📧 Email sent:", info.messageId);
  } catch (error) {
    console.error("Email error:", error);
    throw new Error("Failed to send email");
  }
};
