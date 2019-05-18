/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarFacturaGastoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		
		
		/***************************************/
		/*       	  INIT CONTROLES  		   */
		/***************************************/
		
		function roundVal(number, places) {
		   number = parseFloat(number, 10);
		   var e  = parseInt(places || 2, 10);
		   var m = Math.pow(10, e);
		   return Math.floor(number * m) / m;
		}
		
		$('#cantidad_combustible').keyup(function(){
			
			var importe_total = $(this).val() * $('#precio_unitario_combustible').val();
			
			$('#importe_total_combustible').val( roundVal(importe_total, 2) );
			

		});
		
		$('#precio_unitario_combustible').keyup(function(){
			
			var importe_total = $('#cantidad_combustible').val() * $(this).val();
			
			$('#importe_total_combustible').val( roundVal(importe_total, 2) );

		});
		
		
		 $('#fecha_factura').datepicker({
			orientation: "left",
			autoclose: true
		});
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		$('.timepicker-no-seconds').timepicker({
			autoclose: true,
			minuteStep: 5,
			defaultTime: false
		});
		
		// handle input group button click
		$('.timepicker').parent('.input-group').on('click', '.input-group-btn', function(e){
			e.preventDefault();
			$(this).parent('.input-group').find('.timepicker').timepicker('showWidget');
		});	
		
		
		/***************************************/
		/*       	  CARGAR  VEHICULOS        */
		/***************************************/
		function initSelectVehiculos(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/VehiculosGet.php?action_type=list&estado=1',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idvehiculos").empty();
					$("#idvehiculos").append('<option value="">Seleccione un vehiculo</option>');
					
					for( var i = 0; i<len; i++){
						var idvehiculos = response.data[i]['idvehiculos'];
						var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'];
													
						$('#idvehiculos').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idvehiculos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idvehiculos').selectpicker('refresh');
						}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		/***************************************/
		/*       	  CARGAR  CHOFER           */
		/***************************************/
		function initSelectChofer(SelectedIndex){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/ChoferesGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#chofer_idchofer").empty();
					$("#chofer_idchofer").append('<option value="">Seleccione un chofer</option>');
					
					for( var i = 0; i<len; i++){
						var idchofer = response.data[i]['idchofer'];
						var nombre_chofer = response.data[i]['apellidos_chofer'] + ', ' + response.data[i]['nombres_chofer'];
													
						$('#chofer_idchofer').append($('<option>', { value: idchofer, text: nombre_chofer })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
					if(SelectedIndex != ""){
						$("#chofer_idchofer option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
						$('#chofer_idchofer').selectpicker('refresh');
					}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}	
		
		
		/***************************************/
		/*       	  CARGAR  DATOS RUC        */
		/***************************************/
		$('#ruc_factura').blur(function() {
			
			var ruc = $(this).val();
						
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/FacturasGastosGet.php?action_type=validar_ruc&ruc=' + ruc,
					success:function(data){
												
						if(data.status){
							$("#nombre_proveedor").val(data.ddp_nombre);
							$("#direccion_proveedor").val(data.desc_tipvia + ' ' + data.ddp_nomvia + ' ' + data.ddp_numer1 + ', ' + data.desc_tipzon + ' ' + data.ddp_nomzon + ', ' + data.desc_dep + ', ' + data.desc_prov + ', ' + data.desc_dist);
						}else{
							$("#nombre_proveedor").val("[Ingresa un numero de ruc]");
							$("#direccion_proveedor").val("[Ingresa un numero de ruc]");
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		});		
		
		
		
		
		
		/***************************************/
		/*       	  CARGAR  CHOFER           */
		/***************************************/
		function initSelectChofer(SelectedIndex){

			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/ChoferesGet.php?action_type=list',
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#chofer_idchofer").empty();
					$("#chofer_idchofer").append('<option value="">Seleccione</option>');
					
					for( var i = 0; i<len; i++){
						var idchofer = response.data[i]['idchofer'];
						var nombre_chofer = response.data[i]['apellidos_chofer'] + ', ' + response.data[i]['nombres_chofer'];
													
						$('#chofer_idchofer').append($('<option>', { value: idchofer, text: nombre_chofer })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
					if(SelectedIndex != ""){
						$("#chofer_idchofer option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
						$('#chofer_idchofer').selectpicker('refresh');
					}
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		/***************************************/
		/*       	CARGAR  COMBUSTIBLE        */
		/***************************************/
		function initSelectCombustible(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TipoCombustibleGet.php?action_type=list&estado=1',
					success:function(response){
						
						var len = response.data.length;
						
						$("#idtipo_combustible").empty();
						$("#idtipo_combustible").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipo_combustible = response.data[i]['idtipo_combustible'];
							var tipo_combustible = response.data[i]['tipo_combustible'];
														
							$('#idtipo_combustible').append($('<option>', { value: idtipo_combustible, text: tipo_combustible })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtipo_combustible option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtipo_combustible').selectpicker('refresh');
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
												
					$("#nombre_proveedor").val(response.nombre_proveedor);
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		//AL SELECCIONAR UN CONTRATO
		$('#idtarjetas_combustible').on('change', function(){
			
			var IdTarjeta = $(this).val();	
						
			for( var i = 0; i<listaTarjetas.length; i++){
				
				if(listaTarjetas[i]['idtarjetas_combustible'] == IdTarjeta){

					$("#nombre_proveedor").val(listaTarjetas[i]['nombre_proveedor']);
					$("#nombre_vehiculo").val(listaTarjetas[i]['placa_vehiculo']);
					$("#idvehiculos").val(listaTarjetas[i]['vehiculos_idvehiculos']);
					
					initSelectSucursal("", listaTarjetas[i]['proveedores_idproveedores']);
					break;
					
				}
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
						url: 'database/FacturasGastosGet.php?action_type=edit&id='+idItem,
						success:function(data){
														
							//INICIO DE PERSONALIZACION DE CAMPOS							
							$('#fecha_factura').datepicker('update', data.fecha_factura);
							$('#kilometraje_factura').val(data.kilometraje_factura);
							$('#nro_meta').val(data.nro_meta);
							$('#nro_factura').val(data.nro_factura);
							$('#saldo_combustible').val(data.saldo_combustible);
							$('#cantidad_combustible').val(data.cantidad_combustible);
							$('#precio_unitario_combustible').val(data.precio_unitario_combustible);
							$('#importe_total_combustible').val(data.importe_total_combustible);
							$('#es_tanque_lleno').val(data.es_tanque_lleno).change();
							$('#ruc_factura').val(data.ruc_factura);
							$('#nombre_proveedor').val(data.nombre_proveedor);
							$('#direccion_proveedor').val(data.direccion_proveedor);
							
							//LLAVES
							$('#contratos_idcontratos').val(data.contratos_idcontratos);
							$('#contratos_id_item_adjudicados').val(data.contratos_id_item_adjudicados);
							
							//INICIALIZA LOS SELECT
							initSelectChofer(data.chofer_idchofer)
							initSelectCombustible(data.idtipo_combustible);
							initSelectVehiculos(data.idvehiculos);
							
							//ACTIVO EL SELECT
							$('#ruc_factura').prop('disabled', true);
	  						$('#ruc_factura').selectpicker('refresh');
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
					
					initSelectChofer("");
					initSelectCombustible("");
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
							ruc_factura: {
								required: true
							},
							nombre_proveedor: {
								required: true
							},
							direccion_proveedor: {
								required: true
							},
							nro_factura: {
								required: true
							},
							idvehiculos: {
								required: true
							},
							chofer_idchofer: {
								required: true
							},
							idtipo_combustible: {
								required: true
							},
							kilometraje_factura: {
								required: true
							},
							nro_meta: {
								required: true
							},
							cantidad_combustible: {
								required: true,
								digits: true
							},
							precio_unitario_combustible: {
								required: true,
								digits: true
							},
							importe_total_combustible: {
								required: true,
								digits: true
							},
							fecha_factura: {
								required: true
							},
							es_tanque_lleno: {
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
								console.log($("#form").serialize());
								
								if (idItem == 'nuevo' || idItem == '') {
	
									formdata = $("#form").serialize()+'&action_type=create';
									msg = "Registro guardado correctamente!";

								}else if (idItem != '' && idItem != 'nuevo') {

									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									msg = "Registro actualizado correctamente!";

								}
								
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
											url: 'database/FacturasGastosGet.php',
											data: formdata,
											success:function(data){
	
												toastIndex = toastCount++;
												toastr.options = {"positionClass": "toast-top-right"}
												var $toast = toastr["success"](msg); 
												
												$("#form")[0].reset();
												$rootScope.$state.go('private.listar_facturas_gastos');
												
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
		
		
		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		
    });
	

	
}]);
