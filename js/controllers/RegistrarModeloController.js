/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarModeloController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    
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

		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
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
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
					
						/***************************************/
						/*       CARGAR REGISTRO A EDITAR      */
						/***************************************/
						
						 $.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/ModelosVehiculosGet.php?action_type=edit&id='+idItem,
							success:function(data){
																
								//INICIO DE PERSONALIZACION DE CAMPOS
								$('#modelo_vehiculo').val(data.modelo_vehiculo);
								$("#estado_modelo").val(data.estado_modelo).change();								
								initMarcasVehiculos(data.idmarcas_vehiculos)
											
								//FIN DE PERSONALIZACION DE CAMPOS
				
							},
							error: function(xhr) { 
								console.log(xhr.statusText + xhr.responseText);
							}
						});
					
				}else{
					
					initMarcasVehiculos("");
					
					$('#estado_modelo').val(1).change().selectpicker('refresh');
					
				}
		
		}
		
		/***************************************/
		/*            CARGAR SELECT            */
		/***************************************/
		function initMarcasVehiculos(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/MarcasVehiculosGet.php?action_type=list',
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idmarcas_vehiculos").empty();
						$("#idmarcas_vehiculos").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idmarcas_vehiculos = response.data[i]['idmarcas_vehiculos'];
							var marca_vehiculo = response.data[i]['marca_vehiculo'];
							$('#idmarcas_vehiculos').append($('<option>', { value: idmarcas_vehiculos, text: marca_vehiculo })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmarcas_vehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmarcas_vehiculos').selectpicker('refresh');
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
							marca_vehiculo: {
								minlength: 2,
								required: true
							},
							estado_marca: {
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
										url: 'database/ModelosVehiculosGet.php',
										data: formdata,
										success:function(data){

											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$rootScope.$state.go('private.listar_modelos');

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

		initEditContent();

    	

	
	});

}]);
