<?php

require_once('ChoferesService.php'); 

$mv = new ChoferesService(); 

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

//PARA OCULTAR LOS ESTADOS DESACTIVADOS
$settings['estado'] = (isset($_REQUEST["estado"]))? $_REQUEST['estado'] : "-1";

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllChoferes($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getChoferByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes']; 
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos']; 
			$item->nombres_chofer = $_REQUEST['nombres_chofer']; 
			$item->apellidos_chofer = $_REQUEST['apellidos_chofer']; 
			$item->idtipo_identificacion = $_REQUEST['idtipo_identificacion'];
			$item->nro_identificacion = $_REQUEST['nro_identificacion']; 
			$item->idtipo_licencia = $_REQUEST['idtipo_licencia']; 
			$item->nro_licencia = $_REQUEST['nro_licencia']; 
			$item->email_chofer = $_REQUEST['email_chofer']; 
			$item->usuario_chofer = $_REQUEST['usuario_chofer']; 
			$item->clave_chofer = $_REQUEST['clave_chofer']; 
			$item->foto_chofer = ""; //$_REQUEST['foto_chofer']; 
			$item->estado_chofer = $_REQUEST['estado_chofer']; 			
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createChofer($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idchofer = $_REQUEST['id']; 
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes']; 
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos']; 
			$item->nombres_chofer = $_REQUEST['nombres_chofer']; 
			$item->apellidos_chofer = $_REQUEST['apellidos_chofer']; 
			$item->idtipo_identificacion = $_REQUEST['idtipo_identificacion'];
			$item->nro_identificacion = $_REQUEST['nro_identificacion']; 
			$item->idtipo_licencia = $_REQUEST['idtipo_licencia']; 
			$item->nro_licencia = $_REQUEST['nro_licencia']; 
			$item->email_chofer = $_REQUEST['email_chofer']; 
			$item->usuario_chofer = $_REQUEST['usuario_chofer']; 
			$item->clave_chofer = $_REQUEST['clave_chofer']; 
			$item->foto_chofer = ""; //$_REQUEST['foto_chofer']; 
			$item->estado_chofer = $_REQUEST['estado_chofer']; 			
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateChofer($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteChofer($_REQUEST['id']));
		 
     }elseif($_REQUEST['action_type'] == 'validar_chofer'){
			
			$item = new stdClass;	
			$item->idItem = $_REQUEST['idItem'];	
			$item->usuario_chofer = $_REQUEST['usuario_chofer'];	
		 	echo json_encode($mv->validarChofer($item));
		 
     }elseif($_REQUEST['action_type'] == 'datos_sigap'){
			
			$item = new stdClass;	
		 	echo json_encode($mv->getDatosChoferByUserSIGAP($_REQUEST['usuario_chofer']));
		 
     }
	 
	 
	 
	
    exit;
		 
}


  
?>