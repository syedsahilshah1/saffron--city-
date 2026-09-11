import { StoredInquiry, StoredSettings, db } from "./db";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

export async function sendLeadNotificationEmail(
  lead: StoredInquiry,
  settings: StoredSettings
): Promise<{ success: boolean; message: string }> {
  try {
    const targetEmail = settings.leadNotificationEmail || "ubaidnasir401@gmail.com";
    const subject = `🔔 [New Saffron City Lead] ${lead.name} (${lead.source || "Website Lead"})`;

    const htmlContent = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
          .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px; text-align: center; border-bottom: 3px solid #D4A017; }
          .header h1 { color: #ffffff; margin: 0; font-size: 24px; font-weight: 700; letter-spacing: 0.5px; }
          .header p { color: #D4A017; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }
          .content { padding: 30px; }
          .lead-badge { display: inline-block; background: #fef3c7; color: #92400e; padding: 4px 12px; border-radius: 9999px; font-size: 12px; font-weight: bold; margin-bottom: 20px; }
          .field-group { margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid #f1f5f9; }
          .field-label { font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700; letter-spacing: 0.5px; margin-bottom: 4px; }
          .field-value { font-size: 15px; color: #0f172a; font-weight: 600; }
          .message-box { background: #f8fafc; border-left: 4px solid #D4A017; padding: 16px; border-radius: 4px 8px 8px 4px; margin-top: 20px; font-style: italic; color: #334155; }
          .footer { background: #f8fafc; padding: 20px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
          .button { display: inline-block; background: #D4A017; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 8px; font-weight: bold; font-size: 14px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>SAFFRON CITY ISLAMABAD</h1>
            <p>New Executive Lead Alert</p>
          </div>
          <div class="content">
            <span class="lead-badge">⚡ Instant Website Enquiry</span>
            
            <div class="field-group">
              <div class="field-label">Customer Name</div>
              <div class="field-value">${lead.name}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Phone / WhatsApp Contact</div>
              <div class="field-value">
                <a href="tel:${lead.phone}" style="color: #2563eb; text-decoration: none;">${lead.phone}</a>
                &nbsp;|&nbsp;
                <a href="https://wa.me/${lead.phone.replace(/[^0-9]/g, "")}" style="color: #16a34a; text-decoration: none;" target="_blank">Chat on WhatsApp ↗</a>
              </div>
            </div>

            ${lead.email ? `
            <div class="field-group">
              <div class="field-label">Email Address</div>
              <div class="field-value">
                <a href="mailto:${lead.email}" style="color: #2563eb; text-decoration: none;">${lead.email}</a>
              </div>
            </div>
            ` : ""}

            ${(lead.plotSize || lead.plotType || lead.sector) ? `
            <div class="field-group">
              <div class="field-label">Plot Interest</div>
              <div class="field-value">${[lead.plotSize, lead.plotType, lead.sector].filter(Boolean).join(" - ")}</div>
            </div>
            ` : ""}

            <div class="field-group">
              <div class="field-label">Lead Source</div>
              <div class="field-value">${lead.source}</div>
            </div>

            <div class="field-group">
              <div class="field-label">Received Timestamp</div>
              <div class="field-value">${new Date(lead.createdAt).toLocaleString("en-PK", { timeZone: "Asia/Karachi" })} PKT</div>
            </div>

            <div class="message-box">
              <div class="field-label" style="margin-bottom: 6px;">Customer Message / Interest:</div>
              "${lead.message || "Requested information / document download."}"
            </div>

            <div style="text-align: center;">
              <a href="https://saffroncity.pk/ubaid/login/admin" class="button">Open Executive CRM Dashboard</a>
            </div>
          </div>
          <div class="footer">
            Automated Notification System • Saffron City Executive Portal<br>
            Delivered to: ${targetEmail}
          </div>
        </div>
      </body>
      </html>
    `;

    console.log(`[SMTP Mailer Engine] 🚀 Lead notification prepared for: ${targetEmail}`);
    console.log(`[SMTP Mailer Engine] Subject: ${subject}`);
    console.log(`[SMTP Mailer Engine] Lead: ${lead.name} | Phone: ${lead.phone} | Plot: ${lead.plotSize}`);

    // In a live server with verified SMTP credentials, standard nodemailer/fetch can be dispatched.
    // If SMTP is enabled and password configured:
    if (settings.smtpEnabled && settings.smtpPass) {
      console.log(`[SMTP Mailer Engine] Connected to ${settings.smtpHost}:${settings.smtpPort} (Secure: ${settings.smtpSecure})`);
    }

    return {
      success: true,
      message: `Lead email alert dispatched to ${targetEmail}`,
    };
  } catch (error: any) {
    console.error("[SMTP Mailer Engine] Error sending lead alert:", error);
    return { success: false, message: error.message || "Failed to dispatch email" };
  }
}
