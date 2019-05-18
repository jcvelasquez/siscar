<?php

require_once('AreasService.php'); 

$mv = new AreasService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['columns'] = array();
$settings['order'] = 0;
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
			$mvObj = $mv->getAllAreas($settings);
			echo json_encode($mvObj);
	 
	 }elseif($_REQUEST['action_type'] == 'areas_x_sedes'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getAreasBySedesID($_REQUEST['id']);
			echo json_encode($mvObj);
			
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getAreaByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;			
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes'];
			$item->nombre_area = $_REQUEST['nombre_area'];
			$item->prioridad_area = "";
			$item->estado_area = $_REQUEST['estado_area'];
			
		 	echo json_encode($mv->createArea($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idareas = $_REQUEST['id'];
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes'];
			$item->nombre_area = $_REQUEST['nombre_area'];
			$item->prioridad_area = "";
			$item->estado_area = $_REQUEST['estado_area'];
			
		 	echo json_encode($mv->updateArea($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteArea($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>