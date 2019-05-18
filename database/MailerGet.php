<?php

require_once('MailerService.php'); 

$mailer = new MailerService(); 

$settings_mail = array();
$settings_mail['mensaje'] = "hola de prueba";
$settings_mail['asunto'] = "prueba";
$settings_mail['email'] = "jcjrvb@gmail.com";
$settings_mail['nombre'] = "Jose Claudio";


$obj = new stdClass;
$obj = $mailer->enviarCorreo($settings_mail);
echo json_encode($obj);



  
?>