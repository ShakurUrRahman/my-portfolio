import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
	host: "smtp-relay.brevo.com",
	port: 587,
	auth: {
		user: process.env.BREVO_SMTP_USER,
		pass: process.env.BREVO_SMTP_PASS,
	},
});

export async function POST(req: NextRequest) {
	try {
		const { name, email, message } = await req.json();

		if (!name || !email || !message) {
			return NextResponse.json(
				{ error: "Missing fields" },
				{ status: 400 },
			);
		}

		await transporter.sendMail({
			from: `"Shakur Portfolio" <shakururrahman@gmail.com>`, // ← verified sender
			to: process.env.CONTACT_EMAIL,
			replyTo: email,
			subject: `New Message from ${name} — Portfolio`,
			html: `
        <body style="background:#020208;font-family:Arial,sans-serif;padding:40px 20px;">
          <table width="100%" style="max-width:560px;margin:0 auto;background:rgba(10,8,25,0.95);border:1px solid rgba(139,92,246,0.3);border-radius:16px;overflow:hidden;">
            <tr>
              <td style="background:linear-gradient(135deg,rgba(139,92,246,0.8),rgba(6,182,212,0.6));padding:32px 40px;text-align:center;">
                <h1 style="margin:0;font-size:26px;font-weight:800;color:#fff;">New Message ✦</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:32px 40px;">
                <table width="100%" style="background:rgba(139,92,246,0.08);border:1px solid rgba(139,92,246,0.2);border-radius:10px;margin-bottom:24px;">
                  <tr>
                    <td style="padding:20px 24px;">
                      <p style="margin:0 0 4px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(139,92,246,0.7);">From</p>
                      <p style="margin:0 0 8px;font-size:18px;font-weight:700;color:#fff;">${name}</p>
                      <p style="margin:0;font-size:13px;color:rgba(139,92,246,0.9);">${email}</p>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 12px;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(139,92,246,0.7);">Message</p>
                <table width="100%" style="background:rgba(6,182,212,0.05);border:1px solid rgba(6,182,212,0.15);border-radius:10px;margin-bottom:32px;">
                  <tr>
                    <td style="padding:24px;">
                      <p style="margin:0;font-size:15px;line-height:1.8;color:rgba(200,190,240,0.85);">${message.replace(/\n/g, "<br/>")}</p>
                    </td>
                  </tr>
                </table>
                <div style="text-align:center;">
                  <a href="mailto:${email}" style="background:linear-gradient(135deg,rgba(139,92,246,0.9),rgba(6,182,212,0.7));color:#fff;text-decoration:none;font-size:13px;font-weight:600;letter-spacing:2px;text-transform:uppercase;padding:14px 32px;border-radius:8px;display:inline-block;">
                    Reply to ${name} →
                  </a>
                </div>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 40px;border-top:1px solid rgba(139,92,246,0.12);text-align:center;">
                <p style="margin:0;font-size:11px;color:rgba(200,190,240,0.3);">Sent from shakur.netlify.app</p>
              </td>
            </tr>
          </table>
        </body>
      `,
		});
		console.log(
			"SMTP USER:",
			process.env.BREVO_SMTP_USER ? "set" : "MISSING",
		);
		console.log(
			"SMTP KEY:",
			process.env.BREVO_SMTP_PASS ? "set" : "MISSING",
		);
		return NextResponse.json({ ok: true });
	} catch (e: any) {
		console.error("Mail error:", e?.message);
		return NextResponse.json(
			{ error: e?.message || "Failed" },
			{ status: 500 },
		);
	}
}
