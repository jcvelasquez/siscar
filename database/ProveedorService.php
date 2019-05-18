<?php

class ProveedorService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	
	
	public function getAllProveedores($settings = array()) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idproveedores, razon_social, ruc_proveedor, telefono_proveedor, celular_proveedor, domicilio_fiscal, correo_electronico, representante_legal, dni_representante_legal, estado_proveedor, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM proveedores");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idproveedores, $row->razon_social, $row->ruc_proveedor, $row->telefono_proveedor, $row->celular_proveedor, $row->domicilio_fiscal, $row->correo_electronico, $row->representante_legal, $row->dni_representante_legal, $row->estado_proveedor, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idproveedores, $row->razon_social, $row->ruc_proveedor, $row->telefono_proveedor, $row->celular_proveedor, $row->domicilio_fiscal, $row->correo_electronico, $row->representante_legal, $row->dni_representante_legal, $row->estado_proveedor, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getProveedorByID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idproveedores, razon_social, ruc_proveedor, telefono_proveedor, celular_proveedor, domicilio_fiscal, correo_electronico, representante_legal, dni_representante_legal, estado_proveedor, fecha_creacion, usuario_creacion, fecha_modificacion, usuario_modificacion FROM proveedores WHERE idproveedores=?");
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idproveedores, $row->razon_social, $row->ruc_proveedor, $row->telefono_proveedor, $row->celular_proveedor, $row->domicilio_fiscal, $row->correo_electronico, $row->representante_legal, $row->dni_representante_legal, $row->estado_proveedor, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createProveedor($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO proveedores (razon_social, ruc_proveedor, telefono_proveedor, celular_proveedor, domicilio_fiscal, correo_electronico, representante_legal, dni_representante_legal, estado_proveedor, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'ssssssssiss', $item->razon_social, $item->ruc_proveedor, $item->telefono_proveedor, $item->celular_proveedor, $item->domicilio_fiscal, $item->correo_electronico, $item->representante_legal, $item->dni_representante_legal, $item->estado_proveedor, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateProveedor($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE proveedores SET razon_social=?, ruc_proveedor=?, telefono_proveedor=?, domicilio_fiscal=?, correo_electronico=?, representante_legal=?, dni_representante_legal=?, estado_proveedor=?, fecha_modificacion=?, usuario_modificacion=? WHERE idproveedores=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'sssssssissi', $item->razon_social, $item->ruc_proveedor, $item->telefono_proveedor, $item->domicilio_fiscal, $item->correo_electronico, $item->representante_legal, $item->dni_representante_legal, $item->estado_proveedor, $item->fecha_modificacion, $item->usuario_modificacion,  $item->idproveedores);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		

	}
	
	
	public function validarRuc($item) {
				
			$client = new SoapClient("http://ws.pide.gob.pe/ConsultaRuc?wsdl");
			$client->__setLocation('http://ws.pide.gob.pe/ConsultaRuc');
			
			$result_rso = $client->__soapCall("getDatosPrincipales", array('numruc' => $item->ruc));
			
			$result_rep = $client->__soapCall("getRepLegales", array('numruc' => $item->ruc));
			
			
			if($result_rso && $result_rep){
				
				$result_rso->ddp_nombre = trim($result_rso->ddp_nombre);
				$result_rso->ddp_refer1 = trim($result_rso->ddp_refer1);
				$result_rso->desc_tipvia = trim($result_rso->desc_tipvia);
				$result_rso->ddp_nomvia = trim($result_rso->ddp_nomvia);
				$result_rso->ddp_numer1 = trim($result_rso->ddp_numer1);
				$result_rso->desc_tipzon = trim($result_rso->desc_tipzon);
				$result_rso->ddp_nomzon = trim($result_rso->ddp_nomzon);
				$result_rso->desc_dep = trim($result_rso->desc_dep);
				$result_rso->desc_prov = trim($result_rso->desc_prov);
				$result_rso->desc_dist = trim($result_rso->desc_dist);
				
				$result_rep->rso_nombre = trim($result_rep->rso_nombre);
				$result_rep->rso_nrodoc = trim($result_rep->rso_nrodoc);
		
				return array("status" => true, "message" => "Se encontraron los siguientes datos" , "ddp_nombre" => $result_rso->ddp_nombre,  "ddp_refer1"=> $result_rso->ddp_refer1, "desc_tipvia"=> $result_rso->desc_tipvia, "ddp_nomvia"=> $result_rso->ddp_nomvia, "ddp_numer1"=> $result_rso->ddp_numer1 , "desc_tipzon"=> $result_rso->desc_tipzon, "ddp_nomzon"=> $result_rso->ddp_nomzon, "desc_dep" => $result_rso->desc_dep , "desc_prov"=> $result_rso->desc_prov, "desc_dist"=> $result_rso->desc_dist, "esActivo"=> $result_rso->esActivo, "esHabido"=> $result_rso->esHabido, "rso_nombre" => $result_rep->rso_nombre, "rso_nrodoc" => $result_rep->rso_nrodoc);
					
			}else{
				return array("status" => false, "message" => "No se encontro datos con el ruc ingresado.");
			}
				
		
	}


	public function deleteProveedor($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM proveedores WHERE idproveedores = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM proveedores");
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
