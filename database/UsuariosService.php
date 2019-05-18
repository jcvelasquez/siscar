<?php

class UsuariosService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getAllUsuarios($settings = array()) {
		
			//ORDEN DE LAS COLUMNAS
			if (isset($settings['order'][0]['column'])) $index_col = $settings['order'][0]['column'];
			if (isset($index_col)) $order_by  = $settings['columns'][$index_col]['data'];
			if (isset($settings['order'][0]['dir'])) $order_dir = $settings['order'][0]['dir'];
			
			$query = "SELECT usu.idusuarios, 
							 are.sedes_idsedes, 
							 sed.nombre_sede,
							 usu.roles_idroles,
							 rol.nombre_rol,
							 usu.nombres, 
							 usu.apellidos, 
							 usu.sexo, 
							 usu.idtipo_identificacion, 
							 ti.tipo_identificacion,
							 usu.nro_identificacion, 
							 usu.idtipo_licencia, 
							 tl.tipo_licencia,
							 usu.nro_licencia, 
							 usu.direccion_uno, 
							 usu.direccion_dos, 
							 usu.telefono, 
							 usu.email,
							 usu.codigo, 
							 usu.usuario, 
							 usu.clave,  
							 usu.prioridad,  
							 usu.estado_usuario,
							 are.nombre_area,
							 usu.areas_idareas
						FROM usuarios usu,
							 sedes sed,
							 roles rol,
							 tipo_licencia tl,
							 tipo_identificacion ti,
							 areas are
  					  WHERE are.sedes_idsedes = sed.idsedes
					    AND usu.roles_idroles = rol.idroles
						AND usu.areas_idareas = are.idareas
						AND usu.idtipo_identificacion = ti.idtipo_identificacion
						AND usu.idtipo_licencia = tl.idtipo_licencia ";
						
			if( !empty($settings['search']['value']) ) 
			{				
				$query .= " AND (sed.nombre_sede LIKE '%".$settings['search']['value']."%' OR rol.nombre_rol LIKE '%".$settings['search']['value']."%' OR usu.nombres LIKE '%".$settings['search']['value']."%' OR usu.apellidos LIKE '%".$settings['search']['value']."%' OR usu.nro_identificacion LIKE '%".$settings['search']['value']."%' OR usu.nro_licencia LIKE '%".$settings['search']['value']."%' OR usu.email LIKE '%".$settings['search']['value']."%' OR usu.usuario LIKE '%".$settings['search']['value']."%' OR usu.codigo LIKE '%".$settings['search']['value']."%' )";	
				
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
			
			mysqli_stmt_bind_result($stmt, $row->idusuarios, $row->sedes_idsedes, $row->nombre_sede, $row->roles_idroles, $row->nombre_rol , $row->nombres, $row->apellidos, $row->sexo, $row->idtipo_identificacion, $row->tipo_identificacion, $row->nro_identificacion, $row->idtipo_licencia, $row->tipo_licencia, $row->nro_licencia, $row->direccion_uno, $row->direccion_dos, $row->telefono, $row->email, $row->codigo, $row->usuario, $row->clave, $row->prioridad, $row->estado_usuario, $row->nombre_area, $row->areas_idareas);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records['data'][] = $row;
				  
				  $row = new stdClass();
				  
				  mysqli_stmt_bind_result($stmt, $row->idusuarios, $row->sedes_idsedes, $row->nombre_sede, $row->roles_idroles, $row->nombre_rol , $row->nombres, $row->apellidos, $row->sexo, $row->idtipo_identificacion, $row->tipo_identificacion, $row->nro_identificacion, $row->idtipo_licencia, $row->tipo_licencia, $row->nro_licencia, $row->direccion_uno, $row->direccion_dos, $row->telefono, $row->email, $row->codigo, $row->usuario, $row->clave, $row->prioridad, $row->estado_usuario, $row->nombre_area, $row->areas_idareas);
				  
			}
			
