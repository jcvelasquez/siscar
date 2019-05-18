<?php

require_once('TalleresService.php'); 

$mv = new TalleresService(); 

$settings = array();
$settings['iTotalRecords'] = $mv->total();
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
			$mvObj = $mv->getAllTalleres($settings);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getTallerByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){

			$item = new stdClass;
			$item->nombre_taller = $_REQUEST['nombre_taller'];
			$item->descripcion_taller = $_REQUEST['descripcion_taller'];
			$item->direccion_taller = $_REQUEST['direccion_taller'];
			$item->telefono_taller = $_REQUEST['telefono_taller'];
			$item->email_taller = (empty($_REQUEST['email_taller']) || $_REQUEST['email_taller'] == "")? NULL : $_REQUEST['email_taller'];
			$item->ruc_taller = $_REQUEST['ruc_taller'];
			$item->estado_taller = $_REQUEST['estado_taller'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createTaller($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idtalleres = $_REQUEST['id'];
			$item->nombre_taller = $_REQUEST['nombre_taller'];
			$item->descripcion_taller = $_REQUEST['descripcion_taller'];
			$item->direccion_taller = $_REQUEST['direccion_taller'];
			$item->telefono_taller = $_REQUEST['telefono_taller'];
			$item->email_taller = (empty($_REQUEST['email_taller']) || $_REQUEST['email_taller'] == "")? NULL : $_REQUEST['email_taller'];
			$item->ruc_taller = $_REQUEST['ruc_taller'];
			$item->estado_taller = $_REQUEST['estado_taller'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateTaller($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteTaller($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>