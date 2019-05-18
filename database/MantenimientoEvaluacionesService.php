<?php

class MantenimientoEvaluacionesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMatenimientoEvaluaciones($settings = array()) {
		
		$desde =  (isset($settings["desde"]))? $settings["desde"] : "";
		$hasta =  (isset($settings["hasta"]))? $settings["hasta"] : "";
		$idsedes =  (isset($settings["idsedes"]))? $settings["idsedes"] : "";
		$idvehiculos =  (isset($settings["idvehiculos"]))? $settings["idvehiculos"] : "";
		
		//ORDEN DE LAS COLUMNAS
		if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
		if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
		if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
			
		$query = "SELECT meva.idmantenimiento_evaluaciones, 
						 meva.idmantenimiento_solicitudes, 
						 msol.descripcion_solicitud,
						 DATE_FORMAT(msol.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
						 msol.is_aprobado_solicitud,
						 msol.vehiculos_idvehiculos,
						 vehi.placa_vehiculo,
						 vehi.sedes_idsedes,
						 sede.nombre_sede,
						 meva.usuarios_idusuarios, 
						 usu.nombres,
						 usu.apellidos,
						 meva.descripcion_evaluacion, 						 
						 (SELECT COUNT(*) FROM evaluaciones_x_servicios WHERE idmantenimiento_evaluaciones = meva.idmantenimiento_evaluaciones AND es_evaluacion_aprobada = 1) as total_evaluaciones_aprobadas,						 
						 DATE_FORMAT(meva.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
						 meva.estado_evaluacion, 
						 meva.fecha_creacion, 
						 meva.usuario_creacion 
					FROM mantenimiento_evaluaciones meva,
						 mantenimiento_solicitudes msol,
						 vehiculos vehi,
						 sedes sede,
						 usuarios usu
				   WHERE meva.idmantenimiento_solicitudes = msol.idmantenimiento_solicitudes
				     AND msol.vehiculos_idvehiculos = vehi.idvehiculos
					 AND vehi.sedes_idsedes = sede.idsedes
					 AND meva.usuarios_idusuarios = usu.idusuarios ";
			
			if(!empty($settings['search']['value'])) 
			{
				$query .= " AND (sede.nombre_sede LIKE '%".$settings['search']['value']."%' OR msol.descripcion_solicitud LIKE '%".$settings['search']['value']."%' OR vehi.placa_vehiculo LIKE '%".$settings['search']['value']."%' ) ";
			}
			
			if($idsedes != "all" && !empty($idsedes))
			{
				$query .= " AND vehi.sedes_idsedes = '$idsedes'";
			}
			
			if($idvehiculos != "all" && !empty($idvehiculos)){
				$query .= " AND mso.vehiculos_idvehiculos = '$idvehiculos'";
			}
			
			if($desde != "" && $hasta != "")
			{
				$query .= " AND meva.fecha_evaluacion >= '$desde' AND meva.fecha_evaluacion <= '$hasta' ";
			}
			
			if (isset($order_by) && isset($order_dir))
			{
				if($order_by == "fecha_evaluacion")
				
					$query .= " ORDER BY meva.fecha_evaluacion " .  $order_dir ;
					
				else if($order_by == "fecha_solicitud")
				
					$query .= " ORDER BY msol.fecha_solicitud " .  $order_dir ;
					
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
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_evaluaciones, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->fecha_solicitud, $row->is_aprobado_solicitud, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres,  $row->apellidos, $row->descripcion_evaluacion, $row->total_evaluaciones_aprobadas, $row->fecha_evaluacion, $row->estado_evaluacion, $row->fecha_creacion, $row->usuario_creacion );
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_evaluaciones, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->fecha_solicitud, $row->is_aprobado_solicitud, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres,  $row->apellidos, $row->descripcion_evaluacion, $row->total_evaluaciones_aprobadas, $row->fecha_evaluacion, $row->estado_evaluacion, $row->fecha_creacion, $row->usuario_creacion );

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}
	
	
	public function getSedeVehiculoEvaluacionXevaluacionID($itemID) {
		
			$query = "SELECT me.idmantenimiento_evaluaciones, 
							 me.descripcion_evaluacion, 
							 ms.vehiculos_idvehiculos,
							 ve.placa_vehiculo,
							 ve.sedes_idsedes,
							 se.nombre_sede
						FROM mantenimiento_evaluaciones me,
							 mantenimiento_solicitudes ms,
							 vehiculos ve,
							 sedes se
					   WHERE me.idmantenimiento_solicitudes = ms.idmantenimiento_solicitudes
					     AND ms.vehiculos_idvehiculos = ve.idvehiculos
						 AND ve.sedes_idsedes = se.idsedes
						 AND me.idmantenimiento_evaluaciones = ?";

			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_evaluaciones, $row->descripcion_evaluacion, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
		
			
	}

	
	public function getEvaluacionesXserviciosXsolicitudID($settings) {
		
			if($settings['tipo_evaluacion_x_servicio'] == "total"){
				
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
									 sxs.descripcion_problema,
									 (SELECT COUNT(*) FROM evaluaciones_x_servicios WHERE idservicios_x_solicitudes = sxs.idservicios_x_solicitudes) as total_evaluaciones,
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
							   WHERE sxs.idmantenimiento_solicitudes = ?";
					   
			}else if($settings['tipo_evaluacion_x_servicio'] == "detalle"){
				
					$query = "SELECT exs.idevaluaciones_x_servicios,
									 exs.idmantenimiento_evaluaciones,
									 exs.talleres_idtalleres,
									 tal.nombre_taller,
									 exs.descripcion_diagnostico,
									 exs.descripcion_accion,
									 exs.costo_accion,
									 exs.es_cambio_componente, 
									 exs.motivo_cambio_componente, 
									 exs.es_taller_seleccionado, 
									 exs.motivo_taller_seleccionado, 
									 exs.fecha_aprobacion,		
									 exs.estado_evaluacion_x_servicio,							 
									 sxs.idservicios_x_solicitudes, 
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
						   LEFT JOIN evaluaciones_x_servicios AS exs 
								  ON sxs.idservicios_x_solicitudes = exs.idservicios_x_solicitudes
						  INNER JOIN talleres AS tal
								  ON exs.talleres_idtalleres = tal.idtalleres
							   WHERE sxs.idservicios_x_solicitudes = ?";
			
			}
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings['id']);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			if($settings['tipo_evaluacion_x_servicio'] == "total"){
				
					mysqli_stmt_bind_result($stmt, $row->idservicios_x_solicitudes,  $row->idmantenimiento_solicitudes,  $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios,  $row->nombre_servicio, $row->idmantenimiento_componentes,  $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta,  $row->descripcion_problema, $row->total_evaluaciones, $row->fecha_creacion,  $row->usuario_creacion);
				
			}else if($settings['tipo_evaluacion_x_servicio'] == "detalle"){
				
					mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones,  $row->talleres_idtalleres, $row->nombre_taller ,$row->descripcion_diagnostico, $row->descripcion_accion, $row->costo_accion, $row->es_cambio_componente, $row->motivo_cambio_componente, $row->es_taller_seleccionado, $row->motivo_taller_seleccionado, $row->fecha_aprobacion, $row->estado_evaluacion_x_servicio, $row->idservicios_x_solicitudes,  $row->idmantenimiento_solicitudes,  $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios,  $row->nombre_servicio, $row->idmantenimiento_componentes,  $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta,  $row->descripcion_problema, $row->fecha_creacion,  $row->usuario_creacion);
					
			}
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				 if($settings['tipo_evaluacion_x_servicio'] == "total"){
				
						mysqli_stmt_bind_result($stmt, $row->idservicios_x_solicitudes,  $row->idmantenimiento_solicitudes,  $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios,  $row->nombre_servicio, $row->idmantenimiento_componentes,  $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta,  $row->descripcion_problema, $row->total_evaluaciones, $row->fecha_creacion,  $row->usuario_creacion);
				
				}else if($settings['tipo_evaluacion_x_servicio'] == "detalle"){
			
						mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones,  $row->talleres_idtalleres, $row->nombre_taller ,$row->descripcion_diagnostico, $row->descripcion_accion, $row->costo_accion, $row->es_cambio_componente, $row->motivo_cambio_componente, $row->es_taller_seleccionado, $row->motivo_taller_seleccionado, $row->fecha_aprobacion, $row->estado_evaluacion_x_servicio, $row->idservicios_x_solicitudes,  $row->idmantenimiento_solicitudes,  $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios,  $row->nombre_servicio, $row->idmantenimiento_componentes,  $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta,  $row->descripcion_problema, $row->fecha_creacion,  $row->usuario_creacion);
			
			}

			}			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	public function deleteEvaluacionesXservicios($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM evaluaciones_x_servicios WHERE idevaluaciones_x_servicios = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	
	public function getMatenimientoEvaluacionesByVehiculoID($itemID) {
		
		$query = "SELECT meva.idmantenimiento_evaluaciones, 
						 meva.idmantenimiento_solicitudes, 
						 msol.descripcion_solicitud,
						 DATE_FORMAT(msol.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
						 msol.is_aprobado_solicitud,
						 msol.vehiculos_idvehiculos,
						 vehi.placa_vehiculo,
						 vehi.sedes_idsedes,
						 sede.nombre_sede,
						 meva.usuarios_idusuarios, 
						 usu.nombres,
						 usu.apellidos,
						 meva.descripcion_evaluacion, 
						 (SELECT COUNT(*) FROM evaluaciones_x_servicios WHERE idmantenimiento_evaluaciones = meva.idmantenimiento_evaluaciones AND es_evaluacion_aprobada = 1) as total_evaluaciones_aprobadas,
						 DATE_FORMAT(meva.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
						 meva.estado_evaluacion, 
						 meva.fecha_creacion, 
						 meva.usuario_creacion 
					FROM mantenimiento_evaluaciones meva,
						 mantenimiento_solicitudes msol,
						 vehiculos vehi,
						 sedes sede,
						 usuarios usu
				   WHERE meva.idmantenimiento_solicitudes = msol.idmantenimiento_solicitudes
				     AND msol.vehiculos_idvehiculos = vehi.idvehiculos
					 AND vehi.sedes_idsedes = sede.idsedes
					 AND meva.usuarios_idusuarios = usu.idusuarios
					 AND msol.vehiculos_idvehiculos = ?";
						
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_evaluaciones, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->fecha_solicitud, $row->is_aprobado_solicitud, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres,  $row->apellidos, $row->descripcion_evaluacion, $row->total_evaluaciones_aprobadas, $row->fecha_evaluacion, $row->estado_evaluacion, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_evaluaciones, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->fecha_solicitud, $row->is_aprobado_solicitud, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres,  $row->apellidos, $row->descripcion_evaluacion, $row->total_evaluaciones_aprobadas, $row->fecha_evaluacion, $row->estado_evaluacion, $row->fecha_creacion, $row->usuario_creacion);

			}			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
	}
	
	
	
	public function getMatenimientoEvaluacionByID($itemID) {
		
		$query = "SELECT meva.idmantenimiento_evaluaciones, 
						 meva.idmantenimiento_solicitudes, 
						 msol.descripcion_solicitud,
						 DATE_FORMAT(msol.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
						 msol.is_aprobado_solicitud,
						 msol.vehiculos_idvehiculos,
						 vehi.placa_vehiculo,
						 vehi.sedes_idsedes,
						 sede.nombre_sede,
						 meva.usuarios_idusuarios, 
						 usu.nombres,
						 usu.apellidos,
						 meva.descripcion_evaluacion, 
						 meva.is_aprobado_evaluacion,
						 DATE_FORMAT(meva.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
						 meva.estado_evaluacion, 
						 meva.fecha_creacion, 
						 meva.usuario_creacion 
					FROM mantenimiento_evaluaciones meva,
						 mantenimiento_solicitudes msol,
						 vehiculos vehi,
						 sedes sede,
						 usuarios usu
				   WHERE meva.idmantenimiento_solicitudes = msol.idmantenimiento_solicitudes
				     AND msol.vehiculos_idvehiculos = vehi.idvehiculos
					 AND vehi.sedes_idsedes = sede.idsedes
					 AND meva.usuarios_idusuarios = usu.idusuarios
					 AND meva.idmantenimiento_evaluaciones = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_evaluaciones, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->fecha_solicitud, $row->is_aprobado_solicitud, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres,  $row->apellidos, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion, $row->fecha_creacion, $row->usuario_creacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	
	
	public function createEvaluacionesXservicios($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO evaluaciones_x_servicios (idmantenimiento_evaluaciones, idservicios_x_solicitudes, talleres_idtalleres, descripcion_diagnostico, descripcion_accion, costo_accion, es_cambio_componente, motivo_cambio_componente, es_evaluacion_aprobada, es_taller_seleccionado, motivo_taller_seleccionado, estado_evaluacion_x_servicio,  fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiissdisiisiss', $item->idmantenimiento_evaluaciones, $item->idservicios_x_solicitudes, $item->talleres_idtalleres, $item->descripcion_diagnostico, $item->descripcion_accion, $item->costo_accion, $item->es_cambio_componente, $item->motivo_cambio_componente, $item->es_evaluacion_aprobada, $item->es_taller_seleccionado, $item->motivo_taller_seleccionado, $item->estado_evaluacion_x_servicio, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	
	public function createMatenimientoEvaluacion($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_evaluaciones (idmantenimiento_solicitudes, usuarios_idusuarios, descripcion_evaluacion, is_aprobado_evaluacion, fecha_evaluacion, estado_evaluacion, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iisisiss', $item->idmantenimiento_solicitudes, $item->usuarios_idusuarios, $item->descripcion_evaluacion, $item->is_aprobado_evaluacion, $item->fecha_evaluacion, $item->estado_evaluacion, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
		return array("idevaluacion" => $autoid , "idsolicitud" => $item->idmantenimiento_solicitudes);
		
	}



	public function updateMatenimientoEvaluacion($item) {
	
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_evaluaciones SET descripcion_evaluacion=?, is_aprobado_evaluacion=?, fecha_evaluacion=?, fecha_modificacion=?, usuario_modificacion=? WHERE idmantenimiento_evaluaciones=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sisssi', $item->descripcion_evaluacion, $item->is_aprobado_evaluacion, $item->fecha_evaluacion, $item->fecha_modificacion, $item->usuario_modificacion, $item->idmantenimiento_evaluaciones);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	
	public function updateEvaluacionesXservicios($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE evaluaciones_x_servicios SET idmantenimiento_evaluaciones=?, idservicios_x_solicitudes=?, talleres_idtalleres=?, descripcion_diagnostico=?, descripcion_accion=?, costo_accion=?, es_cambio_componente=?, motivo_cambio_componente=?, es_taller_seleccionado=?, motivo_taller_seleccionado=?, fecha_modificacion=?, usuario_modificacion=? WHERE idevaluaciones_x_servicios=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiissdisisssi', $item->idmantenimiento_evaluaciones, $item->idservicios_x_solicitudes, $item->talleres_idtalleres, $item->descripcion_diagnostico, $item->descripcion_accion, $item->costo_accion, $item->es_cambio_componente, $item->motivo_cambio_componente, $item->es_taller_seleccionado, $item->motivo_taller_seleccionado, $item->fecha_modificacion, $item->usuario_modificacion, $item->idevaluaciones_x_servicios);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	
	public function aprobarEvaluacionXservicio($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE evaluaciones_x_servicios SET es_evaluacion_aprobada=?, es_taller_seleccionado=?, motivo_taller_seleccionado=?, usuario_aprobacion=?, fecha_aprobacion=? WHERE idevaluaciones_x_servicios=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iisssi', $item->es_evaluacion_aprobada, $item->es_taller_seleccionado, $item->motivo_taller_seleccionado, $item->usuario_aprobacion, $item->fecha_aprobacion, $item->idevaluaciones_x_servicios);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	


	public function deleteMatenimientoEvaluacion($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_evaluaciones WHERE idmantenimiento_evaluaciones = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_evaluaciones");
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
