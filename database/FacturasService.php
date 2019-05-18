 <?php

class FacturasService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllFacturas($settings = array()) {
		
			$desde = $settings["desde"];
			$hasta = $settings["hasta"];
			
			$idordenes_compra = $settings["idordenes_compra"];
			$sedes_idsedes = $settings['sedes_idsedes'];
			$idproveedores = $settings['idproveedores'];
			
			//ORDEN DE LAS COLUMNAS
		 	$index_col = $settings['order'][0]['column'];
			$order_by  = $settings['columns'][$index_col]['data'];
		 	$order_dir = $settings['order'][0]['dir'];
		
			$query ="SELECT f.idfacturas, 
							f.ordenes_compra_idordenes_compra, 
							oc.tiene_contrato,
							oc.nro_orden_compra,
							f.descrip_factura,
							f.fecha_factura, 
							f.nro_factura, 
							pro.idproveedores,
							pro.razon_social,
							oc.sedes_idsedes,
							se.nombre_sede,
							(SELECT SUM(importe_total_item) FROM ordenes_compra_items WHERE idordenes_compra = f.ordenes_compra_idordenes_compra) as importe_total_factura
					   FROM facturas f,
					   		ordenes_compra oc,
							proveedores pro,
							sedes se
					  WHERE f.ordenes_compra_idordenes_compra = oc.idordenes_compra
						AND oc.proveedores_idproveedores = pro.idproveedores
						AND oc.sedes_idsedes = se.idsedes";
						
						
			if(!empty($idordenes_compra) && $idordenes_compra != "all"){
				$query .= " AND f.ordenes_compra_idordenes_compra = '$idordenes_compra'";
			}
			
			if($desde != "" && $hasta != ""){
				$query .= " AND f.fecha_factura >= '$desde' AND f.fecha_factura <= '$hasta' ";
			}
			
			if($sedes_idsedes != "all" && !empty($sedes_idsedes)){
				$query .= " AND oc.sedes_idsedes = '$sedes_idsedes'";
			}
			
			if($idproveedores != "all" && !empty($idproveedores)){
				$query .= " AND pro.idproveedores = '$idproveedores'";
			}
			
			if( !empty($settings['search']['value']) ) 
			{
				$query .= " AND (oc.nro_orden_compra LIKE '%".$settings['search']['value']."%' OR f.nro_factura LIKE '%".$settings['search']['value']."%' OR se.nombre_sede LIKE '%".$settings['search']['value']."%' OR f.descrip_factura LIKE '%".$settings['search']['value']."%' ) ";
			}
						
			if (isset($order_by) && isset($order_dir))
			{
				$query .= " ORDER BY " . $order_by ." " .  $order_dir ;
			}
						
