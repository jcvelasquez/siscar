<?php

class FichaTecnicaService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllFichasTecnicas($settings = array()) {
		
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
							 ve.placa_vehiculo, 
							 ve.kilometraje_inicio, 
							 ve.nro_serie, 
							 ve.ano_fabricacion,
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
		
			$totalFiltered = $settings['recordsTotal'];
			
			if( !empty($settings['search']['value']) ) 
			{
				$query .= " AND (ve.placa_vehiculo LIKE '%".$settings['search']['value']."%' OR mo.modelo_vehiculo LIKE '%".$settings['search']['value']."%' OR mv.marca_vehiculo LIKE '%".$settings['search']['value']."%' OR se.nombre_sede LIKE '%".$settings['search']['value']."%') ";
			}
			
			$query .= " ORDER BY ve.idvehiculos DESC ";
			
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT ".mysqli_real_escape_string( $this->connection, $settings['start'] ).", ".	mysqli_real_escape_string( $this->connection, $settings['length'] );
			}
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			if(empty($settings['search']['value'])) 
					$totalFiltered = $settings['recordsTotal']; 
			else 
					$totalFiltered = $stmt->store_result();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible,  $row->idmedida_uso, $row->medida_uso, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->kilometraje_inicio, $row->nro_serie, $row->ano_fabricacion, $row->estado_vehiculo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible,  $row->idmedida_uso, $row->medida_uso, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->kilometraje_inicio, $row->nro_serie, $row->ano_fabricacion, $row->estado_vehiculo);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	
	public function getFichaTecnicaByVehiculoID($itemID) {
		
		
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
							 ve.placa_vehiculo, 
							 (SELECT MAX(kilometraje_fin) FROM servicios_cierre_chofer scc, servicios_solicitud sc WHERE scc.idservicio_solicitud = sc.idservicio_solicitud AND sc.vehiculos_idvehiculos = ve.idvehiculos) as kilometraje_inicio, 
							 ve.nro_serie, 
							 ve.ano_fabricacion,
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
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->idtipos_vehiculo, $row->tipo_vehiculo, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible,  $row->idmedida_uso, $row->medida_uso, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->kilometraje_inicio, $row->nro_serie, $row->ano_fabricacion, $row->estado_vehiculo);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function getMatenimientoAlertasByVehiculoID($vehiculoID) {
		
			$query = "SELECT male.idmantenimiento_alertas, 
							 male.vehiculos_idvehiculos, 
							 vehi.descripcion_vehiculo,
							 vehi.placa_vehiculo,
							 vehi.sedes_idsedes,
							 sede.nombre_sede,
							 msis.idmantenimiento_sistemas,
							 msis.nombre_sistema,
							 male.idmantenimiento_servicios, 
							 mser.nombre_servicio, 
							 male.usuarios_idusuarios, 
							 usua.nombres,
							 usua.apellidos,
							 usua.email,
							 male.id_medida_uso, 
							 muso.medida_uso,
							 male.descripcion_alerta, 
							 male.is_custom_alerta,
							 male.ciclo_alerta, 
							 male.ejecucion_alerta, 
							 male.estado_alerta, 
							 male.fecha_creacion, 
							 male.usuario_creacion
						FROM mantenimiento_alertas AS male 
				  INNER JOIN mantenimiento_servicios AS mser
			  			  ON male.idmantenimiento_servicios = mser.idmantenimiento_servicios
				  INNER JOIN mantenimiento_sistemas AS msis
			  			  ON mser.idmantenimiento_sistemas = msis.idmantenimiento_sistemas		  
				  INNER JOIN usuarios AS usua
			  			  ON male.usuarios_idusuarios = usua.idusuarios
				  INNER JOIN vehiculos AS vehi
			  			  ON male.vehiculos_idvehiculos = vehi.idvehiculos		
				  INNER JOIN sedes AS sede
			  			  ON vehi.sedes_idsedes = sede.idsedes			  
				   LEFT JOIN medida_uso AS muso 
						  ON mser.id_medida_uso = muso.id_medida_uso
					   WHERE male.vehiculos_idvehiculos = ?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $vehiculoID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			$records["data"] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records["data"][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idmantenimiento_alertas, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo,  $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->idmantenimiento_sistemas, $row->nombre_sistema, $row->idmantenimiento_servicios, $row->nombre_servicio, $row->usuarios_idusuarios, $row->nombres, $row->apellidos, $row->email, $row->id_medida_uso, $row->medida_uso, $row->descripcion_alerta, $row->is_custom_alerta, $row->ciclo_alerta, $row->ejecucion_alerta, $row->estado_alerta, $row->fecha_creacion, $row->usuario_creacion);

			}
		
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
   
			return $records;
			
	}
	
	
	/*
	public function getVehiculosBySedeID($itemID) {
		
			$query = "SELECT ve.idvehiculos, 
							 mv.idmarcas_vehiculos,
							 mv.marca_vehiculo,
							 ve.placa_vehiculo, 
							 ve.idmodelos_vehiculos,
							 mo.modelo_vehiculo
					    FROM vehiculos ve,
					   		 marcas_vehiculos mv,
							 sedes se,
							 modelos_vehiculos mo
					   WHERE ve.sedes_idsedes = se.idsedes
						 AND mo.idmarcas_vehiculos = mv.idmarcas_vehiculos
						 AND ve.idmodelos_vehiculos = mo.idmodelos_vehiculos
					     AND ve.sedes_idsedes = ?";
					   		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->placa_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idvehiculos, $row->idmarcas_vehiculos, $row->marca_vehiculo, $row->placa_vehiculo, $row->idmodelos_vehiculos, $row->modelo_vehiculo);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
	}
	
	

	public function getVehiculoByIDTarjeta($itemID) {
		
			$query = "SELECT tc.idtarjetas_combustible, 
							 tc.vehiculos_idvehiculos, 
							 ve.descripcion_vehiculo,
							 ve.placa_vehiculo,
							 tc.proveedores_idproveedores, 
							 tc.nro_tarjeta, 
							 tc.vigencia_desde, 
							 tc.vigencia_hasta, 
							 tc.estado_tarjeta 
					   FROM tarjetas_combustible tc,
					   	    vehiculos ve
					 WHERE tc.vehiculos_idvehiculos = ve.idvehiculos
					   AND tc.idtarjetas_combustible = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idtarjetas_combustible, $row->vehiculos_idvehiculos, $row->descripcion_vehiculo, $row->placa_vehiculo, $row->proveedores_idproveedores, $row->nro_tarjeta, $row->vigencia_desde, $row->vigencia_hasta, $row->estado_tarjeta);
			
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
	
	
	public function createVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO vehiculos (sedes_idsedes, idtipos_vehiculo, idtipo_combustible, idmedida_combustible, idmedida_uso, idmodelos_vehiculos, descripcion_vehiculo, placa_vehiculo, kilometraje_inicio, nro_serie, ano_fabricacion, estado_vehiculo, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiiiisssssiss', $item->sedes_idsedes, $item->idtipos_vehiculo, $item->idtipo_combustible, $item->idmedida_combustible, $item->idmedida_uso, $item->idmodelos_vehiculos, $item->descripcion_vehiculo, $item->placa_vehiculo, $item->kilometraje_inicio, $item->nro_serie, $item->ano_fabricacion, $item->estado_vehiculo, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateVehiculo($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE vehiculos SET sedes_idsedes=?, idtipos_vehiculo=?, idtipo_combustible=?, idmedida_combustible=?, idmedida_uso=?, idmodelos_vehiculos=?, descripcion_vehiculo=?, placa_vehiculo=?, kilometraje_inicio=?, nro_serie=?, ano_fabricacion=?, estado_vehiculo=?, fecha_modificacion=?, usuario_modificacion=? WHERE idvehiculos=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiiiiisssssissi', $item->sedes_idsedes, $item->idtipos_vehiculo, $item->idtipo_combustible, $item->idmedida_combustible, $item->idmedida_uso, $item->idmodelos_vehiculos, $item->descripcion_vehiculo, $item->placa_vehiculo, $item->kilometraje_inicio, $item->nro_serie, $item->ano_fabricacion, $item->estado_vehiculo, $item->fecha_modificacion, $item->usuario_modificacion, $item->idvehiculos);		
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

	*/

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
