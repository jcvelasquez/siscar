<?php

class ChoferesService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllChoferes($settings = array()) {
		
			$query = "SELECT cho.idchofer, 
				 			 cho.vehiculos_idvehiculos,
							 ve.placa_vehiculo,
							 cho.sedes_idsedes,
							 se.nombre_sede,
							 cho.nombres_chofer, 
							 cho.apellidos_chofer, 
							 cho.idtipo_identificacion, 
							 ti.tipo_identificacion,
							 cho.nro_identificacion, 
							 cho.idtipo_licencia, 
							 tl.tipo_licencia,
							 cho.nro_licencia, 
							 cho.email_chofer,
							 cho.usuario_chofer, 
							 cho.clave_chofer, 
							 cho.foto_chofer,
							 cho.estado_chofer, 
							 cho.fecha_creacion, 
							 cho.usuario_creacion, 
							 cho.fecha_modificacion, 
							 cho.usuario_modificacion
						FROM chofer cho,
							 tipo_licencia tl,
							 tipo_identificacion ti,
							 sedes se,
							 vehiculos ve
					   WHERE cho.idtipo_identificacion = ti.idtipo_identificacion
					     AND cho.idtipo_licencia = tl.idtipo_licencia
						 AND cho.vehiculos_idvehiculos = ve.idvehiculos
						 AND cho.sedes_idsedes = se.idsedes";
		
			$totalFiltered = $settings['recordsTotal'];
			
			if( !empty($settings['search']['value']) ) 
			{
				$query .= " AND (cho.nombres_chofer LIKE '%".$settings['search']['value']."%' OR cho.apellidos_chofer LIKE '%".$settings['search']['value']."%' OR cho.nro_identificacion LIKE '%".$settings['search']['value']."%') ";
			}
			
			if($settings["estado"] != "-1") $query .= " AND cho.estado_chofer = " . $settings["estado"];
			
			$query .= " ORDER BY cho.apellidos_chofer ASC ";
			
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
			
			mysqli_stmt_bind_result($stmt, $row->idchofer, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->nombres_chofer, $row->apellidos_chofer, $row->idtipo_identificacion, $row->tipo_identificacion, $row->nro_identificacion, $row->idtipo_licencia, $row->tipo_licencia, $row->nro_licencia, $row->email_chofer, $row->usuario_chofer, $row->clave_chofer, $row->foto_chofer, $row->estado_chofer, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idchofer, $row->vehiculos_idvehiculos, $row->placa_vehiculo, $row->sedes_idsedes, $row->nombre_sede, $row->nombres_chofer, $row->apellidos_chofer, $row->idtipo_identificacion, $row->tipo_identificacion, $row->nro_identificacion, $row->idtipo_licencia, $row->tipo_licencia, $row->nro_licencia, $row->email_chofer, $row->usuario_chofer, $row->clave_chofer, $row->foto_chofer, $row->estado_chofer, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
			return $records;
		
	}
	
	
	public static function getDatosChoferByUserSIGAP($usuario) {
				
			$server = "SIEX-LIM-DB\SQLE";
			$database = 'BD_EXPOSIERRA_2017';
			$user = 'BD_EXPOSIERRA_2013X';
			$password = '$_$Acc3s00**';
			
			$sql = "SELECT usu.*,
						   per.*
					  FROM t_usuario usu,
						   t_personal per
					 WHERE usu.cod_pers = per.cod_pers
					   AND usu.nom_user='".$usuario."' 
					   AND usu.estado_user = '1' ";
		
			$con = odbc_connect("Driver={SQL Server};Server=".$server.";Database=".$database.";", $user, $password) or die('no se conecto a la base de datos SIGAP!');
			$res = odbc_exec($con,$sql);    
			$user = odbc_fetch_array($res);
			
			if(!empty($user)){
				
				return array("authorize" => true, "datos" => $user);
				
			}else{
				return array("authorize" => false, "mensaje" => "Los datos de acceso son incorrectos o su usuario no existe en la base de datos del SIGAP." );
								
			}
		
		
	}

	
	public function getChoferByID($itemID) {
		
			$query = "SELECT cho.idchofer, 
			 				 cho.vehiculos_idvehiculos,
							 cho.sedes_idsedes,
							 se.nombre_sede,
							 cho.nombres_chofer, 
							 cho.apellidos_chofer, 
							 cho.idtipo_identificacion, 
							 ti.tipo_identificacion,
							 cho.nro_identificacion, 
							 cho.idtipo_licencia, 
							 tl.tipo_licencia,
							 cho.nro_licencia, 
							 cho.email_chofer,
							 cho.usuario_chofer, 
							 cho.clave_chofer, 
							 cho.foto_chofer,
							 cho.estado_chofer, 
							 cho.fecha_creacion, 
							 cho.usuario_creacion, 
							 cho.fecha_modificacion, 
							 cho.usuario_modificacion
						FROM chofer cho,
							 tipo_licencia tl,
							 tipo_identificacion ti,
							 sedes se
					   WHERE cho.idtipo_identificacion = ti.idtipo_identificacion
					     AND cho.idtipo_licencia = tl.idtipo_licencia
						 AND cho.sedes_idsedes = se.idsedes
						 AND cho.idchofer=?";
						 
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idchofer, $row->vehiculos_idvehiculos, $row->sedes_idsedes, $row->nombre_sede, $row->nombres_chofer, $row->apellidos_chofer, $row->idtipo_identificacion, $row->tipo_identificacion, $row->nro_identificacion, $row->idtipo_licencia, $row->tipo_licencia, $row->nro_licencia, $row->email_chofer, $row->usuario_chofer, $row->clave_chofer, $row->foto_chofer, $row->estado_chofer, $row->fecha_creacion, $row->usuario_creacion, $row->fecha_modificacion, $row->usuario_modificacion);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	
	
