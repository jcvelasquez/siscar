<?php

class EmpresasService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllEmpresas($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idempresas, razon_social, ruc, direccion_fiscal_uno, direccion_fiscal_dos, telefono, estado_empresa, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM empresas LIMIT ?, ?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ii', $settings["iDisplayStart"], $settings["iDisplayLength"]);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idempresas, $row->razon_social, $row->ruc, $row->direccion_fiscal_uno, $row->direccion_fiscal_dos, $row->telefono, $row->estado_empresa, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idempresas, $row->razon_social, $row->ruc, $row->direccion_fiscal_uno, $row->direccion_fiscal_dos, $row->telefono, $row->estado_empresa, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
			return $records;
		
	}

	
	public function getEmpresaByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idempresas, razon_social, ruc, direccion_fiscal_uno, direccion_fiscal_dos, telefono, estado_empresa, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM emppresas WHERE idempresas=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idempresas, $row->razon_social, $row->ruc, $row->direccion_fiscal_uno, $row->direccion_fiscal_dos, $row->telefono, $row->estado_empresa, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createEmpresa($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO empresas (razon_social, ruc, direccion_fiscal_uno, direccion_fiscal_dos, telefono, estado_empresa, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'sssssiss', $item->razon_social, $item->ruc, $item->direccion_fiscal_uno, $item->direccion_fiscal_dos, $item->telefono, $item->estado_empresa, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateEmpresa($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE empresas SET razon_social=?, ruc=?, direccion_fiscal_uno=?, direccion_fiscal_dos=?, telefono=?, estado_empresa=?, fecha_modificacion=?, usuario_modificacion=? WHERE idempresas=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sssssissi', $item->razon_social, $item->ruc, $item->direccion_fiscal_uno, $item->direccion_fiscal_dos, $item->telefono, $item->estado_empresa, $item->fecha_modificacion, $item->usuario_modificacion, $item->idempresas);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return "OK";

	}


	public function deleteEmpresa($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM empresas WHERE idempresas = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM empresas");
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
