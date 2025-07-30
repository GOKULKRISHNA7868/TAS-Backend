// backend/api/send-email.js
const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  if (req.method !== "POST") {
    return res.status(405).send("Method Not Allowed");
  }

  const { toEmail, taskTitle, dueDate } = req.body;

  if (!toEmail || !taskTitle || !dueDate) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const info = await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: toEmail,
      subject: "📝 New Task Assigned",
      html: `
        <h3>You've been assigned a new task!</h3>
        <p><strong>Title:</strong> ${taskTitle}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
      `,
    });

    console.log("✅ Email sent:", info.messageId);
    res.status(200).json({ message: "Email sent" });
  } catch (err) {
    console.error("❌ Error sending email:", err);
    res.status(500).json({ error: "Failed to send email" });
  }
};
