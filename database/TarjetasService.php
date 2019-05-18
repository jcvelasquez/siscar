<?php

class TarjetasService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTarjetas($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtarjetas_combustible, vehiculos_idvehiculos, proveedores_idproveedores, nro_tarjeta FROM tarjetas_combustible LIMIT ?, ?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ii', $settings["iDisplayStart"], $settings["iDisplayLength"]);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->proveedores_idproveedores, $row->nro_tarjeta);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->proveedores_idproveedores, $row->nro_tarjeta);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	public function getTarjetasByVehiculoID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtarjetas_combustible, vehiculos_idvehiculos, proveedores_idproveedores, nro_tarjeta FROM tarjetas_combustible WHERE vehiculos_idvehiculos=?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->proveedores_idproveedores, $row->nro_tarjeta);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->proveedores_idproveedores, $row->nro_tarjeta);
				  
			}
			
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
		
		//$fecha_creacion = $item->fecha_creacion->toString('YYYY-MM-dd HH:mm:ss');

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
		
		//$fecha_modificacion = $item->fecha_modificacion->toString('YYYY-MM-dd HH:mm:ss');
	
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
		
		return $this->throwExceptionOnError();
		
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
