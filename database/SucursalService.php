<?php

class SucursalService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllSucursales($settings = array()) {
		
			$query = "SELECT su.idsucursales, 
							 su.proveedores_idproveedores, 
							 pro.razon_social,
							 pro.ruc_proveedor,
							 su.nombre_sucursal, 
							 su.direccion_sucursal, 
							 su.encargado_sucursal, 
							 su.telefono_sucursal,
							 su.estado_sucursal 
					    FROM sucursales su,
							 proveedores pro
					   WHERE su.proveedores_idproveedores = pro.idproveedores";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idsucursales, $row->proveedores_idproveedores, $row->razon_social, $row->ruc_proveedor, $row->nombre_sucursal, $row->direccion_sucursal, $row->encargado_sucursal, $row->telefono_sucursal, $row->estado_sucursal);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idsucursales, $row->proveedores_idproveedores, $row->razon_social, $row->ruc_proveedor, $row->nombre_sucursal, $row->direccion_sucursal, $row->encargado_sucursal, $row->telefono_sucursal, $row->estado_sucursal);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getSucursalesByID($itemID) {
		
			$query = "SELECT su.idsucursales, 
							 su.proveedores_idproveedores, 
							 pro.razon_social,
							 pro.ruc_proveedor,
							 su.nombre_sucursal, 
							 su.direccion_sucursal, 
							 su.encargado_sucursal, 
							 su.telefono_sucursal,
							 su.estado_sucursal
					    FROM sucursales su,
							 proveedores pro
					   WHERE su.proveedores_idproveedores = pro.idproveedores
					     AND su.idsucursales=?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idsucursales, $row->proveedores_idproveedores, $row->razon_social, $row->ruc_proveedor, $row->nombre_sucursal, $row->direccion_sucursal, $row->encargado_sucursal, $row->telefono_sucursal, $row->estado_sucursal);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}

	
	public function getSucursalesByProveedorID($itemID) {
			
			$query = "SELECT su.idsucursales, 
							 su.proveedores_idproveedores, 
							 pro.razon_social,
							 pro.ruc_proveedor,
							 su.nombre_sucursal, 
							 su.direccion_sucursal, 
							 su.encargado_sucursal, 
							 su.telefono_sucursal,
							 su.estado_sucursal
					    FROM sucursales su,
							 proveedores pro
					   WHERE su.proveedores_idproveedores = pro.idproveedores
					     AND su.proveedores_idproveedores=?";
						 
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idsucursales, $row->proveedores_idproveedores, $row->razon_social, $row->ruc_proveedor, $row->nombre_sucursal, $row->direccion_sucursal, $row->encargado_sucursal, $row->telefono_sucursal, $row->estado_sucursal);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idsucursales, $row->proveedores_idproveedores, $row->razon_social, $row->ruc_proveedor, $row->nombre_sucursal, $row->direccion_sucursal, $row->encargado_sucursal, $row->telefono_sucursal, $row->estado_sucursal);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			

	}
	
	
	public function createSucursal($item) {
						
		$stmt = mysqli_prepare($this->connection, "INSERT INTO sucursales (proveedores_idproveedores, nombre_sucursal, direccion_sucursal, encargado_sucursal, telefono_sucursal, estado_sucursal) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'issssi', $item->proveedores_idproveedores, $item->nombre_sucursal, $item->direccion_sucursal, $item->encargado_sucursal, $item->telefono_sucursal, $item->estado_sucursal);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateSucursal($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE sucursales SET proveedores_idproveedores=?, nombre_sucursal=?, direccion_sucursal=?, encargado_sucursal=?, telefono_sucursal=?, estado_sucursal=? WHERE idsucursales=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'issssii', $item->proveedores_idproveedores, $item->nombre_sucursal, $item->direccion_sucursal, $item->encargado_sucursal, $item->telefono_sucursal, $item->estado_sucursal, $item->idsucursales);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		

	}


	public function deleteSucursal($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM sucursales WHERE idsucursales = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM sucursales");
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
