<?php

class TarjetasCombustibleService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTarjetas($settings = array()) {
		
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
		
			$query = "SELECT tc.idtarjetas_combustible,
							 tc.id_item_adjudicados, 
							 cia.cantidad,
							 cia.precio_total,
							 cia.idtipo_combustible,
							 tico.tipo_combustible,
							 cia.idmedida_combustible,
							 mc.medida_combustible,
							 cia.contratos_idcontratos,
							 con.nombre_contrato,
							 tc.vehiculos_idvehiculos, 
							 ve.placa_vehiculo,
							 ve.sedes_idsedes,
							 tc.proveedores_idproveedores, 
							 pro.razon_social,
							 tc.nro_tarjeta,
							 tc.estado_tarjeta
					    FROM tarjetas_combustible tc,
							 vehiculos ve,
							 proveedores pro,
							 contratos_item_adjudicados cia,
							 contratos con,
							 tipo_combustible tico,
							 medida_combustible mc
					   WHERE tc.vehiculos_idvehiculos = ve.idvehiculos
						 AND tc.proveedores_idproveedores = pro.idproveedores
						 AND tc.id_item_adjudicados = cia.id_item_adjudicados
						 AND cia.contratos_idcontratos = con.idcontratos
						 AND cia.idtipo_combustible = tico.idtipo_combustible
						 AND cia.idmedida_combustible = mc.idmedida_combustible";
			
			if(!empty($settings['search']['value'])) 
			{
				$query .= " AND (c.nombre_contrato LIKE '%".$settings['search']['value']."%' OR c.nro_contrato LIKE '%".$settings['search']['value']."%' OR s.nombre_sede LIKE '%".$settings['search']['value']."%' OR oc.descripcion_orden_compra LIKE '%".$settings['search']['value']."%' OR oc.nro_orden_compra LIKE '%".$settings['search']['value']."%' ) ";
			}
			
			if($settings["estado"] != "-1") $query .= " AND tc.estado_tarjeta = " . $settings["estado"];
			
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
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->id_item_adjudicados, $row->cantidad, $row->precio_total, $row->idtipo_combustible,  $row->tipo_combustible, $row->idmedida_combustible , $row->medida_combustible, $row->contratos_idcontratos, $row->nombre_contrato, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->proveedores_idproveedores, $row->razon_social, $row->nro_tarjeta, $row->estado_tarjeta);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->id_item_adjudicados, $row->cantidad, $row->precio_total, $row->idtipo_combustible,  $row->tipo_combustible, $row->idmedida_combustible , $row->medida_combustible, $row->contratos_idcontratos, $row->nombre_contrato, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->proveedores_idproveedores, $row->razon_social, $row->nro_tarjeta, $row->estado_tarjeta);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	public function getTarjetasByVehiculoID($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idtarjetas_combustible, vehiculos_idvehiculos, proveedores_idproveedores, nro_tarjeta FROM tarjetas_combustible WHERE vehiculos_idvehiculos=?");		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->proveedores_idproveedores, $row->nro_tarjeta);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->proveedores_idproveedores, $row->nro_tarjeta);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			

	}
	

	
	public function getTarjetaByID($itemID) {
		
			$query = "SELECT tc.idtarjetas_combustible,
							 tc.id_item_adjudicados, 
							 cia.cantidad,
							 cia.precio_total,
							 cia.idtipo_combustible,
							 tico.tipo_combustible,
							 cia.idmedida_combustible,
							 mc.medida_combustible,
							 cia.contratos_idcontratos,
							 con.nombre_contrato,
							 tc.vehiculos_idvehiculos, 
							 ve.placa_vehiculo,
							 tc.proveedores_idproveedores, 
							 pro.razon_social,
							 tc.nro_tarjeta,
							 tc.estado_tarjeta
					    FROM tarjetas_combustible tc,
							 vehiculos ve,
							 proveedores pro,
							 contratos_item_adjudicados cia,
							 contratos con,
							 tipo_combustible tico,
							 medida_combustible mc
					   WHERE tc.vehiculos_idvehiculos = ve.idvehiculos
						 AND tc.proveedores_idproveedores = pro.idproveedores
						 AND tc.id_item_adjudicados = cia.id_item_adjudicados
						 AND cia.contratos_idcontratos = con.idcontratos
						 AND cia.idtipo_combustible = tico.idtipo_combustible
						 AND cia.idmedida_combustible = mc.idmedida_combustible
						 AND tc.idtarjetas_combustible=?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->id_item_adjudicados, $row->cantidad, $row->precio_total, $row->idtipo_combustible,  $row->tipo_combustible, $row->idmedida_combustible , $row->medida_combustible, $row->contratos_idcontratos, $row->nombre_contrato, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->proveedores_idproveedores, $row->razon_social, $row->nro_tarjeta, $row->estado_tarjeta);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createTarjeta($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tarjetas_combustible (vehiculos_idvehiculos, proveedores_idproveedores, id_item_adjudicados, nro_tarjeta, estado_tarjeta, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiisiss', $item->vehiculos_idvehiculos, $item->proveedores_idproveedores, $item->id_item_adjudicados, $item->nro_tarjeta, $item->estado_tarjeta, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateTarjeta($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE tarjetas_combustible SET vehiculos_idvehiculos=?, proveedores_idproveedores=?, id_item_adjudicados=?, nro_tarjeta=?, estado_tarjeta=?, fecha_modificacion=?, usuario_modificacion=? WHERE idtarjetas_combustible=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiisissi', $item->vehiculos_idvehiculos, $item->proveedores_idproveedores, $item->id_item_adjudicados , $item->nro_tarjeta, $item->estado_tarjeta, $item->fecha_modificacion, $item->usuario_modificacion, $item->idtarjetas_combustible);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteTarjeta($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM tarjetas_combustible WHERE idtarjetas_combustible = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM tarjetas_combustible");
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
