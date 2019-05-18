/* Setup general page controller */
angular.module('MetronicApp').controller('FinalizarServicioChoferController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
			format: 'dd/mm/yyyy'
		});
		/*
		$("#fecha_inicio_real").datetimepicker({
            format: "dd/mm/yyyy - HH:ii",
            autoclose: true,
            todayBtn: true,
            fontAwesome: true,
            pickerPosition: "bottom-left",
            minuteStep: 10
        });*/
		
		 //$('body').removeClass("modal-open"); // fix bug when inline picker is used in modal
		 
		/*
		 $("#fecha_fin_real").datetimepicker({
            isRTL: App.isRTL(),
            format: "dd/mm/yyyy - HH:ii",
            autoclose: true,
            todayBtn: true,
            fontAwesome: true,
            pickerPosition: "bottom-left",
            minuteStep: 10
        });*/
				
		$('.timepicker-no-seconds').timepicker({
			autoclose: true,
			minuteStep: 30,
			defaultTime: false,
			showSeconds: false,
            showMeridian: false
		});

		var hora_inicio;
		var hora_fin;
		
		var fecha_inicio_bd;
		var fecha_fin_bd;
		
		
		
				
		function verificarHoras(inicio, fin){
						
			fecha_inicio_bd = moment($('#hora_inicio_bd').val());	
		    fecha_fin_bd = moment($('#hora_fin_bd').val());
						
			if(typeof(inicio) != 'undefined'){
							
				if(inicio.isBefore(fecha_inicio_bd)){
					
					swal("ERROR", "La hora de inicio real del servicio no puede ser menor que la hora programada.", "error");
					
					$('#hora_inicio_real').timepicker('setTime', '');
					$('#hora_fin_real').timepicker('setTime', '');
				
				
				}
				
			}
			
			if(typeof(fin) != 'undefined'){
							
				if(fin.isBefore(inicio)){
					
					swal("ERROR", "La hora de finalización no puede ser antes que la hora de inicio.", "error");
					
					$('#hora_fin_real').timepicker('setTime', '');
					
				} 
				
			}
			
			
		}
				
		 $('#hora_inicio_real').timepicker().on('hide.timepicker', function(e) {

			hora_inicio = moment(e.time); 
			verificarHoras(hora_inicio, hora_fin);
			
		  });
		  
		  $('#hora_fin_real').timepicker().on('hide.timepicker', function(e) {
			 
			hora_fin = moment(e.time);
			verificarHoras(hora_inicio, hora_fin);
			
		  });
						
				
		/***************************************/
		/*       	  VALIDAR  ALERTA          */
		/***************************************/

		
		$('#kilometraje_fin').keyup(function() {
			
			var idvehiculos = $("#vehiculos_idvehiculos").val();
			var kilometraje_fin = $(this).val();
						
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/MantenimientoAlertasGet.php?action_type=alertas_x_vehiculo&id=' + idvehiculos,
					success:function(response){
											
											
						if(response.data.length > 0){
							
							var valores = response.data;
							var km_porcentaje = valores[0]['ciclo_alerta'] / 100 * valores[0]['ejecucion_alerta'];
							var km_alerta_mantenimiento = valores[0]['kilometraje_ultimo_mantenimiento'] + km_porcentaje;
							
							if(kilometraje_fin >= km_alerta_mantenimiento){
								$('#idmantenimiento_alertas').val(valores[0]['idmantenimiento_alertas']);
							}else{
								$('#idmantenimiento_alertas').val(0);
							}
							
						}else{
							console.log("no hay alerta");
							$('#idmantenimiento_alertas').val(0);
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		});	
		
		
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
						$('#cabecera_servicio div[data-display="fecha_inicio"').html(data.fecha_inicio + ' - ' + data.hora_inicio);
						$('#cabecera_servicio div[data-display="fecha_fin"').html(data.fecha_fin + ' - ' + data.hora_fin);
						$('#cabecera_servicio div[data-display="lugar_destino"').html(data.lugar_destino);
						$('#cabecera_servicio div[data-display="usuario_solicita"').html(data.nombres + ' ' + data.apellidos);
						$('#cabecera_servicio div[data-display="placa_vehiculo"').html(data.placa_vehiculo);
						
						//LLAVE DE VEHICULOS
						$('#vehiculos_idvehiculos').val(data.vehiculos_idvehiculos);
						
						$('#fecha_inicio_real').datepicker('update', data.fecha_inicio);
						$('#fecha_fin_real').datepicker('update', data.fecha_fin);

						$('#hora_inicio_bd').val(data.fecha_inicio_date);	
						$('#hora_fin_bd').val(data.fecha_fin_date);
						
						if(data.es_asignado == 0)
							$('#cabecera_servicio span[data-display="es_asignado"').removeClass('label-success').addClass('label-danger').html("NO ASIGNADO");
						else
							$('#cabecera_servicio span[data-display="es_asignado"').html("ASIGNADO");
						//FIN DE PERSONALIZACION DE CAMPOS
						
						var ahora = moment();
						var fin_bd = moment(data.fecha_fin_date);
						
						if(ahora.isAfter(fin_bd)){
							
							console.log("SI PUEDE FINALIZAR EL SERVICIO");
							
						}else{
							App.blockUI({
								target: '#finalizar_servicio',
								boxed: true,
								textOnly: true,
								message: 'Aún no puede cerrar este servicio ya que aún no se ha realizado.'
							});
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});

			
		}
		
		initContent();
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/

		$.validator.addMethod("greaterThan", function (value, element, param) {
		  var $min = $(param);
		  if (this.settings.onfocusout) {
			$min.off(".validate-greaterThan").on("blur.validate-greaterThan", function () {
			  $(element).valid();
			});
		  }
		  return parseInt(value) > parseInt($min.val());
		}, "Max must be greater than min");
		
		/**********************************************/
		/*            GRABAR ITEMS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_cierre" ).click(function() {
			
				 var form_cierre = $('#form_cierre_servicio');
				 var error_cierre = $('.alert-danger.items', form_cierre);

				 form_cierre.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						messages: {
							kilometraje_inicio: {
								required: "El kilometraje de inicio es requerido.",
								digits: "Solo digitos"
							},
							kilometraje_fin: {
								required: "El kilometraje de fin es requerido",
								greaterThan: "El kilometraje de fin debe ser mayor al kilometraje de inicio."
							},
							hora_inicio_real : {
								required: "La hora de inicio real es requerida.",
							},
							hora_fin_real : {
								required: "La hora de fin real es requerida.",
							},
							observaciones_chofer : {
								required: "Ingrese unas observaciones para cerrar el servicio.",
							}
						},
						rules: {
							fecha_inicio_real: {
								required: true
							},
							hora_inicio_real: {
								required: true
							},
							fecha_fin_real: {
								required: true
							},
							hora_fin_real: {
								required: true
							},
							kilometraje_inicio: {
								required: true,
								digits: true
							},
							kilometraje_fin: {
								required: true,
								greaterThan: '#kilometraje_inicio',
								digits: true
							},
							observaciones_chofer: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_cierre.show();
							App.scrollTo(error_cierre, -55);
						},
						errorPlacement: function (error, element) { 
							if (element.parent(".input-group").size() > 0) {
								error.insertAfter(element.parent(".input-group"));
							} else if (element.attr("data-error-container")) { 
								error.appendTo(element.attr("data-error-container"));
							} else if (element.parents('.radio-list').size() > 0) { 
								error.appendTo(element.parents('.radio-list').attr("data-error-container"));
							} else if (element.parents('.radio-inline').size() > 0) { 
								error.appendTo(element.parents('.radio-inline').attr("data-error-container"));
							} else if (element.parents('.checkbox-list').size() > 0) {
								error.appendTo(element.parents('.checkbox-list').attr("data-error-container"));
							} else if (element.parents('.checkbox-inline').size() > 0) { 
								error.appendTo(element.parents('.checkbox-inline').attr("data-error-container"));
							} else {
								error.insertAfter(element); // for other inputs, just perform default behavior
							}
						},
						highlight: function (element) { 
							$(element).closest('.form-group').addClass('has-error'); 
						},
						unhighlight: function (element) { 
							$(element).closest('.form-group').removeClass('has-error'); 
						},
						success: function (label) {
								label.closest('.form-group').removeClass('has-error'); 
						},
						submitHandler: function (form) {

								error_cierre.hide();
								
								formdata = $("#form_cierre_servicio").serialize()+'&action_type=create_cierre_chofer&idservicio_solicitud=' + idItem;
								
								swal({title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea registrar el cierre del servicio?",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, cerrar",
									  cancelButtonText: "Cancelar",
									  closeOnConfirm: true,
									},
									function(){

												$.ajax({
														dataType:'JSON',
														type: 'POST',
														url: 'database/ServiciosSolicitudGet.php',
														data: formdata,
														success:function(data){
																														
															msg = "El cierre del servicio se registro correctamente con #ID " + data.idservicios_cierre_chofer;
															
															toastIndex = toastCount++;
															toastr.options = {"positionClass": "toast-top-right"}
															var $toast = toastr["success"](msg); 
															
															$rootScope.$state.go('private.listar_servicios');
															
														},
														error: function(xhr) { 
															console.log(xhr.statusText + xhr.responseText);
														}
												});
										
										
									});


						}

				});

		});

		
    });
}]);
