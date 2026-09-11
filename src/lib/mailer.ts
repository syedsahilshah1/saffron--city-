import nodemailer from "nodemailer";
import { StoredInquiry, StoredSettings } from "./types";

export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  text?: string;
}

let cachedTransporter: any = null;
let lastTransporterKey = "";

function getMailTransporter(settings?: Partial<StoredSettings>) {
  const host = settings?.smtpHost || process.env.SMTP_HOST || "smtp.hostinger.com";
  const user = settings?.smtpUser || process.env.SMTP_USER || "info@saffroncity.org";
  const pass = settings?.smtpPass || process.env.SMTP_PASS || "2igu-plh8-etms-ioqc";
  const port = Number(settings?.smtpPort || process.env.SMTP_PORT) || 465;
  const isSecure = settings?.smtpSecure !== undefined ? Boolean(settings.smtpSecure) : port === 465;

  if (!host || !user || !pass) {
    return null;
  }

  const key = `${host}:${port}:${user}:${pass}:${isSecure}`;
  if (cachedTransporter && lastTransporterKey === key) {
    return cachedTransporter;
  }

  cachedTransporter = nodemailer.createTransport({
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
    host: host,
    port: port,
    secure: isSecure,
    auth: {
      user: user,
      pass: pass,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
  });

  lastTransporterKey = key;
  return cachedTransporter;
}

export async function sendLeadNotificationEmail(
  lead: StoredInquiry,
  settings: StoredSettings
): Promise<{ success: boolean; message: string }> {
  const targetEmail = settings.leadNotificationEmail || settings.officialEmail || "info@saffroncity.org";
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
            <a href="https://saffroncity.pk/ubaid/login" class="button">Open Executive CRM Dashboard</a>
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
  console.log(`[SMTP Mailer Engine] Lead: ${lead.name} | Phone: ${lead.phone} | Plot: ${lead.plotSize || "N/A"}`);

  try {
    const transporter = getMailTransporter(settings);
    if (transporter) {
      const fromEmail = settings.smtpFromEmail || settings.smtpUser || "info@saffroncity.org";
      const info = await transporter.sendMail({
        from: `"Saffron City Islamabad" <${fromEmail}>`,
        to: targetEmail,
        subject: subject,
        html: htmlContent,
      });

      console.log(`[SMTP Mailer Engine] ✅ Email successfully sent via SMTP! MessageID: ${info.messageId}`);
      return {
        success: true,
        message: `Lead email alert dispatched to ${targetEmail} (ID: ${info.messageId})`,
      };
    } else {
      console.log(`[SMTP Mailer Engine] ℹ️ SMTP is disabled or unconfigured. Email logged to console.`);
      return {
        success: true,
        message: `Lead recorded. SMTP disabled, alert logged to server console.`,
      };
    }
  } catch (error: any) {
    console.error("[SMTP Mailer Engine] ❌ Error sending lead alert:", error);
    return {
      success: false,
      message: `Failed to dispatch email: ${error.message || error}`,
    };
  }
}

export async function sendPasswordResetOtpEmail(
  targetEmail: string,
  otpCode: string,
  settings: StoredSettings
): Promise<{ success: boolean; message: string }> {
  const subject = `🔐 [Saffron City Admin] Your 6-Digit Password Reset OTP: ${otpCode}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #0f172a; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 20px 40px rgba(0,0,0,0.25); }
        .header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%); padding: 30px 20px; text-align: center; border-bottom: 3px solid #D4A017; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; letter-spacing: 0.5px; }
        .header p { color: #D4A017; margin: 6px 0 0 0; font-size: 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 1.5px; }
        .content { padding: 32px 28px; text-align: center; }
        .title { font-size: 18px; font-weight: 700; color: #0f172a; margin-bottom: 8px; }
        .subtitle { font-size: 13px; color: #64748b; line-height: 1.6; margin-bottom: 24px; }
        .otp-box { background: #fef3c7; border: 2px dashed #D4A017; border-radius: 16px; padding: 20px; margin: 0 auto 24px auto; max-width: 320px; }
        .otp-code { font-size: 36px; font-weight: 900; letter-spacing: 10px; color: #92400e; font-family: monospace; }
        .expiry-note { font-size: 11px; color: #b45309; font-weight: 600; margin-top: 6px; }
        .warning { font-size: 12px; color: #ef4444; background: #fef2f2; padding: 12px; border-radius: 10px; border: 1px solid #fecaca; margin-top: 16px; text-align: left; }
        .footer { background: #f8fafc; padding: 18px; text-align: center; font-size: 11px; color: #94a3b8; border-top: 1px solid #f1f5f9; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SAFFRON CITY ISLAMABAD</h1>
          <p>Admin Security Authentication</p>
        </div>
        <div class="content">
          <div class="title">Password Reset Request</div>
          <div class="subtitle">Use the 6-digit verification code below to authorize your password change. This code is valid for 15 minutes.</div>
          
          <div class="otp-box">
            <div class="otp-code">${otpCode}</div>
            <div class="expiry-note">⏱️ Expires in 15 minutes</div>
          </div>

          <div class="warning">
            ⚠️ <strong>Security Notice:</strong> If you did not request this password reset, please ignore this email or contact the super administrator immediately.
          </div>
        </div>
        <div class="footer">
          Saffron City Portal Security &bull; SKB Technology Infrastructure
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = getMailTransporter(settings);
    if (!transporter) {
      console.warn(`[SMTP Mailer Engine] ⚠️ SMTP is disabled or missing credentials. Cannot send OTP email to: ${targetEmail}`);
      return {
        success: false,
        message: `SMTP email server is not configured. Please configure SMTP in System Settings to send OTP emails.`,
      };
    }

    const fromEmail = settings.smtpFromEmail || settings.smtpUser || "info@saffroncity.org";
    const info = await transporter.sendMail({
      from: `"Saffron City Security" <${fromEmail}>`,
      to: targetEmail,
      subject: subject,
      html: htmlContent,
    });

    console.log(`[SMTP Mailer Engine] ✅ Password Reset OTP email dispatched to ${targetEmail} (MessageID: ${info.messageId})`);
    return {
      success: true,
      message: `Verification code sent to ${targetEmail}`,
    };
  } catch (err: any) {
    console.error("[SMTP Mailer Engine] ❌ Error sending OTP email to", targetEmail, ":", err?.message || err);
    return {
      success: false,
      message: err.message || "Failed to dispatch OTP email via SMTP",
    };
  }
}

export async function sendTestSmtpEmail(
  targetEmail: string,
  settings: StoredSettings
): Promise<{ success: boolean; message: string }> {
  if (!settings.smtpEnabled) {
    return { success: false, message: "SMTP is currently disabled in Settings. Please enable it first." };
  }

  if (!settings.smtpHost || !settings.smtpUser || !settings.smtpPass) {
    return { success: false, message: "SMTP Host, Username, and Password must all be configured." };
  }

  const subject = `✅ [Saffron City] SMTP Configuration Test Successful`;
  const timestamp = new Date().toLocaleString("en-PK", { timeZone: "Asia/Karachi" });

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background-color: #f8fafc; margin: 0; padding: 20px; color: #1e293b; }
        .container { max-width: 550px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
        .header { background: linear-gradient(135deg, #059669 0%, #047857 100%); padding: 25px; text-align: center; border-bottom: 3px solid #D4A017; }
        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 700; }
        .header p { color: #d1fae5; margin: 6px 0 0 0; font-size: 13px; font-weight: 600; }
        .content { padding: 28px; }
        .status-box { background: #ecfdf5; border: 1px solid #a7f3d0; border-radius: 12px; padding: 16px; margin-bottom: 20px; }
        .status-title { color: #065f46; font-weight: 700; font-size: 15px; margin-bottom: 4px; }
        .status-desc { color: #047857; font-size: 13px; }
        .details-table { width: 100%; border-collapse: collapse; margin-top: 16px; font-size: 13px; }
        .details-table td { padding: 8px 12px; border-bottom: 1px solid #f1f5f9; }
        .details-table td:first-child { font-weight: bold; color: #64748b; width: 40%; }
        .details-table td:last-child { color: #0f172a; }
        .footer { background: #f8fafc; padding: 16px; text-align: center; font-size: 12px; color: #94a3b8; border-top: 1px solid #e2e8f0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>SAFFRON CITY ISLAMABAD</h1>
          <p>SMTP Mail Server Diagnostics</p>
        </div>
        <div class="content">
          <div class="status-box">
            <div class="status-title">🎉 SMTP Connection Verified!</div>
            <div class="status-desc">Your mail server connection is operating correctly and ready to deliver real-time customer leads and alerts.</div>
          </div>

          <table class="details-table">
            <tr>
              <td>SMTP Host:</td>
              <td>${settings.smtpHost}</td>
            </tr>
            <tr>
              <td>Port & Security:</td>
              <td>Port ${settings.smtpPort} (${settings.smtpSecure ? "SSL/TLS" : "STARTTLS/Plain"})</td>
            </tr>
            <tr>
              <td>Sender Account:</td>
              <td>${settings.smtpUser}</td>
            </tr>
            <tr>
              <td>Recipient:</td>
              <td>${targetEmail}</td>
            </tr>
            <tr>
              <td>Test Timestamp:</td>
              <td>${timestamp} PKT</td>
            </tr>
          </table>
        </div>
        <div class="footer">
          Saffron City Executive Mail Engine &bull; System Health Check
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transporter = getMailTransporter(settings);
    if (!transporter) {
      return { success: false, message: "Transporter could not be initialized with provided settings." };
    }

    // Verify SMTP connection
    await transporter.verify();

    const fromEmail = settings.smtpFromEmail || settings.smtpUser;
    const info = await transporter.sendMail({
      from: `"Saffron City Test" <${fromEmail}>`,
      to: targetEmail,
      subject: subject,
      html: htmlContent,
    });

    return {
      success: true,
      message: `Test email sent successfully to ${targetEmail} (ID: ${info.messageId})`,
    };
  } catch (error: any) {
    console.error("[SMTP Mailer Test Error]:", error);
    return {
      success: false,
      message: `SMTP test failed: ${error.message || error}`,
    };
  }
}
