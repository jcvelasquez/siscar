<?php

class MantenimientoTiposServiciosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllMatenimientoTiposServicios($settings = array()) {
		
							
			$stmt = mysqli_prepare($this->connection, "SELECT idmantenimiento_tipos_servicios, tipo_servicio_mantenimiento FROM mantenimiento_tipos_servicios");		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento);
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_tipos_servicios, $row->tipo_servicio_mantenimiento);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($settings['recordsTotal']);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	public function getMatenimientoServicioBySistemasID($settings) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idmantenimiento_servicios, idmantenimiento_sistemas, idmantenimiento_tipos_servicios, cod_servicio, nombre_servicio, descripcion_servicio, estado_servicio FROM mantenimiento_servicios WHERE idmantenimiento_sistemas=? ");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings['idmantenimiento_sistemas']);		
			$this->throwExceptionOnError();
								
			mysqli_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->idmantenimiento_tipos_servicios, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio);
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->idmantenimiento_tipos_servicios, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($settings['recordsTotal']);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	public function getMatenimientoServicioByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idmantenimiento_servicios, idmantenimiento_sistemas, idmantenimiento_tipos_servicios, cod_servicio, nombre_servicio, descripcion_servicio, estado_servicio FROM mantenimiento_servicios WHERE idmantenimiento_sistemas=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_servicios, $row->idmantenimiento_sistemas, $row->idmantenimiento_tipos_servicios, $row->cod_servicio, $row->nombre_servicio, $row->descripcion_servicio, $row->estado_servicio);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createMatenimientoServicio($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO mantenimiento_servicios (idmantenimiento_sistemas, idmantenimiento_tipos_servicios, cod_servicio, nombre_servicio, descripcion_servicio, estado_servicio) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iisssi', $item->idmantenimiento_sistemas, $item->idmantenimiento_tipos_servicios, $item->cod_servicio, $item->nombre_servicio, $item->descripcion_servicio, $item->estado_servicio);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateMatenimientoServicio($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE mantenimiento_servicios SET idmantenimiento_sistemas=?, idmantenimiento_tipos_servicios=?, cod_servicio=?, nombre_servicio=?, descripcion_servicio=? WHERE idmantenimiento_servicios=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iisssi', $item->idmantenimiento_sistemas, $item->idmantenimiento_tipos_servicios, $item->cod_servicio, $item->nombre_servicio, $item->descripcion_servicio, $item->idmantenimiento_servicios);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteMatenimientoServicio($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM mantenimiento_servicios WHERE idmantenimiento_servicios = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM mantenimiento_servicios");
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
