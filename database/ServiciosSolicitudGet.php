<?php

require_once('ServiciosSolicitudService.php'); 

$mv = new ServiciosSolicitudService(); 

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
			
			if(!empty($_REQUEST['idchofer'])){
				$settings['idchofer'] = $_REQUEST['idchofer'];
			}else{
				$settings['idchofer'] = "";	
			}
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAllServicioSolicitud($settings);
			echo json_encode($mvObj);
	 
	 }elseif($_REQUEST['action_type'] == 'list_events'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getAllEventsServicioSolicitud($_REQUEST['range_start'], $_REQUEST['range_end'], $_REQUEST['idchofer'], $_REQUEST['idvehiculo']);
			print_r($mvObj);
			
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getServicioSolicitudByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){

		 	$item = new stdClass;
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios']; 
			
			$item->chofer_idchofer = (empty($_REQUEST['chofer_idchofer']) || $_REQUEST['chofer_idchofer'] == "")? NULL : $_REQUEST['chofer_idchofer'];
			$item->vehiculos_idvehiculos = (empty($_REQUEST['vehiculos_idvehiculos']) || $_REQUEST['vehiculos_idvehiculos'] == "")? NULL : $_REQUEST['vehiculos_idvehiculos'];
			
			$item->idtipos_vehiculo = $_REQUEST['idtipos_vehiculo']; 
			$item->usuario_solicita = ""; 
			
			$item->usuario_chofer = (empty($_REQUEST['usuario_chofer']) || $_REQUEST['usuario_chofer'] == "")? "" : $_REQUEST['usuario_chofer'];
			
			$item->motivo_comision = $_REQUEST['motivo_comision']; 
			
			$timestamp = new DateTime();
			$item->idevent =  $timestamp->getTimestamp();
			
			$fecha_inicio_concat = $_REQUEST['fecha_inicio']." ".$_REQUEST['hora_inicio'];
			$fecha_fin_concat = $_REQUEST['fecha_fin']." ".$_REQUEST['hora_fin'];
			
			//FECHA Y HORA DE INICIO EN FORMATO TIMESTAMP
			$start_date = DateTime::createFromFormat('d/m/Y H:i', $fecha_inicio_concat);				
			$item->start_date = strtotime($start_date->format('Y-m-d H:i'));
			
			//FECHA Y HORA DE FIN EN FORMATO TIMESTAMP
			$end_date = DateTime::createFromFormat('d/m/Y H:i', $fecha_fin_concat);				
			$item->end_date = strtotime($end_date->format('Y-m-d H:i'));
			
			//FECHA Y HORA DE INICIO FORMATO DATETIME
			
			$fecha_inicio = DateTime::createFromFormat('d/m/Y H:i', $fecha_inicio_concat);				
			$item->fecha_inicio = $fecha_inicio->format('Y-m-d H:i');
			
			//FECHA Y HORA DE FIN FORMATO DATETIME
			
			$fecha_fin = DateTime::createFromFormat('d/m/Y H:i', $fecha_fin_concat);				
			$item->fecha_fin = $fecha_fin->format('Y-m-d H:i');			
			
			$item->ubigeo_idubigeo = $_REQUEST['distrito']; 
			$item->lugar_destino = $_REQUEST['lugar_destino']; 
			$item->direccion_destino = $_REQUEST['direccion_destino']; 
			
			$item->departamento = $_REQUEST['departamento']; 
			$item->provincia = $_REQUEST['provincia']; 
						
			$item->es_ida_vuelta = (empty($_REQUEST['es_ida_vuelta']) || $_REQUEST['es_ida_vuelta'] == "")? 0 : $_REQUEST['es_ida_vuelta'];
			$item->es_aprobado = 1;			
			$item->es_asignado = 1;
			
			$item->es_cancelado = 0;
			$item->es_espera = (empty($_REQUEST['es_espera']) || $_REQUEST['es_espera'] == "")? 0 : $_REQUEST['es_espera'];
			$item->es_vale = (empty($_REQUEST['es_vale']) || $_REQUEST['es_vale'] == "")? 0 : $_REQUEST['es_vale'];
			$item->es_finalizado = 0;
			$item->estado_comisionado = 1;
			$item->estado_servicio_solicitud = 1;
			
			$arComisionados = array(); 
			$arComisionados = $_REQUEST['usuarios'];
			
			$item->comisionados = $arComisionados;
			$item->usuarios_email = $_REQUEST['usuarios_email'];
			
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createServicioSolicitud($item));

	}elseif($_REQUEST['action_type'] == 'create_cierre_chofer'){

		 	$item = new stdClass;
			$item->idservicio_solicitud = $_REQUEST['idservicio_solicitud'];
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos'];
			$item->idmantenimiento_alertas = $_REQUEST['idmantenimiento_alertas'];
			
			
			//FECHA Y HORA DE INICIO FORMATO DATETIME
			$fecha_inicio_real_concat = $_REQUEST['fecha_inicio_real']." ".$_REQUEST['hora_inicio_real'];
			$fecha_inicio_real = DateTime::createFromFormat('d/m/Y H:i', $fecha_inicio_real_concat);				
			$item->fecha_inicio_real = $fecha_inicio_real->format('Y-m-d H:i');
			
			//FECHA Y HORA DE FIN FORMATO DATETIME
			$fecha_fin_real_concat = $_REQUEST['fecha_fin_real']." ".$_REQUEST['hora_fin_real'];
			$fecha_fin_real = DateTime::createFromFormat('d/m/Y H:i', $fecha_fin_real_concat);				
			$item->fecha_fin_real = $fecha_fin_real->format('Y-m-d H:i');		
			
			$item->kilometraje_inicio = $_REQUEST['kilometraje_inicio'];
			$item->kilometraje_fin = $_REQUEST['kilometraje_fin'];
			$item->observaciones_chofer = $_REQUEST['observaciones_chofer'];
			
			$item->es_finalizado = 1;
			$item->estado_servicio = "FINALIZADO";
			$item->observaciones_estado = "El servicio fue registrado como finalizado por el usuario.";
			
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createServicioCierre($item));	
	
	
	}elseif($_REQUEST['action_type'] == 'create_calificacion_usuario'){

		 	$item = new stdClass;
	
			$item->idservicio_solicitud = $_REQUEST['idservicio_solicitud'];
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios'];
			$item->calificacion_usuario = $_REQUEST['calificacion_usuario'];
			$item->observaciones_usuario = $_REQUEST['observaciones_usuario'];
			
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
	
			echo json_encode($mv->createServicioCalificacion($item));	
	
	
	
	}elseif($_REQUEST['action_type'] == 'create_cancelar_servicio'){

		 	$item = new stdClass;
			$item->idservicio_solicitud = $_REQUEST['idservicio_solicitud'];
			$item->estado_servicio = $_REQUEST['estado_servicio'];
			$item->observaciones_estado = $_REQUEST['observaciones_estado'];
			$item->es_cancelado = 1;
			$item->es_finalizado = 1;
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createCancelarServicio($item));	
	
	
	}elseif($_REQUEST['action_type'] == 'create_reanudar_servicio'){

		 	$item = new stdClass;
			$item->idservicio_solicitud = $_REQUEST['idservicio_solicitud'];
			$item->estado_servicio = $_REQUEST['estado_servicio'];
			$item->observaciones_estado = $_REQUEST['observaciones_estado'];
			$item->es_cancelado = 0;			
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createReanudarServicio($item));	
						 
    }elseif($_REQUEST['action_type'] == 'cierre_chofer_x_servicios'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getServicioCierreChofer($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'calificacion_usuario_x_servicios'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getServicioCalificacionUsuario($_REQUEST['id']);
			echo json_encode($mvObj);
					
	}elseif($_REQUEST['action_type'] == 'comisionados_x_servicios'){
		
			$mvObj = new stdClass;
			$settings['id'] = $_REQUEST['id'];
			$mvObj = $mv->getComisionadosServicio($settings);
			echo json_encode($mvObj);
				
	}elseif($_REQUEST['action_type'] == 'estados_x_servicios'){
		
			$mvObj = new stdClass;
			$settings['id'] = $_REQUEST['id'];
			$mvObj = $mv->getEstadosServicio($settings);
			echo json_encode($mvObj);
				
	}elseif($_REQUEST['action_type'] == 'delete'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->deleteServiciosSolicitud($_REQUEST['id']);
			echo json_encode($mvObj);
				
	}

    exit;
		 
}


  
?>