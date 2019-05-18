/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarTallerController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    
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
		
		
		
		/***************************************/
		/*       	  CARGAR  DATOS RUC        */
		/***************************************/
		$('#ruc_taller').blur(function() {
			
			var ruc = $(this).val();
						
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/FacturasGastosGet.php?action_type=validar_ruc&ruc=' + ruc,
					success:function(data){
												
						if(data.status){
							$("#nombre_taller").val(data.ddp_nombre);
							$("#direccion_taller").val(data.desc_tipvia + ' ' + data.ddp_nomvia + ' ' + data.ddp_numer1 + ', ' + data.desc_tipzon + ' ' + data.ddp_nomzon + ', ' + data.desc_dep + ', ' + data.desc_prov + ', ' + data.desc_dist);
						}else{
							$("#nombre_taller").val("[Ingresa un numero de ruc]");
							$("#direccion_taller").val("[Ingresa un numero de ruc]");
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
			
				if (idItem != '' && idItem != 'nuevo') {
					
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/TalleresGet.php?action_type=edit&id='+idItem,
						success:function(data){
							
							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#nombre_taller').val(data.nombre_taller);
							$('#descripcion_taller').val(data.descripcion_taller);
							$("#direccion_taller").val(data.direccion_taller);
							$("#email_taller").val(data.email_taller);
							$("#ruc_taller").val(data.ruc_taller);
							$("#telefono_taller").val(data.telefono_taller);
							$("#estado_taller").val(data.estado_taller).change();
							//FIN DE PERSONALIZACION DE CAMPOS
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
					
					$("#estado_taller").val(1).change().selectpicker('refresh');
					
				}
			
		}
				
				
		initContent();	
			
				
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
							nombre_taller: {
								required: true
							},
							descripcion_taller: {
								required: true
							},
							direccion_taller: {
								required: true
							},
							ruc_taller: {
								required: true
							},
							telefono_taller: {
								required: true
							},
							email_taller: {
								required: false
							},
							estado_taller: {
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
										url: 'database/TalleresGet.php',
										data: formdata,
										success:function(data){
											

											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											$rootScope.$state.go('private.listar_talleres');

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
