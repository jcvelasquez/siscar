<?php

class UbigeoService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getDepartamentos($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT departamento FROM ubigeo GROUP BY departamento");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->departamento);
			
			while (mysqli_stmt_fetch($stmt)) {
					
				  $row->departamento = utf8_encode($row->departamento);		
				  		  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->departamento);
				  
			}
				
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	public function getProvinciasXdepartamentos($departamento) {
					
			$stmt = mysqli_prepare($this->connection, "SELECT provincia FROM ubigeo WHERE departamento = ? GROUP BY provincia");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 's', $departamento);
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->provincia);
			
			while (mysqli_stmt_fetch($stmt)) {
				 	
				  $row->provincia = utf8_encode($row->provincia);	
				  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  				  				  
				  mysqli_stmt_bind_result($stmt, $row->provincia);		  
				  
			}
				
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	
	
	public function getDistritosXprovincias($provincia) {
		
			$provincia = utf8_decode($provincia);
								
			$stmt = mysqli_prepare($this->connection, "SELECT idubigeo, distrito FROM ubigeo WHERE provincia = ?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 's', $provincia);
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idubigeo, $row->distrito);
			
			while (mysqli_stmt_fetch($stmt)) {
				  	
				  $row->distrito = utf8_encode($row->distrito);	
				  	 		  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idubigeo, $row->distrito);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
			
			return $records;
	   
			
		
	}
	



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM ubigeo");
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
