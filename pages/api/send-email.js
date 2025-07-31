// pages/api/send-email.js
import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Handle CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Quick response for preflight
  }

  // Support both GET and POST
  const data = req.method === "GET" ? req.query : req.body;
  const { to, subject, text } = data;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // Use Gmail App Password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "gokultupakula9494@gmail.com",
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.messageId);
    return res.status(200).json({ message: "Email sent successfully ✅" });
  } catch (error) {
    console.error("❌ Email error:", error);
    return res.status(500).json({ error: "Email failed: " + error.message });
  }
}
