/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarOrdenCompraController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() { 
	  
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
		var path = $rootScope.settings.uploadPathOrdenCompra;
		var formdata = "";
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		var listaContratos = new Array();
		

		$(".mask-currency").inputmask('S/ 999,999,999.99', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: true
		}); 
		
		$(".mask-numeric").inputmask({
			numericInput: true
		}); 
/*
		$('#fecha_orden_compra').datepicker({
			autoclose: true,
			endDate : new Date(),
			format: 'dd/mm/yyyy'
		});*/
		
		$('#periodo_desde').datepicker({
			autoclose: true,
			//dateITA : true,
			format: 'dd/mm/yyyy'
		});
		
		$('#periodo_hasta').datepicker({
			autoclose: true,
			//dateITA : true,
			format: 'dd/mm/yyyy'
		});
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		$("#telefono_proveedor").inputmask("mask", {
            "mask": "(99) 9999999"
        });
		
		$("#celular_proveedor").inputmask("mask", {
            "mask": "+(51) 999999999"
        });
		
		
		/***************************************/
		/*       	  CARGAR  DATOS RUC        */
		/***************************************/
		$('#ruc_proveedor').blur(function() {
			
			var ruc = $(this).val();
						
			$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/FacturasGastosGet.php?action_type=validar_ruc&ruc=' + ruc,
					success:function(data){
						
						console.log(data);
												
						if(data.status){
							$("#modal_proovedor #razon_social").val(data.ddp_nombre);
							$("#modal_proovedor #domicilio_fiscal").val(data.desc_tipvia + ' ' + data.ddp_nomvia + ' ' + data.ddp_numer1 + ', ' + data.desc_tipzon + ' ' + data.ddp_nomzon + ', ' + data.desc_dep + ', ' + data.desc_prov + ', ' + data.desc_dist);
						}else{
							$("#modal_proovedor #razon_social").val("");
							$("#modal_proovedor #domicilio_fiscal").val("");
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		});	
		
		
		
		
		$("#nro_orden_compra").change(function () {
						
			validarOrdenCompra();

        });
		
		/***************************************/
		/*  FUNCION VALIDAR NOMBRE DE USUARIO   */
		/***************************************/
		function validarOrdenCompra(){
			
				var input = $("#nro_orden_compra");
				
				if (input.val() === "") {
					input.closest('.form-group').removeClass('has-error').removeClass('has-success');
					$('.fa-check, fa-warning', input.closest('.form-group')).remove();
					$("#helper_orden_compra").addClass('hide');
					return;
				}
	
				input.addClass("spinner");
				//input.attr("readonly", true).
				//attr("disabled", true).
				//addClass("spinner");
				
				
						
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/OcGet.php?action_type=get_oc_sigap&nro_orden_compra=' + input.val(),
					success:function(response){
												
						if(response != null){
						
							input.attr("readonly", false).attr("disabled", false).removeClass("spinner");
							$("#helper_orden_compra").removeClass('hide').html(response.mensaje);
							
							if(response.authorize){
								
								$("#descripcion_orden_compra").val(response.concepto);
								$("#monto_orden_compra").val(response.importe);
								$("#fecha_orden_compra").val(response.fecha_orden);
								
								input.closest('.form-group').removeClass('has-error').addClass('has-success');
								$('.fa-warning', input.closest('.form-group')).remove();
								
							}else{
								
								input.closest('.form-group').removeClass('has-success').addClass('has-error');
								$('.fa-check', input.closest('.form-group')).remove();
								
								$("#descripcion_orden_compra").val("");
								$("#monto_orden_compra").val("");
								$("#fecha_orden_compra").val("");
								
							}
						
						}else{
							
							input.closest('.form-group').removeClass('has-success').addClass('has-error');
							$('.fa-check', input.closest('.form-group')).remove();
							
							$("#descripcion_orden_compra").val("");
							$("#monto_orden_compra").val("");
							$("#fecha_orden_compra").val("");
								
							
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
				
				

		}
		
		
		$( "#agregar_proveedor" ).click(function(){
				
				$('#modal_proovedor').modal('show');
			
		});
		
		/******************************************/
		/*         GRABAR NUEVO SERVICIO          */
		/******************************************/
				
		$("#grabar_seleccionar_nuevo_proveedor").click(function() {
			
		  var form_nuevo_proveedor = $('#form_nuevo_proveedor');
		  var error_nuevo_proveedor = $('.alert-danger', form_nuevo_proveedor);
		  
		  form_nuevo_proveedor.validate({
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
							error_nuevo_proveedor.show();
							//App.scrollTo(error_nuevo_servicio, -200);
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
		
								error_nuevo_proveedor.hide();
		
								/*****************************************************/
								/*            AGREGAR O ACTUALIZAR REGISTRO          */
								/*****************************************************/		
				
								formdata = $("#form_nuevo_proveedor").serialize()+'&action_type=create';
								msg = "Proveedor agregado correctamente!";

								$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/ProveedorGet.php',
										data: formdata,
										success:function(idNuevoProveedor){
		
											toastIndex = toastCount++;
											toastr.options = {"positionClass": "toast-top-right"}
											var $toast = toastr["success"](msg); 
											
											initProveedores(idNuevoProveedor);
											
											$("#form_nuevo_proveedor")[0].reset();
											$('#modal_proovedor').modal('hide');
		
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
		
		
		$('#tiene_contrato').on('switchChange.bootstrapSwitch', function (event, state) {
			
			var x = $(this).data('on-text');
			var y = $(this).data('off-text');
			
			if($("#tiene_contrato").is(':checked')) {
				
				$('#row_sin_contrato').addClass('hide');
				$('#row_con_contrato').removeClass('hide');
				$('#row_select_contrato').removeClass('hide');
				
				//LIMPIA LOS SELECTES				
				$('#proveedores_idproveedores').val('').selectpicker('refresh');
				$('#sedes_idsedes').val('').selectpicker('refresh');
				
				$("#tiene_contrato").val(1);
				
			}else{
				
				$('#row_sin_contrato').removeClass('hide');
				$('#row_con_contrato').addClass('hide');
				$('#row_select_contrato').addClass('hide');
				
				$('#contratos_idcontratos').val('').selectpicker('refresh');
								
				$('#razon_social').val("");
				$('#nombre_sede').val("");
				
				$('#idproveedores').val("");
				$('#idsedes').val("");
				
				$("#tiene_contrato").val(0);
				
			}
		});
		
		
		/***************************************/
		/*           GRABAR EJECUCION          */
		/***************************************/	
		$( "#cancelar_montos" ).click(function() {
		
			$('#campos_items_oc').addClass('hide');
			$('#items_buttons').addClass('hide');
		
		});
		
		//AL SELECCIONAR UN CONTRATO
		$('#contratos_idcontratos').on('change', function(){
			
			var idContrato = $(this).val();	
						
			if(idContrato != ''){
						
				for( var i = 0; i<listaContratos.length; i++){
					
					if(listaContratos[i]['idcontratos'] == idContrato){
						
						$("#razon_social").val(listaContratos[i]['razon_social']);
						$("#nombre_sede").val(listaContratos[i]['nombre_sede']);
						
						$("#idproveedores").val(listaContratos[i]['proveedores_idproveedores']);
						$("#idsedes").val(listaContratos[i]['sedes_idsedes']);
						
						break;
						
					}
					
				}
				
			
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
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		
		function initTiposMedida(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/MedidaCombustibleGet.php?action_type=list',
					success:function(response){
													
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idmedida_combustible").empty();
						$("#idmedida_combustible").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idmedida_combustible = response.data[i]['idmedida_combustible'];
							var medida_combustible = response.data[i]['medida_combustible'];
							$('#idmedida_combustible').append($('<option>', { value: idmedida_combustible, text: medida_combustible })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#idmedida_combustible option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#idmedida_combustible').selectpicker('refresh');
						}
		
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
		
		var gridItemsOrdenCompra = new Datatable();
		
		function initItemsXOrdenCompra(idOrdenCompra, tieneContrato){
						
				gridItemsOrdenCompra = $('#datatable_items_oc').DataTable({
							src: $("#datatable_items_oc"),
							"paging":   false,
							"ordering": false,
							"language": {
								"aria": {
									"sortAscending": ": activate to sort column ascending",
									"sortDescending": ": activate to sort column descending"
								},
								"emptyTable": "No hay registros disponibles en la tabla",
								"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
								"infoEmpty": "No se encontraron registros",
								"infoFiltered": "(filtered1 de _MAX_ total registros)",
								"lengthMenu": "Mostrar _MENU_ registros",
								"search": "Buscar:",
								"zeroRecords": "No se encontraron registros con los criterios de busqueda",
								"paginate": {
									"first":      "First",
									"last":       "Last",
									"next":       "Next",
									"previous":   "Previous"
								}
							},
							"info":     false,
							"sDom": '',
							"ajax": {
								url: "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=" + idOrdenCompra + '&tiene_contrato=' + tieneContrato
							},
							"footerCallback": function ( row, data, start, end, display ) {
					
									var api = this.api(), data;
						 
									// Remove the formatting to get integer data for summation
									var intVal = function ( i ) {
										return typeof i === 'string' ?
											i.replace(/[\$,]/g, '')*1 :
											typeof i === 'number' ?
												i : 0;
									};
									
									var roundVal = function (number, places) {
									   number = parseFloat(number, 10);
									   var e  = parseInt(places || 2, 10);
									   var m = Math.pow(10, e);
									   return Math.floor(number * m) / m;
									}
									
									//TOTAL GALONES
									totalSoles = api
										.column( 4, { page: 'current'} )
										.data()
										.reduce( function (a, b) {
											return intVal(a) + intVal(b);
										}, 0 );
						 
									$( api.column( 4 ).footer() ).html('S/ ' + roundVal(totalSoles,2) );									
									
									
							},
							columns: [		
										{ data : "tipo_combustible" },
										{ data : "cantidad_item", render: $.fn.dataTable.render.number(',', '.', 3, '')  },
										{ data : "medida_combustible" },
										{ data : "precio_unitario_item", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
										{ data : "importe_total_item", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },		
										{ data : "periodo_desde" },		
										{ data : "periodo_hasta" },		
										{ data : "descripcion_item_oc" },		
										{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
											  
											  	if(data['idordenes_compra_item'] == null) {
										  
												 	//return '<a href="javascript:;" data-id="' + data['idordenes_compra_item'] + '" class="btn btn-xs btn-info agregar_item"><i class="fa fa-plus"></i> AGREGAR A O/C</a>';
													return '';
														
												}else{
													
													return '<div class="btn-group">' +
														'<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> Acciones <i class="fa fa-angle-down"></i></button>' +
														 '<ul class="dropdown-menu pull-right" role="menu">' +
															'<li><a href="javascript:;" data-id="' + data['idordenes_compra_item'] + '" class="agregar_montos"><i class="fa fa-plus"></i> Modificar montos</a></li>' +
															'<li><a href="javascript:;" data-id="' + data['idordenes_compra_item'] + '" class="mt-sweetalert borrar_item_oc"><i class="fa fa-times"></i> Eliminar item</a></li>' +
														'</ul>' +
													'</div>';   	
															
												}
						
										  },
										  className: "dt-body-center"
										}
							]
							
					})
			
		}
		
		

		
		/***************************************/
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		function initTiposCombustiblesContrato(idContrato){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/ContratosGet.php?action_type=list_items_contrato&id=' + idContrato,
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#id_item_adjudicados").empty();
						$("#id_item_adjudicados").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var id_item_adjudicados = response.data[i]['id_item_adjudicados'];
							var tipo_combustible = response.data[i]['tipo_combustible'] + ' | TOTAL CONTRATADO : ' + response.data[i]['cantidad'] + ' ' + response.data[i]['medida_combustible'];
							$('#id_item_adjudicados').append($('<option>', { value: id_item_adjudicados, text: tipo_combustible })).selectpicker('refresh');
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}
		
		/***************************************/
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		function initTiposCombustibles(){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/TipoCombustibleGet.php?action_type=list',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#id_item_adjudicados").empty();
						$("#id_item_adjudicados").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipo_combustible = response.data[i]['idtipo_combustible'];
							var tipo_combustible = response.data[i]['tipo_combustible'];
							$('#id_item_adjudicados').append($('<option>', { value: idtipo_combustible, text: tipo_combustible })).selectpicker('refresh');
						}
						
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
						
		}
		
		
		

		/***************************************/
		/*       	CARGAR SELECT CONTRATOS	   */
		/***************************************/
		
		function initSelectContratos(SelectedIndex){
		
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ContratosGet.php?action_type=list',
					success:function(response){
						
						//AGREGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#contratos_idcontratos").empty();
						$("#contratos_idcontratos").append('<option value="">Seleccione un contrato</option>');
						
						for( var i = 0; i<len; i++){
							
							var idcontratos = response.data[i]['idcontratos'];
							var nombre_contrato = '#ID ' + response.data[i]['idcontratos'] + ' | ' + response.data[i]['nombre_contrato'];
							listaContratos[i] = response.data[i];
							$('#contratos_idcontratos').append($('<option>', { value: idcontratos, text: nombre_contrato })).selectpicker('refresh');
						}
						
						//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
						if(SelectedIndex != ""){
							$("#contratos_idcontratos option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
							$('#contratos_idcontratos').selectpicker('refresh');
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
	function initEditContent(){

		
		if (idItem != '' && idItem != 'nuevo') {
									
				 $.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/OcGet.php?action_type=edit&id='+idItem,
					success:function(data){
														
							//INICIO DE PERSONALIZACION DE CAMPOS
							$('#nro_orden_compra').val(data.nro_orden_compra);
							$('#descripcion_orden_compra').val(data.descripcion_orden_compra);
							$('#monto_orden_compra').val(data.monto_orden_compra);
							$('#fecha_orden_compra').val(data.fecha_orden_compra);
							$('#razon_social').val(data.razon_social);
							$('#nombre_sede').val(data.nombre_sede);
							//FIN DE PERSONALIZACION DE CAMPOS
							
							initItemsXOrdenCompra(data.idordenes_compra, data.tiene_contrato);
							
							$('#nro_orden_compra').prop('readonly', true);
							
							if(data.tiene_contrato == 1){
								
								$('#tiene_contrato').bootstrapSwitch('state', true); // true || false
								$('#tiene_contrato').bootstrapSwitch('disabled',true);
								
								initTiposCombustiblesContrato(data.contratos_idcontratos);
								initSelectContratos(data.contratos_idcontratos);
								
								$('#contratos_idcontratos').prop('disabled', true);
	  							$('#contratos_idcontratos').selectpicker('refresh');
								
							}else{
								
								initProveedores(data.proveedores_idproveedores);
								initSedes(data.sedes_idsedes);
								initTiposCombustibles();
								
								//ACTIVO EL SELECT
								$('#proveedores_idproveedores').prop('disabled', true);
	  							$('#proveedores_idproveedores').selectpicker('refresh');
								
								$('#sedes_idsedes').prop('disabled', true);
	  							$('#sedes_idsedes').selectpicker('refresh');
								
								$('#agregar_proveedor').prop('disabled', true);
																
								$('#tiene_contrato').bootstrapSwitch('disabled',true);
								
								
							}
		
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
		}else{
		
				initSelectContratos("");
				initItemsXOrdenCompra("", "");
				initProveedores("");
				initSedes("");
											
				App.blockUI({
					target: '#items_oc',
					boxed: true,
					textOnly: true,
					message: 'Esta sección esta bloqueda hasta que la orden de compra sea guardada'
				});
				
				App.blockUI({
					target: '#documentos_adjuntos',
					boxed: true,
					textOnly: true,
					message: 'Esta sección esta bloqueda hasta que la orden de compra sea guardada'
				});
		
		}

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
					contratos_idcontratos: {
						required : function(element) {
							if($("#tiene_contrato").is(':checked'))
								return true;
							else
								return false;
						}
					},
					proveedores_idproveedores: {
						required : function(element) {
							if($("#tiene_contrato").is(':checked'))
								return false;
							else
								return true;
						}
					},
					sedes_idsedes: {
						required : function(element) {
							if($("#tiene_contrato").is(':checked'))
								return false;
							else
								return true;
						}
					},
					nro_orden_compra: {
						required: true
					},
					fecha_orden_compra: {
						required: true
					},
					monto_orden_compra: {
						required: true
					},
					descripcion_orden_compra: {
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
						
						
						swal({
						  title: "CONFIRMACION REQUERIDA",
						  text: "¿Esta seguro que desea grabar la orden de compra?",
						  type: "warning",
						  showCancelButton: true,
						  confirmButtonClass: "btn-success",
						  confirmButtonText: "Si, guardar!",
						  cancelButtonText: "Cancelar",
						  closeOnConfirm: false
						},
						function(){
														
								$.ajax({dataType:'JSON',
										type: 'POST',
										url: 'database/OcGet.php',
										data: formdata,
										success:function(data){
											
												//CAMBIA EL NUEVO ID DE LA SOLICITUD
												if (idItem == 'nuevo' || idItem == ''){
													
													idItem = data;
																									
													swal({
													  title: "CONFIRMACION",
													  text: "Ahora puede adjuntar documentos a esta orden de compra. La pantalla se actualizá despues de pulsar aceptar.",
													  type: "success",
													  showCancelButton: false,
													  confirmButtonClass: "btn-sucess",
													  confirmButtonText: "Aceptar",
													  closeOnConfirm: true
													},
													function(){
														
														$rootScope.$state.go('private.registrar_oc', {"id" : idItem});
															
													});
													
												}else{
													
													switch(data.code){
								
														case "200"		:	swal("CONFIRMACION", "La evaluacion ha sido modificada.", "success");
																			break;
														
														case "1452"		:	swal("ERROR", "La evaluacion no se puede modificar ya que está asociada a otro registro. Para poder modificarla, deberá borrar todos los registros asociados a esta.", "error");
																			break;
																								
														default		:	swal("ERROR", "El registro no se puede modificar.", "error");
																					
													
													}
													
													
													
												}
										
											
										},
										error: function(xhr) { 
											console.log(xhr.statusText + xhr.responseText);
										}
								});
								
								
						});
						/*****************************************************/
						/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
						/*****************************************************/	
						
					

				}

		});

	});
	
	
	
	
	
	
	
	
	/*******************************************/
	/*      	DATATABLES Y FUNCIONES		   */
	/*******************************************/
	var tableWrapper = jQuery('#datatable_items_oc');

	tableWrapper.find('.group-checkable').change(function () {
		
		var set = jQuery(this).attr("data-set");
		var checked = jQuery(this).is(":checked");
		
		jQuery(set).each(function () {
			if (checked) {
				$(this).prop("checked", true);
				$(this).parents('tr').addClass("active");
			} else {
				$(this).prop("checked", false);
				$(this).parents('tr').removeClass("active");
			}
		});
	});

	tableWrapper.on('change', 'tbody tr .checkboxes', function () {
		$(this).parents('tr').toggleClass("active");
	});
	
	
	
	/***************************************/
	/*           GRABAR ITEMS A OC         */
	/***************************************/	
	$( "#agregar_item_oc" ).click(function() {
		
		swal({title: "CONFIRMACION REQUERIDA",
			  text: "¿Está seguro que desea agregar el item a la orden de compra?",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonClass: "btn-success",
			  confirmButtonText: "Si, grabar!",
			  cancelButtonText: "Cancelar",
			  closeOnConfirm: true
			},
			function(){
				
					$.ajax({
						url: 'database/OcGet.php',
						type: 'POST',
						data: {
							action_type: 'create_items_x_oc',
							idordenes_compra : idItem,
							tiene_contrato : ($("#tiene_contrato").is(':checked'))? "SI" : "NO",
							idtipo_combustible : $('#id_item_adjudicados').val(),
							id_item_adjudicados : $('#id_item_adjudicados').val(),
							estado_item_oc : 1
						},
						cache: false,
						success:function(response){
														
							var msg_toast_detalle = "Se registro el item a la orden de compra, con #ID " + response;
							
							toastIndex = toastCount++;
							toastr.options = {"positionClass": "toast-top-right"}
							var $toast = toastr["success"](msg_toast_detalle); 
							
							gridItemsOrdenCompra.ajax.reload();
														
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
						
				
			});
					
	});
	
	
	
	
	/*******************************/
	/*     AGREGAR MONTOS	       */
	/*******************************/
	$('#datatable_items_oc tbody').on( 'click', 'a.agregar_montos', function () { 	
		
		var data = gridItemsOrdenCompra.row( $(this).parents('tr') ).data();
				
		$('#campos_items_oc').removeClass('hide');
		$('#items_buttons').removeClass('hide');

		$('#cantidad_item').val(data.cantidad_item);
		$('#precio_unitario_item').val(data.precio_unitario_item);
		$('#importe_total_item').val(data.importe_total_item);
		
		$('#tipo_combustible').val(data.tipo_combustible);
		
		$('#descripcion_item_oc').val(data.descripcion_item_oc);
		
		$('#periodo_desde').datepicker('update', data.periodo_desde);
		$('#periodo_hasta').datepicker('update', data.periodo_hasta);
		
		
		$('#idordenes_compra_item').val(data.idordenes_compra_item);
		$('#id_item_adjudicados').val(data.id_item_adjudicados);
		
		initTiposMedida(data.idmedida_combustible);
		
	
	});
														
	
	
	/***************************************/
	/*           GRABAR EJECUCION          */
	/***************************************/	
	$( "#grabar_montos" ).click(function() {
				
			 var form_items = $('#form_items');
			 var error_items = $('.alert-danger', form_items);
	
			 form_items.validate({
	
					errorElement: 'span', 
					errorClass: 'help-block help-block-error', 
					focusInvalid: false, 
					ignore: "",  
					rules: {
						idmedida_combustible: {
							/*required : function(element) {
								if($("#tiene_contrato").is(':checked'))
									return false;
								else
									return true;
							}*/
							required: true
						},
						periodo_desde: {
							required: true,
						},
						periodo_hasta: {
							required: true,
						},
						cantidad_item: {
							required: true
						},
						precio_unitario_item: {
							required: true
						},
						importe_total_item: {
							required: true
						}
						
					},
					/*messages: {
						Fecha_Inicio:'REQUIRED!',
						Fecha_Fin:'REQUIRED!',
						chkIdioma:'REQUIRED!',
						Cod_Expediente_Interno_Caracter:'REQUIRED!',
						Fecha_Solicitud:'REQUIRED!'
					},*/
					invalidHandler: function (event, validator) { 
						error_items.show();
						App.scrollTo(error_items, -200);
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
	
							error_items.hide();
							
							/*****************************************************/
							/*            		ACTUALIZAR REGISTRO              */
							/*****************************************************/		
							
							swal({title: "CONFIRMACION REQUERIDA",
								  text: "¿Está seguro que desea grabar los montos de los items?",
								  type: "warning",
								  showCancelButton: true,
								  confirmButtonClass: "btn-success",
								  confirmButtonText: "Si, grabar!",
								  cancelButtonText: "Cancelar",
								  closeOnConfirm: true
								},
								function(){
											
										$.ajax({
											url: 'database/OcGet.php',
											type: 'POST',
											data: {
												action_type: 'update_items_x_oc',
												tiene_contrato : ($("#tiene_contrato").is(':checked'))? "SI" : "NO",
												idordenes_compra_item : $('#idordenes_compra_item').val(),
												idmedida_combustible : $('#idmedida_combustible').val(),
												cantidad_item : $('#cantidad_item').val(),
												precio_unitario_item : $('#precio_unitario_item').val(),
												importe_total_item : $('#importe_total_item').val(),
												periodo_desde : $('#periodo_desde').val(),
												periodo_hasta : $('#periodo_hasta').val(),
												descripcion_item_oc : $('#descripcion_item_oc').val()
								
											},
											cache: false,
											success:function(reponse){
												
												var msg_toast_detalle = "Se actualizaron los montos del item correctamente";
												
												toastIndex = toastCount++;
												toastr.options = {"positionClass": "toast-top-right"}
												var $toast = toastr["success"](msg_toast_detalle); 
												
												gridItemsOrdenCompra.ajax.reload();
												
												$('#campos_items_oc').addClass('hide');
												$('#items_buttons').addClass('hide');
										
												$('#cantidad_item').val("");
												$('#precio_unitario_item').val("");
												$('#importe_total_item').val("");
												$('#descripcion_item_oc').val("");
												
												$('#periodo_desde').datepicker('update', '');
												$('#periodo_hasta').datepicker('update','');
												
												$('#idordenes_compra_item').val("");
												$('#id_item_adjudicados').val("");
																			
											},
											error: function(xhr) { 
												console.log(xhr.statusText + xhr.responseText);
											}
										});
											
								});
	
							/*****************************************************/
							/*        FIN DE AGREGAR O ACTUALIZAR REGISTRO       */
							/*****************************************************/	
							
						
	
					}
	
			});
		
		
					
	});
	
	
	/*******************************/
	/*     CLICK BOTON ELIMINAR    */
	/*******************************/
	$('#datatable_items_oc tbody').on( 'click', 'a.borrar_item_oc', function () {
		
			var data = gridItemsOrdenCompra.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
								
			swal({
			  title: "CONFIRMACION REQUERIDA",
			  text: "Una vez eliminado, no será posible recuperar la información!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonClass: "btn-success",
			  confirmButtonText: "Si, eliminar",
			  cancelButtonText: "Cancelar",
			  closeOnConfirm: false
			},
			function(){
			
					/*******************************/
					/*       BORRAR REGISTRO       */
					/*******************************/
					
					formdata = '&action_type=delete_items_x_oc&id=' + data['idordenes_compra_item'];
					 
					$.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/OcGet.php',
						data : formdata,
						success:function(data){
							

							switch(data.code){
							
								case "200"		:	swal("CONFIRMACION", "El archivo adjunto  ha sido eliminado.", "success");
													gridItemsOrdenCompra.row(rowToDelete).remove().draw( false );
													break;
													
								case "1451"		:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá todos los documentos asociados a este registro.", "error");
													break;
													
								default			:	swal("ERROR", "El registro no se puede eliminar.", "error");
															
							
							}

			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					/*******************************/
					/*    FIN BORRAR REGISTRO      */
					/*******************************/
					
			});
			
	} );
	/*******************************/
	/*  FIN CLICK BOTON ELIMINAR   */
	/*******************************/	
		
	
	/*******************************/
	/*     CLICK BOTON ELIMINAR    */
	/*******************************/
	$('#datatable_adjuntos tbody').on( 'click', 'a.delete_archivo', function () {
		
			var data = gridArchivos.row( $(this).parents('tr') ).data();
			var rowToDelete = $(this).parents('tr');
							
					
			swal({
			  title: "CONFIRMACION REQUERIDA",
			  text: "Una vez eliminado, no será posible recuperar la información!",
			  type: "warning",
			  showCancelButton: true,
			  confirmButtonClass: "btn-success",
			  confirmButtonText: "Si, eliminar!",
			  cancelButtonText: "Cancelar",
			  closeOnConfirm: false
			},
			function(){
			
					/*******************************/
					/*       BORRAR REGISTRO       */
					/*******************************/
					
					formdata = '&action_type=delete_adjunto_ordencompra&id=' + data['idadjuntos_ordenes_compra'];
					 
					$.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/OcGet.php',
						data : formdata,
						success:function(data){
							

							switch(data.code){
							
								case "200"		:	swal("CONFIRMACION", "El archivo adjunto  ha sido eliminado.", "success");
													gridArchivos.row(rowToDelete).remove().draw( false );
													break;
													
								case "1451"		:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá todos los documentos asociados a este registro.", "error");
													break;
													
								default			:	swal("ERROR", "El registro no se puede eliminar.", "error");
															
							
							}

			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
					/*******************************/
					/*    FIN BORRAR REGISTRO      */
					/*******************************/
					
			});
			
	} );
	/*******************************/
	/*  FIN CLICK BOTON ELIMINAR   */
	/*******************************/	
	
	
	/*******************************************/
	/*      	    FIN TEMPLATE     		   */
	/*******************************************/
		
	var gridArchivos = new Datatable();

	function initArchivosAdjuntos(){
			
		gridArchivos = $('#datatable_adjuntos').DataTable({
						src: $("#datatable_adjuntos"),
						"paging":   false,
						"ordering": false,
						"language": {
							"aria": {
								"sortAscending": ": activate to sort column ascending",
								"sortDescending": ": activate to sort column descending"
							},
							"emptyTable": "No hay registros disponibles en la tabla",
							"info": "Mostrando _START_ al _END_ de _TOTAL_ registros",
							"infoEmpty": "No se encontraron registros",
							"infoFiltered": "(filtered1 de _MAX_ total registros)",
							"lengthMenu": "Mostrar _MENU_ registros",
							"search": "Buscar:",
							"zeroRecords": "No se encontraron registros con los criterios de busqueda",
							"paginate": {
								"first":      "First",
								"last":       "Last",
								"next":       "Next",
								"previous":   "Previous"
							}
						},
						"info":     false,
						"sDom": 'T<"clear">lrtip',
						"ajax": {
							url: "database/OcGet.php?action_type=adjuntos_x_ordencompra&id=" + idItem // ajax source
						},
								
						columns: [															
									{ data : "archivo_oc" },
									{ data : "size_archivo_oc" },
									{ 
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
				
											return '<a href=" ' + path + '/' + data['archivo_oc'] + '" data-id="' + data['idadjuntos_ordenes_compra'] + '" class="btn btn-xs btn-info" target="_blank"><i class="fa fa-download"></i> Descargar archivo</a>';   			
																
										  }
									},
									{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
				
											return '<a href="javascript:;" data-id="' + data['idadjuntos_ordenes_compra'] + '" class="mt-sweetalert delete_archivo btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar archivo</a>';   			
																
										  }
									}
						],
				})
			
	}
		
	
	/*******************************************/
	/*      	    FIN TEMPLATE     		   */
	/*******************************************/
	
	initEditContent();
	initArchivosAdjuntos();
	
	
	/*******************************************/
	/*      	    FIN TEMPLATE     		   */
	/*******************************************/
		
		
		
    });
}]);
