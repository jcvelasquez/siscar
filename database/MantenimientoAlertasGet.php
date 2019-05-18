<?php

require_once('MantenimientoAlertasService.php'); 

$mv = new MantenimientoAlertasService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();

if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];


if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllMatenimientoAlertas($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'list_x_vehiculo'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoAlertasByID($_REQUEST['id']);
			echo json_encode($mvObj);
		
	 }elseif($_REQUEST['action_type'] == 'alertas_x_vehiculo'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoAlertasByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoAlertasByID($_REQUEST['id']);
			echo json_encode($mvObj);
		 	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos'];
			$item->kilometraje_ultimo_mantenimiento = $_REQUEST['kilometraje_ultimo_mantenimiento'];
			$item->idmantenimiento_servicios = $_REQUEST['idmantenimiento_servicios']; 
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios']; 
			$item->id_medida_uso = (empty($_REQUEST['id_medida_uso']) || $_REQUEST['id_medida_uso'] == "")? NULL : $_REQUEST['id_medida_uso'];
			$item->descripcion_alerta = $_REQUEST['descripcion_alerta']; 
			$item->is_custom_alerta = (empty($_REQUEST['is_custom_alerta']) || $_REQUEST['is_custom_alerta'] == "")? 0 : 1;
			$item->ciclo_alerta = (empty($_REQUEST['ciclo_alerta']) || $_REQUEST['ciclo_alerta'] == "")? NULL : $_REQUEST['ciclo_alerta'];
			$item->ejecucion_alerta = (empty($_REQUEST['ejecucion_alerta']) || $_REQUEST['ejecucion_alerta'] == "")? NULL : $_REQUEST['ejecucion_alerta'];
			$item->estado_alerta = $_REQUEST['estado_alerta']; 
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		 	echo json_encode($mv->createMatenimientoAlerta($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idmantenimiento_alertas = $_REQUEST['id'];
			$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos'];
			$item->kilometraje_ultimo_mantenimiento = $_REQUEST['kilometraje_ultimo_mantenimiento'];
			$item->idmantenimiento_servicios = $_REQUEST['idmantenimiento_servicios']; 
			$item->usuarios_idusuarios = $_REQUEST['usuarios_idusuarios']; 
			$item->id_medida_uso = (empty($_REQUEST['id_medida_uso']) || $_REQUEST['id_medida_uso'] == "")? NULL : $_REQUEST['id_medida_uso'];
			$item->descripcion_alerta = $_REQUEST['descripcion_alerta']; 
			$item->is_custom_alerta = (empty($_REQUEST['is_custom_alerta']) || $_REQUEST['is_custom_alerta'] == "")? 0 : 1;
			$item->ciclo_alerta = (empty($_REQUEST['ciclo_alerta']) || $_REQUEST['ciclo_alerta'] == "")? NULL : $_REQUEST['ciclo_alerta'];
			$item->ejecucion_alerta = (empty($_REQUEST['ejecucion_alerta']) || $_REQUEST['ejecucion_alerta'] == "")? NULL : $_REQUEST['ejecucion_alerta'];
			$item->estado_alerta = $_REQUEST['estado_alerta']; 
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateMatenimientoAlerta($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteMatenimientoAlerta($_REQUEST['id']));
	 	 
     }elseif($_REQUEST['action_type'] == 'alertas_x_servicio_vehiculo'){
		 
		 	$mvObj = new stdClass;
			$mvObj = $mv->getMatenimientoAlertasByServicioVehiculoID( $_REQUEST['idmantenimiento_servicios'], $_REQUEST['vehiculos_idvehiculos'] );
			echo json_encode($mvObj);
				 	 
     }
	
	
	
    exit;
		 
}


  
?>