			$records["recordsTotal"] = intval($settings['recordsTotal']);
			$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
			return $records;
		
	}
	
	
	public function getAllUsuariosSIGAP($settings = array()) {
		
			$server = "SIEX-LIM-DB\SQLE";
			$database = 'BD_EXPOSIERRA_2017';
			$user = 'BD_EXPOSIERRA_2013X';
			$password = '$_$Acc3s00**';
				
			$sql = "SELECT usu.*,
						   per.*
					  FROM t_usuario usu,
						   t_personal per
					 WHERE usu.cod_pers = per.cod_pers
					   AND usu.estado_user = '1' 
				  ORDER BY apepat_pers ASC";
		
			$con = odbc_connect("Driver={SQL Server};Server=".$server.";Database=".$database.";", $user, $password) or die('no se conecto a la base de datos SIGAP!');
			$res = odbc_exec($con , $sql);  
			
			$totalFiltered = $settings['recordsTotal'];
			
			$records = array();
			$records['data'] = array();
			
			$records["recordsTotal"] = odbc_num_rows($res);
			//$records["recordsFiltered"] = intval($totalFiltered);
			$records["draw"] = intval($settings['draw']);
			
			while($user = odbc_fetch_array($res)){
				
				$user['nom_pers'] = utf8_decode($user['nom_pers']);	
				$user['apepat_pers'] = utf8_decode($user['apepat_pers']);	
				$user['apemat_pers'] = utf8_decode($user['apemat_pers']);	
				$user['dir_pers'] = utf8_decode($user['dir_pers']);	
				
				$records['data'][] = $user;
				
			}
			
			return $records;
			
		
	}
	

	public function validarUsuario($item) {
			
			$idItem = $item->idItem;
			$usuario = $item->usuario;
			
			if($idItem == 'nuevo'){
															
				$stmt = mysqli_prepare($this->connection, "SELECT idusuarios, usuario, nombres, apellidos FROM usuarios WHERE usuario = '$usuario' ");
				$this->throwExceptionOnError();
				
				mysqli_stmt_execute($stmt);
				$this->throwExceptionOnError();
				
				mysqli_stmt_bind_result($stmt, $row->idusuarios, $row->usuario, $row->nombres, $row->apellidos);
							
				if(mysqli_stmt_fetch($stmt)) {
					return false; //array('status' => 'false', 'message' => 'El usuario ' . $usuario . ' no esta disponible.');
				} else {
					return true; //array('status' => 'true', 'message' => 'El usuario ' . $usuario . ' está disponible.');
				}
			
			}else{
				return true;
			}
		
	}
	
	
	public function getUsuarioByID($itemID) {
		
		
			$query = "SELECT usu.idusuarios, 
							 are.sedes_idsedes, 
							 sed.nombre_sede,
							 usu.roles_idroles,
							 rol.nombre_rol,
							 usu.nombres, 
							 usu.apellidos, 
							 usu.sexo, 
							 usu.idtipo_identificacion, 
							 ti.tipo_identificacion,
							 usu.nro_identificacion, 
							 usu.idtipo_licencia, 
							 tl.tipo_licencia,
							 usu.nro_licencia, 
							 usu.direccion_uno, 
							 usu.direccion_dos, 
							 usu.telefono, 
							 usu.email,
							 usu.codigo,
							 usu.usuario, 
							 usu.clave,  
							 usu.prioridad,  
							 usu.estado_usuario,
							 are.nombre_area,
							 usu.areas_idareas
						FROM usuarios usu,
							 sedes sed,
							 roles rol,
							 tipo_licencia tl,
							 tipo_identificacion ti,
							 areas are
  					  WHERE are.sedes_idsedes = sed.idsedes
					    AND usu.roles_idroles = rol.idroles
						AND usu.areas_idareas = are.idareas
						AND usu.idtipo_identificacion = ti.idtipo_identificacion
						AND usu.idtipo_licencia = tl.idtipo_licencia
						AND usu.idusuarios = ?";
						
						
			$stmt = mysqli_prepare($this->connection, $query);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'i', $itemID);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idusuarios, $row->sedes_idsedes, $row->nombre_sede, $row->roles_idroles, $row->nombre_rol , $row->nombres, $row->apellidos, $row->sexo, $row->idtipo_identificacion, $row->tipo_identificacion, $row->nro_identificacion, $row->idtipo_licencia, $row->tipo_licencia, $row->nro_licencia, $row->direccion_uno, $row->direccion_dos, $row->telefono, $row->email, $row->codigo, $row->usuario, $row->clave, $row->prioridad, $row->estado_usuario, $row->nombre_area, $row->areas_idareas);
			
			if(mysqli_stmt_fetch($stmt)) {
			  return $row;
			} else {
			  return 0;
			}
	}
	

	
	public function createUsuario($item) {

		$stmt = mysqli_prepare($this->connection, "INSERT INTO usuarios (roles_idroles, areas_idareas, nombres, apellidos, sexo, idtipo_identificacion, nro_identificacion, idtipo_licencia, nro_licencia, direccion_uno, telefono, email, codigo, usuario, clave, prioridad, estado_usuario, fecha_creacion, usuario_creacion) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
		$this->throwExceptionOnError();

		mysqli_stmt_bind_param($stmt, 'iisssisisssssssiiss', $item->roles_idroles, $item->areas_idareas, $item->nombres, $item->apellidos, $item->sexo, $item->idtipo_identificacion, $item->nro_identificacion, $item->idtipo_licencia, $item->nro_licencia, $item->direccion_uno, $item->telefono, $item->email, $item->codigo, $item->usuario, $item->clave, $item->prioridad, $item->estado_usuario, $item->fecha_creacion, $item->usuario_creacion);
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();

		$autoid = mysqli_stmt_insert_id($stmt);

		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

		return $autoid;
	}


	public function updateUsuario($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE usuarios SET roles_idroles=?, areas_idareas=?, nombres=?, apellidos=?, sexo=?, idtipo_identificacion=?, nro_identificacion=?, idtipo_licencia=?, nro_licencia=?, direccion_uno=?, telefono=?, email=?, codigo=?, clave=?, prioridad=?, estado_usuario=?, fecha_modificacion=?, usuario_modificacion=? WHERE idusuarios=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'iisssisissssssiissi', $item->roles_idroles, $item->areas_idareas, $item->nombres, $item->apellidos, $item->sexo, $item->idtipo_identificacion, $item->nro_identificacion, $item->idtipo_licencia, $item->nro_licencia, $item->direccion_uno, $item->telefono, $item->email, $item->codigo, $item->clave,  $item->prioridad, $item->estado_usuario, $item->fecha_modificacion, $item->usuario_modificacion, $item->idusuarios);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function deleteUsuario($itemID) {
				
		$stmt = mysqli_prepare($this->connection, "DELETE FROM usuarios WHERE idusuarios = ?");
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'i', $itemID);
		mysqli_stmt_execute($stmt);
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
		mysqli_stmt_free_result($stmt);		
		mysqli_close($this->connection);

	}


	public function total() {
		$stmt = mysqli_prepare($this->connection, "SELECT COUNT(*) AS total FROM usuarios");
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