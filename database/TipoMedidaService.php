<?php

class TipoMedidaService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTiposMedidas($settings = array()) {
		
			
			$stmt = mysqli_prepare($this->connection, "SELECT idmedida_combustible, nombre_medida FROM medida_combustible LIMIT ?, ?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ii', $settings["iDisplayStart"], $settings["iDisplayLength"]);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmedida_combustible, $row->nombre_medida);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idmedida_combustible, $row->nombre_medida);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getTipoCombustibleByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtipo_combustible, tipo_combustible FROM tipo_combustible WHERE idtipo_combustible=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtipo_combustible, $row->tipo_combustible);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTipoCombustible($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tipo_combustible (tipo_combustible) VALUES (?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 's', $item->tipo_combustible);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateTipoCombustible($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE tipo_combustible SET tipo_combustible=? WHERE idtipo_combustible=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'si', $item->tipo_combustible, $item->idtipo_combustible);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteTipoCombustible($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM tipo_combustible WHERE idtipo_combustible = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM tipo_combustible");
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
