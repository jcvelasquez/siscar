<?php

require_once('ValesService.php'); 

$mv = new ValesService(); 

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
			$mvObj = $mv->getAllVales($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getValeByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->idservicio_solicitud = $_REQUEST['idservicio_solicitud'];
			$item->idservicios_escala_movilidades = $_REQUEST['idservicios_escala_movilidades'];
			$item->concepto_vale = $_REQUEST['concepto_vale'];
			$item->nro_meta = $_REQUEST['nro_meta'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
		
		 	echo json_encode($mv->createVale($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

			$item = new stdClass;
			$item->idservicios_vales = $_REQUEST['id'];
			$item->idservicio_solicitud = $_REQUEST['idservicio_solicitud'];
			$item->idservicios_escala_movilidades = $_REQUEST['idservicios_escala_movilidades'];
			$item->concepto_vale = $_REQUEST['concepto_vale'];
			$item->nro_meta = $_REQUEST['nro_meta'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateVale($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteVale($_REQUEST['id']));
		 
     }
	
    exit;
		 
}


  
?>