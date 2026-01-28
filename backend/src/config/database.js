const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const bcrypt = require('bcrypt');

const dbPath = path.join(__dirname, '../../dragonball.db');

// Crear conexión a la base de datos
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error al conectar a SQLite:', err.message);
  } else {
    console.log('✓ Conectado a SQLite:', dbPath);
  }
});

// Ejecutar promisificado
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

const dbGet = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Inicializar tabla de usuarios
const initUsers = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT DEFAULT 'user',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `;
  await dbRun(sql);
  console.log('✓ Tabla usuarios inicializada');
};

// Inicializar tabla de favoritos
const initFavorites = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS favorites (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      character_id INTEGER NOT NULL,
      character_name TEXT NOT NULL,
      character_image TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
      UNIQUE(user_id, character_id)
    )
  `;
  await dbRun(sql);
  console.log('✓ Tabla favoritos inicializada');
};

// Inicializar tabla de comentarios
const initComments = async () => {
  const sql = `
    CREATE TABLE IF NOT EXISTS comments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      character_id INTEGER NOT NULL,
      character_name TEXT NOT NULL,
      comment TEXT NOT NULL,
      rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )
  `;
  await dbRun(sql);
  console.log('✓ Tabla comentarios inicializada');
};

// Crear usuario admin por defecto
const createAdminUser = async () => {
  try {
    const adminExists = await dbGet('SELECT id FROM users WHERE role = ?', ['admin']);
    if (!adminExists) {
      const hashedPassword = await bcrypt.hash('Admin123!', 10);
      await dbRun(
        'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)',
        ['admin', 'admin@dragonball.com', hashedPassword, 'admin']
      );
      console.log('✓ Usuario admin creado: admin@dragonball.com / Admin123!');
    }
  } catch (error) {
    console.error('Error creando admin:', error);
  }
};

// Inicializar base de datos
const initDatabase = async () => {
  try {
    await initUsers();
    await initFavorites();
    await initComments();
    await createAdminUser();
    console.log('✓ Base de datos inicializada correctamente');
  } catch (error) {
    console.error('Error inicializando BD:', error);
  }
};

// Llamar a la inicialización
initDatabase();

module.exports = { db, dbRun, dbGet, dbAll };
