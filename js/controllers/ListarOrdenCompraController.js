/* Setup general page controller */
angular.module('MetronicApp').controller('ListarOrdenCompraController', ['$rootScope', '$scope', 'settings', function($rootScope, $scope, settings) {
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
			autoclose: true,
			format: 'dd/mm/yyyy',
			todayHighlight: true,
			todayBtn: true
		});
		
		$('.bs-select').selectpicker({
			iconBase: 'fa',
			tickIcon: 'fa-check'
		});
		
		$("#limpiar").click(function() { 
			
				$('#sedes_idsedes').val("all");
				$('#sedes_idsedes').selectpicker('refresh');
				
				$('#desde').val('').datepicker('update');
				$('#hasta').val('').datepicker('update');
			
				var formData = $("#form_search").serialize();
				var new_url = "database/OcGet.php?" + $("#form_search").serialize() + "&action_type=list";
				
				grid.getDataTable().ajax.url(new_url).load();
				
		});
		
		$("#filtrar").click(function() { 
				var formData = $("#form_search").serialize();
				var new_url = "database/OcGet.php?" + $("#form_search").serialize() + "&action_type=list";
				
				grid.getDataTable().ajax.url(new_url).load();
				
		});
			
        var grid = new Datatable();

        grid.init({
            src: $("#datatable_oc"),
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
                
                //"bStateSave": true, 
                "autoWidth": true,
                "buttons": [
					{ 
						extend: 'print', 
					  	//message: 'This print was produced using the Print button for DataTables',
					  	className: 'btn default',
            			autoPrint: true,
						orientation: 'landscape',
						stripHtml: true,
						exportOptions: {
							columns: [0,1,2,3,4,5]
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
							columns: [0,1,2,3,4,5]
						} 
					},
					{ 
						extend: 'pdf', 
						orientation: 'landscape',
					  	className: 'btn default',
						orientation: 'landscape',
						exportOptions: {
							columns: [0,1,2,3,4,5]
						}
					},
					{ 
						extend: 'excel',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5]
						}
					},
					{ 
						extend: 'csv',
						className: 'btn default',
						exportOptions: {
							columns: [0,1,2,3,4,5]
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
                //"sPlaceHolder": "head:after",
                "lengthMenu": [
                    [10, 20, 50, -1],
                    [10, 20, 50, "Todo"] // change per page values here
                ],
                "processing": true,
                "pageLength": 20, // default record count per page
				"order": [[ 5, "desc" ]],
				"columnDefs": [
					{  
						"orderable": true,
						targets: "_all"
					}
				],
                "ajax": {
                    url: "database/OcGet.php?action_type=list", // ajax source
                    dataSrc: "data"/*,
					data: function ( result ) { console.log(result); },
					error: function(result){ console.log(result); },
					success: function(result){ console.log(result); }*/
                },
                "dom": "<'row'<'col-md-6 col-sm-12'l><'col-md-6 col-sm-12'f>r>t<'row'<'col-md-5 col-sm-12'i><'col-md-7 col-sm-12'p>>",
                columns: [
						{
							  "mData": null,
							  "bSortable": false,
							  "mRender": function(data, type, full) {
										return '<a href=#/private/registrar_oc/' + data['idordenes_compra'] + '>' + data['nro_orden_compra'] + '</a>';
													
							  }
						},
						{ data : "descripcion_orden_compra" },
						{ data : "monto_orden_compra", render: $.fn.dataTable.render.number(',', '.', 2, 'S/') },
                        { data : "nro_contrato" },
						{ data : "nombre_sede" },
						{ data : "fecha_orden_compra" },
                        {
                          "mData": null,
                          "bSortable": false,
                          "mRender": function(data, type, full) {

                            return '<div class="btn-group">' +
                                        '<button class="btn btn-xs btn-warning dropdown-toggle" type="button" data-toggle="dropdown" aria-expanded="false"> <i class="fa fa-gear"></i> Acciones <i class="fa fa-angle-down"></i></button>' +
                                         '<ul class="dropdown-menu pull-right" role="menu">' +
                                            '<li><a href=#/private/registrar_oc/' + data['idordenes_compra'] + '><i class="fa fa-pencil"></i> Editar orden compra</a></li>' +
                                            '<li><a href="javascript:;" data-id="' + data['idordenes_compra'] + '" class="mt-sweetalert delete"><i class="fa fa-times"></i> Eliminar orden compra</a></li>' +
											'<li class="divider"></li>' +
											'<li><a data-target="#facturas_asociadas" class="modal_facturas" data-toggle="modal" data-id="' + data['idordenes_compra'] + '" > <i class="fa fa-external-link"></i> Facturas asociadas</a></li>' +
                                        '</ul>' +
                                    '</div>';      
									
									
									         
                          }
                        }
                ]
                
            }
        });
		
		
		$('#datatable_ajax_tools > li > a.tool-action').on('click', function() {
			var action = $(this).attr('data-action');
			grid.getDataTable().button(action).trigger();
		});
		
		
		
		
		/***************************************/
		/*       	CARGAR SELECT SEDES    	   */
		/***************************************/
		function initSelectSedes(){
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
		}
		
		
		
		/***************************************/
		/*       	CARGAR SELECT CONTRATOS	   */
		/***************************************/
		
		function initSelectContratos(){
		
				$.ajax({
					dataType:'JSON',
					type: 'POST',
					url: 'database/ContratosGet.php?action_type=list',
					success:function(response){
						
						//AGREGA DE REGISTROS EN EL SELECT
						var len = response.data.length;
						
						$("#contratos_idcontratos").empty();
						$("#contratos_idcontratos").append('<option value="all">TODAS</option>');
						
						for( var i = 0; i<len; i++){
							var idcontratos = response.data[i]['idcontratos'];
							var nombre_contrato = '#ID ' + response.data[i]['idcontratos'] + ' | ' + response.data[i]['nombre_contrato'];
							$('#contratos_idcontratos').append($('<option>', { value: idcontratos, text: nombre_contrato })).selectpicker('refresh');
						}
						
		
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
				
		
			});
						
	}
	
		
		/*******************************/
		/*     CLICK BOTON ELIMINAR    */
		/*******************************/
		$('#datatable_oc tbody').on( 'click', 'a.mt-sweetalert', function () {
			
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
								url: 'database/OcGet.php?action_type=delete&id='+data['idordenes_compra'],
								success:function(data){
									
									switch(data.code){
									
										case "200"	:	swal("Eliminado!", "El registro ha sido eliminado.", "success");
														grid.getDataTable().row(rowToDelete).remove().draw( false );
														break;
															
										case "1451"	:	swal("Error al eliminar!", "El registro no se puede eliminar ya que está asociado a otro documento. Para poder eliminar el contrato, deberá todos los documentos asociados a este registro.", "error");
														break;
															
										default		:	swal("Error al elimnar!!", "El registro no se puede eliminar.", "error");

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
		 
		$('#datatable_oc tbody').on( 'click', 'a.modal_facturas', function () {
			
			if(gridSeleccionados) gridSeleccionados.destroy();
			
			var idOc = $(this).data("id");
			var montoOc;
			
			//CARGAR CABECERA						
			 $.ajax({
				dataType:'JSON',
				type: 'POST',
				url: 'database/OcGet.php?action_type=edit&id='+idOc,
				success:function(data){
	
					//INICIO DE PERSONALIZACION DE CAMPOS
					
					$("#nro_oc").val(data.nro_orden_compra);
					$("#descrip_oc").val(data.descripcion_orden_compra);
					$("#monto_oc").val(data.monto_orden_compra);
					$("#fecha_oc").val(data.fecha_orden_compra);
					
					montoOc = data.monto_orden_compra;
	
				},
				error: function(xhr) { 
					console.log(xhr.statusText + xhr.responseText);
				}
			});
			
			
			gridSeleccionados = $('#datatable_facturas').DataTable({
										src: $("#datatable_facturas"),
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
											url: "database/FacturasGet.php?action_type=facturas_x_orden_compra&id=" + idOc
										},							
										columns: [	
													{ data : "nro_factura" },
													{ data : "descrip_factura" },
													{ data : "fecha_factura" },
													//{ data : "cantidad_factura", render: $.fn.dataTable.render.number(',', '.', 3, '') },
													//{ data : "precio_unit_factura", render: $.fn.dataTable.render.number(',', '.', 2, 'S/ ') },
													{ data : "importe_total_factura", render: $.fn.dataTable.render.number(',', '.', 2, 'S/ ') }
										],
										"footerCallback": function ( row, data, start, end, display ) {
												
												var api = this.api(), data;
									 
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
									 
												total = api
													.column( 3 )
													.data()
													.reduce( function (a, b) {
														return intVal(a) + intVal(b);
													}, 0 );
									 
								
									 
												// Update footer
												$( api.column( 3 ).footer() ).html(
													'S/ ' + roundVal(total, 2)
												);
												
												//MOSTRAR ESTADO DE CUADRE
												if(total < 1){
													$('#estado_oc').addClass('label-danger').html("NO DISPONIBLE");
												}else if(montoOc != total){
													$('#estado_oc').addClass('label-danger').html("NO CUADRADO");
												}else{
													$('#estado_oc').addClass('label-success').html("CUADRADO");
												}
												
										}
									})
				
			
		});
		
		/*******************************************/
		/*      	  	FIN MODAL   		 	   */
		/*******************************************/
		
		initSelectSedes();
		initSelectContratos();
		
		
		
    });
}]);
