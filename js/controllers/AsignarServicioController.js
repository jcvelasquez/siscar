/* Setup general page controller */
angular.module('MetronicApp').controller('AsignarServicioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		var h = {};
		
		if ($('#calendar').parents(".portlet").width() <= 720) {
			$('#calendar').addClass("mobile");
			h = {
				left: 'title, prev, next',
				center: '',
				right: 'month,agendaWeek,agendaDay'
			};
		} else {
			$('#calendar').removeClass("mobile");
			h = {
				left: 'title',
				center: '',
				right: 'prev,next,month,agendaWeek,agendaDay'
			};
		}

		$('#calendar').fullCalendar('destroy'); // destroy the calendar
		$('#calendar').fullCalendar({ //re-initialize the calendar
			header: h,
			defaultView: 'agendaWeek',
			aspectRatio: 1.5,   
			allDaySlot: false,
			//slotMinutes: 15,
			locale: 'es',
			timezone : 'America/Lima',
			selectable: false,
			contentHeight: 'auto',
			eventLimit: true, // allow "more" link when too many events
			events: {
				url: 'events/get-events.php',
				data: function () { 
					return {
						idvehiculo: $('#idvehiculos').val(),
					}
				},
				error: function() {
					//$('#script-warning').show();
					//console.log("error");
				}
			},
			businessHours: [{
				dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
				start: '05:00',
				end: '13:00'
			  }, {
				dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
				start: '14:00',
				end: '20:00'
			}],
			loading: function(bool) {
				$('#loading').toggle(bool);
			},
			selectHelper: true,
			eventRender: function(event, element) { 
				element.find('.fc-title').prepend("<b>Motivo: </b>").append("<br/><b>Vehiculo:</b> " + event.placa_vehiculo + " | <b>Area:</b> " + event.nombre_area + " | <b>Destino:</b> " + event.lugar_destino + " | <b>¿Asignado?: </b> " + event.es_asignado + " | <b>Chofer: </b> " + event.nombre_chofer); 
					
				//console.log(element);
			},
			eventClick: function(event) {
			  //	alert("event start " + moment(event.start).format('MM/DD/YYYY hh:mm a') + " event end " + moment(event.end).format('MM/DD/YYYY hh:mm:ss'));
				
				$modal_ver_evento.modal('show');
				
				$('#form_ver_servicio p[data-display="fecha_inicio"').html(event.fecha_inicio);
				$('#form_ver_servicio p[data-display="fecha_fin"').html(event.fecha_fin);
				$('#form_ver_servicio p[data-display="es_ida_vuelta"').html(event.es_ida_vuelta);
				$('#form_ver_servicio p[data-display="usuario_solicita"').html(event.usuario_solicita);
				$('#form_ver_servicio p[data-display="tipo_vehiculo"').html(event.tipo_vehiculo);
				$('#form_ver_servicio p[data-display="motivo_comision"').html(event.motivo_comision);
				$('#form_ver_servicio p[data-display="departamento"').html(event.departamento);
				$('#form_ver_servicio p[data-display="provincia"').html(event.provincia);
				$('#form_ver_servicio p[data-display="distrito"').html(event.distrito);
				$('#form_ver_servicio p[data-display="lugar_destino"').html(event.lugar_destino);
				$('#form_ver_servicio p[data-display="direccion_destino"').html(event.direccion_destino);
				$('#form_ver_servicio p[data-display="usuario_solicita"').html(event.nombres + ' '+ event.apellidos);
				$('#form_ver_servicio p[data-display="nombre_area"').html(event.nombre_area);
				
			}
			
		});
		
		initContent();
		
		
    });
}]);
