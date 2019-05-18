<?php

class ValesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllVales($settings = array()) {
			   
			$query = "SELECT serva.idservicios_vales, 
							 serva.idservicios_escala_movilidades, 
							 seresc.destino,
							 seresc.monto,
							 serva.concepto_vale, 
							 serva.nro_meta, 
							 seso.idservicio_solicitud,
							 seso.motivo_comision,
							 seso.lugar_destino,
							 seso.direccion_destino,
							 serva.fecha_creacion, 
							 serva.usuario_creacion, 
							 serva.fecha_modificacion, 
							 serva.usuario_modificacion
						FROM servicios_vales serva,
							 servicios_escala_movilidades seresc,
							 servicios_solicitud seso
  					   WHERE serva.idservicios_escala_movilidades = seresc.idservicios_escala_movilidades
					     AND serva.idservicio_solicitud = seso.idservicio_solicitud
				    ORDER BY serva.fecha_creacion DESC ";
			
						
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT ".mysqli_real_escape_string( $this->connection, $settings['start'] ).", ".	mysqli_real_escape_string( $this->connection, $settings['length'] );
			}
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			
			//MUESTRA EL TOTAL FILTRADOS
			$totalFiltered = (empty($settings['search']['value']))? $settings['recordsTotal'] : $stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_vales, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->concepto_vale, $row->nro_meta, $row->idservicio_solicitud, $row->motivo_comision, $row->lugar_destino, $row->lugar_destino, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				  $row->fecha_creacion = DateTime::createFromFormat('Y-m-d H:i:s', $row->fecha_creacion);
				  $row->fecha_creacion = $row->fecha_creacion->format('d/m/Y - H:i:s');
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idservicios_vales, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->concepto_vale, $row->nro_meta, $row->idservicio_solicitud, $row->motivo_comision, $row->lugar_destino, $row->lugar_destino, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
			return $records;
		
	}
	

	public function getValeByID($itemID) {
		
		
			$query = "SELECT serva.idservicios_vales, 
							 serva.idservicios_escala_movilidades, 
							 seresc.destino,
							 seresc.monto,
							 serva.concepto_vale, 
							 serva.nro_meta, 
							 serva.nro_correlativo, 
							 serva.fecha_creacion, 
							 serva.usuario_creacion, 
							 serva.fecha_modificacion, 
							 serva.usuario_modificacion
						FROM servicios_vales serva,
							 servicios_escala_movilidades seresc
  					   WHERE serva.idservicios_escala_movilidades = seresc.idservicios_escala_movilidades
						 AND serva.idservicios_vales = ?";
						
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_vales, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->concepto_vale, $row->nro_meta, $row->nro_correlativo, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	

	
	public function createVale($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_vales (idservicio_solicitud, idservicios_escala_movilidades, concepto_vale, nro_meta, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iissss', $item->idservicio_solicitud, $item->idservicios_escala_movilidades, $item->concepto_vale, $item->nro_meta, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		return mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function updateVale($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE servicios_vales SET idservicio_solicitud=?, idservicios_escala_movilidades=?, concepto_vale=?, nro_meta=?, fecha_modificacion=?, usuario_modificacion=? WHERE idservicios_vales=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iissssi', $item->idservicio_solicitud, $item->idservicios_escala_movilidades, $item->concepto_vale, $item->nro_meta, $item->fecha_modificacion, $item->usuario_modificacion, $item->idservicios_vales);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteVale($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM servicios_vales WHERE idservicios_vales = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM servicios_vales");
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