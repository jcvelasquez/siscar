/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarEscalaMovilidadController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
		
			if (idItem != '' && idItem != 'nuevo') {
					
				//CAMPOS DE EDICION							
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ServiciosEscalasMovilidadGet.php?action_type=edit&id='+idItem,
					success:function(data){
						
						//INICIO DE PERSONALIZACION DE CAMPOS
						$('#destino').val(data.destino);
						$('#monto').val(data.monto);
						$("#estado_escala").val(data.estado_escala).change();
						//FIN DE PERSONALIZACION DE CAMPOS
															
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
			}else{
				$('#estado_escala').val(1).change().selectpicker('refresh');		
			}
			
			
		}
		
		initEditContent();
		/***************************************/
		/*   FIN DE  CARGAR REGISTRO A EDITAR   */
		/***************************************/	
		
		
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/

		$( "#grabar_escala" ).click(function() {

				 var form1 = $('#form_escala');
				 var error1 = $('.alert-danger', form1);

				 form1.validate({
						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							destino: {
								required: true
							},
							monto: {
								required: true
							},
							estado_escala: {
								required: true
							}
						},
						invalidHandler: function (event, validator) { 
							error1.show();
							App.scrollTo(error1, -200);
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

								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
								if (idItem == 'nuevo' || idItem == '') {

									var formdata = $("#form_escala").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									var formdata = $("#form_escala").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
																							
								$.ajax({
									
										dataType:'JSON',
										type: 'POST',
										url: 'database/ServiciosEscalasMovilidadGet.php',
										data: formdata,
										success:function(data){
											
											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
																																			
											$rootScope.$state.go('private.listar_escala_movilidad');
																	
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
