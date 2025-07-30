import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Only POST requests are allowed" });
  }

  const { toEmail, taskTitle, dueDate } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: "Outlook", // or use smtp.office365.com
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USERNAME,
      to: toEmail,
      subject: "📝 New Task Assigned",
      html: `
        <h3>You've been assigned a new task!</h3>
        <p><strong>Title:</strong> ${taskTitle}</p>
        <p><strong>Due Date:</strong> ${dueDate}</p>
      `,
    });

    res.status(200).json({ success: true, message: "Email sent successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: "Failed to send email" });
  }
}
