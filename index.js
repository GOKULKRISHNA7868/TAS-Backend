const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/send-email", async (req, res) => {
  const { toEmail, taskTitle, dueDate } = req.body;

  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: 587,
    secure: false,
    auth: {
      user: "gokultupakula@outlook.com",
      pass: "Gokul@7868", // use App Password if 2FA is on
    },
  });

  const mailOptions = {
    from: '"Task Manager" <gokultupakula@outlook.com>',
    to: toEmail,
    subject: "📝 New Task Assigned",
    html: `
      <h3>You've been assigned a new task!</h3>
      <p><strong>Title:</strong> ${taskTitle}</p>
      <p><strong>Due Date:</strong> ${dueDate}</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: "Email sent" });
  } catch (error) {
    console.error("❌ Error sending email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(3001, () => {
  console.log("✅ Email server running on http://localhost:3001");
});
