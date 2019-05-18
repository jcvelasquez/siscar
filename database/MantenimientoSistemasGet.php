<?php

require_once('MantenimientoSistemasService.php'); 

$mv = new MantenimientoSistemasService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = 0;
$settings['draw'] = 0;
$settings['search'] = array();

if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];

if(isset($_REQUEST["customActionType"]) && $_REQUEST["customActionType"] == "group_action"){
	$settings["customActionStatus"] = "OK"; 
	$settings["customActionMessage"] = "Group action successfully has been completed. Well done!"; 
}

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllMatenimientoSistemas($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMantenimientoSistemaByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->cod_sistema = $_REQUEST['cod_sistema'];
			$item->nombre_sistema = $_REQUEST['nombre_sistema'];
			$item->estado_sistema = $_REQUEST['estado_sistema'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createMantenimientoSistema($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

			$item = new stdClass;
			$item->idmantenimiento_sistemas = $_REQUEST['id'];
			$item->cod_sistema = $_REQUEST['cod_sistema'];
			$item->nombre_sistema = $_REQUEST['nombre_sistema'];
			$item->estado_sistema = $_REQUEST['estado_sistema'];
			$item->fecha_modificacion = date("Y-m-d H:i:s"); 
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion']; 
			
		 	echo json_encode($mv->updateMantenimientoSistema($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMantenimientoSistema($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>