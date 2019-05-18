<?php

require_once('MailerService.php');

class ServiciosSolicitudService {
	
	var $connection;
	var $mailer; 
	
	public function __construct() {
		include("connect.php");
		//include('MailerService.php'); 
	    $this->connection = $db;
		$this->mailer = new MailerService(); 
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllServicioSolicitud($settings = array()) {
		
			 $desde = $settings["desde"];
			 $hasta = $settings["hasta"];
			
			 $idchofer = $settings["idchofer"];
			 $idvehiculos = $settings["idvehiculos"];
			 
			 //ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
		
		   $query = "SELECT seso.idservicio_solicitud, 
		   					seso.chofer_idchofer, 
							CONCAT(cho.nombres_chofer, ' ' ,cho.apellidos_chofer) as nombre_chofer,
							seso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							usu.prioridad,
							are.nombre_area,
							seso.vehiculos_idvehiculos, 
							ve.color_calendario,
							ve.placa_vehiculo,
							seso.idtipos_vehiculo, 
							tive.tipo_vehiculo,
							seso.ubigeo_idubigeo, 
							ubi.cod_ubigeo,
							ubi.departamento,
							ubi.provincia,
							ubi.distrito,
							seso.lugar_destino, 
							seso.direccion_destino, 
							seso.usuario_chofer, 
							seso.usuario_solicita, 
							seso.motivo_comision, 
							seso.idevent, 
							seso.fecha_inicio, 
							seso.start_date, 
							seso.fecha_fin, 
							seso.end_date, 
							seso.es_ida_vuelta, 
							seso.es_aprobado, 
							seso.es_asignado,
							seso.es_vale,
							seso.es_cancelado, 
							seso.es_finalizado, 
							(SELECT COUNT(*) FROM servicios_cierre_chofer WHERE idservicio_solicitud = seso.idservicio_solicitud) AS existe_cierre, 
							(SELECT COUNT(*) FROM servicios_cierre_usuario WHERE idservicio_solicitud = seso.idservicio_solicitud) AS existe_calificacion, 
							(SELECT calificacion_usuario FROM servicios_cierre_usuario WHERE idservicio_solicitud = seso.idservicio_solicitud) AS calificacion,
							seso.estado_servicio_solicitud, 
							seso.fecha_creacion, 
							seso.usuario_creacion, 
							seso.fecha_modificacion, 
							seso.usuario_modificacion
					   FROM servicios_solicitud AS seso
			     INNER JOIN ubigeo AS ubi
				         ON seso.ubigeo_idubigeo = ubi.idubigeo
				 INNER JOIN tipo_vehiculo AS tive
				 		 ON seso.idtipos_vehiculo = tive.idtipos_vehiculo
				 INNER JOIN usuarios AS usu
				 		 ON seso.usuarios_idusuarios = usu.idusuarios 
				 INNER JOIN areas AS are
				 		 ON usu.areas_idareas = are.idareas	 	 
				  LEFT JOIN vehiculos AS ve
				  		 ON seso.vehiculos_idvehiculos = ve.idvehiculos
				  LEFT JOIN chofer AS cho
				  		 ON seso.chofer_idchofer = cho.idchofer 
				      WHERE seso.estado_servicio_solicitud = 1 ";
			
			
			if($idchofer != "all" && !empty($idchofer)){
				$query .= " AND seso.chofer_idchofer = '$idchofer'";
			}	
			
			if($idvehiculos != "all" && !empty($idvehiculos)){
				$query .= " AND seso.vehiculos_idvehiculos = '$idvehiculos'";
			}
			
			if($desde != "" && $hasta != ""){
				$query .= " AND seso.fecha_creacion >= '$desde' AND seso.fecha_creacion <= '$hasta' ";
			}

			if( !empty($settings['search']['value']) ) 
			{
				$query .= " AND (ve.placa_vehiculo LIKE '%".$settings['search']['value']."%' OR seso.motivo_comision LIKE '%".$settings['search']['value']."%' OR seso.lugar_destino LIKE '%".$settings['search']['value']."%' OR usu.nombres LIKE '%".$settings['search']['value']."%' OR usu.apellidos LIKE '%".$settings['search']['value']."%' OR cho.nombres_chofer LIKE '%".$settings['search']['value']."%' OR cho.apellidos_chofer LIKE '%".$settings['search']['value']."%') ";
			}
						
			if (isset($order_by) && isset($order_dir))
			{
				$query .= " ORDER BY " . $order_by ." " .  $order_dir ;
			}
						
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT " . mysqli_real_escape_string( $this->connection, $settings['start'] ).", " . mysqli_real_escape_string( $this->connection, $settings['length'] );
			}  
						 
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			//MUESTRA EL TOTAL FILTRADOS
			$totalFiltered = (empty($settings['search']['value']))? $settings['recordsTotal'] : $stmt->store_result();
					
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicio_solicitud, $row->chofer_idchofer, $row->nombre_chofer, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->prioridad, $row->nombre_area, $row->vehiculos_idvehiculos, $row->color_calendario, $row->placa_vehiculo, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->ubigeo_idubigeo, $row->cod_ubigeo, $row->departamento, $row->provincia, $row->distrito, $row->lugar_destino, $row->direccion_destino, $row->usuario_chofer, $row->usuario_solicita, $row->motivo_comision, $row->idevent, $row->fecha_inicio, $row->start_date, $row->fecha_fin, $row->end_date, $row->es_ida_vuelta, $row->es_aprobado, $row->es_asignado, $row->es_vale, $row->es_cancelado, $row->es_finalizado, $row->existe_cierre, $row->existe_calificacion, $row->calificacion, $row->estado_servicio_solicitud, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			  
			while (mysqli_stmt_fetch($stmt)) {
				
				  $row->fecha_inicio = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_inicio);
				  $row->fecha_inicio = $row->fecha_inicio->format('d/m/Y - H:i');
				  
				  $row->fecha_fin = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_fin);
				  $row->fecha_fin = $row->fecha_fin->format('d/m/Y - H:i');
				  
