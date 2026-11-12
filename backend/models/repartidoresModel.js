var pool = require('./bd');

async function getRepartidores() {
  var query = 'SELECT * FROM repartidores ORDER BY id DESC';
  var rows = await pool.query(query);
  return rows;
}

async function getRepartidoresDisponibles() {
  var query = 'SELECT * FROM repartidores WHERE disponible = 1 ORDER BY id DESC';
  var rows = await pool.query(query);
  return rows;
}

async function getRepartidorById(id) {
  var query = 'SELECT * FROM repartidores WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows[0];
}

async function insertRepartidor(obj) {
  try {
    var query = 'INSERT INTO repartidores SET ?';
    var rows = await pool.query(query, [obj]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function modificarRepartidorById(obj, id) {
  try {
    var query = 'UPDATE repartidores SET ? WHERE id = ?';
    var rows = await pool.query(query, [obj, id]);
    return rows;
  } catch (error) {
    throw error;
  }
}

async function deleteRepartidorById(id) {
  var query = 'DELETE FROM repartidores WHERE id = ?';
  var rows = await pool.query(query, [id]);
  return rows;
}

module.exports = {
  getRepartidores,
  getRepartidoresDisponibles,
  getRepartidorById,
  insertRepartidor,
  modificarRepartidorById,
  deleteRepartidorById
};