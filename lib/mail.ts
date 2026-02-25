import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactEmailPayload {
  name: string;
  email: string;
  message: string;
  createdAt: string;
}

function escapeHtml(input: string): string {
  return input
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export async function sendContactEmail(
  payload: ContactEmailPayload,
): Promise<boolean> {
  const { name, email, message, createdAt } = payload;

  const to = process.env.EMAIL_TO ?? process.env.TO_EMAIL;
  const from = process.env.FROM_EMAIL
    ? `Portfolio <${process.env.FROM_EMAIL}>`
    : "Portfolio <onboarding@resend.dev>";
  const decorUrl = process.env.MAIL_DECOR_URL; // optional: https://your-domain.com/mail/flower-decor.png

  if (!to) {
    console.error("[mail] EMAIL_TO/TO_EMAIL is not set.");
    return false;
  }

  const safeName = escapeHtml(name);
  const safeEmail = escapeHtml(email);
  const safeMessage = escapeHtml(message).replace(/\n/g, "<br/>");
  const sentAt = new Date(createdAt).toLocaleString("en-US", {
    dateStyle: "full",
    timeStyle: "short",
  });

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New Contact Message from ${safeName}`,
      html: `
<!doctype html>
<html lang="en">
  <head>
    <meta charSet="UTF-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <meta name="color-scheme" content="light only" />
    <meta name="supported-color-schemes" content="light" />
    <style>
      :root { color-scheme: light only !important; }
      a[x-apple-data-detectors], #MessageViewBody a, u + #body a {
        color: inherit !important;
        text-decoration: none !important;
        font: inherit !important;
      }
    </style>
  </head>
  <body id="body" style="margin:0;padding:0;background:#0b0d10;" bgcolor="#0b0d10">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="#0b0d10" style="background:#0b0d10;">
      <tr>
        <td align="center" style="padding:24px 12px;">
          <table role="presentation" width="620" cellpadding="0" cellspacing="0" border="0" bgcolor="#111315" style="width:100%;max-width:620px;background:#111315;border:1px solid #23272b;border-radius:16px;">
            <tr>
              <td style="padding:18px 20px;border-bottom:1px solid #23272b;background:#12161a;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td valign="top">
                      <div style="font-size:12px;letter-spacing:.08em;color:#9aa0a6;text-transform:uppercase;">
                        Portfolio Notification
                      </div>
                      <div style="margin-top:8px;font-size:30px;line-height:1.3;font-weight:700;color:#8cff2e;">
                        New Contact Message
                      </div>
                    </td>
                    ${decorUrl
          ? `<td align="right" valign="top" style="width:120px;">
                             <img src="${escapeHtml(decorUrl)}" width="96" alt="" style="display:block;opacity:.28;border:0;outline:none;text-decoration:none;" />
                           </td>`
          : ""
        }
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:18px 20px;">
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="padding:10px 0;color:#9aa0a6;width:110px;vertical-align:top;">Name</td>
                    <td style="padding:10px 0;color:#ffffff;font-weight:600;">${safeName}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#9aa0a6;vertical-align:top;">Email</td>
                    <td style="padding:10px 0;color:#8cff2e;">
                      <a href="mailto:${safeEmail}" style="color:#8cff2e;">${safeEmail}</a>
                    </td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#9aa0a6;vertical-align:top;">Sent at</td>
                    <td style="padding:10px 0;color:#d1d5db;">${escapeHtml(sentAt)}</td>
                  </tr>
                  <tr>
                    <td style="padding:10px 0;color:#9aa0a6;vertical-align:top;">Message</td>
                    <td style="padding:10px 0;color:#f3f4f6;line-height:1.65;">${safeMessage}</td>
                  </tr>
                </table>
              </td>
            </tr>

            <tr>
              <td style="padding:12px 20px;border-top:1px solid #23272b;color:#7c828a;font-size:12px;">
                Auto-generated from your portfolio contact form.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    });

    if (error) {
      console.error("[mail] Resend error:", error);
      return false;
    }

    return true;
  } catch (err) {
    console.error("[mail] Failed to send contact email:", err);
    return false;
  }
}
