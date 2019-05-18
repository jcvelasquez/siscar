<?php

require_once('ModelosVehiculosService.php'); 

$mv = new ModelosVehiculosService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = 0;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['action_type'] = $_REQUEST['action_type'];

if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];

//PARA OCULTAR LOS ESTADOS DESACTIVADOS
$settings['estado'] = (isset($_REQUEST["estado"]))? $_REQUEST['estado'] : "-1";

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllModelosVehiculos($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getModeloVehiculoByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		
	 }elseif($_REQUEST['action_type'] == 'modelos_x_marca'){
		 
		 	$settings['id'] = $_REQUEST['id'];
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getModelosByMarcaID($settings);
			echo json_encode($mvObj);
 
 	}elseif($_REQUEST['action_type'] == 'list_modelos_x_servicios'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getModelosXservicioID($_REQUEST['id']);
			echo json_encode($mvObj);
 	 
	 
	 }elseif($_REQUEST['action_type'] == 'create_modelos_x_servicios'){
		 
			$item = new stdClass;
			$item->idmantenimiento_servicios = $_REQUEST['idmantenimiento_servicios'];
			$item->idmodelos_vehiculos = $_REQUEST['idmodelos_vehiculos'];
			$item->estado_modelo_x_servicio = $_REQUEST['estado_modelo_x_servicio'];
			
		 	echo json_encode($mv->createModeloXservicio($item));
	 
	 
 	}elseif($_REQUEST['action_type'] == 'delete_modelos_x_servicios'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->deleteModelosXservicio($_REQUEST['id']);
			echo json_encode($mvObj);
 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->idmarcas_vehiculos = $_REQUEST['idmarcas_vehiculos'];
			$item->modelo_vehiculo = $_REQUEST['modelo_vehiculo'];
			$item->estado_modelo = $_REQUEST['estado_modelo'];
			
		 	echo json_encode($mv->createModeloVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idmodelos_vehiculos = $_REQUEST['id'];
			$item->idmarcas_vehiculos = $_REQUEST['idmarcas_vehiculos'];
			$item->modelo_vehiculo = $_REQUEST['modelo_vehiculo'];
			$item->estado_modelo = $_REQUEST['estado_modelo'];
			
		 	echo json_encode($mv->updateModeloVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteModeloVehiculo($_REQUEST['id']));
		 
     }
	 
	 
	 
	
     exit;
		 
}


  
?>