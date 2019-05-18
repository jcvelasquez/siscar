<?php

class TipoMedidaUsoService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTiposMedidasUsos($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT id_medida_uso, medida_uso FROM medida_uso LIMIT ?, ?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ii', $settings["iDisplayStart"], $settings["iDisplayLength"]);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->id_medida_uso, $row->medida_uso);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->id_medida_uso, $row->medida_uso);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getTipoMedidaUsoByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT id_medida_uso, medida_uso FROM medida_uso WHERE id_medida_uso=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->id_medida_uso, $row->medida_uso);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTipoMedidaUso($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO medida_uso (medida_uso) VALUES (?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 's', $item->medida_uso);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateTipoMedidaUso($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE medida_uso SET medida_uso=? WHERE id_medida_uso=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'si', $item->medida_uso, $item->id_medida_uso);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteTipoMedidaUso($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM medida_uso WHERE id_medida_uso = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		
	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM medida_uso");
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
