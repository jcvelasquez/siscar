<?php

require_once('TipoCombustibleService.php'); 

$mv = new TipoCombustibleService(); 

$settings = array();
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
			$mvObj = $mv->getAllTiposCombustibles($settings);
			echo json_encode($mvObj);
				
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getTipoCombustibleByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->tipo_combustible = $_REQUEST['tipo_combustible'];
			$item->estado_tipo_combustible = $_REQUEST['estado_tipo_combustible'];
			
		 	echo json_encode($mv->createTipoCombustible($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idtipo_combustible = $_REQUEST['id'];
			$item->tipo_combustible = $_REQUEST['tipo_combustible'];
			$item->estado_tipo_combustible = $_REQUEST['estado_tipo_combustible'];
			
		 	echo json_encode($mv->updateTipoCombustible($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteTipoCombustible($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>