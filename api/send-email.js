import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST method allowed" });
  }

  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com",
      pass: "labh ywrp wqtb jgib", // Use App Password, NOT your real password
    },
  });

  try {
    await transporter.sendMail({
      from: "your_email@gmail.com",
      to,
      subject,
      text,
    });

    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to send email", error: err.message });
  }
}
