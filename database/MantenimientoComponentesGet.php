<?php

require_once('MantenimientoComponentesService.php'); 

$mv = new MantenimientoComponentesService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['action_type'] = $_REQUEST['action_type'];

if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllMatenimientoComponentes($settings);
			echo json_encode($mvObj);
			
	 }elseif($_REQUEST['action_type'] == 'componentes_x_sistema'){
		 
		 	$mvObj = new stdClass;
			$settings['idmantenimiento_sistemas'] = $_REQUEST['id'];
			$mvObj = $mv->getMatenimientoComponentesBySistemasID($settings);
			echo json_encode($mvObj);
	
	 }elseif($_REQUEST['action_type'] == 'componentes_x_vehiculo'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoComponentesByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
				 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoComponenteByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->idmantenimiento_sistemas = $_REQUEST['idmantenimiento_sistemas']; 
			$item->cod_componente = $_REQUEST['cod_componente']; 
			$item->nombre_componente = $_REQUEST['nombre_componente']; 
			$item->estado_componente = $_REQUEST['estado_componente'];

		 	echo json_encode($mv->createMatenimientoComponente($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idmantenimiento_componentes = $_REQUEST['id'];
			$item->idmantenimiento_sistemas = $_REQUEST['idmantenimiento_sistemas']; 
			$item->cod_componente = $_REQUEST['cod_componente']; 
			$item->nombre_componente = $_REQUEST['nombre_componente']; 
			$item->estado_componente = $_REQUEST['estado_componente'];
			
		 	echo json_encode($mv->updateMatenimientoComponente($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMatenimientoComponente($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>