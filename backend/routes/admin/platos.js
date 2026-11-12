var express = require('express');
var router = express.Router();
var platosModel = require('../../models/platosModel');
var cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Listar platos
router.get('/', async function (req, res, next) {
  var platos = await platosModel.getPlatos();
  res.render('admin/platos', {
    layout: 'admin/layout',
    usuario: req.session.nombre,
    platos
  });
});

// Formulario agregar
router.get('/agregar', function (req, res, next) {
  res.render('admin/agregarPlato', {
    layout: 'admin/layout'
  });
});

// Guardar plato
router.post('/agregar', async (req, res, next) => {
  try {
    let imagen = '';

    if (req.files && req.files.imagen) {
      const archivo = req.files.imagen;
      const resultado = await cloudinary.uploader.upload(archivo.tempFilePath);
      imagen = resultado.secure_url;
    }

    if (req.body.nombre != "" && req.body.precio != "") {
      await platosModel.insertPlato({
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        precio: req.body.precio,
        categoria: req.body.categoria,
        imagen: imagen,
        activo: 1
      });
      res.redirect('/admin/platos');
    } else {
      res.render('admin/agregarPlato', {
        layout: 'admin/layout',
        error: true,
        message: 'Nombre y precio son obligatorios'
      });
    }
  } catch (error) {
    console.log(error);
    res.render('admin/agregarPlato', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo cargar el plato'
    });
  }
});

// Eliminar
router.get('/eliminar/:id', async (req, res, next) => {
  var id = req.params.id;
  await platosModel.deletePlatoById(id);
  res.redirect('/admin/platos');
});

// Formulario modificar
router.get('/modificar/:id', async (req, res, next) => {
  var id = req.params.id;
  var plato = await platosModel.getPlatoById(id);
  res.render('admin/modificarPlato', {
    layout: 'admin/layout',
    plato
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
      descripcion: req.body.descripcion,
      precio: req.body.precio,
      categoria: req.body.categoria,
      imagen: imagen,
      activo: req.body.activo ? 1 : 0
    };

    await platosModel.modificarPlatoById(obj, req.body.id);
    res.redirect('/admin/platos');
  } catch (error) {
    console.log(error);
    res.render('admin/modificarPlato', {
      layout: 'admin/layout',
      error: true,
      message: 'No se pudo modificar el plato'
    });
  }
});

module.exports = router;