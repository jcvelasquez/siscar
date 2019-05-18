<?php

class MantenimientoAlertasService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}


	public function getAllMatenimientoAlertas($settings = array()) {
		
			$query = "SELECT male.idmantenimiento_alertas, 
							 male.vehiculos_idvehiculos, 
							 vehi.descripcion_vehiculo,
							 vehi.placa_vehiculo,
							 vehi.sedes_idsedes,
							 sede.nombre_sede,
							 msis.idmantenimiento_sistemas,
							 msis.nombre_sistema,
							 male.idmantenimiento_servicios, 
							 mser.nombre_servicio, 
							 male.usuarios_idusuarios, 
							 usua.nombres,
							 usua.apellidos,
							 usua.email,
							 male.id_medida_uso, 
							 muso.medida_uso,
							 male.kilometraje_ultimo_mantenimiento,
							 male.descripcion_alerta, 
							 male.is_custom_alerta,
							 male.ciclo_alerta, 
							 male.ejecucion_alerta, 
							 male.estado_alerta, 
							 male.fecha_creacion, 
							 male.usuario_creacion
						FROM mantenimiento_alertas AS male 
				  INNER JOIN mantenimiento_servicios AS mser
			  			  ON male.idmantenimiento_servicios = mser.idmantenimiento_servicios
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas		  
				  INNER JOIN usuarios AS usua
			  			  ON male.usuarios_idusuarios = usua.idusuarios
				  INNER JOIN vehiculos AS vehi
			  			  ON male.vehiculos_idvehiculos = vehi.idvehiculos		
				  INNER JOIN sedes AS sede
			  			  ON vehi.sedes_idsedes = sede.idsedes			  
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso
				    ORDER BY male.idmantenimiento_alertas DESC";
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($settings['recordsTotal']);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}
	
	public function getMatenimientoAlertasByVehiculoID($vehiculoID) {
		
			$query = "SELECT male.idmantenimiento_alertas, 
							 male.vehiculos_idvehiculos, 
							 vehi.descripcion_vehiculo,
							 vehi.placa_vehiculo,
							 vehi.sedes_idsedes,
							 sede.nombre_sede,
							 msis.idmantenimiento_sistemas,
							 msis.nombre_sistema,
							 male.idmantenimiento_servicios, 
							 mser.nombre_servicio, 
							 male.usuarios_idusuarios, 
							 usua.nombres,
							 usua.apellidos,
							 usua.email,
							 male.id_medida_uso, 
							 male.kilometraje_ultimo_mantenimiento,
							 male.descripcion_alerta, 
							 male.is_custom_alerta,
							 male.ciclo_alerta, 
							 male.ejecucion_alerta, 
							 male.estado_alerta, 
							 male.fecha_creacion, 
							 male.usuario_creacion
						FROM mantenimiento_alertas AS male 
				  INNER JOIN mantenimiento_servicios AS mser
			  			  ON male.idmantenimiento_servicios = mser.idmantenimiento_servicios
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas		  
				  INNER JOIN usuarios AS usua
			  			  ON male.usuarios_idusuarios = usua.idusuarios
				  INNER JOIN vehiculos AS vehi
			  			  ON male.vehiculos_idvehiculos = vehi.idvehiculos		
				  INNER JOIN sedes AS sede
			  			  ON vehi.sedes_idsedes = sede.idsedes			  
					   WHERE male.vehiculos_idvehiculos = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $vehiculoID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);

			}
		
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	public function getMatenimientoAlertasByServicioVehiculoID($servicioID, $vehiculoID) {
		
			$query = "SELECT male.idmantenimiento_alertas, 
							 male.vehiculos_idvehiculos, 
							 vehi.descripcion_vehiculo,
							 vehi.placa_vehiculo,
							 vehi.sedes_idsedes,
							 sede.nombre_sede,
							 msis.idmantenimiento_sistemas,
							 msis.nombre_sistema,
							 male.idmantenimiento_servicios, 
							 mser.nombre_servicio, 
							 male.usuarios_idusuarios, 
							 usua.nombres,
							 usua.apellidos,
							 usua.email,
							 male.id_medida_uso, 
							 muso.medida_uso,
							 male.kilometraje_ultimo_mantenimiento,
							 male.descripcion_alerta, 
							 male.is_custom_alerta,
							 male.ciclo_alerta, 
							 male.ejecucion_alerta, 
							 male.estado_alerta, 
							 male.fecha_creacion, 
							 male.usuario_creacion
						FROM mantenimiento_alertas AS male 
				  INNER JOIN mantenimiento_servicios AS mser
			  			  ON male.idmantenimiento_servicios = mser.idmantenimiento_servicios
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas		  
				  INNER JOIN usuarios AS usua
			  			  ON male.usuarios_idusuarios = usua.idusuarios
				  INNER JOIN vehiculos AS vehi
			  			  ON male.vehiculos_idvehiculos = vehi.idvehiculos		
				  INNER JOIN sedes AS sede
			  			  ON vehi.sedes_idsedes = sede.idsedes			  
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso
					   WHERE male.idmantenimiento_servicios = ?
						 AND male.vehiculos_idvehiculos = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ii', $servicioID, $vehiculoID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);

			}
		
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	

	public function getMatenimientoAlertasByID($itemID) {
		
			$query = "SELECT male.idmantenimiento_alertas, 
							 male.vehiculos_idvehiculos, 
							 vehi.descripcion_vehiculo,
							 vehi.placa_vehiculo,
							 msis.idmantenimiento_sistemas,
							 msis.nombre_sistema,
							 male.idmantenimiento_servicios, 
							 mser.nombre_servicio, 
							 male.usuarios_idusuarios, 
							 usua.nombres,
							 usua.apellidos,
							 usua.email,
							 male.id_medida_uso, 
							 muso.medida_uso,
							 male.kilometraje_ultimo_mantenimiento,
							 male.descripcion_alerta, 
							 male.is_custom_alerta,
							 male.ciclo_alerta, 
							 male.ejecucion_alerta, 
							 male.estado_alerta, 
							 male.fecha_creacion, 
							 male.usuario_creacion
						FROM mantenimiento_alertas AS male 
				  INNER JOIN mantenimiento_servicios AS mser
			  			  ON male.idmantenimiento_servicios = mser.idmantenimiento_servicios
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas		  
				  INNER JOIN usuarios AS usua
			  			  ON male.usuarios_idusuarios = usua.idusuarios
				  INNER JOIN vehiculos AS vehi
			  			  ON male.vehiculos_idvehiculos = vehi.idvehiculos		  
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso
					   WHERE male.idmantenimiento_alertas = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMatenimientoAlerta($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_alertas (vehiculos_idvehiculos, idmantenimiento_servicios, usuarios_idusuarios, id_medida_uso, kilometraje_ultimo_mantenimiento, descripcion_alerta, is_custom_alerta, ciclo_alerta, ejecucion_alerta, estado_alerta, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiiisiiiiss', $item->vehiculos_idvehiculos, $item->idmantenimiento_servicios, $item->usuarios_idusuarios, $item->id_medida_uso, $item->kilometraje_ultimo_mantenimiento, $item->descripcion_alerta, $item->is_custom_alerta, $item->ciclo_alerta, $item->ejecucion_alerta, $item->estado_alerta, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMatenimientoAlerta($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_alertas SET vehiculos_idvehiculos=?, idmantenimiento_servicios=?, usuarios_idusuarios=?, id_medida_uso=?, kilometraje_ultimo_mantenimiento=?, descripcion_alerta=?, is_custom_alerta=?, ciclo_alerta=?, ejecucion_alerta=?, estado_alerta=?, fecha_modificacion=?, usuario_modificacion=? WHERE idmantenimiento_alertas=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiiiisiiiissi', $item->vehiculos_idvehiculos, $item->idmantenimiento_servicios, $item->usuarios_idusuarios, $item->id_medida_uso, $item->kilometraje_ultimo_mantenimiento, $item->descripcion_alerta, $item->is_custom_alerta , $item->ciclo_alerta, $item->ejecucion_alerta, $item->estado_alerta, $item->fecha_modificacion, $item->usuario_modificacion, $item->idmantenimiento_alertas);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteMatenimientoAlerta($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_alertas WHERE idmantenimiento_alertas = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_alertas");
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_result($stmt, $rec_count);
		$this->throwExceptionOnError();
		
		mysqli_stmt_fetch($stmt);
		$this->throwExceptionOnError();
		
		return $rec_count;
		
		mysqli_stmt_free_result($stmt);
		mysqli_close($this->connection);
		
	}


	private function throwExceptionOnError($link = null) {
		if($link == null) {
			$link = $this->connection;
		}
		if(mysqli_error($link)) {
			return array("status" => "error", "code" => (string)mysqli_errno($link) , "message" => mysqli_error($link) );
		}else{
			return array("status" => "success" , "code" => "200" , "message"=> "");
		}	
	}
	
}

?>
