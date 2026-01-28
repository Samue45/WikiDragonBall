# 🐉 Dragon Ball Wiki - Full Stack

**Aplicación web fullstack completa para explorar, comentar y gestionar personajes de Dragon Ball**

## Documentación online del proyecto
[Guía de solución de problemas y FAQ — WikiDragonBall (DeepWiki)](https://deepwiki.com/Samue45/WikiDragonBall/9-troubleshooting-and-faq)

## 📋 Resumen del Proyecto

Una aplicación web moderna y completa que permite a los usuarios:
- 🔍 Explorar personajes de Dragon Ball desde una API externa
- ❤️ Guardar personajes favoritos
- 💬 Dejar comentarios y reseñas con ratings 1-5 estrellas
- 👤 Crear perfil y ver estadísticas personales
- 🔐 Panel administrativo para moderar contenido

## 🏗️ Arquitectura

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React + Vite)                 │
│  - SPA con React Router                                     │
│  - State management con Context API                         │
│  - Estilos con TailwindCSS                                  │
│  - HTTP client: Axios                                       │
└──────────────────────────┬──────────────────────────────────┘
                           │
                    API REST (JSON)
                           │
┌──────────────────────────▼──────────────────────────────────┐
│                 BACKEND (Node.js + Express)                 │
│  - RESTful API con 15+ endpoints                            │
│  - Autenticación JWT (24h)                                  │
│  - Seguridad: Helmet, CORS, Rate Limiting                   │
│  - Validación con express-validator                         │
│  - Base de datos SQLite con 3 tablas                        │
└──────────────────────────┬──────────────────────────────────┘
                           │
        ┌──────────────────┴──────────────────┐
        │                                     │
   SQLite DB          Dragon Ball API
   (Favoritos,     https://dragonball-api.com
    Comentarios,        (Proxy)
    Usuarios)
```

## 🛠️ Stack Tecnológico

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js 4.18
- **Database**: SQLite3
- **Auth**: JWT (jsonwebtoken)
- **Security**: Helmet, bcrypt, express-validator
- **HTTP**: Axios, CORS, Rate Limiting
- **Env**: dotenv

**Dependencias:**
```json
{
  "express": "^4.18.2",
  "sqlite3": "^5.1.6",
  "bcrypt": "^5.1.1",
  "jsonwebtoken": "^9.0.2",
  "axios": "^1.6.0",
  "express-validator": "^7.0.1",
  "helmet": "^7.1.0",
  "express-rate-limit": "^7.1.5",
  "cors": "^2.8.5",
  "dotenv": "^16.3.1"
}
```

### Frontend
- **UI Framework**: React 18
- **Build Tool**: Vite 5
- **Routing**: React Router DOM 6
- **HTTP**: Axios
- **Styling**: TailwindCSS
- **Icons**: React Icons
- **Auth**: JWT Decode

**Dependencias:**
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.0",
  "react-icons": "^4.12.0",
  "tailwindcss": "^3.3.6"
}
```

## 📦 Estructura del Proyecto