				  $row->fecha_creacion = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_creacion);
				  $row->fecha_creacion = $row->fecha_creacion->format('d/m/Y - H:i');
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idservicio_solicitud, $row->chofer_idchofer, $row->nombre_chofer, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->prioridad, $row->nombre_area, $row->vehiculos_idvehiculos, $row->color_calendario, $row->placa_vehiculo, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->ubigeo_idubigeo, $row->cod_ubigeo, $row->departamento, $row->provincia, $row->distrito, $row->lugar_destino, $row->direccion_destino, $row->usuario_chofer, $row->usuario_solicita, $row->motivo_comision, $row->idevent, $row->fecha_inicio, $row->start_date, $row->fecha_fin, $row->end_date, $row->es_ida_vuelta, $row->es_aprobado, $row->es_asignado, $row->es_vale, $row->es_cancelado, $row->es_finalizado, $row->existe_cierre, $row->existe_calificacion, $row->calificacion, $row->estado_servicio_solicitud, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}
	
	
	public function getAllEventsServicioSolicitud($range_start, $range_end, $idchofer, $idvehiculo) {
		
		   $query = "SELECT seso.idservicio_solicitud, 
		   					seso.chofer_idchofer, 
							CONCAT(cho.nombres_chofer, ' ' ,cho.apellidos_chofer) as nombre_chofer,
							seso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							usu.prioridad,
							are.nombre_area,
							seso.vehiculos_idvehiculos, 
							ve.color_calendario,
							ve.placa_vehiculo,
							seso.idtipos_vehiculo, 
							tive.tipo_vehiculo,
							seso.ubigeo_idubigeo, 
							ubi.cod_ubigeo,
							ubi.departamento,
							ubi.provincia,
							ubi.distrito,
							seso.lugar_destino, 
							seso.direccion_destino, 
							seso.usuario_chofer,
							seso.usuario_solicita, 
							seso.motivo_comision, 
							seso.idevent, 
							seso.fecha_inicio, 
							seso.start_date, 
							seso.fecha_fin, 
							seso.end_date, 
							seso.es_ida_vuelta, 
							seso.es_aprobado, 
							seso.es_cancelado,
							seso.es_asignado, 
							seso.es_vale,
							seso.es_espera, 
							seso.es_finalizado, 
							(SELECT COUNT(*) FROM servicios_cierre_chofer WHERE idservicio_solicitud = seso.idservicio_solicitud) AS existe_cierre, 
							(SELECT COUNT(*) FROM servicios_cierre_usuario WHERE idservicio_solicitud = seso.idservicio_solicitud) AS existe_calificacion, 
							seso.estado_servicio_solicitud, 
							seso.fecha_creacion, 
							seso.usuario_creacion, 
							seso.fecha_modificacion, 
							seso.usuario_modificacion
					   FROM servicios_solicitud AS seso
			     INNER JOIN ubigeo AS ubi
				         ON seso.ubigeo_idubigeo = ubi.idubigeo
				 INNER JOIN tipo_vehiculo AS tive
				 		 ON seso.idtipos_vehiculo = tive.idtipos_vehiculo
				 INNER JOIN usuarios AS usu
				 		 ON seso.usuarios_idusuarios = usu.idusuarios 
				 INNER JOIN areas AS are
				 		 ON usu.areas_idareas = are.idareas	 	 
				  LEFT JOIN vehiculos AS ve
				  		 ON seso.vehiculos_idvehiculos = ve.idvehiculos
				  LEFT JOIN chofer AS cho
				  		 ON seso.chofer_idchofer = cho.idchofer";
						 
						 
			if($range_start != "" && $range_end != ""){
				$query .= " WHERE seso.fecha_inicio >= CAST('$range_start' AS DATE) AND seso.fecha_fin <= CAST('$range_end' AS DATE) ";
			}
						 
			if( !empty($idchofer) ) 
			{
				$query .= " AND seso.chofer_idchofer = '$idchofer' ";
			}	
			
			if( !empty($idvehiculo) && $idvehiculo != "all") 
			{
				$query .= " AND seso.vehiculos_idvehiculos = '$idvehiculo'";
			}			 
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();

			$records = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicio_solicitud, $row->chofer_idchofer, $row->nombre_chofer, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->prioridad, $row->nombre_area, $row->vehiculos_idvehiculos, $row->color_calendario, $row->placa_vehiculo, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->ubigeo_idubigeo, $row->cod_ubigeo, $row->departamento, $row->provincia, $row->distrito, $row->lugar_destino, $row->direccion_destino, $row->usuario_chofer, $row->usuario_solicita, $row->motivo_comision, $row->idevent, $row->fecha_inicio, $row->start_date, $row->fecha_fin, $row->end_date, $row->es_ida_vuelta, $row->es_aprobado, $row->es_cancelado, $row->es_asignado, $row->es_vale, $row->es_espera, $row->es_finalizado, $row->existe_cierre, $row->existe_calificacion, $row->estado_servicio_solicitud, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			  
			while (mysqli_stmt_fetch($stmt)) {
				  
				  $row->title = $row->motivo_comision;
				  $row->id = $row->idevent;
				  $row->className = ($row->placa_vehiculo == NULL)? "bg-red-pink bg-font-red-pink border-red-pink" : "bg_".$row->placa_vehiculo;
				  $row->placa_vehiculo = ($row->placa_vehiculo == NULL)? "NO ASIGNADO" : $row->placa_vehiculo;
				  $row->nombre_chofer = ($row->nombre_chofer == NULL)? "NO ASIGNADO" : $row->nombre_chofer;
				  $row->es_ida_vuelta = ($row->es_ida_vuelta == 0)? "NO" : "SI";
				  $row->color = ($row->placa_vehiculo == NULL)? "#cccccc" : $row->color_calendario;
				  
				  $fecha_inicio = new DateTime($row->fecha_inicio, new DateTimeZone('America/Lima'));
				  $row->start =  $fecha_inicio->format(DateTime::ATOM);
				  
				  $fecha_fin = new DateTime($row->fecha_fin, new DateTimeZone('America/Lima'));
				  $row->end =  $fecha_fin->format(DateTime::ATOM);
				  
				  $row->fecha_inicio = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_inicio);
				  $row->fecha_inicio = $row->fecha_inicio->format('d/m/Y - H:i');
				  
				  $row->fecha_fin = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_fin);
				  $row->fecha_fin = $row->fecha_fin->format('d/m/Y - H:i');
				  				  
				  $row->es_asignado = ($row->es_asignado == 0)? "NO" : "SI";
				  $row->es_vale = ($row->es_vale == 0)? "NO" : "SI";
				  $row->es_espera = ($row->es_espera == 0)? "NO" : "SI";
				  $row->es_cancelado = ($row->es_cancelado == 0)? "NO" : "SI";
				  $row->es_finalizado = ($row->es_finalizado == 0)? "NO" : "SI";
		  
				  $records[] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idservicio_solicitud, $row->chofer_idchofer, $row->nombre_chofer, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->prioridad, $row->nombre_area, $row->vehiculos_idvehiculos, $row->color_calendario, $row->placa_vehiculo, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->ubigeo_idubigeo, $row->cod_ubigeo, $row->departamento, $row->provincia, $row->distrito, $row->lugar_destino, $row->direccion_destino, $row->usuario_chofer, $row->usuario_solicita, $row->motivo_comision, $row->idevent, $row->fecha_inicio, $row->start_date, $row->fecha_fin, $row->end_date, $row->es_ida_vuelta, $row->es_aprobado, $row->es_cancelado, $row->es_asignado, $row->es_vale, $row->es_espera, $row->es_finalizado, $row->existe_cierre, $row->existe_calificacion, $row->estado_servicio_solicitud, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return json_encode($records);
			
	}
	
	public function getServicioSolicitudByID($itemID) {
		
		   $query = "SELECT seso.idservicio_solicitud, 
		   					seso.chofer_idchofer, 
							CONCAT(cho.nombres_chofer, ' ' ,cho.apellidos_chofer) as nombre_chofer,
							seso.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							usu.prioridad,
							are.nombre_area,
							seso.vehiculos_idvehiculos, 
							ve.placa_vehiculo,
							seso.idtipos_vehiculo, 
							tive.tipo_vehiculo,
							seso.ubigeo_idubigeo, 
							ubi.cod_ubigeo,
							ubi.departamento,
							ubi.provincia,
							ubi.distrito,
							seso.lugar_destino, 
							seso.direccion_destino,
							seso.usuario_chofer, 
							seso.usuario_solicita, 
							seso.motivo_comision, 
							seso.idevent, 
							seso.fecha_inicio, 
							seso.start_date, 
							seso.fecha_fin, 
							seso.end_date, 
							seso.es_ida_vuelta, 
							seso.es_aprobado, 
							seso.es_asignado, 
							seso.es_vale,
							seso.es_cancelado,
							seso.es_finalizado, 
							(SELECT COUNT(*) FROM servicios_cierre_chofer WHERE idservicio_solicitud = seso.idservicio_solicitud) AS existe_cierre, 
							(SELECT COUNT(*) FROM servicios_cierre_usuario WHERE idservicio_solicitud = seso.idservicio_solicitud) AS existe_calificacion, 
							seso.estado_servicio_solicitud, 
							seso.fecha_creacion, 
							seso.usuario_creacion, 
							seso.fecha_modificacion, 
							seso.usuario_modificacion
					   FROM servicios_solicitud AS seso
			     INNER JOIN ubigeo AS ubi
				         ON seso.ubigeo_idubigeo = ubi.idubigeo
				 INNER JOIN tipo_vehiculo AS tive
				 		 ON seso.idtipos_vehiculo = tive.idtipos_vehiculo
				 INNER JOIN usuarios AS usu
				 		 ON seso.usuarios_idusuarios = usu.idusuarios 
				 INNER JOIN areas AS are
				 		 ON usu.areas_idareas = are.idareas	 	 
				  LEFT JOIN vehiculos AS ve
				  		 ON seso.vehiculos_idvehiculos = ve.idvehiculos
				  LEFT JOIN chofer AS cho
				  		 ON seso.chofer_idchofer = cho.idchofer
					  WHERE seso.idservicio_solicitud = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idservicio_solicitud, $row->chofer_idchofer, $row->nombre_chofer, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->prioridad, $row->nombre_area, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->ubigeo_idubigeo, $row->cod_ubigeo, $row->departamento, $row->provincia, $row->distrito, $row->lugar_destino, $row->direccion_destino, $row->usuario_chofer, $row->usuario_solicita, $row->motivo_comision, $row->idevent, $row->fecha_inicio, $row->start_date, $row->fecha_fin, $row->end_date, $row->es_ida_vuelta, $row->es_aprobado, $row->es_asignado, $row->es_vale, $row->es_cancelado, $row->es_finalizado, $row->existe_cierre, $row->existe_calificacion, $row->estado_servicio_solicitud, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
				
				  if($row->fecha_inicio != NULL){
					  $row->fecha_inicio_date = $row->fecha_inicio;
					  $fecha_inicio = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_inicio);
				  	  $row->fecha_inicio = $fecha_inicio->format('d/m/Y');
				  	  $row->hora_inicio = $fecha_inicio->format('H:i');
					 
				  }
				  
				  if($row->fecha_fin != NULL){
					  $row->fecha_fin_date = $row->fecha_fin;
					  $fecha_fin = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_fin);
				 	  $row->fecha_fin = $fecha_fin->format('d/m/Y');
				  	  $row->hora_fin = $fecha_fin->format('H:i');
					  
				  }
				  				  
			      return $row;
				  
			} else {
				
			  return 0;
			  
			}
	}
	
	
	public function getComisionadosServicio($settings = array()) {
		
		   $query = "SELECT seco.idservicios_comisionados, 
		   					seco.idservicio_solicitud, 
							seco.usuarios_idusuarios, 
							usu.nombres,
							usu.apellidos,
							CONCAT(usu.nombres, ' ', usu.apellidos) as nombre_comisionado,
							usu.email,
							seco.estado_comisionado, 
							seco.fecha_creacion, 
							seco.usuario_creacion
					   FROM servicios_comisionados seco,
					   		servicios_solicitud ss,
							usuarios usu	
					  WHERE seco.idservicio_solicitud = ss.idservicio_solicitud
					    AND seco.usuarios_idusuarios = usu.idusuarios
					    AND ss.idservicio_solicitud = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings['id']);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();

			if(empty($settings['search']['value'])) 
					$totalFiltered = $settings['recordsTotal']; 
			else 
					$totalFiltered = $stmt->store_result();
					
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_comisionados, $row->idservicio_solicitud, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->nombre_comisionado, $row->email, $row->estado_comisionado, $row->fecha_creacion, $row->usuario_creacion);
			  
			while (mysqli_stmt_fetch($stmt)) {
				
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idservicios_comisionados, $row->idservicio_solicitud, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->nombre_comisionado, $row->email, $row->estado_comisionado, $row->fecha_creacion, $row->usuario_creacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}
	
	public function getEstadosServicio($settings = array()) {
		
		   $query = "SELECT sees.idservicios_estados, 
		   					sees.idservicio_solicitud, 
							sees.estado_servicio, 
							sees.observaciones_estado, 
							sees.fecha_creacion, 
							sees.usuario_creacion, 
							sees.fecha_modificacion, 
							sees.usuario_modificacion
					   FROM servicios_estados sees,
					   		servicios_solicitud ss
					  WHERE sees.idservicio_solicitud = ss.idservicio_solicitud
					    AND ss.idservicio_solicitud = ?
				   ORDER BY sees.fecha_creacion ASC";
						 
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings['id']);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();

			if(empty($settings['search']['value'])) 
					$totalFiltered = $settings['recordsTotal']; 
			else 
					$totalFiltered = $stmt->store_result();
					
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_estados, $row->idservicio_solicitud, $row->estado_servicio, $row->observaciones_estado, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			  
			while (mysqli_stmt_fetch($stmt)) {
				
				  if($row->fecha_creacion != NULL){
					  $fecha_creacion = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_creacion);
				  	  $row->fecha_creacion = $fecha_creacion->format('d/m/Y H:i:s');
				  }
				  
				  if($row->fecha_modificacion != NULL){
					  $fecha_modificacion = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_modificacion);
				 	  $row->fecha_modificacion = $fecha_modificacion->format('d/m/Y H:i:s');
				  }	
				
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idservicios_estados, $row->idservicio_solicitud, $row->estado_servicio, $row->observaciones_estado, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	
	public function getServicioCierreChofer($itemID) {
		
		   $query = "SELECT scc.idservicios_cierre_chofer, 
		   					scc.idservicio_solicitud, 
							scc.fecha_inicio_real, 
							scc.fecha_fin_real, 
							scc.kilometraje_inicio, 
							scc.kilometraje_fin, 
							scc.observaciones_chofer, 
							scc.fecha_creacion, 
							scc.usuario_creacion, 
							scc.fecha_modificacion, 
							scc.usuario_modificacion
					   FROM servicios_cierre_chofer	scc,
					   		servicios_solicitud ss	
					  WHERE scc.idservicio_solicitud = ss.idservicio_solicitud
					    AND ss.idservicio_solicitud = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_cierre_chofer, $row->idservicio_solicitud, $row->fecha_inicio_real, $row->fecha_fin_real, $row->kilometraje_inicio, $row->kilometraje_fin, $row->observaciones_chofer, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
				
				  if($row->fecha_inicio_real != NULL){
					  $fecha_inicio_real 	  = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_inicio_real);
				  	  $row->fecha_inicio_real = $fecha_inicio_real->format('d/m/Y');
				  	  $row->hora_inicio_real  = $fecha_inicio_real->format('H:i:s');
				  }
				  
				  if($row->fecha_fin_real != NULL){
					  $fecha_fin_real 	   = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_fin_real);
				 	  $row->fecha_fin_real = $fecha_fin_real->format('d/m/Y');
				  	  $row->hora_fin_real  = $fecha_fin_real->format('H:i:s');
				  }
				
				  if($row->fecha_creacion != NULL){
					  $fecha_creacion 	   = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_creacion);
					  $row->fecha_creacion = $fecha_creacion->format('d/m/Y H:i:s');
				  }
				  
				  if($row->fecha_modificacion != NULL){
					  $fecha_modificacion 	   = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_modificacion);
					  $row->fecha_modificacion = $fecha_modificacion->format('d/m/Y H:i:s');
				  }
				  
			      return $row;
				  
			} else {
			  return 0;
			}
	}
	
	
	
	public function getServicioCalificacionUsuario($itemID) {
		
		   $query = "SELECT scu.idservicios_cierre, 
		   					scu.idservicio_solicitud, 
							scu.usuarios_idusuarios, 
							scu.calificacion_usuario, 
							scu.observaciones_usuario, 
							scu.fecha_creacion, 
							scu.usuario_creacion, 
							scu.fecha_modificacion, 
							scu.usuario_modificacion
					   FROM servicios_cierre_usuario scu,
					   		servicios_solicitud ss	
					  WHERE scu.idservicio_solicitud = ss.idservicio_solicitud
					    AND ss.idservicio_solicitud = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_cierre, $row->idservicio_solicitud, $row->usuarios_idusuarios, $row->calificacion_usuario, $row->observaciones_usuario, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
				
				  if($row->fecha_creacion != NULL){
					  $fecha_creacion 	   = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_creacion);
					  $row->fecha_creacion = $fecha_creacion->format('d/m/Y H:i:s');
				  }
				  
				  if($row->fecha_modificacion != NULL){
					  $fecha_modificacion 	   = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_modificacion);
					  $row->fecha_modificacion = $fecha_modificacion->format('d/m/Y H:i:s');
				  }
				  
			      return $row;
				  
			} else {
			  return 0;
			}
	}

	
	
	public function createServicioSolicitud($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_solicitud (chofer_idchofer, usuarios_idusuarios, vehiculos_idvehiculos, idtipos_vehiculo, ubigeo_idubigeo, lugar_destino, direccion_destino, usuario_chofer, usuario_solicita, motivo_comision, idevent, fecha_inicio, start_date, fecha_fin, end_date, es_ida_vuelta, es_aprobado, es_asignado, es_cancelado, es_espera, es_vale, es_finalizado, estado_servicio_solicitud, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiiisssssisisiiiiiiiiiss', $item->chofer_idchofer, $item->usuarios_idusuarios, $item->vehiculos_idvehiculos, $item->idtipos_vehiculo, $item->ubigeo_idubigeo, $item->lugar_destino, $item->direccion_destino, $item->usuario_chofer, $item->usuario_solicita, $item->motivo_comision, $item->idevent, $item->fecha_inicio, $item->start_date, $item->fecha_fin, $item->end_date, $item->es_ida_vuelta, $item->es_aprobado, $item->es_asignado, $item->es_cancelado, $item->es_espera, $item->es_vale, $item->es_finalizado, $item->estado_servicio_solicitud, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$idservicio_solicitud = mysqli_stmt_insert_id($stmt);
		$exception_servicio = $this->throwExceptionOnError();
		
		$comisionados = $item->comisionados;
		
		
		/**********************************/
		//CREO LOS COMISIONADOS EN LA TABLA 
		/**********************************/
		foreach($comisionados as $comisionado){
							
				$usuarios_idusuarios = $comisionado['usuarios_idusuarios'];
				
				$stmt_comisionado = mysqli_prepare($this->connection, "INSERT INTO servicios_comisionados (idservicio_solicitud, usuarios_idusuarios, estado_comisionado, fecha_creacion, usuario_creacion) VALUES ( ?, ?, ?, ?, ?)");
				$this->throwExceptionOnError();
		
				mysqli_stmt_bind_param($stmt_comisionado, 'iiiss', $idservicio_solicitud, $usuarios_idusuarios, $item->estado_comisionado, $item->fecha_creacion, $item->usuario_creacion);
				$this->throwExceptionOnError();
		
				mysqli_stmt_execute($stmt_comisionado);		
				$this->throwExceptionOnError();

		}		
		
		/*****************************************/
		//ENVIO LOS CORREOS SEGUN EL ID INGRESADO
		/*****************************************/
		foreach($comisionados as $comisionado){
							
				$usuarios_idusuarios = $comisionado['usuarios_idusuarios'];
		
				/********************************************/
				//SELECT DE LOS USUARIOS PARA ENVIAR EL CORREO
				/********************************************/	

				$stmt_usuario = mysqli_prepare($this->connection, "SELECT idusuarios, CONCAT(nombres, ' ', apellidos) as nombre, email FROM usuarios WHERE idusuarios = ? ");
				$this->throwExceptionOnError();
				
				mysqli_stmt_bind_param($stmt_usuario, 'i', $usuarios_idusuarios);		
				$this->throwExceptionOnError();
				
				mysqli_stmt_execute($stmt_usuario);
				$this->throwExceptionOnError();
				
				mysqli_stmt_bind_result($stmt_usuario, $row->idusuarios, $row->nombre, $row->email);
				
				
				while (mysqli_stmt_fetch($stmt_usuario)) {
					
						/**********************************/
						//ENVIO CORREO A LOS IMPLICADOS
						/**********************************/
						
						$settings_mail = array();
						$settings_mail['mensaje'] = '
						
						
						<table width="80%" border="0" align="center" cellpadding="0" cellspacing="10">
						  <tr>
							<td colspan="6" align="center"><img src="https://www.sierraexportadora.gob.pe/siscar/images/ico-siscar.jpg" /></td>
						  </tr>
						  <tr>
							<td colspan="6">&nbsp;</td>
						  </tr>
						  <tr>
							<td colspan="6" align="center">Ha sido registrado como comisionado para el siguiente servicio:<br><strong>'.$item->motivo_comision.'</strong></td>
						  </tr>
						  <tr>
							<td colspan="6">&nbsp;</td>
						  </tr>
						  <tr>
							<td colspan="6"><h4>FECHAS DEL SERVICIO</h4></td>
						  </tr>
						  <tr>
							<td colspan="6">
								
							</td>
						  </tr>
						  <tr>
							<td><strong>Fecha de Inicio:</strong></td>
							<td>'.$item->fecha_inicio.'</td>
							<td><strong>Fecha de Fin:</strong></td>
							<td>'.$item->fecha_fin.'</td>
							<td><strong>     </strong></td>
							<td>       </td>
						  </tr>
						  <tr>
							<td colspan="6">&nbsp;</td>
						  </tr>
						  <tr>
							<td colspan="6"><h4>UBICACION DEL SERVICIO</h4></td>
						  </tr>';
$settings_mail['mensaje'] .= '<tr>
							<td colspan="6">&nbsp;</td>
						  </tr>
						  <tr>
							<td><strong>Lugar destino:</strong></td>
							<td>'.$item->lugar_destino.'</td>
							<td><strong>Direccion</strong>:</td>
							<td>'.$item->direccion_destino.'</td>
							<td><strong>Motivo comision:</strong></td>
							<td>'.$item->motivo_comision.'</td>
						  </tr>
						  <tr>
							<td colspan="6">&nbsp;</td>
						  </tr>
						  <tr>
							<td colspan="5"><h4>COMISIONADOS</h4></td>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td><strong>Usuario(s):</strong></td>
							<td colspan="5">'.$row->nombre.'</td>
						  </tr>
						  <tr>
							<td colspan="6">&nbsp;</td>
						  </tr>
						</table>
						</body>
						</html>';
						
						$settings_mail['asunto'] = "Ha sido asignado para una comision en el sistema SISCAR";
						$settings_mail['email'] = $row->email;
						$settings_mail['nombre'] = $row->nombre;
						
						//$this->mailer->enviarCorreo($settings_mail);
							  					  
				}
			
		}

		return array("idservicio_solicitud" => $idservicio_solicitud, "status" => $this->throwExceptionOnError(), "comisionados" => $comisionados);

		mysqli_stmt_free_result($stmt_usuario);
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
		
	}
	
	
	public function createServicioCierre($item) {
		
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_cierre_chofer (idservicio_solicitud, fecha_inicio_real, fecha_fin_real, kilometraje_inicio, kilometraje_fin, observaciones_chofer, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'issiisss', $item->idservicio_solicitud, $item->fecha_inicio_real, $item->fecha_fin_real, $item->kilometraje_inicio, $item->kilometraje_fin, $item->observaciones_chofer, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);
		
		//ACTUALIZO EL ESTADO FINALIZADO DESPUES DE CERRAR SERVICIO
		$stmt_estado = mysqli_prepare($this->connection, "INSERT INTO servicios_estados (idservicio_solicitud, estado_servicio, observaciones_estado, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt_estado, 'issss', $item->idservicio_solicitud, $item->estado_servicio, $item->observaciones_estado, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt_estado);		
		$this->throwExceptionOnError();
		
		//ACTUALIZO EL ESTADO DE FINALIZADO EN LA TABLA DE SERVICIOS SOLICITUDES
		$stmt_finalizar = mysqli_prepare($this->connection, "UPDATE servicios_solicitud SET es_finalizado=?, fecha_modificacion=?, usuario_modificacion=? WHERE idservicio_solicitud=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt_finalizar, 'issi', $item->es_finalizado, $item->fecha_modificacion, $item->usuario_modificacion, $item->idservicio_solicitud);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt_finalizar);		
		$this->throwExceptionOnError();
		
		
		if(!empty($item->idmantenimiento_alertas) && $item->idmantenimiento_alertas != "0"){
		
				/********************************************/
				//SELECT DE ALERTA PARA MOSTRAR NOTIFICACION
				/********************************************/				
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
			
			mysqli_stmt_bind_param($stmt, 'i', $item->idmantenimiento_alertas);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->kilometraje_ultimo_mantenimiento, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  
			  			/**********************************/
						//ENVIO CORREO A LOS IMPLICADOS
						/**********************************/
						
						$settings_mail = array();
						$settings_mail['mensaje'] = '
						
						<table width="80%" border="0" align="center" cellpadding="0" cellspacing="10">
						  <tr>
							<td colspan="2" align="center"><img src="https://www.sierraexportadora.gob.pe/siscar/images/ico-siscar.jpg" /></td>
						  </tr>
						  <tr>
							<td colspan="2">&nbsp;</td>
						  </tr>
						  <tr>
							<td colspan="2">&nbsp;</td>
						  </tr>
						  <tr>
							<td colspan="2"><h4>DATOS DE LA ALERTA</h4></td>
						  </tr>
						  <tr>
							<td colspan="2">
								
							</td>
						  </tr>
						  <tr>
							<td width="22%"><strong>Motivo:</strong></td>
							<td>'.$row->descripcion_alerta.'</td>
						  </tr>';
$settings_mail['mensaje'] .= '
						  <tr>
							<td><strong>Ultima ejecuci&oacute;n:</strong></td>
							<td>'.$row->kilometraje_ultimo_mantenimiento.'</td>
						  </tr>
						  <tr>
						    <td><strong>Pr&oacute;xima ejecuci&oacute;n:</strong></td>
						    <td>'. ($row->kilometraje_ultimo_mantenimiento + $row->ciclo_alerta) .'</td>
  </tr>
						  <tr>
						    <td><strong>Kilometraje actual:</strong></td>
						    <td>'.$item->kilometraje_fin.'</td>
  </tr>
						  <tr>
						    <td><strong>Nivel % para activar alerta:</strong></td>
						    <td>'.$row->ejecucion_alerta.'% del kilometraje limite de '.$row->ciclo_alerta.'</td>
  </tr>
						  <tr>
						    <td><strong>Vehiculo asociado a alerta</strong></td>
						    <td>'.$row->placa_vehiculo.'</td>
  </tr>
						  <tr>
						    <td>&nbsp;</td>
						    <td>&nbsp;</td>
  </tr>
						  <tr>
						    <td colspan="2"><strong>DATOS DEL SERVICIO DEL SISTEMA VEHICULAR</strong></td>
  </tr>
						  <tr>
						    <td><strong>Sistema vehicular:</strong></td>
						    <td>'.$row->nombre_sistema.'</td>
  </tr>
						  <tr>
						    <td><strong>Servicio del sistema vehicular:</strong></td>
						    <td>'.$row->nombre_servicio.'</td>
  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						  </tr>
						</table>';
						
						$settings_mail['asunto'] = "ALERTA DE MANTENIMIENTO - SISCAR";
						$settings_mail['email'] = $row->email;
						$settings_mail['nombre'] = $row->nombre . ' ' . $row->apellidos;
						
						$this->mailer->enviarCorreo($settings_mail);
			  
			  
			  
			} 
		
		}
		
		return array("idservicios_cierre_chofer" => $autoid, "status" => $this->throwExceptionOnError() );
				
		mysqli_stmt_free_result($stmt);		
		mysqli_stmt_free_result($stmt_estado);	
		mysqli_close($this->connection);
		

	}
	
	
	public function createServicioCalificacion($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_cierre_usuario (idservicio_solicitud, usuarios_idusuarios, calificacion_usuario, observaciones_usuario, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiisss', $item->idservicio_solicitud, $item->usuarios_idusuarios, $item->calificacion_usuario, $item->observaciones_usuario, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		$autoid = mysqli_stmt_insert_id($stmt);

		return array("idservicios_cierre" => $autoid, "status" => $this->throwExceptionOnError() );
				
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	public function createReanudarServicio($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_estados (idservicio_solicitud, estado_servicio, observaciones_estado, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'issss', $item->idservicio_solicitud, $item->estado_servicio, $item->observaciones_estado, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);
		
		//ACTUALIZO EL ESTADO DE FINALIZADO EN LA TABLA DE SERVICIOS SOLICITUDES
		$stmt_reanudar = mysqli_prepare($this->connection, "UPDATE servicios_solicitud SET es_cancelado=?, fecha_modificacion=?, usuario_modificacion=? WHERE idservicio_solicitud=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt_reanudar, 'issi', $item->es_cancelado, $item->fecha_modificacion, $item->usuario_modificacion, $item->idservicio_solicitud);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt_reanudar);		
		$this->throwExceptionOnError();
		
		return array("idservicios_estados" => $autoid, "status" => $this->throwExceptionOnError() );
		
		mysqli_stmt_free_result($stmt);	
		mysqli_stmt_free_result($stmt_reanudar);		
		mysqli_close($this->connection);

	}
	
	public function createCancelarServicio($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_estados (idservicio_solicitud, estado_servicio, observaciones_estado, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'issss', $item->idservicio_solicitud, $item->estado_servicio, $item->observaciones_estado, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);
		
		//ACTUALIZO EL ESTADO DE FINALIZADO EN LA TABLA DE SERVICIOS SOLICITUDES
		$stmt_cancelar = mysqli_prepare($this->connection, "UPDATE servicios_solicitud SET es_cancelado=?, es_finalizado=?, fecha_modificacion=?, usuario_modificacion=? WHERE idservicio_solicitud=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt_cancelar, 'iissi', $item->es_cancelado, $item->es_finalizado, $item->fecha_modificacion, $item->usuario_modificacion, $item->idservicio_solicitud);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt_cancelar);		
		$this->throwExceptionOnError();
		
		return array("idservicios_estados" => $autoid, "status" => $this->throwExceptionOnError() );
		
		mysqli_stmt_free_result($stmt);	
		mysqli_stmt_free_result($stmt_cancelar);		
		mysqli_close($this->connection);

	}

	public function deleteServiciosSolicitud($itemID) {
		
		/* SERVICIOS ESTADOS */
		$stmt_estados = mysqli_prepare($this->connection, "DELETE FROM servicios_estados WHERE idservicio_solicitud = '$itemID' ");
		$this->throwExceptionOnError();
		
		mysqli_stmt_execute($stmt_estados);
		$this->throwExceptionOnError();
		
		/* SERVICIOS ESTADOS */
		$stmt_comosionados = mysqli_prepare($this->connection, "DELETE FROM servicios_comisionados WHERE idservicio_solicitud = '$itemID' ");
		$this->throwExceptionOnError();
		
		mysqli_stmt_execute($stmt_comosionados);
		$this->throwExceptionOnError();
		
		/* SERVICIOS SOLICITUD */
		$stmt_solicitud = mysqli_prepare($this->connection, "DELETE FROM servicios_solicitud WHERE idservicio_solicitud = '$itemID' ");
		$this->throwExceptionOnError();
		
		mysqli_stmt_execute($stmt_solicitud);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM servicios_solicitud");
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
