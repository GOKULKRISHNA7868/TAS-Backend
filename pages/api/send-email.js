import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "http://127.0.0.1:3003");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Handle preflight
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "gokultupakula9494@gmail.com",
        pass: "vjvw dept gzig daeu",
      },
    });

    const info = await transporter.sendMail({
      from: "your-email@gmail.com",
      to,
      subject,
      text,
    });

    return res.status(200).json({ message: "Email sent", info });
  } catch (error) {
    console.error("Error:", error);
    return res
      .status(500)
      .json({ message: "Failed to send email", error: error.message });
  }
}
