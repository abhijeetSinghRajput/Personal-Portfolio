const nodemailer = require("nodemailer");
require("dotenv").config({ path: "./backend/.env" });

const fs = require("fs");
const path = require("path");

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({
        message: "Method Not Allowed " + event.httpMethod,
      }),
    };
  }

  const { from_name, from_email, message, to_name } = JSON.parse(event.body);

  // 🔹 Read template
  const templatePath = path.join(__dirname, "email-template.html");
  let html = fs.readFileSync(templatePath, "utf8");

  // 🔹 Replace variables (escape HTML to prevent XSS)
  const escapeHtml = (text) => {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  };

  html = html
    .replace(/{{to_name}}/g, to_name)
    .replace(/{{from_name}}/g, escapeHtml(from_name))
    .replace(/{{from_email}}/g, escapeHtml(from_email))
    .replace(/{{message}}/g, escapeHtml(message));

  const transporter = nodemailer.createTransport({
    service: "gmail",
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: `"${from_name}" <${process.env.EMAIL_USER}>`, // ✅ Fixed: Gmail doesn't allow arbitrary 'from' addresses
    replyTo: from_email, // ✅ Added: So you can reply directly to the sender
    to: process.env.EMAIL_TO,
    subject: `New message from ${from_name}`,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Email sent successfully" }),
    };
  } catch (error) {
    // console.error("Error:", error); 
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to send email",
        error: error.message,
      }),
    };
  }
};
