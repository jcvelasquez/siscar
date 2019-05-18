/* Setup general page controller */
angular.module('MetronicApp').controller('ListarContratosController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
    $scope.$on('$viewContentLoaded', function() {   
    	// initialize core components
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
				
		$('.date-picker').datepicker({
			autoclose: true
		});

								
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-calendar'
		});
										
		/***************************************/
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/
		$.ajax({
			dataType:'JSON',
			type: 'POST',
			url: 'database/SedesGet.php?action_type=list',
			success:function(response){
											
				//CARGA DE REGISTROS EN EL SELECT
				var len = response.data.length;
				
				$("#sedes_idsedes").empty();
				$("#sedes_idsedes").append('<option value="all" selected="selected">TODAS</option>');
				
				for( var i = 0; i<len; i++){
					var idsedes = response.data[i]['idsedes'];
					var nombre_sede = response.data[i]['nombre_sede'];
												
					$('#sedes_idsedes').append($('<option>', { value: idsedes, text: nombre_sede })).selectpicker('refresh');
				}

			},
			error: function(xhr) { 
				console.log(xhr.statusText + xhr.responseText);
			}
		});
		
		/***************************************/
		/*    	    FIN SELECT CARGA		   */
		/***************************************/
							
			var grid = new Datatable();
			
			grid.init({
				src: $("#datatable_contratos"),
				onSuccess: function (grid) {
					
				},
				onError: function (grid) {
				},
				loadingMessage: 'Cargando...',
				dataTable: { 
					"language": {
						"aria": {
							"sortAscending": ": activate to sort column ascending",
							"sortDescending": ": activate to sort column descending"
						},
						"emptyTable": "No se encontraron registros en la tabla",
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
					
					"bStateSave": true, 
					"buttons": [
					{ 
							extend: 'print', 
							//message: 'This print was produced using the Print button for DataTables',
							className: 'btn default',
							autoPrint: true,
							orientation: 'landscape',
							stripHtml: true,
							exportOptions: {
								columns: [0,1,2,3,4,5,6]
							},
							customize: function (win) {
								$(win.document.body).find('*').addClass('display').css('font-size', '10px');
								$(win.document.body).find('td').each(function(index){
									$(this).css('padding','5px');
								});
								$(win.document.body).find('tr:nth-child(odd) td').each(function(index){
									$(this).css('background-color','#D0D0D0');
								});
								$(win.document.body).find('h1').css('text-align','center');
								$(win.document.body).find('table').addClass('compact').css('font-size', 'inherit');
							}
						},
						{ 
							extend: 'copy', 
							className: 'btn default',
							exportOptions: {
								columns: [0,1,2,3,4,5,6]
							} 
						},
						{ 
							extend: 'pdf', 
							orientation: 'landscape',
							className: 'btn default',
							orientation: 'landscape',
							exportOptions: {
								columns: [0,1,2,3,4,5,6]
							}
						},
						{ 
							extend: 'excel',
							className: 'btn default',
							exportOptions: {
								columns: [0,1,2,3,4,5,6]
							}
						},
						{ 
							extend: 'csv',
							className: 'btn default',
							exportOptions: {
								columns: [0,1,2,3,4,5,6]
							}	
						},
						{
							text: 'Reload',
							className: 'btn default',
							action: function ( e, dt, node, config ) {
								dt.ajax.reload();
								swal("Actualizada!", "El listado de contratos se actualizo correctamente.", "success");
							}
						}
					],
					"sDom": 'T<"clear">lfrtip',
					"dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
					//"sPlaceHolder": "head:after",
					"lengthMenu": [
						[10, 20, 50, -1],
						[10, 20, 50, "Todo"] 
					],
					"processing": true,
					"pageLength": 10, 
					"ajax": {
						url: "database/ContratosGet.php?action_type=list",
						dataSrc: "data"
					},
					columns: [
									
							{
								  "mData": null,
								  "bSortable": false,
								  "mRender": function(data, type, full) {
											return '<a href=#/private/registrar_contrato/' + data['idcontratos'] + '>' + data['nro_contrato'] + '</a>';
														
								  }
							},		
							{ data : "nombre_contrato" },
							{ data : "fecha_contrato" },
							{ data : "nombre_sede" },
							{ data : "monto_contrato", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
							{ data : "plazo_desde" },
							{ data : "plazo_hasta" },
							{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
	
								return '<div class="btn-group">' +
											'<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"><i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
											 '<ul class="dropdown-menu pull-right" role="menu">' +
												'<li><a href=#/private/registrar_contrato/' + data['idcontratos'] + '><i class="fa fa-pencil"></i> Editar contrato</a></li>' +
												'<li><a href="javascript:;" data-id="' + data['idcontratos'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar contrato</a></li>' +
												'<li class="divider"></li>' +
												'<li><a data-target="#oc_asociadas" class="modal_oc" data-toggle="modal" data-id="' + data['idcontratos'] + '"> <i class="fa fa-external-link"></i> Ver O/C asociadas</a></li>' +
												<!--'<li><a href=#/private/avance_contrato/' + data['idcontratos'] + '> <i class="fa fa-signal"></i> Ver avance contrato</a></li>' +-->
											'</ul>' +
										'</div>';               
							  }
							}
							
							
							
					]
					
				}
			});
					
				
			// handle datatable custom tools
			$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
				var action = $(this).attr('data-action');
				grid.getDataTable().button(action).trigger();
			});
			
			
			
			
			$("#filtrar").click(function() { 
			
					var formData = $("#form_search").serialize();
					var new_url = "database/ContratosGet.php?" + $("#form_search").serialize() + "&action_type=search"

					grid.getDataTable().ajax.url(new_url).load();
					
			});
			
			$("#limpiar").click(function() { 
			
				$('#sedes_idsedes').val("all");
				$('#sedes_idsedes').selectpicker('refresh')
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
				
			
				var formData = $("#form_search").serialize();
				var new_url = "database/ContratosGet.php?" + $("#form_search").serialize() + "&action_type=search";
				
				grid.getDataTable().ajax.url(new_url).load();
				
			});
						
						
			/*******************************/
			/*     CLICK BOTON ELIMINAR    */
			/*******************************/
			$('#datatable_contratos tbody').on( 'click', 'a.mt-sweetalert', function () {
				
				var data = grid.getDataTable().row( $(this).parents('tr') ).data();
				var rowToDelete = $(this).parents('tr');
								
					swal({
					  title: "¡Esta seguro?",
					  text: "Una vez eliminada, no será posible recuperar la información!",
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
							$.ajax({
								dataType:'JSON',
								type: 'POST',
								url: 'database/ContratosGet.php?action_type=delete&id='+data['idcontratos'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("CONFIRMACION", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("ERROR", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá eliminar todos los documentos asociados a este registro.", "error");
														break;
															
										default		:	swal("ERROR", "El registro no se puede eliminar.", "error");

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
		/*      	 	 ABRIR MODAL     		   */
		/*******************************************/
		var gridSeleccionados;
		 
		$('#datatable_contratos tbody').on( 'click', 'a.modal_oc', function () {
			
			if(gridSeleccionados) gridSeleccionados.destroy();
			
			var idContrato = $(this).data("id");
			var montoContrato;
			
			//CARGAR CABECERA						
			 $.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/ContratosGet.php?action_type=edit&id='+idContrato,
				success:function(data){
	
					//INICIO DE PERSONALIZACION DE CAMPOS
					$("#descripcion_contrato").val(data.nombre_contrato);
					$("#nro_contrato").val(data.nro_contrato);
					$("#monto_contrato").val(data.monto_contrato);
					$("#fecha_contrato").val(data.fecha_contrato);
					//$("#fecha_oc").val(data.fecha_contrato);
					
					montoContrato = data.monto_contrato;
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			
			gridSeleccionados = $('#datatable_oc').DataTable({
										src: $("#datatable_oc"),
										"paging":   false,
										"ordering": false,
										"info":     false,
										"sDom": 'T<"clear">lrtip',
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
										"ajax": {
											url: "database/OcGet.php?action_type=oc_x_contrato&id=" + idContrato
										},	
										"autoWidth" : false,			
										columns: [	
											{ data : "idordenes_compra", className : 'dt-center' },
											{ data : "nro_orden_compra" },
											{ data : "descripcion_orden_compra" },
											{ data : "monto_orden_compra" , render: $.fn.dataTable.render.number(',', '.', 2, 'S/ ') },
											{ data : "fecha_orden_compra" }
										],
										"footerCallback": function ( row, data, start, end, display ) {
												
												var api = this.api(), data;
									 
												// Remove the formatting to get integer data for summation
												var intVal = function ( i ) {
													return typeof i === 'string' ?
														i.replace(/[\$,]/g, '')*1 :
														typeof i === 'number' ?
															i : 0;
												};
									 
												// Total over all pages
												total = api
													.column( 3 )
													.data()
													.reduce( function (a, b) {
														return intVal(a) + intVal(b);
													}, 0 );
									 
												
									 
												// Update footer
												$( api.column( 3 ).footer() ).html(
													'S/ '+total // +' ( $'+ total +' total)'
												);
												
												//MOSTRAR ESTADO DE CUADRE
												/*if(total < 1){
													$('#estado_contrato').addClass('label-danger').html("NO DISPONIBLE");
												}else if(montoContrato != total){
													$('#estado_contrato').addClass('label-danger').html("NO CUADRADO");
												}else{
													$('#estado_contrato').addClass('label-success').html("CUADRADO");
												}*/
												//monto_facturas montoOc
												
										}
									})
				
			
		});
		
		/*******************************************/
		/*      	  	FIN MODAL   		 	   */
		/*******************************************/
		
						
			
	
		/*******************************************/
		/*      	  	FIN TEMPLATE   		 	   */
		/*******************************************/
	
	
	
	
		
    });
}]);
