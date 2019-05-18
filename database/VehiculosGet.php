<?php

require_once('VehiculosService.php'); 

$mv = new VehiculosService(); 

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

//PARA OCULTAR LOS ESTADOS DESACTIVADOS
$settings['estado'] = (isset($_REQUEST["estado"]))? $_REQUEST['estado'] : "-1";

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllVehiculos($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'edit'){
		 
		 	$mvObj = new stdClass;
			$mvObj = $mv->getVehiculoByID($_REQUEST['id']);
			echo json_encode($mvObj);
	 
	 }elseif($_REQUEST['action_type'] == 'create'){
		 
		 	$item = new stdClass;
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes']; 
			$item->idtipos_vehiculo = $_REQUEST['idtipos_vehiculo']; 
			$item->idtipo_combustible = $_REQUEST['idtipo_combustible'];
			$item->idmedida_combustible = $_REQUEST['idmedida_combustible'];
			$item->idmedida_uso = $_REQUEST['idmedida_uso'];
			$item->idmodelos_vehiculos = $_REQUEST['idmodelos_vehiculos'];
			$item->descripcion_vehiculo = $_REQUEST['descripcion_vehiculo'];
			$item->color_calendario = $_REQUEST['color_calendario'];
			$item->placa_vehiculo = $_REQUEST['placa_vehiculo'];
			$item->kilometraje_inicio = $_REQUEST['kilometraje_inicio'];
			$item->nro_serie = $_REQUEST['nro_serie'];
			$item->nro_motor = $_REQUEST['nro_motor'];
			$item->ano_fabricacion = $_REQUEST['ano_fabricacion'];
			
			$vencimiento_soat = DateTime::createFromFormat('d/m/Y', $_REQUEST['vencimiento_soat']);
			$item->vencimiento_soat = $vencimiento_soat->format('Y-m-d');
			 
			$item->clase_transparencia = $_REQUEST['clase_transparencia']; 
			$item->es_pool = $_REQUEST['es_pool']; 
			$item->estado_vehiculo = $_REQUEST['estado_vehiculo']; 
			$item->fecha_creacion = date("Y-m-d H:i:s");
			$item->usuario_creacion = $_REQUEST['usuario_creacion'];
			
		 	echo json_encode($mv->createVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'update'){

	 		$item = new stdClass;
			$item->idvehiculos = $_REQUEST['id']; 
			$item->sedes_idsedes = $_REQUEST['sedes_idsedes']; 
			$item->idtipos_vehiculo = $_REQUEST['idtipos_vehiculo']; 
			$item->idtipo_combustible = $_REQUEST['idtipo_combustible'];
			$item->color_calendario = $_REQUEST['color_calendario'];
			$item->idmedida_combustible = $_REQUEST['idmedida_combustible'];
			$item->idmedida_uso = $_REQUEST['idmedida_uso'];
			$item->idmodelos_vehiculos = $_REQUEST['idmodelos_vehiculos'];
			$item->descripcion_vehiculo = $_REQUEST['descripcion_vehiculo'];
			$item->placa_vehiculo = $_REQUEST['placa_vehiculo'];
			$item->kilometraje_inicio = $_REQUEST['kilometraje_inicio'];
			$item->nro_serie = $_REQUEST['nro_serie'];
			$item->nro_motor = $_REQUEST['nro_motor'];
			
			$item->ano_fabricacion = $_REQUEST['ano_fabricacion'];
			
			$vencimiento_soat = DateTime::createFromFormat('d/m/Y', $_REQUEST['vencimiento_soat']);
			$item->vencimiento_soat = $vencimiento_soat->format('Y-m-d');
			
			$item->clase_transparencia = $_REQUEST['clase_transparencia']; 
			$item->es_pool = $_REQUEST['es_pool']; 
			$item->estado_vehiculo = $_REQUEST['estado_vehiculo']; 
			$item->fecha_modificacion = date("Y-m-d H:i:s");
			$item->usuario_modificacion = $_REQUEST['usuario_modificacion'];
			
		 	echo json_encode($mv->updateVehiculo($item));
		 
	 }elseif($_REQUEST['action_type'] == 'delete'){
			
		 	echo json_encode($mv->deleteVehiculo($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'vehiculo_x_tarjeta'){
			
		 	echo json_encode($mv->getVehiculoByIDTarjeta($_REQUEST['id']));
		 
    }elseif($_REQUEST['action_type'] == 'vehiculo_chofer_x_sede'){
			
		 	echo json_encode($mv->getVehiculosChoferBySedeID($_REQUEST['id']));
	
	}elseif($_REQUEST['action_type'] == 'vehiculo_x_sede'){
		
			$settings['id'] = $_REQUEST['id'];
			
		 	echo json_encode($mv->getVehiculosBySedeID($settings));
				 
    }elseif($_REQUEST['action_type'] == 'adjuntos_x_vehiculo'){
			
			$mvObj = new stdClass;
			$mvObj = $mv->getAdjuntosVehiculoByIDVehiculo($_REQUEST['id']);
			echo json_encode($mvObj);
			
	}elseif($_REQUEST['action_type'] == 'delete_adjunto_vehiculo'){
			
		 	echo json_encode($mv->deleteAdjuntoVehiculo($_REQUEST['id']));
	
	}
	
    exit;
		 
}


  
?>