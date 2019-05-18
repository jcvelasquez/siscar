/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarOcController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		

		$(".mask-currency").inputmask('S/ 999,999,999.99', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: true
		}); 
		
		$(".mask-numeric").inputmask({
			numericInput: true
		}); 

		$('#fecha_orden_compra').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		$('.date').datepicker({
			autoclose: true
		});
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		

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
		
		
		var gridItemsOrdenCompra = new Datatable();
		
		function initItemsXOrdenCompra(idOrdenCompra){
						
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
								url: "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=" + idOrdenCompra
							},
							columns: [		
										/*{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
											  
												if(data['idordenes_compra_item'] == null) {
												  
												 return '<div><label class="mt-checkbox mt-checkbox-single mt-checkbox-outline">' +
																'<input type="checkbox" class="checkboxes" value="' + data['idordenes_compra_item'] + '" /><span></span>' +
														'</label></div>';
														
												}else{
													
													return data['idordenes_compra_item'];
															
												}
						  
										  },
										  className: "dt-body-center"
										},	*/
										{ data : "tipo_combustible" },
										{ data : "cantidad_item"  },
										{ data : "medida_combustible" },
										{ data : "precio_unitario_item" },
										{ data : "importe_total_item" },		
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
															'<li><a href="javascript:;" data-id="' + data['idordenes_compra_item'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar item</a></li>' +
														'</ul>' +
													'</div>';   	
															
												}
												
												
													
											 			
																
										  },
										  className: "dt-body-center"
										}
							]
							
							
					})
				
			
		}
		
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#contratos_idcontratos').on('change', function(){
			
			var idContrato = $(this).val();	
			
			if(idContrato != ''){
						
				for( var i = 0; i<listaContratos.length; i++){
					
					if(listaContratos[i]['idcontratos'] == idContrato){
						$("#razon_social").val(listaContratos[i]['razon_social']);
						$("#nombre_sede").val(listaContratos[i]['nombre_sede']);
						break;
						
					}
				}
											
			}
						
		});	
		
		
		
		/***************************************/
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		function initTiposCombustibles(idContrato){
			
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
							$('#fecha_orden_compra').datepicker('update', data.fecha_orden_compra);
							$('#razon_social').val(data.razon_social);
							$('#nombre_sede').val(data.nombre_sede);
							//FIN DE PERSONALIZACION DE CAMPOS
							
							initSelectContratos(data.contratos_idcontratos);
							initItemsXOrdenCompra(data.idordenes_compra);
							
							initTiposCombustibles(data.contratos_idcontratos);
							
							console.log(data.contratos_idcontratos);
							
							/*
							$('#is_custom_alerta').bootstrapSwitch('state', true); // true || false
								$('#is_custom_alerta').val(data.is_custom_alerta);
							*/
					},
					error: function(xhr) { 
						console.log(xhr.statusText + xhr.responseText);
					}
				});
			
			}else{
		
				initSelectContratos("");
				initItemsXOrdenCompra("");
				
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
						required: true
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
	
	
	
														
	
	
	/***************************************/
	/*           GRABAR EJECUCION          */
	/***************************************/	
	$( "#grabar_montos" ).click(function() {
		
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
							idordenes_compra_item : $('#idordenes_compra_item').val(),
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
					
	});
		
	
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
