<?php

class TransparenciaService {
	
	var $connection;
	
	public function __construct() {
		include "connect.php";
	    $this->connection = $db;
		$this->throwExceptionOnError($this->connection);
	}

	public function getMigravehiculo( $settings = array() ) {
		
					
			$periodo_transparencia = DateTime::createFromFormat('m/Y', $settings['periodo_transparencia']);
			$periodo_mes = $periodo_transparencia->format('m');
			$periodo_anno = $periodo_transparencia->format('Y');
			/*
			 $query = "SELECT '20514859559' as VC_ENTIDAD_RUC, 
							  YEAR(seso.fecha_inicio) as CH_VEHICULOS_ANNO,
							  MONTH(seso.fecha_inicio) as CH_VEHICULOS_MES,						  
							  vehi.clase_transparencia as CH_VEHICULOS_CLASE,
							  tive.tipo_vehiculo as VC_VEHICULOS_CLASE,
							  CONCAT(cho.nombres_chofer, ' ', cho.apellidos_chofer) as VC_VECHICULOS_CHOFER,
							  CONCAT(usu.nombres, ' ', usu.apellidos) as VC_VECHICULOS_ASIGNADO_A,
							  seso.motivo_comision as VC_CARGO_ACTIVIDAD_OTROS,
							  tico.tipo_combustible as VC_VEHICULOS_TIPO_COMBUSTIBLE,
							  (SELECT kilometraje_fin - kilometraje_inicio FROM servicios_cierre_chofer WHERE idservicio_solicitud = seso.idservicio_solicitud) as VC_VEHICULOS_RECORRIDO,
							  '' as DC_VEHICULOS_COSTO_COMBUSTIBLE,
							  DATE_FORMAT(vehi.vencimiento_soat, '%d/%m/%Y') as VC_VEHICULOS_SOAT_FEC_VEN,
							  vehi.placa_vehiculo as VC_VEHICULOS_PLACA,
							  '' as VC_VEHICULOS_OBSERVACIONES
						 FROM servicios_solicitud seso,
							  vehiculos vehi,
							  tipo_vehiculo tive,
							  chofer cho,
							  usuarios usu,
							  tipo_combustible tico
					    WHERE seso.vehiculos_idvehiculos = vehi.idvehiculos
					   	  AND vehi.idtipos_vehiculo = tive.idtipos_vehiculo
						  AND seso.chofer_idchofer = cho.idchofer
						  AND seso.usuarios_idusuarios = usu.idusuarios
						  AND vehi.idtipo_combustible = tico.idtipo_combustible
						  AND MONTH(seso.fecha_inicio) = $periodo";
			*/	
			
			$query = "SELECT '20514859559' as VC_ENTIDAD_RUC, 
							  YEAR(seso.fecha_inicio) as CH_VEHICULOS_ANNO,
							  MONTH(seso.fecha_inicio) as CH_VEHICULOS_MES,						  
							  vehi.clase_transparencia as CH_VEHICULOS_CLASE,
							  tive.tipo_vehiculo as VC_VEHICULOS_CLASE,
							  'POOL' as VC_VECHICULOS_CHOFER,
							  'POOL' as VC_VECHICULOS_ASIGNADO_A,
							  'TRASLADO DE PERSONAL' as VC_CARGO_ACTIVIDAD_OTROS,
							  tico.tipo_combustible as VC_VEHICULOS_TIPO_COMBUSTIBLE,

								(SELECT SUM(scc.kilometraje_fin - scc.kilometraje_inicio)
								FROM servicios_cierre_chofer scc, 
									 servicios_solicitud ss,
									 vehiculos ve
								WHERE ss.idservicio_solicitud = scc.idservicio_solicitud
								AND ve.idvehiculos = ss.vehiculos_idvehiculos
								AND ve.placa_vehiculo = vehi.placa_vehiculo GROUP BY ve.placa_vehiculo) as VC_VEHICULOS_RECORRIDO,
	
								(SELECT SUM(tico.importe_total_combustible) 
								FROM tickets_combustible tico, vehiculos ve 
								WHERE tico.idvehiculos = ve.idvehiculos 
								AND MONTH(tico.fecha_ticket) = $periodo_mes 
								AND YEAR(tico.fecha_ticket) = $periodo_anno 
								AND ve.placa_vehiculo = vehi.placa_vehiculo 
								GROUP BY ve.placa_vehiculo) as DC_VEHICULOS_COSTO_COMBUSTIBLE,

							  DATE_FORMAT(vehi.vencimiento_soat, '%d/%m/%Y') as VC_VEHICULOS_SOAT_FEC_VEN,
							  vehi.placa_vehiculo as VC_VEHICULOS_PLACA,
							  '' as VC_VEHICULOS_OBSERVACIONES
						 FROM servicios_solicitud seso,
							  vehiculos vehi,
							  tipo_vehiculo tive,
							  chofer cho,
							  usuarios usu,
							  tipo_combustible tico
					    WHERE seso.vehiculos_idvehiculos = vehi.idvehiculos
					   	  AND vehi.idtipos_vehiculo = tive.idtipos_vehiculo
						  AND seso.chofer_idchofer = cho.idchofer
						  AND seso.usuarios_idusuarios = usu.idusuarios
						  AND vehi.idtipo_combustible = tico.idtipo_combustible
						  AND MONTH(seso.fecha_inicio) = $periodo_mes
						  AND YEAR(seso.fecha_inicio) = $periodo_anno
						  GROUP BY vehi.placa_vehiculo";		  
			
			$stmt = mysqli_prepare($this->connection, $query );		
			$this->throwExceptionOnError();
								
			mysqli_stmt_execute($stmt);
			$this->throwExceptionOnError();
						
			$records = array();
			
			mysqli_stmt_bind_result($stmt, $row->VC_ENTIDAD_RUC, $row->CH_VEHICULOS_ANNO, $row->CH_VEHICULOS_MES, $row->CH_VEHICULOS_CLASE, $row->VC_VEHICULOS_CLASE, $row->VC_VECHICULOS_CHOFER, $row->VC_VECHICULOS_ASIGNADO_A, $row->VC_CARGO_ACTIVIDAD_OTROS, $row->VC_VEHICULOS_TIPO_COMBUSTIBLE, $row->VC_VEHICULOS_RECORRIDO, $row->DC_VEHICULOS_COSTO_COMBUSTIBLE, $row->VC_VEHICULOS_SOAT_FEC_VEN, $row->VC_VEHICULOS_PLACA, $row->VC_VEHICULOS_OBSERVACIONES);
			
			while (mysqli_stmt_fetch($stmt)) {
							  
				  $records[] = $row;
				  
				  $row = new stdClass();
				  mysqli_stmt_bind_result($stmt, $row->VC_ENTIDAD_RUC, $row->CH_VEHICULOS_ANNO, $row->CH_VEHICULOS_MES, $row->CH_VEHICULOS_CLASE, $row->VC_VEHICULOS_CLASE, $row->VC_VECHICULOS_CHOFER, $row->VC_VECHICULOS_ASIGNADO_A, $row->VC_CARGO_ACTIVIDAD_OTROS, $row->VC_VEHICULOS_TIPO_COMBUSTIBLE, $row->VC_VEHICULOS_RECORRIDO, $row->DC_VEHICULOS_COSTO_COMBUSTIBLE, $row->VC_VEHICULOS_SOAT_FEC_VEN, $row->VC_VEHICULOS_PLACA, $row->VC_VEHICULOS_OBSERVACIONES);
				  
			}
			
			mysqli_stmt_free_result($stmt);
			mysqli_close($this->connection);
		
			return $records;
		
	}


	private function throwExceptionOnError($link = null) {
		if($link == null) {
			$link = $this->connection;
		}
		if(mysqli_error($link)) {
			return array("status" => "error", "code" => (string)mysqli_errno($link) , "message" => mysqli_error($link) );
		}else{
			return array("status" => "success" , "code" => "200" , "message"=> "");
		}	
	}
	
}

?>
