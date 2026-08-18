import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import nodemailer from 'nodemailer';

const GMAIL_USER = 'twin.code.developers@gmail.com';
const GMAIL_APP_PASSWORD = 'ofnn odln smwt dokk';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: GMAIL_USER,
    pass: GMAIL_APP_PASSWORD
  }
});

function emailApiPlugin() {
  return {
    name: 'email-api-plugin',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url === '/api/send-email' && req.method === 'POST') {
          let body = '';
          req.on('data', chunk => {
            body += chunk.toString();
          });

          req.on('end', async () => {
            try {
              const data = JSON.parse(body);
              const { name, email, serviceType, message, notificationEmails } = data;

              const recipients = notificationEmails || GMAIL_USER;

              // 1. Send notification to developers
              const info = await transporter.sendMail({
                from: `"Twin Code Inquiries" <${GMAIL_USER}>`,
                to: recipients,
                replyTo: email,
                subject: `🔔 Nueva Solicitud de Proyecto: ${name} (${serviceType || 'General'})`,
                html: `
                  <div style="background-color: #000000; color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 24px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #222222;">
                    <div style="border-bottom: 1px solid #222222; padding-bottom: 16px; margin-bottom: 24px;">
                      <h2 style="color: #ffffff; margin: 0; font-size: 18px; letter-spacing: 0.5px;">TWIN CODE // NUEVA SOLICITUD RECIBIDA</h2>
                      <p style="color: #86868b; font-size: 12px; margin: 4px 0 0 0;">Notificación automática para desarrolladores</p>
                    </div>

                    <div style="background-color: #0d0d0f; border: 1px solid #222222; border-radius: 6px; padding: 20px; margin-bottom: 20px;">
                      <p style="margin: 0 0 12px 0; font-size: 14px; color: #ffffff;"><strong>👤 Cliente / Empresa:</strong> ${name}</p>
                      <p style="margin: 0 0 12px 0; font-size: 14px; color: #ffffff;"><strong>📧 Correo:</strong> <a href="mailto:${email}" style="color: #c6a972;">${email}</a></p>
                      <p style="margin: 0 0 12px 0; font-size: 14px; color: #ffffff;"><strong>🛠️ Solución de Interés:</strong> <span style="background-color: rgba(198,169,114,0.15); color: #c6a972; padding: 2px 8px; border-radius: 4px;">${serviceType || 'Software / Automatización'}</span></p>
                      
                      <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid #1c1c1e;">
                        <p style="margin: 0 0 6px 0; font-size: 12px; color: #86868b; text-transform: uppercase;">Detalles del requerimiento:</p>
                        <p style="margin: 0; font-size: 14px; line-height: 1.6; color: #d2d2d7; white-space: pre-wrap; background-color: #121214; padding: 12px; border-radius: 4px;">${message}</p>
                      </div>
                    </div>

                    <p style="color: #6e6e73; font-size: 11px; text-align: center; margin-top: 24px;">
                      Twin Code Digital Engineering Studio • Base de datos Neon PostgreSQL sincronizada
                    </p>
                  </div>
                `
              });

              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 200;
              res.end(JSON.stringify({ success: true, messageId: info.messageId, sentTo: recipients }));
            } catch (err) {
              console.error("Error sending email via API:", err);
              res.setHeader('Content-Type', 'application/json');
              res.statusCode = 500;
              res.end(JSON.stringify({ success: false, error: err.message }));
            }
          });
        } else {
          next();
        }
      });
    }
  };
}

export default defineConfig({
  plugins: [react(), emailApiPlugin()],
});
