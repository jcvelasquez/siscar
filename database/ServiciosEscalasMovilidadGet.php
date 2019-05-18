<?php

require_once('ServiciosEscalasMovilidadService.php'); 

$mv = new ServiciosEscalasMovilidadService(); 

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
			$mvObj = $mv->getAllServiciosEscalaMovilidad($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getServicioEscalaMovilidadByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->destino = $_REQUEST['destino']; 
			$item->monto = $_REQUEST['monto'];
			$item->estado_escala = $_REQUEST['estado_escala'];
			
		 	echo json_encode($mv->createServicioEscalaMovilidad($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idservicios_escala_movilidades = $_REQUEST['id'];
			$item->destino = $_REQUEST['destino']; 
			$item->monto = $_REQUEST['monto'];
			$item->estado_escala = $_REQUEST['estado_escala'];
			
		 	echo json_encode($mv->updateServicioEscalaMovilidad($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteServicioEscalaMovilidad($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>