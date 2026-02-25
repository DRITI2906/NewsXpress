const Brevo = require("@getbrevo/brevo");

const apiKey = process.env.BREVO_API_KEY || process.env.BREVO_KEY;
const senderEmail = process.env.BREVO_USER;
const senderName = process.env.BREVO_SENDER_NAME || "NewsXpress";
const replyToEmail = process.env.ADMIN_EMAIL;

// Warn instead of throw — server boots without email credentials.
// Email endpoints will return 503 at runtime if config is missing.
if (!apiKey) {
  console.warn("⚠️  BREVO_API_KEY not set — email sending disabled.");
}
if (!senderEmail) {
  console.warn("⚠️  BREVO_USER not set — email sending disabled.");
}

let brevo = null;
if (apiKey && senderEmail) {
  brevo = new Brevo.TransactionalEmailsApi();
  brevo.setApiKey(Brevo.TransactionalEmailsApiApiKeys.apiKey, apiKey);
}

module.exports = {
  brevo,
  sender: {
    email: senderEmail || "",
    name: senderName,
  },
  replyTo: {
    email: replyToEmail || "",
    name: senderName,
  },
};
