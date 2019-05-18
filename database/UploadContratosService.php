<?php

require_once('ContratosService.php'); 
$mv = new ContratosService();  

$item = new stdClass;
$item->contratos_idcontratos = $_REQUEST['contratos_idcontratos'];
$item->archivo_contrato = trim(addslashes($_FILES['file']['name']));
$item->archivo_contrato = preg_replace("/[^a-zA-Z0-9.]/", "", $item->archivo_contrato);
$item->archivo_contrato = str_replace(' ', '_', $item->archivo_contrato);
$item->size_archivo_contrato = $_FILES[ 'file' ][ 'size' ];
$item->estado_adjunto = 1;
$item->fecha_creacion = date("Y-m-d H:i:s");
$item->usuario_creacion = $_REQUEST['usuario_creacion'];

if ( !empty( $_FILES ) ) {
	
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $_REQUEST['upload_path']). DIRECTORY_SEPARATOR . $item->archivo_contrato;
	
    if(move_uploaded_file( $tempPath, $uploadPath )){
	
		echo json_encode(array( 'answer' => 'Transferecia de archivo completa', 'id' => $mv->createContratoAdjuntos($item)));
		
	}

} else {
	echo json_encode( array( 'answer' => 'Transferecia de archivo completa' ));
}
?>