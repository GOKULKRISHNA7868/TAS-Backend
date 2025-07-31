import nodemailer from "nodemailer";

export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: "Only GET method is allowed for now" });
  }

  const { to, subject, text } = req.query;

  if (!to || !subject || !text) {
    return res
      .status(400)
      .json({ error: "Missing required fields: to, subject, text" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "vjvw dept gzig daeu", // App password from Google
    },
  });

  try {
    await transporter.sendMail({
      from: "gokultupakula9494@gmail.com",
      to,
      subject,
      text,
    });

    return res.status(200).json({ message: "✅ Email sent successfully" });
  } catch (error) {
    console.error("Email send error:", error);
    return res.status(500).json({ error: error.message });
  }
}
