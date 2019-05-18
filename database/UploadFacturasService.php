<?php

require_once('FacturasService.php'); 
$mv = new FacturasService();  

$item = new stdClass;
$item->facturas_idfacturas = $_REQUEST['facturas_idfacturas'];
$item->archivo_factura = trim(addslashes($_FILES['file']['name']));
$item->archivo_factura = preg_replace("/[^a-zA-Z0-9.]/", "", $item->archivo_factura);
$item->archivo_factura = str_replace(' ', '_', $item->archivo_factura);
$item->size_archivo_factura = $_FILES[ 'file' ][ 'size' ];
$item->estado_adjunto = 1;
$item->fecha_creacion = date("Y-m-d H:i:s");
$item->usuario_creacion = $_REQUEST['usuario_creacion'];

if ( !empty( $_FILES ) ) {
	
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $_REQUEST['upload_path']). DIRECTORY_SEPARATOR . $item->archivo_factura;
	
    if(move_uploaded_file( $tempPath, $uploadPath )){
		echo json_encode(array( 'answer' => 'Transferecia de archivo completa', 'id' => $mv->createFacturaAdjuntos($item)));
	}

} else {
	echo json_encode( array( 'answer' => 'Transferecia de archivo completa' ));
}
?>