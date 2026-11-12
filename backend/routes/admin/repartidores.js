var express = require('express');
var router = express.Router();
var repartidoresModel = require('../../models/repartidoresModel');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Listar
router.get('/', async function (req, res, next) {
  var repartidores = await repartidoresModel.getRepartidores();
  res.render('admin/repartidores', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    repartidores
  });
});

// Formulario agregar
router.get('/agregar', function (req, res, next) {
  res.render('admin/agregarRepartidor', {
    layout: 'admin/layout'
  });
});

// Guardar
router.post('/agregar', async (req, res, next) => {
  try {
    let imagen = '';

    if (req.files && req.files.imagen) {
      const archivo = req.files.imagen;
      const resultado = await cloudinary.uploader.upload(archivo.tempFilePath);
      imagen = resultado.secure_url;
    }

    if (req.body.nombre != "") {
      await repartidoresModel.insertRepartidor({
        nombre: req.body.nombre,
        zona: req.body.zona,
        vehiculo: req.body.vehiculo,
        telefono: req.body.telefono,
        imagen: imagen,
        disponible: 1,
        rating: req.body.rating || 5.0
      });
      res.redirect('/admin/repartidores');
    } else {
      res.render('admin/agregarRepartidor', {
        layout: 'admin/layout',
        error: true,
        message: 'El nombre es obligatorio'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregarRepartidor', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo cargar el repartidor'
    });
  }
});

// Eliminar
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await repartidoresModel.deleteRepartidorById(id);
  res.redirect('/admin/repartidores');
});

// Formulario modificar
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var repartidor = await repartidoresModel.getRepartidorById(id);
  res.render('admin/modificarRepartidor', {
    layout: 'admin/layout',
    repartidor
  });
});

// Guardar modificación
router.post('/modificar', async (req, res, next) => {
  try {
    let imagen = req.body.imagen_actual;

    if (req.files && req.files.imagen) {
      const archivo = req.files.imagen;
      const resultado = await cloudinary.uploader.upload(archivo.tempFilePath);
      imagen = resultado.secure_url;
    }

    let obj = {
      nombre: req.body.nombre,
      zona: req.body.zona,
      vehiculo: req.body.vehiculo,
      telefono: req.body.telefono,
      imagen: imagen,
      disponible: req.body.disponible ? 1 : 0,
      rating: req.body.rating || 5.0
    };

    await repartidoresModel.modificarRepartidorById(obj, req.body.id);
    res.redirect('/admin/repartidores');
  } catch (error) {
    console.log(error);
    res.render('admin/modificarRepartidor', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar el repartidor'
    });
  }
});

module.exports = router;