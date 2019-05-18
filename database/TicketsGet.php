<?php

require_once('TicketsService.php'); 

$mv = new TicketsService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['columns'] = array();
$settings['order'] = array();
$settings['action_type'] = $_REQUEST['action_type'];
if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];
if(isset($_REQUEST["columns"])) $settings['columns'] = $_REQUEST['columns'];
if(isset($_REQUEST["order"])) $settings['order'] = $_REQUEST['order'];

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			if(!empty($_REQUEST['desde'])){
				$desde = DateTime::createFromFormat('d/m/Y', $_REQUEST['desde']);
				$settings['desde'] = $desde->format('Y-m-d');
			}else{
				$settings['desde'] = "";	
			}
			
			if(!empty($_REQUEST['hasta'])){
				$hasta = DateTime::createFromFormat('d/m/Y', $_REQUEST['hasta']);
				$settings['hasta'] = $hasta->format('Y-m-d');
			}else{
				$settings['hasta'] = "";	
			}
			
			if(!empty($_REQUEST['idchofer'])){
				$settings['idchofer'] = $_REQUEST['idchofer'];
			}else{
				$settings['idchofer'] = "";	
			}
			
			if(!empty($_REQUEST['idtipo_combustible'])){
				$settings['idtipo_combustible'] = $_REQUEST['idtipo_combustible'];
			}else{
				$settings['idtipo_combustible'] = "";	
			}
			
			if(!empty($_REQUEST['idvehiculos'])){
				$settings['idvehiculos'] = $_REQUEST['idvehiculos'];
			}else{
				$settings['idvehiculos'] = "";	
			}
			
			if(!empty($_REQUEST['sedes_idsedes'])){
				$settings['sedes_idsedes'] = $_REQUEST['sedes_idsedes'];
			}else{
				$settings['sedes_idsedes'] = "";	
			}
					
			$mvObj = new stdClass;
			$mvObj = $mv->getAllTickets($settings);
			echo json_encode($mvObj);
		
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getTicketByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;			
			
			$item->idvehiculos = $_REQUEST['pk_idvehiculos'];
			$item->sedes_idsedes = $_REQUEST['pk_sedes'];
			$item->idtipo_combustible  = $_REQUEST['idtipo_combustible'];
			$item->idsucursales = $_REQUEST['idsucursales'];
						
			$item->chofer_idchofer = $_REQUEST['chofer_idchofer'];
			$item->id_item_adjudicados = $_REQUEST['id_item_adjudicados'];
						
			$item->idtarjetas_combustible = (empty($_REQUEST['idtarjetas_combustible']) || $_REQUEST['idtarjetas_combustible'] == "")? NULL : $_REQUEST['idtarjetas_combustible']; 
			
			$item->nro_ticket = $_REQUEST['nro_ticket']; 
			
			$fecha_ticket = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_ticket']);
			$item->fecha_ticket = $fecha_ticket->format('Y-m-d');
			
			$item->hora_ticket = $_REQUEST['hora_ticket'];
			$item->saldo_combustible = $_REQUEST['saldo_combustible'];
			$item->cantidad_combustible = $_REQUEST['cantidad_combustible'];
			$item->precio_unitario_combustible = $_REQUEST['precio_unitario_combustible'];
			$item->importe_total_combustible = $_REQUEST['importe_total_combustible'];
			$item->kilometraje = $_REQUEST['kilometraje']; 
			$item->es_tanque_lleno = $_REQUEST['es_tanque_lleno'];
			$item->es_reset = 1;
			$item->es_ticket = (empty($_REQUEST['es_ticket']) || $_REQUEST['es_ticket'] == "")? 0 : $_REQUEST['es_ticket'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createTicket($item));
	 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idticket_combustible = $_REQUEST['id'];			
			$item->idvehiculos = $_REQUEST['pk_idvehiculos'];
			$item->sedes_idsedes = $_REQUEST['pk_sedes'];
			
			$item->idtipo_combustible  = $_REQUEST['idtipo_combustible'];
			$item->idsucursales = $_REQUEST['idsucursales'];
			$item->nro_ticket = $_REQUEST['nro_ticket']; 
						
			$fecha_ticket = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_ticket']);
			$item->fecha_ticket = $fecha_ticket->format('Y-m-d');
			
			$item->hora_ticket = $_REQUEST['hora_ticket'];
			$item->saldo_combustible = $_REQUEST['saldo_combustible'];
			$item->cantidad_combustible = $_REQUEST['cantidad_combustible'];
			$item->precio_unitario_combustible = $_REQUEST['precio_unitario_combustible'];
			$item->importe_total_combustible = $_REQUEST['importe_total_combustible'];
			$item->kilometraje = $_REQUEST['kilometraje']; 
			$item->es_tanque_lleno = $_REQUEST['es_tanque_lleno'];
			$item->es_reset = 1;
			
			$item->fecha_modificacion = date("Y-m-d H:i:s"); 
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
						
			echo json_encode($mv->updateTicket($item));
			
	 }elseif($_REQUEST['action_type'] == 'create_tickets_x_factura_cabecera'){
		 
		 	 $item = new stdClass;
			 $item->facturas_idfacturas = $_REQUEST['facturas_idfacturas'];
			 $item->descripcion_cabecera = $_REQUEST['descripcion_cabecera'];
			 $item->nro_cabecera_generado = "";
			 $item->fecha_creacion  = date("Y-m-d H:i:s");
			 $item->usuario_creacion = 'jvelasquez';
			 
			 echo json_encode($mv->createTicketsXFacturaCabecera($item));
	
	 }elseif($_REQUEST['action_type'] == 'update_tickets_x_factura_cabecera'){
		 
		 	 $item = new stdClass;
			 $item->idtickets_x_factura_cabecera = $_REQUEST['id'];
			 $item->descripcion_cabecera = $_REQUEST['descripcion_cabecera'];
			 $item->fecha_modificacion  = date("Y-m-d H:i:s");
			 $item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			 
			 echo json_encode($mv->updateTicketsXFacturaCabecera($item));
			 	 		 
	 }elseif($_REQUEST['action_type'] == 'create_tickets_x_factura_detalle'){
		 
			 $item = new stdClass;
			 $item->idtickets_x_factura_cabecera = $_REQUEST['idtickets_x_factura_cabecera'];
			 $item->idticket_combustible = $_REQUEST['idticket_combustible'];
			 $item->fecha_asignacion = date("Y-m-d H:i:s");
			 $item->estado_asignacion = 1;
			 $item->fecha_creacion  = date("Y-m-d H:i:s");
			 $item->usuario_creacion = 'jvelasquez';
			 
			 echo json_encode($mv->createTicketsXFacturaDetalle($item));
		
	}elseif($_REQUEST['action_type'] == 'tickets_x_factura'){
		 	
			$mvObj = new stdClass;
			$mvObj = $mv->getTicketsByFacturaID($_REQUEST['id']);
			echo json_encode($mvObj);	
			 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteTicket($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'delete_ticket_x_factura_detalle'){
			
		 	echo json_encode($mv->deleteTicketXFacturaDetalle($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>