<?php

require_once('UsuariosService.php'); 

$mv = new UsuariosService(); 

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
			$mvObj = $mv->getAllUsuarios($settings);
			echo json_encode($mvObj);

	}elseif($_REQUEST['action_type'] == 'usuarios_sigap'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getAllUsuariosSIGAP($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getUsuarioByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->nombres = $_REQUEST['nombres'];
			$item->apellidos = $_REQUEST['apellidos'];
			$item->sexo = $_REQUEST['sexo'];
			$item->direccion_uno = $_REQUEST['direccion_uno'];
			$item->email = $_REQUEST['email'];
			$item->telefono = $_REQUEST['telefono'];
			$item->idtipo_identificacion = $_REQUEST['idtipo_identificacion'];
			$item->nro_identificacion = $_REQUEST['nro_identificacion']; 
			$item->roles_idroles = $_REQUEST['roles_idroles']; 
			$item->estado_usuario = $_REQUEST['estado_usuario']; 
			$item->idtipo_licencia = $_REQUEST['idtipo_licencia'];
			$item->areas_idareas = $_REQUEST['areas_idareas'];
			$item->nro_licencia = $_REQUEST['nro_licencia'];
			$item->codigo = $_REQUEST['codigo'];
			$item->usuario = $_REQUEST['usuario'];
			$item->clave = "";
			$item->prioridad = $_REQUEST['prioridad'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
		
		 	echo json_encode($mv->createUsuario($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

			$item = new stdClass;
			$item->idusuarios = $_REQUEST['id'];
			$item->nombres = $_REQUEST['nombres'];
			$item->apellidos = $_REQUEST['apellidos'];
			$item->sexo = $_REQUEST['sexo'];
			$item->direccion_uno = $_REQUEST['direccion_uno'];
			$item->email = $_REQUEST['email'];
			$item->telefono = $_REQUEST['telefono'];
			$item->idtipo_identificacion = $_REQUEST['idtipo_identificacion'];
			$item->nro_identificacion = $_REQUEST['nro_identificacion']; 
			$item->areas_idareas = $_REQUEST['areas_idareas'];
			$item->roles_idroles = $_REQUEST['roles_idroles']; 
			$item->estado_usuario = $_REQUEST['estado_usuario']; 
			$item->idtipo_licencia = $_REQUEST['idtipo_licencia'];
			$item->nro_licencia = $_REQUEST['nro_licencia'];
			$item->codigo = $_REQUEST['codigo'];
			$item->clave = "";
			$item->prioridad = $_REQUEST['prioridad'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateUsuario($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteUsuario($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'validar_usuario'){
			
			$item = new stdClass;	
			$item->idItem = $_REQUEST['idItem'];	
			$item->usuario = $_REQUEST['usuario'];	
		 	echo json_encode($mv->validarUsuario($item));
		 
    }
	
	
    exit;
		 
}


  
?>