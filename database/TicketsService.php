<?php

class TicketsService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllTickets($settings = array()) {
		
			 $desde = $settings["desde"];
			 $hasta = $settings["hasta"];
			
			 $idchofer = $settings["idchofer"];
			 $idtipo_combustible = $settings["idtipo_combustible"];
			 $idvehiculos = $settings["idvehiculos"];
			 $sedes_idsedes = $settings["sedes_idsedes"];
			 
			 //ORDEN DE LAS COLUMNAS
			 if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			 if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			 if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
			 
			 $query = "SELECT tc.idticket_combustible, 
							  tc.idvehiculos, 
							  v.placa_vehiculo as placa_vehiculo,
							  tc.idtipo_combustible, 
							  ti.tipo_combustible,
							  tc.idsucursales, 
							  s.nombre_sucursal,
							  tc.chofer_idchofer,
							  CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
							  ta.id_item_adjudicados, 
							  tc.idtarjetas_combustible,
							  ta.nro_tarjeta,
							  tc.nro_ticket, 
							  tc.fecha_ticket,
							  tc.hora_ticket, 
							  tc.saldo_combustible, 
							  tc.cantidad_combustible, 
							  tc.precio_unitario_combustible, 
							  tc.importe_total_combustible, 
							  tc.kilometraje, 
							  tc.es_tanque_lleno, 
							  tc.es_reset,
							  tc.es_ticket,
							  cia.contratos_idcontratos,
							  con.nombre_contrato,
							  con.nro_contrato,
							  tc.sedes_idsedes,
							  se.nombre_sede as nombre_sede,
							  (SELECT fa.nro_factura 
							  	 FROM facturas fa,  
								      tickets_x_factura_detalle txfd,
							     	  tickets_x_factura_cabecera txfc
								  WHERE txfc.idtickets_x_factura_cabecera = txfd.idtickets_x_factura_cabecera
								  	AND txfc.facturas_idfacturas = fa.idfacturas
								    AND txfd.idticket_combustible = tc.idticket_combustible) as nro_factura
						 FROM tickets_combustible AS tc
 				   INNER JOIN vehiculos AS v
				   		   ON tc.idvehiculos = v.idvehiculos
				   INNER JOIN sucursales AS s	   
						   ON tc.idsucursales = s.idsucursales
				   INNER JOIN tipo_combustible AS ti
				   		   ON tc.idtipo_combustible = ti.idtipo_combustible
				   INNER JOIN chofer AS cho
				           ON tc.chofer_idchofer = cho.idchofer
				    LEFT JOIN tarjetas_combustible AS ta
						   ON tc.idtarjetas_combustible = ta.idtarjetas_combustible
				    LEFT JOIN contratos_item_adjudicados AS cia  
						   ON ta.id_item_adjudicados = cia.id_item_adjudicados
				    LEFT JOIN contratos AS con
				           ON cia.contratos_idcontratos = con.idcontratos
				   INNER JOIN sedes se   
						   ON tc.sedes_idsedes = se.idsedes 
				        WHERE v.placa_vehiculo IS NOT NULL ";
				
				if($idchofer != "all" && !empty($idchofer)){
					$query .= " AND tc.chofer_idchofer = '$idchofer'";
				}	
				
				if($sedes_idsedes != "all" && !empty($sedes_idsedes)){
					$query .= " AND tc.sedes_idsedes = '$sedes_idsedes'";
				}	
				
				if($idtipo_combustible != "all" && !empty($idtipo_combustible)){
					$query .= " AND tc.idtipo_combustible = '$idtipo_combustible'";
				}
				
				if($idvehiculos != "all" && !empty($idvehiculos)){
					$query .= " AND tc.idvehiculos = '$idvehiculos'";
				}
				
				if($desde != "" && $hasta != ""){
					$query .= " AND tc.fecha_ticket >= '$desde' AND tc.fecha_ticket <= '$hasta' ";
				}
	
