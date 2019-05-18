/* Setup general page controller */
angular.module('MetronicApp').controller('CerrarServicioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		App.initAjax();
		
		//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		$rootScope.settings.sesion = AppSiscar.getSesion();
		//FINALIZACION DE DATOS PARA TODAS LAS PAGINAS
if (typeof($rootScope.settings.sesion) != 'undefined'){
if($rootScope.settings.sesion.authorize == null || $rootScope.settings.sesion.authorize == false) $rootScope.$state.go('login');
}else{
$rootScope.$state.go('login');
}

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
		
		var idItem = $rootScope.$state.params.id; 
		var $modal_ver_evento = $('#ver_evento');
		
		/*
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();*/
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		$("#cerrar_solicitud").click(function() { 
			$modal_ver_evento.modal('hide');
		});

		/***************************************/
		/*       	CARGAR VEHICULO    	   */
		/***************************************/
		function initSelectVehiculos(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/VehiculosGet.php?action_type=vehiculo_x_sede&id=' + $rootScope.settings.sesion.idsede,
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idvehiculos").empty();
						$("#idvehiculos").append('<option value="all" selected="selected">TODOS LOS VEHICULOS</option>');
						
						for( var i = 0; i<len; i++){
							var idvehiculos = response.data[i]['idvehiculos'];
							var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'] ;
														
							$('#idvehiculos').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		}

		/***************************************/
		/*       	  CARGAR CHOFER    	       */
		/***************************************/
		function initSelectChoferes(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ChoferesGet.php?action_type=list',
					success:function(response){
						
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#chofer_idchofer").empty();
						$("#chofer_idchofer").append('<option value="">Seleccione un chofer</option>');
						
						for( var i = 0; i<len; i++){
							var idchofer = response.data[i]['idchofer'];
							var nombre_chofer = response.data[i]['apellidos_chofer'] + ', ' + response.data[i]['nombres_chofer'];
														
							$('#chofer_idchofer').append($('<option>', { value: idchofer, text: nombre_chofer })).selectpicker('refresh');
						}
						//FIN CARGA DE REGISTROS EN EL SELECT
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
		}
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
		
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initContent(){
									
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ServiciosSolicitudGet.php?action_type=edit&id='+idItem,
					success:function(data){
		
						//INICIO DE PERSONALIZACION DE CAMPOS
						$('#cabecera_servicio div[data-display="nombre_area"').html(data.nombre_area);
						$('#cabecera_servicio div[data-display="tipo_vehiculo"').html(data.tipo_vehiculo);
						$('#cabecera_servicio div[data-display="motivo_comision"').html(data.motivo_comision);
						$('#cabecera_servicio div[data-display="fecha_inicio"').html(data.fecha_inicio);
						$('#cabecera_servicio div[data-display="fecha_fin"').html(data.fecha_fin);
						$('#cabecera_servicio div[data-display="lugar_destino"').html(data.lugar_destino);
						$('#cabecera_servicio div[data-display="usuario_solicita"').html(data.nombres + ' ' + data.apellidos);
						
						
						if(data.es_asignado == 0)
							$('#cabecera_servicio span[data-display="es_asignado"').removeClass('label-success').addClass('label-danger').html("NO ASIGNADO");
						else
							$('#cabecera_servicio span[data-display="es_asignado"').html("ASIGNADO");
						//FIN DE PERSONALIZACION DE CAMPOS
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
				initSelectChoferes();
				initSelectVehiculos();	

			
		}
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
		
		
		$('#idvehiculos').on('change', function(){
			
			var idvehiculos = $(this).val();	
			
			$('#calendar').fullCalendar( 'refetchEvents' );
			
		
		});
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/	
		
		
		initContent();
		
		
    });
}]);
