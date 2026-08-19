async function testDirectDispatch() {
  console.log("🔄 Probando envío serverless directo a twin.code.developers@gmail.com...");
  
  try {
    const res = await fetch('https://formsubmit.co/ajax/twin.code.developers@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        _subject: '🚀 Nueva Solicitud en Twin Code (Cloudflare Production)',
        _template: 'table',
        _captcha: 'false',
        name: 'Cliente Prueba Cloudflare',
        email: 'cliente@empresa.com',
        serviceType: 'Software a Medida & Automatización',
        message: 'Prueba de recepción de correo en Cloudflare Pages para Twin Code.',
        timestamp: new Date().toLocaleString()
      })
    });

    const data = await res.json();
    console.log("Resultado del despacho:", data);
    return data.success === 'true' || data.success === true;
  } catch (err) {
    console.error("Error:", err);
    return false;
  }
}

testDirectDispatch();
