<?php

class ModelosVehiculosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}
	
	
	public function getAllModelosVehiculos($settings = array()) {
		
			$query = "SELECT mo.idmodelos_vehiculos, 
							 mo.idmarcas_vehiculos, 
							 ma.marca_vehiculo,
							 mo.modelo_vehiculo,
							 mo.estado_modelo
						FROM modelos_vehiculos mo,
							 marcas_vehiculos ma
					   WHERE mo.idmarcas_vehiculos = ma.idmarcas_vehiculos";
			
			if($settings["estado"] != "-1") $query .= " AND mo.estado_modelo = " . $settings["estado"] ;
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmodelos_vehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->modelo_vehiculo, $row->estado_modelo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmodelos_vehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->modelo_vehiculo, $row->estado_modelo);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['draw'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	
	public function getModelosXservicioID($itemID) {
		
			$query = "SELECT mxs.idmodelos_x_servicios,
							 mxs.idmantenimiento_servicios,
							 mo.idmodelos_vehiculos, 
							 mo.modelo_vehiculo,
							 mo.idmarcas_vehiculos, 
							 ma.marca_vehiculo,
							 mxs.estado_modelo_x_servicio
						FROM modelos_vehiculos mo,
							 marcas_vehiculos ma,
							 modelos_x_servicios mxs
					   WHERE mo.idmarcas_vehiculos = ma.idmarcas_vehiculos
					     AND mxs.idmodelos_vehiculos = mo.idmodelos_vehiculos
					   	 AND mxs.idmantenimiento_servicios=?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmodelos_x_servicios, $row->idmantenimiento_servicios, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_modelo_x_servicio);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmodelos_x_servicios, $row->idmantenimiento_servicios, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->estado_modelo_x_servicio);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	public function getModelosByMarcaID($settings = array()) {
		
			$query = "SELECT idmodelos_vehiculos, idmarcas_vehiculos, modelo_vehiculo, estado_modelo FROM modelos_vehiculos WHERE idmarcas_vehiculos = " . $settings["id"];
		
			if($settings["estado"] != "-1") $query .= " AND estado_modelo = " . $settings["estado"] ;
			
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmodelos_vehiculos, $row->idmarcas_vehiculos, $row->modelo_vehiculo, $row->estado_modelo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmodelos_vehiculos, $row->idmarcas_vehiculos, $row->modelo_vehiculo, $row->estado_modelo);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}


	
	public function getModeloVehiculoByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idmodelos_vehiculos, idmarcas_vehiculos, modelo_vehiculo, estado_modelo FROM modelos_vehiculos WHERE idmodelos_vehiculos=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmodelos_vehiculos, $row->idmarcas_vehiculos, $row->modelo_vehiculo, $row->estado_modelo);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createModeloXservicio($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO modelos_x_servicios (idmantenimiento_servicios, idmodelos_vehiculos, estado_modelo_x_servicio) VALUES (?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iii', $item->idmantenimiento_servicios, $item->idmodelos_vehiculos, $item->estado_modelo_x_servicio);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	
	public function createModeloVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO modelos_vehiculos (idmarcas_vehiculos, modelo_vehiculo, estado_modelo) VALUES (?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'ssi', $item->idmarcas_vehiculos, $item->modelo_vehiculo, $item->estado_modelo);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateModeloVehiculo($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE modelos_vehiculos SET idmarcas_vehiculos=?, modelo_vehiculo=?, estado_modelo=? WHERE idmodelos_vehiculos=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isii', $item->idmarcas_vehiculos, $item->modelo_vehiculo, $item->estado_modelo, $item->idmodelos_vehiculos);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteModeloVehiculo($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM modelos_vehiculos WHERE idmodelos_vehiculos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function deleteModelosXservicio($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM modelos_x_servicios WHERE idmodelos_x_servicios = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM modelos_vehiculos");
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
