<?php

class MedidaCombustibleService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMedidasCombustibles($settings = array()) {
		
			$query = "SELECT * FROM medida_combustible ";
			
			if($settings["estado"] != "-1") $query .= " WHERE estado_medida_combustible = " . $settings["estado"];
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmedida_combustible, $row->medida_combustible, $row->estado_medida_combustible);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmedida_combustible, $row->medida_combustible, $row->estado_medida_combustible);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getMedidaCombustibleByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idmedida_combustible, medida_combustible, estado_medida_combustible FROM medida_combustible WHERE idmedida_combustible=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmedida_combustible, $row->medida_combustible, $row->estado_medida_combustible);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMedidaCombustible($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO medida_combustible (medida_combustible, estado_medida_combustible) VALUES (?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'si', $item->medida_combustible, $item->estado_medida_combustible);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateMedidaCombustible($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE medida_combustible SET medida_combustible=?, estado_medida_combustible=? WHERE idmedida_combustible=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sii', $item->medida_combustible, $item->estado_medida_combustible, $item->idmedida_combustible);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);


	}


	public function deleteMedidaCombustible($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM medida_combustible WHERE idmedida_combustible = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM medida_combustible");
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
