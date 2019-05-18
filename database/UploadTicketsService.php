<?php

require_once('ContratosService.php'); 

$mv = new ContratosService();  

if ( !empty( $_FILES ) ) {
	
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = dirname( __FILE__ ). DIRECTORY_SEPARATOR. 'adjuntos' . DIRECTORY_SEPARATOR . $_FILES[ 'file' ][ 'name' ];
	
    if(move_uploaded_file( $tempPath, $uploadPath )){
	
		$item = new stdClass;
		$item->contratos_idcontratos = $_REQUEST['contratos_idcontratos'];
		$item->archivo_contrato = $_FILES[ 'file' ][ 'name' ];
		$item->estado_adjunto = 1;
		$item->fecha_creacion = date("Y-m-d H:i:s");
		$item->usuario_creacion = $_REQUEST['usuario_creacion'];

		$answer = array( 'answer' => 'Transferecia de archivo completa', 'id' => $mv->createContratoAdjuntos($item));

		echo json_encode( $answer );
		
	}

    

} else {
    echo 'No hay archivos';
}
?>