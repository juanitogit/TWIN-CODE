import { connect } from 'cloudflare:sockets';

const GMAIL_USER = 'twin.code.developers@gmail.com';
const GMAIL_APP_PASSWORD = 'ofnnodlnsmwtdokk';

function stringToBase64(str) {
  const bytes = new TextEncoder().encode(str);
  let binary = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

async function sendGmailSmtp({ to, replyTo, subject, htmlContent }) {
  const socket = connect({ hostname: 'smtp.gmail.com', port: 465 }, { secureTransport: 'on' });
  const writer = socket.writable.getWriter();
  const reader = socket.readable.getReader();
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();

  async function write(cmd) {
    await writer.write(encoder.encode(cmd));
  }

  async function read() {
    const { value, done } = await reader.read();
    if (done) return '';
    return decoder.decode(value);
  }

  try {
    // 1. Initial Greeting
    let res = await read();
    if (!res.startsWith('220')) throw new Error('SMTP Greeting failed: ' + res);

    // 2. EHLO
    await write('EHLO localhost\r\n');
    res = await read();
    if (!res.startsWith('250')) throw new Error('EHLO failed: ' + res);

    // 3. AUTH LOGIN
    await write('AUTH LOGIN\r\n');
    res = await read();
    if (!res.startsWith('334')) throw new Error('AUTH LOGIN failed: ' + res);

    // 4. Send Username
    await write(stringToBase64(GMAIL_USER) + '\r\n');
    res = await read();
    if (!res.startsWith('334')) throw new Error('Username failed: ' + res);

    // 5. Send Password
    await write(stringToBase64(GMAIL_APP_PASSWORD) + '\r\n');
    res = await read();
    if (!res.startsWith('235')) throw new Error('Password authentication failed: ' + res);

    // 6. MAIL FROM
    await write(`MAIL FROM:<${GMAIL_USER}>\r\n`);
    res = await read();
    if (!res.startsWith('250')) throw new Error('MAIL FROM failed: ' + res);

    // 7. RCPT TO
    const recipients = Array.isArray(to) ? to : to.split(',').map(e => e.trim()).filter(Boolean);
    for (const r of recipients) {
      await write(`RCPT TO:<${r}>\r\n`);
      res = await read();
      if (!res.startsWith('250')) throw new Error(`RCPT TO failed for ${r}: ` + res);
    }

    // 8. DATA
    await write('DATA\r\n');
    res = await read();
    if (!res.startsWith('354')) throw new Error('DATA initiation failed: ' + res);

    // 9. Send Email Headers & Body
    const headers = [
      `From: "Twin Code Notifications" <${GMAIL_USER}>`,
      `To: ${recipients.join(', ')}`,
      replyTo ? `Reply-To: ${replyTo}` : '',
      `Subject: ${subject}`,
      `MIME-Version: 1.0`,
      `Content-Type: text/html; charset=UTF-8`,
      ``,
      htmlContent,
      `\r\n.`
    ].filter(Boolean).join('\r\n') + '\r\n';

    await write(headers);
    res = await read();
    if (!res.startsWith('250')) throw new Error('Sending email body failed: ' + res);

    // 10. QUIT
    await write('QUIT\r\n');
    reader.releaseLock();
    writer.releaseLock();
    await socket.close();

    return { success: true };
  } catch (error) {
    try {
      reader.releaseLock();
      writer.releaseLock();
      await socket.close();
    } catch {}
    throw error;
  }
}

export async function onRequestPost(context) {
  try {
    const data = await context.request.json();
    const { name, email, serviceType, message, notificationEmails } = data;

    const recipients = notificationEmails || GMAIL_USER;
    const subject = `🔔 Nueva Solicitud de Proyecto: ${name} (${serviceType || 'General'})`;

    const htmlContent = `
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
          Twin Code Digital Engineering Studio • Desplegado en Cloudflare Pages
        </p>
      </div>
    `;

    await sendGmailSmtp({
      to: recipients,
      replyTo: email,
      subject,
      htmlContent
    });

    return new Response(JSON.stringify({ success: true, sentTo: recipients }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error('Cloudflare send-email error:', err);
    return new Response(JSON.stringify({ success: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
