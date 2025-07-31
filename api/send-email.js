import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ✅ Set CORS headers manually before anything else
  if (req.method === "OPTIONS") {
    res
      .status(200)
      .setHeader("Access-Control-Allow-Origin", "*")
      .setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
      .setHeader("Access-Control-Allow-Headers", "Content-Type")
      .end();
    return;
  }

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const EMAIL_USER = "gokultupakula9494@gmail.com"; // Replace
  const EMAIL_PASS = "vjvw dept gzig daeu"; // Replace

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"TAS System" <${EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    return res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Send error:", error);
    return res
      .status(500)
      .json({ error: "Failed to send email", detail: error.message });
  }
}
