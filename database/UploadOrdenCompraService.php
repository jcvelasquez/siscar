<?php

require_once('OcService.php'); 
$mv = new OcService();  

$item = new stdClass;
$item->ordenes_compra_idordenes_compra = $_REQUEST['ordenes_compra_idordenes_compra'];
$item->archivo_oc = trim(addslashes($_FILES['file']['name']));
$item->archivo_oc = preg_replace("/[^a-zA-Z0-9.]/", "", $item->archivo_oc);
$item->archivo_oc = str_replace(' ', '_', $item->archivo_oc);
$item->size_archivo_oc = $_FILES[ 'file' ][ 'size' ];
$item->estado_adjunto = 1;
$item->fecha_creacion = date("Y-m-d H:i:s");
$item->usuario_creacion = $_REQUEST['usuario_creacion'];

if ( !empty( $_FILES ) ) {
	
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $_REQUEST['upload_path']). DIRECTORY_SEPARATOR . $item->archivo_oc;
	
    if(move_uploaded_file( $tempPath, $uploadPath )){
	
		echo json_encode(array( 'answer' => 'Transferecia de archivo completa', 'id' => $mv->createOrdenCompraAdjuntos($item)));
		
	}

} else {
	echo json_encode( array( 'answer' => 'Transferecia de archivo completa' ));
}
?>