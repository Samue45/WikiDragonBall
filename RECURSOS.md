# 📚 Recursos y Referencias - Dragon Ball Wiki

## 📖 Documentación Interna

### Documentación del Proyecto
1. **[README.md](./README.md)** - Descripción general del proyecto
2. **[INDEX.md](./INDEX.md)** - Índice rápido de la app
3. **[INICIO_RAPIDO.md](./INICIO_RAPIDO.md)** - Guía paso a paso
4. **[NOTAS_TECNICAS.md](./NOTAS_TECNICAS.md)** - Decisiones arquitectónicas
5. **[CHECKLIST.md](./CHECKLIST.md)** - Verificación de features
6. **[RESUMEN_FINAL.md](./RESUMEN_FINAL.md)** - Resumen completo
7. **[PROYECTO_COMPLETADO.txt](./PROYECTO_COMPLETADO.txt)** - Visual summary

### Documentación Específica
- [backend/README.md](./backend/README.md) - API REST documentation
- [frontend/README.md](./frontend/README.md) - React app documentation

---

## 🔗 Enlaces Externos

### APIs
- **Dragon Ball API:** https://dragonball-api.com/
- **Dragon Ball API Docs:** https://web.dragonball-api.com/

### Documentación Oficial

#### Backend
- [Express.js](https://expressjs.com/)
- [SQLite](https://www.sqlite.org/)
- [Bcrypt](https://github.com/kelektiv/node.bcrypt.js)
- [JWT](https://jwt.io/)
- [axios](https://axios-http.com/)
- [express-validator](https://express-validator.github.io/docs/)
- [Helmet.js](https://helmetjs.github.io/)
- [express-rate-limit](https://github.com/nfriedly/express-rate-limit)

#### Frontend
- [React](https://react.dev/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TailwindCSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 💻 Herramientas Recomendadas

### IDE & Editores
- **VS Code** - Recomendado (usado en este proyecto)
- **WebStorm** - IDE para JavaScript/React
- **Cursor** - Editor IA

### Extensiones VS Code
- **ES7+ React/Redux/React-Native snippets** (dsznajder.es7-react-js-snippets)
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss)
- **Prettier - Code formatter** (esbenp.prettier-vscode)
- **REST Client** (humao.rest-client)
- **SQLite** (alexcvzz.vscode-sqlite)

### APIs Testing
- **Postman** - https://www.postman.com/
- **Thunder Client** (extensión VS Code)
- **REST Client** (extensión VS Code)
- **curl** (línea de comandos)

### Bases de Datos
- **DB Browser for SQLite** - https://sqlitebrowser.org/
- **SQLite Studio** - https://sqlitestudio.pl/

---

## 📚 Tutoriales & Learning

### Node.js & Express
- [Express.js - Getting Started](https://expressjs.com/en/starter/hello-world.html)
- [Node.js Official Guide](https://nodejs.org/en/docs/)
- [FreeCodeCamp - Node.js & Express](https://www.youtube.com/watch?v=fBNz5xF-Kx4)

### React
- [React Official Tutorial](https://react.dev/learn)
- [React Router Guide](https://reactrouter.com/en/main/start/overview)
- [TailwindCSS Tutorial](https://tailwindcss.com/docs/installation)

### Bases de Datos
- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [SQLite Tutorial](https://www.sqlitetutorial.net/)

### Seguridad
- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [JWT.io](https://jwt.io/)
- [Bcrypt.js](https://www.npmjs.com/package/bcrypt)

---

## 🎓 Conceptos Clave

### Patrones de Diseño
- **MVC (Model-View-Controller)** - Backend
- **Component-Based** - Frontend
- **Context API** - State Management
- **REST API** - Communication

### Flujos de Autenticación
- **JWT (JSON Web Tokens)** - Autenticación stateless
- **Bearer Tokens** - Autorización
- **Refresh Tokens** - Renovación

### Patrones de Base de Datos
- **Foreign Keys** - Relaciones
- **UNIQUE constraints** - Unicidad
- **Indexes** - Performance
- **Transactions** - Integridad

---

## 🛠️ Comandos Útiles

### Backend
```bash
# Instalar dependencias
cd backend && npm install

# Desarrollo
npm run dev

# Producción
npm start

# Ver procesos en puerto 3000
lsof -i :3000
```

### Frontend
```bash
# Instalar dependencias
cd frontend && npm install

# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview

# Ver procesos en puerto 5173
lsof -i :5173
```

### Git
```bash
# Iniciar repo
git init

# Agregar todo
git add .

# Commit
git commit -m "mensaje"

# Push
git push origin main
```

### Base de Datos
```bash
# Abrir SQLite en CLI
sqlite3 backend/dragonball.db

# Listar tablas
.tables

# Ver estructura
.schema

# Salir
.quit
```

---

## 📝 Ejemplos de Código

### Crear Usuario (Backend)
```javascript
POST /api/auth/register
Content-Type: application/json

{
  "username": "goku",
  "email": "goku@dbz.com",
  "password": "Kamehame123"
}

Response: 201 Created
{
  "success": true,
  "message": "Usuario registrado exitosamente"
}
```

### Login (Backend)
```javascript
POST /api/auth/login
Content-Type: application/json

{
  "email": "goku@dbz.com",
  "password": "Kamehame123"
}

Response: 200 OK
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "goku",
    "email": "goku@dbz.com",
    "role": "user"
  }
}
```

### Guardar Favorito (con Token)
```javascript
POST /api/favorites
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "characterId": 1,
  "characterName": "Goku",
  "characterImage": "https://..."
}

Response: 201 Created
{
  "success": true,
  "message": "Añadido a favoritos",
  "data": {
    "id": 1,
    "userId": 1,
    "characterId": 1,
    ...
  }
}
```

### Crear Comentario (con Token)
```javascript
POST /api/comments
Authorization: Bearer TOKEN
Content-Type: application/json

{
  "characterId": 1,
  "characterName": "Goku",
  "comment": "¡Un personaje increíble!",
  "rating": 5
}

Response: 201 Created
{
  "success": true,
  "message": "Comentario creado",
  "data": {
    "id": 1,
    "userId": 1,
    "characterId": 1,
    "comment": "...",
    "rating": 5
  }
}
```

---

## 🚀 Deployment

### Hosting Backend
- **Heroku** - https://www.heroku.com/
- **Railway** - https://railway.app/
- **Render** - https://render.com/
- **Fly.io** - https://fly.io/

### Hosting Frontend
- **Vercel** - https://vercel.com/
- **Netlify** - https://www.netlify.com/
- **GitHub Pages** - https://pages.github.com/
- **Surge.sh** - https://surge.sh/

### Base de Datos
- **Railway PostgreSQL** - https://railway.app/
- **Supabase** - https://supabase.com/
- **PlanetScale** - https://planetscale.com/

---

## 🐛 Debugging

### Browser DevTools
- **Network Tab** - Ver requests/responses
- **Console** - Ver errores
- **Application** - Ver localStorage
- **Elements** - Inspeccionar HTML

### VS Code Debugging
```json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "node",
      "request": "launch",
      "program": "${workspaceFolder}/backend/server.js",
      "name": "Backend"
    }
  ]
}
```

### Logs
```javascript
// Backend
console.log('✓ Evento:', datos);
console.error('✗ Error:', error);

// Frontend
console.log('State:', state);
console.error('API Error:', error);
```

---

## 📊 Performance Tips

### Backend
1. Usar índices en BD
2. Limitar resultados (LIMIT, OFFSET)
3. Cache de datos
4. Compression
5. Rate limiting

### Frontend
1. Code splitting
2. Lazy loading
3. Memoization (React.memo)
4. useCallback/useMemo
5. Image optimization

---

## 🔐 Seguridad Checklist

### Backend
- [ ] Validar TODOS los inputs
- [ ] Hashear contraseñas
- [ ] Usar HTTPS en producción
- [ ] JWT secret seguro
- [ ] Rate limiting
- [ ] CORS configurado
- [ ] SQL injection prevention
- [ ] XSS prevention

### Frontend
- [ ] No guardar secrets en cliente
- [ ] Validar inputs localmente
- [ ] Usar HTTPS
- [ ] Logout en token expirado
- [ ] No loguear datos sensibles

---

## 📈 Monitoreo

### Herramientas
- **Sentry** - Error tracking
- **LogRocket** - Session replay
- **New Relic** - APM
- **DataDog** - Monitoring

### Métricas
- Response time
- Error rate
- CPU/Memory usage
- Requests per second

---

## 🎯 Checklist de Desarrollo

- [ ] Código limpio y comentado
- [ ] Variables bien nombradas
- [ ] Funciones pequeñas
- [ ] DRY (Don't Repeat Yourself)
- [ ] Error handling
- [ ] Logging
- [ ] Validación input
- [ ] Tests
- [ ] Documentation
- [ ] Performance

---

## 📚 Libros Recomendados

- **Clean Code** - Robert Martin
- **The Pragmatic Programmer** - David Thomas
- **You Don't Know JS** - Kyle Simpson
- **Eloquent JavaScript** - Marijn Haverbeke

---

## 🤝 Comunidades

- **Stack Overflow** - https://stackoverflow.com/
- **Dev.to** - https://dev.to/
- **Reddit** - r/javascript, r/reactjs, r/learnprogramming
- **Discord** - Node.js, React communities
- **GitHub** - Contributions, issues

---

## 💡 Consejos

1. **Aprende paso a paso** - No intentes todo a la vez
2. **Lee documentación** - Es tu mejor amiga
3. **Practica** - Haz proyectos reales
4. **Contribuye** - Open source
5. **Enseña** - Explicar ayuda a aprender
6. **Mantente actualizado** - Sigue blogs y tweets
7. **Debuggea** - Usa DevTools
8. **Versionea** - Git siempre

---

## 📞 Contacto & Soporte

Para preguntas sobre este proyecto:
1. Consulta los READMEs
2. Revisa NOTAS_TECNICAS.md
3. Verifica CHECKLIST.md
4. Busca en Stack Overflow

---

## 🎉 ¡Buena Suerte!

Has creado un proyecto profesional y completo.
Ahora es momento de explorar, aprender y mejorar.

**Happy Coding! 🐉**

---

*Última actualización: Enero 28, 2026*
