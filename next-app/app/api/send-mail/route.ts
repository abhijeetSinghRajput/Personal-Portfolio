import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { from_name, from_email, message, to_name } = await req.json();

    if (!from_name || !from_email || !message) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const escapeHtml = (text: string) =>
      text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const emailTo = process.env.EMAIL_TO || "abhijeetsinghrajput17@gmail.com";

    const htmlContent = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #4CAF50; text-align: center;">New Contact Message</h2>
        <p><strong>Recipient:</strong> ${escapeHtml(to_name || "Abhijeet")}</p>
        <p><strong>From:</strong> ${escapeHtml(from_name)} (&lt;${escapeHtml(from_email)}&gt;)</p>
        <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;" />
        <p style="white-space: pre-wrap;">${escapeHtml(message)}</p>
      </div>
    `;

    if (!emailUser || !emailPass) {
      // In development or when credentials aren't present, simulate success for testing
      console.log("Mocking email send:", { from_name, from_email, message });
      return NextResponse.json(
        { message: "Email send simulated (add EMAIL_USER/EMAIL_PASS in .env to send live emails)" },
        { status: 200 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      secure: true,
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"${from_name}" <${emailUser}>`,
      replyTo: from_email,
      to: emailTo,
      subject: `New message from ${from_name}`,
      html: htmlContent,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: "Email sent successfully" },
      { status: 200 }
    );
  } catch (error: unknown) {
    const errorMsg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json(
      { message: "Failed to send email", error: errorMsg },
      { status: 500 }
    );
  }
}
