<?php

class MantenimientoComponentesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMatenimientoComponentes($settings = array()) {
		
			$query = "SELECT mc.idmantenimiento_componentes, 
							 mc.idmantenimiento_sistemas, 
							 ms.nombre_sistema,
							 mc.cod_componente, 
							 mc.nombre_componente, 
							 mc.estado_componente 
					    FROM mantenimiento_componentes mc,
							 mantenimiento_sistemas ms
					   WHERE mc.idmantenimiento_sistemas = ms.idmantenimiento_sistemas";
			
			$totalFiltered = $settings['recordsTotal'];
			
			if( !empty($settings['search']['value']) ) 
			{
				$query .= " AND (ms.nombre_sistema LIKE '%".$settings['search']['value']."%' OR mc.nombre_componente LIKE '%".$settings['search']['value']."%') ";
			}
			
			$query .= " ORDER BY mc.nombre_componente ASC ";
			
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT ".mysqli_real_escape_string( $this->connection, $settings['start'] ).", ".	mysqli_real_escape_string( $this->connection, $settings['length'] );
			}
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			if(empty($settings['search']['value'])) 
					$totalFiltered = $settings['recordsTotal']; 
			else 
					$totalFiltered = $stmt->store_result();
					
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_componentes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->cod_componente, $row->nombre_componente, $row->estado_componente);
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_componentes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->cod_componente, $row->nombre_componente, $row->estado_componente);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	public function getMatenimientoComponentesBySistemasID($settings) {
		
			$query = "SELECT mc.idmantenimiento_componentes, 
							 mc.idmantenimiento_sistemas, 
							 ms.nombre_sistema,
							 mc.cod_componente, 
							 mc.nombre_componente, 
							 mc.estado_componente 
					    FROM mantenimiento_componentes mc,
							 mantenimiento_sistemas ms
					   WHERE mc.idmantenimiento_sistemas = ms.idmantenimiento_sistemas
						 AND mc.idmantenimiento_sistemas = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings['idmantenimiento_sistemas']);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_componentes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->cod_componente, $row->nombre_componente, $row->estado_componente);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_componentes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->cod_componente, $row->nombre_componente, $row->estado_componente);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($settings['recordsTotal']);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	public function getMatenimientoComponentesByVehiculoID($itemID) {
		
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
							 exs.usuario_aprobacion,
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
				  INNER JOIN mantenimiento_solicitudes manso
				  		  ON sxs.idmantenimiento_solicitudes = manso.idmantenimiento_solicitudes	
 				  INNER JOIN talleres tal
				  		  ON exs.talleres_idtalleres = tal.idtalleres  	    	  
					   WHERE manso.vehiculos_idvehiculos = ?";
					   
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones, $row->talleres_idtalleres, $row->nombre_taller, $row->descripcion_diagnostico, $row->descripcion_accion, $row->costo_accion, $row->es_cambio_componente, $row->motivo_cambio_componente, $row->es_taller_seleccionado, $row->motivo_taller_seleccionado, $row->fecha_aprobacion, $row->usuario_aprobacion, $row->estado_evaluacion_x_servicio, $row->idservicios_x_solicitudes, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->descripcion_problema, $row->idtrabajos_x_evaluaciones, $row->calificacion_trabajo_ejecutado, $row->comentarios_trabajo_ejecutado, $row->porcentaje_trabajo_ejecutado, $row->se_ejecuto_trabajo, $row->motivo_no_ejecuto, $row->fecha_trabajo_ejecutado, $row->estado_trabajo_x_evaluacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idevaluaciones_x_servicios, $row->idmantenimiento_evaluaciones, $row->talleres_idtalleres, $row->nombre_taller, $row->descripcion_diagnostico, $row->descripcion_accion, $row->costo_accion, $row->es_cambio_componente, $row->motivo_cambio_componente, $row->es_taller_seleccionado, $row->motivo_taller_seleccionado, $row->fecha_aprobacion, $row->usuario_aprobacion, $row->estado_evaluacion_x_servicio, $row->idservicios_x_solicitudes, $row->idmantenimiento_solicitudes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->idmantenimiento_componentes, $row->nombre_componente, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->is_alerta, $row->descripcion_problema, $row->idtrabajos_x_evaluaciones, $row->calificacion_trabajo_ejecutado, $row->comentarios_trabajo_ejecutado, $row->porcentaje_trabajo_ejecutado, $row->se_ejecuto_trabajo, $row->motivo_no_ejecuto, $row->fecha_trabajo_ejecutado, $row->estado_trabajo_x_evaluacion);

			}			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	public function getMatenimientoComponenteByID($itemID) {
		
			$query = "SELECT mc.idmantenimiento_componentes, 
							 mc.idmantenimiento_sistemas, 
							 ms.nombre_sistema,
							 mc.cod_componente, 
							 mc.nombre_componente, 
							 mc.estado_componente 
					    FROM mantenimiento_componentes mc,
							 mantenimiento_sistemas ms
					   WHERE mc.idmantenimiento_sistemas = ms.idmantenimiento_sistemas
						 AND mc.idmantenimiento_componentes = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt,$row->idmantenimiento_componentes, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->cod_componente, $row->nombre_componente, $row->estado_componente);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMatenimientoComponente($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_componentes (idmantenimiento_sistemas, cod_componente, nombre_componente, estado_componente) VALUES (?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'isss', $item->idmantenimiento_sistemas, $item->cod_componente, $item->nombre_componente, $item->estado_componente);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMatenimientoComponente($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_componentes SET idmantenimiento_sistemas=?, cod_componente=?, nombre_componente=?, estado_componente=? WHERE idmantenimiento_componentes=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isssi', $item->idmantenimiento_sistemas, $item->cod_componente, $item->nombre_componente, $item->estado_componente, $item->idmantenimiento_componentes);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteMatenimientoComponente($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_componentes WHERE idmantenimiento_componentes = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_componentes");
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
