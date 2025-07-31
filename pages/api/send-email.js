import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("🔔 Email API called");

  // ✅ Allow CORS
  res.setHeader("Access-Control-Allow-Origin", "*"); // Use specific domain in production
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle preflight request
  if (req.method === "OPTIONS") {
    console.log("⚙️ Handling CORS preflight");
    return res.status(200).end();
  }

  // ✅ Only allow GET for now
  if (req.method !== "GET") {
    console.log("❌ Method not allowed:", req.method);
    return res
      .status(405)
      .json({ error: "Only GET method is allowed for now" });
  }

  const { to, subject, text } = req.query;

  console.log("📥 Query received:", { to, subject, text });

  if (!to || !subject || !text) {
    console.log("❌ Missing required fields");
    return res
      .status(400)
      .json({ error: "Missing required fields: to, subject, text" });
  }

  // ✅ Configure mail transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // App-specific password
    },
  });

  try {
    const info = await transporter.sendMail({
      from: "gokultupakula9494@gmail.com",
      to,
      subject,
      text,
    });

    console.log("✅ Email sent:", info.response);

    return res
      .status(200)
      .json({ message: "✅ Email sent successfully", info: info.response });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return res
      .status(500)
      .json({ error: error.message || "Failed to send email" });
  }
}
