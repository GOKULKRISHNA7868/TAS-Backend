import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors());
app.use(express.json());

const EMAIL_USER = "gokultupakula9494@gmail.com"; // ← replace
const EMAIL_PASS = "vjvw dept gzig daeu"; // ← replace

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL_USER,
        pass: EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: `"TAS System" <${EMAIL_USER}>`,
      to,
      subject,
      text,
      html,
    });

    res.status(200).json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res
      .status(500)
      .json({ error: "Failed to send email", detail: error.message });
  }
});

// ✅ Export as handler for Vercel
export default app;
