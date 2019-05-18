/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarSucursalController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    
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
		
		$("#telefono_sucursal").inputmask("mask", {
            "mask": "(99) 9999999"
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
					url: 'database/SucursalGet.php?action_type=edit&id='+idItem,
					success:function(data){
						
						$('#nombre_sucursal').val(data.nombre_sucursal);
						$("#encargado_sucursal").val(data.encargado_sucursal);
						$("#direccion_sucursal").val(data.direccion_sucursal);
						$("#encargado_sucursal").val(data.encargado_sucursal);
						$("#telefono_sucursal").val(data.telefono_sucursal);
						$("#estado_sucursal").val(data.estado_sucursal).change();	
						
						initProveedores(data.proveedores_idproveedores);			
						//FIN DE PERSONALIZACION DE CAMPOS
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
			}else{
				$('#estado_sucursal').val(1).change().selectpicker('refresh');	
				
				initProveedores("");
				
				
			}
			
		}
		
		initEditContent();
		
		 

		
		/***************************************/
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		function initProveedores(SelectedIndex){
			
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ProveedorGet.php?action_type=list',
					success:function(response){
						
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#proveedores_idproveedores").empty();
						$("#proveedores_idproveedores").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idproveedores = response.data[i]['idproveedores'];
							var razon_social = response.data[i]['razon_social'];
							$('#proveedores_idproveedores').append($('<option>', { value: idproveedores, text: razon_social })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#proveedores_idproveedores option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#proveedores_idproveedores').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
			
		}	
				
				
				
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
							nombre_sucursal: {
								required: true
							},
							encargado_sucursal: {
								required: true
							},
							direccion_sucursal: {
								required: true
							},
							encargado_sucursal: {
								required: true
							},
							telefono_sucursal: {
								required: true,
							},
							estado_sucursal: {
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
										url: 'database/SucursalGet.php',
										data: formdata,
										success:function(data){

											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$rootScope.$state.go('private.listar_sucursales');

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
