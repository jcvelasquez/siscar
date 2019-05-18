'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TicketSchema = Schema({
		fecha_recarga: Date,
		hora_recarga: String,
		proveedor: String,
		estacion_servicio: String,
		nro_ticket: String,
		saldo_galones: String,
		kilometraje: Number,
		
		
});

module.exports = mongoose.model('Ticket',TicketSchema);
