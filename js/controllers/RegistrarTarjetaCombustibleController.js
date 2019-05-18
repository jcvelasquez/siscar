/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarTarjetaCombustibleController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		/*       	  CARGAR  CONTRATOS	       */
		/***************************************/

		function initSelectContratos(SelectedIndex){
							
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ContratosGet.php?action_type=list',
					success:function(response){
						
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idcontratos").empty();
						$("#idcontratos").append('<option value="">Seleccione un contrato</option>');
						
						for( var i = 0; i<len; i++){
							var idcontratos = response.data[i]['idcontratos'];
							var nombre_contrato = response.data[i]['nombre_contrato'];
														
							$('#idcontratos').append($('<option>', { value: idcontratos, text: nombre_contrato })).selectpicker('refresh');
						}
						//FIN CARGA DE REGISTROS EN EL SELECT
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idcontratos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idcontratos').selectpicker('refresh');
						}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
		}
		
		/***************************************/
		/*     CARGAR  ITEMS ADJUDICADOS        */
		/***************************************/
		function initSelectItemsAdjudicados(SelectedIndex, IdContrato){
								
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ContratosGet.php?action_type=list_items_contrato&id=' + IdContrato,
					success:function(response){
						
						var len = response.data.length;
						
						$("#id_item_adjudicados").empty();
						$("#id_item_adjudicados").append('<option value="">Seleccione un item</option>');
						
						for( var i = 0; i<len; i++){
							var id_item_adjudicados = response.data[i]['id_item_adjudicados'];
							var nombre_item = 'Producto: ' + response.data[i]['tipo_combustible'] + ' | Cantidad: ' + response.data[i]['cantidad'] + ' ' + response.data[i]['medida_combustible'] + ' | Total: S/' + response.data[i]['precio_total'];
														
							$('#id_item_adjudicados').append($('<option>', { value: id_item_adjudicados, text: nombre_item })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#id_item_adjudicados').prop('disabled', false);
	  					$('#id_item_adjudicados').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#id_item_adjudicados option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#id_item_adjudicados').selectpicker('refresh');
						}

					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});	
				
		}

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
						var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'];
													
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
		/*       CARGAR LABEL PROVEEDOR	   */
		/***************************************/
		
		function initLabelProveedor(IdContrato){
			
			
			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/ContratosGet.php?action_type=proveedor_x_contrato&id=' + IdContrato,
				success:function(response){
												

					$('#proveedores_idproveedores').val(response.proveedores_idproveedores);
					$("#razon_social").val(response.razon_social);
					
					
					//initSelectSucursal("",response.proveedores_idproveedores);
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			/***************************************/
			/*    	    FIN SELECT CARGA		   */
			/***************************************/
			
		}
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/
		
		function initContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
					
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/TarjetasCombustibleGet.php?action_type=edit&id='+idItem,
						success:function(data){
										
										console.log(data);
							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#nro_tarjeta').val(data.nro_tarjeta);
							$('#estado_tarjeta').val(data.estado_tarjeta).change();
							$('#proveedores_idproveedores').val(data.proveedores_idproveedores);
							

							initSelectContratos(data.contratos_idcontratos);
							initSelectItemsAdjudicados(data.id_item_adjudicados, data.contratos_idcontratos)
							initSelectVehiculos(data.vehiculos_idvehiculos);
							
							initLabelProveedor(data.contratos_idcontratos);

			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
					
					$('#estado_tarjeta').val(1).change().selectpicker('refresh');	
					
					initSelectContratos("");
					initSelectVehiculos("");

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
							idcontratos: {
								required: true
							},
							id_item_adjudicados: {
								required: true
							},
							vehiculos_idvehiculos: {
								required: true
							},
							nro_tarjeta: {
								required: true
							},
							estado_tarjeta: {
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
								
								if (idItem == 'nuevo' || idItem == '') {
	
									formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
								
								console.log(formdata);
									
								
								swal({
								  title: "CONFIRMACION REQUERIDA",
								  text: "¿Esta seguro que desea guardar el ticket?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, guardar!",
								  cancelButtonText: "Cancelar",
								  closeOnConfirm: true
								},
								function(){
									
									
									/*****************************************************/
									/*            AGREGAR O ACTUALIZAR REGISTRO          */
									/*****************************************************/		

									$.ajax({
										
											dataType:'JSON',
											type: 'POST',
											url: 'database/TarjetasCombustibleGet.php',
											data: formdata,
											success:function(data){
												
												console.log(data);
	
												toastIndex = toastCount++;
												toastr.options = {"positionClass": "toast-top-right"}
												var $toast = toastr["success"](msg); 
												
												$("#form")[0].reset();
												$rootScope.$state.go('private.listar_tarjetas_combustible');
												
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
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		
			
		//AL SELECCIONAR UN CONTRATO
		$('#idcontratos').on('change', function(){
			
			var IdContrato = $(this).val();	

			initSelectItemsAdjudicados("",IdContrato);			
			initLabelProveedor(IdContrato);
			
			
		});		
		
		
		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		
    });
}]);
