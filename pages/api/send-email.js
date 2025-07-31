import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("🔔 Request method:", req.method);

  // Allow all origins (CORS)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    console.log("🛑 Preflight request received");
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    console.log("❌ Method not allowed");
    return res.status(405).json({ error: "Only GET method is allowed" });
  }

  const { to, subject, text } = req.query;

  console.log("📨 Query Params:", { to, subject, text });

  if (!to || !subject || !text) {
    console.log("❌ Missing fields");
    return res
      .status(400)
      .json({ error: "Missing required fields: to, subject, text" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // Google App password
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
