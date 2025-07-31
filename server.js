import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

const app = express();
app.use(cors()); // ✅ Allow all origins
app.use(express.json()); // ✅ Parse JSON body

const EMAIL_USER = "gokultupakula9494@gmail.com";
const EMAIL_PASS = "vjvw dept gzig daeu";

app.post("/send-email", async (req, res) => {
  const { to, subject, text, html } = req.body;

  if (!to || !subject || (!text && !html)) {
    return res.status(400).json({ error: "Missing fields" });
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
  } catch (err) {
    console.error("Mail error:", err);
    res.status(500).json({ error: "Email failed", detail: err.message });
  }
});

export default app;
