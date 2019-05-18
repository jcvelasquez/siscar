<?php

require_once('TipoIdentificacionService.php'); 

$mv = new TipoIdentificacionService(); 

$settings = array();
$settings['iTotalRecords'] = $mv->total();
$settings['iDisplayLength'] = 1000000000;
$settings['iDisplayStart'] = 0;
$settings['sEcho'] = 1000000000;

if(isset($_REQUEST["length"])) $settings['iDisplayLength'] = (intval($_REQUEST['length']) < 0)? $settings['iTotalRecords'] : intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['iDisplayStart'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['sEcho'] = intval($_REQUEST['draw']);

/*
if(isset($_REQUEST["customActionType"]) && $_REQUEST["customActionType"] == "group_action"){
	$settings["customActionStatus"] = "OK"; 
	$settings["customActionMessage"] = "Group action successfully has been completed. Well done!"; 
}*/

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllTiposIdentificaciones($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getTipoIdentificacionByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->tipo_identificacion = $_REQUEST['tipo_identificacion'];
			$item->estado_tipo_identificacion = $_REQUEST['estado_tipo_identificacion'];

		 	echo json_encode($mv->createTipoIdentificacion($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idtipo_identificacion = $_REQUEST['id'];
			$item->tipo_identificacion = $_REQUEST['tipo_identificacion'];
			$item->estado_tipo_identificacion = $_REQUEST['estado_tipo_identificacion'];
			
		 	echo json_encode($mv->updateTipoIdentificacion($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteTipoIdentificacion($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>