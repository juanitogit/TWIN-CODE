async function testWeb3Forms() {
  console.log("Probando Web3Forms API...");
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
      body: JSON.stringify({
        access_key: 'b94cbfe4-3d92-4f3f-917c-6e2c2b3d8756', // Web3Forms public test key
        subject: '🚀 Nueva Solicitud Twin Code',
        from_name: 'Twin Code Digital',
        to: 'twin.code.developers@gmail.com',
        name: 'Prueba Cloudflare',
        email: 'twin.code.developers@gmail.com',
        message: 'Prueba de recepción de correo'
      })
    });
    const data = await res.json();
    console.log("Web3Forms response:", data);
  } catch (err) {
    console.error("Web3Forms error:", err);
  }
}

testWeb3Forms();
