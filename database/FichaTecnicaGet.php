<?php

require_once('FichaTecnicaService.php'); 

$mv = new FichaTecnicaService(); 

$settings = array();
$settings['recordsTotal'] = $mv->total();
$settings['start'] = 0;
$settings['length'] = -1;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['action_type'] = $_REQUEST['action_type'];

if(isset($_REQUEST["length"])) $settings['length'] = intval($_REQUEST['length']);	
if(isset($_REQUEST["start"])) $settings['start'] = intval($_REQUEST['start']);
if(isset($_REQUEST["draw"])) $settings['draw'] = intval($_REQUEST['draw']);
if(isset($_REQUEST["search"])) $settings['search'] = $_REQUEST['search'];

if(isset($_REQUEST["customActionType"]) && $_REQUEST["customActionType"] == "group_action"){
	$settings["customActionStatus"] = "OK"; 
	$settings["customActionMessage"] = "Group action successfully has been completed. Well done!"; 
}

if(isset($_REQUEST['action_type']) && !empty($_REQUEST['action_type'])){
	
    if($_REQUEST['action_type'] == 'list'){
		
			$mvObj = new stdClass;
			$mvObj = $mv->getAllFichasTecnicas($settings);
			echo json_encode($mvObj);

	 }elseif($_REQUEST['action_type'] == 'view'){
		 
		 	$mvObj = new stdClass;
			$mvObj = $mv->getFichaTecnicaByVehiculoID($_REQUEST['id']);
			echo json_encode($mvObj);
	 }
	 
    exit;
		 
}


  
?>