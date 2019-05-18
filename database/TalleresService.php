<?php

class TalleresService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTalleres($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtalleres, nombre_taller, descripcion_taller, direccion_taller, telefono_taller, email_taller, ruc_taller, estado_taller, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM talleres ORDER BY idtalleres DESC");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtalleres, $row->nombre_taller, $row->descripcion_taller, $row->direccion_taller, $row->telefono_taller, $row->email_taller, $row->ruc_taller, $row->estado_taller, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idtalleres, $row->nombre_taller, $row->descripcion_taller, $row->direccion_taller, $row->telefono_taller, $row->email_taller, $row->ruc_taller, $row->estado_taller, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getTallerByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtalleres, nombre_taller, descripcion_taller, direccion_taller, telefono_taller, email_taller, ruc_taller, estado_taller, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM talleres WHERE idtalleres=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtalleres, $row->nombre_taller, $row->descripcion_taller, $row->direccion_taller, $row->telefono_taller, $row->email_taller, $row->ruc_taller, $row->estado_taller, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTaller($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO talleres (nombre_taller, descripcion_taller, direccion_taller, telefono_taller, email_taller, ruc_taller, estado_taller, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'ssssssiss', $item->nombre_taller, $item->descripcion_taller, $item->direccion_taller, $item->telefono_taller, $item->email_taller, $item->ruc_taller, $item->estado_taller, $item->fecha_modificacion, $item->usuario_modificacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}

	public function updateTaller($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE talleres SET nombre_taller=?, descripcion_taller=?, direccion_taller=?, telefono_taller=?, email_taller=?, ruc_taller=?, estado_taller=?, fecha_modificacion=?, usuario_modificacion=? WHERE idtalleres=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'ssssssissi', $item->nombre_taller, $item->descripcion_taller, $item->direccion_taller, $item->telefono_taller, $item->email_taller, $item->ruc_taller, $item->estado_taller, $item->fecha_modificacion, $item->usuario_modificacion, $item->idtalleres);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteTaller($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM talleres WHERE idtalleres = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM talleres");
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
