/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarTicketController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
    	//DATOS DE LOGIN PARA TODAS LAS PAGINAS
		App.initAjax();
		AppSiscar.initAjax();
		
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
			
		$(".mask-currency").inputmask('S/ 999,999.99', {
			numericInput : true,
			autoUnmask : true
			//removeMaskOnSubmit: true
		}); 
		
		$(".mask-kilometraje").inputmask('999,999', {
			numericInput : true,
			autoUnmask : true
			//removeMaskOnSubmit: true
		}); 
		
		$(".mask-numeric").inputmask({
			numericInput: true
		}); 
		
		$(".mask-combustible").inputmask('999.999', {
			numericInput : true,
			autoUnmask : true
			//removeMaskOnSubmit: true
		}); 
		
		 $('#fecha_ticket').datepicker({
			orientation: "left",
			autoclose: true,
			format: 'dd/mm/yyyy',
			endDate: new Date()
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
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#idtarjetas_combustible').on('change', function(){
			
			var IdTarjeta = $(this).val();	
						
			for( var i = 0; i<listaTarjetas.length; i++){
				
				if(listaTarjetas[i]['idtarjetas_combustible'] == IdTarjeta){

					$("#razon_social").val(listaTarjetas[i]['razon_social']);
					$("#nombre_vehiculo").val(listaTarjetas[i]['placa_vehiculo']);
					$("#pk_idvehiculos").val(listaTarjetas[i]['vehiculos_idvehiculos']);
					$("#pk_sedes").val(listaTarjetas[i]['sedes_idsedes']);
					
					initSelectSucursal("", listaTarjetas[i]['proveedores_idproveedores']);
					break;
					
				}
			}
						
		});
		
		//AL SELECCIONAR UN CONTRATO
		$('#sedes_idsedes').on('change', function(){
			var idSede = $(this).val();	
			
			if(idSede != ''){ 
				initSelectVehiculos("", idSede); 
				$("#pk_sedes").val(idSede);
			}else{
				$('#idvehiculos').empty();
				$("#idvehiculos").append('<option value="">Seleccione una sede</option>');
				$('#idvehiculos').prop('disabled', true);
		  		$('#idvehiculos').selectpicker('refresh');	
			}
		});	
		
		//AL SELECCIONAR UN CONTRATO
		$('#proveedores_idproveedores').on('change', function(){
			
			var idProveedor = $(this).val();	
			
			if(idProveedor != ''){ 
				initSelectSucursal("", idProveedor);
			}else{
				$('#idsucursales').empty();
				$("#idsucursales").append('<option value="">Seleccione una sede</option>');
				$('#idsucursales').prop('disabled', true);
		  		$('#idsucursales').selectpicker('refresh');	
			}
		});	
		
		//AL SELECCIONAR UN CONTRATO
		$('#idvehiculos').on('change', function(){
			idVehiculo = $(this).val();	
			$("#pk_idvehiculos").val(idVehiculo);
		});	
		
		
		/***************************************/
		/*       	  CARGAR  CONTRATOS	       */
		/***************************************/
		var listaTarjetas = new Array();
		var idProveedor;
		
		$('#es_ticket').on('switchChange.bootstrapSwitch', function (event, state) {
			
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#es_ticket").is(':checked')) {
								
				//$('#sede_vale').addClass('hide');
				$('#row_tarjeta').removeClass('hide');
				$('#row_tarjeta_datos').removeClass('hide');
				
				$('#row_sede_vehiculo').addClass('hide');
				
				$('#field_tarjeta').removeClass('hide');
				$('#field_proveedor').addClass('hide');
				
				
				
				//LIMPIA LOS SELECTES				
				$('#sedes_idsedes').val('').selectpicker('refresh');
				
				$("#es_ticket").val(1);
				
			}else{
				
				//$('#sede_vale').removeClass('hide');
				$('#row_tarjeta').addClass('hide');
				$('#row_tarjeta_datos').addClass('hide');
				$('#row_sede_vehiculo').removeClass('hide');
				
				$('#idtarjetas_combustible').val('').selectpicker('refresh');
				$('#idsucursales').val('').selectpicker('refresh');
				
				//OCULTA LA TARJETA
				$('#field_tarjeta').addClass('hide');
				$('#field_proveedor').removeClass('hide');
								
				$('#razon_social').val("");
				$('#nombre_vehiculo').val("");
				$("#pk_idvehiculos").val("");
				$("#pk_sedes").val("");
				
				$("#es_ticket").val(0);
				
			}
		});
		
		
		/***************************************/
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/		
		function initSedes(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/SedesGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#sedes_idsedes").empty();
						$("#sedes_idsedes").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idsedes = response.data[i]['idsedes'];
							var nombre_sede = response.data[i]['nombre_sede'];
							$('#sedes_idsedes').append($('<option>', { value: idsedes, text: nombre_sede })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#sedes_idsedes option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#sedes_idsedes').selectpicker('refresh');
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
				url: 'database/ChoferesGet.php?action_type=list&estado=1',
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
		/*       	CARGAR  SUCURSAL           */
		/***************************************/
		function initSelectSucursal(SelectedIndex, IdProveedor){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/SucursalGet.php?action_type=sucursales_x_proveedor&id=' + IdProveedor,
					success:function(response){
						
						var len = response.data.length;
						
						$("#idsucursales").empty();
						$("#idsucursales").append('<option value="">Seleccione una sucursal</option>');
						
						for( var i = 0; i<len; i++){
							var idsucursales = response.data[i]['idsucursales'];
							var nombre_sucursal = response.data[i]['nombre_sucursal'];
														
							$('#idsucursales').append($('<option>', { value: idsucursales, text: nombre_sucursal })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						$('#idsucursales').prop('disabled', false);
	  					$('#idsucursales').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idsucursales option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idsucursales').selectpicker('refresh');
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
												
					$("#razon_social").val(response.razon_social);
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
		}
		
		
		/***************************************/
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		function initProveedores(SelectedIndex){
			
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ProveedorGet.php?action_type=list&estado=1',
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
		
		
		/***************************************/
		/*       	  CARGAR  VEHICULOS        */
		/***************************************/
		function initSelectVehiculos(SelectedIndex, IdSede){


			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/VehiculosGet.php?action_type=vehiculo_x_sede&id=' + IdSede,
				success:function(response){
					
					//CARGA DE REGISTROS EN EL SELECT
					var len = response.data.length;
					
					$("#idvehiculos").empty();
					$("#idvehiculos").append('<option value="">Seleccione un vehiculo</option>');
					
					for( var i = 0; i<len; i++){
						var idvehiculos = response.data[i]['idvehiculos'];
						var nombre_vehiculo = response.data[i]['marca_vehiculo'] + ' | ' + response.data[i]['modelo_vehiculo'] + ' | ' + response.data[i]['placa_vehiculo'];
													
						$('#idvehiculos').append($('<option>', { value: idvehiculos, text: nombre_vehiculo })).selectpicker('refresh');
					}
					//FIN CARGA DE REGISTROS EN EL SELECT
					
					$('#idvehiculos').prop('disabled', false);
		  			$('#idvehiculos').selectpicker('refresh');
				
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
		/*       	CARGAR  TARJETAS           */
		/***************************************/
		function initSelectTarjetas(SelectedIndex){
				
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/TarjetasCombustibleGet.php?action_type=list&estado=1',
					success:function(response){
						
						var len = response.data.length;
												
						$("#idtarjetas_combustible").empty();
						$("#idtarjetas_combustible").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtarjetas_combustible = response.data[i]['idtarjetas_combustible'];
							var nro_tarjeta = response.data[i]['nro_tarjeta'];
							listaTarjetas[i] = response.data[i];
														
							$('#idtarjetas_combustible').append($('<option>', { value: idtarjetas_combustible, text: nro_tarjeta })).selectpicker('refresh');
						}
						
						//ACTIVO EL SELECT
						//$('#idtarjetas_combustible').prop('disabled', false);
	  					//$('#idtarjetas_combustible').selectpicker('refresh');
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idtarjetas_combustible option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idtarjetas_combustible').selectpicker('refresh');
						}
						
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});	
				
		}
		
		
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/
		
		function initContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
					
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/TicketsGet.php?action_type=edit&id='+idItem,
						success:function(data){
																					
							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#fecha_ticket').datepicker('update', data.fecha_ticket);
							$('#hora_ticket').val(data.hora_ticket);
							$('#kilometraje').val(data.kilometraje);
							$('#nro_ticket').val(data.nro_ticket);
							$('#saldo_combustible').val(data.saldo_combustible);
							$('#cantidad_combustible').val(data.cantidad_combustible);
							$('#precio_unitario_combustible').val(data.precio_unitario_combustible);
							$('#importe_total_combustible').val(data.importe_total_combustible);
							$('#es_tanque_lleno').val(data.es_tanque_lleno).change();
							
							//LLAVES
							$('#contratos_idcontratos').val(data.contratos_idcontratos);
							$('#id_item_adjudicados').val(data.id_item_adjudicados);
							
							//INICIALIZA LOS SELECT
							initSelectChofer(data.chofer_idchofer);
							initSelectVehiculos(data.idvehiculos, data.sedes_idsedes);
							initSedes(data.sedes_idsedes);
							initProveedores(data.proveedores_idproveedores);
							
							if(data.es_ticket == 1){
								
								$('#es_ticket').bootstrapSwitch('state', true); // true || false
								$('#es_ticket').bootstrapSwitch('disabled',true);
								
							}
							
							initSelectCombustible(data.idtipo_combustible);
							initSelectTarjetas(data.idtarjetas_combustible);
							initSelectSucursal(data.idsucursales, data.proveedores_idproveedores);
							initLabelProveedor(data.contratos_idcontratos);
							initLabelVehiculo(data.idtarjetas_combustible);
							
							$("#pk_idvehiculos").val(data.idvehiculos);
							$("#pk_sedes").val(data.sedes_idsedes);
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
					
					//DESACTIVO LAS SUCURSALES HASTA QUE SELECCIONE UNO
					$('#idsucursales').prop('disabled', true);
					$('#idsucursales').selectpicker('refresh');
					
					initSelectChofer("");
					initSelectCombustible("");
					initSelectTarjetas("");
					initSedes("");
					initSelectVehiculos("");
					initProveedores("");
					
				}
			
		}
				
				
		
		

		function initLabelVehiculo(IdTarjeta){
			
			/***************************************/
			/*       	CARGAR LABEL VEHICULO	   */
			/***************************************/
			$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/VehiculosGet.php?action_type=vehiculo_x_tarjeta&id=' + IdTarjeta,
				success:function(response){
																						
					$("#nombre_vehiculo").val(response.placa_vehiculo);
					//$("#pk_idvehiculos").val(response.vehiculos_idvehiculos);
					$("#contratos_idcontratos").val(response.contratos_idcontratos);
					$("#contratos_id_item_adjudicados").val(response.id_item_adjudicados);
																	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			/***************************************/
			/*    	    FIN SELECT CARGA		   */
			/***************************************/
			
		}
		
			
				
		/******************************************/
		/*            VALIDAR FORMULARIO          */
		/******************************************/
		

		$( ".grabar" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

				var validatorForm = form1.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							idvehiculos: {
								required : function(element) {
									if($("#es_ticket").is(':checked'))
										return false;
									else
										return true;
								}
							},
							idtipo_combustible: {
								required : function(element) {
									if($("#es_ticket").is(':checked'))
										return true;
									else
										return false;
								}
							},
							idtarjetas_combustible: {
								required : function(element) {
									if($("#es_ticket").is(':checked'))
										return true;
									else
										return false;
								}
							},
							proveedores_idproveedores: {
								required : function(element) {
									if($("#es_ticket").is(':checked'))
										return false;
									else
										return true;
								}
							},
							idsucursales: {
								required: true
							},
							
							chofer_idchofer: {
								required: true
							},
							nro_ticket: {
								required: true
							},
							fecha_ticket: {
								required: true
							},
							hora_ticket: {
								required: true
							},
							cantidad_combustible: {
								required: true
							},
							precio_unitario_combustible: {
								required: true
							},
							saldo_combustible: {
								required: true
							},
							importe_total_combustible: {
								required: true
							},
							kilometraje: {
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
							//console.log($(element));
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
																
								
								swal({
								  title: "CONFIRMACION REQUERIDA",
								  text: "¿Esta seguro que desea guardar el ticket?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, guardar",
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
											url: 'database/TicketsGet.php',
											data: formdata,
											success:function(data){
																									
												toastIndex = toastCount++;
												toastr.options = {"positionClass": "toast-top-right"}
												var $toast = toastr["success"](msg); 
												
												$rootScope.$state.go('private.listar_tickets');
												
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
		
		initContent();	
		
		
    });
	

	
}]);
