'use strict'

var express = require('express');
var RegistrarTicketController = require('../controllers/RegistrarTicketController');
var api = express.Router();

api.get('/prueba/:nombre?', RegistrarTicketController.prueba); 
api.get('/favorito/:id', RegistrarTicketController.getFavorito); 
api.get('/favoritos', RegistrarTicketController.getFavoritos); 
api.post('/favorito', RegistrarTicketController.saveFavorito); 
api.put('/favorito', RegistrarTicketController.updateFavorito); 
api.delete('/favorito/:id', RegistrarTicketController.deleteFavorito); 


module.exports = api;