```
WikiDragonBall/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.js          # Configuración SQLite
│   │   │   └── dragonballApi.js     # Cliente Dragon Ball API
│   │   ├── middleware/
│   │   │   ├── auth.js              # JWT verification
│   │   │   ├── validator.js         # express-validator
│   │   │   └── errorHandler.js      # Manejo de errores
│   │   ├── routes/
│   │   │   ├── auth.routes.js       # /api/auth
│   │   │   ├── characters.routes.js # /api/characters
│   │   │   ├── favorites.routes.js  # /api/favorites
│   │   │   ├── comments.routes.js   # /api/comments
│   │   │   ├── user.routes.js       # /api/users
│   │   │   └── admin.routes.js      # /api/admin
│   │   ├── controllers/
│   │   │   ├── auth.controller.js
│   │   │   ├── characters.controller.js
│   │   │   ├── favorites.controller.js
│   │   │   ├── comments.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── admin.controller.js
│   │   ├── models/
│   │   │   ├── user.model.js
│   │   │   ├── favorite.model.js
│   │   │   └── comment.model.js
│   │   ├── services/
│   │   │   └── dragonball.service.js
│   │   └── app.js
│   ├── server.js
│   ├── package.json
│   ├── .env.example
│   ├── .gitignore
│   └── README.md
│
└── frontend/
    ├── public/
    ├── src/
    │   ├── components/
    │   │   ├── common/
    │   │   │   ├── Navbar.jsx
    │   │   │   ├── Footer.jsx
    │   │   │   ├── Loading.jsx
    │   │   │   ├── ErrorMessage.jsx
    │   │   │   └── ProtectedRoute.jsx
    │   │   ├── characters/
    │   │   │   ├── CharacterCard.jsx
    │   │   │   ├── CharacterList.jsx
    │   │   │   ├── SearchBar.jsx
    │   │   │   └── Pagination.jsx
    │   │   ├── favorites/
    │   │   │   ├── FavoriteButton.jsx
    │   │   │   └── FavoritesList.jsx
    │   │   ├── comments/
    │   │   │   ├── CommentForm.jsx
    │   │   │   ├── CommentList.jsx
    │   │   │   ├── CommentItem.jsx
    │   │   │   └── StarRating.jsx
    │   │   └── admin/
    │   │       ├── AdminStats.jsx
    │   │       └── CommentModeration.jsx
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── CharacterDetailPage.jsx
    │   │   ├── FavoritesPage.jsx
    │   │   ├── LoginPage.jsx
    │   │   ├── RegisterPage.jsx
    │   │   ├── ProfilePage.jsx
    │   │   └── AdminPage.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── services/
    │   │   ├── api.js
    │   │   ├── authService.js
    │   │   ├── charactersService.js
    │   │   ├── favoritesService.js
    │   │   ├── commentsService.js
    │   │   └── adminService.js
    │   ├── utils/
    │   │   ├── constants.js
    │   │   └── helpers.js
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── index.css
    ├── index.html
    ├── vite.config.js
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── package.json
    ├── .env.example
    ├── .gitignore
    └── README.md
```

## 🚀 Guía de Instalación y Uso

### Requisitos previos
- Node.js 16+
- npm o yarn
- Git

### Backend Setup

```bash
# 1. Navegar a la carpeta backend
cd backend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
cp .env.example .env

# 4. (Opcional) Editar .env si es necesario
# PORT=3000
# JWT_SECRET=tu_secreto_seguro_aqui

# 5. Iniciar servidor
npm run dev
# El servidor estará disponible en http://localhost:3000
```

**Admin por defecto:**
- Email: `admin@dragonball.com`
- Contraseña: `Admin123!`

### Frontend Setup

```bash
# 1. Navegar a la carpeta frontend
cd frontend

# 2. Instalar dependencias
npm install

# 3. Crear archivo .env
cp .env.example .env

# 4. Iniciar servidor de desarrollo
npm run dev
# La aplicación estará disponible en http://localhost:5173
```

### Build para Producción

```bash
# Backend
cd backend
npm run start

# Frontend
cd frontend
npm run build
npm run preview
```

## 📡 API REST Endpoints

### Autenticación
```
POST /api/auth/register
POST /api/auth/login
```

### Personajes
```
GET /api/characters?page=1&limit=10&name=goku
GET /api/characters/:id
```

### Favoritos (requiere JWT)
```
POST /api/favorites
GET /api/favorites
DELETE /api/favorites/:characterId
```

### Comentarios
```
POST /api/comments (requiere JWT)
GET /api/comments/:characterId
PUT /api/comments/:id (requiere JWT, solo autor)
DELETE /api/comments/:id (requiere JWT, solo autor)
```

### Admin (requiere JWT + role admin)
```
GET /api/admin/users
GET /api/admin/comments
GET /api/admin/stats
DELETE /api/admin/comments/:id
```

## 🔐 Seguridad Implementada

