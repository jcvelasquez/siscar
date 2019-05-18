<?php

require_once('FacturasService.php'); 

$mv = new FacturasService(); 

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
		
			if(!empty($_REQUEST['desde'])){
				$desde = DateTime::createFromFormat('d/m/Y', $_REQUEST['desde']);
				$settings['desde'] = $desde->format('Y-m-d');
			}else{
				$settings['desde'] = "";	
			}
			
			if(!empty($_REQUEST['hasta'])){
				$hasta = DateTime::createFromFormat('d/m/Y', $_REQUEST['hasta']);
				$settings['hasta'] = $hasta->format('Y-m-d');
			}else{
				$settings['hasta'] = "";	
			}
			
			if(!empty($_REQUEST['idordenes_compra'])){
				$settings['idordenes_compra'] = $_REQUEST['idordenes_compra'];
			}else{
				$settings['idordenes_compra'] = "";	
			}
			
			if(!empty($_REQUEST['sedes_idsedes'])){
				$settings['sedes_idsedes'] = $_REQUEST['sedes_idsedes'];
			}else{
				$settings['sedes_idsedes'] = "";	
			}
			
			if(!empty($_REQUEST['idproveedores'])){
				$settings['idproveedores'] = $_REQUEST['idproveedores'];
			}else{
				$settings['idproveedores'] = "";	
			}
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAllFacturas($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getFacturaByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->ordenes_compra_idordenes_compra = $_REQUEST['ordenes_compra_idordenes_compra'];
			$item->descrip_factura = $_REQUEST['descrip_factura'];
			$fecha_factura = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_factura']);
			$item->fecha_factura = $fecha_factura->format('Y-m-d');
			$item->nro_factura = $_REQUEST['nro_factura'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createFactura($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idfacturas = $_REQUEST['id'];
			$item->ordenes_compra_idordenes_compra = $_REQUEST['ordenes_compra_idordenes_compra'];
			$item->descrip_factura = $_REQUEST['descrip_factura'];
			$fecha_factura = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_factura']);
			$item->fecha_factura = $fecha_factura->format('Y-m-d');
			$item->nro_factura = $_REQUEST['nro_factura'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateFactura($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteFactura($_REQUEST['id']));
	
	}elseif($_REQUEST['action_type'] == 'delete_adjunto_factura'){
			
		 	echo json_encode($mv->deleteAdjuntoFactura($_REQUEST['id']));
			
    }elseif($_REQUEST['action_type'] == 'facturas_x_orden_compra'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getFacturasByOrdenCompraID($_REQUEST['id']);
			echo json_encode($mvObj);

	}elseif($_REQUEST['action_type'] == 'facturas_x_sede'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getFacturasBySedeID($_REQUEST['id']);
			echo json_encode($mvObj);
			
    }elseif($_REQUEST['action_type'] == 'adjuntos_x_factura'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAdjuntosFacturaByIDFactura($_REQUEST['id']);
			echo json_encode($mvObj);
			
	}
	
    exit;
		 
}


  
?>