import { sql, initDatabase } from './neonDb';

const EMAIL_CONFIG_KEY = 'twincode_email_config';
const INBOX_STORAGE_KEY = 'twincode_contact_inbox';

const DEFAULT_CONFIG = {
  notificationEmails: 'twin.code.developers@gmail.com',
  enableAutoReply: true
};

class EmailService {
  constructor() {
    this.initialized = false;
    this.init();
  }

  async init() {
    if (!this.initialized) {
      await initDatabase();
      this.initialized = true;
    }
  }

  getConfig() {
    const data = localStorage.getItem(EMAIL_CONFIG_KEY);
    return data ? JSON.parse(data) : DEFAULT_CONFIG;
  }

  saveConfig(newConfig) {
    const updated = {
      ...this.getConfig(),
      ...newConfig,
      updatedAt: new Date().toISOString()
    };
    localStorage.setItem(EMAIL_CONFIG_KEY, JSON.stringify(updated));

    // Async save to PostgreSQL
    this.saveConfigToDb(updated);
    return updated;
  }

  async saveConfigToDb(config) {
    try {
      await this.init();
      await sql`
        INSERT INTO email_settings (key, notification_emails, enable_auto_reply, updated_at)
        VALUES ('primary', ${config.notificationEmails}, ${config.enableAutoReply}, CURRENT_TIMESTAMP)
        ON CONFLICT (key) DO UPDATE
        SET notification_emails = EXCLUDED.notification_emails,
            enable_auto_reply = EXCLUDED.enable_auto_reply,
            updated_at = CURRENT_TIMESTAMP;
      `;
    } catch (e) {
      console.warn("Could not sync email config with Postgres:", e);
    }
  }

  getMessages() {
    const data = localStorage.getItem(INBOX_STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  async fetchMessagesFromDb() {
    try {
      await this.init();
      const rows = await sql`
        SELECT id, name, email, service_type as "serviceType", message, sent_to as "sentTo", status, received_at as "receivedAt"
        FROM contact_inquiries
        ORDER BY received_at DESC;
      `;
      if (rows && rows.length > 0) {
        localStorage.setItem(INBOX_STORAGE_KEY, JSON.stringify(rows));
        return rows;
      }
    } catch (e) {
      console.warn("Could not fetch messages from Postgres, using cache:", e);
    }
    return this.getMessages();
  }

  async sendContactInquiry(inquiry) {
    const config = this.getConfig();
    const id = `inq-${Date.now()}`;
    const recipients = config.notificationEmails || 'twin.code.developers@gmail.com';

    const newMessage = {
      id,
      name: inquiry.name,
      email: inquiry.email,
      serviceType: inquiry.serviceType || 'General',
      message: inquiry.message,
      sentTo: recipients,
      status: 'Nuevo',
      receivedAt: new Date().toISOString()
    };

    // 1. Save in Neon PostgreSQL
    try {
      await this.init();
      await sql`
        INSERT INTO contact_inquiries (id, name, email, service_type, message, sent_to, status, received_at)
        VALUES (${newMessage.id}, ${newMessage.name}, ${newMessage.email}, ${newMessage.serviceType}, ${newMessage.message}, ${newMessage.sentTo}, ${newMessage.status}, CURRENT_TIMESTAMP);
      `;
      console.log("Inquiry saved in PostgreSQL successfully");
    } catch (e) {
      console.error("Error storing inquiry in PostgreSQL:", e);
    }

    // 2. Send Real Email Notification via /api/send-email (Cloudflare Function / Vite)
    let emailSent = false;
    try {
      const res = await fetch('/api/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: inquiry.name,
          email: inquiry.email,
          serviceType: inquiry.serviceType,
          message: inquiry.message,
          notificationEmails: recipients
        })
      });
      const data = await res.json();
      if (data.success) {
        emailSent = true;
        console.log("Email sent successfully via Cloudflare / Vite endpoint:", data);
      }
    } catch (err) {
      console.error("Could not trigger /api/send-email:", err);
    }

    // 3. Update local storage cache
    const messages = this.getMessages();
    localStorage.setItem(INBOX_STORAGE_KEY, JSON.stringify([newMessage, ...messages]));

    return {
      success: true,
      emailSent,
      messageId: newMessage.id,
      sentTo: recipients
    };
  }

  async deleteMessage(id) {
    try {
      await this.init();
      await sql`DELETE FROM contact_inquiries WHERE id = ${id};`;
    } catch (e) {
      console.error("Error deleting inquiry from PostgreSQL:", e);
    }
    const messages = this.getMessages();
    const filtered = messages.filter(m => m.id !== id);
    localStorage.setItem(INBOX_STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
}

export const emailService = new EmailService();
