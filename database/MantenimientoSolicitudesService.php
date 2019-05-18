<?php

class MantenimientoSolicitudesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMatenimientoSolicitudes($settings = array()) {
		
			$desde =  (isset($settings["desde"]))? $settings["desde"] : "";
			$hasta =  (isset($settings["hasta"]))? $settings["hasta"] : "";
			$sedes_idsedes =  (isset($settings["sedes_idsedes"]))? $settings["sedes_idsedes"] : "";
			$idvehiculos =  (isset($settings["idvehiculos"]))? $settings["idvehiculos"] : "";
						
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
		
		   $query = "SELECT mso.idmantenimiento_solicitudes, 
							mso.vehiculos_idvehiculos, 
							ve.placa_vehiculo,
							mo.modelo_vehiculo,
							mar.marca_vehiculo,
							ve.sedes_idsedes,
							se.nombre_sede,
							mso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							mso.descripcion_solicitud, 
							mso.is_aprobado_solicitud,
							mso.estado_solicitud,
							DATE_FORMAT(mso.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
							mso.fecha_creacion,
							mso.usuario_creacion
					   FROM mantenimiento_solicitudes mso,
					   		vehiculos ve,
							usuarios usu,
							sedes se,
							modelos_vehiculos mo,
							marcas_vehiculos mar
					  WHERE mso.vehiculos_idvehiculos = ve.idvehiculos
					    AND ve.sedes_idsedes = se.idsedes
						AND mso.usuarios_idusuarios = usu.idusuarios
						AND ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
						AND mo.idmarcas_vehiculos = mar.idmarcas_vehiculos ";
				   
			if(!empty($settings['search']['value'])) 
			{
				$query .= " AND (se.nombre_sede LIKE '%".$settings['search']['value']."%' OR mso.descripcion_solicitud LIKE '%".$settings['search']['value']."%' OR ve.placa_vehiculo LIKE '%".$settings['search']['value']."%' ) ";
			}
			
			if($sedes_idsedes != "all" && !empty($sedes_idsedes))
			{
				$query .= " AND ve.sedes_idsedes = '$sedes_idsedes'";
			}
			
			if($idvehiculos != "all" && !empty($idvehiculos)){
				$query .= " AND mso.vehiculos_idvehiculos = '$idvehiculos'";
			}
			
			if($desde != "" && $hasta != "")
			{
				$query .= " AND mso.fecha_solicitud >= '$desde' AND mso.fecha_solicitud <= '$hasta' ";
			}
			
			if (isset($order_by) && isset($order_dir))
			{
				if($order_by == "fecha_solicitud")
					$query .= " ORDER BY mso.fecha_solicitud " .  $order_dir ;
				else
					$query .= " ORDER BY " . $order_by ." " .  $order_dir ;
			}
			
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT ".mysqli_real_escape_string( $this->connection, $settings['start'] ).", ".	mysqli_real_escape_string( $this->connection, $settings['length'] );
			}
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			//MUESTRA EL TOTAL FILTRADOS
			$totalFiltered = (empty($settings['search']['value']))? $settings['recordsTotal'] : $stmt->store_result();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->modelo_vehiculo, $row->marca_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				  //FORMATO DE LA FECHA PARA EL RESULTADO
				  //$row->fecha_solicitud = DateTime::createFromFormat('Y-m-d', $row->fecha_solicitud);
				  //$row->fecha_solicitud = $row->fecha_solicitud->format('d/m/Y');
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->modelo_vehiculo, $row->marca_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->fecha_creacion, $row->usuario_creacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	public function getMatenimientoSolicitudesByVehiculoID($itemID) {
		
		   $query = "SELECT mso.idmantenimiento_solicitudes, 
							mso.vehiculos_idvehiculos, 
							ve.placa_vehiculo,
							ve.sedes_idsedes,
							se.nombre_sede,
							mso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							mso.descripcion_solicitud, 
							mso.is_aprobado_solicitud,
							mso.estado_solicitud,
							DATE_FORMAT(mso.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
							mso.fecha_creacion,
							mso.usuario_creacion
					   FROM mantenimiento_solicitudes mso,
					   		vehiculos ve,
							usuarios usu,
							sedes se
					  WHERE mso.vehiculos_idvehiculos = ve.idvehiculos
					    AND ve.sedes_idsedes = se.idsedes
						AND mso.usuarios_idusuarios = usu.idusuarios
						AND mso.vehiculos_idvehiculos = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->fecha_creacion, $row->usuario_creacion);

			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	public function getSedeVehiculoSolicitudXsolicitudID($itemID) {
		
		   $query = "SELECT mso.idmantenimiento_solicitudes, 
							mso.vehiculos_idvehiculos, 
							ve.placa_vehiculo,
							ve.sedes_idsedes,
							se.nombre_sede,
							mso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							mso.descripcion_solicitud, 
							mso.is_aprobado_solicitud,
							mso.estado_solicitud,
							DATE_FORMAT(mso.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
							mso.fecha_creacion,
							mso.usuario_creacion
					   FROM mantenimiento_solicitudes mso,
					   		vehiculos ve,
							usuarios usu,
							sedes se
					  WHERE mso.vehiculos_idvehiculos = ve.idvehiculos
					    AND ve.sedes_idsedes = se.idsedes
						AND mso.usuarios_idusuarios = usu.idusuarios
						AND mso.idmantenimiento_solicitudes = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();

			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->fecha_creacion, $row->usuario_creacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
			
	}
	
	
	public function getServiciosXsolicitudID($itemID) {
		
			$query = "SELECT sxs.idservicios_x_solicitudes, 
							 sxs.idmantenimiento_solicitudes, 
							 msis.idmantenimiento_sistemas,
							 msis.nombre_sistema,
							 sxs.idmantenimiento_servicios, 
							 serv.nombre_servicio,
							 sxs.idmantenimiento_componentes, 
							 comp.nombre_componente,
							 sxs.idmantenimiento_tipos_servicios, 
							 tserv.tipo_servicio_mantenimiento,
							 sxs.is_alerta, 
							 sxs.idmantenimiento_alertas, 
							 aler.descripcion_alerta,
							 sxs.descripcion_problema,
							 sxs.fecha_creacion, 
							 sxs.usuario_creacion
					    FROM servicios_x_solicitudes AS sxs 
				  INNER JOIN mantenimiento_servicios AS serv
			  			  ON sxs.idmantenimiento_servicios = serv.idmantenimiento_servicios
			      INNER JOIN mantenimiento_componentes AS comp 
			  			  ON sxs.idmantenimiento_componentes = comp.idmantenimiento_componentes
				  INNER JOIN mantenimiento_tipos_servicios AS tserv 
			  			  ON sxs.idmantenimiento_tipos_servicios = tserv.idmantenimiento_tipos_servicios
				  INNER JOIN mantenimiento_sistemas AS msis 
			  			  ON serv.idmantenimiento_sistemas = msis.idmantenimiento_sistemas	  
				   LEFT JOIN mantenimiento_alertas AS aler 
						  ON sxs.idmantenimiento_alertas = aler.idmantenimiento_alertas
					   WHERE sxs.idmantenimiento_solicitudes = ?";
					   
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_x_solicitudes, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->idmantenimiento_alertas, $row->descripcion_alerta, $row->descripcion_problema, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idservicios_x_solicitudes, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->idmantenimiento_alertas, $row->descripcion_alerta, $row->descripcion_problema, $row->fecha_creacion, $row->usuario_creacion);

			}			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	public function deleteServicioXsolicitud($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM servicios_x_solicitudes WHERE idservicios_x_solicitudes = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function getMatenimientoSolicitudByID($itemID) {
		
		   $query = "SELECT mso.idmantenimiento_solicitudes, 
							mso.vehiculos_idvehiculos, 
							ve.placa_vehiculo,
							ve.sedes_idsedes,
							se.nombre_sede,
							mso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							mso.descripcion_solicitud, 
							mso.is_aprobado_solicitud,
							mso.estado_solicitud,
							DATE_FORMAT(mso.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
							mso.fecha_creacion,
							mso.usuario_creacion
					   FROM mantenimiento_solicitudes mso,
					   		vehiculos ve,
							usuarios usu,
							sedes se
					  WHERE mso.vehiculos_idvehiculos = ve.idvehiculos
					    AND ve.sedes_idsedes = se.idsedes
						AND mso.usuarios_idusuarios = usu.idusuarios
						AND mso.idmantenimiento_solicitudes = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->fecha_creacion, $row->usuario_creacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	
	
	public function createServicioXsolicitud($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_x_solicitudes (idmantenimiento_solicitudes, idmantenimiento_servicios, idmantenimiento_componentes, idmantenimiento_tipos_servicios, idmantenimiento_alertas, descripcion_problema, is_alerta, estado_servicio_x_solicitud, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiiisssss', $item->idmantenimiento_solicitudes, $item->idmantenimiento_servicios, $item->idmantenimiento_componentes, $item->idmantenimiento_tipos_servicios, $item->idmantenimiento_alertas, $item->descripcion_problema, $item->is_alerta, $item->estado_servicio_x_solicitud, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	public function createMatenimientoSolicitud($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_solicitudes (vehiculos_idvehiculos, usuarios_idusuarios, descripcion_solicitud, is_aprobado_solicitud, estado_solicitud, fecha_solicitud, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iisiisss', $item->vehiculos_idvehiculos, $item->usuarios_idusuarios, $item->descripcion_solicitud, $item->is_aprobado_solicitud, $item->estado_solicitud, $item->fecha_solicitud , $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMatenimientoSolicitud($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_solicitudes SET vehiculos_idvehiculos=?, usuarios_idusuarios=?, descripcion_solicitud=?,  fecha_solicitud=?, fecha_modificacion=?, usuario_modificacion=? WHERE idmantenimiento_solicitudes=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iissssi', $item->vehiculos_idvehiculos, $item->usuarios_idusuarios, $item->descripcion_solicitud, $item->fecha_solicitud, $item->fecha_modificacion, $item->usuario_modificacion, $item->idmantenimiento_solicitudes);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteMatenimientoSolicitud($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_solicitudes WHERE idmantenimiento_solicitudes = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_solicitudes");
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
