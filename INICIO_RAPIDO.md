# 🐉 Dragon Ball Wiki - Guía de Inicio Rápido

## ✅ ¿Qué se ha creado?

Se ha generado un **proyecto fullstack completo** con:

### Backend (Node.js + Express + SQLite)
- ✅ Configuración base con Helmet, CORS, Rate Limiting
- ✅ Autenticación con JWT (24h)
- ✅ Base de datos SQLite con 3 tablas (users, favorites, comments)
- ✅ 15+ endpoints REST con validación
- ✅ Proxy a Dragon Ball API
- ✅ Panel administrativo
- ✅ Manejo centralizado de errores

### Frontend (React + Vite + TailwindCSS)
- ✅ 7 páginas (Home, Login, Register, Profile, Favorites, Character Detail, Admin)
- ✅ 20+ componentes reutilizables
- ✅ AuthContext para gestión global
- ✅ Sistema de comentarios con ratings
- ✅ Búsqueda y paginación
- ✅ Responsive design
- ✅ Tema Dragon Ball (naranja/azul)

---

## 🚀 PASO 1: Instalar Backend

```bash
cd backend
npm install
```

**Esperar a que termine la instalación** (toma 1-2 minutos)

---

## 🚀 PASO 2: Instalar Frontend

Abre **otra terminal** en VS Code:

```bash
cd frontend
npm install
```

**Esperar a que termine la instalación** (toma 1-2 minutos)

---

## 🚀 PASO 3: Iniciar Backend

En la **primera terminal**:

```bash
cd backend
npm run dev
```

Deberías ver:
```
╔════════════════════════════════════════╗
║    🐉 DRAGON BALL WIKI API SERVER 🐉   ║
║         http://localhost:3000          ║
╚════════════════════════════════════════╝
✓ Autenticación (JWT) configurada
✓ Rate limiting activo
✓ CORS habilitado
✓ Listo para recibir solicitudes...
```

---

## 🚀 PASO 4: Iniciar Frontend

En la **segunda terminal**:

```bash
cd frontend
npm run dev
```

Deberías ver:
```
VITE v5.0.0  ready in XXX ms

➜  Local:   http://localhost:5173/
```

---

## 🌐 PASO 5: Acceder a la Aplicación

Abre tu navegador en: **http://localhost:5173**

Deberías ver la página de inicio de Dragon Ball Wiki

---

## 👤 PASO 6: Probar Funcionalidades

### Opción A: Crear nueva cuenta
1. Click en "Registrarse"
2. Completa username, email y contraseña (mín 6 chars, mayús, minús, números)
3. Click "Registrarse"
4. Vuelve a Login y usa tus credenciales

### Opción B: Usar cuenta Admin
1. Click en "Iniciar sesión"
2. Email: `admin@dragonball.com`
3. Contraseña: `Admin123!`
4. ¡Bienvenido!

---

## ✨ Características para Probar

### Como Usuario Regular
- ✅ Ver lista de personajes
- ✅ Buscar por nombre
- ✅ Paginar resultados
- ✅ Ver detalles del personaje
- ✅ Añadir a favoritos (❤️)
- ✅ Dejar comentario con rating (⭐⭐⭐⭐⭐)
- ✅ Editar mis comentarios
- ✅ Ver mi perfil y estadísticas
- ✅ Ver mis favoritos

### Como Admin
- ✅ TODAS las funciones anteriores +
- ✅ Acceso a panel admin (/admin)
- ✅ Ver estadísticas globales
- ✅ Moderar comentarios (eliminar cualquiera)
- ✅ Ver lista de usuarios

---

## 📂 Estructura de Archivos

```
WikiDragonBall/
├── backend/              # API REST
│   ├── src/
│   │   ├── config/       # BD y APIs externas
│   │   ├── controllers/  # Lógica de negocio
│   │   ├── models/       # Acceso a datos
│   │   ├── routes/       # Rutas y endpoints
│   │   ├── middleware/   # Auth, validación, errores
│   │   ├── services/     # Servicios externos
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
├── frontend/             # Aplicación React
│   ├── src/
│   │   ├── components/   # Componentes reutilizables
│   │   ├── pages/        # Páginas/Rutas
│   │   ├── services/     # Llamadas a API
│   │   ├── context/      # AuthContext
│   │   ├── utils/        # Helpers y constantes
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   ├── .env.example
│   └── README.md
│
└── README.md             # Este archivo
```

---

## 🔑 Variables de Entorno

### Backend (.env)
```
PORT=3000
JWT_SECRET=tu_secreto_super_seguro_aqui_cambiar_en_produccion
NODE_ENV=development
DRAGONBALL_API_URL=https://dragonball-api.com/api
DRAGONBALL_API_TIMEOUT=5000
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:3000/api
```

