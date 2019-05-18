/* Setup general page controller */
angular.module('MetronicApp').controller('ListarServiciosChoferController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		
		$('select.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		/* print function */
		
		
		$( "#printPage" ).click(function() {
			window.print();
		});
		
		$('#calendar').fullCalendar('destroy'); // destroy the calendar
		$('#calendar').fullCalendar({
			header: {
				left: 'prev, next',
				center: 'title',
				right: 'listDay,listWeek'
			},
			views: {
				listDay: { buttonText: 'Diario' },
				listWeek: { buttonText: 'Semanal' }
			},
			locale: 'es',
			defaultView: 'listWeek',
			firstDay : 1,
			aspectRatio: 2,  
			monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
			dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'], 
			navLinks: true, // can click day/week names to navigate views
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			eventRender: function(event, element) { 
			
				var prioridad = (event.prioridad == null)? "NO ESPECIFICA" : event.prioridad;
				
				element.find('.fc-list-item-title').prepend("<b>Motivo: </b>").append("<br/><b>Vehiculo:</b> " + event.placa_vehiculo + " | <b>Area:</b> " + event.nombre_area + " | <b>Destino:</b> " + event.lugar_destino + " | <b>¿Asignado?: </b> " + event.es_asignado + " | <b>Chofer: </b> " + event.nombre_chofer + " | <b>Prioridad: </b> " + prioridad); 
				
				$(element).each(function () { 
					$(this).attr('date-num', event.start.format('YYYY-MM-DD')); 
				});
			
			
			},
			events: {
				url: 'events/get-events.php',
				data: function () { 
					return {
						idvehiculo: $('#idvehiculos').val(),
					}
				},
				error: function() {
					console.log("error en la carga de eventos");
				}
			},
			eventAfterAllRender: function(view){
				
				
				for( cDay = view.start.clone(); cDay.isBefore(view.end) ; cDay.add(1, 'day') ){
					
					var dateNum = cDay.format('YYYY-MM-DD');
										
					var dayEl = $('.fc-list-heading[data-date="' + dateNum + '"]');
					
					var eventCount = $('.fc-list-item[date-num="' + dateNum + '"]').length;
					
					if(eventCount){
												
						var html = '&nbsp;&nbsp;<span class="badge badge-success"><center><i style="font-size:16px; font-weight:bold; padding:0 4px 0 0 !important;">' + eventCount + '</i> eventos </center></span>';
	
						dayEl.find('.fc-list-heading-main').append(html);
						
						
						
	
					}
				}
			}
		});
		
		
		
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
		
		$('#idvehiculos').on('change', function(){
			
			var idvehiculos = $(this).val();	
			
			$('#calendar').fullCalendar( 'refetchEvents' );
			
		
		});
		
		cargarRecursos();
		
		
		/***************************************/
		//CARGAR RECURSOS
		/***************************************/		
		var arRecursos = [];
		
		function cargarRecursos(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/VehiculosGet.php?action_type=vehiculo_chofer_x_sede&id=' + $rootScope.settings.sesion.idsede,
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idvehiculos").empty();
						$("#idvehiculos").append('<option value="all" selected="selected">TODOS LOS CHOFERES</option>');
						
						for( var i = 0; i<len; i++){
							
							if(response.data[i]['nombre_chofer'] != null){
								
								var idvehiculos = response.data[i]['idvehiculos'];
								var nombre_vehiculo = '<strong>' + response.data[i]['nombre_chofer'] + '</strong> | ' + response.data[i]['marca_vehiculo'] + ' ' + response.data[i]['modelo_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'];
								var color_calendario = "<span class='label lable-sm' style='background:" + response.data[i]['color_calendario'] + ";'>&nbsp;&nbsp;&nbsp;</span>&nbsp;&nbsp;" + nombre_vehiculo;
								
								arRecursos.push(response.data[i]);
								
								$('#idvehiculos').append($('<option data-content="' + color_calendario + '" value="' + idvehiculos + '">')).selectpicker('refresh');
								
							}
						}
								
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}


		
					
							
		
			
    });
}]);
