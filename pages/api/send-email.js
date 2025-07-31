import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("🔔 Request method:", req.method);

  // ✅ Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    console.log("🛑 Preflight CORS request");
    return res.status(200).end();
  }

  // ✅ Only allow GET requests
  if (req.method !== "GET") {
    console.log("❌ Method not allowed:", req.method);
    return res.status(405).json({ error: "Only GET method is allowed" });
  }

  const { to, subject, text } = req.query;

  console.log("📨 Query parameters received:", { to, subject, text });

  if (!to || !subject || !text) {
    console.log("❌ Missing required query parameters");
    return res.status(400).json({
      error: "Missing required fields: to, subject, and text",
    });
  }

  // ✅ Setup Nodemailer with Gmail
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // Use your app password (not Gmail password)
    },
  });

  try {
    const info = await transporter.sendMail({
      from: '"Gokul Krishna" <gokultupakula9494@gmail.com>',
      to,
      subject,
      text,
    });

    console.log("✅ Email sent successfully:", info.messageId);
    return res.status(200).json({ message: "Email sent successfully ✅" });
  } catch (error) {
    console.error("❌ Error while sending email:", error);
    return res.status(500).json({ error: error.message });
  }
}
