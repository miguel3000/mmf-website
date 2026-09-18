import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_SIZE = 4.5 * 1024 * 1024; // 4.5MB Vercel limit

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File | null;
    const token = formData.get("token") as string | null;

    if (!file || !token) {
      return NextResponse.json(
        { error: "Missing file or verification" },
        { status: 400 }
      );
    }

    if (file.size > MAX_SIZE) {
      return NextResponse.json(
        { error: "File too large (max 4.5MB)" },
        { status: 400 }
      );
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Only images allowed" },
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

    const buffer = Buffer.from(await file.arrayBuffer());

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
      from: `"Recepten Upload" <${process.env.SMTP_USER}>`,
      to: "nieuwrecept@miguelm.nl",
      subject: `Nieuw recept: ${file.name}`,
      text: "Er is een nieuw recept geüpload via de website.",
      html: `
        <h2>Nieuw recept geüpload</h2>
        <p>Bestand: ${file.name} (${(file.size / 1024).toFixed(0)} KB)</p>
        <p>Zie bijlage.</p>
      `,
      attachments: [
        {
          filename: file.name,
          content: buffer,
          contentType: file.type,
        },
      ],
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Failed to send" },
      { status: 500 }
    );
  }
}
