<?php

require_once('TipoVehiculoService.php'); 

$mv = new TipoVehiculoService(); 

$settings = array();
$settings['iTotalRecords'] = $mv->total();
$settings['iDisplayLength'] = 1000000000;
$settings['iDisplayStart'] = 0;
$settings['sEcho'] = 1000000000;

if(isset($_REQUEST["length"])) $settings['iDisplayLength'] = (intval($_REQUEST['length']) < 0)? $settings['iTotalRecords'] : intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['iDisplayStart'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['sEcho'] = intval($_REQUEST['draw']);

//PARA OCULTAR LOS ESTADOS DESACTIVADOS
$settings['estado'] = (isset($_REQUEST["estado"]))? $_REQUEST['estado'] : "-1";

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllTiposVehiculos($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getTipoVehiculoByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->tipo_vehiculo = $_REQUEST['tipo_vehiculo'];
			$item->estado_tipo = $_REQUEST['estado_tipo'];
			
		 	echo json_encode($mv->createTipoVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idtipos_vehiculo = $_REQUEST['id'];
			$item->tipo_vehiculo = $_REQUEST['tipo_vehiculo'];
			$item->estado_tipo = $_REQUEST['estado_tipo'];
			
		 	echo json_encode($mv->updateTipoVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteTipoVehiculo($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>