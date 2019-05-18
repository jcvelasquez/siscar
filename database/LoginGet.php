<?php

include('JWT.php');
include('LoginService.php'); 

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
	if($_REQUEST['action_type'] == 'login_test'){
			
				$settings = array();
				
				$session_sigap = LoginService::loginTest($settings);
				
				echo json_encode($session_sigap);	
			
	} else if($_REQUEST['action_type'] == 'login_sigap'){
		
			if(isset($_REQUEST['usuario']) && !empty($_REQUEST['usuario']) && isset($_REQUEST['clave']) && !empty($_REQUEST['clave']) ){
	
				$settings = array();
				$settings['usuario'] = $_REQUEST['usuario'];	
				$settings['clave'] = $_REQUEST['clave'];
				
				$session_sigap = LoginService::loginSigap($settings);
				
				echo json_encode($session_sigap);	
				
			}else{
				echo json_encode( array("authorize" => false, "mensaje" => "Los datos de usuario y clave son obligatorios para el login en el SIGAP" ) );
				exit;	
			}

	}else if($_REQUEST['action_type'] == 'login_siscar'){
		
			if(isset($_REQUEST['usuario']) && !empty($_REQUEST['usuario']) && isset($_REQUEST['codigo']) && !empty($_REQUEST['codigo']) ){
	
				$settings = array();
				$settings['usuario'] = $_REQUEST['usuario'];	
				$settings['codigo'] = $_REQUEST['codigo'];
				
				$obj = new LoginService(); 
				
				$stdObj = new stdClass;
				$stdObj = $obj->loginSiscar($settings);
				echo json_encode($stdObj);
				
			}else{
				echo json_encode( array("authorize" => false, "mensaje" => "Los datos de usuario y codigo son obligatorios para el login en el SISCAR") );
				exit;	
			}
			
	 }else if($_REQUEST['action_type'] == 'login_sesion'){
		 
		 
			$session = LoginService::getInstance();
									 
			echo json_encode(array("authorize" => $session->authorize, 
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
									 "codrol" => $session->codrol,
									 "idrol" => $session->idrol,
									 "rol" => $session->rol,
									 "idarea" => $session->idarea,
									 "area" => $session->area));
		
     }
	 

    exit;
		 
}

?>