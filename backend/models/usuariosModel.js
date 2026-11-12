var pool = require('./bd');
var bcrypt = require('bcrypt');

// Registrar usuario
async function registrarUsuario(usuario) {
  try {
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(usuario.password, salt);

    const obj = {
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      email: usuario.email,
      password: passwordHash,
      telefono: usuario.telefono || null,
      rol: usuario.rol || 'cliente'
    };

    const query = 'INSERT INTO usuarios SET ?';
    const rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Buscar por email
async function getUsuarioByEmail(email) {
  try {
    const query = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
    const rows = await pool.query(query, [email]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Validar login
async function validarLogin(email, password) {
  try {
    const usuario = await getUsuarioByEmail(email);
    if (!usuario) return null;

    const passwordValida = await bcrypt.compare(password, usuario.password);
    if (!passwordValida) return null;

    // No devolver la password
    delete usuario.password;
    return usuario;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

// Traer usuario por ID
async function getUsuarioById(id) {
  try {
    const query = 'SELECT id, nombre, apellido, email, telefono, rol, created_at FROM usuarios WHERE id = ?';
    const rows = await pool.query(query, [id]);
    return rows[0];
  } catch (error) {
    console.log(error);
    throw error;
  }
}

module.exports = {
  registrarUsuario,
  getUsuarioByEmail,
  validarLogin,
  getUsuarioById
};