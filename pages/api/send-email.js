import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ✅ Handle CORS for both OPTIONS and actual requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  // ✅ Set CORS for all other methods
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({
      error: "Missing required fields: to, subject, and either text or html",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // App password from Google
    },
  });

  try {
    const mailOptions = {
      from: "gokultupakula9494@gmail.com",
      to,
      subject,
      text: text || undefined,
      html: html || undefined,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({ message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res
      .status(500)
      .json({ error: `❌ Failed to send: ${error.message}` });
  }
}
