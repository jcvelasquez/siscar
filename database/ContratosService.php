<?php

class ContratosService {
	
	var $connection;
	
	public $periodo = "";
    public $combustibles  = "";
    public $valores = "";
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}
	
	public function getAllContratos($settings = array()) {
		
		   $query = "SELECT c.idcontratos, 
							c.nombre_contrato, 
							c.sedes_idsedes,
							s.nombre_sede,
							c.proveedores_idproveedores,
							p.razon_social,
							c.nro_contrato, 
							c.monto_contrato, 
							DATE_FORMAT(c.fecha_contrato, '%d/%m/%Y') as fecha_contrato,
							DATE_FORMAT(c.plazo_desde, '%d/%m/%Y') as plazo_desde,
							DATE_FORMAT(c.plazo_hasta, '%d/%m/%Y') as plazo_hasta
					   FROM contratos c,
					   		sedes s,
							proveedores p
					  WHERE c.sedes_idsedes = s.idsedes
					    AND c.proveedores_idproveedores = p.idproveedores
 				   ORDER BY c.idcontratos DESC
					  LIMIT ?, ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ii', $settings["iDisplayStart"], $settings["iDisplayLength"]);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nombre_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores, $row->razon_social, $row->nro_contrato, $row->monto_contrato, $row->fecha_contrato, $row->plazo_desde, $row->plazo_hasta);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nombre_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores, $row->razon_social, $row->nro_contrato, $row->monto_contrato, $row->fecha_contrato, $row->plazo_desde, $row->plazo_hasta);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	
	

	public function getAvanceContrato($settings) {
		
		
		   $idContrato = $settings["idContrato"];
		   
		   $records = array();
		   $records['periodo'] = array();
		   //$records['periodo']['combustibles'] = array();
			
		
		   /* CONSULTA UNO */
		   /*
		   $query = "SELECT CONCAT(MONTH(oc.fecha_orden_compra), '/', YEAR(oc.fecha_orden_compra)) as periodo
					   FROM ordenes_compra oc
					  WHERE oc.contratos_idcontratos = '$idContrato'
				   GROUP BY periodo 
				   ORDER BY MONTH(oc.fecha_orden_compra) ASC, YEAR(oc.fecha_orden_compra) ASC";   
					  
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->periodo);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['periodo'][] = $row->periodo;
				$records['periodo'][]['combustibles'] = "asd";
				$records['periodo'][]['cantidad'] = 23.20;
				
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->periodo);
				  
			}*/
			
			
			/* CONSULTA DOS */
			/*
				for($i = 0; $i < count($records['periodo']); ++$i) {
					
					
					//$records[$i]['periodo']['combustibles'][] = "asds".$i;
				
			
				$query = "SELECT SUM(oci.cantidad_item) as total_cantidad,
								 SUM(oci.importe_total_item) as total_importe,
								 CONCAT(MONTH(oc.fecha_orden_compra), '/', YEAR(oc.fecha_orden_compra)) as periodo,
								 tc.tipo_combustible
							FROM ordenes_compra_items oci,
								 ordenes_compra oc,
								 contratos_item_adjudicados cia,
								 tipo_combustible tc
								 
						   WHERE oci.idordenes_compra = oc.idordenes_compra
							 AND cia.id_item_adjudicados = oci.id_item_adjudicados
							 AND cia.idtipo_combustible = tc.idtipo_combustible
							 AND oc.contratos_idcontratos = '$idContrato'
							 
						GROUP BY tc.tipo_combustible, periodo 
						ORDER BY MONTH(oc.fecha_orden_compra) ASC, YEAR(oc.fecha_orden_compra) ASC";   
						  
				$stmt = mysqli_prepare($this->connection, $query);		
				$this->throwExceptionOnError();
				
				mysqli_stmt_execute($stmt);
				$this->throwExceptionOnError();
				
				
				mysqli_stmt_bind_result($stmt, $row->total_cantidad, $row->total_importe, $row->periodo, $row->tipo_combustible);
				
				while (mysqli_stmt_fetch($stmt)) {
	
					$records['tipo_combustible'][] = $row;
									  
					$row = new stdClass();
					mysqli_stmt_bind_result($stmt, $row->total_cantidad, $row->total_importe, $row->periodo, $row->tipo_combustible);
					  
				}*/
				
						
			/* CONSULTA TRES */
			
			$query = "SELECT SUM(oci.cantidad_item) as total_cantidad,
		   					 SUM(oci.importe_total_item) as total_importe,
							 CONCAT(MONTH(oc.fecha_orden_compra), '/', YEAR(oc.fecha_orden_compra)) as periodo,
							 tc.tipo_combustible
					    FROM ordenes_compra_items oci,
					   		 ordenes_compra oc,
							 contratos_item_adjudicados cia,
							 tipo_combustible tc
					   WHERE oci.idordenes_compra = oc.idordenes_compra
                         AND cia.id_item_adjudicados = oci.id_item_adjudicados
					     AND cia.idtipo_combustible = tc.idtipo_combustible
					     AND oc.contratos_idcontratos = '$idContrato'
				    GROUP BY tc.tipo_combustible, periodo 
				    ORDER BY MONTH(oc.fecha_orden_compra) ASC, YEAR(oc.fecha_orden_compra) ASC";   
					  
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			
			mysqli_stmt_bind_result($stmt, $row->total_cantidad, $row->total_importe, $row->periodo, $row->tipo_combustible);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['periodo'][] = $row;
								  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->total_cantidad, $row->total_importe, $row->periodo, $row->tipo_combustible);
				  
			}
			
	
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	public function getProveedorByIDContrato($itemID) {
		
			$query ="SELECT c.idcontratos, 
							c.nombre_contrato, 
							c.sedes_idsedes,
							s.nombre_sede,
							c.proveedores_idproveedores,
							p.razon_social,
							c.nro_contrato, 
							c.monto_contrato, 
							DATE_FORMAT(c.fecha_contrato, '%d/%m/%Y') as fecha_contrato,
							DATE_FORMAT(c.plazo_desde, '%d/%m/%Y') as plazo_desde,
							DATE_FORMAT(c.plazo_hasta, '%d/%m/%Y') as plazo_hasta
					   FROM contratos c,
					   		sedes s,
							proveedores p
					  WHERE c.sedes_idsedes = s.idsedes
					    AND c.proveedores_idproveedores = p.idproveedores
					  	AND c.idcontratos = ?";

			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nombre_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores, $row->razon_social, $row->nro_contrato, $row->monto_contrato, $row->fecha_contrato, $row->plazo_desde, $row->plazo_hasta);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
			
		
	}
	
	
	public function getAllContratosBySearch($settings = array()) {
		
			$desde = $settings["desde"];
			$hasta = $settings["hasta"];
			$sedes_idsedes = $settings["sedes_idsedes"];
			
			
		   $query = "SELECT c.idcontratos, 
							c.nombre_contrato, 
							c.sedes_idsedes,
							s.nombre_sede,
							c.proveedores_idproveedores,
							p.razon_social,
							c.nro_contrato, 
							c.monto_contrato, 
							DATE_FORMAT(c.fecha_contrato, '%d/%m/%Y') as fecha_contrato,
							DATE_FORMAT(c.plazo_desde, '%d/%m/%Y') as plazo_desde,
							DATE_FORMAT(c.plazo_hasta, '%d/%m/%Y') as plazo_hasta
					   FROM contratos c,
					   		sedes s,
							proveedores p
					  WHERE c.sedes_idsedes = s.idsedes
					    AND c.proveedores_idproveedores = p.idproveedores";
						
				if($sedes_idsedes != "all"){
					$query .= " AND c.sedes_idsedes = '$sedes_idsedes'";
				}
				
				if($desde != "" && $hasta != ""){
					$query .= " AND c.fecha_contrato >= '$desde' AND c.fecha_contrato <= '$hasta' ";
				}
				
 				$query .=  " ORDER BY c.idcontratos DESC";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nombre_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores, $row->razon_social, $row->nro_contrato, $row->monto_contrato, $row->fecha_contrato, $row->plazo_desde, $row->plazo_hasta);
			
			while (mysqli_stmt_fetch($stmt)) {

				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nombre_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores, $row->razon_social, $row->nro_contrato, $row->monto_contrato, $row->fecha_contrato, $row->plazo_desde, $row->plazo_hasta);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = $settings['sEcho'];
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
	   
			return $records;
		
	}
	
	
	
	public function validateContrato($itemID) {
		
			$stmt = mysqli_prepare($this->connection, "SELECT idcontratos, nro_contrato FROM contratos WHERE nro_contrato = '$itemID'");
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nro_contrato);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return 'error';
			} else {
			  return 'success';
			}
	}

	
	public function getContratoByID($itemID) {
		
		
			$query ="SELECT c.idcontratos, 
							c.nombre_contrato, 
							c.sedes_idsedes,
							s.nombre_sede,
							c.proveedores_idproveedores,
							p.razon_social,
							c.nro_contrato, 
							c.monto_contrato, 
							DATE_FORMAT(c.fecha_contrato, '%d/%m/%Y') as fecha_contrato,
							DATE_FORMAT(c.plazo_desde, '%d/%m/%Y') as plazo_desde,
							DATE_FORMAT(c.plazo_hasta, '%d/%m/%Y') as plazo_hasta
					   FROM contratos c,
					   		sedes s,
							proveedores p
					  WHERE c.sedes_idsedes = s.idsedes
					    AND c.proveedores_idproveedores = p.idproveedores
					  	AND c.idcontratos = ?";

			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idcontratos, $row->nombre_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores, $row->razon_social, $row->nro_contrato, $row->monto_contrato, $row->fecha_contrato, $row->plazo_desde, $row->plazo_hasta);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	public function getItemAdjudicadosByContratoID($itemID) {
		
			$query = "SELECT cia.id_item_adjudicados, 
							 cia.contratos_idcontratos, 
							 cia.idmedida_combustible, 
							 mc.medida_combustible,
							 cia.idtipo_combustible,
							 tc.tipo_combustible, 
							 cia.cantidad, 
							 cia.precio_unitario, 
							 cia.precio_total, 
							 cia.ficha_tecnica 
					    FROM contratos_item_adjudicados cia,
							 medida_combustible mc,
							 tipo_combustible tc
					   WHERE cia.idmedida_combustible = mc.idmedida_combustible
					     AND cia.idtipo_combustible = tc.idtipo_combustible
					     AND cia.contratos_idcontratos = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->id_item_adjudicados, $row->contratos_idcontratos, $row->idmedida_combustible, $row->medida_combustible, $row->idtipo_combustible, $row->tipo_combustible, $row->cantidad, $row->precio_unitario, $row->precio_total, $row->ficha_tecnica);
			
			while (mysqli_stmt_fetch($stmt)) {
		  
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->id_item_adjudicados, $row->contratos_idcontratos, $row->idmedida_combustible, $row->medida_combustible, $row->idtipo_combustible, $row->tipo_combustible, $row->cantidad, $row->precio_unitario, $row->precio_total, $row->ficha_tecnica);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
			
	}
	
	public function getAdjuntosContratosByIDContrato($itemID) {
		
			$query = "SELECT idadjuntos_contratos, 
							 contratos_idcontratos, 
							 archivo_contrato, 
							 size_archivo_contrato, 
							 estado_adjunto, 
							 fecha_creacion, 
							 usuario_creacion, 
							 fecha_modificacion, 
							 usuario_modificacion
					    FROM adjuntos_contratos
					   WHERE contratos_idcontratos = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idadjuntos_contratos, $row->contratos_idcontratos, $row->archivo_contrato, $row->size_archivo_contrato, $row->estado_adjunto, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
		  
				
				
				$base = log($row->size_archivo_contrato) / log(1024);
  				$suffix = array("", "KB", "MB", "GB", "TB");
  				$f_base = floor($base);
  				$row->size_archivo_contrato = round(pow(1024, $base - floor($base)), 1) . " " .$suffix[$f_base];
				
				$records['data'][] = $row;
				  
				$row = new stdClass();
				mysqli_stmt_bind_result($stmt, $row->idadjuntos_contratos, $row->contratos_idcontratos, $row->archivo_contrato, $row->size_archivo_contrato, $row->estado_adjunto, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
						
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
			
			
	}
	
	
	public function createContrato($item) {
				
		$stmt = mysqli_prepare($this->connection, "INSERT INTO contratos (usuarios_idusuarios, sedes_idsedes, proveedores_idproveedores, nombre_contrato, nro_contrato, monto_contrato, fecha_contrato, plazo_desde, plazo_hasta, estado_contrato, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiissdsssiss', $item->usuarios_idusuarios, $item->sedes_idsedes, $item->proveedores_idproveedores, $item->nombre_contrato, $item->nro_contrato, $item->monto_contrato, $item->fecha_contrato, $item->plazo_desde, $item->plazo_hasta, $item->estado_contrato, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return ($autoid)? $autoid : $this->throwExceptionOnError();
	}
	
	public function createContratoItemAdjudicados($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO contratos_item_adjudicados (contratos_idcontratos, idmedida_combustible, idtipo_combustible, cantidad, precio_unitario, precio_total, ficha_tecnica, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();
			
		mysqli_stmt_bind_param($stmt, 'iiidddsss', $item->contratos_idcontratos, $item->idmedida_combustible, $item->idtipo_combustible, $item->cantidad, $item->precio_unitario, $item->precio_total, $item->ficha_tecnica, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	public function createContratoAdjuntos($item) {
				
		$stmt = mysqli_prepare($this->connection, "INSERT INTO adjuntos_contratos (contratos_idcontratos, archivo_contrato, size_archivo_contrato, estado_adjunto, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();
			
		mysqli_stmt_bind_param($stmt, 'isiiss', $item->contratos_idcontratos, $item->archivo_contrato, $item->size_archivo_contrato , $item->estado_adjunto, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateContrato($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE contratos SET usuarios_idusuarios=?, sedes_idsedes=?, proveedores_idproveedores=?, nombre_contrato=?, nro_contrato=?, monto_contrato=?, fecha_contrato=?, plazo_desde=?, plazo_hasta=?, fecha_creacion=?, usuario_creacion=?, fecha_modificacion=?, usuario_modificacion=? WHERE idcontratos=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiissdsssssssi', $item->usuarios_idusuarios, $item->sedes_idsedes, $item->proveedores_idproveedores, $item->nombre_contrato, $item->nro_contrato, $item->monto_contrato, $item->fecha_contrato, $item->plazo_desde, $item->plazo_hasta, $item->fecha_creacion, $item->usuario_creacion, $item->fecha_modificacion, $item->usuario_modificacion, $item->idcontratos);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);


	}


	public function deleteContrato($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM contratos WHERE idcontratos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function deleteItemContrato($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM contratos_item_adjudicados WHERE id_item_adjudicados = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function deleteAdjuntoContrato($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM adjuntos_contratos WHERE idadjuntos_contratos = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}

	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM contratos");
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
