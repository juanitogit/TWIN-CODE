import nodemailer from 'nodemailer';

const GMAIL_USER = 'twin.code.developers@gmail.com';
const GMAIL_APP_PASSWORD = 'ofnn odln smwt dokk';

async function testGmailDispatch() {
  console.log("🔄 Verificando credenciales SMTP de Gmail...");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: GMAIL_USER,
      pass: GMAIL_APP_PASSWORD
    }
  });

  try {
    // 1. Verify connection
    await transporter.verify();
    console.log("✅ Conexión SMTP a Gmail establecida y autenticada con éxito.");

    // 2. Send test notification email
    console.log(`🔄 Enviando correo de prueba a ${GMAIL_USER}...`);
    const info = await transporter.sendMail({
      from: `"Twin Code Notifications" <${GMAIL_USER}>`,
      to: GMAIL_USER,
      subject: '🚀 Notificación de Prueba — Twin Code System Activo',
      html: `
        <div style="background-color: #000000; color: #f5f5f7; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; padding: 40px 20px; border-radius: 8px; max-width: 600px; margin: 0 auto; border: 1px solid #222222;">
          <div style="margin-bottom: 24px; border-bottom: 1px solid #222222; padding-bottom: 16px;">
            <h2 style="color: #ffffff; margin: 0; font-size: 20px; letter-spacing: 1px;">TWIN CODE // SISTEMA DE NOTIFICACIONES</h2>
            <p style="color: #86868b; font-size: 12px; margin: 4px 0 0 0;">SOFTWARE • AUTOMATIZACIONES • POSTGRESQL</p>
          </div>

          <h3 style="color: #30d158; font-size: 16px; margin-bottom: 12px;">✅ Sistema de Correo Conectado y Operativo</h3>
          
          <p style="color: #d2d2d7; font-size: 14px; line-height: 1.6;">
            Las credenciales de Gmail SMTP han sido configuradas correctamente. A partir de ahora, todas las solicitudes que los clientes envíen desde el formulario web llegarán automáticamente a los correos configurados por los desarrolladores en el Panel de Administración.
          </p>

          <div style="background-color: #0d0d0f; border: 1px solid #282828; border-radius: 6px; padding: 16px; margin: 24px 0;">
            <p style="margin: 0 0 8px 0; font-size: 12px; color: #86868b; text-transform: uppercase;">Estado del Servidor:</p>
            <p style="margin: 0; color: #ffffff; font-size: 13px;">• Emisor: <strong>${GMAIL_USER}</strong></p>
            <p style="margin: 4px 0 0 0; color: #ffffff; font-size: 13px;">• Base de Datos: <strong>Neon PostgreSQL Conectada</strong></p>
          </div>

          <p style="color: #6e6e73; font-size: 11px; margin-top: 32px; border-top: 1px solid #1a1a1a; padding-top: 16px;">
            © ${new Date().getFullYear()} Twin Code Studio. Mensaje generado automáticamente.
          </p>
        </div>
      `
    });

    console.log("✅ Correo de prueba enviado exitosamente:", info.messageId);
    return true;
  } catch (error) {
    console.error("❌ Error al conectar con Gmail SMTP:", error);
    return false;
  }
}

testGmailDispatch();
