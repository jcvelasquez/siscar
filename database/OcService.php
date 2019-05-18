<?php

class OcService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}
	
	
	public function getOcSigap($settings = array()) {
			odbc_close($con);
			$server = "SIEX-LIM-DB\SQLE";
			$database = 'siga_mef';
			$user = 'sigatemp';
			$password = 'sigatemp1';
			
			$con = odbc_connect("Driver={SQL Server};Server=".$server.";Database=".$database.";", $user, $password) or die('No se conecto a la base de datos!'); 
			$sql = "select top 1 a.CONCEPTO, a.TOTAL_FACT_SOLES, a.FECHA_ORDEN from SIG_ORDEN_ADQUISICION a where a.ANO_EJE='2017' and a.TIPO_BIEN='B' and a.NRO_ORDEN=" . $settings['nro_orden_compra'] . " ";
			$res = odbc_exec($con,$sql); 
			   
			$ordencompra = odbc_fetch_array($res);
						
			if(!empty($ordencompra)){

				$fecha_orden = DateTime::createFromFormat('Y-m-d', substr($ordencompra['FECHA_ORDEN'],0,10));
				$fecha_orden = $fecha_orden->format('d/m/Y');
				
				
				return array("authorize" => true, "concepto" => utf8_encode($ordencompra['CONCEPTO']), "importe" => $ordencompra['TOTAL_FACT_SOLES'], "fecha_orden" => $fecha_orden, "mensaje" => "La orden de compra con el #" . $settings['nro_orden_compra'] . " se cargó." );
				
			}else{
				
				return array("authorize" => false, "mensaje" => "No existe la orden de compra con el #" . $settings['nro_orden_compra'] );
								
			}
		
		
	}
	

	public function getAllOC($settings = array()) {
		
			$desde =  (isset($settings["desde"]))? $settings["desde"] : "";
			$hasta =  (isset($settings["hasta"]))? $settings["hasta"] : "";
			$sedes_idsedes =  (isset($settings["sedes_idsedes"]))? $settings["sedes_idsedes"] : "";
			
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
					
			$query = "SELECT oc.idordenes_compra,
							 oc.proveedores_idproveedores,
							 pro.razon_social,
							 oc.contratos_idcontratos, 
							 c.nombre_contrato,
							 c.nro_contrato,
							 oc.sedes_idsedes, 
							 s.nombre_sede,
							 oc.nro_orden_compra, 
							 oc.monto_orden_compra,
							 oc.descripcion_orden_compra, 
							 oc.fecha_orden_compra,
							 (SELECT COUNT(*) FROM ordenes_compra_items WHERE idordenes_compra = oc.idordenes_compra) AS tiene_items,
							 oc.estado_orden_compra,
							 oc.tiene_contrato
					    FROM ordenes_compra AS oc
				   LEFT JOIN sedes AS s
				          ON oc.sedes_idsedes = s.idsedes
				   LEFT JOIN contratos AS c
				          ON oc.contratos_idcontratos = c.idcontratos
				   LEFT JOIN proveedores AS pro
				          ON oc.proveedores_idproveedores = pro.idproveedores
					   WHERE oc.estado_orden_compra = 1 ";
				   			
			if(!empty($settings['search']['value'])) 
			{
				$query .= " AND (c.nombre_contrato LIKE '%".$settings['search']['value']."%' OR c.nro_contrato LIKE '%".$settings['search']['value']."%' OR s.nombre_sede LIKE '%".$settings['search']['value']."%' OR oc.descripcion_orden_compra LIKE '%".$settings['search']['value']."%' OR oc.nro_orden_compra LIKE '%".$settings['search']['value']."%' ) ";
			}
			
			if($sedes_idsedes != "all" && !empty($sedes_idsedes))
			{
				$query .= " AND oc.sedes_idsedes = '$sedes_idsedes'";
			}
			
			if($desde != "" && $hasta != "")
			{
				$query .= " AND oc.fecha_orden_compra >= '$desde' AND oc.fecha_orden_compra <= '$hasta' ";
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
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idordenes_compra,  $row->proveedores_idproveedores, $row->razon_social, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra, $row->tiene_contrato);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				//FORMATO DE LA FECHA PARA EL RESULTADO
				$row->fecha_orden_compra = DateTime::createFromFormat('Y-m-d', $row->fecha_orden_compra);
				$row->fecha_orden_compra = $row->fecha_orden_compra->format('d/m/Y');
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				
				mysqli_stmt_bind_result($stmt, $row->idordenes_compra,  $row->proveedores_idproveedores, $row->razon_social, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra, $row->tiene_contrato);
				  
			}
						
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		   
			return $records;
		
	}
	
	
	public function getOrdenesCompraItemsByIDOrdenCompra($idOrdenCompra, $tieneContrato) {
		
			if($tieneContrato == 1){
					
				$query = "SELECT oci.idordenes_compra_item,
								 cia.id_item_adjudicados, 
								 cia.contratos_idcontratos,
								 cia.idtipo_combustible,
								 tc.tipo_combustible,
								 cia.idmedida_combustible,
								 mc.medida_combustible,
								 oci.cantidad_item,
								 oci.precio_unitario_item,
								 oci.importe_total_item,
								 DATE_FORMAT(oci.periodo_desde, '%d/%m/%Y') as periodo_desde,
								 DATE_FORMAT(oci.periodo_hasta, '%d/%m/%Y') as periodo_hasta,
								 oci.descripcion_item_oc,
								 oci.estado_item_oc
							FROM contratos_item_adjudicados cia
					  INNER JOIN tipo_combustible tc
							  ON cia.idtipo_combustible = tc.idtipo_combustible 
					  INNER JOIN medida_combustible mc
							  ON cia.idmedida_combustible = mc.idmedida_combustible
					  INNER JOIN ordenes_compra_items oci 
							  ON cia.id_item_adjudicados = oci.id_item_adjudicados
						   WHERE oci.idordenes_compra = '$idOrdenCompra' ";	
			
			}else{
				
				$query = "SELECT oci.idordenes_compra_item,
								 NULL as id_item_adjudicados, 
								 NULL as contratos_idcontratos,
								 oci.idtipo_combustible,
								 tc.tipo_combustible,
								 oci.idmedida_combustible,
								 mc.medida_combustible,
								 oci.cantidad_item,
								 oci.precio_unitario_item,
								 oci.importe_total_item,
								 DATE_FORMAT(oci.periodo_desde, '%d/%m/%Y') as periodo_desde,
								 DATE_FORMAT(oci.periodo_hasta, '%d/%m/%Y') as periodo_hasta,
								 oci.descripcion_item_oc,
								 oci.estado_item_oc
					        FROM ordenes_compra_items AS oci 
					   LEFT JOIN medida_combustible mc
							  ON oci.idmedida_combustible = mc.idmedida_combustible
					   LEFT JOIN tipo_combustible tc
							  ON oci.idtipo_combustible = tc.idtipo_combustible 		  
						   WHERE oci.idordenes_compra = '$idOrdenCompra' ";	
						   
				
			}
			
			
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idordenes_compra_item, $row->id_item_adjudicados, $row->contratos_idcontratos, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible, $row->cantidad_item, $row->precio_unitario_item, $row->importe_total_item, $row->periodo_desde, $row->periodo_hasta, $row->descripcion_item_oc, $row->estado_item_oc);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idordenes_compra_item, $row->id_item_adjudicados, $row->contratos_idcontratos, $row->idtipo_combustible, $row->tipo_combustible, $row->idmedida_combustible, $row->medida_combustible, $row->cantidad_item, $row->precio_unitario_item, $row->importe_total_item, $row->periodo_desde, $row->periodo_hasta, $row->descripcion_item_oc, $row->estado_item_oc);

				  
			}

			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getTotalMensualOrdenesCompraByIDSedes($idsede, $mes, $anno) {
		
			$query = "SELECT oc.sedes_idsedes, 
							 s.nombre_sede,
							 MONTH(oc.fecha_orden_compra) as mes_oc,
							 YEAR(oc.fecha_orden_compra) as anno_oc,
							 SUM((SELECT SUM(importe_total_item) FROM ordenes_compra_items WHERE idordenes_compra = oc.idordenes_compra))  AS importe_total_oc
					    FROM ordenes_compra AS oc
				  INNER JOIN sedes AS s
				          ON oc.sedes_idsedes = s.idsedes
					     AND oc.sedes_idsedes = '$idsede'
						 AND MONTH(oc.fecha_orden_compra) = '$mes'
						 AND YEAR(oc.fecha_orden_compra) = '$anno'
						 GROUP BY mes_oc";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$records = array();
			
			mysqli_stmt_bind_result($stmt, $row->sedes_idsedes,  $row->nombre_sede, $row->mes_oc, $row->anno_oc, $row->importe_total_oc);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$records[] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->sedes_idsedes,  $row->nombre_sede, $row->mes_oc, $row->anno_oc, $row->importe_total_oc);
				  
			}
			
			//mysqli_stmt_free_result($stmt);
			//mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getOrdenesCompraBySedeID($itemID) {
		
			$query = "SELECT oc.idordenes_compra,
							 oc.proveedores_idproveedores,
							 pro.razon_social,
							 oc.contratos_idcontratos, 
							 c.nombre_contrato,
							 c.nro_contrato,
							 oc.sedes_idsedes, 
							 s.nombre_sede,
							 oc.tiene_contrato, 
							 oc.nro_orden_compra, 
							 oc.monto_orden_compra,
							 oc.descripcion_orden_compra, 
							 oc.fecha_orden_compra,
							 (SELECT COUNT(*) FROM ordenes_compra_items WHERE idordenes_compra = oc.idordenes_compra) AS tiene_items,
							 oc.estado_orden_compra
					    FROM ordenes_compra AS oc
				   LEFT JOIN sedes AS s
				          ON oc.sedes_idsedes = s.idsedes
				   LEFT JOIN contratos AS c
				          ON oc.contratos_idcontratos = c.idcontratos
				   LEFT JOIN proveedores AS pro
				          ON oc.proveedores_idproveedores = pro.idproveedores
					   WHERE oc.estado_orden_compra = 1 
					     AND oc.sedes_idsedes = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idordenes_compra,  $row->proveedores_idproveedores, $row->razon_social, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->tiene_contrato, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idordenes_compra,  $row->proveedores_idproveedores, $row->razon_social, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->tiene_contrato, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = 1000;
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	
	public function getOrdenesCompraByContratoID($itemID) {
		
			$query ="SELECT oc.idordenes_compra, 
							oc.contratos_idcontratos, 
							c.nombre_contrato,
							c.nro_contrato,
							c.sedes_idsedes, 
							s.nombre_sede,
							oc.tiene_contrato, 
							oc.nro_orden_compra, 
							oc.monto_orden_compra,
							oc.descripcion_orden_compra, 
							DATE_FORMAT(oc.fecha_orden_compra, '%d/%m/%Y') as fecha_orden_compra,
							(SELECT COUNT(*) FROM ordenes_compra_items WHERE idordenes_compra = oc.idordenes_compra) AS tiene_items,
							oc.estado_orden_compra
					   FROM ordenes_compra oc,
					   		sedes s,
							contratos c
					  WHERE c.sedes_idsedes = s.idsedes
					    AND oc.contratos_idcontratos = c.idcontratos
						AND oc.contratos_idcontratos = ?
				   ORDER BY oc.nro_orden_compra DESC, oc.fecha_orden_compra DESC";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idordenes_compra, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->tiene_contrato, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idordenes_compra, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->tiene_contrato, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = 1000;
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getOCByID($itemID) {
		
		    $query = "SELECT oc.idordenes_compra,
							 oc.proveedores_idproveedores,
							 pro.razon_social,
							 oc.contratos_idcontratos, 
							 c.nombre_contrato,
							 c.nro_contrato,
							 oc.sedes_idsedes, 
							 s.nombre_sede,
							 oc.tiene_contrato,
							 oc.nro_orden_compra, 
							 oc.monto_orden_compra,
							 oc.descripcion_orden_compra, 
							 oc.fecha_orden_compra,
							 (SELECT COUNT(*) FROM ordenes_compra_items WHERE idordenes_compra = oc.idordenes_compra) AS tiene_items,
							 oc.estado_orden_compra,
							 oc.tiene_contrato
					    FROM ordenes_compra AS oc
				   LEFT JOIN sedes AS s
				          ON oc.sedes_idsedes = s.idsedes
				   LEFT JOIN contratos AS c
				          ON oc.contratos_idcontratos = c.idcontratos
				   LEFT JOIN proveedores AS pro
				          ON oc.proveedores_idproveedores = pro.idproveedores
					   WHERE oc.estado_orden_compra = 1 
						 AND oc.idordenes_compra = ?";
					   
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idordenes_compra,  $row->proveedores_idproveedores, $row->razon_social, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->tiene_contrato, $row->nro_orden_compra, $row->monto_orden_compra, $row->descripcion_orden_compra, $row->fecha_orden_compra, $row->tiene_items, $row->estado_orden_compra, $row->tiene_contrato);
			
			if(mysqli_stmt_fetch($stmt)) {
				
				$row->fecha_orden_compra = DateTime::createFromFormat('Y-m-d', $row->fecha_orden_compra);
				$row->fecha_orden_compra = $row->fecha_orden_compra->format('d/m/Y');
				
			  	return $row;
				
			} else {
			  return 0;
			}
	}
	

	public function getAdjuntosOrdenCompraByIDordenCompra($itemID) {
		
			$query = "SELECT idadjuntos_ordenes_compra, 
							 ordenes_compra_idordenes_compra, 
							 archivo_oc, 
							 size_archivo_oc, 
							 estado_adjunto, 
							 fecha_creacion, 
							 usuario_creacion
					    FROM adjuntos_ordenes_compra
					   WHERE ordenes_compra_idordenes_compra = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idadjuntos_ordenes_compra, $row->ordenes_compra_idordenes_compra, $row->archivo_oc, $row->size_archivo_oc, $row->estado_adjunto, $row->fecha_creacion, $row->usuario_creacion);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				$base = log($row->size_archivo_oc) / log(1024);
  				$suffix = array("", "KB", "MB", "GB", "TB");
  				$f_base = floor($base);
  				$row->size_archivo_oc = round(pow(1024, $base - floor($base)), 1) . " " .$suffix[$f_base];
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idadjuntos_ordenes_compra, $row->ordenes_compra_idordenes_compra, $row->archivo_oc, $row->size_archivo_oc, $row->estado_adjunto, $row->fecha_creacion, $row->usuario_creacion);
				  
			}
						
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
			
	}
	
	
	/*********************************/
	/*			   CREATES           */
	/*********************************/
	
	public function createOC($item) {
				
		$stmt = mysqli_prepare($this->connection, "INSERT INTO ordenes_compra (contratos_idcontratos, sedes_idsedes, proveedores_idproveedores, tiene_contrato, nro_orden_compra, monto_orden_compra, descripcion_orden_compra, fecha_orden_compra, estado_orden_compra, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiisdssiss', $item->contratos_idcontratos, $item->sedes_idsedes, $item->proveedores_idproveedores, $item->tiene_contrato, $item->nro_orden_compra, $item->monto_orden_compra, $item->descripcion_orden_compra, $item->fecha_orden_compra, $item->estado_orden_compra, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	public function createItemXordenCompra($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO ordenes_compra_items (idordenes_compra, id_item_adjudicados, idtipo_combustible, cantidad_item, precio_unitario_item, importe_total_item, periodo_desde, periodo_hasta, descripcion_item_oc, estado_item_oc) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();
			
		mysqli_stmt_bind_param($stmt, 'iiidddsssi', $item->idordenes_compra, $item->id_item_adjudicados, $item->idtipo_combustible, $item->cantidad_item, $item->precio_unitario_item, $item->importe_total_item, $item->periodo_desde, $item->periodo_hasta, $item->descripcion_item_oc, $item->estado_item_oc);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	public function createOrdenCompraAdjuntos($item) {
						
		$stmt = mysqli_prepare($this->connection, "INSERT INTO adjuntos_ordenes_compra (ordenes_compra_idordenes_compra, archivo_oc, size_archivo_oc, estado_adjunto, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();
			
		mysqli_stmt_bind_param($stmt, 'isiiss', $item->ordenes_compra_idordenes_compra, $item->archivo_oc, $item->size_archivo_oc, $item->estado_adjunto, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	
	

	/*********************************/
	/*			   UPDATES           */
	/*********************************/
	public function updateOC($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE ordenes_compra SET contratos_idcontratos=?, nro_orden_compra=?, monto_orden_compra=?, descripcion_orden_compra=?, fecha_orden_compra=?, fecha_modificacion=?, usuario_modificacion=? WHERE idordenes_compra=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'isdssssi', $item->contratos_idcontratos, $item->nro_orden_compra, $item->monto_orden_compra, $item->descripcion_orden_compra, $item->fecha_orden_compra, $item->fecha_modificacion, $item->usuario_modificacion, $item->idordenes_compra);		
		$this->throwExceptionOnError();
	
		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
	
		
	
	}

	
	public function updateItemXordenCompra($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE ordenes_compra_items SET idmedida_combustible=?, cantidad_item=?, precio_unitario_item=?, importe_total_item=?, periodo_desde=?, periodo_hasta=?, descripcion_item_oc=? WHERE idordenes_compra_item=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'idddsssi', $item->idmedida_combustible, $item->cantidad_item, $item->precio_unitario_item, $item->importe_total_item, $item->periodo_desde, $item->periodo_hasta, $item->descripcion_item_oc, $item->idordenes_compra_item);		
		$this->throwExceptionOnError();
	
		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}

	/*********************************/
	/*			   DELETES           */
	/*********************************/
	public function deleteOC($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM ordenes_compra WHERE idordenes_compra = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	
	public function deleteAdjuntoOrdenCompra($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM adjuntos_contratos WHERE idadjuntos_contratos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function deleteItemXordenCompra($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM ordenes_compra_items WHERE idordenes_compra_item = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	

	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM ordenes_compra");
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
	
	public function TotalOrdenCompraItemsXOrdenCompra($IdOrdenCompra) {
		
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM ordenes_compra_items WHERE idordenes_compra = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
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
