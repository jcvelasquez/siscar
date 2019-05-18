<?php

require_once('MantenimientoTiposServiciosService.php'); 

$mv = new MantenimientoTiposServiciosService(); 

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
			$mvObj = $mv->getAllMatenimientoTiposServicios($settings);
			echo json_encode($mvObj);
			
	 }elseif($_REQUEST['action_type'] == 'servicios_x_sistema'){
		 
		 	$mvObj = new stdClass;
			$settings['idmantenimiento_sistemas'] = $_REQUEST['id'];
			$mvObj = $mv->getMatenimientoServicioBySistemasID($settings);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoServicioByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->idmantenimiento_sistemas = $_REQUEST['idmantenimiento_sistemas'];
			$item->idmantenimiento_tipos_servicios = $_REQUEST['idmantenimiento_tipos_servicios'];
			$item->cod_servicio = $_REQUEST['cod_servicio'];
			$item->nombre_servicio = $_REQUEST['nombre_servicio']; 
			$item->descripcion_servicio = $_REQUEST['descripcion_servicio'];
			$item->estado_servicio = $_REQUEST['estado_servicio'];
			
		 	echo json_encode($mv->createMatenimientoServicio($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idmantenimiento_servicios = $_REQUEST['id'];
			$item->idmantenimiento_sistemas = $_REQUEST['idmantenimiento_sistemas'];
			$item->idmantenimiento_tipos_servicios = $_REQUEST['idmantenimiento_tipos_servicios'];
			$item->cod_servicio = $_REQUEST['cod_servicio'];
			$item->nombre_servicio = $_REQUEST['nombre_servicio']; 
			$item->descripcion_servicio = $_REQUEST['descripcion_servicio'];
			$item->estado_servicio = $_REQUEST['estado_servicio'];
			
		 	echo json_encode($mv->updateMatenimientoServicio($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMatenimientoServicio($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>