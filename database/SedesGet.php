<?php

require_once('SedesService.php'); 

$mv = new SedesService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['columns'] = array();
$settings['order'] = array();
if(isset($_REQUEST["action_type"])) $settings['action_type'] = intval($_REQUEST['action_type']);	
if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];
if(isset($_REQUEST["columns"])) $settings['columns'] = $_REQUEST['columns'];
if(isset($_REQUEST["order"])) $settings['order'] = $_REQUEST['order'];


if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllSedes($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getSedeByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->empresas_idempresas = $_REQUEST['empresas_idempresas'];
			$item->nombre_sede = $_REQUEST['nombre_sede'];
			$item->direccion_uno = $_REQUEST['direccion_uno'];
			$item->telefono_sede = $_REQUEST['telefono_sede'];
			$item->celular_sede = $_REQUEST['celular_sede'];
			$item->correo_sede = $_REQUEST['correo_sede'];
			$item->coordenadas_sede = $_REQUEST['coordenadas_sede'];
			$item->estado_sede = $_REQUEST['estado_sede'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createSede($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idsedes = $_REQUEST['id'];
			$item->empresas_idempresas = $_REQUEST['empresas_idempresas'];
			$item->nombre_sede = $_REQUEST['nombre_sede'];
			$item->direccion_uno = $_REQUEST['direccion_uno'];
			$item->telefono_sede = $_REQUEST['telefono_sede'];
			$item->celular_sede = $_REQUEST['celular_sede'];
			$item->correo_sede = $_REQUEST['correo_sede'];
			$item->coordenadas_sede = $_REQUEST['coordenadas_sede'];
			$item->estado_sede = $_REQUEST['estado_sede'];  
			$item->fecha_modificacion = date("Y-m-d H:i:s"); 
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion']; 
			
		 	echo json_encode($mv->updateSede($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteSede($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>