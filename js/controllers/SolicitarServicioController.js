/* Setup general page controller */
angular.module('MetronicApp').controller('SolicitarServicioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	App.initAjax();

    	// set default layout mode
    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
		
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
	
		$('.bs-select').selectpicker({
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
		

		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();

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
		
		
		var $modal = $('#agregar_evento');
		var eventID;
		
		$('#calendar').fullCalendar('destroy'); // destroy the calendar
		$('#calendar').fullCalendar({ //re-initialize the calendar
			header: h,
			firstDay : 1,
			weekends : false,
			defaultView: 'agendaWeek', // change default view with available options from http://arshaw.com/fullcalendar/docs/views/Available_Views/ 
			slotMinutes: 15,
			selectOverlap:true, //PARAMETRO QUE PERMITE CREAR EVENTO EN SIMULTANEO
			selectable: true,
			eventLimit: true, // allow "more" link when too many events
			//timeFormat: 'H(:mm)', // uppercase H for 24-hour clock
			events: {
				url: 'php/get-events.php',
				error: function() {
					//$('#script-warning').show();
					console.log("error");
				}
			},
			loading: function(bool) {
				$('#loading').toggle(bool);
			},
			dayClick: function(date) {
				console.log('dayClick', date.format());
			},
			selectHelper: true,
			select: function(inicio, fin) {
				
				
				var eventData = {
						title: "Creando servicio...",
						start: inicio,
						end: fin,
					};
					
				eventID = $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
				/*
				if(inicio.isBefore(moment())) {
					
					swal("ERROR", "No puede solicitar un servicio para una fecha pasada.", "error");
					
					$('#calendar').fullCalendar('removeEvents', eventID[0]._id);
					$('#calendar').fullCalendar('unselect');
					
				} else {
					*/
				   $modal.modal('show');
					
					$("#fecha_inicio").datepicker("setDate", moment(inicio).format("DD/MM/YYYY"));
					$("#fecha_inicio").datepicker("update");
					
					$("#fecha_fin").datepicker("setDate", moment(fin).format("DD/MM/YYYY"));
					$("#fecha_fin").datepicker("update");
					
					$('#hora_inicio').timepicker('setTime', moment(inicio).format("HH:mm"));	
					$('#hora_fin').timepicker('setTime', moment(fin).format("HH:mm"));	
					
				
			},
			eventClick: function(event) {
			  alert("event start " + moment(event.start).format('MM/DD/YYYY hh:mm a') + " event end " +
				moment(event.end).format('MM/DD/YYYY hh:mm:ss'));
			}
			/*droppable: true, // this allows things to be dropped onto the calendar !!!
			drop: function(date, allDay) { // this function is called when something is dropped

				// retrieve the dropped element's stored Event Object
				var originalEventObject = $(this).data('eventObject');
				// we need to copy it, so that multiple events don't have a reference to the same object
				var copiedEventObject = $.extend({}, originalEventObject);

				// assign it the date that was reported
				copiedEventObject.start = date;
				copiedEventObject.allDay = allDay;
				copiedEventObject.className = $(this).attr("data-class");

				// render the event on the calendar
				// the last `true` argument determines if the event "sticks" (http://arshaw.com/fullcalendar/docs/event_rendering/renderEvent/)
				$('#calendar').fullCalendar('renderEvent', copiedEventObject, true);

				// is the "remove after drop" checkbox checked?
				if ($('#drop-remove').is(':checked')) {
					// if so, remove the element from the "Draggable Events" list
					$(this).remove();
				}
			},*/
			//editable: true,

			/*businessHours: [{
				dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
				start: '08:00',
				end: '12:00'
			  }, {
				dow: [0, 1, 2, 3, 4, 5, 6], // Maybe not 0,6? Sunday,Saturday
				start: '13:00',
				end: '18:00'
			}],
			events: [{
				title: 'All Day Event',
				start: new Date(y, m, 1),
				backgroundColor: App.getBrandColor('yellow')
			}, {
				title: 'Long Event',
				start: new Date(y, m, d - 5),
				end: new Date(y, m, d - 2),
				backgroundColor: App.getBrandColor('green')
			}, {
				title: 'Repeating Event',
				start: new Date(y, m, d - 3, 16, 0),
				allDay: false,
				backgroundColor: App.getBrandColor('red')
			}, {
				title: 'Repeating Event',
				start: new Date(y, m, d + 4, 16, 0),
				allDay: false,
				backgroundColor: App.getBrandColor('green')
			}, {
				title: 'Meeting',
				start: new Date(y, m, d, 10, 30),
				allDay: false,
			}, {
				title: 'Lunch',
				start: new Date(y, m, d, 12, 0),
				end: new Date(y, m, d, 14, 0),
				backgroundColor: App.getBrandColor('grey'),
				allDay: false,
			}, {
				title: 'Birthday Party',
				start: new Date(y, m, d + 1, 19, 0),
				end: new Date(y, m, d + 1, 22, 30),
				backgroundColor: App.getBrandColor('purple'),
				allDay: false,
			}, {
				title: 'Click for Google',
				start: new Date(y, m, 28),
				end: new Date(y, m, 29),
				backgroundColor: App.getBrandColor('yellow'),
				url: 'http://google.com/',
			}]*/
		});
		
		$($modal).on('show', function(){
			//$('body').find('.datepicker-dropdown').addClass("hide"); // fix bug when inline picker is used in modal
			
			
				initDepartamentos();
				initTiposVehiculo();
				initSelectUsuarios();
			
		});
		
		
		
		$("#cancelar_solicitud").click(function() { 
		
			$modal.modal('hide');
			$('#calendar').fullCalendar('removeEvents', eventID[0]._id);
					
		});
		
		
		
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
		function initSelectUsuarios(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/UsuariosGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#usuarios_idusuarios").empty();
					$("#usuarios_idusuarios").append('<option value="">Seleccione un usuario</option>');
					
					for( var i = 0; i<len; i++){
						var idusuarios = response.data[i]['idusuarios'];
						var nombre_completo = response.data[i]['apellidos'] + ', ' + response.data[i]['nombres'] + ' | ' + response.data[i]['email'];
													
						$('#usuarios_idusuarios').append($('<option>', { value: idusuarios, text: nombre_completo })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#usuarios_idusuarios option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#usuarios_idusuarios').selectpicker('refresh');
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
				fecha_servicio: {
					//minlength: 5,
					required: true
				},
				hora_salida: {
					//minlength: 5,
					required: true
				},
				hora_retorno: {
					//minlength: 5,
					required: true,
					//equalTo: "#submit_form_password"
				},
				//TIPO DE SERVICIO
				usuario_solicita: {
					required: true
				},
				idtipos_vehiculo: {
					required: true
				},
				motivo_comision: {
					required: true
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
				} else if ($(this).attr("data-display") == 'payment[]') {
					var payment = [];
					$('[name="payment[]"]:checked', form).each(function(){ 
						payment.push($(this).attr('data-title'));
					});
					$(this).html(payment.join("<br>"));
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
				$('#agregar_evento').find('.button-submit').show();
				displayConfirm();
			} else {
				$('#agregar_evento').find('.button-next').show();
				$('#agregar_evento').find('.button-submit').hide();
			}
			//App.scrollTo($('.page-title'));
		}

		// default form wizard
		
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
		
		$('#agregar_evento .button-submit').click(function () {
			
			
					/*****************************************************/
					/*            AGREGAR O ACTUALIZAR REGISTRO          */
					/*****************************************************/		

					var forsolicitud = $("#form_solicitar_servicio").serialize()+'&action_type=create';
					title = "CONFIRMACION"
					msg = "La solicitud de servicio ha sido registrada.";
					
					console.log(forsolicitud);
												
					return false;						
					$.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/ServiciosSolicitudGet.php',
							data: forsolicitud,
							success:function(data){
								
								console.log(data);
								
/*								$modal.modal('hide');
								$('#calendar').fullCalendar( 'refetchEvents' );
									
								toastIndex = toastCount++;
								toastr.options = {"positionClass": "toast-top-right"}
								var $toast = toastr["success"](msg); */
								
								
							},
							error: function(xhr) { 
								console.log(xhr.statusText + xhr.responseText);
							}
					});

					/*****************************************************/
					/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
					/*****************************************************/	
			
			
		}).hide();
		
		
		$('.mt-repeater').each(function(){
			
			$(this).repeater({
				show: function () {
					$(this).slideDown();
					/*$('.date-picker').datepicker({
						rtl: App.isRTL(),
						orientation: "left",
						autoclose: true
					});*/
				},

				hide: function (deleteElement) {
					//if(confirm('Are you sure you want to delete this element?')) {
						$(this).slideUp(deleteElement);
					//}
				},
				isFirstItemUndeletable: true,
				ready: function (setIndexes) {

				}

			});
			
			
		});
					
			
    });
}]);
