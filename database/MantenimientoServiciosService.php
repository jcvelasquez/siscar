<?php

class MantenimientoServiciosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMatenimientoServicios($settings = array()) {
		
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
			
			$query = "SELECT mser.idmantenimiento_servicios, 
							 mser.idmantenimiento_sistemas, 
							 msis.nombre_sistema,
							 mser.idmantenimiento_tipos_servicios,
							 mts.tipo_servicio_mantenimiento,
							 mser.id_medida_uso,
							 muso.medida_uso,
							 mser.cod_servicio, 
							 mser.nombre_servicio, 
							 mser.descripcion_servicio, 
							 mser.estado_servicio,
							 mser.ciclo_alerta,
							 mser.ejecucion_alerta
						FROM mantenimiento_servicios AS mser 
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas
			      INNER JOIN mantenimiento_tipos_servicios AS mts 
			  			  ON mser.idmantenimiento_tipos_servicios = mts.idmantenimiento_tipos_servicios
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso";
			
			if( !empty($settings['search']['value']) ) 
			{
				$query .= " WHERE (mts.tipo_servicio_mantenimiento LIKE '%".$settings['search']['value']."%' OR msis.nombre_sistema LIKE '%".$settings['search']['value']."%' OR mser.nombre_servicio LIKE '%".$settings['search']['value']."%' OR mser.descripcion_servicio LIKE '%".$settings['search']['value']."%') ";
			}
			
			if (isset($order_by) && isset($order_dir))
			{
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
			
			  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->id_medida_uso, $row->medida_uso, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio, $row->ciclo_alerta, $row->ejecucion_alerta);
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->id_medida_uso, $row->medida_uso, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio, $row->ciclo_alerta, $row->ejecucion_alerta);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	public function getMatenimientoServicioBySistemasID($settings) {
		
			$query = "SELECT mser.idmantenimiento_servicios, 
							 mser.idmantenimiento_sistemas, 
							 msis.nombre_sistema,
							 mser.idmantenimiento_tipos_servicios,
							 mts.tipo_servicio_mantenimiento,
							 mser.id_medida_uso,
							 muso.medida_uso,
							 mser.cod_servicio, 
							 mser.nombre_servicio, 
							 mser.descripcion_servicio, 
							 mser.estado_servicio,
							 mser.ciclo_alerta,
							 mser.ejecucion_alerta
						FROM mantenimiento_servicios AS mser 
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas
			      INNER JOIN mantenimiento_tipos_servicios AS mts 
			  			  ON mser.idmantenimiento_tipos_servicios = mts.idmantenimiento_tipos_servicios
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso
					   WHERE mser.idmantenimiento_sistemas=?
					     AND mser.estado_servicio = 1";
						 
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings['idmantenimiento_sistemas']);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->id_medida_uso, $row->medida_uso, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio, $row->ciclo_alerta, $row->ejecucion_alerta);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->id_medida_uso, $row->medida_uso, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio, $row->ciclo_alerta, $row->ejecucion_alerta);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($settings['recordsTotal']);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	public function getMatenimientoServicioByID($itemID) {
		
			$query = "SELECT mser.idmantenimiento_servicios, 
							 mser.idmantenimiento_sistemas, 
							 msis.nombre_sistema,
							 mser.idmantenimiento_tipos_servicios,
							 mts.tipo_servicio_mantenimiento,
							 mser.id_medida_uso,
							 muso.medida_uso,
							 mser.cod_servicio, 
							 mser.nombre_servicio, 
							 mser.descripcion_servicio, 
							 mser.estado_servicio,
							 mser.ciclo_alerta,
							 mser.ejecucion_alerta
						FROM mantenimiento_servicios AS mser 
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas
			      INNER JOIN mantenimiento_tipos_servicios AS mts 
			  			  ON mser.idmantenimiento_tipos_servicios = mts.idmantenimiento_tipos_servicios
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso
					   WHERE mser.idmantenimiento_servicios=?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento, $row->id_medida_uso, $row->medida_uso, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio, $row->ciclo_alerta, $row->ejecucion_alerta);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMatenimientoServicio($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_servicios (idmantenimiento_sistemas, idmantenimiento_tipos_servicios, id_medida_uso, cod_servicio, nombre_servicio, descripcion_servicio, estado_servicio, ciclo_alerta, ejecucion_alerta, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiisssiiiss', $item->idmantenimiento_sistemas, $item->idmantenimiento_tipos_servicios, $item->id_medida_uso, $item->cod_servicio, $item->nombre_servicio, $item->descripcion_servicio, $item->estado_servicio, $item->ciclo_alerta, $item->ejecucion_alerta, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMatenimientoServicio($item) {
			
			
			
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_servicios SET idmantenimiento_sistemas=?, idmantenimiento_tipos_servicios=?, id_medida_uso=?, cod_servicio=?, nombre_servicio=?, descripcion_servicio=?, estado_servicio=?, ciclo_alerta=?, ejecucion_alerta=?, fecha_modificacion=?, usuario_modificacion=? WHERE idmantenimiento_servicios=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiisssiiissi', $item->idmantenimiento_sistemas, $item->idmantenimiento_tipos_servicios, $item->id_medida_uso, $item->cod_servicio, $item->nombre_servicio, $item->descripcion_servicio, $item->estado_servicio, $item->ciclo_alerta, $item->ejecucion_alerta, $item->fecha_modificacion, $item->usuario_modificacion, $item->idmantenimiento_servicios);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteMatenimientoServicio($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_servicios WHERE idmantenimiento_servicios = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_servicios");
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
