/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarValeController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initContentServicio(){			
			
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
		
		if(idItem != 'nuevo'){
			initContentServicio();
			$('#cabecera_servicio').removeClass('hide');
		}
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/
		function initEditContent(){
	
				if (idItem != '' && idItem != 'nuevo') {
										
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/ValesGet.php?action_type=edit&id=' + idItem,
						success:function(data){								
									
								//INICIO DE PERSONALIZACION DE CAMPOS
								$('#destino').val(data.destino);
								$('#monto').val(data.monto);
								$('#estado_escala').val(data.razon_social).change();
								
								$('#idservicio_solicitud').val(idItem);

								initDestinosMovilidad();
								
								//$('#idservicio_solicitud').attr('disabled',true).selectpicker('refresh');;
								
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
			
					initDestinosMovilidad();
			
				}

		}
	
		initEditContent();
		

		
		/***************************************/
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/		
		function initDestinosMovilidad(SelectedIndex){
							
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ServiciosEscalasMovilidadGet.php?action_type=list',
					success:function(response){
																									
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idservicios_escala_movilidades").empty();
						$("#idservicios_escala_movilidades").append('<option value="">Seleccione un destino</option>');
												
						for( var i = 0; i<len; i++){
							var idservicios_escala_movilidades = response.data[i]['idservicios_escala_movilidades'];
							var destino = response.data[i]['destino'];
							$('#idservicios_escala_movilidades').append($('<option>', { value: idservicios_escala_movilidades, text: destino })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idservicios_escala_movilidades option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idservicios_escala_movilidades').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}	


		/**********************************************/
		/*            GRABAR ITEMS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_vale_servicio" ).click(function() {
			
				 var form_vale = $('#form_vale');
				 var error_vale = $('.alert-danger.items', form_vale);

				 form_vale.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							nro_meta: {
								required: true
							},
							idservicios_escala_movilidades: {
								required: true
							},
							concepto_vale: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error_vale.show();
							App.scrollTo(error_vale, -55);
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

								error_vale.hide();
								
								formdata = $("#form_vale").serialize()+'&action_type=create';
								

								swal({title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea registrar el vale?",
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
														url: 'database/ValesGet.php',
														data: formdata,
														success:function(data){
															
															msg = "El vale ha sido registrado con #ID " + data;
															
															toastIndex = toastCount++;
															toastr.options = {"positionClass": "toast-top-right"}
															var $toast = toastr["success"](msg); 
															
															$rootScope.$state.go('private.listar_vales');
															
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
