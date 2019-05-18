<?php

class TipoVehiculoService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTiposVehiculos($settings = array()) {
		
			$query = "SELECT idtipos_vehiculo, tipo_vehiculo, estado_tipo FROM tipo_vehiculo ";
			
			if($settings["estado"] != "-1") $query .= " WHERE estado_tipo = " . $settings["estado"];
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->estado_tipo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->estado_tipo);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getTipoVehiculoByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtipos_vehiculo, tipo_vehiculo, estado_tipo FROM tipo_vehiculo WHERE idtipos_vehiculo=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->estado_tipo);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTipoVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tipo_vehiculo (tipo_vehiculo, estado_tipo) VALUES (?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'si', $item->tipo_vehiculo, $item->estado_tipo);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateTipoVehiculo($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE tipo_vehiculo SET tipo_vehiculo=?, estado_tipo =? WHERE idtipos_vehiculo=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sii', $item->tipo_vehiculo, $item->estado_tipo, $item->idtipos_vehiculo);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteTipoVehiculo($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM tipo_vehiculo WHERE idtipos_vehiculo = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM tipo_vehiculo");
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
