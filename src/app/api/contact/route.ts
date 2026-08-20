import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const { name, email, message, token } = await request.json();

    if (!name || !email || !message || !token) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const turnstileRes = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          secret: process.env.TURNSTILE_SECRET!,
          response: token,
        }),
      }
    );

    const turnstileData = await turnstileRes.json();
    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "Bot verification failed" },
        { status: 403 }
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 465,
      secure: (Number(process.env.SMTP_PORT) || 465) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      replyTo: email,
      to: process.env.SMTP_TO,
      subject: `Contactformulier: ${name}`,
      text: `Naam: ${name}\nE-mail: ${email}\n\n${message}`,
      html: `
        <h2>Nieuw bericht via contactformulier</h2>
        <p><strong>Naam:</strong> ${name}</p>
        <p><strong>E-mail:</strong> <a href="mailto:${email}">${email}</a></p>
        <hr />
        <p>${message.replace(/\n/g, "<br />")}</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send message" },
      { status: 500 }
    );
  }
}
