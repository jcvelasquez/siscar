/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarSedeController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		
		$("#telefono_sede").inputmask("mask", {
            "mask": "(99) 9999999"
        });
		
		$("#celular_sede").inputmask("mask", {
            "mask": "+(51) 999999999"
        });
		

    	$rootScope.settings.layout.pageContentWhite = true;
        $rootScope.settings.layout.pageBodySolid = false;
        $rootScope.settings.layout.pageSidebarClosed = false;
		
		var idItem = $rootScope.$state.params.id; 
		var title;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg = "";
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});	
		
		
		/***************************************/
		/*     	CARGAR SELECT EMPRESAS   	   */
		/***************************************/		
		function initEmpresas(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/EmpresasGet.php?action_type=list',
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#empresas_idempresas").empty();
						$("#empresas_idempresas").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idempresas = response.data[i]['idempresas'];
							var razon_social = response.data[i]['razon_social'];
														
							$('#empresas_idempresas').append($('<option>', { value: idempresas, text: razon_social })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#empresas_idempresas option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#empresas_idempresas').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}	
		
		/***************************************/
		/*     FIN CARGAR SELECT EMPRESAS 	   */
		/***************************************/
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
						
					//CAMPOS DE EDICION							
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/SedesGet.php?action_type=edit&id='+idItem,
						success:function(data){

							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#nombre_sede').val(data.nombre_sede);
							$('#direccion_uno').val(data.direccion_uno);
							$('#telefono_sede').val(data.telefono_sede);
							$('#celular_sede').val(data.celular_sede);
							$('#correo_sede').val(data.correo_sede);
							$('#coordenadas_sede').val(data.correo_sede);
							$("#estado_sede").val(data.estado_sede).change();
							//initEmpresas(data.empresas_idempresas);
							
							$('#empresas_idempresas').val(data.empresas_idempresas);
							
							//FIN DE PERSONALIZACION DE CAMPOS
										
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
							
				
				}else{
					
					//initEmpresas("");	
					
					$("#estado_sede").val(1).change().selectpicker('refresh');
					
					$('#empresas_idempresas').val(1);
						
				}
				
							
			
		}
		initEditContent();
		/***************************************/
		/*   FIN DE  CARGAR REGISTRO A EDITAR   */
		/***************************************/	
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/

		$( ".grabar" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

				 form1.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						messages: {
							nombre_sede: "Ingrese el nombre de la sede",
							telefono_sede: "Ingrese un teléfono para la sede",
							direccion_uno : "Ingrese una dirección de sede",
							celular_sede : "Ingrese un celular de contacto",
							coordenadas_sede: "Ingrese las coordenadas geograficas (Lat,Long)",
							correo_sede: {
							  required: "El correo electrónico es requerido",
							  email: "El correo electrónico debe tener el formato usuario@dominio.com"
							}
						},
						ignore: "",  
						rules: {
							empresas_idempresas: {
								required: true
							},
							nombre_sede: {
								required: true
							},
							direccion_uno: {
								required: true
							},
							telefono_sede: {
								required: true
							},
							celular_sede: {
								required: true
							},
							correo_sede: {
								required: true,
								email: true
							},
							coordenadas_sede: {
								required: true
							},
							estado_sede: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error1.show();
							App.scrollTo(error1, -200);
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

								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
								if (idItem == 'nuevo' || idItem == '') {

									var formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									var formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
							
								$.ajax({
									
										dataType:'JSON',
										type: 'POST',
										url: 'database/SedesGet.php',
										data: formdata,
										success:function(data){

											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$("#form")[0].reset();
																								
											$rootScope.$state.go('private.listar_sedes');
																	
										},
										error: function(xhr) { 
											console.log(xhr.statusText + xhr.responseText);
										}
								});

								/*****************************************************/
								/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
								/*****************************************************/	

						}

				});

		});	
		
		/******************************************/
		/*        FIN VALIDAR FORMULARIO          */
		/******************************************/
		
		
		
    });
}]);
