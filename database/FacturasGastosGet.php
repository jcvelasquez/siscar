<?php

require_once('FacturasGastosService.php'); 

$mv = new FacturasGastosService(); 

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
			$mvObj = $mv->getAllFacturasCombustible($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getFacturaCombustibleByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->idvehiculos = $_REQUEST['idvehiculos'];
			$item->idtipo_combustible = $_REQUEST['idtipo_combustible']; 
			$item->chofer_idchofer = $_REQUEST['chofer_idchofer']; 
			$item->nro_factura = $_REQUEST['nro_factura']; 
			$item->ruc_factura = $_REQUEST['ruc_factura']; 
			$fecha_factura = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_factura']);
			$item->fecha_factura = $fecha_factura->format('Y-m-d');
			$item->nombre_proveedor = $_REQUEST['nombre_proveedor']; 
			$item->direccion_proveedor = $_REQUEST['direccion_proveedor']; 
			$item->kilometraje_factura = $_REQUEST['kilometraje_factura']; 
			$item->nro_meta = $_REQUEST['nro_meta'];
			$item->cantidad_combustible = $_REQUEST['cantidad_combustible']; 
			$item->precio_unitario_combustible = $_REQUEST['precio_unitario_combustible']; 
			$item->importe_total_combustible = $_REQUEST['importe_total_combustible'];
			$item->es_tanque_lleno = $_REQUEST['es_tanque_lleno'];
			$item->estado_factura_combustible = 1;
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createFacturaCombustible($item));
		
	 }elseif($_REQUEST['action_type'] == 'update'){
		 
			$item = new stdClass;
			$item->idfacturas_combustible = $_REQUEST['id'];
			$item->idvehiculos = $_REQUEST['idvehiculos'];
			$item->chofer_idchofer = $_REQUEST['chofer_idchofer']; 
			$item->idtipo_combustible = $_REQUEST['idtipo_combustible']; 
			$item->nro_factura = $_REQUEST['nro_factura']; 
			$item->ruc_factura = $_REQUEST['ruc_factura']; 
			$fecha_factura = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_factura']);
			$item->fecha_factura = $fecha_factura->format('Y-m-d');
			$item->nombre_proveedor = $_REQUEST['nombre_proveedor']; 
			$item->direccion_proveedor = $_REQUEST['direccion_proveedor']; 
			$item->kilometraje_factura = $_REQUEST['kilometraje_factura']; 
			$item->nro_meta = $_REQUEST['nro_meta'];
			$item->cantidad_combustible = $_REQUEST['cantidad_combustible']; 
			$item->precio_unitario_combustible = $_REQUEST['precio_unitario_combustible']; 
			$item->importe_total_combustible = $_REQUEST['importe_total_combustible'];
			$item->es_tanque_lleno = $_REQUEST['es_tanque_lleno'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->updateFacturaCombustible($item));
		
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteFacturaCombustible($_REQUEST['id']));
	
		 }elseif($_REQUEST['action_type'] == 'validar_ruc'){
			
			$item = new stdClass;	
			$item->ruc = $_REQUEST['ruc'];	
		 	echo json_encode($mv->validarRuc($item));
		 
     }
	
    exit;
		 
}


  
?>