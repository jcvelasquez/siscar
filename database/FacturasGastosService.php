 <?php

class FacturasGastosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllFacturasCombustible($settings = array()) {
		
				$query ="SELECT fc.idfacturas_combustible, 
								fc.idvehiculos, 
								ve.placa_vehiculo,
								fc.idtipo_combustible, 
								tc.tipo_combustible,
								fc.chofer_idchofer,
								CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
								fc.nro_factura, 
								fc.ruc_factura, 
								DATE_FORMAT(fc.fecha_factura, '%d/%m/%Y') as fecha_factura, 
								fc.nombre_proveedor, 
								fc.direccion_proveedor, 
								fc.kilometraje_factura, 
								fc.nro_meta, 
								fc.cantidad_combustible, 
								fc.precio_unitario_combustible, 
								fc.importe_total_combustible, 
								fc.es_tanque_lleno, 
								fc.estado_factura_combustible, 
								fc.fecha_creacion, 
								fc.usuario_creacion, 
								fc.fecha_modificacion, 
								fc.usuario_modificacion
						   FROM facturas_combustible fc,
						        tipo_combustible tc,
								vehiculos ve,
								chofer cho
						  WHERE fc.idtipo_combustible = tc.idtipo_combustible
						    AND fc.idvehiculos = ve.idvehiculos
							AND fc.chofer_idchofer = cho.idchofer
					   ORDER BY fc.idfacturas_combustible DESC";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas_combustible, $row->idvehiculos, $row->placa_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->chofer_idchofer,  $row->nombre_chofer , $row->nro_factura, $row->ruc_factura, $row->fecha_factura, $row->nombre_proveedor, $row->direccion_proveedor, $row->kilometraje_factura, $row->nro_meta, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->es_tanque_lleno, $row->estado_factura_combustible, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				
				mysqli_stmt_bind_result($stmt, $row->idfacturas_combustible, $row->idvehiculos, $row->placa_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->chofer_idchofer,  $row->nombre_chofer , $row->nro_factura, $row->ruc_factura, $row->fecha_factura, $row->nombre_proveedor, $row->direccion_proveedor, $row->kilometraje_factura, $row->nro_meta, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->es_tanque_lleno, $row->estado_factura_combustible, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function validarRuc($item) {
		
			//if(!empty($_POST['action_type']) && $_POST['action_type'] == "validar_ruc"){
		
					$client = new SoapClient("http://ws.pide.gob.pe/ConsultaRuc?wsdl");
					$client->__setLocation('http://ws.pide.gob.pe/ConsultaRuc');
					$result = $client->__soapCall("getDatosPrincipales", array('numruc' => $item->ruc));
					
					if($result->ddp_nombre){
						
						$result->ddp_nombre = trim($result->ddp_nombre);
						$result->ddp_refer1 = trim($result->ddp_refer1);
						$result->desc_tipvia = trim($result->desc_tipvia);
						$result->ddp_nomvia = trim($result->ddp_nomvia);
						$result->ddp_numer1 = trim($result->ddp_numer1);
						$result->desc_tipzon = trim($result->desc_tipzon);
						$result->ddp_nomzon = trim($result->ddp_nomzon);
						$result->desc_dep = trim($result->desc_dep);
						$result->desc_prov = trim($result->desc_prov);
						$result->desc_dist = trim($result->desc_dist);
				
						return array("status" => true, "message" => "Se encontraron los siguientes datos" , "ddp_nombre" => $result->ddp_nombre,  "ddp_refer1"=> $result->ddp_refer1, "desc_tipvia"=> $result->desc_tipvia, "ddp_nomvia"=> $result->ddp_nomvia, "ddp_numer1"=> $result->ddp_numer1 , "desc_tipzon"=> $result->desc_tipzon, "ddp_nomzon"=> $result->ddp_nomzon, "desc_dep" => $result->desc_dep , "desc_prov"=> $result->desc_prov, "desc_dist"=> $result->desc_dist, "esActivo"=> $result->esActivo, "esHabido"=> $result->esHabido);
							
					}else{
						return array("status" => false, "message" => "No se encontro datos con el ruc ingresado.");
					}
				
		
	}
	
	/*
	public function getAllFacturasBySearch($settings = array()) {					  
					  
			$desde = $settings["desde"];
			$hasta = $settings["hasta"];
			
			$idordenes_compra = $settings["idordenes_compra"];
			$sedes_idsedes = $settings['sedes_idsedes'];
			$idproveedores = $settings['idproveedores'];
			
							
		   $query = "SELECT f.idfacturas, 
							f.ordenes_compra_idordenes_compra, 
							oc.nro_orden_compra,
							f.descrip_factura,
							DATE_FORMAT(f.fecha_factura, '%d/%m/%Y') as fecha_factura, 
							f.nro_factura, 
							f.cantidad_factura, 
							f.precio_unit_factura, 
							f.importe_total_factura,
							con.idcontratos,
							con.nombre_contrato,
							pro.idproveedores,
							pro.nombre_proveedor,
							con.sedes_idsedes,
							se.nombre_sede
					   FROM facturas f,
					   		ordenes_compra oc,
							contratos con,
							proveedores pro,
							sedes se
					  WHERE f.ordenes_compra_idordenes_compra = oc.idordenes_compra
					    AND oc.contratos_idcontratos = con.idcontratos
						AND con.proveedores_idproveedores = pro.idproveedores
						AND con.sedes_idsedes = se.idsedes";
						
				if($idordenes_compra != "all"){
					$query .= " AND f.ordenes_compra_idordenes_compra = '$idordenes_compra'";
				}
				
				if($desde != "" && $hasta != ""){
					$query .= " AND f.fecha_factura >= '$desde' AND f.fecha_factura <= '$hasta' ";
				}
				
				if($sedes_idsedes != "all"){
					$query .= " AND con.sedes_idsedes = '$sedes_idsedes'";
				}
				
				if($idproveedores != "all"){
					$query .= " AND pro.idproveedores = '$idproveedores'";
				}
				
 				$query .=  " ORDER BY f.idfacturas DESC";
							
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->cantidad_factura, $row->precio_unit_factura, $row->importe_total_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->nombre_proveedor, $row->sedes_idsedes, $row->nombre_sede);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->cantidad_factura, $row->precio_unit_factura, $row->importe_total_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->nombre_proveedor, $row->sedes_idsedes, $row->nombre_sede);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;	
			
		
	}*/

	
	public function getFacturaCombustibleByID($itemID) {
		
		
			   $query = "SELECT fc.idfacturas_combustible, 
								fc.idvehiculos, 
								ve.placa_vehiculo,
								fc.idtipo_combustible, 
								tc.tipo_combustible,
								fc.chofer_idchofer,
								CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
								fc.nro_factura, 
								fc.ruc_factura, 
								DATE_FORMAT(fc.fecha_factura, '%d/%m/%Y') as fecha_factura, 
								fc.nombre_proveedor, 
								fc.direccion_proveedor, 
								fc.kilometraje_factura, 
								fc.nro_meta, 
								fc.cantidad_combustible, 
								fc.precio_unitario_combustible, 
								fc.importe_total_combustible, 
								fc.es_tanque_lleno, 
								fc.estado_factura_combustible, 
								fc.fecha_creacion, 
								fc.usuario_creacion, 
								fc.fecha_modificacion, 
								fc.usuario_modificacion
						   FROM facturas_combustible fc,
						        tipo_combustible tc,
								vehiculos ve,
								chofer cho
						  WHERE fc.idtipo_combustible = tc.idtipo_combustible
						    AND fc.idvehiculos = ve.idvehiculos
							AND fc.chofer_idchofer = cho.idchofer
					        AND fc.idfacturas_combustible = ?";

			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas_combustible, $row->idvehiculos, $row->placa_vehiculo, $row->idtipo_combustible, $row->tipo_combustible, $row->chofer_idchofer,  $row->nombre_chofer , $row->nro_factura, $row->ruc_factura, $row->fecha_factura, $row->nombre_proveedor, $row->direccion_proveedor, $row->kilometraje_factura, $row->nro_meta, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->es_tanque_lleno, $row->estado_factura_combustible, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	/*
	public function getFacturasByOrdenCompraID($itemID) {
		
		
			$query ="SELECT f.idfacturas, 
							f.ordenes_compra_idordenes_compra, 
							oc.nro_orden_compra,
							f.descrip_factura,
							DATE_FORMAT(f.fecha_factura, '%d/%m/%Y') as fecha_factura, 
							f.nro_factura, 
							f.cantidad_factura, 
							f.precio_unit_factura, 
							f.importe_total_factura,
							con.idcontratos,
							con.nombre_contrato,
							pro.idproveedores,
							pro.nombre_proveedor,
							con.sedes_idsedes,
							se.nombre_sede
					   FROM facturas f,
					   		ordenes_compra oc,
							contratos con,
							proveedores pro,
							sedes se
					  WHERE f.ordenes_compra_idordenes_compra = oc.idordenes_compra
					    AND oc.contratos_idcontratos = con.idcontratos
						AND con.proveedores_idproveedores = pro.idproveedores
						AND con.sedes_idsedes = se.idsedes
					    AND f.ordenes_compra_idordenes_compra = ?";
						
						
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->cantidad_factura, $row->precio_unit_factura, $row->importe_total_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->nombre_proveedor, $row->sedes_idsedes, $row->nombre_sede);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->cantidad_factura, $row->precio_unit_factura, $row->importe_total_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->nombre_proveedor, $row->sedes_idsedes, $row->nombre_sede);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = 100;
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
	
	}
	
	public function getAdjuntosFacturaByIDFactura($itemID) {
		
			$query = "SELECT idadjuntos_factura, 
							 facturas_idfacturas, 
							 archivo_factura, 
							 size_archivo_factura, 
							 estado_adjunto, 
							 fecha_creacion, 
							 usuario_creacion
					    FROM adjuntos_factura
					   WHERE facturas_idfacturas = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idadjuntos_factura, $row->facturas_idfacturas, $row->archivo_factura, $row->size_archivo_factura, $row->estado_adjunto, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$base = log($row->size_archivo_factura) / log(1024);
  				$suffix = array("", "KB", "MB", "GB", "TB");
  				$f_base = floor($base);
  				$row->size_archivo_factura = round(pow(1024, $base - floor($base)), 1) . " " .$suffix[$f_base];
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idadjuntos_factura, $row->facturas_idfacturas, $row->archivo_factura, $row->size_archivo_factura, $row->estado_adjunto, $row->fecha_creacion, $row->usuario_creacion);
				  
			}
						
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
			
	}
	
	
	public function createFacturaAdjuntos($item) {
		
						
		$stmt = mysqli_prepare($this->connection, "INSERT INTO adjuntos_factura (facturas_idfacturas, archivo_factura, size_archivo_factura, estado_adjunto, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();
			
		mysqli_stmt_bind_param($stmt, 'isiiss', $item->facturas_idfacturas, $item->archivo_factura, $item->size_archivo_factura, $item->estado_adjunto, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	*/
	
	public function createFacturaCombustible($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO facturas_combustible (idvehiculos, idtipo_combustible, chofer_idchofer, nro_factura, ruc_factura, fecha_factura, nombre_proveedor, direccion_proveedor, kilometraje_factura, nro_meta, cantidad_combustible, precio_unitario_combustible, importe_total_combustible, es_tanque_lleno, estado_factura_combustible, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiisssssisdddiiss', $item->idvehiculos, $item->idtipo_combustible, $item->chofer_idchofer, $item->nro_factura, $item->ruc_factura, $item->fecha_factura, $item->nombre_proveedor, $item->direccion_proveedor, $item->kilometraje_factura, $item->nro_meta, $item->cantidad_combustible, $item->precio_unitario_combustible, $item->importe_total_combustible, $item->es_tanque_lleno, $item->estado_factura_combustible, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return ($autoid)? $autoid : $this->throwExceptionOnError();
	}



	public function updateFacturaCombustible($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE facturas_combustible SET idvehiculos=?, idtipo_combustible=?, nro_factura=?, ruc_factura=?, fecha_factura=?,  kilometraje_factura=?, nro_meta=?, cantidad_combustible=?, precio_unitario_combustible=?, importe_total_combustible=?, es_tanque_lleno=?,  fecha_modificacion=?, usuario_modificacion=? WHERE idfacturas_combustible=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iisssisdddissi', $item->idvehiculos, $item->idtipo_combustible, $item->nro_factura, $item->ruc_factura, $item->fecha_factura, $item->kilometraje_factura, $item->nro_meta, $item->cantidad_combustible, $item->precio_unitario_combustible, $item->importe_total_combustible, $item->es_tanque_lleno, $item->fecha_modificacion, $item->usuario_modficacion,  $item->idfacturas_combustible);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	

	public function deleteFacturaCombustible($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM facturas_combustible WHERE idfacturas_combustible = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
			
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM facturas_combustible");
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
