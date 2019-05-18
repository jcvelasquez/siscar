'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VehiculoSchema = Schema({
	title: String,
	description: String,
	url: String
});

module.exports = mongoose.model('Vehiculo',VehiculoSchema);