	public function createChofer($item) {

		$stmt = mysqli_prepare($this->connection, "INSERT INTO chofer (sedes_idsedes, vehiculos_idvehiculos, nombres_chofer, apellidos_chofer, idtipo_identificacion, nro_identificacion, idtipo_licencia, nro_licencia, email_chofer, usuario_chofer, clave_chofer, foto_chofer, estado_chofer, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iissisisssssiss', $item->sedes_idsedes, $item->vehiculos_idvehiculos, $item->nombres_chofer, $item->apellidos_chofer, $item->idtipo_identificacion, $item->nro_identificacion, $item->idtipo_licencia, $item->nro_licencia, $item->email_chofer, $item->usuario_chofer, $item->clave_chofer, $item->foto_chofer, $item->estado_chofer, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}



	public function updateChofer($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE chofer SET sedes_idsedes=?, vehiculos_idvehiculos=?, nombres_chofer=?, apellidos_chofer=?, idtipo_identificacion=?, nro_identificacion=?, idtipo_licencia=?, nro_licencia=?, email_chofer=?, usuario_chofer=?, clave_chofer=?, foto_chofer=?, estado_chofer=?, fecha_modificacion=?, usuario_modificacion=? WHERE idchofer=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iissisisssssissi', $item->sedes_idsedes, $item->vehiculos_idvehiculos, $item->nombres_chofer, $item->apellidos_chofer, $item->idtipo_identificacion, $item->nro_identificacion, $item->idtipo_licencia, $item->nro_licencia, $item->email_chofer, $item->usuario_chofer, $item->clave_chofer, $item->foto_chofer, $item->estado_chofer, $item->fecha_modificacion, $item->usuario_modificacion, $item->idchofer);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteChofer($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM chofer WHERE idchofer = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}
	
	public function validarChofer($item) {
			
			$idItem = $item->idItem;
			$usuario_chofer = $item->usuario_chofer;
			
			if($idItem == 'nuevo'){
															
				$stmt = mysqli_prepare($this->connection, "SELECT idchofer, usuario_chofer, nombres_chofer, apellidos_chofer FROM chofer WHERE usuario_chofer = '$usuario_chofer' ");
				$this->throwExceptionOnError();
				
				mysqli_stmt_execute($stmt);
				$this->throwExceptionOnError();
				
				mysqli_stmt_bind_result($stmt, $row->idchofer, $row->usuario_chofer, $row->nombres_chofer, $row->apellidos_chofer);
							
				if(mysqli_stmt_fetch($stmt)) {
					return false; //array('status' => 'false', 'message' => 'El usuario ' . $usuario . ' no esta disponible.');
				} else {
					return true; //array('status' => 'true', 'message' => 'El usuario ' . $usuario . ' está disponible.');
				}
			
			}else{
				return true;
			}
		
	}



	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM chofer");
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