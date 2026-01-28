require('dotenv').config();
const app = require('./src/app');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    🐉 DRAGON BALL WIKI API SERVER 🐉   ║
║         http://localhost:${PORT}         ║
╚════════════════════════════════════════╝
  `);
  console.log('✓ Autenticación (JWT) configurada');
  console.log('✓ Rate limiting activo');
  console.log('✓ CORS habilitado');
  console.log('✓ Listo para recibir solicitudes...\n');
});
