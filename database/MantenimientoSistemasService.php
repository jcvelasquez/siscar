<?php

class MantenimientoSistemasService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMatenimientoSistemas($settings = array()) {
							
			$stmt = mysqli_prepare($this->connection, "SELECT idmantenimiento_sistemas, cod_sistema, nombre_sistema, estado_sistema, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM mantenimiento_sistemas");		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_sistemas, $row->cod_sistema, $row->nombre_sistema, $row->estado_sistema, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_sistemas, $row->cod_sistema, $row->nombre_sistema, $row->estado_sistema, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($settings['recordsTotal']);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	public function getMantenimientoSistemaByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idmantenimiento_sistemas, cod_sistema, nombre_sistema, estado_sistema, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM mantenimiento_sistemas WHERE idmantenimiento_sistemas=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_sistemas, $row->cod_sistema, $row->nombre_sistema, $row->estado_sistema, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMantenimientoSistema($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_sistemas (cod_sistema, nombre_sistema, estado_sistema, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'ssiss', $item->cod_sistema, $item->nombre_sistema, $item->estado_sistema, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMantenimientoSistema($item) {
					
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_sistemas SET cod_sistema=?, nombre_sistema=?, estado_sistema=?, fecha_modificacion=?, usuario_modificacion=? WHERE idmantenimiento_sistemas=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'ssissi', $item->cod_sistema, $item->nombre_sistema, $item->estado_sistema, $item->fecha_modificacion, $item->usuario_modificacion, $item->idmantenimiento_sistemas);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteMantenimientoSistema($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_sistemas WHERE idmantenimiento_sistemas = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_sistemas");
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
