<?php

require_once('SucursalService.php'); 

$mv = new SucursalService(); 

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
			$mvObj = $mv->getAllSucursales($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getSucursalesByID($_REQUEST['id']);
			echo json_encode($mvObj);
	 
	 }elseif($_REQUEST['action_type'] == 'sucursales_x_proveedor'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getSucursalesByProveedorID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->proveedores_idproveedores = $_REQUEST['proveedores_idproveedores'];
			$item->nombre_sucursal = $_REQUEST['nombre_sucursal'];
			$item->direccion_sucursal = $_REQUEST['direccion_sucursal'];
			$item->encargado_sucursal = $_REQUEST['encargado_sucursal'];
			$item->telefono_sucursal = $_REQUEST['telefono_sucursal'];
			$item->estado_sucursal = $_REQUEST['estado_sucursal'];

		 	echo json_encode($mv->createSucursal($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){
			
	 		$item = new stdClass;
			$item->idsucursales = $_REQUEST['id'];
			$item->proveedores_idproveedores = $_REQUEST['proveedores_idproveedores'];
			$item->nombre_sucursal = $_REQUEST['nombre_sucursal'];
			$item->direccion_sucursal = $_REQUEST['direccion_sucursal'];
			$item->encargado_sucursal = $_REQUEST['encargado_sucursal'];
			$item->telefono_sucursal = $_REQUEST['telefono_sucursal'];
			$item->estado_sucursal = $_REQUEST['estado_sucursal'];
			
		 	echo json_encode($mv->updateSucursal($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteSucursal($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>