# 🐉 Dragon Ball Wiki - Frontend

Interfaz moderna y responsiva para explorar personajes de Dragon Ball, gestionar favoritos y dejar comentarios.

## Características

✨ **Interfaz moderna** - Diseño responsive con TailwindCSS
🎨 **Tema Dragon Ball** - Colores primarios naranja y azul
📱 **Responsive** - Mobile-first design, funciona en todos los dispositivos
🔐 **Autenticación** - JWT basada en tokens, persistencia en localStorage
⭐ **Sistema de ratings** - Califica personajes de 1 a 5 estrellas
❤️ **Favoritos** - Guarda tus personajes favoritos
💬 **Comentarios** - Comenta y valora personajes

## Instalación

```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```

## Configuración .env

```
VITE_API_URL=http://localhost:3000/api
```

## Estructura del Proyecto

```
frontend/
├── public/                 # Archivos estáticos
├── src/
│   ├── components/        # Componentes reutilizables
│   │   ├── common/       # Navbar, Footer, Loading, etc.
│   │   ├── characters/   # CharacterCard, List, Search, etc.
│   │   ├── favorites/    # FavoriteButton, FavoritesList
│   │   ├── comments/     # CommentForm, List, Item, Rating
│   │   └── admin/        # AdminStats, CommentModeration
│   ├── pages/            # Páginas principales (Home, Login, etc.)
│   ├── context/          # AuthContext para estado global
│   ├── services/         # API calls (auth, characters, etc.)
│   ├── utils/            # Funciones helper
│   ├── App.jsx          # Componente principal
│   ├── main.jsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── index.html           # HTML principal
├── vite.config.js      # Configuración Vite
├── tailwind.config.js  # Configuración TailwindCSS
└── package.json
```

## Rutas disponibles

| Ruta | Descripción | Autenticación |
|------|-------------|---------------|
| `/` | Lista de personajes | No |
| `/character/:id` | Detalle del personaje | No |
| `/favorites` | Mis favoritos | Sí |
| `/profile` | Mi perfil | Sí |
| `/login` | Iniciar sesión | No |
| `/register` | Registrarse | No |
| `/admin` | Panel admin | Solo admin |

## Tecnologías

- **React 18** - Librería UI
- **Vite** - Build tool rápido
- **React Router** - Enrutamiento
- **Axios** - HTTP client
- **TailwindCSS** - Estilos
- **React Icons** - Iconografía
- **JWT Decode** - Decodificación de tokens

## Desarrollo

```bash
# Iniciar servidor de desarrollo
npm run dev

# Construir para producción
npm build

# Vista previa de build
npm run preview
```

## Componentes principales

### AuthContext
Gestiona el estado de autenticación global:
- `user` - Datos del usuario
- `token` - JWT token
- `isAuthenticated` - Estado de autenticación
- `isLoading` - Estado de carga
- Métodos: `login()`, `register()`, `logout()`

### ProtectedRoute
Componente para proteger rutas:
- Requiere autenticación
- Opcionalmente requiere role admin
- Redirige a login si no está autenticado

### CharacterCard
Tarjeta de personaje:
- Imagen y detalles básicos
- Botón para agregar a favoritos
- Click para ir a detalles

### CommentForm & CommentList
Sistema de comentarios:
- Crear comentarios con rating 1-5
- Editar comentarios propios
- Eliminar comentarios (autor o admin)
- Mostrar autor, fecha y rating

## Estilos

### Colores principales
- **Primario**: #FF6B35 (Naranja Dragon Ball)
- **Secundario**: #4ECDC4 (Azul)
- **Fondo**: #1a1a1a (Gris oscuro)

### Breakpoints Responsive
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## Hooks personalizados

### useAuth()
Hook para acceder al contexto de autenticación:
```javascript
const { user, isAuthenticated, login, logout } = useAuth();
```

## Servicios API

Todos los servicios en `src/services/`:
- `authService.js` - Autenticación
- `charactersService.js` - Personajes
- `favoritesService.js` - Favoritos
- `commentsService.js` - Comentarios
- `adminService.js` - Admin
- `api.js` - Cliente axios base

## Performance

- ✅ Lazy loading de imágenes
- ✅ Debounce en búsqueda (500ms)
- ✅ Caché de datos con React Query (opcional)
- ✅ Código splittting con React.lazy (opcional)

## Seguridad

- ✅ Token almacenado en localStorage
- ✅ Interceptor axios para añadir token
- ✅ Validación de entrada en formularios
- ✅ Protección de rutas
- ✅ Logout automático si token expira

## Licencia

ISC
