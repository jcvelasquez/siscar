<?php

require_once('MantenimientoEvaluacionesService.php'); 

$mv = new MantenimientoEvaluacionesService(); 

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


//ESTA VARIABLE ES PARA MOSTRAR DOS CONSULTAS DIFERENTES EN UN METODO
$settings['tipo_evaluacion_x_servicio'] = "";

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
			
			if(!empty($_REQUEST['idsedes'])){
				$settings['idsedes'] = $_REQUEST['idsedes'];
			}else{
				$settings['idsedes'] = "";	
			}
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllMatenimientoEvaluaciones($settings);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'evaluaciones_x_vehiculo'){	
		
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoEvaluacionesByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'cabecera_evaluacion'){	
		
			$mvObj = new stdClass;
			$mvObj = $mv->getSedeVehiculoEvaluacionXevaluacionID($_REQUEST['id']);
			echo json_encode($mvObj);
			
	}elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoEvaluacionByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
			 $item = new stdClass;
			 $item->idmantenimiento_solicitudes = $_REQUEST['idmantenimiento_solicitudes'];
			 $item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios'];
			 $item->descripcion_evaluacion = $_REQUEST['descripcion_evaluacion'];
			 $item->is_aprobado_evaluacion = (empty($_REQUEST['is_aprobado_evaluacion']) || $_REQUEST['is_aprobado_evaluacion'] == "")? 0 : $_REQUEST['is_aprobado_evaluacion'];			 
			 $fecha_evaluacion = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_evaluacion']);
			 $item->fecha_evaluacion = $fecha_evaluacion->format('Y-m-d');
			 $item->estado_evaluacion = (empty($_REQUEST['estado_evaluacion']) || $_REQUEST['estado_evaluacion'] == "")? 0 : $_REQUEST['estado_evaluacion'];
			 $item->fecha_creacion = date("Y-m-d H:i:s");
			 $item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	 echo json_encode($mv->createMatenimientoEvaluacion($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){
		 
			$item = new stdClass;
			$item->idmantenimiento_evaluaciones = $_REQUEST['id']; 
			$item->descripcion_evaluacion = $_REQUEST['descripcion_evaluacion']; 
			$fecha_evaluacion = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_evaluacion']);
			$item->fecha_evaluacion = $fecha_evaluacion->format('Y-m-d');
			$item->fecha_modificacion = date("Y-m-d H:i:s"); 
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion']; 
			
			echo json_encode($mv->updateMatenimientoEvaluacion($item));

	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMatenimientoEvaluacion($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'list_evaluaciones_x_servicios'){
		
			$settings['tipo_evaluacion_x_servicio'] = $_REQUEST['tipo_evaluacion_x_servicio']; 
			$settings['id'] = $_REQUEST['id'];
		
			$mvObj = new stdClass;
			$mvObj = $mv->getEvaluacionesXserviciosXsolicitudID($settings);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'create_evaluaciones_x_servicios'){

			$item = new stdClass;
			$item->idmantenimiento_evaluaciones = $_REQUEST['idmantenimiento_evaluaciones'];  
			$item->idservicios_x_solicitudes = $_REQUEST['idservicios_x_solicitudes'];   
			$item->talleres_idtalleres = $_REQUEST['talleres_idtalleres'];   
			$item->descripcion_diagnostico = $_REQUEST['descripcion_diagnostico'];   
			$item->descripcion_accion = $_REQUEST['descripcion_accion'];   
			$item->costo_accion = $_REQUEST['costo_accion'];   
			$item->es_cambio_componente = (empty($_REQUEST['es_cambio_componente']) || $_REQUEST['es_cambio_componente'] == "")? 0 : 1;
			$item->motivo_cambio_componente = (empty($_REQUEST['motivo_cambio_componente']) || $_REQUEST['motivo_cambio_componente'] == "")? NULL : $_REQUEST['motivo_cambio_componente'];
			$item->es_taller_seleccionado = (empty($_REQUEST['es_taller_seleccionado']) || $_REQUEST['es_taller_seleccionado'] == "")? 0 : 1;
			$item->motivo_taller_seleccionado = (empty($_REQUEST['motivo_taller_seleccionado']) || $_REQUEST['motivo_taller_seleccionado'] == "")? NULL : $_REQUEST['motivo_taller_seleccionado'];
			$item->es_evaluacion_aprobada  = 0;
			$item->estado_evaluacion_x_servicio = 1;   
			$item->fecha_creacion = date("Y-m-d H:i:s"); 
			$item->usuario_creacion = $_REQUEST['usuario_creacion']; 
						
			echo json_encode($mv->createEvaluacionesXservicios($item));
	
	}elseif($_REQUEST['action_type'] == 'update_evaluaciones_x_servicios'){

			$item = new stdClass;
			$item->idevaluaciones_x_servicios = $_REQUEST['idevaluaciones_x_servicios']; 
			$item->idmantenimiento_evaluaciones = $_REQUEST['idmantenimiento_evaluaciones'];  
			$item->idservicios_x_solicitudes = $_REQUEST['idservicios_x_solicitudes'];   
			$item->talleres_idtalleres = $_REQUEST['talleres_idtalleres'];   
			$item->descripcion_diagnostico = $_REQUEST['descripcion_diagnostico'];   
			$item->descripcion_accion = $_REQUEST['descripcion_accion'];   
			$item->costo_accion = $_REQUEST['costo_accion'];   
			$item->es_cambio_componente = (empty($_REQUEST['es_cambio_componente']) || $_REQUEST['es_cambio_componente'] == "")? 0 : 1;
			$item->motivo_cambio_componente = (empty($_REQUEST['motivo_cambio_componente']) || $_REQUEST['motivo_cambio_componente'] == "")? NULL : $_REQUEST['motivo_cambio_componente'];
			$item->es_taller_seleccionado = (empty($_REQUEST['es_taller_seleccionado']) || $_REQUEST['es_taller_seleccionado'] == "")? 0 : 1;
			$item->motivo_taller_seleccionado = (empty($_REQUEST['motivo_taller_seleccionado']) || $_REQUEST['motivo_taller_seleccionado'] == "")? NULL : $_REQUEST['motivo_taller_seleccionado'];
			$item->fecha_creacion = date("Y-m-d H:i:s"); 
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion']; 
						
			echo json_encode($mv->updateEvaluacionesXservicios($item));
	
	}elseif($_REQUEST['action_type'] == 'aprobar_evaluacion_x_servicio'){

			$item = new stdClass;
			$item->idevaluaciones_x_servicios = $_REQUEST['idevaluaciones_x_servicios']; 
			$item->es_evaluacion_aprobada = $_REQUEST['es_evaluacion_aprobada'];  
			$item->es_taller_seleccionado = $_REQUEST['es_taller_seleccionado'];  
			$item->motivo_taller_seleccionado = $_REQUEST['motivo_taller_seleccionado'];  
			$item->usuario_aprobacion = $_REQUEST['usuario_aprobacion'];  
			$item->fecha_aprobacion = date("Y-m-d H:i:s"); 
			
			echo json_encode($mv->aprobarEvaluacionXservicio($item));
					
	}elseif($_REQUEST['action_type'] == 'delete_evaluaciones_x_servicios'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->deleteEvaluacionesXservicios($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}
	
	
	
    exit;
		 
}


  
?>