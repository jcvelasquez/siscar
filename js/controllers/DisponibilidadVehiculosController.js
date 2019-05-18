/* Setup general page controller */
angular.module('MetronicApp').controller('DisponibilidadVehiculosController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   

    	//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		App.initAjax();
		AppSiscar.initAjax();
		
		//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		$rootScope.settings.sesion = AppSiscar.getSesion();
		
		$rootScope.settings.configuracion = AppSiscar.getConfiguracion();
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
		
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
	
		$('#es_asignacion_manual').on('switchChange.bootstrapSwitch', function (event, state) {
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#es_asignacion_manual").is(':checked')) {
				
				$("#vehiculo_manual").attr('disabled', false).selectpicker('refresh');
				$("#chofer_manual").attr('disabled', false).selectpicker('refresh');
				
			}else{
				
				$("#vehiculo_manual").attr('disabled', true).selectpicker('refresh');
				$("#chofer_manual").attr('disabled', true).selectpicker('refresh');
				
			}
		});
		
		
		$('#vehiculo_manual').on('change', function(){
			
			var idVehiculo = $(this).val();	
			
			if(idVehiculo != ''){
				
				$('#vehiculos_idvehiculos').val(idVehiculo);
				
			}
			
			
		});	
		
		//AL SELECCIONAR UN CONTRATO
		$('#chofer_manual').on('change', function(){
			
			var idChofer = $(this).val();	
			
			if(idChofer != ''){
				
				$('#chofer_idchofer').val(idChofer);
				
			}
			
			
		});	
		
		/***************************************/
		/*       	CARGAR VEHICULO    	   */
		/***************************************/
		function initSelectVehiculos(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/VehiculosGet.php?action_type=vehiculo_x_sede&estado=1&id=' + $rootScope.settings.sesion.idsede,
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#vehiculo_manual").empty();
						$("#vehiculo_manual").append('<option value="" selected="selected">SELECCIONE</option>');
						
						for( var i = 0; i<len; i++){
							var idvehiculos = response.data[i]['idvehiculos'];
							var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'] ;
														
							$('#vehiculo_manual').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		}
		
		initSelectVehiculos();
		
		function setVehiculos(SelectedIndex){
			
			if(SelectedIndex != ""){
				$("#vehiculo_manual option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
				$('#vehiculo_manual').selectpicker('refresh');
			}
				
		}

		/***************************************/
		/*       	  CARGAR CHOFER    	       */
		/***************************************/
		function initSelectChoferes(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ChoferesGet.php?action_type=list&estado=1',
					success:function(response){
						
						var len = response.data.length;
						
						$("#chofer_manual").empty();
						$("#chofer_manual").append('<option value="" selected="selected">SELECCIONE</option>');
						
						for( var i = 0; i<len; i++){
							var idchofer = response.data[i]['idchofer'];
							var nombre_chofer = response.data[i]['apellidos_chofer'] + ', ' + response.data[i]['nombres_chofer'];
														
							$('#chofer_manual').append($('<option>', { value: idchofer, text: nombre_chofer })).selectpicker('refresh');
						}	
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
		}
		
		initSelectChoferes();
		
		function setChoferes(SelectedIndex){
			
			if(SelectedIndex != ""){
				$("#chofer_manual option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
				$('#chofer_manual').selectpicker('refresh');
			}
				
		}
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
		
		$('select.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	

		$('.date-picker').datepicker({
			autoclose: true,
			disabled : true,
			format: 'dd/mm/yyyy'
		});
				
		$('.timepicker-no-seconds').timepicker({
			autoclose: true,
			minuteStep: 30,
			defaultTime: false,
			showSeconds: false,
            showMeridian: false
		});
		
		$( document ).scroll(function(){
            $('#agregar_evento .date-picker').datepicker('place'); //#modal is the id of the modal
        });
		
		$( document ).scroll(function(){
			$('#agregar_evento .timepicker-no-seconds').timepicker('place'); //#modal is the id of the modal
		});
				
		// handle input group button click
		$('.timepicker').parent('.input-group').on('click', '.input-group-btn', function(e){
			e.preventDefault();
			$(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
		});	
		
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
		
		var $modal_agregar_evento = $('#agregar_evento');
		var $modal_ver_evento = $('#ver_evento');
		
		var eventID;
		var mostrarAlerta = false;
		var isOverlap = false;
		var existeEventoPorUsuario = false;
		
		$('#calendar').fullCalendar('destroy'); // destroy the calendar
		$('#calendar').fullCalendar({ //re-initialize the calendar
			header: h,
			aspectRatio: 1.3,  
			monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
			monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'],
			dayNames: ['Domingo','Lunes','Martes','Miércoles','Jueves','Viernes','Sábado'],
			dayNamesShort: ['Dom','Lun','Mar','Mié','Jue','Vie','Sáb'],
			unselectAuto: true,
			timezone:'local',
			firstDay : 1,
			locale : 'es',
			allDaySlot: false,
			weekends : false,
			defaultView: 'agendaWeek', // change default view with available options from http://arshaw.com/fullcalendar/docs/views/Available_Views/ 
			selectOverlap:true, //PARAMETRO QUE PERMITE CREAR EVENTO EN SIMULTANEO
			selectable: true,
			eventLimit: true, // allow "more" link when too many events
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
			eventRender: function(event, element) { 
				element.find('.fc-title').prepend("<b>Motivo: </b>").append("<br/><b>Vehiculo:</b> " + event.placa_vehiculo + " | <b>Area:</b> " + event.nombre_area + " | <b>Destino:</b> " + event.lugar_destino + " | <b>¿Asignado?: </b> " + event.es_asignado + " | <b>Chofer: </b> " + event.nombre_chofer + " | <b>Prioridad: </b> " + event.prioridad); 
			},
			select: function(inicio, fin) {
				
				var duracionEvento = moment.duration(fin.diff(inicio));
				var horasDuracion = duracionEvento.asHours();
				var horaMinimoAnticipacion = moment().add( AppSiscar.getParametro('MINIMO_HORAS_ANTICIPACION') ,'hours'); //PARAMETRO CONFIGURABLE, MINIMO DE HORAS DE ANTICIPACION
				
				var eventData = {
					title: "Creando servicio...",
					start: inicio,
					end: fin,
					placa_vehiculo : "NO ASIGNADO",
					nombre_area : "PENDIENTE",
					lugar_destino : "PENDIENTE",
					prioridad : "0",
					es_asignado : "NO",
					nombre_chofer : "PENDIENTE",
					className: "border-red-pink bg-red-pink bg-font-red-pink"
				};
					
				eventID = $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
				
				if(inicio.isBefore(horaMinimoAnticipacion) && $rootScope.settings.sesion.codrol == 'USU') { //PARAMETRO CONFIGURABLE, MINIMO DE HORAS DE ANTICIPACION 
					
					swal("ERROR DE SELECCION", "No es posible solicitar un servicio para una fecha pasada, y debe hacerlo al menos con " + AppSiscar.getParametro('MINIMO_HORAS_ANTICIPACION') + " horas de anticipacion.", "error");
					
					$('#calendar').fullCalendar('removeEvents', eventID[0]._id);
					$('#calendar').fullCalendar('unselect');
				
				}else if(horasDuracion < AppSiscar.getParametro('MINIMO_HORAS_DURACION')){  //PARAMETRO CONFIGURABLE, MINIMO DE HORAS DE DURACION 
				
					swal("ERROR DE SELECCION", "No es posible solicitar un servicio con duracion menor a " + AppSiscar.getParametro('MINIMO_HORAS_DURACION') + " hora(s).", "error");
					
					$('#calendar').fullCalendar('removeEvents', eventID[0]._id);
					$('#calendar').fullCalendar('unselect');
				
				}else if(horasDuracion >= AppSiscar.getParametro('MINIMO_HORAS_DURACION')){  //PARAMETRO CONFIGURABLE, MINIMO DE HORAS DE DURACION 
				
					//ACTIVO EL IDA Y VUELTA PORSIACASO NO SEA MAS DE 3 HORAS
					$('#es_ida_vuelta').bootstrapSwitch('disabled',false);
					
					if(horasDuracion >= AppSiscar.getParametro('MAXIMO_HORAS_DURACION')){   //PARAMETRO CONFIGURABLE, MAXIMO DE HORAS DE DURACION 
					
						toastIndex = toastCount++;
						toastr.options = {"positionClass": "toast-top-center"}
						var $toast = toastr["warning"]("Todos servicios con mayor duración a " + AppSiscar.getParametro('MAXIMO_HORAS_DURACION') + " horas, podrán registrarse solamente como servicios de IDA.","¡ATENCIÓN!");
						
						//DESACTIVO LA IDA Y VUELTA Y PONGO A IDA
						$('#es_ida_vuelta').bootstrapSwitch('state', false); // true || false
						$('#es_ida_vuelta').bootstrapSwitch('disabled',true);
						
					}
					
					$modal_agregar_evento.modal('show');
										
					$("#fecha_inicio").datepicker("setDate", moment(inicio).format("DD/MM/YYYY"));
					$("#fecha_inicio").datepicker("update");
					
					$("#fecha_fin").datepicker("setDate", moment(fin).format("DD/MM/YYYY"));
					$("#fecha_fin").datepicker("update");
					
					$('#hora_inicio').timepicker('setTime', moment(inicio).format("HH:mm"));	
					$('#hora_fin').timepicker('setTime', moment(fin).format("HH:mm"));
					
					$('#usuarios_idusuarios').val($rootScope.settings.sesion.idusuario);
					
					if(!isOverlap){
						
						//SELECCIONO UN VEHICULO ALEATORIO
						var randVehiculo = arRecursos[Math.floor(Math.random() * arRecursos.length)];
												
						//ACTUALIZO LA LLAVE DE LA SOLICITUD 
						$('#vehiculos_idvehiculos').val(randVehiculo['idvehiculos']);
						$('#chofer_idchofer').val(randVehiculo['idchofer']);
						$('#usuario_chofer').val(randVehiculo['usuario_chofer']);
						
						setVehiculos(randVehiculo['idvehiculos']);
						setChoferes(randVehiculo['idchofer']);
											
					}
					
				}
				
			},
			selectOverlap: function(event) {
				
				var eventos_usuario = getEventsByTime( event.start, event.end );
				var eventos = getEventsByTime( event.start, event.end );
				var recursosUsados = [];
				var recursosLibres = [];
				var recursosTodos = [];
												
				isOverlap = true;
								
				eventos_usuario.forEach(function(ev){ 
					
					if(ev.usuario_creacion == $rootScope.settings.sesion.usuario && $rootScope.settings.sesion.codrol == 'USU'){
						existeEventoPorUsuario = true;
					}
										
				});
				
				if(existeEventoPorUsuario){
				
					swal("ERROR", "Un usuario no puede hacer una solicitud para el mismo horario en que ya ha solicitado otro servicio. Utilice un rango de horas diferente.", "error");
					
					existeEventoPorUsuario = false;
							
				}else{
					
					eventos.forEach(function(ev){ 
						recursosUsados.push(ev.vehiculos_idvehiculos); 
					});
					
					arRecursos.forEach(function(re){ recursosTodos.push(re.idvehiculos); });
					
					recursosLibres = recursosTodos.diff(recursosUsados);
					
					var randIdVehiculo = recursosLibres[Math.floor(Math.random() * recursosLibres.length)];
															
					//ACTUALIZO LA LLAVE DE LA SOLICITUD CON UN ID ALEATORIO
					$('#vehiculos_idvehiculos').val(randIdVehiculo);
					
					setVehiculos(randIdVehiculo);
						
					for(var z=0; z < arRecursos.length ;z++){
						if(arRecursos[z]['idvehiculos'] == randIdVehiculo)
						{ 
							$('#chofer_idchofer').val(arRecursos[z]['idchofer']);
							$('#usuario_chofer').val(arRecursos[z]['usuario_chofer']);
							setChoferes(arRecursos[z]['idchofer']);
						}
					}
					
						
					if( eventos.length < arRecursos.length){
						
							/*
							if(!!event && event.prioridad < $rootScope.settings.sesion.prioridad && recursosLibres.length > 0){
								
								swal("ERROR", "No es posible registrar la solicitud debido a que existe otro servicio registrado en el rango seleccionado, tiene menos prioridad o no hay recursos.", "error");
								return false;
								
							}else if(!!event && event.prioridad == $rootScope.settings.sesion.prioridad && recursosLibres.length > 0){
								
								swal("ERROR", "No es posible registrar la solicitud debido a que existe otro servicio registrado en el rango seleccionado", "error");
								return false;
								
							}else{
								
								mostrarAlerta = true;
								return true;
								
							}*/
							
							return true;
								
					}else{
						
						//swal("ERROR", "No es posible registrar la solicitud para el rango seleccionado, ya que todos los vehiculos han sido asignados. ¿Desea generar un vale? ", "error");
						mostrarAlerta = true;
						return true;
						//return false;
						
					}
					/*
					if(event.ranges && event.ranges.length >0) {
						  
						 return (event.ranges.filter(function(range){
							  return (event.start.isBefore(range.end) &&  event.end.isAfter(range.start));
						  }).length) > 0;
						  
					}else { return !!event && $rootScope.settings.sesion.prioridad > event.prioridad; }	*/	
					
					
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
			eventClick: function(event) {
				
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
				$('#form_ver_servicio p[data-display="placa_vehiculo"').html(event.placa_vehiculo);
				$('#form_ver_servicio p[data-display="nombre_chofer"').html(event.nombre_chofer);
				$('#form_ver_servicio p[data-display="es_asignado"').html(event.es_asignado);
				$('#form_ver_servicio p[data-display="es_espera"').html(event.es_espera);
				$('#form_ver_servicio p[data-display="es_cancelado"').html(event.es_cancelado);
				$('#form_ver_servicio p[data-display="es_finalizado"').html(event.es_finalizado);
								
				//CARGO LOS COMISIONADOS				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: "database/ServiciosSolicitudGet.php?action_type=comisionados_x_servicios&id=" + event.idservicio_solicitud,
					success:function(response){
											
						var comisionadosDisplay = [];
						var arComisionados = response.data;
						var lenArComisionados = response.data.length;
																				
						for( var i = 0; i < lenArComisionados; i++){
							comisionadosDisplay.push('<b>' + arComisionados[i]['nombre_comisionado'] + '</b> | ' + arComisionados[i]['email']);
						}
						
						$('#form_ver_servicio p[data-display="comisionados"').html(comisionadosDisplay.join('<div class="margin-bottom-5">&nbsp;</div>'));	
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				

				
			}
			
		});
		
		
		Array.prototype.diff = function(a) {
			return this.filter(function(i) {return a.indexOf(i) < 0;});
		};


		function getEventsByTime( start, stop ) {
			
			var todaysEvents = $("#calendar").fullCalendar('clientEvents', function(event) {
		
			   return ( 
				   ( event.start >= start && event.end <= stop ) || 
				   ( start >= event.start && stop <= event.end)  || 
				   (start <= event.start && stop >= event.start) ||
				   (start >= event.start && start <= event.end)
			   );
			});

			return todaysEvents;
			
		}
	

		
		//MODAL DE AGREGAR EVENTO
		$($modal_agregar_evento).on('show', function(){
			
			initDepartamentos();
			initTiposVehiculo();	
			
			if(mostrarAlerta){
				
				$('#alerta_evento').removeClass('hide');
				$('#vehiculos_idvehiculos').val("");
				$('#chofer_idchofer').val("");
				
			}else{ 
				$('#alerta_evento').addClass('hide');
			}

		});
		
		$($modal_agregar_evento).on('hide', function(){
			
			$('#calendar').fullCalendar('removeEvents', eventID[0]._id);
			$('#calendar').fullCalendar('refetchEvents');
			
			mostrarAlerta = false;
			existeEventoPorUsuario = false;
			
			limpiarFormularioServicio();
			
		});
		
		
		$("#cancelar_solicitud").click(function() { 
			$modal_agregar_evento.modal('hide');	

		});
		
		
		$("#cerrar_solicitud").click(function() { 
			$modal_ver_evento.modal('hide');
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
						$("#idvehiculos").append('<option value="all" selected="selected">TODOS LOS RECURSOS</option>');
						
						for( var i = 0; i<len; i++){
							
							if(response.data[i]['nombre_chofer'] != null){
								
								var idvehiculos = response.data[i]['idvehiculos'];
								var nombre_vehiculo = '<strong>' + response.data[i]['marca_vehiculo'] + ' ' + response.data[i]['modelo_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'] + '</strong> | ' + response.data[i]['nombre_chofer'];
								var color_calendario = "<span class='label lable-sm' style='background:" + response.data[i]['color_calendario'] + ";'>&nbsp;&nbsp;&nbsp;</span>&nbsp;" + nombre_vehiculo;
								
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
		
		
		/***************************************/
		/*      CARGAR SELECT DEPARTAMENTOS	   */
		/***************************************/		
		function initDepartamentos(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/UbigeoGet.php?action_type=departamentos',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#departamento").empty();
						$("#departamento").append('<option value="">Seleccione un departamento</option>');
						
						for( var i = 0; i<len; i++){
							var departamento = response.data[i]['departamento'];
							$('#departamento').append($('<option>', { value: departamento, text: departamento })).selectpicker('refresh');
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}
		
		
		/***************************************/
		/*      CARGAR SELECT DEPARTAMENTOS	   */
		/***************************************/		
		function initProvincias(departamento){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/UbigeoGet.php?action_type=provincias_x_departamento&departamento=' + departamento,
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#provincia").empty();
						$("#provincia").append('<option value="">Seleccione una provincia</option>');
						
						for( var i = 0; i<len; i++){
							var provincia = response.data[i]['provincia'];
							$('#provincia').append($('<option>', { value: provincia, text: provincia })).selectpicker('refresh');
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}
		
		
		/*****************************************/
		/*      CARGAR SELECT DEPARTAMENTOS	     */
		/*****************************************/		
		function initDistritos(provincia){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/UbigeoGet.php?action_type=distritos_x_provincia&provincia=' + provincia,
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#distrito").empty();
						$("#distrito").append('<option value="">Seleccione una distrito</option>');
						
						for( var i = 0; i<len; i++){
							var idubigeo = response.data[i]['idubigeo'];
							var distrito = response.data[i]['distrito'];
							$('#distrito').append($('<option>', { value: idubigeo, text: distrito })).selectpicker('refresh');
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}
		
		/***************************************/
		/*       	  CARGAR  USUARIOS         */
		/***************************************/
		var arUsuarios = Array();
		
		function initSelectUsuarios(item_repeater){
			
			var selUsu = item_repeater.find('select.comisionado');

			selUsu.selectpicker({
				iconBase: 'fa',
				tickIcon: 'fa-check'
			});	
				
			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/UsuariosGet.php?action_type=list',
				success:function(response){
					
					var len = response.data.length;
										
					$(selUsu).empty();
					$(selUsu).append('<option value="">Seleccione un usuario</option>');
					
					for( var i = 0; i<len; i++){
						var idusuarios = response.data[i]['idusuarios'];
						var nombre_completo = response.data[i]['nombres'] + ' ' + response.data[i]['apellidos'] + ' | ' + response.data[i]['email'];
						arUsuarios[i] = response.data[i];
													
						$(selUsu).append($('<option>', { value: idusuarios, text: nombre_completo })).selectpicker('refresh');
					}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		/***************************************/
		/*      CARGAR SELECT TIPO VEHICULO    */
		/***************************************/		
		function initTiposVehiculo(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TipoVehiculoGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idtipos_vehiculo").empty();
						$("#idtipos_vehiculo").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipos_vehiculo = response.data[i]['idtipos_vehiculo'];
							var tipo_vehiculo = response.data[i]['tipo_vehiculo'];
							$('#idtipos_vehiculo').append($('<option>', { value: idtipos_vehiculo, text: tipo_vehiculo })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtipos_vehiculo option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtipos_vehiculo').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}	
		
		
		/******************************************/
		/*      AL SELECCIONAR UN DEPARTAMENTO    */
		/******************************************/	
		$('#departamento').on('change', function(){
			
			var departamento = $(this).val();	
			if(departamento != "") initProvincias(departamento); 

		});	
		
		
		$('#provincia').on('change', function(){
			
			var provincia = $(this).val();	
			if(provincia != "") initDistritos(provincia); 

		});		
		
		

		
		var form = $('#form_solicitar_servicio');
		var error = $('.alert-danger', form);
		var success = $('.alert-success', form);

		form.validate({
			doNotHideMessage: true, //this option enables to show the error/success messages on tab switch.
			errorElement: 'span', //default input error message container
			errorClass: 'help-block help-block-error', // default input error message class
			focusInvalid: false, // do not focus the last invalid input
			rules: {
				//FECHAS
				fecha_inicio: {
					required: true
				},
				fecha_fin: {
					required: true
				},
				hora_inicio: {
					required: true
				},
				hora_fin: {
					required: true,
				},
				//TIPO DE SERVICIO
				usuarios_idusuarios: {
					required: true
				},
				idtipos_vehiculo: {
					required: true
				},
				motivo_comision: {
					required: true
				},
				vehiculo_manual: {
					required: function(element) {
						if($("#es_asignacion_manual").is(':checked'))
							return true;
						else
							return false;
					}
				},
				chofer_manual: {
					required: function(element) {
						if($("#es_asignacion_manual").is(':checked'))
							return true;
						else
							return false;
					}
				},
				//UBICACION
				departamento: {
					required: true
				},
				provincia: {
					required: true
				},
				distrito: {
					required: true
				},
				lugar_destino: {
					required: true
				},
				direccion_destino: {
					required: true
				}
			},

			messages: { // custom messages for radio buttons and checkboxes
				/*'payment[]': {
					required: "Please select at least one option",
					minlength: jQuery.validator.format("Please select at least one option")
				}*/
			},
			errorPlacement: function (error, element) { // render error placement for each input type
				/*if (element.attr("name") == "gender") { // for uniform radio buttons, insert the after the given container
					error.insertAfter("#form_gender_error");
				} else if (element.attr("name") == "payment[]") { // for uniform checkboxes, insert the after the given container
					error.insertAfter("#form_payment_error");
				} else {
					error.insertAfter(element); // for other inputs, just perform default behavior
				}*/
			},
			invalidHandler: function (event, validator) { //display error alert on form submit   
				success.hide();
				error.show();
				//App.scrollTo(error, -200);
			},
			highlight: function (element) { // hightlight error inputs
				$(element).closest('.form-group').removeClass('has-success').addClass('has-error'); // set error class to the control group
			},
			unhighlight: function (element) { // revert the change done by hightlight
				$(element).closest('.form-group').removeClass('has-error'); // set error class to the control group
			},
			success: function (label) {
				if (label.attr("for") == "gender" || label.attr("for") == "payment[]") { // for checkboxes and radio buttons, no need to show OK icon
					label.closest('.form-group').removeClass('has-error').addClass('has-success');
					label.remove(); // remove error label here
				} else { // display success icon for other inputs
					label
					.addClass('valid') // mark the current input as valid and display OK icon
					.closest('.form-group').removeClass('has-error').addClass('has-success'); // set success class to the control group
				}
			},
			submitHandler: function (form) {
				success.show();
				error.hide();
				//form[0].submit();
				//add here some ajax code to submit your form or just call form.submit() if you want to submit the form without ajax
				
				
			}

		});
		
		
		
		var limpiarFormularioServicio = function() {
			
			handleTitle(null, $("ul.nav.steps"), 0);
			
			$('#form_solicitar_servicio')[0].reset();
			
			$('#agregar_evento a[href="#tab1"]').tab('show');
			
			$("#provincia").empty();
			$("#provincia").append('<option value="">Seleccione una provincia</option>');
			$("#provincia").selectpicker('refresh');
			
			$("#distrito").empty();
			$("#distrito").append('<option value="">Seleccione una provincia</option>');
			$("#distrito").selectpicker('refresh');
			
			$('#vehiculos_idvehiculos').val("");
			$('#chofer_idchofer').val("");
			
			
		}
		

		var displayConfirm = function() {
			
			$('#tab5 .form-control-static', form).each(function(){
				
				var input = $('[name="'+$(this).attr("data-display")+'"]', form);
				
				if (input.is(":radio")) {
					
					input = $('[name="'+$(this).attr("data-display")+'"]:checked', form);
				}
				
				if (input.is(":text") || input.is("textarea")) {
					
					$(this).html(input.val());
					
				} else if (input.is("select")) {
					
					$(this).html(input.find('option:selected').text());
					
				} else if (input.is(":radio") && input.is(":checked")) {
					
					$(this).html(input.attr("data-title"));
				
				} else if ($(this).attr("data-display") == 'es_ida_vuelta') {
					
					var es_ida_vuelta = (input.is(":checked"))? "SI" : "NO";
					
					$(this).html(es_ida_vuelta);
					
				} else if ($(this).attr("data-display") == 'nombre_area') {
					
					$(this).html($rootScope.settings.sesion.area);
				
				} else if ($(this).attr("data-display") == 'usuario_solicita') {
					
					$(this).html($rootScope.settings.sesion.nombres + ' ' + $rootScope.settings.sesion.apellidos);
				
				} else if ($(this).attr("data-display") == 'tipo_vehiculo') {
					
					$(this).html($('#idtipos_vehiculo').find("option:selected").text())

				} else if ($(this).attr("data-display") == 'placa_vehiculo') {
					
					$(this).html($('#vehiculo_manual').find("option:selected").text())
				
				} else if ($(this).attr("data-display") == 'nombre_chofer') {
					
					$(this).html($('#chofer_manual').find("option:selected").text())
						
				} else if ($(this).attr("data-display") == 'usuarios[]') {
					
					var usuariosDisplay = [];
					var emailDisplay = [];
					var repeaterUsuarios = $('.mt-repeater').repeaterVal();
					var lenArUsuarios = arUsuarios.length;
					
					
					//ACTUALIZO LAS VISTAS EN EL DISPLAY														
					$.each(repeaterUsuarios.usuarios, function (index , value) {
						for( var i = 0; i<lenArUsuarios; i++){
							if(arUsuarios[i]['idusuarios'] == value.usuarios_idusuarios){
								usuariosDisplay.push('<b>' + arUsuarios[i]['nombres'] + ' ' +  arUsuarios[i]['apellidos'] + '</b> | ' + arUsuarios[i]['email']);
								emailDisplay.push(arUsuarios[i]['email']);
							}
						}
					});
					
					$(this).html(usuariosDisplay.join('<div class="margin-bottom-5">&nbsp;</div>'));
					
					$('#usuarios_email').html(emailDisplay.join(','));

					
				}
				
			});
			
			
			
			
		}

		var handleTitle = function(tab, navigation, index) {
			
			var total = navigation.find('li').length;
			var current = index + 1;
			// set wizard title
			$('.step-title', $('#agregar_evento')).text('Step ' + (index + 1) + ' of ' + total);
			// set done steps
			jQuery('li', $('#agregar_evento')).removeClass("done");
			
			var li_list = navigation.find('li');
			for (var i = 0; i < index; i++) {
				jQuery(li_list[i]).addClass("done");
			}

			if (current == 1) {
				$('#agregar_evento').find('.button-previous').hide();
			} else {
				$('#agregar_evento').find('.button-previous').show();
			}

			if (current >= total) {
				
				$('#agregar_evento').find('.button-next').hide();
				
				if(mostrarAlerta){
					
					$('#agregar_evento').find('.button-submit').hide();
					//$('#agregar_evento').find('.button-submit-espera').show();
					$('#agregar_evento').find('.button-submit-vale').removeClass('hide').css('display', 'inline');
					
				}else{
					
					$('#agregar_evento').find('.button-submit').show();
					//$('#agregar_evento').find('.button-submit-espera').hide();
					$('#agregar_evento').find('.button-submit-vale').hide();
					
				}
				
				displayConfirm();
				
			} else {
				$('#agregar_evento').find('.button-next').show();
				$('#agregar_evento').find('.button-submit').hide();
			}

		}



		
		$('#agregar_evento').bootstrapWizard({
			'nextSelector': '.button-next',
			'previousSelector': '.button-previous',
			
				onTabClick: function (tab, navigation, index, clickedIndex) {
					return false;
					
					success.hide();
					error.hide();
					
					if (form.valid() == false) {
						return false;
					}
					
					handleTitle(tab, navigation, clickedIndex);
				},
				onNext: function (tab, navigation, index) {
					success.hide();
					error.hide();
	
					if (form.valid() == false) {
						return false;
					}
	
					handleTitle(tab, navigation, index);
				},
				onPrevious: function (tab, navigation, index) {
					success.hide();
					error.hide();
	
					handleTitle(tab, navigation, index);
				},
				onTabShow: function (tab, navigation, index) {
					var total = navigation.find('li').length;
					var current = index + 1;
					var $percent = (current / total) * 100;
					$('#agregar_evento').find('.progress-bar').css({
						width: $percent + '%'
					});
				}
		});

		$('#agregar_evento').find('.button-previous').hide();
		
		
		/************************************************************/
		/*            CONFIRMAR SOLICITUD DE SERVICIO NORMAL        */
		/************************************************************/		
		$('#agregar_evento .button-submit').click(function () {

				var forsolicitud = $("#form_solicitar_servicio").serialize()+'&action_type=create';
				title = "CONFIRMACION"
				msg = "La solicitud del servicio ha sido registrada.";
				
																															
				$.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/ServiciosSolicitudGet.php',
						data: forsolicitud,
						success:function(data){
							
							$modal_agregar_evento.modal('hide');
								
							toastIndex = toastCount++;
							toastr.options = {"positionClass": "toast-top-right"}
							var $toast = toastr["success"](msg,title); 
							
							$rootScope.$state.go('private.listar_servicios');
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
				});
				
		}).hide();
		/*****************************************************/
		/*        FIN CONFIRMAR SOLICITUD DE SERVICIO        */
		/*****************************************************/	
		
		
		/****************************************************************/
		/*      CONFIRMAR SOLICITUD DE SERVICIO EN LISTA DE ESPERA      */
		/****************************************************************/		
		$('#agregar_evento .button-submit-espera').click(function () {

				var forsolicitud = $("#form_solicitar_servicio").serialize()+'&action_type=create&es_espera=1';
				title = "CONFIRMACION DE SOLICITUD"
				msg = "La solicitud del servicio ha sido registrada y está en lista de espera.";
																											
				$.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/ServiciosSolicitudGet.php',
						data: forsolicitud,
						success:function(data){
							
							$modal_agregar_evento.modal('hide');
								
							toastIndex = toastCount++;
							toastr.options = {"positionClass": "toast-top-right"}
							var $toast = toastr["success"](msg,title); 
							
							$rootScope.$state.go('private.listar_servicios');
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
				});
				
		}).hide();
		/*****************************************************/
		/*        FIN CONFIRMAR SOLICITUD DE SERVICIO        */
		/*****************************************************/	
		
		
		
		
		/****************************************************************/
		/*     		 CONFIRMAR SOLICITUD DE SERVICIO CON VALE     		*/
		/****************************************************************/		
		$('#agregar_evento .button-submit-vale').click(function () {

				var forsolicitud = $("#form_solicitar_servicio").serialize()+'&action_type=create&es_vale=1';
				title = "CONFIRMACION DE SOLICITUD"
				msg = "La solicitud del servicio ha sido registrada y se procederá a generar el vale.";
																											
				$.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/ServiciosSolicitudGet.php',
						data: forsolicitud,
						success:function(data){
														
							$modal_agregar_evento.modal('hide');
								
							toastIndex = toastCount++;
							toastr.options = {"positionClass": "toast-top-right"}
							var $toast = toastr["success"](msg,title); 
														
							$rootScope.$state.go('private.registrar_vale', {"id" : data.idservicio_solicitud });
							
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
				});
				
		}).hide();
		/*****************************************************/
		/*        FIN CONFIRMAR SOLICITUD DE SERVICIO        */
		/*****************************************************/	
			
		
		var sel;
				
		$('.mt-repeater').each(function(){
			
			 sel = $(this).repeater({
				
						show: function () {
							initSelectUsuarios( $(this) );
							$(this).slideDown();
						},
						hide: function (deleteElement) {
							$(this).slideUp(deleteElement);
						},
						isFirstItemUndeletable: true 
						}).find('select').addClass('dinamic-repeater').selectpicker({iconBase: 'fa',tickIcon: 'fa-check'});	
	
		});
		
		
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/UsuariosGet.php?action_type=list',
			success:function(response){
				
				var len = response.data.length;
													
				sel.empty();
				sel.append('<option value="">Seleccione un usuario</option>');
				
				for( var i = 0; i<len; i++){
					var idusuarios = response.data[i]['idusuarios'];
					var nombre_completo = response.data[i]['nombres'] + ' ' + response.data[i]['apellidos'] + ' | ' + response.data[i]['email'];
					arUsuarios[i] = response.data[i];							
					sel.append($('<option>', { value: idusuarios, text: nombre_completo })).selectpicker('refresh');
				}

			},
			error: function(xhr) { 
				console.log(xhr.statusText + xhr.responseText);
			}
		});
		
					
			
    });
}]);
