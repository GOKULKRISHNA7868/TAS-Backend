import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // Allow preflight requests
  if (req.method === "OPTIONS") {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    return res.status(200).end();
  }

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { to, subject, text } = req.body;

  if (!to || !subject || !text) {
    return res.status(400).json({ message: "Missing fields" });
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
    console.error("Error sending email:", error);
    return res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
}
