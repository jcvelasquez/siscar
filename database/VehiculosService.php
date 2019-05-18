<?php

class VehiculosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllVehiculos($settings = array()) {
		
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
			
			$query = "SELECT ve.idvehiculos, 
							 ve.sedes_idsedes, 
							 se.nombre_sede,
							 ve.idtipos_vehiculo, 
							 tv.tipo_vehiculo,
							 mo.idmarcas_vehiculos, 
							 mv.marca_vehiculo,
							 ve.idmodelos_vehiculos,
							 mo.modelo_vehiculo,
							 ve.idtipo_combustible, 
							 tc.tipo_combustible,
							 ve.idmedida_combustible, 
							 mc.medida_combustible,
							 ve.idmedida_uso, 
							 mu.medida_uso,
							 ve.descripcion_vehiculo, 
							 ve.color_calendario,
							 ve.placa_vehiculo, 
							 ve.kilometraje_inicio, 
							 ve.nro_serie, 
							 ve.nro_motor,
							 ve.ano_fabricacion,
							 ve.vencimiento_soat,
							 ve.clase_transparencia,
							 ve.es_pool,
							 ve.estado_vehiculo
					    FROM vehiculos ve,
					   		 marcas_vehiculos mv,
							 sedes se,
							 medida_uso mu,
							 medida_combustible mc,
							 tipo_vehiculo tv,
							 tipo_combustible tc,
							 modelos_vehiculos mo
					   WHERE ve.sedes_idsedes = se.idsedes
					     AND ve.idtipos_vehiculo = tv.idtipos_vehiculo
						 AND ve.idtipo_combustible = tc.idtipo_combustible
						 AND ve.idmedida_combustible = mc.idmedida_combustible
						 AND ve.idmedida_uso = mu.id_medida_uso
						 AND ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
						 AND mo.idmarcas_vehiculos = mv.idmarcas_vehiculos";
					
			if( !empty($settings['search']['value']) ) 
			{
				$query .= " AND (ve.placa_vehiculo LIKE '%".$settings['search']['value']."%' OR mo.modelo_vehiculo LIKE '%".$settings['search']['value']."%' OR mv.marca_vehiculo LIKE '%".$settings['search']['value']."%' OR se.nombre_sede LIKE '%".$settings['search']['value']."%') ";
			}
			
