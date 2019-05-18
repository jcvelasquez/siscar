<?php

require_once('VehiculosService.php'); 
$mv = new VehiculosService();  

$item = new stdClass;
$item->vehiculos_idvehiculos = $_REQUEST['vehiculos_idvehiculos'];
$item->archivo_vehiculo = trim(addslashes($_FILES['file']['name']));
$item->archivo_vehiculo = preg_replace("/[^a-zA-Z0-9.]/", "", $item->archivo_vehiculo);
$item->archivo_vehiculo = str_replace(' ', '_', $item->archivo_vehiculo);
$item->size_archivo_vehiculo = $_FILES[ 'file' ][ 'size' ];
$item->estado_adjunto = 1;
$item->fecha_creacion = date("Y-m-d H:i:s");
$item->usuario_creacion = $_REQUEST['usuario_creacion'];

if ( !empty( $_FILES ) ) {
	
    $tempPath = $_FILES[ 'file' ][ 'tmp_name' ];
	$uploadPath = realpath(dirname(__FILE__) . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . $_REQUEST['upload_path']). DIRECTORY_SEPARATOR . $item->archivo_vehiculo;
	
    if(move_uploaded_file( $tempPath, $uploadPath )){
	
		echo json_encode(array( 'answer' => 'Transferecia de archivo completa', 'id' => $mv->createVehiculosAdjuntos($item)));
		
	}

} else {
	echo json_encode( array( 'answer' => 'Transferecia de archivo completa' ));
}
?>