import tls from 'tls';

const GMAIL_USER = 'twin.code.developers@gmail.com';
const GMAIL_APP_PASSWORD = 'ofnnodlnsmwtdokk'; // sin espacios

function sendSmtpDirect(recipient, subject, htmlContent) {
  return new Promise((resolve, reject) => {
    const socket = tls.connect(465, 'smtp.gmail.com', () => {
      console.log('Connected to Gmail SMTP over TLS 465');
    });

    let step = 0;
    socket.setEncoding('utf-8');

    socket.on('data', (data) => {
      console.log('S:', data.trim());

      if (step === 0 && data.startsWith('220')) {
        socket.write('EHLO localhost\r\n');
        step = 1;
      } else if (step === 1 && data.startsWith('250')) {
        socket.write('AUTH LOGIN\r\n');
        step = 2;
      } else if (step === 2 && data.startsWith('334')) {
        socket.write(Buffer.from(GMAIL_USER).toString('base64') + '\r\n');
        step = 3;
      } else if (step === 3 && data.startsWith('334')) {
        socket.write(Buffer.from(GMAIL_APP_PASSWORD).toString('base64') + '\r\n');
        step = 4;
      } else if (step === 4 && data.startsWith('235')) {
        console.log('Authenticated successfully!');
        socket.write(`MAIL FROM:<${GMAIL_USER}>\r\n`);
        step = 5;
      } else if (step === 5 && data.startsWith('250')) {
        socket.write(`RCPT TO:<${recipient}>\r\n`);
        step = 6;
      } else if (step === 6 && data.startsWith('250')) {
        socket.write('DATA\r\n');
        step = 7;
      } else if (step === 7 && data.startsWith('354')) {
        const emailMsg = [
          `From: "Twin Code Notifications" <${GMAIL_USER}>`,
          `To: <${recipient}>`,
          `Subject: ${subject}`,
          `MIME-Version: 1.0`,
          `Content-Type: text/html; charset=UTF-8`,
          ``,
          htmlContent,
          `\r\n.`
        ].join('\r\n') + '\r\n';

        socket.write(emailMsg);
        step = 8;
      } else if (step === 8 && data.startsWith('250')) {
        console.log('Email sent successfully!');
        socket.write('QUIT\r\n');
        step = 9;
        resolve(true);
      }
    });

    socket.on('error', (err) => {
      console.error('Socket error:', err);
      reject(err);
    });
  });
}

sendSmtpDirect(
  'twin.code.developers@gmail.com',
  '🚀 Prueba de Despacho Directo SMTP Gmail',
  '<h3>Twin Code SMTP Directo Funcionando</h3><p>Prueba de socket SMTP nativo sin dependencias pesadas.</p>'
);
