/* Setup general page controller */
angular.module('MetronicApp').controller('CancelarServicioController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		/*
		var date = new Date();
		var d = date.getDate();
		var m = date.getMonth();
		var y = date.getFullYear();*/
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
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
						
						$('#fecha_inicio_real').datepicker('update', data.fecha_inicio);
						$('#fecha_fin_real').datepicker('update', data.fecha_fin);
												
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

			
		}
		
		initContent();
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/


		/**********************************************/
		/*            GRABAR ITEMS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_cancelar_servicio" ).click(function() {
			
				 var form_cancelar_servicio = $('#form_cancelar_servicio');
				 var error_cancelar_servicio = $('.alert-danger.items', form_cancelar_servicio);

				 form_cancelar_servicio.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							estado_servicio: {
								required: true
							},
							observaciones_estado: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_cancelar_servicio.show();
							App.scrollTo(error_cancelar_servicio, -55);
						},
						errorPlacement: function (error, element) { 
							var cont = $(element).parent('.input-group');
							if (cont) {
								cont.after(error);
							} else {
								element.after(error);
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

								error_cancelar_servicio.hide();
								
								formdata = $("#form_cancelar_servicio").serialize()+'&action_type=create_cancelar_servicio&idservicio_solicitud=' + idItem;

								swal({title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea registrar la cancelacion del servicio?",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, registrar",
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
															
															msg = "La cancelacion del servicio se registro correctamente con #ID " + data.idservicios_estados;
															
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