				if( !empty($settings['search']['value']) ) 
				{
					$query .= " AND (tc.nro_ticket LIKE '%".$settings['search']['value']."%' OR v.placa_vehiculo LIKE '%".$settings['search']['value']."%' OR se.nombre_sede LIKE '%".$settings['search']['value']."%' OR ti.tipo_combustible LIKE '%".$settings['search']['value']."%') ";
				}
							
				if (isset($order_by) && isset($order_dir))
				{
					$query .= " ORDER BY " . $order_by ." " .  $order_dir ;
				}
							
				if ( isset( $settings['start'] ) && $settings['length'] != '-1')
				{
					$query .= " LIMIT ".mysqli_real_escape_string( $this->connection, $settings['start'] ).", ".	mysqli_real_escape_string($this->connection, $settings['length'] );
				}
				
				$stmt = mysqli_prepare($this->connection, $query);		
				$this->throwExceptionOnError();
				
				mysqli_stmt_execute($stmt);
				$this->throwExceptionOnError();
				
				//MUESTRA EL TOTAL FILTRADOS
				$totalFiltered = (empty($settings['search']['value']))? $settings['recordsTotal'] : $stmt->store_result();
	
				$records = array();
				$records['data'] = array();
				
				mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset, $row->es_ticket, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->nro_factura);
	
				while (mysqli_stmt_fetch($stmt)) {
					
					  //FORMATO DE LA FECHA PARA EL RESULTADO
					  $row->fecha_ticket = DateTime::createFromFormat('Y-m-d', $row->fecha_ticket);
					  $row->fecha_ticket = $row->fecha_ticket->format('d/m/Y');
								  
					  $records['data'][] = $row;
					  
					  $row = new stdClass();
					  
					  mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset, $row->es_ticket, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->nro_factura);
					  
				}
				
				$records["recordsTotal"] = intval($settings['recordsTotal']);
				$records["recordsFiltered"] = intval($totalFiltered);
				$records["draw"] = intval($settings['draw']);
				
				mysqli_stmt_free_result($stmt);
				mysqli_close($this->connection);
			
		   
				return $records;
		
	}
	
	
	public function getTicketsByFacturaID($ItemID) {
		
         $query = "SELECT tc.idticket_combustible, 
						  tc.idvehiculos, 
						  v.placa_vehiculo,
						  tc.idtipo_combustible, 
						  ti.tipo_combustible,
						  tc.idsucursales, 
						  s.nombre_sucursal,
						  tc.chofer_idchofer,
						  CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
						  ta.id_item_adjudicados, 
						  tc.idtarjetas_combustible,
						  ta.nro_tarjeta,
						  tc.nro_ticket, 
						  tc.fecha_ticket,
						  tc.hora_ticket, 
						  tc.saldo_combustible, 
						  tc.cantidad_combustible, 
						  tc.precio_unitario_combustible, 
						  tc.importe_total_combustible, 
						  tc.kilometraje, 
						  tc.es_tanque_lleno, 
						  tc.es_reset,
						  cia.contratos_idcontratos,
						  con.nombre_contrato,
						  con.nro_contrato,
						  tc.sedes_idsedes,
						  se.nombre_sede
				     FROM tickets_combustible AS tc
			   INNER JOIN vehiculos v
			           ON tc.idvehiculos = v.idvehiculos
			   INNER JOIN sucursales AS s
			           ON tc.idsucursales = s.idsucursales
			   INNER JOIN tipo_combustible AS ti
			           ON tc.idtipo_combustible = ti.idtipo_combustible
			   INNER JOIN chofer AS cho
			           ON tc.chofer_idchofer = cho.idchofer 
				LEFT JOIN tarjetas_combustible AS ta
				       ON tc.idtarjetas_combustible = ta.idtarjetas_combustible
				LEFT JOIN contratos_item_adjudicados AS cia
					   ON ta.id_item_adjudicados = cia.id_item_adjudicados  
				LEFT JOIN contratos AS con		  
					   ON cia.contratos_idcontratos = con.idcontratos  
			   INNER JOIN sedes AS se
			   		   ON tc.sedes_idsedes = se.idsedes
			   INNER JOIN tickets_x_factura_detalle AS tfd
			           ON tc.idticket_combustible = tfd.idticket_combustible
			   INNER JOIN tickets_x_factura_cabecera AS tfc					   
			           ON tfd.idtickets_x_factura_cabecera = tfc.idtickets_x_factura_cabecera
					WHERE tfc.facturas_idfacturas = ?";
		
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $ItemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede);
			
			while (mysqli_stmt_fetch($stmt)) {
				
				  $row->nombre_chofer = utf8_encode($row->nombre_chofer);
				  $row->nombre_contrato = utf8_encode($row->nombre_contrato);
				
				  $row->fecha_ticket = DateTime::createFromFormat('Y-m-d', $row->fecha_ticket);
				  $row->fecha_ticket = $row->fecha_ticket->format('d/m/Y');
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = 100000000;
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}

	
	public function getTicketByID($itemID) {
		
		     $query = "SELECT tc.idticket_combustible, 
							  tc.idvehiculos, 
							  v.placa_vehiculo as placa_vehiculo,
							  tc.idtipo_combustible, 
							  ti.tipo_combustible,
							  tc.idsucursales, 
							  s.nombre_sucursal,
							  tc.chofer_idchofer,
							  CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
							  ta.id_item_adjudicados, 
							  tc.idtarjetas_combustible,
							  ta.nro_tarjeta,
							  tc.nro_ticket, 
							  tc.fecha_ticket,
							  tc.hora_ticket, 
							  tc.saldo_combustible, 
							  tc.cantidad_combustible, 
							  tc.precio_unitario_combustible, 
							  tc.importe_total_combustible, 
							  tc.kilometraje, 
							  tc.es_tanque_lleno, 
							  tc.es_reset,
							  tc.es_ticket,
							  cia.contratos_idcontratos,
							  con.nombre_contrato,
							  con.nro_contrato,
							  tc.sedes_idsedes,
							  se.nombre_sede as nombre_sede,
							  s.proveedores_idproveedores
						 FROM tickets_combustible AS tc
 				   INNER JOIN vehiculos AS v
				   		   ON tc.idvehiculos = v.idvehiculos
				   INNER JOIN sucursales AS s	   
						   ON tc.idsucursales = s.idsucursales
				   INNER JOIN tipo_combustible AS ti
				   		   ON tc.idtipo_combustible = ti.idtipo_combustible
				   INNER JOIN chofer AS cho
				           ON tc.chofer_idchofer = cho.idchofer
				    LEFT JOIN tarjetas_combustible AS ta
						   ON tc.idtarjetas_combustible = ta.idtarjetas_combustible
				    LEFT JOIN contratos_item_adjudicados AS cia  
						   ON ta.id_item_adjudicados = cia.id_item_adjudicados
				    LEFT JOIN contratos AS con
				           ON cia.contratos_idcontratos = con.idcontratos
				   INNER JOIN sedes se   
						   ON tc.sedes_idsedes = se.idsedes 
				        WHERE tc.idticket_combustible=? ";
			
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						  
			mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset, $row->es_ticket, $row->contratos_idcontratos, $row->nombre_contrato, $row->nro_contrato, $row->sedes_idsedes, $row->nombre_sede, $row->proveedores_idproveedores);							  
							  
			if(mysqli_stmt_fetch($stmt)) {
			
			  //FORMATO DE LA FECHA PARA EL RESULTADO
			  $row->fecha_ticket = DateTime::createFromFormat('Y-m-d', $row->fecha_ticket);
			  $row->fecha_ticket = $row->fecha_ticket->format('d/m/Y');	
				
			  return $row;
			  
			} else {
			  return 0;
			}
	}
	
	
	public function createTicket($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tickets_combustible (idvehiculos, idtipo_combustible, idsucursales, chofer_idchofer,  idtarjetas_combustible, sedes_idsedes, nro_ticket, fecha_ticket, hora_ticket, saldo_combustible, cantidad_combustible, precio_unitario_combustible, importe_total_combustible, kilometraje, es_tanque_lleno, es_reset, es_ticket, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iiiiiisssddddiiiiss', $item->idvehiculos, $item->idtipo_combustible, $item->idsucursales, $item->chofer_idchofer, $item->idtarjetas_combustible, $item->sedes_idsedes, $item->nro_ticket, $item->fecha_ticket, $item->hora_ticket, $item->saldo_combustible, $item->cantidad_combustible, $item->precio_unitario_combustible, $item->importe_total_combustible, $item->kilometraje, $item->es_tanque_lleno, $item->es_reset, $item->es_ticket, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		return array( "id" => $autoid, "status" => $this->throwExceptionOnError());
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}
	
	public function updateTicket($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE tickets_combustible SET idvehiculos=?, idtipo_combustible=?, idsucursales=?, sedes_idsedes=?, nro_ticket=?, fecha_ticket=?, hora_ticket=?, saldo_combustible=?, cantidad_combustible=?, precio_unitario_combustible=?, importe_total_combustible=?, kilometraje=?, es_tanque_lleno=?, es_reset=?, fecha_creacion=?, usuario_creacion=?, fecha_modificacion=?, usuario_modificacion=? WHERE idticket_combustible=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iiiisssddddiiissssi', $item->idvehiculos, $item->idtipo_combustible, $item->idsucursales, $item->sedes_idsedes, $item->nro_ticket, $item->fecha_ticket, $item->hora_ticket, $item->saldo_combustible, $item->cantidad_combustible, $item->precio_unitario_combustible, $item->importe_total_combustible, $item->kilometraje, $item->es_tanque_lleno, $item->es_reset, $item->fecha_creacion, $item->usuario_creacion, $item->fecha_modificacion, $item->usuario_modificacion, $item->idticket_combustible);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	


	public function deleteTicket($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM tickets_combustible WHERE idticket_combustible = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return ($this->throwExceptionOnError() == "confirm")? "success" : $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	/***************************************************/
	/*      GET TICKETS DETALLE X FACTURA CABECERA     */
	/***************************************************/
	
	public function getTicketsDetalleByIDFacturaCabecera($ItemID) {
		/*
			 $query = "SELECT tc.idticket_combustible, 
							  tc.idvehiculos, 
							  v.placa_vehiculo,
							  tc.idtipo_combustible, 
							  ti.tipo_combustible,
							  tc.idproveedores,
							  tc.idsucursales, 
							  s.nombre_sucursal,
							  tc.chofer_idchofer,
							  CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
							  tc.contratos_idcontratos,
							  tc.contratos_id_item_adjudicados, 
							  tc.idtarjetas_combustible,
							  ta.nro_tarjeta,
							  tc.nro_ticket, 
							  DATE_FORMAT(tc.fecha_ticket, '%d/%m/%Y') as fecha_ticket,
							  tc.hora_ticket, 
							  tc.saldo_combustible, 
							  tc.cantidad_combustible, 
							  tc.precio_unitario_combustible, 
							  tc.importe_total_combustible, 
							  tc.kilometraje, 
							  tc.es_tanque_lleno, 
							  tc.es_reset
					   FROM tickets_combustible tc,
							vehiculos v,
							sucursales s,
							tipo_combustible ti,
							chofer cho,
							contratos con,
							tarjetas_combustible ta,
							tickets_x_factura_detalle tde,
							tickets_x_factura_cabecera tca
					WHERE tc.idvehiculos = v.idvehiculos
					  AND tc.idsucursales = s.idsucursales
					  AND tc.idtipo_combustible = ti.idtipo_combustible
					  AND tc.contratos_idcontratos = con.idcontratos
					  AND tc.chofer_idchofer = cho.idchofer
					  AND tc.idtarjetas_combustible = ta.idtarjetas_combustible
					  AND tc.idticket_combustible = tde.idticket_combustible
					  AND tca.idtickets_x_factura_cabecera = tde.idtickets_x_factura_cabecera
					  AND tca.facturas_idfacturas = ?";
					  
					  
					  
			 $query = "SELECT tc.idticket_combustible, 
							  tc.idvehiculos, 
							  v.placa_vehiculo,
							  tc.idtipo_combustible, 
							  ti.tipo_combustible,
							  tc.idproveedores,
							  tc.idsucursales, 
							  s.nombre_sucursal,
							  tc.chofer_idchofer,
							  CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
							  tc.contratos_idcontratos,
							  tc.contratos_id_item_adjudicados, 
							  tc.idtarjetas_combustible,
							  ta.nro_tarjeta,
							  tc.nro_ticket, 
							  DATE_FORMAT(tc.fecha_ticket, '%d/%m/%Y') as fecha_ticket,
							  tc.hora_ticket, 
							  tc.saldo_combustible, 
							  tc.cantidad_combustible, 
							  tc.precio_unitario_combustible, 
							  tc.importe_total_combustible, 
							  tc.kilometraje, 
							  tc.es_tanque_lleno, 
							  tc.es_reset
					     FROM tickets_combustible AS tc
			       INNER JOIN vehiculos AS v
				   		   ON tc.idvehiculos = v.idvehiculos
				   INNER JOIN sucursales AS s
				           ON tc.idsucursales = s.idsucursales
				   INNER JOIN tipo_combustible AS ti
				   		   ON tc.idtipo_combustible = ti.idtipo_combustible
				   INNER JOIN chofer AS cho
				   		   ON tc.chofer_idchofer = cho.idchofer
				    LEFT JOIN tarjetas_combustible AS ta
				   		   ON tc.idtarjetas_combustible = ta.idtarjetas_combustible
						   
							  contratos con,
							  
							  tickets_x_factura_detalle tde,
							  tickets_x_factura_cabecera tca
					    WHERE 
					      AND 
					      AND 
					      AND tc.contratos_idcontratos = con.idcontratos
					      AND 
					      AND 
					      AND tc.idticket_combustible = tde.idticket_combustible
					      AND tca.idtickets_x_factura_cabecera = tde.idtickets_x_factura_cabecera
					      AND tca.facturas_idfacturas = ?";
		
		*/
		
		
	
		
		 $query = "SELECT tc.idticket_combustible, 
						  tc.idvehiculos, 
						  v.placa_vehiculo,
						  tc.idtipo_combustible, 
						  ti.tipo_combustible,
						  tc.idsucursales, 
						  s.nombre_sucursal,
						  tc.chofer_idchofer,
						  CONCAT(cho.apellidos_chofer, ',', cho.nombres_chofer) AS nombre_chofer,
						  ta.id_item_adjudicados, 
						  tc.idtarjetas_combustible,
						  ta.nro_tarjeta,
						  tc.nro_ticket, 
						  DATE_FORMAT(tc.fecha_ticket, '%d/%m/%Y') as fecha_ticket,
						  tc.hora_ticket, 
						  tc.saldo_combustible, 
						  tc.cantidad_combustible, 
						  tc.precio_unitario_combustible, 
						  tc.importe_total_combustible, 
						  tc.kilometraje, 
						  tc.es_tanque_lleno, 
						  tc.es_reset,
						  cia.contratos_idcontratos,
						  con.nombre_contrato,
						  con.nro_contrato,
						  tc.sedes_idsedes,
						  se.nombre_sede
				     FROM tickets_combustible AS tc
			   INNER JOIN vehiculos v
			           ON tc.idvehiculos = v.idvehiculos
			   INNER JOIN sucursales AS s
			           ON tc.idsucursales = s.idsucursales
			   INNER JOIN tipo_combustible AS ti
			           ON tc.idtipo_combustible = ti.idtipo_combustible
			   INNER JOIN chofer AS cho
			           ON tc.chofer_idchofer = cho.idchofer 
				LEFT JOIN tarjetas_combustible AS ta
				       ON tc.idtarjetas_combustible = ta.idtarjetas_combustible
				LEFT JOIN contratos_item_adjudicados AS cia
					   ON ta.id_item_adjudicados = cia.id_item_adjudicados  
				LEFT JOIN contratos AS con		  
					   ON cia.contratos_idcontratos = con.idcontratos  
			   INNER JOIN sedes AS se
			   		   ON tc.sedes_idsedes = se.idsedes
			   INNER JOIN tickets_x_factura_detalle AS tfd
			           ON tc.idticket_combustible = tfd.idticket_combustible
			   INNER JOIN tickets_x_factura_cabecera AS tfc					   
			           ON tfd.idtickets_x_factura_cabecera = tfc.idtickets_x_factura_cabecera
					WHERE tfc.facturas_idfacturas = ?";
					
					
					
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $ItemID);
					
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			$records['data'] = array();
			
			mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idproveedores, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->contratos_idcontratos,$row->contratos_id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idticket_combustible, $row->idvehiculos, $row->placa_vehiculo,$row->idtipo_combustible,  $row->tipo_combustible, $row->idproveedores, $row->idsucursales, $row->nombre_sucursal, $row->chofer_idchofer, $row->nombre_chofer, $row->contratos_idcontratos,$row->contratos_id_item_adjudicados, $row->idtarjetas_combustible , $row->nro_tarjeta, $row->nro_ticket, $row->fecha_ticket, $row->hora_ticket, $row->saldo_combustible, $row->cantidad_combustible, $row->precio_unitario_combustible, $row->importe_total_combustible, $row->kilometraje, $row->es_tanque_lleno, $row->es_reset);
				  
			}
			
			$records["recordsTotal"] = $stmt->num_rows;
			$records["recordsFiltered"] = $stmt->num_rows;
			$records["draw"] = 100000000;
			
			
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	   
			return $records;
		
	}
	
	/*******************************************/
	/*    CREATE TICKETS X FACTURA CABECERA    */
	/*******************************************/
	
	public function createTicketsXFacturaCabecera($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tickets_x_factura_cabecera (facturas_idfacturas, descripcion_cabecera, nro_cabecera_generado, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'issss', $item->facturas_idfacturas, $item->descripcion_cabecera, $item->nro_cabecera_generado, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return array("idcabecera" =>  mysqli_stmt_insert_id($stmt));

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}
	
	
	/*******************************************/
	/*    UPDATE TICKETS X FACTURA CABECERA    */
	/*******************************************/
	
	public function updateTicketsXFacturaCabecera($item) {
		
		$stmt = mysqli_prepare($this->connection, "UPDATE tickets_x_factura_cabecera SET descripcion_cabecera=?, fecha_modificacion=?, usuario_modificacion=? WHERE idtickets_x_factura_cabecera=?");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'sssi', $item->descripcion_cabecera, $item->fecha_modificacion, $item->usuario_modificacion, $item->idtickets_x_factura_cabecera);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
			
		return array("idcabecera" =>  $item->idtickets_x_factura_cabecera);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		
	}
	
	
	/************************************/
	/*     TICKETS X FACTURA DETALLE    */
	/************************************/
	public function createTicketsXFacturaDetalle($item) {
		
		$stmt = mysqli_prepare($this->connection, "INSERT INTO tickets_x_factura_detalle (idtickets_x_factura_cabecera, idticket_combustible, fecha_asignacion, estado_asignacion, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iisiss', $item->idtickets_x_factura_cabecera, $item->idticket_combustible, $item->fecha_asignacion, $item->estado_asignacion, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}

	/************************************/
	/*     TICKETS X FACTURA DETALLE    */
	/************************************/
	public function deleteTicketXFacturaDetalle($itemID) {
		
		$stmt = mysqli_prepare($this->connection, "DELETE FROM tickets_x_factura_detalle WHERE idticket_combustible = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return ($this->throwExceptionOnError() == "confirm")? "success" : $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);
		
	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM tickets_combustible");
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
