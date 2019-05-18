<?php

class RolesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllRoles($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idroles, nombre_rol, descripcion_rol, cod_rol, estado_rol FROM roles");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idroles, $row->nombre_rol, $row->descripcion_rol, $row->cod_rol, $row->estado_rol);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idroles, $row->nombre_rol, $row->descripcion_rol, $row->cod_rol, $row->estado_rol);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getRolByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idroles, nombre_rol, descripcion_rol, cod_rol, estado_rol FROM roles WHERE idroles=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idroles, $row->nombre_rol, $row->descripcion_rol, $row->cod_rol, $row->estado_rol);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createRol($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO roles (nombre_rol, descripcion_rol, cod_rol, estado_rol) VALUES (?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'sssi', $item->nombre_rol, $item->descripcion_rol, $item->cod_rol, $item->estado_rol);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateRol($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE roles SET nombre_rol=?, descripcion_rol=?, cod_rol=?, estado_rol=? WHERE idroles=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sssii', $item->nombre_rol, $item->descripcion_rol, $item->cod_rol, $item->estado_rol, $item->idroles);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteRol($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM roles WHERE idroles = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		
	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM roles");
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
