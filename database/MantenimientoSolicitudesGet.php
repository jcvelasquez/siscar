<?php

require_once('MantenimientoSolicitudesService.php'); 

$mv = new MantenimientoSolicitudesService(); 

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
			
			if(!empty($_REQUEST['idvehiculos'])){
				$settings['idvehiculos'] = $_REQUEST['idvehiculos'];
			}else{
				$settings['idvehiculos'] = "";	
			}
			
			if(!empty($_REQUEST['sedes_idsedes'])){
				$settings['sedes_idsedes'] = $_REQUEST['sedes_idsedes'];
			}else{
				$settings['sedes_idsedes'] = "";	
			}
			
			if(!empty($_REQUEST['idchofer'])){
				$settings['idchofer'] = $_REQUEST['idchofer'];
			}else{
				$settings['idchofer'] = "";	
			}
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllMatenimientoSolicitudes($settings);
			echo json_encode($mvObj);
			
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoSolicitudByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos']; 
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios']; 
			
			$fecha_solicitud = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_solicitud']);
			$item->fecha_solicitud = $fecha_solicitud->format('Y-m-d');
			$item->descripcion_solicitud = $_REQUEST['descripcion_solicitud']; 
			$item->is_aprobado_solicitud = (empty($_REQUEST['is_aprobado_solicitud']) || $_REQUEST['is_aprobado_solicitud'] == "")? 0 : $_REQUEST['is_aprobado_solicitud']; 
			$item->estado_solicitud = $_REQUEST['estado_solicitud']; 
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createMatenimientoSolicitud($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idmantenimiento_solicitudes = $_REQUEST['id']; 
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos']; 
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios']; 
			$fecha_solicitud = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_solicitud']);
			$item->fecha_solicitud = $fecha_solicitud->format('Y-m-d');
			$item->descripcion_solicitud = $_REQUEST['descripcion_solicitud']; 
			$item->fecha_modificacion = date("Y-m-d H:i:s"); 
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion']; 
			
		 	echo json_encode($mv->updateMatenimientoSolicitud($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMatenimientoSolicitud($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'list_servicios_x_solicitudes'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getServiciosXsolicitudID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'solicitudes_x_vehiculo'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoSolicitudesByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'cabecera_solicitud'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getSedeVehiculoSolicitudXsolicitudID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'create_servicios_x_solicitudes'){
		
			$item = new stdClass;
			$item->idmantenimiento_solicitudes = $_REQUEST['id']; 
			$item->idmantenimiento_servicios = $_REQUEST['idmantenimiento_servicios']; 
			$item->idmantenimiento_componentes = $_REQUEST['idmantenimiento_componentes'];  
			$item->idmantenimiento_tipos_servicios = $_REQUEST['idmantenimiento_tipos_servicios'];  
			$item->idmantenimiento_alertas = (empty($_REQUEST['idmantenimiento_alertas']) || $_REQUEST['idmantenimiento_alertas'] == "")? NULL : $_REQUEST['idmantenimiento_alertas'];
			$item->descripcion_problema = $_REQUEST['descripcion_problema']; 
			$item->is_alerta = $_REQUEST['is_alerta']; 
			$item->estado_servicio_x_solicitud = (empty($_REQUEST['estado_servicio_x_solicitud']) || $_REQUEST['is_alerta'] == "")? 0 : $_REQUEST['estado_servicio_x_solicitud'];
			$item->fecha_creacion = date("Y-m-d H:i:s"); 
			$item->usuario_creacion = $_REQUEST['usuario_creacion']; 
		
		 	echo json_encode($mv->createServicioXsolicitud($item));
	
	}elseif($_REQUEST['action_type'] == 'delete_servicios_x_solicitudes'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->deleteServicioXsolicitud($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}
	
	
	
    exit;
		 
}


  
?>