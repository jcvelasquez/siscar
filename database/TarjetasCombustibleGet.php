<?php

require_once('TarjetasCombustibleService.php'); 

$mv = new TarjetasCombustibleService(); 

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

//PARA OCULTAR LOS ESTADOS DESACTIVADOS
$settings['estado'] = (isset($_REQUEST["estado"]))? $_REQUEST['estado'] : "-1";

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllTarjetas($settings);
			echo json_encode($mvObj);

	}elseif($_REQUEST['action_type'] == 'tarjetas_x_vehiculo'){
		 
		 	$mvObj = new stdClass;
			$mvObj = $mv->getTarjetasByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getTarjetaByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos']; 
			$item->id_item_adjudicados = $_REQUEST['id_item_adjudicados'];
			$item->proveedores_idproveedores = $_REQUEST['proveedores_idproveedores'];
			$item->nro_tarjeta = $_REQUEST['nro_tarjeta'];
			$item->estado_tarjeta = $_REQUEST['estado_tarjeta'];
			$item->fecha_creacion  = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createTarjeta($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idtarjetas_combustible = $_REQUEST['id'];
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos']; 
			$item->id_item_adjudicados = $_REQUEST['id_item_adjudicados'];
			$item->proveedores_idproveedores = $_REQUEST['proveedores_idproveedores'];
			$item->nro_tarjeta = $_REQUEST['nro_tarjeta'];
			$item->estado_tarjeta = $_REQUEST['estado_tarjeta'];
			$item->fecha_modificacion  = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->updateTarjeta($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteTarjeta($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>