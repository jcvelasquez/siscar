<?php

require_once('RolesService.php'); 

$mv = new RolesService(); 

$settings = array();
$settings['iTotalRecords'] = $mv->total();
$settings['iDisplayLength'] = 1000000000;
$settings['iDisplayStart'] = 0;
$settings['sEcho'] = 1000000000;

if(isset($_REQUEST["length"])) $settings['iDisplayLength'] = (intval($_REQUEST['length']) < 0)? $settings['iTotalRecords'] : intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['iDisplayStart'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['sEcho'] = intval($_REQUEST['draw']);


if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllRoles($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getRolByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->nombre_rol = $_REQUEST['nombre_rol'];
			$item->descripcion_rol = $_REQUEST['descripcion_rol'];
			$item->cod_rol = $_REQUEST['cod_rol'];
			$item->estado_rol = $_REQUEST['estado_rol'];
			
		 	echo json_encode($mv->createRol($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idroles = $_REQUEST['id'];
			$item->nombre_rol = $_REQUEST['nombre_rol'];
			$item->descripcion_rol = $_REQUEST['descripcion_rol'];
			$item->cod_rol = $_REQUEST['cod_rol'];
			$item->estado_rol = $_REQUEST['estado_rol'];
			
		 	echo json_encode($mv->updateRol($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteRol($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>