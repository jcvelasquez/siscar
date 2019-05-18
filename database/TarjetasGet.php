<?php

require_once('TarjetasService.php'); 

$mv = new TarjetasService(); 

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
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllTarjetas($settings);
			echo json_encode($mvObj);

	}elseif($_REQUEST['action_type'] == 'tarjetas_x_vehiculo'){
		 
		 	$mvObj = new stdClass;
			$mvObj = $mv->getTarjetasByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 /*
			$mvObj = new stdClass;
			$mvObj = $mv->getMarcaVehiculoByID($_REQUEST['id']);
			echo json_encode($mvObj);*/
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 /*
		 	$item = new stdClass;
			$item->marca_vehiculo = $_REQUEST['marca_vehiculo'];
			$item->estado_marca = $_REQUEST['estado_marca'];
			
		 	echo json_encode($mv->createMarcaVehiculo($item));*/
		 
	 }elseif($_REQUEST['action_type'] == 'update'){
/*
	 		$item = new stdClass;
	 		$item->idmarcas_vehiculos = $_REQUEST['id'];
			$item->marca_vehiculo = $_REQUEST['marca_vehiculo'];
			$item->estado_marca = $_REQUEST['estado_marca'];
			
		 	echo json_encode($mv->updateMarcaVehiculo($item));*/
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	//echo json_encode($mv->deleteMarcaVehiculo($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>