import nodemailer from "nodemailer";

export default async function handler(req, res) {
  console.log("📥 Incoming request:", req.method, req.url);

  // ✅ Set CORS headers first (for all methods)
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Handle CORS preflight request
  if (req.method === "OPTIONS") {
    console.log("🛡️ Handling CORS preflight (OPTIONS)");
    return res.status(200).end();
  }

  // ✅ Allow only GET method for now
  if (req.method !== "GET") {
    console.warn("🚫 Method not allowed:", req.method);
    return res
      .status(405)
      .json({ error: "Only GET method is allowed for now" });
  }

  console.log("✅ Handling GET request");

  const { to, subject, text } = req.query;
  console.log("📨 Parsed query params:", { to, subject, text });

  if (!to || !subject || !text) {
    console.warn("⚠️ Missing required fields");
    return res.status(400).json({
      error: "Missing required fields: to, subject, text",
    });
  }

  // ✅ Configure Nodemailer
  console.log("🔧 Setting up Nodemailer transport");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // App password
    },
  });

  try {
    // ✅ Prepare mail options
    const mailOptions = {
      from: "gokultupakula9494@gmail.com",
      to,
      subject,
      text,
    };
    console.log("📤 Sending email with options:", mailOptions);

    // ✅ Send mail
    const info = await transporter.sendMail(mailOptions);
    console.log("✅ Email sent successfully:", info.messageId);

    return res.status(200).json({ message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("❌ Email send error:", error);
    return res
      .status(500)
      .json({ error: `❌ Failed to send: ${error.message}` });
  }
}
