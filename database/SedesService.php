<?php

class SedesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllSedes($settings = array()) {
			
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
		
			$query = "SELECT idsedes, 
							 empresas_idempresas, 
							 nombre_sede, 
							 direccion_uno, 
							 direccion_dos, 
							 telefono_sede, 
							 celular_sede, 
							 correo_sede, 
							 coordenadas_sede, 
							 estado_sede, 
							 fecha_creacion, 
							 usuario_creacion, 
							 fecha_modificacion, 
							 usuario_modificacion 
						FROM sedes ";
			
			if(!empty($settings['search']['value'])) 
			{
				$query .= " WHERE nombre_sede LIKE '%".$settings['search']['value']."%' OR direccion_uno LIKE '%".$settings['search']['value']."%' OR correo_sede LIKE '%".$settings['search']['value']."%' ";
			}
			
			if (isset($order_by) && isset($order_dir))
			{
				$query .= " ORDER BY " . $order_by ." " .  $order_dir ;
			}
			
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT ".mysqli_real_escape_string( $this->connection, $settings['start'] ).", ".	mysqli_real_escape_string( $this->connection, $settings['length'] );
			}
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			//MUESTRA EL TOTAL FILTRADOS
			$totalFiltered = (empty($settings['search']['value']))? $settings['recordsTotal'] : $stmt->store_result();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idsedes, $row->empresas_idempresas, $row->nombre_sede, $row->direccion_uno, $row->direccion_dos, $row->telefono_sede, $row->celular_sede, $row->correo_sede, $row->coordenadas_sede, $row->estado_sede, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			while (mysqli_stmt_fetch($stmt)) {
				
				  $row->nombre_sede = utf8_encode($row->nombre_sede);
				  $row->direccion_uno = utf8_encode($row->direccion_uno);
				  $row->direccion_dos = utf8_encode($row->direccion_dos);
				  $row->correo_sede = utf8_encode($row->correo_sede);
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idsedes, $row->empresas_idempresas, $row->nombre_sede, $row->direccion_uno, $row->direccion_dos, $row->telefono_sede, $row->celular_sede, $row->correo_sede, $row->coordenadas_sede, $row->estado_sede, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);

			}
		
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
		
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
		
	}

	
	public function getSedeByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idsedes, empresas_idempresas, nombre_sede, direccion_uno, direccion_dos, telefono_sede, celular_sede, correo_sede, coordenadas_sede, estado_sede, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM sedes WHERE idsedes=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idsedes, $row->empresas_idempresas, $row->nombre_sede, $row->direccion_uno, $row->direccion_dos, $row->telefono_sede, $row->celular_sede, $row->correo_sede, $row->coordenadas_sede, $row->estado_sede, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createSede($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO sedes (empresas_idempresas, nombre_sede, direccion_uno, direccion_dos, telefono_sede, celular_sede, correo_sede, coordenadas_sede, estado_sede, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'isssssssiss', $item->empresas_idempresas, $item->nombre_sede, $item->direccion_uno, $item->direccion_dos, $item->telefono_sede, $item->celular_sede, $item->correo_sede, $item->coordenadas_sede, $item->estado_sede, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateSede($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE sedes SET empresas_idempresas=?, nombre_sede=?, direccion_uno=?, direccion_dos=?, telefono_sede=?, celular_sede=?, correo_sede=?, coordenadas_sede=?, estado_sede=?, fecha_modificacion=?, usuario_modificacion=? WHERE idsedes=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isssssssissi', $item->empresas_idempresas, $item->nombre_sede, $item->direccion_uno, $item->direccion_dos, $item->telefono_sede, $item->celular_sede, $item->correo_sede, $item->coordenadas_sede, $item->estado_sede, $item->fecha_modificacion, $item->usuario_modificacion, $item->idsedes);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteSede($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM sedes WHERE idsedes = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM sedes");
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
