<?php

class OrdenTrabajoService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllOrdenTrabajo($settings = array()) {
		
		$desde =  (isset($settings["desde"]))? $settings["desde"] : "";
		$hasta =  (isset($settings["hasta"]))? $settings["hasta"] : "";
		$idsedes =  (isset($settings["idsedes"]))? $settings["idsedes"] : "";
		$idvehiculos =  (isset($settings["idvehiculos"]))? $settings["idvehiculos"] : "";
		
		
		//ORDEN DE LAS COLUMNAS
		if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
		if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
		if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
		
		
		$query = "SELECT ot.idorden_trabajo, 
						 ot.idmantenimiento_evaluaciones, 
						 ot.nro_orden_sigap, 
						 ot.kilometraje_internamiento,
						 me.descripcion_evaluacion,
						 me.is_aprobado_evaluacion,
						 DATE_FORMAT(me.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
						 me.estado_evaluacion,
						 ms.idmantenimiento_solicitudes,
						 ms.descripcion_solicitud,
						 ms.is_aprobado_solicitud,
						 ms.estado_solicitud,
						 DATE_FORMAT(ms.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
						 ms.vehiculos_idvehiculos,
						 ve.descripcion_vehiculo,
						 ve.placa_vehiculo,
						 ve.sedes_idsedes,
						 se.nombre_sede,
						 ot.usuarios_idusuarios, 
						 us.nombres,
						 us.apellidos,
						 ot.descripcion_orden_trabajo, 
						 DATE_FORMAT(ot.fecha_orden_trabajo, '%d/%m/%Y') as fecha_orden_trabajo,
						 DATE_FORMAT(ot.fecha_estimada_inicio, '%d/%m/%Y') as fecha_estimada_inicio,
						 DATE_FORMAT(ot.fecha_estimada_fin, '%d/%m/%Y') as fecha_estimada_fin,
						 ot.is_aprobado_orden_trabajo,
						 ot.estado_orden_trabajo, 
						 ot.fecha_creacion, 
						 ot.usuario_creacion, 
						 ot.fecha_modificacion, 
						 ot.usuario_modificacion
					FROM orden_trabajo ot,
						 mantenimiento_evaluaciones me,
						 mantenimiento_solicitudes ms,
						 vehiculos ve,
						 sedes se,
						 usuarios us
				   WHERE ot.idmantenimiento_evaluaciones = me.idmantenimiento_evaluaciones
				     AND me.idmantenimiento_solicitudes = ms.idmantenimiento_solicitudes
					 AND ms.vehiculos_idvehiculos = ve.idvehiculos
					 AND ve.sedes_idsedes = se.idsedes
					 AND ot.usuarios_idusuarios = us.idusuarios ";					 
			
			
			if(!empty($settings['search']['value'])) 
			{
				$query .= " AND (se.nombre_sede LIKE '%".$settings['search']['value']."%' OR ms.descripcion_solicitud LIKE '%".$settings['search']['value']."%' OR ve.placa_vehiculo LIKE '%".$settings['search']['value']."%' OR me.nro_orden_sigap LIKE '%".$settings['search']['value']."%' ) ";
			}
			
			if($idsedes != "all" && !empty($idsedes))
			{
				$query .= " AND ve.sedes_idsedes = '$idsedes'";
			}
			
			if($idsedes != "all" && !empty($idvehiculos))
			{
				$query .= " AND ms.vehiculos_idvehiculos = '$idvehiculos'";
			}
			
			if($desde != "" && $hasta != "")
			{
				$query .= " AND ot.fecha_orden_trabajo >= '$desde' AND ot.fecha_orden_trabajo <= '$hasta' ";
			}
			
			if (isset($order_by) && isset($order_dir))
			{
				if($order_by == "fecha_orden_trabajo")
					$query .= " ORDER BY ot.fecha_orden_trabajo " .  $order_dir ;
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
			
			mysqli_stmt_bind_result($stmt, $row->idorden_trabajo, $row->idmantenimiento_evaluaciones, $row->nro_orden_sigap, $row->kilometraje_internamiento, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_orden_trabajo, $row->fecha_orden_trabajo, $row->fecha_estimada_inicio, $row->fecha_estimada_fin, $row->is_aprobado_orden_trabajo, $row->estado_orden_trabajo, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idorden_trabajo, $row->idmantenimiento_evaluaciones, $row->nro_orden_sigap, $row->kilometraje_internamiento, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_orden_trabajo, $row->fecha_orden_trabajo, $row->fecha_estimada_inicio, $row->fecha_estimada_fin, $row->is_aprobado_orden_trabajo, $row->estado_orden_trabajo, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}
	
	
	public function getOrdenesTrabajosByVehiculoID($itemID) {
		
		$query = "SELECT ot.idorden_trabajo, 
						 ot.idmantenimiento_evaluaciones, 
						 me.descripcion_evaluacion,
						 me.is_aprobado_evaluacion,
						 DATE_FORMAT(me.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
						 me.estado_evaluacion,
						 ms.idmantenimiento_solicitudes,
						 ms.descripcion_solicitud,
						 ms.is_aprobado_solicitud,
						 ms.estado_solicitud,
						 DATE_FORMAT(ms.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
						 ms.vehiculos_idvehiculos,
						 ve.descripcion_vehiculo,
						 ve.placa_vehiculo,
						 ve.sedes_idsedes,
						 se.nombre_sede,
						 ot.usuarios_idusuarios, 
						 us.nombres,
						 us.apellidos,
						 ot.descripcion_orden_trabajo, 
						 DATE_FORMAT(ot.fecha_orden_trabajo, '%d/%m/%Y') as fecha_orden_trabajo,
						 DATE_FORMAT(ot.fecha_estimada_inicio, '%d/%m/%Y') as fecha_estimada_inicio,
						 DATE_FORMAT(ot.fecha_estimada_fin, '%d/%m/%Y') as fecha_estimada_fin,
						 ot.is_aprobado_orden_trabajo,
						 ot.estado_orden_trabajo, 
						 ot.fecha_creacion, 
						 ot.usuario_creacion, 
						 ot.fecha_modificacion, 
						 ot.usuario_modificacion
					FROM orden_trabajo ot,
						 mantenimiento_evaluaciones me,
						 mantenimiento_solicitudes ms,
						 vehiculos ve,
						 sedes se,
						 usuarios us
				   WHERE ot.idmantenimiento_evaluaciones = me.idmantenimiento_evaluaciones
				     AND me.idmantenimiento_solicitudes = ms.idmantenimiento_solicitudes
					 AND ms.vehiculos_idvehiculos = ve.idvehiculos
					 AND ve.sedes_idsedes = se.idsedes
					 AND ot.usuarios_idusuarios = us.idusuarios
					 AND ms.vehiculos_idvehiculos = ?";					 
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idorden_trabajo, $row->idmantenimiento_evaluaciones, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_orden_trabajo, $row->fecha_orden_trabajo, $row->fecha_estimada_inicio, $row->fecha_estimada_fin, $row->is_aprobado_orden_trabajo, $row->estado_orden_trabajo, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idorden_trabajo, $row->idmantenimiento_evaluaciones, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_orden_trabajo, $row->fecha_orden_trabajo, $row->fecha_estimada_inicio, $row->fecha_estimada_fin, $row->is_aprobado_orden_trabajo, $row->estado_orden_trabajo, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
		
	}
	
	
	public function getTotalMensualOrdenesTrabajoByIDSedes($idsede, $mes, $anno) {
		 
		   $query = "SELECT MONTH(txe.fecha_trabajo_ejecutado) as mes_ot,
							YEAR(txe.fecha_trabajo_ejecutado) as anno_ot,
							SUM(exs.costo_accion)  AS importe_total_ot
					   FROM servicios_x_solicitudes AS sxs 
				 INNER JOIN evaluaciones_x_servicios AS exs 
						 ON sxs.idservicios_x_solicitudes = exs.idservicios_x_solicitudes
				 INNER JOIN mantenimiento_solicitudes AS maso 
				 		 ON sxs.idmantenimiento_solicitudes = maso.idmantenimiento_solicitudes
				 INNER JOIN vehiculos AS ve
				 		 ON ve.idvehiculos = maso.vehiculos_idvehiculos
				  LEFT JOIN trabajos_x_evaluaciones AS txe 
						 ON exs.idevaluaciones_x_servicios = txe.idevaluaciones_x_servicios	
					  WHERE txe.fecha_trabajo_ejecutado is not null
					  	AND ve.sedes_idsedes = '$idsede'
						AND MONTH(txe.fecha_trabajo_ejecutado) = '$mes'
						AND YEAR(txe.fecha_trabajo_ejecutado) = '$anno'
				   GROUP BY mes_ot";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			
			mysqli_stmt_bind_result($stmt, $row->mes_ot, $row->anno_ot, $row->importe_total_ot);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$records[] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->mes_ot, $row->anno_ot, $row->importe_total_ot);
				  
			}
	   
			return $records;
		
	}
	
	
	public function getEvaluacionesByVehiculoID($itemID) {
		
		   $query = "SELECT mso.idmantenimiento_solicitudes, 
							mso.vehiculos_idvehiculos, 
							ve.placa_vehiculo,
							ve.sedes_idsedes,
							se.nombre_sede,
							mev.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							mso.descripcion_solicitud, 
							mso.is_aprobado_solicitud,
							mso.estado_solicitud,
							DATE_FORMAT(mso.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
							mev.idmantenimiento_evaluaciones,
							mev.descripcion_evaluacion,
							mev.is_aprobado_evaluacion,
							DATE_FORMAT(mev.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
							mev.estado_evaluacion
					   FROM mantenimiento_solicitudes mso,
					        mantenimiento_evaluaciones mev,
					   		vehiculos ve,
							usuarios usu,
							sedes se
					  WHERE mso.vehiculos_idvehiculos = ve.idvehiculos
					    AND ve.sedes_idsedes = se.idsedes
						AND mso.usuarios_idusuarios = usu.idusuarios
						AND mev.idmantenimiento_solicitudes = mso.idmantenimiento_solicitudes
						AND mso.vehiculos_idvehiculos = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->idmantenimiento_evaluaciones, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_solicitudes, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->idmantenimiento_evaluaciones, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion);

			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	/****************************************/
	/*   DATATABLE DE REGISTRAR EJECUCION   */
	/****************************************/
	public function getEjecucionesXordenTrabajoID($itemID) {
					
			$query = "SELECT exs.idevaluaciones_x_servicios,
							 exs.idmantenimiento_evaluaciones,
							 exs.descripcion_diagnostico,
							 exs.descripcion_accion,
							 exs.costo_accion,
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
							 txe.idtrabajos_x_evaluaciones,
							 txe.calificacion_trabajo_ejecutado,
							 txe.comentarios_trabajo_ejecutado,
							 txe.porcentaje_trabajo_ejecutado,
							 txe.se_ejecuto_trabajo,
							 txe.motivo_no_ejecuto,
							 DATE_FORMAT(txe.fecha_trabajo_ejecutado, '%d/%m/%Y') as fecha_trabajo_ejecutado,
							 txe.estado_trabajo_x_evaluacion
					    FROM servicios_x_solicitudes AS sxs 
				  INNER JOIN mantenimiento_servicios AS serv
			  			  ON sxs.idmantenimiento_servicios = serv.idmantenimiento_servicios
			      INNER JOIN mantenimiento_componentes AS comp 
			  			  ON sxs.idmantenimiento_componentes = comp.idmantenimiento_componentes
				  INNER JOIN mantenimiento_tipos_servicios AS tserv 
			  			  ON sxs.idmantenimiento_tipos_servicios = tserv.idmantenimiento_tipos_servicios
				  INNER JOIN mantenimiento_sistemas AS msis 
			  			  ON serv.idmantenimiento_sistemas = msis.idmantenimiento_sistemas	 	   
				  INNER JOIN evaluaciones_x_servicios AS exs 
						  ON sxs.idservicios_x_solicitudes = exs.idservicios_x_solicitudes
				  INNER JOIN trabajos_x_evaluaciones AS txe 
						  ON exs.idevaluaciones_x_servicios = txe.idevaluaciones_x_servicios	
				  INNER JOIN orden_trabajo AS ot 
						  ON txe.idorden_trabajo = ot.idorden_trabajo			  	  
					   WHERE ot.idorden_trabajo = ?";
					   
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones, $row->descripcion_diagnostico, $row->descripcion_accion, $row->costo_accion, $row->estado_evaluacion_x_servicio, $row->idservicios_x_solicitudes, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->descripcion_problema, $row->idtrabajos_x_evaluaciones, $row->calificacion_trabajo_ejecutado, $row->comentarios_trabajo_ejecutado, $row->porcentaje_trabajo_ejecutado, $row->se_ejecuto_trabajo, $row->motivo_no_ejecuto, $row->fecha_trabajo_ejecutado, $row->estado_trabajo_x_evaluacion);
			
							 
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones, $row->descripcion_diagnostico, $row->descripcion_accion, $row->costo_accion, $row->estado_evaluacion_x_servicio, $row->idservicios_x_solicitudes, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->descripcion_problema, $row->idtrabajos_x_evaluaciones, $row->calificacion_trabajo_ejecutado, $row->comentarios_trabajo_ejecutado, $row->porcentaje_trabajo_ejecutado, $row->se_ejecuto_trabajo, $row->motivo_no_ejecuto, $row->fecha_trabajo_ejecutado, $row->estado_trabajo_x_evaluacion);

			}			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	
	public function getTrabajosXevaluacionesXsolicitudID($itemID) {

			$query = "SELECT exs.idevaluaciones_x_servicios, 
							 exs.idmantenimiento_evaluaciones, 
							 exs.idservicios_x_solicitudes, 
							 exs.talleres_idtalleres, 
							 tal.nombre_taller,
							 exs.descripcion_diagnostico, 
							 exs.descripcion_accion, 
							 exs.costo_accion, 
							 exs.es_cambio_componente, 
							 exs.motivo_cambio_componente, 
							 exs.es_taller_seleccionado, 
							 exs.motivo_taller_seleccionado, 
							 exs.estado_evaluacion_x_servicio, 
							 DATE_FORMAT(exs.fecha_aprobacion, '%d/%m/%Y') as fecha_aprobacion,
							 exs.usuario_aprobacion, 
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
							 txe.idtrabajos_x_evaluaciones,
							 txe.idorden_trabajo,
							 txe.calificacion_trabajo_ejecutado,
							 txe.comentarios_trabajo_ejecutado,
							 txe.porcentaje_trabajo_ejecutado,
							 txe.se_ejecuto_trabajo,
							 txe.motivo_no_ejecuto,
							 DATE_FORMAT(txe.fecha_trabajo_ejecutado, '%d/%m/%Y') as fecha_trabajo_ejecutado,
							 txe.estado_trabajo_x_evaluacion
					    FROM servicios_x_solicitudes AS sxs 
				  INNER JOIN mantenimiento_servicios AS serv
			  			  ON sxs.idmantenimiento_servicios = serv.idmantenimiento_servicios
			      INNER JOIN mantenimiento_componentes AS comp 
			  			  ON sxs.idmantenimiento_componentes = comp.idmantenimiento_componentes
				  INNER JOIN mantenimiento_tipos_servicios AS tserv 
			  			  ON sxs.idmantenimiento_tipos_servicios = tserv.idmantenimiento_tipos_servicios
				  INNER JOIN mantenimiento_sistemas AS msis 
			  			  ON serv.idmantenimiento_sistemas = msis.idmantenimiento_sistemas	 	   
				  INNER JOIN evaluaciones_x_servicios AS exs 
						  ON sxs.idservicios_x_solicitudes = exs.idservicios_x_solicitudes
				  INNER JOIN talleres tal
				  		  ON exs.talleres_idtalleres = tal.idtalleres  
				   LEFT JOIN trabajos_x_evaluaciones AS txe 
						  ON exs.idevaluaciones_x_servicios = txe.idevaluaciones_x_servicios	
					   WHERE exs.idmantenimiento_evaluaciones = ?
					     AND exs.es_taller_seleccionado = 1";
					   
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			
			mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones, $row->idservicios_x_solicitudes, $row->talleres_idtalleres, $row->nombre_taller, $row->descripcion_diagnostico,  $row->descripcion_accion, $row->costo_accion, $row->es_cambio_componente, $row->motivo_cambio_componente, $row->es_taller_seleccionado, $row->motivo_taller_seleccionado, $row->estado_evaluacion_x_servicio, $row->fecha_aprobacion, $row->usuario_aprobacion, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio,$row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->descripcion_problema, $row->idtrabajos_x_evaluaciones, $row->idorden_trabajo, $row->calificacion_trabajo_ejecutado, $row->comentarios_trabajo_ejecutado, $row->porcentaje_trabajo_ejecutado, $row->se_ejecuto_trabajo, $row->motivo_no_ejecuto, $row->fecha_trabajo_ejecutado, $row->estado_trabajo_x_evaluacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones, $row->idservicios_x_solicitudes, $row->talleres_idtalleres, $row->nombre_taller, $row->descripcion_diagnostico,  $row->descripcion_accion, $row->costo_accion, $row->es_cambio_componente, $row->motivo_cambio_componente, $row->es_taller_seleccionado, $row->motivo_taller_seleccionado, $row->estado_evaluacion_x_servicio, $row->fecha_aprobacion, $row->usuario_aprobacion, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio,$row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->descripcion_problema, $row->idtrabajos_x_evaluaciones, $row->idorden_trabajo, $row->calificacion_trabajo_ejecutado, $row->comentarios_trabajo_ejecutado, $row->porcentaje_trabajo_ejecutado, $row->se_ejecuto_trabajo, $row->motivo_no_ejecuto, $row->fecha_trabajo_ejecutado, $row->estado_trabajo_x_evaluacion);

			}			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	public function deleteTrabajosXevaluaciones($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM trabajos_x_evaluaciones WHERE idtrabajos_x_evaluaciones = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function getOrdenTrabajoByID($itemID) {
		
		$query = "SELECT ot.idorden_trabajo, 
						 ot.idmantenimiento_evaluaciones, 
						 ot.nro_orden_sigap, 
						 ot.kilometraje_internamiento,
						 me.descripcion_evaluacion,
						 me.is_aprobado_evaluacion,
						 DATE_FORMAT(me.fecha_evaluacion, '%d/%m/%Y') as fecha_evaluacion,
						 me.estado_evaluacion,
						 ms.idmantenimiento_solicitudes,
						 ms.descripcion_solicitud,
						 ms.is_aprobado_solicitud,
						 ms.estado_solicitud,
						 DATE_FORMAT(ms.fecha_solicitud, '%d/%m/%Y') as fecha_solicitud,
						 ms.vehiculos_idvehiculos,
						 ve.descripcion_vehiculo,
						 ve.placa_vehiculo,
						 ve.sedes_idsedes,
						 se.nombre_sede,
						 ot.usuarios_idusuarios, 
						 us.nombres,
						 us.apellidos,
						 ot.descripcion_orden_trabajo, 
						 DATE_FORMAT(ot.fecha_orden_trabajo, '%d/%m/%Y') as fecha_orden_trabajo,
						 DATE_FORMAT(ot.fecha_estimada_inicio, '%d/%m/%Y') as fecha_estimada_inicio,
						 DATE_FORMAT(ot.fecha_estimada_fin, '%d/%m/%Y') as fecha_estimada_fin,
 						 ot.is_aprobado_orden_trabajo,
						 ot.estado_orden_trabajo, 
						 ot.fecha_creacion, 
						 ot.usuario_creacion, 
						 ot.fecha_modificacion, 
						 ot.usuario_modificacion
					FROM orden_trabajo ot,
						 mantenimiento_evaluaciones me,
						 mantenimiento_solicitudes ms,
						 vehiculos ve,
						 sedes se,
						 usuarios us
				   WHERE ot.idmantenimiento_evaluaciones = me.idmantenimiento_evaluaciones
				     AND me.idmantenimiento_solicitudes = ms.idmantenimiento_solicitudes
					 AND ms.vehiculos_idvehiculos = ve.idvehiculos
					 AND ve.sedes_idsedes = se.idsedes
					 AND ot.usuarios_idusuarios = us.idusuarios
					 AND ot.idorden_trabajo = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			
			mysqli_stmt_bind_result($stmt, $row->idorden_trabajo, $row->idmantenimiento_evaluaciones, $row->nro_orden_sigap, $row->kilometraje_internamiento, $row->descripcion_evaluacion, $row->is_aprobado_evaluacion, $row->fecha_evaluacion, $row->estado_evaluacion, $row->idmantenimiento_solicitudes, $row->descripcion_solicitud, $row->is_aprobado_solicitud, $row->estado_solicitud, $row->fecha_solicitud, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->descripcion_orden_trabajo, $row->fecha_orden_trabajo, $row->fecha_estimada_inicio, $row->fecha_estimada_fin, $row->is_aprobado_orden_trabajo, $row->estado_orden_trabajo, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTrabajosXevaluaciones($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO trabajos_x_evaluaciones (idorden_trabajo, idevaluaciones_x_servicios, estado_trabajo_x_evaluacion) VALUES (?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iii', $item->idorden_trabajo, $item->idevaluaciones_x_servicios, $item->estado_trabajo_x_evaluacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		return mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	
	public function createOrdenTrabajo($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO orden_trabajo (idmantenimiento_evaluaciones, usuarios_idusuarios, nro_orden_sigap, kilometraje_internamiento, descripcion_orden_trabajo, fecha_orden_trabajo, fecha_estimada_inicio, fecha_estimada_fin, is_aprobado_orden_trabajo, estado_orden_trabajo, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iisissssiiss', $item->idmantenimiento_evaluaciones, $item->usuarios_idusuarios, $item->nro_orden_sigap, $item->kilometraje_internamiento, $item->descripcion_orden_trabajo, $item->fecha_orden_trabajo, $item->fecha_estimada_inicio, $item->fecha_estimada_fin, $item->is_aprobado_orden_trabajo, $item->estado_orden_trabajo, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
		return array("idordentrabajo" => $autoid , "idevaluaciones" => $item->idmantenimiento_evaluaciones);
	}
	

	public function updateTrabajosXevaluaciones($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE trabajos_x_evaluaciones SET calificacion_trabajo_ejecutado=?, comentarios_trabajo_ejecutado=?, porcentaje_trabajo_ejecutado=?, se_ejecuto_trabajo=?, motivo_no_ejecuto=?, fecha_trabajo_ejecutado=? WHERE idtrabajos_x_evaluaciones=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isiissi', $item->calificacion_trabajo_ejecutado, $item->comentarios_trabajo_ejecutado, $item->porcentaje_trabajo_ejecutado, $item->se_ejecuto_trabajo, $item->motivo_no_ejecuto, $item->fecha_trabajo_ejecutado, $item->idtrabajos_x_evaluaciones);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}

	public function updateOrdenTrabajo($item) {
	
		$stmt = mysqli_prepare($this->connection, "UPDATE orden_trabajo SET idmantenimiento_evaluaciones=?, nro_orden_sigap=?, kilometraje_internamiento=?, descripcion_orden_trabajo=?, fecha_orden_trabajo=?, fecha_estimada_inicio=?, fecha_estimada_fin=?, fecha_modificacion=?, usuario_modificacion=? WHERE idorden_trabajo=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isissssssi', $item->idmantenimiento_evaluaciones, $item->nro_orden_sigap, $item->kilometraje_internamiento, $item->descripcion_orden_trabajo, $item->fecha_orden_trabajo, $item->fecha_estimada_inicio, $item->fecha_estimada_fin, $item->fecha_modificacion, $item->usuario_modificacion, $item->idorden_trabajo);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteOrdenTrabajo($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM orden_trabajo WHERE idorden_trabajo = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM orden_trabajo");
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
