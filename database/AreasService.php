<?php

class AreasService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllAreas($settings = array()) {
			
			$query = "SELECT ar.idareas, 
							 ar.sedes_idsedes, 
							 se.nombre_sede,
							 ar.nombre_area, 
							 ar.prioridad_area,
							 ar.estado_area
						FROM areas ar,
							 sedes se
					   WHERE ar.sedes_idsedes = se.idsedes";
					
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$totalFiltered = $settings['recordsTotal'];
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idareas, $row->sedes_idsedes, $row->nombre_sede , $row->nombre_area, $row->prioridad_area, $row->estado_area);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idareas, $row->sedes_idsedes, $row->nombre_sede , $row->nombre_area, $row->prioridad_area, $row->estado_area);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getAreaByID($itemID) {
		
			$query = "SELECT ar.idareas, 
							 ar.sedes_idsedes, 
							 se.nombre_sede,
							 ar.nombre_area, 
							 ar.prioridad_area,
							 ar.estado_area
						FROM areas ar,
							 sedes se
					   WHERE ar.sedes_idsedes = se.idsedes
					     AND ar.idareas=?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idareas, $row->sedes_idsedes, $row->nombre_sede , $row->nombre_area, $row->prioridad_area, $row->estado_area);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function getAreasBySedesID($itemID) {
		
		$query = "SELECT ar.idareas, 
						 ar.sedes_idsedes, 
						 se.nombre_sede,
						 ar.nombre_area, 
						 ar.prioridad_area,
						 ar.estado_area
					FROM areas ar,
						 sedes se
				   WHERE ar.sedes_idsedes = se.idsedes
					 AND ar.sedes_idsedes=?";				 
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idareas, $row->sedes_idsedes, $row->nombre_sede , $row->nombre_area, $row->prioridad_area, $row->estado_area);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idareas, $row->sedes_idsedes, $row->nombre_sede , $row->nombre_area, $row->prioridad_area, $row->estado_area);

			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}
	
	
	public function createArea($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO areas (sedes_idsedes, nombre_area, prioridad_area, estado_area) VALUES (?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'isii', $item->sedes_idsedes, $item->nombre_area, $item->prioridad_area, $item->estado_area);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	

	public function updateArea($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE areas SET sedes_idsedes=?, nombre_area=?, prioridad_area=?, estado_area=? WHERE idareas=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isiii', $item->sedes_idsedes, $item->nombre_area, $item->prioridad_area, $item->estado_area, $item->idareas);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteArea($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM areas WHERE idareas = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM areas");
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
