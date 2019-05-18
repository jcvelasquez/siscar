/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarProveedorController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    
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

		
		$(".mask-numeric").inputmask('99999999999', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: true
		}); 
		
		$("#telefono_proveedor").inputmask("mask", {
            "mask": "(99) 9999999"
        });
		
		$("#celular_proveedor").inputmask("mask", {
            "mask": "+(51) 999999999"
        });
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/
		
		function initContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
					
					 	$.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/ProveedorGet.php?action_type=edit&id='+idItem,
							success:function(data){
								
								$('#razon_social').val(data.razon_social);
								$("#ruc_proveedor").val(data.ruc_proveedor);
								$("#telefono_proveedor").val(data.telefono_proveedor);
								$("#celular_proveedor").val(data.celular_proveedor);
								$("#domicilio_fiscal").val(data.domicilio_fiscal);
								$("#correo_electronico").val(data.correo_electronico);
								$("#representante_legal").val(data.representante_legal);
								$("#dni_representante_legal").val(data.dni_representante_legal);	
								$("#estado_proveedor").val(data.estado_proveedor).change();			
								//FIN DE PERSONALIZACION DE CAMPOS
				
							},
							error: function(xhr) { 
								console.log(xhr.statusText + xhr.responseText);
							}
						});
				
				}else{
					
					$("#estado_proveedor").val(1).change().selectpicker('refresh');
					
				}
			
		}
				
				
		initContent();	
		
		
		/***************************************/
		/*       	  VALIDAR  CHOFER           */
		/***************************************/
		$('#ruc_proveedor').blur(function() {
			
			var ruc = $(this).val();
						
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/FacturasGastosGet.php?action_type=validar_ruc&ruc=' + ruc,
					success:function(data){
												
						if(data.status){
							$("#razon_social").val(data.ddp_nombre);
							$("#domicilio_fiscal").val(data.desc_tipvia + ' ' + data.ddp_nomvia + ' ' + data.ddp_numer1 + ', ' + data.desc_tipzon + ' ' + data.ddp_nomzon + ', ' + data.desc_dep + ', ' + data.desc_prov + ', ' + data.desc_dist);
						}else{
							$("#razon_social").val("");
							$("#domicilio_fiscal").val("");
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		});		
				
				
				
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
						ignore: "",  
						rules: {
							razon_social: {
								required: true
							},
							ruc_proveedor: {
								minlength: 11,
								required: true
							},
							domicilio_fiscal: {
								required: true
							},
							telefono_proveedor: {
								required: true
							},
							celular_proveedor: {
								required: true
							},
							correo_electronico: {
								required: true,
								email: true
							},
							representante_legal: {
								required: true
							},
							dni_representante_legal: {
								required: true
							},
							estado_proveedor: {
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

								error1.hide();

								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		

								if (idItem == 'nuevo' || idItem == '') {

									formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
							
								$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/ProveedorGet.php',
										data: formdata,
										success:function(data){

											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$rootScope.$state.go('private.listar_proveedores');

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
		
		
		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/



    	

	
	});

}]);
