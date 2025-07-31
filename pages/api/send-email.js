import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end(); // Preflight success
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests allowed" });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // Use your Gmail App Password
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
    console.error("❌ Email send error:", error);
    return res.status(500).json({ error: error.message });
  }
}
