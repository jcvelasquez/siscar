<?php

class MarcasVehiculosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}
	
	

	public function getAllMarcasVehiculos($settings = array()) {
			
			$query = "SELECT idmarcas_vehiculos, marca_vehiculo, estado_marca FROM marcas_vehiculos ";
			
			if($settings["estado"] != "-1") $query .= " WHERE estado_marca = " . $settings["estado"];
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_marca);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_marca);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	public function getGroupMarcas() {
			
			$stmt = mysqli_prepare($this->connection, "SELECT idmarcas_vehiculos, marca_vehiculo, estado_marca FROM modelos_vehiculos");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['marcas'] = array();
			$records['marcas']['modelos'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_marca);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;			
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_marca);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			//$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
		
	}

	
	public function getMarcaVehiculoByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idmarcas_vehiculos, marca_vehiculo, estado_marca FROM marcas_vehiculos WHERE idmarcas_vehiculos=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_marca);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMarcaVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO marcas_vehiculos (marca_vehiculo, estado_marca) VALUES (?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'si', $item->marca_vehiculo, $item->estado_marca);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMarcaVehiculo($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE marcas_vehiculos SET marca_vehiculo=?, estado_marca=? WHERE idmarcas_vehiculos=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sii', $item->marca_vehiculo, $item->estado_marca, $item->idmarcas_vehiculos);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteMarcaVehiculo($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM marcas_vehiculos WHERE idmarcas_vehiculos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return ($this->throwExceptionOnError() == "confirm")? "success" : $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM marcas_vehiculos");
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
