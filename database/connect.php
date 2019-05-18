<?php
/*
error_reporting(E_ALL);
ini_set("display_errors", 1); 
	*/
	
$db_host = 'localhost';
$db_user = 'root';
$db_pass = '';
//$db_pass = 'D7eAM3w54wvcrA4C';
$db_name = 'siscar';
$db_port = '3306';

$db = mysqli_connect($db_host, $db_user, $db_pass, $db_name, $db_port);

if (mysqli_connect_errno()) {
	printf("Connect failed: %s\n", mysqli_connect_error());
	exit();
}







?>