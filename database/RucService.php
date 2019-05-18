<?php

	if(!empty($_POST['action_type']) && $_POST['action_type'] == "validar_ruc"){
		
			$ruc = $_POST['ruc'];
			$client = new SoapClient("http://ws.pide.gob.pe/ConsultaRuc?wsdl");
			$client->__setLocation('http://ws.pide.gob.pe/ConsultaRuc');
			$result = $client->__soapCall("getDatosPrincipales", array('numruc' => $ruc));
			
			if($result){
		
					echo json_encode(array("message" => "Se encontraron los siguientes datos" , "ddp_nombre" => $result->ddp_nombre,  "ddp_refer1"=> $result->ddp_refer1, "desc_tipvia"=> $result->desc_tipvia, "ddp_nomvia"=> $result->ddp_nomvia, "ddp_numer1"=> $result->ddp_numer1 , "desc_tipzon"=> $result->desc_tipzon, "ddp_nomzon"=> $result->ddp_nomzon, "desc_dep" => $result->desc_dep , "desc_prov"=> $result->desc_prov, "desc_dist"=> $result->desc_dist, "esActivo"=> $result->esActivo, "esHabido"=> $result->esHabido ));
					
		
			}else{
				echo json_encode(array("message" => "No se encontro datos con el ruc ingresado."));
			}
			
	}

?>
