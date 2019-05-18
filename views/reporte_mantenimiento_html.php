<?php

require_once('../database/OcService.php'); 
require_once('../database/SedesGet.php'); 

$settings = array();
$settings['start'] = 0;
$settings['length'] = 0;
$settings['draw'] = 0;
$settings['search'] = array();
$settings['action_type'] = "list";


$ordencCompraClass = new OcService(); 

$sedesClass = new SedesService(); 
$settings['recordsTotal'] = $sedesClass->total();

$objSedes = $sedesClass->getAllSedes($settings);
$dataSedes = $objSedes['data'];





?>
<table border="0" align="center" cellpadding="0" cellspacing="5">
  <tr>
    <td>N/O</td>
    <td>SEDES</td>
    <td>#O/S</td>
    
  </tr>
  <?php foreach($dataSedes as $value){ ?>
  <tr>
    <td><?php //print_r($value); ?></td>
    <td><?php print_r($value->nombre_sede); ?></td>
	<td>&nbsp;</td>
	<?php 
	
		$idsede = $value->idsedes;
		
		$objOC = $ordencCompraClass->getTotalMensualOrdenesCompraByIDSedes(9);
		$dataOrdenesCompra = $objOC['data'];
					
		foreach($dataOrdenesCompra as $value_mes){ ?>
        
    	<td><?php 	echo $value_mes->importe_total_oc;	?></td>
        
    <?php } ?>

  </tr>
  <?php } ?>
</table>
