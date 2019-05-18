<?php

class MailerService{
	
	var $password = 'R3g1str0$$';
	var $admin_mail = 'registro@sierraexportadora.gob.pe';

    public function __construct() {
		require('mailer/class.phpmailer.php');
        require('mailer/class.smtp.php');
	}
	
	public function enviarCorreo($settings = array()) {
		
		  $mail = new PHPMailer();
		  $mail->IsSMTP(); 
		  $mail->SMTPAuth = true;
		  $mail->Username = $this->admin_mail;
		  $mail->Password = $this->password; 
		  $mail->Host = "mail.sierraexportadora.gob.pe";

		  $body = $settings['mensaje'];
		  
		  $mail->From = $this->admin_mail;
		  $mail->FromName = "Sistema de Control Vehicular - SISCAR v1.0";
		  $mail->Subject = $settings['asunto'];
		  $mail->MsgHTML($body);
		  $mailto = $settings['email'];
		  
		  if(empty($mailto)){
			  $mailto = $this->admin_mail;
		  }
		  
		  $mail->AddAddress($mailto, $settings['nombre'] );
		  $mail->AddAddress('informatica1@sierraexportadora.gob.pe',"Jose Claudio Velasquez Boyer");
		  $mail->AddAddress('dortiz@sierraexportadora.gob.pe',"Dante Ortiz Tello");
		
		
		  if(!$mail->Send()) {
			  return array("status" => false);
		  }else{
			  return array("status" => true);
		  }

		  exit;					
		
	}

	
}
 
?>