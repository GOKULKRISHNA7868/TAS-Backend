import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ✅ CORS headers for all requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Respond to preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Block all methods except POST
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text, html } = req.body;

  // Basic validation
  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({
      error: "Missing required fields: to, subject, and either text or html",
    });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // App password
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
    return res
      .status(500)
      .json({ error: `❌ Failed to send: ${error.message}` });
  }
}
