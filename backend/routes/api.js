var express = require('express');
var router = express.Router();
var platosModel = require('../models/platosModel');
var repartidoresModel = require('../models/repartidoresModel');
var usuariosModel = require('../models/usuariosModel');
var jwt = require('jsonwebtoken');

// ======================
// PLATOS
// ======================
router.get('/platos', async function (req, res, next) {
  try {
    let platos = await platosModel.getPlatosActivos();
    res.json(platos);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Error al obtener los platos' });
  }
});

// ======================
// REPARTIDORES
// ======================
router.get('/repartidores', async function (req, res, next) {
  try {
    let repartidores = await repartidoresModel.getRepartidoresDisponibles();
    res.json(repartidores);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: 'Error al obtener los repartidores' });
  }
});

// ======================
// REGISTRO
// ======================
router.post('/register', async (req, res) => {
  try {
    const { nombre, apellido, email, password, telefono } = req.body;

    if (!nombre || !apellido || !email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Faltan datos obligatorios'
      });
    }

    // Verificar si el email ya existe
    const existe = await usuariosModel.getUsuarioByEmail(email);
    if (existe) {
      return res.status(400).json({
        error: true,
        message: 'El email ya está registrado'
      });
    }

    await usuariosModel.registrarUsuario({
      nombre,
      apellido,
      email,
      password,
      telefono
    });

    res.status(201).json({
      error: false,
      message: 'Usuario registrado correctamente'
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Error al registrar el usuario'
    });
  }
});

// ======================
// LOGIN
// ======================
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: true,
        message: 'Email y contraseña son obligatorios'
      });
    }

    const usuario = await usuariosModel.validarLogin(email, password);

    if (!usuario) {
      return res.status(401).json({
        error: true,
        message: 'Email o contraseña incorrectos'
      });
    }

    // Crear token JWT
    const token = jwt.sign(
      {
        id: usuario.id,
        email: usuario.email,
        nombre: usuario.nombre,
        rol: usuario.rol
      },
      process.env.JWT_SECRET || 'carrigo_secret_key_2025',
      { expiresIn: '7d' }
    );

    res.json({
      error: false,
      message: 'Login correcto',
      token,
      usuario: {
        id: usuario.id,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        email: usuario.email,
        rol: usuario.rol
      }
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: true,
      message: 'Error al iniciar sesión'
    });
  }
});

module.exports = router;