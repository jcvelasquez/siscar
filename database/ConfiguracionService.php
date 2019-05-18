<?php

class ConfiguracionService{
	
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
	
	public function parametrosConfiguracion() {
		
			$stmt = mysqli_prepare($this->connection, "SELECT * FROM configuracion_parametros");		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
			
			$stmt->store_result();
			
			$records = array();
			
			mysqli_stmt_bind_result($stmt, $row->idconfiguracion_parametros, $row->nombre_parametro, $row->valor_parametro, $row->estado_parametro);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records[] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->idconfiguracion_parametros, $row->nombre_parametro, $row->valor_parametro, $row->estado_parametro);
				  
			}
			
			$session = self::getInstance();	
			$session->parametros = $records;					
			
			return array($session->parametros);
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
	}
		
	public function updateParametroConfiguracion($item) {
			
		$stmt = mysqli_prepare($this->connection, "UPDATE configuracion_parametros SET valor_parametro=? WHERE nombre_parametro=?");			
		$this->throwExceptionOnError();
		
		mysqli_stmt_bind_param($stmt, 'ds', $item->valor_parametro, $item->nombre_parametro);		
		$this->throwExceptionOnError();

		mysqli_stmt_execute($stmt);		
		$this->throwExceptionOnError();
		
		return $this->throwExceptionOnError();
		
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