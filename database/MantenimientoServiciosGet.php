<?php

require_once('MantenimientoServiciosService.php'); 

$mv = new MantenimientoServiciosService(); 

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
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllMatenimientoServicios($settings);
			echo json_encode($mvObj);
			
	 }elseif($_REQUEST['action_type'] == 'servicios_x_sistema'){
		 
		 	$mvObj = new stdClass;
			$settings['idmantenimiento_sistemas'] = $_REQUEST['id'];
			$mvObj = $mv->getMatenimientoServicioBySistemasID($settings);
			echo json_encode($mvObj);
		 
	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoServicioByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->idmantenimiento_sistemas = $_REQUEST['idmantenimiento_sistemas'];
			$item->idmantenimiento_tipos_servicios = $_REQUEST['idmantenimiento_tipos_servicios'];
			$item->id_medida_uso = (empty($_REQUEST['id_medida_uso']) || $_REQUEST['id_medida_uso'] == "")? NULL : $_REQUEST['id_medida_uso'];
			$item->cod_servicio = $_REQUEST['cod_servicio'];
			$item->nombre_servicio = $_REQUEST['nombre_servicio']; 
			$item->descripcion_servicio = $_REQUEST['descripcion_servicio'];
			$item->estado_servicio = (empty($_REQUEST['estado_servicio']) || $_REQUEST['estado_servicio'] == "")? 1 : $_REQUEST['estado_servicio'];
			$item->ciclo_alerta = (empty($_REQUEST['ciclo_alerta']) || $_REQUEST['ciclo_alerta'] == "")? NULL : $_REQUEST['ciclo_alerta'];
			$item->ejecucion_alerta = (empty($_REQUEST['ejecucion_alerta']) || $_REQUEST['ejecucion_alerta'] == "")? NULL : $_REQUEST['ejecucion_alerta'];
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createMatenimientoServicio($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idmantenimiento_servicios = $_REQUEST['id'];
			$item->idmantenimiento_sistemas = $_REQUEST['idmantenimiento_sistemas'];
			$item->idmantenimiento_tipos_servicios = $_REQUEST['idmantenimiento_tipos_servicios'];
			$item->id_medida_uso = (empty($_REQUEST['id_medida_uso']) || $_REQUEST['id_medida_uso'] == "")? NULL : $_REQUEST['id_medida_uso'];
			$item->cod_servicio = $_REQUEST['cod_servicio'];
			$item->nombre_servicio = $_REQUEST['nombre_servicio']; 
			$item->descripcion_servicio = $_REQUEST['descripcion_servicio'];
			$item->estado_servicio = $_REQUEST['estado_servicio'];
			$item->ciclo_alerta = (empty($_REQUEST['ciclo_alerta']) || $_REQUEST['ciclo_alerta'] == "")? NULL : $_REQUEST['ciclo_alerta'];
			$item->ejecucion_alerta = (empty($_REQUEST['ejecucion_alerta']) || $_REQUEST['ejecucion_alerta'] == "")? NULL : $_REQUEST['ejecucion_alerta'];
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateMatenimientoServicio($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMatenimientoServicio($_REQUEST['id']));
		 
    }
	
    exit;
		 
}


  
?>