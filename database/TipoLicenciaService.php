<?php

class TipoLicenciaService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTiposLicencia($settings = array()) {
		
			
			$stmt = mysqli_prepare($this->connection, "SELECT idtipo_licencia, tipo_licencia, estado_tipo_licencia FROM tipo_licencia");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtipo_licencia, $row->tipo_licencia, $row->estado_tipo_licencia);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idtipo_licencia, $row->tipo_licencia, $row->estado_tipo_licencia);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getTipoLicenciaByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtipo_licencia, tipo_licencia, estado_tipo_licencia FROM tipo_licencia WHERE idtipo_licencia=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtipo_licencia, $row->tipo_licencia, $row->estado_tipo_licencia);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTipoLicencia($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tipo_licencia (tipo_licencia, estado_tipo_licencia) VALUES (?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'si', $item->tipo_licencia, $item->estado_tipo_licencia);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateTipoLicencia($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE tipo_licencia SET tipo_licencia=?, estado_tipo_licencia=? WHERE idtipo_licencia=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sii', $item->tipo_licencia, $item->estado_tipo_licencia, $item->idtipo_licencia);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);


	}


	public function deleteTipoLicencia($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM tipo_licencia WHERE idtipo_licencia = '$itemID'");
		$this->throwExceptionOnError();
		
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM tipo_licencia");
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
