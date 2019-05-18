<?php

 
if(isset($_REQUEST['periodo_transparencia']) && !empty($_REQUEST['periodo_transparencia']) ){
		

/** Error reporting */
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('America/Lima');

if (PHP_SAPI == 'cli')
	die('This example should only be run from a Web Browser');

/** Include PHPExcel */
require_once 'Classes/PHPExcel.php';
require_once 'TransparenciaService.php';


$settings = array();
$settings['periodo_transparencia'] = $_REQUEST['periodo_transparencia'];

// Create new PHPExcel object
$objPHPExcel = new PHPExcel();

$transparenciaClass = new TransparenciaService(); 

$objTransparencia = $transparenciaClass->getMigravehiculo($settings);

// Set document properties
$objPHPExcel->getProperties()->setCreator("Sistema de Control Vehicular - SISCAR v1.0")
							 ->setTitle("Office 2007 XLSX Test Document")
							 ->setSubject("Office 2007 XLSX Test Document")
							 ->setDescription("Test document for Office 2007 XLSX, generated using PHP classes.")
							 ->setKeywords("office 2007 openxml php")
							 ->setCategory("Test result file");


// Add some data
$objPHPExcel->setActiveSheetIndex(0)
            ->setCellValue('A1', 'VC_ENTIDAD_RUC')
            ->setCellValue('B1', 'CH_VEHICULOS_ANNO')
            ->setCellValue('C1', 'CH_VEHICULOS_MES')
            ->setCellValue('D1', 'CH_VEHICULOS_CLASE')
			->setCellValue('E1', 'VC_VEHICULOS_CLASE')
			->setCellValue('F1', 'VC_VECHICULOS_CHOFER')
			->setCellValue('G1', 'VC_VECHICULOS_ASIGNADO_A')
			->setCellValue('H1', 'VC_CARGO_ACTIVIDAD_OTROS')
			->setCellValue('I1', 'VC_VEHICULOS_TIPO_COMBUSTIBLE')
			->setCellValue('J1', 'VC_VEHICULOS_RECORRIDO')
			->setCellValue('K1', 'DC_VEHICULOS_COSTO_COMBUSTIBLE')
			->setCellValue('L1', 'VC_VEHICULOS_SOAT_FEC_VEN')
			->setCellValue('M1', 'VC_VEHICULOS_PLACA')
			->setCellValue('N1', 'VC_VEHICULOS_OBSERVACIONES');
		
$fila = 2;

for($i=0; $i< count($objTransparencia); $i++){

	$objPHPExcel->setActiveSheetIndex(0)
				->setCellValue('A'.$fila, $objTransparencia[$i]->VC_ENTIDAD_RUC)
				->setCellValue('B'.$fila, $objTransparencia[$i]->CH_VEHICULOS_ANNO)
				->setCellValue('C'.$fila, $objTransparencia[$i]->CH_VEHICULOS_MES)
				->setCellValue('D'.$fila, $objTransparencia[$i]->CH_VEHICULOS_CLASE)
				->setCellValue('E'.$fila, $objTransparencia[$i]->VC_VEHICULOS_CLASE)
				->setCellValue('F'.$fila, $objTransparencia[$i]->VC_VECHICULOS_CHOFER)
				->setCellValue('G'.$fila, $objTransparencia[$i]->VC_VECHICULOS_ASIGNADO_A)
				->setCellValue('H'.$fila, $objTransparencia[$i]->VC_CARGO_ACTIVIDAD_OTROS)
				->setCellValue('I'.$fila, $objTransparencia[$i]->VC_VEHICULOS_TIPO_COMBUSTIBLE)
				->setCellValue('J'.$fila, $objTransparencia[$i]->VC_VEHICULOS_RECORRIDO)
				->setCellValue('K'.$fila, $objTransparencia[$i]->DC_VEHICULOS_COSTO_COMBUSTIBLE)
				->setCellValue('L'.$fila, $objTransparencia[$i]->VC_VEHICULOS_SOAT_FEC_VEN)
				->setCellValue('M'.$fila, $objTransparencia[$i]->VC_VEHICULOS_PLACA)
				->setCellValue('N'.$fila, $objTransparencia[$i]->VC_VEHICULOS_OBSERVACIONES);	
				
				$fila++;		

}

// Rename worksheet
$objPHPExcel->getActiveSheet()->setTitle('Reporte');
$objPHPExcel->setActiveSheetIndex(0);


// Redirect output to a client’s web browser (Excel5)
header('Content-Type: application/vnd.ms-excel');
header('Content-Disposition: attachment;filename="migravehiculo.xls"');
header('Cache-Control: max-age=0');
// If you're serving to IE 9, then the following may be needed
header('Cache-Control: max-age=1');

// If you're serving to IE over SSL, then the following may be needed
header ('Expires: Mon, 20 Jul 2017 05:00:00 GMT'); // Date in the past
header ('Last-Modified: '.gmdate('D, d M Y H:i:s').' GMT'); // always modified
header ('Cache-Control: cache, must-revalidate'); // HTTP/1.1
header ('Pragma: public'); // HTTP/1.0

$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
$objWriter->save('php://output');
exit;


} ?>