			if($settings["estado"] != "-1") $query .= " AND ve.estado_vehiculo = " . $settings["estado"];
			
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
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible,  $row->idmedida_uso, $row->medida_uso, $row->descripcion_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->kilometraje_inicio, $row->nro_serie, $row->nro_motor, $row->ano_fabricacion, $row->vencimiento_soat, $row->clase_transparencia, $row->es_pool, $row->estado_vehiculo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible,  $row->idmedida_uso, $row->medida_uso, $row->descripcion_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->kilometraje_inicio, $row->nro_serie, $row->nro_motor, $row->ano_fabricacion, $row->vencimiento_soat, $row->clase_transparencia, $row->es_pool, $row->estado_vehiculo);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	
	public function getVehiculoByID($itemID) {
		
			$query = "SELECT ve.idvehiculos, 
							 ve.sedes_idsedes, 
							 se.nombre_sede,
							 ve.idtipos_vehiculo, 
							 tv.tipo_vehiculo,
							 mo.idmarcas_vehiculos, 
							 mv.marca_vehiculo,
							 ve.idmodelos_vehiculos,
							 mo.modelo_vehiculo,
							 ve.idtipo_combustible, 
							 tc.tipo_combustible,
							 ve.idmedida_combustible, 
							 mc.medida_combustible,
							 ve.idmedida_uso, 
							 mu.medida_uso,
							 ve.descripcion_vehiculo, 
							 ve.color_calendario,
							 ve.placa_vehiculo, 
							 ve.kilometraje_inicio, 
							 ve.nro_serie, 
							 ve.nro_motor,
							 ve.ano_fabricacion,
							 ve.vencimiento_soat,
							 ve.clase_transparencia,
							 ve.es_pool,
							 ve.estado_vehiculo
					    FROM vehiculos ve,
					   		 marcas_vehiculos mv,
							 sedes se,
							 medida_uso mu,
							 medida_combustible mc,
							 tipo_vehiculo tv,
							 tipo_combustible tc,
							 modelos_vehiculos mo
					   WHERE ve.sedes_idsedes = se.idsedes
					     AND ve.idtipos_vehiculo = tv.idtipos_vehiculo
						 AND ve.idtipo_combustible = tc.idtipo_combustible
						 AND ve.idmedida_combustible = mc.idmedida_combustible
						 AND ve.idmedida_uso = mu.id_medida_uso
						 AND ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
						 AND mo.idmarcas_vehiculos = mv.idmarcas_vehiculos
					     AND ve.idvehiculos = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible,  $row->idmedida_uso, $row->medida_uso, $row->descripcion_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->kilometraje_inicio, $row->nro_serie, $row->nro_motor, $row->ano_fabricacion, $row->vencimiento_soat, $row->clase_transparencia, $row->es_pool, $row->estado_vehiculo);
			
			if(mysqli_stmt_fetch($stmt)) {
				
			  if($row->vencimiento_soat != NULL){
				  $row->vencimiento_soat = DateTime::createFromFormat('Y-m-d', $row->vencimiento_soat);
				  $row->vencimiento_soat = $row->vencimiento_soat->format('d/m/Y');	
			  }
			  
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	
	public function getVehiculosChoferBySedeID($itemID) {
			
			$query = "SELECT ve.idvehiculos, 
							 mv.idmarcas_vehiculos,
							 mv.marca_vehiculo,
							 ve.color_calendario,
							 ve.placa_vehiculo, 
							 ve.idmodelos_vehiculos,
							 mo.modelo_vehiculo,
							 cho.idchofer,
							 CONCAT(cho.nombres_chofer, ' ', cho.apellidos_chofer) as nombre_chofer,
							 cho.usuario_chofer
					    FROM vehiculos AS ve
				  INNER JOIN modelos_vehiculos mo
						  ON ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
				  INNER JOIN marcas_vehiculos AS mv
				  		  ON mo.idmarcas_vehiculos = mv.idmarcas_vehiculos
				  INNER JOIN sedes AS se
					   	  ON ve.sedes_idsedes = se.idsedes 
				   LEFT JOIN chofer AS cho  
						  ON cho.vehiculos_idvehiculos = ve.idvehiculos 
					   WHERE ve.sedes_idsedes = ?
						 AND ve.es_pool = 1
						 AND cho.estado_chofer = 1";
						 		   		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idchofer, $row->nombre_chofer, $row->usuario_chofer);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idchofer, $row->nombre_chofer, $row->usuario_chofer);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
	}
	
	
	public function getVehiculosBySedeID($settings = array()) {
			
			$query = "SELECT ve.idvehiculos, 
							 mv.idmarcas_vehiculos,
							 mv.marca_vehiculo,
							 ve.color_calendario,
							 ve.placa_vehiculo, 
							 ve.idmodelos_vehiculos,
							 mo.modelo_vehiculo
					    FROM vehiculos AS ve
				  INNER JOIN modelos_vehiculos mo
						  ON ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
				  INNER JOIN marcas_vehiculos AS mv
				  		  ON mo.idmarcas_vehiculos = mv.idmarcas_vehiculos
				  INNER JOIN sedes AS se
					   	  ON ve.sedes_idsedes = se.idsedes 
					   WHERE ve.sedes_idsedes = ? ";
			
			if($settings["estado"] != "-1") $query .= " AND ve.estado_vehiculo = " . $settings["estado"];
						 		   		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $settings["id"]);
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
	}
	
	public function getAdjuntosVehiculoByIDVehiculo($itemID) {
		
			$query = "SELECT idadjuntos_vehiculos, 
							 vehiculos_idvehiculos, 
							 archivo_vehiculo, 
							 size_archivo_vehiculo, 
							 isImage, 
							 estado_adjunto
					    FROM adjuntos_vehiculos
					   WHERE vehiculos_idvehiculos = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idadjuntos_vehiculos, $row->vehiculos_idvehiculos, $row->archivo_vehiculo, $row->size_archivo_vehiculo, $row->isImage, $row->estado_adjunto);
			
			while (mysqli_stmt_fetch($stmt)) {
		  
				$base = log($row->size_archivo_vehiculo) / log(1024);
  				$suffix = array("", "KB", "MB", "GB", "TB");
  				$f_base = floor($base);
  				$row->size_archivo_vehiculo = round(pow(1024, $base - floor($base)), 1) . " " .$suffix[$f_base];
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idadjuntos_vehiculos, $row->vehiculos_idvehiculos, $row->archivo_vehiculo, $row->size_archivo_vehiculo, $row->isImage, $row->estado_adjunto);
				  
			}
						
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
			
	}
	
	
	

	public function getVehiculoByIDTarjeta($itemID) {
		
			$query = "SELECT tc.idtarjetas_combustible, 
							 tc.vehiculos_idvehiculos, 
							 ve.descripcion_vehiculo,
							 ve.color_calendario,
							 ve.placa_vehiculo,
							 tc.proveedores_idproveedores, 
							 tc.id_item_adjudicados,
							 tc.nro_tarjeta, 
							 tc.estado_tarjeta,
							 cia.contratos_idcontratos, 
							 cia.idmedida_combustible, 
							 cia.idtipo_combustible 
					   FROM tarjetas_combustible tc,
					   	    vehiculos ve,
							contratos_item_adjudicados cia
					 WHERE tc.vehiculos_idvehiculos = ve.idvehiculos
					   AND tc.id_item_adjudicados = cia.id_item_adjudicados
					   AND tc.idtarjetas_combustible = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->color_calendario, $row->placa_vehiculo, $row->proveedores_idproveedores, $row->id_item_adjudicados, $row->nro_tarjeta, $row->estado_tarjeta, $row->contratos_idcontratos, $row->idmedida_combustible, $row->idtipo_combustible);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	
	
	public function getMarcaVehiculoByID($itemID) {
		
			$query = "SELECT ve.idvehiculos, 
							 mv.marca_vehiculo,
							 mo.modelo_vehiculo,
							 mv.estado_marca
					    FROM vehiculos ve,
					   		 marcas_vehiculos mv,
							 sedes se,
							 modelos_vehiculos mo
					   WHERE ve.sedes_idsedes = se.idsedes
						 AND mo.idmarcas_vehiculos = mv.idmarcas_vehiculos
						 AND ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
						 AND mv.idmarcas_vehiculos=?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->modelo_vehiculo, $row->estado_marca);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createVehiculosAdjuntos($item) {
				
		$stmt = mysqli_prepare($this->connection, "INSERT INTO adjuntos_vehiculos (vehiculos_idvehiculos, archivo_vehiculo, size_archivo_vehiculo, isImage, estado_adjunto, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();
			
		mysqli_stmt_bind_param($stmt, 'isiiiss', $item->vehiculos_idvehiculos, $item->archivo_vehiculo, $item->size_archivo_vehiculo, $item->isImage, $item->estado_adjunto, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	
	public function createVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO vehiculos (sedes_idsedes, idtipos_vehiculo, idtipo_combustible, idmedida_combustible, idmedida_uso, idmodelos_vehiculos, descripcion_vehiculo, color_calendario, placa_vehiculo, kilometraje_inicio, nro_serie, nro_motor, ano_fabricacion, vencimiento_soat, clase_transparencia, es_pool, estado_vehiculo, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiiiissssssssiiiss', $item->sedes_idsedes, $item->idtipos_vehiculo, $item->idtipo_combustible, $item->idmedida_combustible, $item->idmedida_uso, $item->idmodelos_vehiculos, $item->descripcion_vehiculo, $item->color_calendario, $item->placa_vehiculo, $item->kilometraje_inicio, $item->nro_serie, $item->nro_motor, $item->ano_fabricacion, $item->vencimiento_soat, $item->clase_transparencia, $item->es_pool, $item->estado_vehiculo, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE vehiculos SET sedes_idsedes=?, idtipos_vehiculo=?, idtipo_combustible=?, idmedida_combustible=?, idmedida_uso=?, idmodelos_vehiculos=?, descripcion_vehiculo=?, color_calendario=?, placa_vehiculo=?, kilometraje_inicio=?, nro_serie=?, nro_motor=?, ano_fabricacion=?, vencimiento_soat=?, clase_transparencia=?, es_pool=?, estado_vehiculo=?, fecha_modificacion=?, usuario_modificacion=? WHERE idvehiculos=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiiiiissssssssiiissi', $item->sedes_idsedes, $item->idtipos_vehiculo, $item->idtipo_combustible, $item->idmedida_combustible, $item->idmedida_uso, $item->idmodelos_vehiculos, $item->descripcion_vehiculo, $item->color_calendario, $item->placa_vehiculo, $item->kilometraje_inicio, $item->nro_serie, $item->nro_motor, $item->ano_fabricacion, $item->vencimiento_soat, $item->clase_transparencia, $item->es_pool, $item->estado_vehiculo, $item->fecha_modificacion, $item->usuario_modificacion, $item->idvehiculos);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteVehiculo($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM vehiculos WHERE idvehiculos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();

		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	public function deleteAdjuntoVehiculo($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM adjuntos_vehiculos WHERE idadjuntos_vehiculos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM vehiculos");
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
