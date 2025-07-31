import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*"); // Allow all origins
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle OPTIONS method
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "GET") {
    return res.status(405).json({ error: "Only GET method is allowed" });
  }

  const { to, subject, text } = req.query;

  if (!to || !subject || !text) {
    return res.status(400).json({
      error: "Missing required fields: to, subject, text",
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
    const info = await transporter.sendMail({
      from: "gokultupakula9494@gmail.com",
      to,
      subject,
      text,
    });

    return res.status(200).json({
      message: "Email sent successfully ✅",
      messageId: info.messageId,
    });
  } catch (error) {
    return res.status(500).json({
      error: "Failed to send email ❌",
      details: error.message,
    });
  }
}
