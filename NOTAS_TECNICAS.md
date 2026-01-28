# 🐉 Notas Técnicas - Dragon Ball Wiki

## Decisiones Arquitectónicas

### Backend

#### 1. Express.js como Framework
**Razón:** Framework lightweight, flexible y ampliamente soportado para APIs REST.

#### 2. SQLite como BD
**Razón:** 
- No requiere servidor separado
- Perfecta para desarrollo y pequeños proyectos
- Facilita deployment
- Almacenamiento en archivo (`dragonball.db`)

#### 3. JWT para Autenticación
**Razón:**
- Stateless (no requiere sesión en servidor)
- Escalable
- CORS-friendly
- Expiración automática

#### 4. Estructura por Capas
```
routes → controllers → services/models → database
```
**Razón:** Separación de responsabilidades, fácil de mantener y testear

---

### Frontend

#### 1. React con Vite
**Razón:**
- Vite es mucho más rápido que Create React App
- HMR (Hot Module Replacement) instantáneo
- Build optimizado para producción

#### 2. Context API en lugar de Redux
**Razón:**
- Estado simple (solo autenticación)
- Menos boilerplate
- Built-in en React

#### 3. React Router v6
**Razón:**
- API más intuitiva que v5
- Mejor manejo de parámetros
- Hooks personalizados

#### 4. TailwindCSS
**Razón:**
- Utility-first, rápido de desarrollar
- Responsive por defecto
- Tamaño de bundle optimizado

---

## Flujos Principales

### Autenticación

```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuario llena formulario de login                    │
│ 2. Frontend envía POST /api/auth/login                  │
│ 3. Backend verifica credenciales                        │
│ 4. Backend genera JWT token                             │
│ 5. Frontend guarda token en localStorage                │
│ 6. Frontend configura header: Authorization: Bearer JWT │
│ 7. Requests posteriores incluyen token automáticamente  │
│ 8. Backend valida token en middleware                   │
│ 9. Si token expira: logout automático                   │
└─────────────────────────────────────────────────────────┘
```

### Obtener Personajes

```
┌─────────────────────────────────────────────────────────┐
│ 1. Frontend: GET /api/characters?page=1&limit=10        │
│ 2. Backend controllers obtiene params                   │
│ 3. Backend llama dragonball.service.getCharacters()     │
│ 4. Service llama Axios a Dragon Ball API                │
│ 5. Response se transforma y envía al frontend           │
│ 6. Frontend guarda en estado (useState)                 │
│ 7. Frontend renderiza CharacterList                     │
└─────────────────────────────────────────────────────────┘
```

### Guardar a Favoritos

```
┌─────────────────────────────────────────────────────────┐
│ 1. Usuario click en corazón del personaje               │
│ 2. Frontend: POST /api/favorites + token                │
│ 3. Backend middleware verifyToken extrae userId         │
│ 4. Backend verifica que no esté duplicado               │
│ 5. Backend INSERT en tabla favorites                    │
│ 6. Frontend actualiza UI (corazón lleno)                │
│ 7. Frontend actualiza estado de favoritos               │
└─────────────────────────────────────────────────────────┘
```

### Comentarios

```
┌─────────────────────────────────────────────────────────┐
│ CREAR:                                                  │
│ 1. Usuario llena CommentForm                            │
│ 2. Frontend: POST /api/comments + token                 │
│ 3. Backend valida comment (max 500), rating (1-5)       │
│ 4. Backend INSERT en comments                           │
│ 5. Frontend agrega a lista local (optimismo)            │
│                                                         │
│ EDITAR:                                                 │
│ 1. Usuario click editar en comentario propio            │
│ 2. Frontend modo edit inline                            │
│ 3. Frontend: PUT /api/comments/:id + token              │
│ 4. Backend verifica user_id === comentario.user_id      │
│ 5. Backend UPDATE en comments                           │
│ 6. Frontend actualiza lista                             │
│                                                         │
│ ELIMINAR:                                               │
│ 1. Usuario click eliminar                               │
│ 2. Frontend pide confirmación                           │
│ 3. Frontend: DELETE /api/comments/:id + token           │
│ 4. Backend verifica propiedad o role admin              │
│ 5. Backend DELETE de comments                           │
│ 6. Frontend remueve de lista                            │
└─────────────────────────────────────────────────────────┘
```

---

## Validaciones

### Backend

#### auth/register
```javascript
- username: min 3 chars, alphanumeric + _
- email: formato email válido
- password: min 6 chars, mayús, minús, números
```

#### comments
```javascript
- characterId: entero positivo
- comment: 1-500 caracteres
- rating: 1-5
```

