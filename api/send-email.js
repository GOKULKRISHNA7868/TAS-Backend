import nodemailer from "nodemailer";

export default async function handler(req, res) {
  // ✅ CORS headers for all requests
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // ✅ Respond to preflight request
  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // ✅ Only allow POST after CORS
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { to, subject, text } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "gokultupakula9494@gmail.com", // ✅ your Gmail
      pass: "vjvw dept gzig daeu", // ✅ app password
    },
  });

  try {
    await transporter.sendMail({
      from: "gokultupakula9494@gmail.com", // ✅ sender email
      to,
      subject,
      text,
    });

    return res.status(200).json({ message: "Email sent successfully!" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
