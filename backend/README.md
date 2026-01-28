# 🐉 Dragon Ball Wiki - Backend API

Backend REST API para la aplicación Dragon Ball Wiki, construido con Node.js, Express y SQLite.

## Características

✨ **Autenticación JWT** - Token-based authentication con expiración de 24 horas
🔐 **Seguridad** - Helmet.js, CORS, Rate limiting, Password hashing con bcrypt
📱 **API REST** - 15+ endpoints para gestión de usuarios, personajes, favoritos y comentarios
💾 **Base de datos SQLite** - Persistencia de datos sin dependencias externas
🌐 **Integración Dragon Ball API** - Proxy a la API oficial de Dragon Ball

## Instalación

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

## Configuración .env

```
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_aqui
NODE_ENV=development
DRAGONBALL_API_URL=https://dragonball-api.com/api
DRAGONBALL_API_TIMEOUT=5000
FRONTEND_URL=http://localhost:5173
```

## Endpoints API

### Autenticación

```
POST /api/auth/register
Body: { username, email, password }

POST /api/auth/login
Body: { email, password }
```

### Personajes (públicos)

```
GET /api/characters?page=1&limit=10&name=goku
GET /api/characters/:id
```

### Favoritos (requieren autenticación)

```
POST /api/favorites
Headers: Authorization: Bearer token
Body: { characterId, characterName, characterImage }

GET /api/favorites
Headers: Authorization: Bearer token

DELETE /api/favorites/:characterId
Headers: Authorization: Bearer token
```

### Comentarios

```
POST /api/comments (requiere token)
Body: { characterId, characterName, comment, rating }

GET /api/comments/:characterId (público)

PUT /api/comments/:id (solo autor)
Headers: Authorization: Bearer token

DELETE /api/comments/:id (solo autor)
Headers: Authorization: Bearer token
```

### Admin (requiere role admin)

```
GET /api/admin/users
GET /api/admin/comments
GET /api/admin/stats
DELETE /api/admin/comments/:id
```

### Usuario

```
GET /api/users/me/stats
Headers: Authorization: Bearer token
```

## Usuario Admin por defecto

- **Email:** admin@dragonball.com
- **Contraseña:** Admin123!
- **Role:** admin

## Tecnologías

- **Runtime:** Node.js
- **Framework:** Express.js
- **Base de datos:** SQLite3
- **Autenticación:** JWT (jsonwebtoken)
- **Seguridad:** Helmet, bcrypt, express-validator
- **HTTP Client:** Axios
- **Env:** dotenv

## Estructura del Proyecto

```
backend/
├── src/
│   ├── config/          # Configuración de BD y API
│   ├── controllers/     # Lógica de negocio
│   ├── middleware/      # Middleware personalizado
│   ├── models/          # Modelos de datos
│   ├── routes/          # Definición de rutas
│   ├── services/        # Servicios externos
│   └── app.js          # Configuración de Express
├── server.js           # Punto de entrada
├── package.json
└── .env.example
```

## Desarrollo

```bash
# Instalar dependencias
npm install

# Ejecutar en modo desarrollo (con nodemon)
npm run dev

# Ejecutar en producción
npm start
```

## Variables de Entorno

| Variable | Descripción | Defecto |
|----------|-------------|---------|
| PORT | Puerto del servidor | 3000 |
| JWT_SECRET | Secreto para firmar JWTs | - |
| NODE_ENV | Entorno (development/production) | development |
| DRAGONBALL_API_URL | URL base de Dragon Ball API | https://dragonball-api.com/api |
| DRAGONBALL_API_TIMEOUT | Timeout para requests (ms) | 5000 |
| FRONTEND_URL | URL del frontend (CORS) | http://localhost:5173 |

## Respuestas de API

### Success (200)

```json
{
  "success": true,
  "data": { /* ... */ }
}
```

### Error (4xx/5xx)

```json
{
  "success": false,
  "message": "Descripción del error"
}
```

## Seguridad

- ✅ Validación de entrada con express-validator
- ✅ Passwords hasheados con bcrypt (10 rounds)
- ✅ JWT con expiración de 24 horas
- ✅ Rate limiting: 100 req/15 min
- ✅ CORS configurado
- ✅ Helmet.js para headers de seguridad
- ✅ Prepared statements (sqlite3)

## License

ISC
