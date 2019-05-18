<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', TRUE);
ini_set('display_startup_errors', TRUE);
date_default_timezone_set('America/Lima');
*/
if(isset($_REQUEST['desde_mantenimiento']) && !empty($_REQUEST['desde_mantenimiento']) && isset($_REQUEST['hasta_mantenimiento']) && !empty($_REQUEST['hasta_mantenimiento']) ){
	
		require_once('../database/OrdenTrabajoService.php'); 
		require_once('../database/SedesGet.php'); 
		
		$settings = array();
		$settings['start'] = 0;
		$settings['length'] = -1;
		$settings['draw'] = 0;
		$settings['search'] = array();
		$settings['action_type'] = "list";
		
		$ordenTrabajoClass = new OrdenTrabajoService(); 
		
		$sedesClass = new SedesService(); 
		$settings['recordsTotal'] = $sedesClass->total();
		
		$objSedes = $sedesClass->getAllSedes($settings);
		$dataSedes = $objSedes['data'];
		
		//FECHA Y HORA DE INICIO EN FORMATO TIMESTAMP
		$date_inicio = DateTime::createFromFormat('m/Y', $_REQUEST['desde_mantenimiento']);	
		$date_inicio = $date_inicio->format('Y-m');
		
		//FECHA Y HORA DE FIN EN FORMATO TIMESTAMP
		$date_fin = DateTime::createFromFormat('m/Y', $_REQUEST['hasta_mantenimiento']);				
		$date_fin = $date_fin->format('Y-m');
						
		$inicio    = new DateTime($date_inicio);
		$inicio->modify('first day of this month');
		
		$fin      = new DateTime($date_fin);
		$fin->modify('first day of next month');
		
		$interval = DateInterval::createFromDateString('1 month');
		$period   = new DatePeriod($inicio, $interval, $fin);
		
		$suma_total = array();
		
		$meses_label = array("01" => "ENE", "02"=> "FEB", "03"=> "MAR", "04"=> "ABR", "05"=> "MAY", "06"=> "JUN", "07"=> "JUL", "08"=> "AGO", "09"=> "SET", "10"=> "OCT", "11"=> "NOV", "12"=> "DIC");
		
		?>
		
		<center><h1>GASTOS DE MANTENIMIENTO DE SEDES - <?php echo $meses_label[$inicio->format("m")]."/".$inicio->format("Y"); ?> al <?php echo $meses_label[$fin->format("m")]."/".$fin->format("Y"); ?></h1></center>
		
		<table border="1" align="center" cellpadding="5" cellspacing="0">
		  <thead>
			  <tr>
				<td><strong>SEDES</strong></td>  
				<?php foreach ($period as $dt) { ?>
				<td><strong style="text-transform:uppercase;"><?php echo $meses_label[$dt->format("m")]."/".$dt->format("Y"); ?></strong></td>  
				<?php } ?>
			  </tr>
		  </thead>
		  <tbody>
			  <?php foreach($dataSedes as $value){ ?>
			  <tr>
					<td><?php print_r($value->nombre_sede); ?></td>
					<?php 	foreach ($period as $dt) { ?>
					<td> 
						<?php 
						
						$idsede = intval($value->idsedes);
						$mes    = intval($dt->format("m")); 
						$anno   = intval($dt->format("Y")); 
											
						$dataOrdenTrabajo = $ordenTrabajoClass->getTotalMensualOrdenesTrabajoByIDSedes($idsede, $mes, $anno);
												
						if($dataOrdenTrabajo[0]->importe_total_ot != NULL || $dataOrdenTrabajo[0]->importe_total_ot != 0) echo "S/".number_format($dataOrdenTrabajo[0]->importe_total_ot,2);
						
						$suma_total[$mes.$anno] += $dataOrdenTrabajo[0]->importe_total_ot;
						
						?>
					
					</td>  
					<?php } ?>    
			  </tr>
			  <?php } ?>
			  
		  <tbody>
		  <tfoot>
			  <tr>
					<td><strong>TOTAL</strong></td>
					<?php foreach ($period as $dt) { ?>
					<td> 
						<strong>                
						<?php 
						$mes    = intval($dt->format("m")); 
						$anno   = intval($dt->format("Y")); 
						
						if(isset($suma_total[$mes.$anno])) echo "S/". number_format($suma_total[$mes.$anno],2);
						
						?>
						</strong>            
					</td>  
					<?php } ?>    
			  </tr>
		  </tfoot>
		</table>


<?php } ?>