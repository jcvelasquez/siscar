<?php

include('ConfiguracionService.php'); 

$obj = new ConfiguracionService(); 

$settings = array();

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
	
	if($_REQUEST['action_type'] == 'cargar_configuracion'){
		
		$stdObj = new stdClass;
		$stdObj = $obj->parametrosConfiguracion();
		echo json_encode($stdObj);
		
	}else if($_REQUEST['action_type'] == 'sesion_configuracion'){
		 
		$session = ConfiguracionService::getInstance();
		echo json_encode(array("parametros" => $session->parametros));
				
    }else if($_REQUEST['action_type'] == 'update'){
		 
		$item = new stdClass;
		$item->nombre_parametro = $_REQUEST['name'];
		$item->valor_parametro = $_REQUEST['value'];
		
		$obj->updateParametroConfiguracion($item);
		$obj->parametrosConfiguracion();
				
		echo json_encode("ok");
				
    }
	 

    exit;
		 
}

?>