✅ **Autenticación:**
- JWT con expiración 24h
- Tokens en localStorage (frontend)
- Interceptor axios para añadir token automáticamente

✅ **Contraseñas:**
- Hash con bcrypt (10 rounds)
- Validación de complejidad (mayús, minús, números)

✅ **API:**
- Helmet.js para headers de seguridad
- CORS configurado para frontend
- Rate limiting: 100 req/15 min
- express-validator en todas las entradas

✅ **Base de datos:**
- Prepared statements (sqlite3)
- Foreign keys con ON DELETE CASCADE
- Validaciones de integridad

## 🎨 Diseño y UX

### Tema Dragon Ball
- **Colores**: Naranja (#FF6B35) y Azul (#4ECDC4)
- **Fondo**: Oscuro (#1a1a1a)
- **Fuente**: System fonts
- **Responsive**: Mobile-first (320px - 1920px+)

### Componentes
- ✅ Cards de personajes con hover effects
- ✅ Modal de login sin recargar
- ✅ Paginación inteligente
- ✅ Búsqueda con debounce
- ✅ Rating de estrellas interactivo
- ✅ Confirmación antes de acciones destructivas

## ✨ Características Principales

### Usuario Regular
1. **Explorar**: Ver lista de personajes con búsqueda y paginación
2. **Detalles**: Ver información completa de cada personaje
3. **Favoritos**: Guardar/eliminar personajes favoritos
4. **Comentarios**: Dejar reseñas con rating (1-5 estrellas)
5. **Editar**: Editar propios comentarios
6. **Perfil**: Ver estadísticas personales

### Administrador
- Todas las funciones de usuario regular +
- **Moderación**: Ver y eliminar cualquier comentario
- **Estadísticas**: Ver métricas globales
- **Usuarios**: Lista de usuarios registrados

## 📊 Base de Datos

### Tabla: users
```sql
id INTEGER PRIMARY KEY
username TEXT UNIQUE
email TEXT UNIQUE
password TEXT (hash bcrypt)
role TEXT ('user' | 'admin')
created_at DATETIME
```

### Tabla: favorites
```sql
id INTEGER PRIMARY KEY
user_id INTEGER FK → users.id
character_id INTEGER
character_name TEXT
character_image TEXT
created_at DATETIME
UNIQUE(user_id, character_id)
```

### Tabla: comments
```sql
id INTEGER PRIMARY KEY
user_id INTEGER FK → users.id
character_id INTEGER
character_name TEXT
comment TEXT (max 500 chars)
rating INTEGER (1-5)
created_at DATETIME
updated_at DATETIME
```

## 🧪 Pruebas Recomendadas

### 1. Autenticación
```bash
# Registrarse
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"test","email":"test@test.com","password":"Test123"}'

# Login
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123"}'
```

### 2. Personajes
```bash
# Listar personajes
curl http://localhost:3000/api/characters?page=1&limit=10

# Detalle
curl http://localhost:3000/api/characters/1
```

### 3. Favoritos (con token)
```bash
curl -X POST http://localhost:3000/api/favorites \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"characterId":1,"characterName":"Goku","characterImage":"..."}'
```

## 📱 Características Responsive

- ✅ Mobile (320px): Versión compacta
- ✅ Tablet (768px): Grid de 2 columnas
- ✅ Desktop (1024px): Grid de 3-4 columnas
- ✅ Hamburger menu en móvil
- ✅ Touch-friendly buttons

## 🎯 Performance

- ✅ Lazy loading de imágenes
- ✅ Debounce en búsqueda (500ms)
- ✅ Caché de datos local (localStorage)
- ✅ Code splitting con React.lazy
- ✅ Minificación automática (Vite)

## 📝 Licencia

ISC

## 🤝 Contribuciones

Este es un proyecto educativo. Siéntete libre de forkearlo y mejorarlo.

## 📞 Soporte

Para preguntas o issues, abre un issue en el repositorio.

---

**Made with ❤️ using React, Node.js y Dragon Ball 🐉**