### Frontend

#### Login/Register
```javascript
- Email válido (regex)
- Password >= 6 chars
- Contraseñas coinciden
- Username no vacío
```

#### Comments
```javascript
- Texto no vacío
- Máximo 500 caracteres
- Rating seleccionado (1-5)
```

---

## Seguridad

### CORS
```javascript
origen: http://localhost:5173
métodos: GET, POST, PUT, DELETE, OPTIONS
headers: Content-Type, Authorization
```

### Rate Limiting
```javascript
100 requests por 15 minutos por IP
```

### Password Hashing
```javascript
bcrypt con 10 rounds (cost)
~100ms por hash
```

### JWT
```javascript
expiración: 24 horas
algoritmo: HS256
payload: id, email, role
```

### SQL Injection Prevention
```javascript
Prepared statements (?)
Parámetros escapados
```

---

## Errores Comunes y Soluciones

### Error: "Module not found"
**Causa:** Dependencias no instaladas
**Solución:** 
```bash
npm install
```

### Error: "CORS error"
**Causa:** Frontend y backend en origins diferentes
**Solución:** Verificar FRONTEND_URL en .env del backend

### Error: "Invalid token"
**Causa:** Token expirado o alterado
**Solución:** Frontend elimina token y redirige a login

### Error: "Duplicate entry"
**Causa:** Usuario, email o favorite duplicado
**Solución:** Backend retorna 409 Conflict

### Error: "Rate limit exceeded"
**Causa:** Demasiadas requests en poco tiempo
**Solución:** Esperar 15 minutos, retry exponencial en cliente

---

## Performance Tips

### Frontend
1. **Lazy Loading de rutas:**
   ```javascript
   const Home = React.lazy(() => import('./pages/Home'));
   ```

2. **Memoización de componentes:**
   ```javascript
   const CharacterCard = React.memo(({ character }) => {...});
   ```

3. **useCallback para funciones:**
   ```javascript
   const handleSearch = useCallback((term) => {...}, []);
   ```

4. **Debounce en búsqueda:**
   ```javascript
   setTimeout(() => onSearch(value), 500);
   ```

### Backend
1. **Índices en BD:**
   ```sql
   CREATE INDEX idx_user_id ON favorites(user_id);
   CREATE INDEX idx_character_id ON comments(character_id);
   ```

2. **Prepared Statements:**
   ```javascript
   db.run('SELECT * FROM users WHERE id = ?', [id]);
   ```

3. **Limit en queries:**
   ```javascript
   'SELECT * FROM comments LIMIT ? OFFSET ?'
   ```

---

## Testing

### Backend (Postman/cURL)
1. Test auth endpoints
2. Test CORS headers
3. Test rate limiting
4. Test validaciones
5. Test errores

### Frontend
1. Test navigation
2. Test forms
3. Test API calls
4. Test auth flow
5. Test responsive

---

## Deployment

### Backend (Heroku)
```bash
1. git push heroku main
2. Define variables de entorno en Heroku
3. SQL se migra automáticamente
```

### Frontend (Vercel)
```bash
1. Conectar repo a Vercel
2. Build command: npm run build
3. Output: dist
4. Environment: VITE_API_URL
```

---

## Escalabilidad Futura

### BD
- Migrar a PostgreSQL para producción
- Implementar caching con Redis
- Replicación y backups

### Backend
- Docker containerization
- CI/CD pipeline
- Logging centralizado
- Monitoring (APM)

### Frontend
- Service Workers (PWA)
- Code splitting mejorado
- Caché agresivo de assets

---

## Dependencias Críticas

### Backend
- **bcrypt**: Hashing seguro
- **jsonwebtoken**: Generación/validación JWT
- **express-validator**: Validación entrada

### Frontend
- **axios**: HTTP client
- **react-router-dom**: Routing
- **tailwindcss**: Styling

---

## Logs y Debugging

### Backend
```javascript
console.log('✓ Evento', datos);
console.error('✗ Error:', error);
```

### Frontend
```javascript
console.log('State:', state);
console.error('API Error:', error.response?.data);
```

---

## Versionado

### Semantic Versioning
- **MAJOR.MINOR.PATCH** (1.0.0)
- MAJOR: Breaking changes
- MINOR: New features
- PATCH: Bug fixes

---

## Documento de Cambios

### v1.0.0 - Initial Release
- ✅ Autenticación JWT
- ✅ CRUD de comentarios
- ✅ Sistema de favoritos
- ✅ Panel admin
- ✅ Tema responsive

---

**Last Updated:** Enero 28, 2026
**Status:** ✅ Production Ready
