<?php

class ServiciosEscalasMovilidadService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllServiciosEscalaMovilidad($settings = array()) {
			
			$query = "SELECT idservicios_escala_movilidades, destino, monto, estado_escala FROM servicios_escala_movilidades ORDER BY destino ASC";
			
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
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->estado_escala);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				  $row->destino = utf8_encode($row->destino);		
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->estado_escala);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	public function getMigravehiculo($settings = array()) {
			
			$query = "SELECT cho.sedes_idsedes, 
			 				 sed.nombre_sede as VC_VECHICULOS_ASIGNADO_A,
							 CONCAT(cho.nombres_chofer, ' ', cho.apellidos_chofer) as VC_VECHICULOS_CHOFER,
							 cho.vehiculos_idvehiculos,						
							 veh.placa_vehiculo
					    FROM chofer cho,
							 vehiculos veh,
							 sedes sed
				       WHERE cho.vehiculos_idvehiculos = veh.idvehiculos
					   	 AND cho.sedes_idsedes = sed.idsedes";
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->estado_escala);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				  $row->destino = utf8_encode($row->destino);		
							  
				  $records[] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->estado_escala);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	

	
	public function getServicioEscalaMovilidadByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idservicios_escala_movilidades, destino, monto, estado_escala FROM servicios_escala_movilidades WHERE idservicios_escala_movilidades=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idservicios_escala_movilidades, $row->destino, $row->monto, $row->estado_escala);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createServicioEscalaMovilidad($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO servicios_escala_movilidades(destino, monto, estado_escala) VALUES (?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'sdi', $item->destino, $item->monto, $item->estado_escala);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateServicioEscalaMovilidad($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE servicios_escala_movilidades SET destino=?, monto=?, estado_escala=? WHERE idservicios_escala_movilidades=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sdii', $item->destino, $item->monto, $item->estado_escala, $item->idservicios_escala_movilidades);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		

	}


	public function deleteServicioEscalaMovilidad($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM servicios_escala_movilidades WHERE idservicios_escala_movilidades = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM servicios_escala_movilidades");
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
