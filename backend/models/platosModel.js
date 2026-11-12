var pool = require('./bd');

// Traer todos los platos
async function getPlatos() {
  var query = 'SELECT * FROM platos ORDER BY id DESC';
  var rows = await pool.query(query);
  return rows;
}

// Traer solo los activos (para el frontend)
async function getPlatosActivos() {
  var query = 'SELECT * FROM platos WHERE activo = 1 ORDER BY id DESC';
  var rows = await pool.query(query);
  return rows;
}

// Traer un plato por ID
async function getPlatoById(id) {
  var query = 'SELECT * FROM platos WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows[0];
}

// Insertar plato
async function insertPlato(obj) {
  try {
    var query = 'INSERT INTO platos SET ?';
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Modificar plato
async function modificarPlatoById(obj, id) {
  try {
    var query = 'UPDATE platos SET ? WHERE id = ?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

// Eliminar plato
async function deletePlatoById(id) {
  var query = 'DELETE FROM platos WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getPlatos,
  getPlatosActivos,
  getPlatoById,
  insertPlato,
  modificarPlatoById,
  deletePlatoById
};