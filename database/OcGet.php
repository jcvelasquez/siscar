<?php

require_once('OcService.php'); 

$mv = new OcService(); 

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
						
			if(!empty($_REQUEST['sedes_idsedes'])){
				$settings['sedes_idsedes'] = $_REQUEST['sedes_idsedes'];
			}else{
				$settings['sedes_idsedes'] = "";	
			}
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllOC($settings);
			echo json_encode($mvObj);
		
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getOCByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;			
			$item->contratos_idcontratos = (empty($_REQUEST['contratos_idcontratos']) || $_REQUEST['contratos_idcontratos'] == "")? NULL : $_REQUEST['contratos_idcontratos'];
			$item->sedes_idsedes = (empty($_REQUEST['sedes_idsedes']) || $_REQUEST['sedes_idsedes'] == "")? $_REQUEST['idsedes'] : $_REQUEST['sedes_idsedes'];
			$item->proveedores_idproveedores = (empty($_REQUEST['proveedores_idproveedores']) || $_REQUEST['proveedores_idproveedores'] == "")? $_REQUEST['idproveedores'] : $_REQUEST['proveedores_idproveedores'];
			
			$item->tiene_contrato = (empty($_REQUEST['tiene_contrato']) || $_REQUEST['tiene_contrato'] == "")? 0 : $_REQUEST['tiene_contrato'];
			$item->nro_orden_compra = $_REQUEST['nro_orden_compra'];
			$item->monto_orden_compra = $_REQUEST['monto_orden_compra'];
			$item->descripcion_orden_compra = $_REQUEST['descripcion_orden_compra'];
			
			$fecha_orden_compra = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_orden_compra']);
			$item->fecha_orden_compra = $fecha_orden_compra->format('Y-m-d');
			
			$item->estado_orden_compra = 1;
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
						
		 	echo json_encode($mv->createOC($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idordenes_compra = $_REQUEST['id'];
			$item->contratos_idcontratos = $_REQUEST['contratos_idcontratos'];
			$item->nro_orden_compra = $_REQUEST['nro_orden_compra'];
			$item->monto_orden_compra = $_REQUEST['monto_orden_compra'];
			$item->descripcion_orden_compra = $_REQUEST['descripcion_orden_compra'];
			
			$fecha_orden_compra = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_orden_compra']);
			$item->fecha_orden_compra = $fecha_orden_compra->format('Y-m-d');
			
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateOC($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteOC($_REQUEST['id']));

	}elseif($_REQUEST['action_type'] == 'delete_adjunto_ordencompra'){
			
		 	echo json_encode($mv->deleteAdjuntoOrdenCompra($_REQUEST['id']));
	
	
	}elseif($_REQUEST['action_type'] == 'oc_x_contrato'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getOrdenesCompraByContratoID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'oc_x_sede'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getOrdenesCompraBySedeID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'items_x_oc'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getOrdenesCompraItemsByIDOrdenCompra($_REQUEST['idOrdenCompra'], $_REQUEST['tiene_contrato']);
			echo json_encode($mvObj);

	}elseif($_REQUEST['action_type'] == 'total_mensual_oc_x_sede'){ //ESTA CONSULTA VA PARA EL REPORTE GENERADO EN HTML
			
			$mvObj = new stdClass;
			$mvObj = $mv->getTotalMensualOrdenesCompraByIDSedes($idsede, $mes, $anno);
			echo json_encode($mvObj);
			
	}elseif($_REQUEST['action_type'] == 'adjuntos_x_ordencompra'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAdjuntosOrdenCompraByIDordenCompra($_REQUEST['id']);
			echo json_encode($mvObj);
				
	}elseif($_REQUEST['action_type'] == 'create_items_x_oc'){
			
			$item = new stdClass;			
			$item->idordenes_compra = $_REQUEST['idordenes_compra'];
			$item->tiene_contrato = $_REQUEST['tiene_contrato'];
			
			if($item->tiene_contrato == "SI"){
				$item->idtipo_combustible = NULL;
				$item->id_item_adjudicados = $_REQUEST['id_item_adjudicados'];	
			}else{
				$item->idtipo_combustible = $_REQUEST['idtipo_combustible'];
				$item->id_item_adjudicados = NULL;	
			}
			
			$item->estado_item_oc = $_REQUEST['estado_item_oc'];
						
		 	echo json_encode($mv->createItemXordenCompra($item));
			
	}elseif($_REQUEST['action_type'] == 'update_items_x_oc'){
			
			$item = new stdClass;			
			$item->idordenes_compra_item = $_REQUEST['idordenes_compra_item'];
			
			$item->idmedida_combustible = $_REQUEST['idmedida_combustible'];
			
			$item->cantidad_item = $_REQUEST['cantidad_item'];
			$item->precio_unitario_item = $_REQUEST['precio_unitario_item'];
			$item->importe_total_item = $_REQUEST['importe_total_item'];
			
			$periodo_desde = DateTime::createFromFormat('d/m/Y', $_REQUEST['periodo_desde']);
			$item->periodo_desde = $periodo_desde->format('Y-m-d');
			
			$periodo_hasta = DateTime::createFromFormat('d/m/Y', $_REQUEST['periodo_hasta']);
			$item->periodo_hasta = $periodo_hasta->format('Y-m-d');
						
			$item->descripcion_item_oc = $_REQUEST['descripcion_item_oc'];
		
		 	echo json_encode($mv->updateItemXordenCompra($item));
			
	}elseif($_REQUEST['action_type'] == 'delete_items_x_oc'){
			
		 	echo json_encode($mv->deleteItemXordenCompra($_REQUEST['id']));
				
	} else if($_REQUEST['action_type'] == 'get_oc_sigap'){
		
			if(isset($_REQUEST['nro_orden_compra']) && !empty($_REQUEST['nro_orden_compra'])  ){
	
				$settings = array();
				$settings['nro_orden_compra'] = $_REQUEST['nro_orden_compra'];	
				
				$mvObj = new stdClass;
				$mvObj = $mv->getOcSigap($settings);
				echo json_encode($mvObj);
				
			}else{
				echo json_encode( array("authorize" => false, "mensaje" => "Se requiere un # Orden para mostrar un resultado" ) );
				exit;	
			}
	
	}

	
    exit;
		 
}


  
?>