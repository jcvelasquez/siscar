<?php

require_once('ContratosService.php'); 

$mv = new ContratosService(); 

$settings = array();
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
			$mvObj = $mv->getAllContratos($settings);
			echo json_encode($mvObj);

	}elseif($_REQUEST['action_type'] == 'search'){
		
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
			
			$settings['sedes_idsedes'] = $_REQUEST['sedes_idsedes'];
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAllContratosBySearch($settings);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getContratoByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios'];
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes']; 
			$item->proveedores_idproveedores = $_REQUEST['proveedores_idproveedores']; 
			$item->nombre_contrato = $_REQUEST['nombre_contrato'];
			$item->nro_contrato = $_REQUEST['nro_contrato'];
			$item->monto_contrato = $_REQUEST['monto_contrato']; 
			
			$fecha_contrato = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_contrato']);
			$item->fecha_contrato = $fecha_contrato->format('Y-m-d');
			
			$plazo_desde = DateTime::createFromFormat('d/m/Y', $_REQUEST['plazo_desde']);
			$item->plazo_desde = $plazo_desde->format('Y-m-d');
			
			$plazo_hasta = DateTime::createFromFormat('d/m/Y', $_REQUEST['plazo_hasta']);
			$item->plazo_hasta = $plazo_hasta->format('Y-m-d');
			
			$item->estado_contrato = 1;
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createContrato($item));
		 
	}elseif($_REQUEST['action_type'] == 'create_items_adjudicados'){ 
		 
			$item = new stdClass;
			$date = new DateTime();
			
			$item->contratos_idcontratos = $_REQUEST['contratos_idcontratos'];
			$item->idmedida_combustible = $_REQUEST['idmedida_combustible'];
			$item->idtipo_combustible = $_REQUEST['idtipo_combustible'];
			$item->cantidad = $_REQUEST['cantidad'];
			$item->precio_unitario = $_REQUEST['precio_unitario'];
			$item->precio_total = $_REQUEST['precio_total'];
			$item->ficha_tecnica = $_REQUEST['ficha_tecnica'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

			echo json_encode($mv->createContratoItemAdjudicados($item));
		
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
	 		$item->idcontratos = $_REQUEST['id'];
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios'];
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes']; 
			$item->proveedores_idproveedores = $_REQUEST['proveedores_idproveedores']; 
			$item->nombre_contrato = $_REQUEST['nombre_contrato'];
			$item->nro_contrato = $_REQUEST['nro_contrato'];
			$item->monto_contrato = $_REQUEST['monto_contrato'];
			
			
			$fecha_contrato = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_contrato']);
			$item->fecha_contrato = $fecha_contrato->format('Y-m-d');
			
			$plazo_desde = DateTime::createFromFormat('d/m/Y', $_REQUEST['plazo_desde']);
			$item->plazo_desde = $plazo_desde->format('Y-m-d');
			
			$plazo_hasta = DateTime::createFromFormat('d/m/Y', $_REQUEST['plazo_hasta']);
			$item->plazo_hasta = $plazo_hasta->format('Y-m-d');
			 
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateContrato($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteContrato($_REQUEST['id']));
	
	 }elseif($_REQUEST['action_type'] == 'delete_item_contrato'){
			
		 	echo json_encode($mv->deleteItemContrato($_REQUEST['id']));
	
	}elseif($_REQUEST['action_type'] == 'delete_adjunto_contrato'){
			
		 	echo json_encode($mv->deleteAdjuntoContrato($_REQUEST['id']));
				 
    }elseif($_REQUEST['action_type'] == 'validate'){
			
			echo json_encode($mv->validateContrato($_REQUEST['nro_contrato']));
	
	}elseif($_REQUEST['action_type'] == 'list_items_contrato'){
			
			echo json_encode($mv->getItemAdjudicadosByContratoID($_REQUEST['id']));
	
	}elseif($_REQUEST['action_type'] == 'proveedor_x_contrato'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getProveedorByIDContrato($_REQUEST['id']);
			echo json_encode($mvObj);
			
	}elseif($_REQUEST['action_type'] == 'adjuntos_x_contrato'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAdjuntosContratosByIDContrato($_REQUEST['id']);
			echo json_encode($mvObj);
			
	}elseif($_REQUEST['action_type'] == 'avance_contrato'){
			
			$mvObj = new stdClass;
			
			$settings["idContrato"] = $_REQUEST['idContrato'];
			$mvObj = $mv->getAvanceContrato($settings);
			echo json_encode($mvObj);
			
	}
	
	
	
	
    exit;
		 
}


  
?>