---

## 🧪 Pruebas con cURL/Postman

### 1. Registrarse
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

### 2. Login
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "TestPass123"
  }'
```

Copiar el `token` de la respuesta

### 3. Obtener Personajes
```bash
curl http://localhost:3000/api/characters?page=1&limit=10
```

### 4. Obtener Detalles de Personaje
```bash
curl http://localhost:3000/api/characters/1
```

### 5. Añadir a Favoritos (requiere token)
```bash
curl -X POST http://localhost:3000/api/favorites \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "characterId": 1,
    "characterName": "Goku",
    "characterImage": "https://..."
  }'
```

### 6. Crear Comentario (requiere token)
```bash
curl -X POST http://localhost:3000/api/comments \
  -H "Authorization: Bearer TU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "characterId": 1,
    "characterName": "Goku",
    "comment": "¡Increíble personaje!",
    "rating": 5
  }'
```

---

## 🐛 Solución de Problemas

### Error: "Port 3000 is already in use"
```bash
# Matar proceso en puerto 3000
lsof -i :3000
kill -9 <PID>
```

### Error: "Cannot find module"
```bash
# Reinstalar dependencias
npm install
```

### Error: "CORS error"
Asegúrate que:
- Backend está corriendo en `http://localhost:3000`
- Frontend está en `http://localhost:5173`
- VITE_API_URL en frontend .env es correcto

### Base de datos no se crea
- Elimina `backend/dragonball.db`
- Reinicia el servidor backend
- La BD se creará automáticamente

---

## 📱 Características por Página

### 🏠 Home (/)
- Lista de personajes con paginación
- Búsqueda por nombre
- Botón de favoritos
- Click para ver detalles

### 🎭 Detalle Personaje (/character/:id)
- Imagen grande del personaje
- Información completa (raza, ki, afiliación, etc.)
- Botón de favoritos
- Formulario para comentar (si estás registrado)
- Lista de comentarios de otros usuarios
- Edición/eliminación de propios comentarios

### ❤️ Favoritos (/favorites)
- Lista de personajes guardados
- Grid responsivo
- Botón para eliminar de favoritos
- (Requiere login)

### 👤 Perfil (/profile)
- Nombre de usuario
- Email
- Estadísticas: total favoritos, comentarios, rating promedio
- (Requiere login)

### 🔐 Admin (/admin)
- **Estadísticas**: Total usuarios, comentarios, personaje más comentado
- **Moderación**: Ver y eliminar cualquier comentario
- (Requiere role admin)

### 🔑 Login (/login)
- Email y contraseña
- Link a registrarse
- Datos para prueba (admin)

### ✍️ Registro (/register)
- Username, email, contraseña
- Validación de complejidad
- Link a login

---

## ⚡ Optimizaciones Implementadas

✅ **Frontend**
- Lazy loading de imágenes
- Debounce en búsqueda (500ms)
- Caché en localStorage
- Interceptor axios para tokens
- Code splitting

✅ **Backend**
- Prepared statements en SQL
- Validación en entrada
- Hash de contraseñas (bcrypt)
- Rate limiting
- Manejo centralizado de errores

---

## 📊 Base de Datos

### Tablas
1. **users** - Usuarios registrados
2. **favorites** - Personajes guardados
3. **comments** - Comentarios y reseñas

**Admin por defecto:**
- Username: admin
- Email: admin@dragonball.com
- Password: Admin123!

---

## 🎨 Diseño

### Colores
- 🟠 Primario: #FF6B35 (Naranja Dragon Ball)
- 🔵 Secundario: #4ECDC4 (Azul)
- ⚫ Fondo: #1a1a1a (Gris oscuro)

### Responsive
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)

---

## 📚 Documentación Completa

Consulta los README individuales:
- [Backend README](./backend/README.md)
- [Frontend README](./frontend/README.md)

---

## 🎯 Próximos Pasos (Opcional)

1. **Mejoras UI**: Agregar animaciones con Framer Motion
2. **Más features**: Chat en tiempo real, notificaciones
3. **Deployment**: Subir a Heroku, Vercel, etc.
4. **Testing**: Agregar tests unitarios y E2E
5. **Performance**: Implementar React Query para caché
6. **PWA**: Convertir a Progressive Web App

---

## 📞 Soporte

Si encuentras algún problema:
1. Revisa los logs en la terminal
2. Verifica que los puertos 3000 y 5173 están disponibles
3. Asegúrate de tener Node.js 16+
4. Reinstala dependencias si es necesario

---

**¡Listo! Tu aplicación Dragon Ball Wiki está lista para usar 🐉✨**

Disfruta explorando personajes, guardando favoritos y dejando comentarios.

