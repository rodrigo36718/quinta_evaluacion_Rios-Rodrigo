var express = require('express');
var router = express.Router();
var usuariosModel = require('../../models/usuariosModel');

router.get('/', function (req, res, next) {
  res.render('admin/login', {
    layout: 'admin/layout'
  });
});

router.get('/logout', function (req, res, next) {
  req.session.destroy();
  res.redirect('/admin/login');
});

router.post('/', async (req, res, next) => {
  try {
    var email = req.body.usuario;
    var password = req.body.password;

    console.log('Intentando login con:', email);

    var data = await usuariosModel.validarLogin(email, password);

    if (data && data.rol === 'admin') {
      req.session.id_usuario = data.id;
      req.session.nombre = data.nombre;
      console.log('Login admin exitoso');
      res.redirect('/admin/platos');
    } else {
      console.log('Login fallido');
      res.render('admin/login', {
        layout: 'admin/layout',
        error: true
      });
    }
  } catch (error) {
    console.log('Error en login:', error);
    res.render('admin/login', {
      layout: 'admin/layout',
      error: true
    });
  }
});

module.exports = router;