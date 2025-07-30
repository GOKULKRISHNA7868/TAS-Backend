export default function handler(req, res) {
  if (req.method === "POST") {
    const { to, subject, text } = req.body;

    // Dummy check (in real code, send the email here)
    if (!to || !subject || !text) {
      return res.status(400).json({ error: "Missing fields" });
    }

    return res.status(200).json({ message: "Email sent successfully!" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
