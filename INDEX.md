# 🐉 Dragon Ball Wiki - Fullstack

> **Aplicación web completa** para explorar personajes de Dragon Ball, guardar favoritos y dejar comentarios.

![Status](https://img.shields.io/badge/status-active-success.svg)
![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-ISC-green.svg)

---

## 🚀 Inicio Rápido

### Requisitos
- Node.js 16+
- npm o yarn

### 1️⃣ Instalar Backend
```bash
cd backend
npm install
npm run dev
# Accesible en http://localhost:3000
```

### 2️⃣ Instalar Frontend (Nueva terminal)
```bash
cd frontend
npm install
npm run dev
# Accesible en http://localhost:5173
```

### 3️⃣ Abrir en navegador
```
http://localhost:5173
```

---

## 🔑 Credenciales Admin
- **Email:** `admin@dragonball.com`
- **Contraseña:** `Admin123!`

---

## 📚 Documentación

| Documento | Descripción |
|-----------|-------------|
| [INICIO_RAPIDO.md](./INICIO_RAPIDO.md) | Guía paso a paso |
| [README.md](./README.md) | Descripción general |
| [NOTAS_TECNICAS.md](./NOTAS_TECNICAS.md) | Arquitectura |
| [CHECKLIST.md](./CHECKLIST.md) | Verificación de features |
| [RESUMEN_FINAL.md](./RESUMEN_FINAL.md) | Resumen completo |
| [backend/README.md](./backend/README.md) | API REST |
| [frontend/README.md](./frontend/README.md) | React app |

---

## ✨ Características

### 🔐 Autenticación
- Registro y login con JWT
- Protected routes
- Admin panel

### 🎭 Personajes Dragon Ball
- Lista paginada
- Búsqueda por nombre
- Detalles completos
- Desde API oficial

### ❤️ Favoritos
- Guardar personajes
- Ver lista personal
- Persistencia en BD

### 💬 Comentarios
- Crear comentarios
- Rating 1-5 estrellas
- Editar y eliminar
- Admin moderación

### 👤 Perfil Usuario
- Datos personales
- Estadísticas
- Actividad

---

## 🛠️ Stack Tecnológico

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** SQLite3
- **Auth:** JWT + bcrypt
- **Validation:** express-validator
- **Security:** Helmet, CORS, Rate Limiting

### Frontend
- **Library:** React 18
- **Build:** Vite
- **Router:** React Router DOM
- **Styling:** TailwindCSS
- **HTTP:** Axios
- **Icons:** React Icons

---

## 📂 Estructura

```
WikiDragonBall/
├── backend/              # API REST
│   ├── src/
│   │   ├── config/       # BD, APIs
│   │   ├── controllers/  # Lógica
│   │   ├── models/       # Datos
│   │   ├── routes/       # Endpoints
│   │   ├── middleware/   # Auth, validación
│   │   └── services/     # Externos
│   └── package.json
│
├── frontend/             # React App
│   ├── src/
│   │   ├── components/   # Componentes
│   │   ├── pages/        # Rutas/Páginas
│   │   ├── services/     # API calls
│   │   ├── context/      # Estado global
│   │   └── utils/        # Helpers
│   └── package.json
│
└── [DOCUMENTACIÓN]
```

---

## 📡 API Endpoints

```
POST   /api/auth/register          Registrarse
POST   /api/auth/login             Login

GET    /api/characters             Listar personajes
GET    /api/characters/:id         Detalle

POST   /api/favorites              Guardar favorito
GET    /api/favorites              Mis favoritos
DELETE /api/favorites/:id          Eliminar favorito

POST   /api/comments               Crear comentario
GET    /api/comments/:characterId  Listar comentarios
PUT    /api/comments/:id           Editar
DELETE /api/comments/:id           Eliminar

GET    /api/users/me/stats         Mi estadísticas

GET    /api/admin/users            Usuarios (admin)
GET    /api/admin/stats            Estadísticas (admin)
GET    /api/admin/comments         Comentarios (admin)
DELETE /api/admin/comments/:id     Eliminar (admin)
```

---

## 🎨 Diseño

- **Tema:** Dragon Ball (naranja/azul)
- **Responsive:** Mobile, tablet, desktop
- **UI:** Modern & Clean
- **Animaciones:** Smooth transitions

---

## ⚙️ Configuración

### Backend (.env)
```env
PORT=3000
JWT_SECRET=tu_secreto_aqui
NODE_ENV=development
DRAGONBALL_API_URL=https://dragonball-api.com/api
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

---

## 🔐 Seguridad

✅ Contraseñas hasheadas (bcrypt)
✅ JWT con expiración 24h
✅ Validación input
✅ CORS configurado
✅ Rate limiting
✅ SQL injection prevention

---

## 📊 Base de Datos

```sql
users               -- Usuarios registrados
favorites           -- Personajes guardados
comments            -- Comentarios y reseñas
```

---

## 🧪 Pruebas

### Crear usuario
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "test",
    "email": "test@test.com",
    "password": "Test123"
  }'
```

### Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@test.com",
    "password": "Test123"
  }'
```

---

## 🐛 Solución de Problemas

### Error: Port already in use
```bash
lsof -i :3000
kill -9 <PID>
```

### Error: Cannot find module
```bash
npm install
```

### Error: CORS
Verifica que las URLs sean correctas en .env

---

## 📈 Estadísticas

- **70+** archivos creados
- **3000+** líneas de código
- **20+** componentes
- **15+** endpoints
- **30+** features

---

## 🎓 Aprender

Este proyecto implementa:
- ✅ Arquitectura fullstack MVC
- ✅ Autenticación con JWT
- ✅ Validación input/output
- ✅ SQL/NoSQL patterns
- ✅ React best practices
- ✅ Express patterns
- ✅ Responsive design
- ✅ API integration

---

## 📝 Licencia

ISC

---

## 🙋 Soporte

- 📖 Consulta la documentación
- ✅ Verifica el checklist
- 🐛 Revisa los logs

---

## 🎯 Próximos Pasos

1. Prueba la app completa
2. Explora el código
3. Modifica según tus necesidades
4. Deploy a producción
5. Agrega más features

---

**Made with ❤️ using React, Node.js & Dragon Ball 🐉**

*Versión 1.0.0 - Enero 28, 2026*
