<?php

require_once('UbigeoService.php'); 

$mv = new UbigeoService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['columns'] = array();
$settings['order'] = array();
$settings['action_type'] = $_REQUEST['action_type'];
if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];
if(isset($_REQUEST["columns"])) $settings['columns'] = $_REQUEST['columns'];
if(isset($_REQUEST["order"])) $settings['order'] = $_REQUEST['order'];

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'departamentos'){
					
			$mvObj = new stdClass;
			$mvObj = $mv->getDepartamentos($settings);
			echo json_encode($mvObj);
		
	 }elseif($_REQUEST['action_type'] == 'provincias_x_departamento'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getProvinciasXdepartamentos($_REQUEST['departamento']);
			echo json_encode($mvObj);
		
	 }elseif($_REQUEST['action_type'] == 'distritos_x_provincia'){
		 
			$mvObj = new stdClass;
			$mvObj = $mv->getDistritosXprovincias($_REQUEST['provincia']);
			echo json_encode($mvObj);
				 
	 }
	
    exit;
		 
}


  
?>