<?php

require_once('ProveedorService.php'); 

$mv = new ProveedorService(); 

$settings = array();
$settings['iTotalRecords'] = $mv->total();
$settings['iDisplayLength'] = 1000000000;
$settings['iDisplayStart'] = 0;
$settings['sEcho'] = 1000000000;

if(isset($_REQUEST["length"])) $settings['iDisplayLength'] = (intval($_REQUEST['length']) < 0)? $settings['iTotalRecords'] : intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['iDisplayStart'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['sEcho'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["customActionType"]) && $_REQUEST["customActionType"] == "group_action"){
	$settings["customActionStatus"] = "OK"; 
	$settings["customActionMessage"] = "Group action successfully has been completed. Well done!"; 
}

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllProveedores($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getProveedorByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->razon_social = $_REQUEST['razon_social'];
			$item->ruc_proveedor = $_REQUEST['ruc_proveedor'];
			$item->telefono_proveedor = $_REQUEST['telefono_proveedor'];
			$item->celular_proveedor = $_REQUEST['celular_proveedor'];
			$item->domicilio_fiscal = $_REQUEST['domicilio_fiscal'];
			$item->correo_electronico = $_REQUEST['correo_electronico'];
			$item->representante_legal = $_REQUEST['representante_legal'];
			$item->dni_representante_legal = $_REQUEST['dni_representante_legal'];
			$item->estado_proveedor = $_REQUEST['estado_proveedor'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createProveedor($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idproveedores = $_REQUEST['id'];
			$item->razon_social = $_REQUEST['razon_social'];
			$item->ruc_proveedor = $_REQUEST['ruc_proveedor'];
			$item->telefono_proveedor = $_REQUEST['telefono_proveedor'];
			$item->celular_proveedor = $_REQUEST['celular_proveedor'];
			$item->domicilio_fiscal = $_REQUEST['domicilio_fiscal'];
			$item->correo_electronico = $_REQUEST['correo_electronico'];
			$item->representante_legal = $_REQUEST['representante_legal'];
			$item->dni_representante_legal = $_REQUEST['dni_representante_legal'];
			$item->estado_proveedor = $_REQUEST['estado_proveedor'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->updateProveedor($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteProveedor($_REQUEST['id']));
		 
     }elseif($_REQUEST['action_type'] == 'validar_ruc'){
			
			$item = new stdClass;	
			$item->ruc = $_REQUEST['ruc'];	
		 	echo json_encode($mv->validarRuc($item));
		 
     }
	
    exit;
		 
}


  
?>