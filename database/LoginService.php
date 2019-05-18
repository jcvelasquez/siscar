<?php

class LoginService{
	
	var $connection;
	
    const SESSION_STARTED = TRUE;
    const SESSION_NOT_STARTED = FALSE;
	
    private $sessionState = self::SESSION_NOT_STARTED;
    private static $instance;
    
    public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}
	
	
	public static function loginTest($settings = array()) {
		
			$server = "SIEX-LIM-DB\SQLE";
			$database = 'BD_EXPOSIERRA_2017';
			$user = 'BD_EXPOSIERRA_2013X';
			$password = '$_$Acc3s00**';
			
			$sql = "SELECT usu.*,
						   per.*
					  FROM t_usuario usu,
						   t_personal per
					 WHERE usu.cod_pers = per.cod_pers
					   AND usu.estado_user = '1' ";
		
			$con = odbc_connect("Driver={SQL Server};Server=".$server.";Database=".$database.";", $user, $password) or die('no se conecto a la base de datos SIGAP!');
			$res = odbc_exec($con,$sql);  
			
			$users = array();

			while ($user = odbc_fetch_array($res)){
				   $users[] =  $user;
			}
			 			
			if(!empty($users)){
				
				return array($users);
										
			}else{
				return array("authorize" => false, "mensaje" => "Los datos de acceso son incorrectos o su usuario no existe en la base de datos del SIGAP." );
			}
		
	}
	
	public static function loginSigap($settings = array()) {
				
			$server = "SIEX-LIM-DB\SQLE";
			$database = 'BD_EXPOSIERRA_2017';
			$user = 'BD_EXPOSIERRA_2013X';
			$password = '$_$Acc3s00**';
			
			$sql = "SELECT usu.*,
						   per.*
					  FROM t_usuario usu,
						   t_personal per
					 WHERE usu.cod_pers = per.cod_pers
					   AND usu.nom_user='".$settings['usuario']."' 
					   AND usu.clave_user='".$settings['clave']."'
					   AND usu.estado_user = '1' ";
		
			$con = odbc_connect("Driver={SQL Server};Server=".$server.";Database=".$database.";", $user, $password) or die('no se conecto a la base de datos SIGAP!');
			$res = odbc_exec($con,$sql);    
			$user = odbc_fetch_array($res);
			
			if(!empty($user)){
				
				return array("authorize" => true, "usuario" => $user['nom_user'], "codigo" => $user['cod_pers']);
				
			}else{
				return array("authorize" => false, "mensaje" => "Los datos de acceso son incorrectos o su usuario no existe en la base de datos del SIGAP." );
								
			}
			
			//return array("authorize" => true, "usuario" => "jvelasquez", "codigo" => "PERS0000398");
			
		
		
	}
	
	
	public function loginSiscar($settings = array()) {
		
			$usuario = $settings['usuario'];
			$codigo = $settings['codigo'];
		
			$query = "SELECT usu.idusuarios, 
							 are.sedes_idsedes, 
							 sed.nombre_sede,
							 usu.roles_idroles,
							 rol.cod_rol,
							 rol.nombre_rol,
							 usu.nombres, 
							 usu.apellidos, 
							 usu.email,
							 usu.codigo, 
							 usu.usuario, 
							 usu.prioridad,  
							 usu.estado_usuario,
							 usu.areas_idareas,
							 are.nombre_area
						FROM usuarios usu,
							 sedes sed,
							 roles rol,
							 areas are
  					  WHERE are.sedes_idsedes = sed.idsedes
					    AND usu.roles_idroles = rol.idroles
						AND usu.areas_idareas = are.idareas
						AND usu.usuario = ? 
						AND usu.codigo = ? ";
									
			$stmt = mysqli_prepare($this->connection, $query);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_param($stmt, 'ss', $usuario, $codigo);		
			$this->throwExceptionOnError();
			
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			mysqli_stmt_bind_result($stmt, $row->idusuarios, $row->sedes_idsedes, $row->nombre_sede, $row->roles_idroles, $row->cod_rol, $row->nombre_rol , $row->nombres, $row->apellidos,$row->email, $row->codigo, $row->usuario, $row->prioridad, $row->estado_usuario, $row->areas_idareas, $row->nombre_area);
			
			if(mysqli_stmt_fetch($stmt)) {
				
				$token = array();
				$token['id'] = $row->idusuarios;
										
				$session = self::getInstance();	
				$session->authorize = true;
				$session->tokenUser = JWT::encode($token, 'secret_server_key');
				$session->idusuario = $row->idusuarios;					
				$session->usuario = $row->usuario;
				$session->codigo = $row->codigo;
				$session->nombres = $row->nombres;
				$session->apellidos = $row->apellidos;
				$session->prioridad = $row->prioridad;
				$session->email = $row->email;
				$session->idsede = $row->sedes_idsedes;
				$session->sede = $row->nombre_sede;
				$session->idrol = $row->roles_idroles;
				$session->rol = $row->nombre_rol;
				$session->codrol = $row->cod_rol;
				$session->idarea = $row->areas_idareas;
				$session->area = $row->nombre_area;
				
				return array("authorize" => $session->authorize, 
							 "tokenUser"=> $session->tokenUser, 
							 "idusuario" => $session->idusuario, 
							 "usuario" => $session->usuario,
							 "codigo" => $session->codigo,
							 "nombres" => $session->nombres,
							 "apellidos" => $session->apellidos,
							 "email" => $session->email,
							 "prioridad" => $session->prioridad,
							 "idsede" => $session->idsede,
							 "sede" => $session->sede,
							 "idrol" => $session->idrol,
							 "codrol" => $session->codrol,
							 "rol" => $session->rol,
							 "idarea" => $session->idarea,
							 "area" => $session->area);
											
														  
			} else {
			   return array("authorize" => false, "mensaje" => "No se encontro el usuario sincronizado en la base de datos del SISCAR. Comuniquese con el area de sistemas para pedir una actualizacion de los datos." );
			}
				
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
					
		
	}
    
    public static function getInstance()
    {
        if ( !isset(self::$instance))
        {
            self::$instance = new self;
        }
        
        self::$instance->startSession();
        
        return self::$instance;
    }
	

    public function startSession()
    {
        if ( $this->sessionState == self::SESSION_NOT_STARTED )
        {
            $this->sessionState = session_start();
        }
        
        return $this->sessionState;
    }
  
    public function __set( $name , $value )
    {
        $_SESSION[$name] = $value;
    }
    
    public function __get( $name )
    {
        if ( isset($_SESSION[$name]))
        {
            return $_SESSION[$name];
        }
    }
    
    
    public function __isset( $name )
    {
        return isset($_SESSION[$name]);
    }
    
    
    public function __unset( $name )
    {
        unset( $_SESSION[$name] );
    }

    public function destroy()
    {
        if ( $this->sessionState == self::SESSION_STARTED )
        {
            $this->sessionState = !session_destroy();
            unset( $_SESSION );
            
            return !$this->sessionState;
        }
        
        return FALSE;
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