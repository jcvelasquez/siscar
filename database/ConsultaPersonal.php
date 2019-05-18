<?php

	
	$settings = array();
	//$settings['usuario'] = $_REQUEST['usuario'];	
	//$settings['clave'] = $_REQUEST['clave'];

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
    $res = odbc_exec($con , $sql);    
	$user = odbc_fetch_array($res);
	
	print_r($user);
	

 
?>