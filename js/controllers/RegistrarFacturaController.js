/* Setup general page controller */
angular.module('MetronicApp').controller('RegistrarFacturaController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
		/*      	  INICIO TEMPLATE   		   */
		/*******************************************/
		
		$(".mask-currency").inputmask('S/ 999,999.99', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: false
		}); 
		
		$(".mask-combustible").inputmask('999.999', {
			numericInput : true,
			autoUnmask : true,
			removeMaskOnSubmit: false
		}); 
		
		
		$(".mask-numeric").inputmask({
			numericInput: true
		}); 
		
		 $('.date-picker').datepicker({
			/*rtl: App.isRTL(),
			orientation: "left",*/
			autoclose: true
		});
		
		$('#fecha_factura').datepicker({
			autoclose: true,
			endDate : new Date()
		});
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});		
		
		/*******************************************/
		/*       INICIALIZACION DE VARIABLES       */
		/*******************************************/

		var idItem = $rootScope.$state.params.id; 
		var path = $rootScope.settings.uploadPathFacturas;
		var formdata = "";
		var shortCutFunction;
		var toastCount = 0;
		var title = "";
		var toastIndex;
		var msg ="";
		var listaOrdenCompra = new Array();
		
		
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
								url: "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=" + idOrdenCompra + "&tiene_contrato=" + tieneContrato
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
								{ data : "descripcion_item_oc" }	
							]
							
							
					})
				
			
		}
		
		
		/***************************************/
		/*       	CARGAR SELECT CONTRATOS	   */
		/***************************************/
		
		function initSelectOrdenCompra(SelectedIndex, IdSede){
		
				$.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/OcGet.php?action_type=oc_x_sede&id=' + IdSede,
				success:function(response){
						
						//AGREGA DE REGISTROS EN EL SELECT
												
						var len = response.recordsTotal;
												
						if(len < 1){
							$("#ordenes_compra_idordenes_compra").empty();
							$("#ordenes_compra_idordenes_compra").append('<option value="">No se encontraron ordenes de compra para esta sede</option>');
							$('#ordenes_compra_idordenes_compra').selectpicker('refresh');	
						}else{
								
							$("#ordenes_compra_idordenes_compra").empty();
							$("#ordenes_compra_idordenes_compra").append('<option value="">Seleccione una orden de compra</option>');
							
							for( var i = 0; i<len; i++){
								
								var idordenes_compra = response.data[i]['idordenes_compra'];
								var descripcion_orden_compra = '#OC: ' + response.data[i]['nro_orden_compra'] + ' | FECHA: ' + response.data[i]['fecha_orden_compra'] ;
								
								listaOrdenCompra[i] = response.data[i];
															
								$('#ordenes_compra_idordenes_compra').append($('<option>', { value: idordenes_compra, text: descripcion_orden_compra })).selectpicker('refresh');
							}
							
							//SI SE MANDO EL LABEL A SELECCIONAR SE CARGA
							if(SelectedIndex != ""){
								$("#ordenes_compra_idordenes_compra option").filter(function(){ return $.trim($(this).val()) ==  SelectedIndex}).prop('selected', true);
								$('#ordenes_compra_idordenes_compra').selectpicker('refresh');
							}
							
						}
						
		
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
				
		
			});
						
		}
		
		
		
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#sedes_idsedes').on('change', function(){
			var idSede = $(this).val();	
			
			if(idSede != ''){ 
			
				initSelectOrdenCompra("", idSede); 
				
				$('#ordenes_compra_idordenes_compra').prop('disabled', false);
		  		$('#ordenes_compra_idordenes_compra').selectpicker('refresh');
				
				var new_url_items = "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=0&tiene_contrato=0";
				gridItemsOrdenCompra.ajax.url(new_url_items).load();
					
			}else{
				
				$('#ordenes_compra_idordenes_compra').empty();
				$("#ordenes_compra_idordenes_compra").append('<option value="">Seleccione una orden de compra</option>');
				$('#ordenes_compra_idordenes_compra').prop('disabled', true);
		  		$('#ordenes_compra_idordenes_compra').selectpicker('refresh');	
				
				var new_url_items = "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=0&tiene_contrato=0";
				gridItemsOrdenCompra.ajax.url(new_url_items).load();
				
			}
		});	
		
		
		
		//AL SELECCIONAR UN CONTRATO
		$('#ordenes_compra_idordenes_compra').on('change', function(){

			var idOrdenCompra = $(this).val();	
			
			if(idOrdenCompra != ''){ 	
			
				for( var i = 0; i<listaOrdenCompra.length; i++){
					if(listaOrdenCompra[i]['idordenes_compra'] == idOrdenCompra){
						$("#tiene_contrato").val(listaOrdenCompra[i]['tiene_contrato']);
						break;
					}
				}	
				
				var tiene_contrato = $('#tiene_contrato').val();
						
				var new_url_items = "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=" + idOrdenCompra + '&tiene_contrato=' + tiene_contrato;
				gridItemsOrdenCompra.ajax.url(new_url_items).load();
				
			}else{
				var new_url_items = "database/OcGet.php?action_type=items_x_oc&idOrdenCompra=0&tiene_contrato=0";
				gridItemsOrdenCompra.ajax.url(new_url_items).load();
			}
		});	
		
		
		
		
		
	
		/***************************************/
		/*       	CARGAR SELECT O/C		   */
		/***************************************/
				
		function initEditContent(){
			
				if (idItem != '' && idItem != 'nuevo') {
										
					 $.ajax({
						dataType:'JSON',
						type: 'POST',
						url: 'database/FacturasGet.php?action_type=edit&id='+idItem,
						success:function(data){
										
							//INICIO DE PERSONALIZACION DE CAMPOS							
							$('#fecha_factura').datepicker('update', data.fecha_factura);
							$('#nro_factura').val(data.nro_factura);
							$('#cantidad_factura').val(data.cantidad_factura);
							$('#precio_unit_factura').val(data.precio_unit_factura);
							$('#importe_total_factura').val(data.importe_total_factura);
							$('#descrip_factura').val(data.descrip_factura);
							
							//$('#nombre_contrato').val(data.nombre_contrato);
							$('#nombre_sede').val(data.nombre_sede);
							$('#tiene_contrato').val(data.tiene_contrato);
							
							initSelectOrdenCompra(data.ordenes_compra_idordenes_compra, data.sedes_idsedes);
							
							initItemsXOrdenCompra(data.ordenes_compra_idordenes_compra , data.tiene_contrato);
														
							initSedes(data.sedes_idsedes);
							
							$('#ordenes_compra_idordenes_compra').prop('disabled', false);
		  					$('#ordenes_compra_idordenes_compra').selectpicker('refresh');
							//FIN DE PERSONALIZACION DE CAMPOS
			
						},
						error: function(xhr) { 
							console.log(xhr.statusText + xhr.responseText);
						}
					});
				
				}else{
					
					$('#ordenes_compra_idordenes_compra').prop('disabled', true);
		  			$('#ordenes_compra_idordenes_compra').selectpicker('refresh');
					
					initSelectOrdenCompra("");
					initSedes("");
					
					initItemsXOrdenCompra(0, 0);
					
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
	
	/***************************************/
	/*      FIN CARGAR SELECT CONTRATOS	   */
	/***************************************/
	
	
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
							url: "database/FacturasGet.php?action_type=adjuntos_x_factura&id=" + idItem // ajax source
						},
								
						columns: [															
									{ data : "archivo_factura" },
									{ data : "size_archivo_factura" },
									{ 
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
				
											return '<a href=" ' + path + '/' + data['archivo_factura'] + '" data-id="' + data['idadjuntos_factura'] + '" class="btn btn-xs btn-info" target="_blank"><i class="fa fa-download"></i> Descargar archivo</a>';   			
																
										  }
									},
									{
										  "mData": null,
										  "bSortable": false,
										  "mRender": function(data, type, full) {
				
											return '<a href="javascript:;" data-id="' + data['idadjuntos_factura'] + '" class="mt-sweetalert delete_archivo btn btn-xs btn-danger"><i class="fa fa-times"></i> Eliminar archivo</a>';   			
																
										  }
									}
						],
				})
			
	}
	
	
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
						
						formdata = '&action_type=delete_adjunto_factura&id=' + data['idadjuntos_factura'];
						 
						$.ajax({
							dataType:'JSON',
							type: 'POST',
							url: 'database/FacturasGet.php',
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
	/*  FIN CLICK BOTON ELIMINAR   */
	/*******************************/	

		
			

				
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
							sedes_idsedes: {
								required: true
							},
							ordenes_compra_idordenes_compra: {
								required: true
							},
							fecha_factura: {
								required: true
							},
							nro_factura: {
								required: true
							},
							cantidad_factura: {
								required: true
							},
							precio_unit_factura: {
								required: true
							},
							importe_total_factura: {
								required: true
							},
							descrip_factura: {
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
									title = "CONFIRMACION"
									msg = "La factura ha sido guardado. Ahora puede agregar archivos adjuntos en la parte inferior. La pantalla se actualizará al pulsar aceptar";
									
									//$( "#grabar" ).attr("disabled", "disabled");
	
								}else if (idItem != '' && idItem != 'nuevo') {
	
									formdata = $("#form").serialize()+'&action_type=update&id='+idItem;
									title = "CONFIRMACION"
									msg = "Toda la informacion fue actualizada correctamente.";
	
								}
																
								
								$.ajax({
										dataType:'JSON',
										type: 'POST',
										url: 'database/FacturasGet.php',
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
												
												$rootScope.$state.go('private.registrar_factura', {"id" : idItem});
													
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
		
		
		/*******************************************/
		/*      	    FIN TEMPLATE     		   */
		/*******************************************/
		
		initEditContent();
		initArchivosAdjuntos();
	
		
		
    });
}]);