			if ( isset( $settings['start'] ) && $settings['length'] != '-1')
			{
				$query .= " LIMIT " . mysqli_real_escape_string( $this->connection, $settings['start'] ).", " . mysqli_real_escape_string( $this->connection, $settings['length'] );
			}
						
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			//MUESTRA EL TOTAL FILTRADOS
			$totalFiltered = (empty($settings['search']['value']))? $settings['recordsTotal'] : $stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				//FORMATO DE LA FECHA PARA EL RESULTADO
				$row->fecha_factura = DateTime::createFromFormat('Y-m-d', $row->fecha_factura);
				$row->fecha_factura = $row->fecha_factura->format('d/m/Y');

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getFacturaByID($itemID) {
		
		   
		   $query = "SELECT f.idfacturas, 
							f.ordenes_compra_idordenes_compra, 
							oc.tiene_contrato,
							oc.nro_orden_compra,
							f.descrip_factura,
							DATE_FORMAT(f.fecha_factura, '%d/%m/%Y') as fecha_factura, 
							f.nro_factura, 
							pro.idproveedores,
							pro.razon_social,
							oc.sedes_idsedes,
							se.nombre_sede,
							(SELECT SUM(importe_total_item) FROM ordenes_compra_items WHERE idordenes_compra = f.ordenes_compra_idordenes_compra) as importe_total_factura
					   FROM facturas f,
					   		ordenes_compra oc,
							proveedores pro,
							sedes se
					  WHERE f.ordenes_compra_idordenes_compra = oc.idordenes_compra
						AND oc.proveedores_idproveedores = pro.idproveedores
						AND oc.sedes_idsedes = se.idsedes
					    AND f.idfacturas = ?";

			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura,  $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	public function getFacturasByOrdenCompraID($itemID) {
		
		
			$query ="SELECT f.idfacturas, 
							f.ordenes_compra_idordenes_compra, 
							oc.tiene_contrato,
							oc.nro_orden_compra,
							f.descrip_factura,
							DATE_FORMAT(f.fecha_factura, '%d/%m/%Y') as fecha_factura, 
							f.nro_factura, 
							con.idcontratos,
							con.nombre_contrato,
							pro.idproveedores,
							pro.razon_social,
							con.sedes_idsedes,
							se.nombre_sede,
							(SELECT SUM(importe_total_item) FROM ordenes_compra_items WHERE idordenes_compra = f.ordenes_compra_idordenes_compra) as importe_total_factura
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
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = 100;
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
	
	}
	
	
	public function getFacturasBySedeID($itemID) {
		
		   $query = "SELECT f.idfacturas, 
							f.ordenes_compra_idordenes_compra,
							oc.tiene_contrato, 
							oc.nro_orden_compra,
							f.descrip_factura,
							DATE_FORMAT(f.fecha_factura, '%d/%m/%Y') as fecha_factura, 
							f.nro_factura, 
							con.idcontratos,
							con.nombre_contrato,
							pro.idproveedores,
							pro.razon_social,
							con.sedes_idsedes,
							se.nombre_sede,
							(SELECT SUM(importe_total_item) FROM ordenes_compra_items WHERE idordenes_compra = f.ordenes_compra_idordenes_compra) as importe_total_factura,
							txfc.idtickets_x_factura_cabecera,
							txfc.descripcion_cabecera
					   FROM facturas AS f
				 INNER JOIN ordenes_compra AS oc
				 		 ON f.ordenes_compra_idordenes_compra = oc.idordenes_compra
				 INNER JOIN sedes AS se
						 ON oc.sedes_idsedes = se.idsedes	
				  LEFT JOIN	contratos AS con
				         ON oc.contratos_idcontratos = con.idcontratos
				  LEFT JOIN proveedores AS pro
				 		 ON con.proveedores_idproveedores = pro.idproveedores
				  LEFT JOIN tickets_x_factura_cabecera AS txfc		 
				  		 ON txfc.facturas_idfacturas = f.idfacturas
					  WHERE oc.sedes_idsedes = ?";
						
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura, $row->idtickets_x_factura_cabecera, $row->descripcion_cabecera);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idfacturas, $row->ordenes_compra_idordenes_compra, $row->tiene_contrato, $row->nro_orden_compra, $row->descrip_factura, $row->fecha_factura, $row->nro_factura, $row->idcontratos, $row->nombre_contrato, $row->idproveedores, $row->razon_social, $row->sedes_idsedes, $row->nombre_sede, $row->importe_total_factura, $row->idtickets_x_factura_cabecera, $row->descripcion_cabecera);
				  
			}
			
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
	
	
	
	public function createFactura($item) {

		$stmt = mysqli_prepare($this->connection, "INSERT INTO facturas (ordenes_compra_idordenes_compra, descrip_factura, fecha_factura, nro_factura, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'isssss', $item->ordenes_compra_idordenes_compra, $item->descrip_factura, $item->fecha_factura, $item->nro_factura, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateFactura($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE facturas SET ordenes_compra_idordenes_compra=?, descrip_factura=?, fecha_factura=?, nro_factura=?, fecha_modificacion=?, usuario_modficacion=? WHERE idfacturas=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isssssi', $item->ordenes_compra_idordenes_compra, $item->descrip_factura, $item->fecha_factura, $item->nro_factura, $item->fecha_modificacion, $item->usuario_modficacion,  $item->idfacturas);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	
	public function deleteAdjuntoFactura($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM adjuntos_factura WHERE idadjuntos_factura = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}


	public function deleteFactura($itemID) {
		
		/* BORRA CABECERA DE FACTURAS */
		$stmt_cabecera = mysqli_prepare($this->connection, "DELETE FROM tickets_x_factura_cabecera WHERE facturas_idfacturas = '$itemID'");
		$this->throwExceptionOnError();
		
		mysqli_stmt_execute($stmt_cabecera);
		$this->throwExceptionOnError();
		
		/* BORRA FACTURAS */
		$stmt = mysqli_prepare($this->connection, "DELETE FROM facturas WHERE idfacturas = '$itemID'");
		$this->throwExceptionOnError();
		
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return ($this->throwExceptionOnError() == "confirm")? "success" : $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
			
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM facturas");
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
