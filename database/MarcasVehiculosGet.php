<?php

require_once('MarcasVehiculosService.php'); 

$mv = new MarcasVehiculosService(); 

$settings = array();
$settings['iTotalRecords'] = $mv->total();
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
			$mvObj = $mv->getAllMarcasVehiculos($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMarcaVehiculoByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->marca_vehiculo = $_REQUEST['marca_vehiculo'];
			$item->estado_marca = $_REQUEST['estado_marca'];
			
		 	echo json_encode($mv->createMarcaVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idmarcas_vehiculos = $_REQUEST['id'];
			$item->marca_vehiculo = $_REQUEST['marca_vehiculo'];
			$item->estado_marca = $_REQUEST['estado_marca'];
			
		 	echo json_encode($mv->updateMarcaVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMarcaVehiculo($_REQUEST['id']));
		 
     }
	
	
	
     exit;
		 
}


  
?>