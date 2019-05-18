/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarAlertaController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/

		var idItem = $rootScope.$state.params.id; 
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		$("#ejecucion_alerta").ionRangeSlider({ 
			postfix : "%", 
			grid: true, 
			grid_num: 10, 
			from: 0,
			min: 0,
            max: 100,
			from_shadow: true
		});	
		
		// Saving it's instance to var
		var ejecucion_alerta = $("#ejecucion_alerta").data("ionRangeSlider");		
		
		$("#ciclo_alerta").TouchSpin({min: 0, max: 99999999, step: 1 });
		
		$('#is_custom_alerta').on('switchChange.bootstrapSwitch', function (event, state) {
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#is_custom_alerta").is(':checked')) {
				$('#alerta_personalizada').removeClass('hide');
				$('#is_custom_alerta').val(1);
			}else{
				
				$('#alerta_personalizada').addClass('hide');
				$('#is_custom_alerta').val(0);
				$("#ciclo_alerta").val(0);	
				//LIMPIA LOS SELECTES
				$('#id_medida_uso').selectpicker('val', '');
				$('#id_medida_uso').selectpicker('refresh');
				
				ejecucion_alerta.update({ from: 0  });
				ejecucion_alerta.reset();
				
			}
		});

		
		//$('#is_custom_alerta').change()
		//$('.bootstrap-switch-container input').bootstrapSwitch();
				
		
		
		/***************************************/
		/*       	  CARGAR  VEHICULOS        */
		/***************************************/
		function initSelectVehiculos(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/VehiculosGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#vehiculos_idvehiculos").empty();
					$("#vehiculos_idvehiculos").append('<option value="">Seleccione</option>');
					
					for( var i = 0; i<len; i++){
						var idvehiculos = response.data[i]['idvehiculos'];
						var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['modelo_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'];
													
						$('#vehiculos_idvehiculos').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#vehiculos_idvehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#vehiculos_idvehiculos').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		/***************************************/
		/*       	  CARGAR  SISTEMAS         */
		/***************************************/
		function initSelectSistemas(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/MantenimientoSistemasGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idmantenimiento_sistemas").empty();
					$("#idmantenimiento_sistemas").append('<option value="">Seleccione un sistema</option>');
					
					for( var i = 0; i<len; i++){
						var idmantenimiento_sistemas = response.data[i]['idmantenimiento_sistemas'];
						var nombre_sistema = response.data[i]['nombre_sistema'];
													
						$('#idmantenimiento_sistemas').append($('<option>', { value: idmantenimiento_sistemas, text: nombre_sistema })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_sistemas option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_sistemas').selectpicker('refresh');
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
		/*     CARGAR  SELECT SERVICIOS        */
		/***************************************/
		function initSelectServicios(SelectedIndex, idSistemas){
								
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/MantenimientoServiciosGet.php?action_type=servicios_x_sistema&id=' + idSistemas,
					success:function(response){
												
						var len = response.data.length;
						
						$("#idmantenimiento_servicios").empty();
						$("#idmantenimiento_servicios").append('<option value="">Seleccione un servicio</option>');
						
						for( var i = 0; i<len; i++){
							var idmantenimiento_servicios = response.data[i]['idmantenimiento_servicios'];
							var nombre_servicio = response.data[i]['nombre_servicio'];
														
							$('#idmantenimiento_servicios').append($('<option>', { value: idmantenimiento_servicios, text: nombre_servicio })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#idmantenimiento_servicios').prop('disabled', false);
	  					$('#idmantenimiento_servicios').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmantenimiento_servicios option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmantenimiento_servicios').selectpicker('refresh');
						}

					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});	
				
		}
		
		
		/***************************************/
		/*         CARGAR  MEDIDA USO          */
		/***************************************/
		function initSelectMedidaUso(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/TipoMedidaUsoGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#id_medida_uso").empty();
					$("#id_medida_uso").append('<option value="">Seleccione una medida</option>');
					
					for( var i = 0; i<len; i++){
						var id_medida_uso = response.data[i]['id_medida_uso'];
						var medida_uso = response.data[i]['medida_uso'];
													
						$('#id_medida_uso').append($('<option>', { value: id_medida_uso, text: medida_uso })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
					if(SelectedIndex != ""){
						$("#id_medida_uso option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
						$('#id_medida_uso').selectpicker('refresh');
					}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#idmantenimiento_sistemas').on('change', function(){
			var idSistemas = $(this).val();	
			
			if(idSistemas != ''){
				initSelectServicios("",idSistemas);
				//initSelectComponentes("",idSistemas);
			}else{
				//DESACTIVO EL SELECT
				$("#idmantenimiento_servicios").empty();
				$("#idmantenimiento_servicios").append('<option value="">Seleccione un sistema primero</option>');
				$('#idmantenimiento_servicios').prop('disabled', true);
				$('#idmantenimiento_servicios').selectpicker('refresh');
				
				
				//DESACTIVO EL SELECT
				$("#idmantenimiento_componentes").empty();
				$("#idmantenimiento_componentes").append('<option value="">Seleccione un sistema primero</option>');
				$('#idmantenimiento_componentes').prop('disabled', true);
				$('#idmantenimiento_componentes').selectpicker('refresh');
				
			}
			
			
		});	
		
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/
		
		function initContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
					
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/MantenimientoAlertasGet.php?action_type=edit&id='+idItem,
						success:function(data){
																															
							initSelectVehiculos(data.vehiculos_idvehiculos);
							initSelectSistemas(data.idmantenimiento_sistemas);
							
							initSelectUsuarios(data.usuarios_idusuarios);
							initSelectServicios(data.idmantenimiento_servicios, data.idmantenimiento_sistemas);
							
							$('#estado_alerta').val(data.estado_alerta).change();
							$('#descripcion_alerta').val(data.descripcion_alerta);
							$('#kilometraje_ultimo_mantenimiento').val(data.kilometraje_ultimo_mantenimiento);
							
							initSelectMedidaUso(data.id_medida_uso);
							
							if(data.is_custom_alerta == 1){
								$('#is_custom_alerta').bootstrapSwitch('state', true); // true || false
								$('#is_custom_alerta').val(data.is_custom_alerta);
								ejecucion_alerta.update({ from: data.ejecucion_alerta  });
								$("#ciclo_alerta").val(data.ciclo_alerta);
							}
																		
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
					
					//DESACTIVO EL SELECT
					$('#idmantenimiento_servicios').prop('disabled', true);
	  				$('#idmantenimiento_servicios').selectpicker('refresh');
					
					//DESACTIVO EL SELECT
					$('#idmantenimiento_componentes').prop('disabled', true);
	  				$('#idmantenimiento_componentes').selectpicker('refresh');
					
					$('#estado_alerta').val(1).change();
					$('#is_custom_alerta').val(0);
					
					initSelectVehiculos("");
					initSelectSistemas("");
					initSelectMedidaUso("");
					initSelectUsuarios("");
					
				}
			
		}
				
				
		initContent();	
		
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
				
		$( "#grabar" ).click(function() {

		  var form_ms = $('#form');
		  
		  var error1 = $('.alert-danger', form_ms);

		  form_ms.validate({errorElement: 'span', 
							errorClass: 'help-block help-block-error', 
							focusInvalid: false, 
							ignore: "",  
							rules: {
								vehiculos_idvehiculos: {
									required: true
								},
								usuarios_idusuarios: {
									required: true
								},
								descripcion_alerta: {
									required: true
								},
								estado_alerta: {
									required: true
								},
								kilometraje_ultimo_mantenimiento: {
									required: true
								},
								idmantenimiento_sistemas: {
									required: true
								},
								idmantenimiento_servicios: {
									required: true
								},
								id_medida_uso: {
									required: function(element) {
										if($("#is_custom_alerta").is(':checked'))
											return true;
										else
											return false;
									}
								},
								ciclo_alerta: {
									min: function(element) {
											if($("#is_custom_alerta").is(':checked'))
												return 1;
											else
												return 0;
									},
									required : function(element) {
										if($("#is_custom_alerta").is(':checked'))
											return true;
										else
											return false;
									}
								},
								ejecucion_alerta: {
									min: function(element) {
											if($("#is_custom_alerta").is(':checked'))
												return 1;
											else
												return 0;
									},
									required : function(element) {
										if($("#is_custom_alerta").is(':checked'))
											return true;
										else
											return false;
									}
								}
							},
							invalidHandler: function (event, validator) { 
								error1.show();
								App.scrollTo(error1, -200);
							},
							errorPlacement: function (error, element) { 
							/*
								var cont = $(element).parent('.input-group');
								if (cont) {
									cont.after(error);
								} else {
									element.after(error);
								}*/
							},
							highlight: function (element) { 
								$(element).closest('.form-group').addClass('has-error'); 
								$(element).closest('.form-group').find('span.helper').removeClass('hide');
							},
							unhighlight: function (element) { 
								$(element).closest('.form-group').removeClass('has-error'); 
								$(element).closest('.form-group').find('span.helper').addClass('hide');
							},
							success: function (label) {
									label.closest('.form-group').removeClass('has-error'); 
							},
							submitHandler: function (form) {
								
									error1.hide();
									
									swal({
									  title: "CONFIRMACION REQUERIDA",
									  text: "¿Esta seguro que desea grabar la alerta?",
									  type: "warning",
									  showCancelButton: true,
									  confirmButtonClass: "btn-success",
									  confirmButtonText: "Si, grabar!",
									  cancelButtonText: "Cancelar",
									  closeOnConfirm: true
									},
									function(){

											/*****************************************/
											/*            AGREGAR  REGISTRO          */
											/*****************************************/		
											
											if (idItem == 'nuevo' || idItem == '') {
												formdata = $("#form").serialize()+'&action_type=create';
												msg = "Registro guardado correctamente!";
											}else{
												formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
												msg = "Registro actualizado correctamente!";
											}
											
											
											$.ajax({
											
												dataType:'JSON',
												type: 'POST',
												url: 'database/MantenimientoAlertasGet.php',
												data: formdata,
												success:function(response){
													
													toastIndex = toastCount++;
													toastr.options = {"positionClass": "toast-top-right"}
													var $toast = toastr["success"](msg); 
												
													$rootScope.$state.go('private.listar_alertas');
																			
												},
												error: function(xhr) { 
													console.log(xhr.statusText + xhr.responseText);
												}
												
											});
			
											/*****************************************************/
											/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
											/*****************************************************/	
											
											
											
									});
									
							}
	
					});
					
					
		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		
		
    });
}]);
