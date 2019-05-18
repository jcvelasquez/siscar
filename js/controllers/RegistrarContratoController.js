/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarContratoController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		var path = $rootScope.settings.uploadPathContratos;
		var formdata = "";
		var title;
		var msg;
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		
		
		$('#plazo_desde').datepicker({
			autoclose: true,
			format: 'dd/mm/yyyy'
		});
		
		$('#plazo_hasta').datepicker({
			autoclose: true,
			format: 'dd/mm/yyyy'
		});
		
		$('#fecha_contrato').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		
		function roundVal(number, places) {
		   number = parseFloat(number, 10);
		   var e  = parseInt(places || 2, 10);
		   var m = Math.pow(10, e);
		   return Math.floor(number * m) / m;
		}
		
		
		$('#cantidad').keyup(function(){
			
			var importe_total = $(this).val() * $('#precio_unitario').val();
			
			$('#precio_total').val( roundVal(importe_total, 2) );
			

		});
		
		$('#precio_unitario').keyup(function(){
			
			var importe_total = $('#cantidad').val() * $(this).val();
			
			$('#precio_total').val( roundVal(importe_total, 2) );

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
		/*      CARGAR SELECT PROVEEDORES 	   */
		/***************************************/		
		function initTiposCombustibles(SelectedIndex){
			
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					cache: false,
					url: 'database/TipoCombustibleGet.php?action_type=list&estado=1',
					success:function(response){
																			
						//CARGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#idtipo_combustible").empty();
						$("#idtipo_combustible").append('<option value="">Seleccione</option>');
						
						for( var i = 0; i<len; i++){
							var idtipo_combustible = response.data[i]['idtipo_combustible'];
							var tipo_combustible = response.data[i]['tipo_combustible'];
							$('#idtipo_combustible').append($('<option>', { value: idtipo_combustible, text: tipo_combustible })).selectpicker('refresh');
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
					url: 'database/MedidaCombustibleGet.php?action_type=list&estado=1',
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
		
		
		var gridItems = new Datatable();

		function initItemsAdjudicadosContent(){
			
			gridItems = $('#datatable_items_adjudicados').DataTable({
						src: $("#datatable_items_adjudicados"),
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
							url: "database/ContratosGet.php?action_type=list_items_contrato&id=" + idItem // ajax source
							//dataSrc: "data"
						},
								
						columns: [	
									{ data : "tipo_combustible" },
									{ data : "cantidad",  render: $.fn.dataTable.render.number(',', '.', 2, '')  },
									{ data : "medida_combustible" },
									{ data : "precio_unitario", render: $.fn.dataTable.render.number(',', '.', 10, 'S/') },
									{ data : "precio_total", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
									{ data : "ficha_tecnica" },
									{
									  "mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<a href="javascript:;" data-id="' + data['id_item_adjudicados'] + '" class="mt-sweetalert delete_item btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar tipo</a>';   			
															
									  }
									}
						],
						"footerCallback": function ( row, data, start, end, display ) {
								
								var api = this.api(), data;
					 
								var intVal = function ( i ) {
									return typeof i === 'string' ?
										i.replace(/[\$,]/g, '')*1 :
										typeof i === 'number' ?
											i : 0;
								};
					 
								totalPrecioTotal = api
									.column( 4 )
									.data()
									.reduce( function (a, b) {
										return intVal(a) + intVal(b);
									}, 0 );
					 
								totalCantidad = api
									.column( 1 )
									.data()
									.reduce( function (a, b) {
										return intVal(a) + intVal(b);
									}, 0 );
									
								/*totalUnitario = api
									.column( 3 )
									.data()
									.reduce( function (a, b) {
										return intVal(a) + intVal(b);
									}, 0 );*/
								
								//$( api.column( 1 ).footer() ).html( totalCantidad );
								//$( api.column( 3 ).footer() ).html( 'S/'+ totalUnitario );
								$( api.column( 4 ).footer() ).html( 'S/'+ totalPrecioTotal );
								
					}
				})
				
			
		}
		
		
		
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
							url: "database/ContratosGet.php?action_type=adjuntos_x_contrato&id=" + idItem // ajax source
							//dataSrc: "data"
						},
								
						columns: [															
									{ data : "archivo_contrato" },
									{ data : "size_archivo_contrato" },
									{ 
										"mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<a href=" ' + path + '/' + data['archivo_contrato'] + '" data-id="' + data['idadjuntos_contratos'] + '" class="btn btn-xs btn-info" target="_blank"><i class="fa fa-download"></i> Descargar archivo</a>';   			
															
									  }
									},
									{
									  "mData": null,
									  "bSortable": false,
									  "mRender": function(data, type, full) {
			
										return '<a href="javascript:;" data-id="' + data['idadjuntos_contratos'] + '" class="mt-sweetalert delete_archivo btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar archivo</a>';   			
															
									  }
									}
						],
				})
				
			
		}
					
						
				
		/***************************************/
		/*       CARGAR REGISTRO A EDITAR      */
		/***************************************/		
		
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
						
					//CAMPOS DE EDICION							
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/ContratosGet.php?action_type=edit&id='+idItem,
						success:function(data){
			
							//INICIO DE PERSONALIZACION DE CAMPOS
							
							$('#nombre_contrato').val(data.nombre_contrato);
							$('#nro_contrato').val(data.nro_contrato);
							$('#monto_contrato').val(data.monto_contrato);
							
							$('#plazo_desde').datepicker('update', data.plazo_desde);
							$('#plazo_hasta').datepicker('update', data.plazo_hasta);
							
							$('#fecha_contrato').datepicker('update', data.fecha_contrato);
							
							initSedes(data.sedes_idsedes);
							initProveedores(data.proveedores_idproveedores);
							
							initTiposCombustibles("");
							initTiposMedida("");
							//initTiposCombustibles()
							//FIN DE PERSONALIZACION DE CAMPOS
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
							
				
				}else{
					initSedes("");
					initProveedores("");
					initTiposCombustibles("");
					initTiposMedida("");
					
					App.blockUI({
						target: '#items_adjudicados',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que el contrato sea guardado'
					});
					
					App.blockUI({
						target: '#documentos_adjuntos',
						boxed: true,
						textOnly: true,
						message: 'Esta sección esta bloqueda hasta que el contrato sea guardado'
					});
		
		
				}
				
				/***************************************/
				/*   FIN DE  CARGAR REGISTRO A EDITAR   */
				/***************************************/					
			
		}
				
		/******************************************/
		/*          VALIDAR NRO CONTRATO          */
		/******************************************/
		$("#nro_contrato").focusout(function(e) {
			
			var nro_contrato = $(this).val();
			
			$.ajax({
				
					dataType:'JSON',
					type: 'POST',
					url: 'database/ContratosGet.php?action_type=validate&nro_contrato='+nro_contrato,
					success:function(data){

							if(data =="error" ){
								
								swal("# Contrato duplicado", "Al parecer este contrato ya ha sido ingresado anteriormente. Verificar!", "error");
								$("#nro_contrato").closest('.form-group').addClass('has-error'); 

							}else{
								$("#nro_contrato").closest('.form-group').removeClass('has-error'); 
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
		$( "#grabar" ).click(function() {

				 var form1 = $('#form');
				 var error1 = $('.alert-danger', form1);

				 form1.validate({

						errorElement: 'span', 
						errorClass: 'help-block help-block-error', 
						focusInvalid: false, 
						ignore: "",  
						rules: {
							sedes_idsedes: {
								required: true
							},
							proveedores_idproveedores: {
								required: true
							},
							nombre_contrato: {
								required: true
							},
							nro_contrato: {
								required: true
							},
							monto_contrato: {
								required: true,
								min: 1
							},
							fecha_contrato: {
								required: true
							},
							plazo_desde: {
								required: true
							},
							plazo_hasta: {
								required: true
							},
							/*"idtipo_combustible[]": {
								required: true
							}*/
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
									title = "CONFIRMACION"
									msg = "El contrato ha sido guardado. Ahora puede agregar items adjudicados y archivos adjuntos en la parte inferior.";
										
								}else if (idItem != '' && idItem != 'nuevo') {
	
									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									title = "CONFIRMACION"
									msg = "Toda la informacion fue actualizada correctamente.";
	
								}
								
																
								$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/ContratosGet.php',
										data: formdata,
										success:function(data){
											
											//CAMBIA EL NUEVO ID DEL CONTRATO
											
											if (idItem == 'nuevo' || idItem == '') idItem = data;
																																										
											swal({
											  title: title,
											  text: msg,
											  type: "success",
											  showCancelButton: false,
											  confirmButtonClass: "btn-sucess",
											  confirmButtonText: "Aceptar",
											  closeOnConfirm: true
											},
											function(){
											
												App.unblockUI('#documentos_adjuntos');
												App.unblockUI('#items_adjudicados');
												
												$rootScope.$state.go('private.registrar_contrato', {"id" : idItem});
													
											});
											
												
											
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
				
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
		var form_items = $('#form_items');
		var error_items = $('.alert-danger.items', form_items);
				
		form_items.validate({
				errorElement: 'span', 
				errorClass: 'help-block help-block-error', 
				focusInvalid: false, 
				ignore: "",  
				rules: {
					idtipo_combustible: {
						required: true
					},
					cantidad: {
						required: true,
					},
					idmedida_combustible: {
						required: true
					},
					precio_unitario: {
						required: true,
					},
					precio_total: {
						required: true,
					},
					ficha_tecnica: {
						required: true
					}
				},

				invalidHandler: function (event, validator) { 
					error_items.show();
					App.scrollTo(error_items, -55);
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
						/*            	  GRABAR ITEMS ADJUDICADOS           */
						/*****************************************************/		
						
						formdata = $("#form_items").serialize()+'&action_type=create_items_adjudicados&contratos_idcontratos=' + idItem;
						msg = "Items adjudicados guardados correctamente!";
						
						$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/ContratosGet.php',
								data: formdata,
								success:function(data){

									toastIndex = toastCount++;
									toastr.options = {"positionClass": "toast-top-right"}
									var $toast = toastr["success"](msg); 
									
									$("#form_items")[0].reset();
									
									$("#idtipo_combustible option").selectpicker('deselectAll');
									$('#idtipo_combustible').selectpicker('refresh');
									
									$("#idmedida_combustible option").selectpicker('deselectAll');
									$('#idmedida_combustible').selectpicker('refresh');
									
									
									var new_url_items = "database/ContratosGet.php?action_type=list_items_contrato&id=" + idItem
									
									gridItems.ajax.url(new_url_items).load();
																				
									
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
		
		
		
		/**********************************************/
		/*            GRABAR ITEMS ADJUDICADOS		  */
		/**********************************************/
		$( "#grabar_items" ).click(function(e) {
						
						var idTipoCombustible = $('#idtipo_combustible').find("option:selected").val();
						
						var existe = false;
						
						if(idTipoCombustible != ""){
							
							//LEO TODAS LAS FILAS DE LA TABLA PARA SABER SI YA EXISTE UNO IGUAL			
							gridItems.rows().every( function ( rowIdx, tableLoop, rowLoop ) {
									
								var rowData = gridItems.row( rowIdx ).data();
								
								if(idTipoCombustible == rowData['idtipo_combustible']) existe = true;
								
							});
															
							if(!existe){	
							
								$('#form_items').submit();									
							
							}else{
								swal("ERROR", "Este tipo de combustible ya fue agregado previamente.", "error");
							}
							
						}else{
							swal("ERROR", "Seleccione un tipo de combustible para agregar a la lista.", "error");
						}
						
				 

		});
		
		/*************************************************/
		/*            VALIDAR ITEMS ADJUDICADOS          */
		/*************************************************/
				
				
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
							
							formdata = '&action_type=delete_adjunto_contrato&id=' + data['idadjuntos_contratos'];
							 
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/ContratosGet.php',
								data : formdata,
								success:function(data){
									

									switch(data.code){
									
										case "200"		:	swal("CONFIRMACION", "El archivo adjunti  ha sido eliminado.", "success");
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
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_items_adjudicados tbody').on( 'click', 'a.delete_item', function () {
			
			var data = gridItems.row( $(this).parents('tr') ).data();
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
							
							formdata = '&action_type=delete_item_contrato&id=' + data['id_item_adjudicados'];
							 
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/ContratosGet.php',
								data : formdata,
								success:function(data){
									
									switch(data.code){
									
										case "200"		:	swal("CONFIRMACION", "El item adjudicado ha sido eliminado satisfactoriamente.", "success");
															gridItems.row(rowToDelete).remove().draw( false );
															break;
															
										case "1451"		:	swal("ERROR", "El item adjudicado no se puede eliminar porque está asociado a otro registro. Para poder eliminar el itemn adjudicado, deberá eliminar todos los registros asociados a este.", "error");
															break;
															
										default			:	swal("ERROR", "El item adjudicado no se puede eliminar.", "error");
																	
									
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
				
				
				
		//SE INICIAN LAS FUNCIONES
		initEditContent();
		initItemsAdjudicadosContent();
		initArchivosAdjuntos();
				

		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		
    });
}]);
