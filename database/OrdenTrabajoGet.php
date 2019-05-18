<?php

require_once('OrdenTrabajoService.php'); 

$mv = new OrdenTrabajoService(); 

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
						
			if(!empty($_REQUEST['idsedes'])){
				$settings['idsedes'] = $_REQUEST['idsedes'];
			}else{
				$settings['idsedes'] = "";	
			}
						
			if(!empty($_REQUEST['idvehiculos'])){
				$settings['idvehiculos'] = $_REQUEST['idvehiculos'];
			}else{
				$settings['idvehiculos'] = "";	
			}

			$mvObj = new stdClass;
			$mvObj = $mv->getAllOrdenTrabajo($settings);
			echo json_encode($mvObj);
	
	  }elseif($_REQUEST['action_type'] == 'ordenes_trabajo_x_vehiculo'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getOrdenesTrabajosByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
		 		
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getOrdenTrabajoByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 
		 	 $item = new stdClass;
			 
			 $item->idmantenimiento_evaluaciones = $_REQUEST['idmantenimiento_evaluaciones'];
			 $item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios'];
			 $item->descripcion_orden_trabajo = $_REQUEST['descripcion_orden_trabajo'];
			 
			 $fecha_orden_trabajo = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_orden_trabajo']);
			 $item->fecha_orden_trabajo = $fecha_orden_trabajo->format('Y-m-d');
			 
			 $fecha_estimada_inicio = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_estimada_inicio']);
			 $item->fecha_estimada_inicio = $fecha_estimada_inicio->format('Y-m-d');
			 
			 $fecha_estimada_fin = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_estimada_fin']);
			 $item->fecha_estimada_fin = $fecha_estimada_fin->format('Y-m-d');
			 			
			 $item->nro_orden_sigap = $_REQUEST['nro_orden_sigap'];
			 $item->kilometraje_internamiento = $_REQUEST['kilometraje_internamiento'];				
			 			 
			 $item->is_aprobado_orden_trabajo = (empty($_REQUEST['is_aprobado_orden_trabajo']) || $_REQUEST['is_aprobado_orden_trabajo'] == "")? 0 : $_REQUEST['is_aprobado_orden_trabajo']; 
			 
			 $item->estado_orden_trabajo = $_REQUEST['estado_orden_trabajo'];
			
			 $item->fecha_creacion = date("Y-m-d H:i:s");
			 $item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
			echo json_encode($mv->createOrdenTrabajo($item));


	 }elseif($_REQUEST['action_type'] == 'update'){
		 
		 	 $item = new stdClass;
		 	 $item->idorden_trabajo = $_REQUEST['id'];
			 $item->idmantenimiento_evaluaciones = $_REQUEST['idmantenimiento_evaluaciones'];
			 $item->descripcion_orden_trabajo = $_REQUEST['descripcion_orden_trabajo'];
			 
			 $fecha_orden_trabajo = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_orden_trabajo']);
			 $item->fecha_orden_trabajo = $fecha_orden_trabajo->format('Y-m-d');
			 
			 $fecha_estimada_inicio = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_estimada_inicio']);
			 $item->fecha_estimada_inicio = $fecha_estimada_inicio->format('Y-m-d');
			 
			 $fecha_estimada_fin = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_estimada_fin']);
			 $item->fecha_estimada_fin = $fecha_estimada_fin->format('Y-m-d');
			 
			 $item->nro_orden_sigap = $_REQUEST['nro_orden_sigap'];
			 $item->kilometraje_internamiento = $_REQUEST['kilometraje_internamiento'];		
			 			 
			 $item->fecha_modificacion = date("Y-m-d H:i:s");
			 $item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
			echo json_encode($mv->updateOrdenTrabajo($item));

	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteOrdenTrabajo($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'evaluaciones_x_vehiculo'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getEvaluacionesByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'trabajos_x_evaluaciones'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getTrabajosXevaluacionesXsolicitudID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'ejecuciones_x_ordentrabajo'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getEjecucionesXordenTrabajoID($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}elseif($_REQUEST['action_type'] == 'create_trabajos_x_evaluaciones'){

			$item = new stdClass;
			$item->idorden_trabajo = $_REQUEST['idorden_trabajo'];  
			$item->idevaluaciones_x_servicios = $_REQUEST['idevaluaciones_x_servicios'];  
			$item->estado_trabajo = $_REQUEST['estado_trabajo'];  

			echo json_encode($mv->createTrabajosXevaluaciones($item));
	
	}elseif($_REQUEST['action_type'] == 'update_trabajos_x_evaluaciones'){

			$item = new stdClass;	
			$item->idtrabajos_x_evaluaciones = $_REQUEST['idtrabajos_x_evaluaciones'];  
			$item->calificacion_trabajo_ejecutado = $_REQUEST['calificacion_trabajo_ejecutado'];  
			$item->comentarios_trabajo_ejecutado = $_REQUEST['comentarios_trabajo_ejecutado'];  
			$item->porcentaje_trabajo_ejecutado = $_REQUEST['porcentaje_trabajo_ejecutado'];  
			$item->se_ejecuto_trabajo = (empty($_REQUEST['se_ejecuto_trabajo']) || $_REQUEST['se_ejecuto_trabajo'] == "")? 0 : $_REQUEST['se_ejecuto_trabajo'];
			$item->motivo_no_ejecuto = (empty($_REQUEST['motivo_no_ejecuto']) || $_REQUEST['motivo_no_ejecuto'] == "")? NULL : $_REQUEST['motivo_no_ejecuto'];
			
			$fecha_trabajo_ejecutado = DateTime::createFromFormat('d/m/Y', $_REQUEST['fecha_trabajo_ejecutado']);
			$item->fecha_trabajo_ejecutado = $fecha_trabajo_ejecutado->format('Y-m-d');
			
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];

			echo json_encode($mv->updateTrabajosXevaluaciones($item));
			
	}elseif($_REQUEST['action_type'] == 'delete_trabajos_x_evaluaciones'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->deleteTrabajosXevaluaciones($_REQUEST['id']);
			echo json_encode($mvObj);
	
	}
		
    exit;
		 
}


  
?>